import type { ImageMetadata } from 'astro';

/**
 * Structure of the collections YAML file
 * @property {Collection[]} collections - Array of collections
 */
export interface GalleryData {
	collections: Collection[];
	images: GalleryImage[];
}

/**
 * Represents a collection of images
 * @property {string} name - Name of the collection
 * @property {GalleryImage[]} getImages - Array of images in the collection
 */
export interface Collection {
	id: string;
	name: string;
}

/**
 * Represents an image entry in the collections YAML file
 * @property {string} path - Relative path to the image file
 * @property {string} alt - Alt text for accessibility and title
 * @property {string} description - Detailed description of the image
 * @property {string[]} collections - Array of collection IDs the image belongs to
 */
export interface GalleryImage {
	id?: string;
	path: string;
	additionalPaths?: string[];
	meta: Meta;
	exif?: ImageExif;
}

/**
 * Represents the metadata of an image
 * @property {string} path - Relative path to the image file
 * @property {string} title - Title of the image
 * @property {string} description - Detailed description of the image
 * @property {string[]} collections - Array of collection IDs the image belongs to
 */
export interface Meta {
	title: string;
	description: string;
	collections: string[];
}

/**
 * Represents the EXIF data of an image
 * @property {number} [focalLength] - Focal length of the lens
 * @property {number} [iso] - ISO sensitivity
 * @property {number} [fNumber] - Aperture value
 * @property {number} [shutterSpeed] - Shutter speed
 * @property {Date} [captureDate] - Date and time of capture
 * @property {string} [model] - Camera model
 * @property {string} [lensModel] - Lens model
 */
export interface ImageExif {
	focalLength?: number;
	iso?: number;
	fNumber?: number;
	shutterSpeed?: number;
	captureDate?: Date;
	model?: string;
	lensModel?: string;
}

/**
 * Represents a processed image with metadata
 * @property {ImageMetadata} src - Image source metadata from Astro
 * @property {ImageMetadata[]} additionalSrcs - Image sources for carousel
 * @property {string} alt - Alt text for accessibility
 * @property {string} description - Detailed description of the image
 * @property {string[]} collections - Array of collection IDs the image belongs to
 */
export interface Image {
	id?: string;
	src: ImageMetadata | PublicImage;
	additionalSrcs?: Array<ImageMetadata | PublicImage>;
	title: string;
	description: string;
	collections: string[];
}

export interface PublicImage {
	src: string;
	width: number;
	height: number;
}

/**
 * Type for the image module import result
 * @property {ImageMetadata} default - Default export containing image metadata
 */
export type ImageModule = { default: ImageMetadata };

export const NullGalleryData: GalleryData = {
	collections: [],
	images: [],
};
