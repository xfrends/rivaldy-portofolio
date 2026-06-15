import { getCmsGalleryData } from '../lib/galleryCms';
import type { RuntimeEnv } from '../lib/cloudflare';
import { withBase } from '../lib/urls';
import {
	type Collection,
	type GalleryData,
	type GalleryImage,
	type Image,
	type ImageModule,
	type PublicImage,
} from './galleryData.ts';

/**
 * Error class for image-related errors
 */
export class ImageStoreError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ImageStoreError';
	}
}

/**
 * Import all images from /src directory
 */
const imageModules = import.meta.glob('/src/**/*.{jpg,jpeg,png,gif}', {
	eager: true,
});

const defaultGalleryPath = 'db';

export const featuredCollectionId = 'featured';
const builtInCollections = [featuredCollectionId];

/**
 * Options for retrieving images from the gallery
 * @property {string} [galleryPath] - Optional test/tooling gallery file
 * @property {string} [collection] - Collection name to filter images by
 * @property {string} [sortBy] - Property to sort images by (e.g., 'captureDate')
 * @property {'asc' | 'desc'} [order] - Sort order, either ascending or descending
 */
interface GetImagesOptions {
	galleryPath?: string;
	collection?: string;
	sortBy?: 'captureDate';
	order?: 'asc' | 'desc';
	runtimeEnv?: RuntimeEnv;
}

/**
 * Retrieves images from a specified gallery path and optionally filters them by a collection name.
 *
 * @param {GetImagesOptions} [options={}] - Configuration options for retrieving the images.
 * @param {string} [options.galleryPath=defaultGalleryPath] - Optional gallery path for tests/tooling.
 * @param {string} [options.collection] - The name of the collection to filter images by. If not provided, all images are retrieved.
 * @returns {Promise<Image[]>} Retrieved images.
 * @throws {ImageStoreError} Throws an error if loading the gallery data fails.
 */
export const getImages = async (options: GetImagesOptions = {}): Promise<Image[]> => {
	const { galleryPath = defaultGalleryPath, collection } = options;
	try {
		let images = (await loadGalleryData(galleryPath, options.runtimeEnv)).images;
		images = filterImagesByCollection(collection, images);
		images = sortImages(images, options);
		return processImages(images, galleryPath);
	} catch (error) {
		throw new ImageStoreError(
			`Failed to load images from ${galleryPath}: ${getErrorMsgFrom(error)}`,
		);
	}
};

function getErrorMsgFrom(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}

/**
 * Loads gallery data from D1 by default, with file loading kept for tests/tooling.
 * @throws {ImageStoreError} If gallery data cannot be read or parsed
 * @param galleryPath
 */
const loadGalleryData = async (
	galleryPath: string,
	runtimeEnv?: RuntimeEnv,
): Promise<GalleryData> => {
	try {
		const gallery =
			galleryPath === defaultGalleryPath
				? await getCmsGalleryData(runtimeEnv)
				: await loadGalleryFile(galleryPath);
		validateGalleryData(gallery);
		return gallery;
	} catch (error) {
		throw new ImageStoreError(
			`Failed to load gallery data from ${galleryPath}: ${getErrorMsgFrom(error)}`,
		);
	}
};

async function loadGalleryFile(galleryPath: string): Promise<GalleryData> {
	if (import.meta.env.MODE === 'test' || import.meta.env.DEV) {
		const { loadGallery } = await import('./galleryFileLoader.ts');
		return loadGallery(galleryPath);
	}

	throw new ImageStoreError(`Custom galleryPath is not available in production: ${galleryPath}`);
}

function filterImagesByCollection(collection: string | undefined, images: GalleryImage[]) {
	if (collection) {
		images = images.filter((image) => image.meta.collections.includes(collection));
	}
	return images;
}

function validateGalleryData(gallery: GalleryData) {
	const collectionIds = gallery.collections.map((col) => col.id).concat(builtInCollections);
	for (const image of gallery.images) {
		const invalidCollections = image.meta.collections.filter((col) => !collectionIds.includes(col));
		if (invalidCollections.length > 0) {
			throw new ImageStoreError(
				`Invalid collection(s) [${invalidCollections.join(', ')}] referenced in image: ${image.path}`,
			);
		}
	}
}

