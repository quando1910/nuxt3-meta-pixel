import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  pixelId: string | null;
  track: string;
  autoPageView: boolean;
  version: string;
  pixels: any[];
  manualMode: boolean;
  disabled: boolean;
  debug: boolean;
  dev?: boolean;
}


export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'meta-pixel',
    configKey: 'facebook'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    pixelId: null,
    track: 'PageView',
    autoPageView: false,
    version: '2.0',
    pixels: [],
    manualMode: false,
    disabled: false,
    debug: false,
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.facebook = options;
    options.dev = nuxt.options.dev;

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})


// module.exports = function facebookPixelModule (moduleOptions) {
//   const options = Object.assign({}, DEFAULT_OPTIONS, this.options.facebook, moduleOptions)
//   options.dev = this.options.dev

//   if (options.pixels && options.pixels.length > 0) {
//     options.pixels = options.pixels.map(option => Object.assign({}, DEFAULT_OPTIONS, option))
//   }

//   if (!options.pixelId) throw new Error('The default `pixelId` option is required.')

//   this.addPlugin({
//     src: path.resolve(__dirname, './templates/plugin.js'),
//     ssr: false,
//     options
//   })
// }

// module.exports.meta = require('../package.json')
