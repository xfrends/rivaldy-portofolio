/// <reference types="astro/client" />

declare module '*.yaml?raw' {
	const value: string;
	export default value;
}
