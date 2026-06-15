const maxImageDimension = 2560;
const webpQuality = 0.88;

document.querySelectorAll('form[data-optimize-images]').forEach((form) => {
	form.addEventListener('submit', async (event) => {
		if (!(form instanceof HTMLFormElement) || form.dataset.optimized === 'true') return;

		event.preventDefault();
		const submitter = event.submitter;
		const submitButton = submitter instanceof HTMLButtonElement ? submitter : null;
		const originalLabel = submitButton?.textContent || '';

		if (submitButton) {
			submitButton.disabled = true;
			submitButton.textContent = 'Optimizing...';
		}

		try {
			await optimizeFormImages(form);
			form.dataset.optimized = 'true';
			if (submitter instanceof HTMLElement) form.requestSubmit(submitter);
			else form.requestSubmit();
		} catch (error) {
			console.error('Image optimization failed:', error);
			form.submit();
		} finally {
			if (submitButton) {
				submitButton.disabled = false;
				submitButton.textContent = originalLabel;
			}
		}
	});
});

async function optimizeFormImages(form: HTMLFormElement) {
	const fileInputs = Array.from(form.querySelectorAll('input[type="file"]'));
	await Promise.all(
		fileInputs.map(async (input) => {
			if (!(input instanceof HTMLInputElement) || !input.files || input.files.length === 0) return;

			const dataTransfer = new DataTransfer();
			for (const file of Array.from(input.files)) {
				if (!file.type.startsWith('image/')) {
					dataTransfer.items.add(file);
					continue;
				}

				dataTransfer.items.add(await convertImageToWebp(file));
			}
			input.files = dataTransfer.files;
		}),
	);
}

async function convertImageToWebp(file: File): Promise<File> {
	const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
	const scale = Math.min(1, maxImageDimension / Math.max(bitmap.width, bitmap.height));
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	const context = canvas.getContext('2d', { alpha: false, colorSpace: 'srgb' });
	if (!context) throw new Error('Canvas is not supported.');

	context.drawImage(bitmap, 0, 0, width, height);
	bitmap.close();

	const blob = await new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(result) => {
				if (result) resolve(result);
				else reject(new Error('WebP conversion failed.'));
			},
			'image/webp',
			webpQuality,
		);
	});

	return new File([blob], `${filenameBase(file.name)}.webp`, {
		type: 'image/webp',
		lastModified: Date.now(),
	});
}

function filenameBase(filename: string) {
	const basename = filename.split(/[\\/]/).pop() || 'photo';
	const dotIndex = basename.lastIndexOf('.');
	return dotIndex >= 0 ? basename.slice(0, dotIndex) : basename;
}