function sortImages(images: GalleryImage[], options: GetImagesOptions) {
	const { sortBy, order } = options;
	let result: GalleryImage[] = images;
	if (sortBy) {
		result.sort((a, b) => {
			const dateA = a.exif?.captureDate?.getTime() || 0;
			const dateB = b.exif?.captureDate?.getTime() || 0;
			return dateA - dateB;
		});
	}
	if (order === 'desc') {
		result.reverse();
	}
	return result;
}

/**
 * Processes gallery images and returns an array of Image objects
 * @param {GalleryImage[]} images - Array of images to process
 * @param {string} galleryPath - Path to the collections directory
 * @returns {Image[]} Array of processed images with metadata
 * @throws {ImageStoreError} If an image module cannot be found
 */
const processImages = (images: GalleryImage[], galleryPath: string): Image[] => {
	return images.reduce<Image[]>((acc, imageEntry) => {
		const imagePath = joinUrlPath('/', dirname(galleryPath), imageEntry.path);
		try {
			acc.push(createImageDataFor(imagePath, imageEntry, galleryPath));
		} catch (error) {
			console.warn(`[WARN] ${getErrorMsgFrom(error)}`);
		}
		return acc;
	}, []);
};

/**
 * Creates image data for a given image path and entry
 * @param {string} imagePath - Path to the image file
 * @param {GalleryImage} img - Gallery image entry
 * @returns {Image} Processed image with metadata
 * @throws {ImageStoreError} If image module cannot be found
 */
const createImageDataFor = (imagePath: string, img: GalleryImage, galleryPath: string): Image => {
	if (isPublicImagePath(img.path)) {
		return {
			id: img.id,
			src: publicImageFrom(img.path),
			title: img.meta.title,
			description: img.meta.description,
			collections: img.meta.collections,
		};
	}

	const imageModule = imageModules[imagePath] as ImageModule | undefined;

	if (!imageModule) {
		throw new ImageStoreError(`Image not found: ${imagePath}`);
	}

	let additionalSrcs: Array<import('astro').ImageMetadata | PublicImage> = [];
	if (img.additionalPaths && img.additionalPaths.length > 0) {
		additionalSrcs = img.additionalPaths.map(addPath => {
			if (isPublicImagePath(addPath)) {
				return publicImageFrom(addPath);
			}

			const addFullPath = joinUrlPath('/', dirname(galleryPath), addPath);
			const addMod = imageModules[addFullPath] as ImageModule | undefined;
			if (!addMod) {
				console.warn(`[WARN] Additional image not found: ${addFullPath}`);
				return null;
			}
			return addMod.default;
		}).filter((item): item is import('astro').ImageMetadata | PublicImage => item !== null);
	}

	return {
		id: img.id,
		src: imageModule.default,
		...(additionalSrcs.length > 0 && { additionalSrcs }),
		title: img.meta.title,
		description: img.meta.description,
		collections: img.meta.collections,
	};
};

function isPublicImagePath(imagePath: string): boolean {
	return imagePath.startsWith('/');
}

function dirname(filePath: string): string {
	const normalized = filePath.replace(/\\/g, '/');
	const index = normalized.lastIndexOf('/');
	return index >= 0 ? normalized.slice(0, index) : '.';
}

function joinUrlPath(...parts: string[]): string {
	return parts
		.join('/')
		.replace(/\/+/g, '/')
		.replace(/^([^/])/, '/$1');
}

function publicImageFrom(src: string): PublicImage {
	return {
		src: withBase(src),
		width: 1600,
		height: 1067,
	};
}

/**
 * Retrieves all collections from the gallery
 * @param galleryPath - Path to the gallery YAML file
 * @returns {Promise<Collection[]>} Array of collections
 */
export const getCollections = async (
	galleryPath: string = defaultGalleryPath,
	runtimeEnv?: RuntimeEnv,
): Promise<Collection[]> => {
	return (await loadGalleryData(galleryPath, runtimeEnv)).collections;
};

export function mergeGalleryData(target: GalleryData, source: GalleryData): GalleryData {
	const collectionsMap = new Map<string, Collection>();
	for (const collection of target.collections) {
		collectionsMap.set(collection.id, collection);
	}
	for (const collection of source.collections) {
		collectionsMap.set(collection.id, collection);
	}

	const imagesMap = new Map<string, GalleryImage>();
	for (const image of target.images) {
		imagesMap.set(image.path, image);
	}
	for (const image of source.images) {
		imagesMap.set(image.path, image);
	}

	return {
		collections: Array.from(collectionsMap.values()),
		images: Array.from(imagesMap.values()),
	};
}
