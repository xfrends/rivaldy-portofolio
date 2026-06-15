globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, b as renderTemplate, e as renderScript, d as addAttribute, r as renderComponent, m as maybeRenderHead, f as defineScriptVars } from './astro/server_DBcCZzNC.mjs';
import { $ as $$Image } from './_astro_assets_BX076heD.mjs';
/* empty css                         */
import { h as getCmsGalleryData } from './galleryCms_BqZ0DBxM.mjs';
import { w as withBase } from './urls_Bz0TJc3Q.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://rivaldy-portfolio.pages.dev");
const $$PhotoGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PhotoGrid;
  const { images } = Astro2.props;
  const isPublicImage = (src) => typeof src.src === "string" && src.src.startsWith("/");
  const postsData = images.map((img) => {
    const allImages = [
      typeof img.src.src === "string" ? img.src.src : img.src,
      ...(img.additionalSrcs || []).map((add) => typeof add.src === "string" ? add.src : add)
    ];
    return {
      id: img.id,
      title: img.title || "",
      description: img.description || "",
      images: allImages
    };
  });
  return renderTemplate(_a || (_a = __template(["<script>(function(){", "\n	window.postsData = postsData;\n})();<\/script> ", '<section id="photo-grid" class="relative w-full mx-auto overflow-hidden"', " data-astro-cid-auwy4is6> ", " <!-- Justified Layout Grid Items --> ", ` <!-- Instagram-style Detail Modal --> <div x-show="modalOpen" x-transition.opacity.duration.300ms class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 md:p-4" style="display: none;" @keydown.escape.window="closeModal()" @keydown.right.window="next()" @keydown.left.window="prev()" data-astro-cid-auwy4is6> <!-- Close Button --> <button @click="closeModal()" class="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50 rounded-full bg-black/50" data-astro-cid-auwy4is6> <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-auwy4is6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-auwy4is6></path></svg> </button> <div class="relative w-full h-full md:max-w-6xl md:h-[90vh] flex flex-col md:flex-row bg-white md:rounded-lg overflow-hidden shadow-2xl" @click.away="closeModal()" data-astro-cid-auwy4is6> <!-- Image Carousel Section (Left side on desktop) --> <div class="relative w-full md:w-3/4 h-[65%] md:h-full bg-black flex items-center justify-center overflow-hidden group" data-astro-cid-auwy4is6> <div id="ig-carousel" class="flex overflow-x-auto snap-x snap-mandatory w-full h-full hide-scrollbar items-center" @scroll.passive="onScroll" data-astro-cid-auwy4is6> <template x-for="(imgSrc, idx) in (currentPost ? currentPost.images : [])" :key="idx" data-astro-cid-auwy4is6> <div class="w-full h-full flex-shrink-0 snap-center flex justify-center items-center" data-astro-cid-auwy4is6> <img :src="imgSrc" class="max-w-full max-h-full object-contain select-none" data-astro-cid-auwy4is6> </div> </template> </div> <!-- Navigation Arrows --> <button x-show="currentPost && currentPost.images.length > 1 && currentIndex > 0" @click.stop="prev()" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg transition-opacity" data-astro-cid-auwy4is6> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-auwy4is6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-auwy4is6></path></svg> </button> <button x-show="currentPost && currentPost.images.length > 1 && currentIndex < currentPost.images.length - 1" @click.stop="next()" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg transition-opacity" data-astro-cid-auwy4is6> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-auwy4is6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-auwy4is6></path></svg> </button> <!-- Instagram Dots --> <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5" x-show="currentPost && currentPost.images.length > 1" data-astro-cid-auwy4is6> <template x-for="(_, idx) in (currentPost ? currentPost.images : [])" :key="idx" data-astro-cid-auwy4is6> <div class="w-1.5 h-1.5 rounded-full transition-all duration-300" :class="currentIndex === idx ? 'bg-blue-500 scale-110' : 'bg-white/50 scale-100'" data-astro-cid-auwy4is6></div> </template> </div> </div> <!-- Post Details Section (Right side on desktop) --> <div class="w-full md:w-1/4 bg-white p-6 flex flex-col h-[35%] md:h-full overflow-y-auto" data-astro-cid-auwy4is6> <!-- Header (User/Avatar simulation) --> <div class="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4 shrink-0" data-astro-cid-auwy4is6> <div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold font-playfair text-black text-sm border border-black" data-astro-cid-auwy4is6>
R
</div> <div class="font-semibold text-sm" data-astro-cid-auwy4is6>Rivaldy Portfolio</div> </div> <!-- Content --> <div class="flex-grow" data-astro-cid-auwy4is6> <h3 class="text-xl font-bold mb-2 font-playfair" x-text="currentPost ? currentPost.title : ''" x-show="currentPost && currentPost.title" data-astro-cid-auwy4is6></h3> <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed" x-text="currentPost ? currentPost.description : ''" x-show="currentPost && currentPost.description" data-astro-cid-auwy4is6></p> <div x-show="currentPost && !currentPost.title && !currentPost.description" class="text-sm text-gray-400 italic" data-astro-cid-auwy4is6>
No description available.
</div> </div> </div> </div> </div> </section>  `, ""])), defineScriptVars({ postsData }), maybeRenderHead(), addAttribute(`{
		posts: window.postsData,
		modalOpen: false,
		currentPost: null,
		currentIndex: 0,
		openModal(index) {
			this.currentPost = this.posts[index];
			this.currentIndex = 0;
			this.modalOpen = true;
			document.body.style.overflow = 'hidden';
			this.$nextTick(() => {
				const container = document.getElementById('ig-carousel');
				if (container) container.scrollLeft = 0;
			});
		},
		closeModal() {
			this.modalOpen = false;
			document.body.style.overflow = '';
		},
		next() {
			if (this.currentPost && this.currentIndex < this.currentPost.images.length - 1) {
				this.currentIndex++;
				this.scrollToCurrent();
			}
		},
		prev() {
			if (this.currentIndex > 0) {
				this.currentIndex--;
				this.scrollToCurrent();
			}
		},
		scrollToCurrent() {
			const container = document.getElementById('ig-carousel');
			if (container) {
				container.scrollTo({
					left: this.currentIndex * container.offsetWidth,
					behavior: 'smooth'
				});
			}
		},
		onScroll(e) {
			const container = e.target;
			const index = Math.round(container.scrollLeft / container.offsetWidth);
			if (index !== this.currentIndex) {
				this.currentIndex = index;
			}
		}
	}`, "x-data"), images.length === 0 && renderTemplate`<div class="flex min-h-64 items-center justify-center rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-4 py-12 text-center text-sm text-zinc-500" data-astro-cid-auwy4is6>
No gallery posts yet.
</div>`, images.map((image, index) => renderTemplate`<a href="#"${addAttribute(`openModal(${index})`, "@click.prevent")} class="photo-item absolute transition-transform hover:scale-[1.02] hover:z-10 group" data-astro-cid-auwy4is6> ${isPublicImage(image.src) ? renderTemplate`<img${addAttribute(image.src.src, "src")}${addAttribute(image.src.width, "width")}${addAttribute(image.src.height, "height")} class="w-full h-full object-cover rounded-sm shadow-sm hover:shadow-lg transition-shadow"${addAttribute(image.title, "alt")} loading="lazy" decoding="async" data-astro-cid-auwy4is6>` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": image.src, "quality": 90, "format": "webp", "width": image.src.width, "height": image.src.height, "class": "w-full h-full object-cover rounded-sm shadow-sm hover:shadow-lg transition-shadow", "alt": image.title, "data-astro-cid-auwy4is6": true })}`} ${image.additionalSrcs && image.additionalSrcs.length > 0 && renderTemplate`<div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white p-1.5 rounded-md pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" data-astro-cid-auwy4is6> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-auwy4is6> <rect x="3" y="3" width="14" height="14" rx="2" ry="2" data-astro-cid-auwy4is6></rect> <path d="M7 21h14a2 2 0 0 0 2-2V7" data-astro-cid-auwy4is6></path> </svg> </div>`} </a>`), renderScript($$result, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/PhotoGrid.astro?astro&type=script&index=0&lang.ts"));
}, "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/components/PhotoGrid.astro", void 0);

const kukuBubble = new Proxy({"src":"/_astro/kuku-bubble.D2gPcVvX.jpg","width":800,"height":800,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/data/__tests__/gallery/kuku/kuku-bubble.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: kukuBubble
}, Symbol.toStringTag, { value: 'Module' }));

const kukuTrees = new Proxy({"src":"/_astro/kuku-trees.g43r40O-.jpg","width":722,"height":1080,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/data/__tests__/gallery/kuku/kuku-trees.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: kukuTrees
}, Symbol.toStringTag, { value: 'Module' }));

const landscape = new Proxy({"src":"/_astro/landscape.GrP3mzQj.jpg","width":800,"height":532,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/data/__tests__/gallery/landscape.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: landscape
}, Symbol.toStringTag, { value: 'Module' }));

const popoView = new Proxy({"src":"/_astro/popo-view.GHSgRsdS.jpg","width":1080,"height":810,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/data/__tests__/gallery/popo/popo-view.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: popoView
}, Symbol.toStringTag, { value: 'Module' }));

const withoutExif = new Proxy({"src":"/_astro/nature-1.BUw1oWVo.jpg","width":800,"height":477,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/data/__tests__/without-exif.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: withoutExif
}, Symbol.toStringTag, { value: 'Module' }));

const L1002174 = new Proxy({"src":"/_astro/L1002174.Bmdg4Vp9.jpg","width":2048,"height":1152,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/graduation/L1002174.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: L1002174
}, Symbol.toStringTag, { value: 'Module' }));

const nature1 = new Proxy({"src":"/_astro/nature-1.BUw1oWVo.jpg","width":800,"height":477,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/graduation/nature-1.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: nature1
}, Symbol.toStringTag, { value: 'Module' }));

const nature10 = new Proxy({"src":"/_astro/nature-10.BPp-0p_c.jpg","width":800,"height":1424,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/graduation/nature-10.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: nature10
}, Symbol.toStringTag, { value: 'Module' }));

const nature2 = new Proxy({"src":"/_astro/nature-2.DtfIsuP_.jpg","width":800,"height":532,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/graduation/nature-2.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: nature2
}, Symbol.toStringTag, { value: 'Module' }));

const nature3 = new Proxy({"src":"/_astro/nature-3.D5Re9zZG.jpg","width":800,"height":533,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/graduation/nature-3.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: nature3
}, Symbol.toStringTag, { value: 'Module' }));

const nature5 = new Proxy({"src":"/_astro/nature-5.Crqgiw7Q.jpg","width":800,"height":1200,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/graduation/nature-5.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: nature5
}, Symbol.toStringTag, { value: 'Module' }));

const nature7 = new Proxy({"src":"/_astro/nature-7.DvmSDKEc.jpg","width":800,"height":533,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/graduation/nature-7.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: nature7
}, Symbol.toStringTag, { value: 'Module' }));

const nature8 = new Proxy({"src":"/_astro/nature-8.BZVRoqwK.jpg","width":800,"height":530,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/graduation/nature-8.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: nature8
}, Symbol.toStringTag, { value: 'Module' }));

const travel1 = new Proxy({"src":"/_astro/travel-1.DCT35NTx.jpg","width":800,"height":533,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/party/travel-1.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: travel1
}, Symbol.toStringTag, { value: 'Module' }));

const stree1 = new Proxy({"src":"/_astro/stree-1.BW1tuFR_.jpg","width":800,"height":492,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/rivaldy-portofolio/rivaldy-portofolio/src/gallery/wedding/stree-1.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: stree1
}, Symbol.toStringTag, { value: 'Module' }));

class ImageStoreError extends Error {
  constructor(message) {
    super(message);
    this.name = "ImageStoreError";
  }
}
const imageModules = /* #__PURE__ */ Object.assign({"/src/data/__tests__/gallery/kuku/kuku-bubble.jpg": __vite_glob_0_0,"/src/data/__tests__/gallery/kuku/kuku-trees.jpg": __vite_glob_0_1,"/src/data/__tests__/gallery/landscape.jpg": __vite_glob_0_2,"/src/data/__tests__/gallery/popo/popo-view.jpg": __vite_glob_0_3,"/src/data/__tests__/without-exif.jpg": __vite_glob_0_4,"/src/gallery/graduation/L1002174.jpg": __vite_glob_0_5,"/src/gallery/graduation/nature-1.jpg": __vite_glob_0_6,"/src/gallery/graduation/nature-10.jpg": __vite_glob_0_7,"/src/gallery/graduation/nature-2.jpg": __vite_glob_0_8,"/src/gallery/graduation/nature-3.jpg": __vite_glob_0_9,"/src/gallery/graduation/nature-5.jpg": __vite_glob_0_10,"/src/gallery/graduation/nature-7.jpg": __vite_glob_0_11,"/src/gallery/graduation/nature-8.jpg": __vite_glob_0_12,"/src/gallery/party/travel-1.jpg": __vite_glob_0_13,"/src/gallery/wedding/stree-1.jpg": __vite_glob_0_14

});
const defaultGalleryPath = "db";
const featuredCollectionId = "featured";
const builtInCollections = [featuredCollectionId];
const getImages = async (options = {}) => {
  const { galleryPath = defaultGalleryPath, collection } = options;
  try {
    let images = (await loadGalleryData(galleryPath, options.runtimeEnv)).images;
    images = filterImagesByCollection(collection, images);
    images = sortImages(images, options);
    return processImages(images, galleryPath);
  } catch (error) {
    throw new ImageStoreError(
      `Failed to load images from ${galleryPath}: ${getErrorMsgFrom(error)}`
    );
  }
};
function getErrorMsgFrom(error) {
  return error instanceof Error ? error.message : "Unknown error";
}
const loadGalleryData = async (galleryPath, runtimeEnv) => {
  try {
    const gallery = galleryPath === defaultGalleryPath ? await getCmsGalleryData(runtimeEnv) : await loadGalleryFile(galleryPath);
    validateGalleryData(gallery);
    return gallery;
  } catch (error) {
    throw new ImageStoreError(
      `Failed to load gallery data from ${galleryPath}: ${getErrorMsgFrom(error)}`
    );
  }
};
async function loadGalleryFile(galleryPath) {
  throw new ImageStoreError(`Custom galleryPath is not available in production: ${galleryPath}`);
}
function filterImagesByCollection(collection, images) {
  if (collection) {
    images = images.filter((image) => image.meta.collections.includes(collection));
  }
  return images;
}
function validateGalleryData(gallery) {
  const collectionIds = gallery.collections.map((col) => col.id).concat(builtInCollections);
  for (const image of gallery.images) {
    const invalidCollections = image.meta.collections.filter((col) => !collectionIds.includes(col));
    if (invalidCollections.length > 0) {
      throw new ImageStoreError(
        `Invalid collection(s) [${invalidCollections.join(", ")}] referenced in image: ${image.path}`
      );
    }
  }
}
function sortImages(images, options) {
  const { sortBy, order } = options;
  let result = images;
  if (sortBy) {
    result.sort((a, b) => {
      const dateA = a.exif?.captureDate?.getTime() || 0;
      const dateB = b.exif?.captureDate?.getTime() || 0;
      return dateA - dateB;
    });
  }
  if (order === "desc") {
    result.reverse();
  }
  return result;
}
const processImages = (images, galleryPath) => {
  return images.reduce((acc, imageEntry) => {
    const imagePath = joinUrlPath("/", dirname(galleryPath), imageEntry.path);
    try {
      acc.push(createImageDataFor(imagePath, imageEntry, galleryPath));
    } catch (error) {
      console.warn(`[WARN] ${getErrorMsgFrom(error)}`);
    }
    return acc;
  }, []);
};
const createImageDataFor = (imagePath, img, galleryPath) => {
  if (isPublicImagePath(img.path)) {
    let additionalSrcs2 = [];
    if (img.additionalPaths && img.additionalPaths.length > 0) {
      additionalSrcs2 = img.additionalPaths.map((addPath) => publicImageFrom(addPath));
    }
    return {
      id: img.id,
      src: publicImageFrom(img.path),
      ...additionalSrcs2.length > 0 && { additionalSrcs: additionalSrcs2 },
      title: img.meta.title,
      description: img.meta.description,
      collections: img.meta.collections
    };
  }
  const imageModule = imageModules[imagePath];
  if (!imageModule) {
    throw new ImageStoreError(`Image not found: ${imagePath}`);
  }
  let additionalSrcs = [];
  if (img.additionalPaths && img.additionalPaths.length > 0) {
    additionalSrcs = img.additionalPaths.map((addPath) => {
      if (isPublicImagePath(addPath)) {
        return publicImageFrom(addPath);
      }
      const addFullPath = joinUrlPath("/", dirname(galleryPath), addPath);
      const addMod = imageModules[addFullPath];
      if (!addMod) {
        console.warn(`[WARN] Additional image not found: ${addFullPath}`);
        return null;
      }
      return addMod.default;
    }).filter((item) => item !== null);
  }
  return {
    id: img.id,
    src: imageModule.default,
    ...additionalSrcs.length > 0 && { additionalSrcs },
    title: img.meta.title,
    description: img.meta.description,
    collections: img.meta.collections
  };
};
function isPublicImagePath(imagePath) {
  return imagePath.startsWith("/");
}
function dirname(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  const index = normalized.lastIndexOf("/");
  return index >= 0 ? normalized.slice(0, index) : ".";
}
function joinUrlPath(...parts) {
  return parts.join("/").replace(/\/+/g, "/").replace(/^([^/])/, "/$1");
}
function publicImageFrom(src) {
  return {
    src: withBase(src),
    width: 1600,
    height: 1067
  };
}
const getCollections = async (galleryPath = defaultGalleryPath, runtimeEnv) => {
  return (await loadGalleryData(galleryPath, runtimeEnv)).collections;
};

export { $$PhotoGrid as $, getImages as a, featuredCollectionId as f, getCollections as g };
