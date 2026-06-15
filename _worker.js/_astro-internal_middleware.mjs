globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_ecWEC7_m.mjs';
import './chunks/astro/server_C894EArb.mjs';
import { s as sequence } from './chunks/index_Djf4C25_.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
