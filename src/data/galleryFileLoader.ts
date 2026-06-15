import { promises as fs } from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import type { GalleryData } from './galleryData';

export const loadGallery = async (galleryPath: string): Promise<GalleryData> => {
	const yamlPath = path.resolve(process.cwd(), galleryPath);
	const content = await fs.readFile(yamlPath, 'utf8');
	return yaml.load(content) as GalleryData;
};
