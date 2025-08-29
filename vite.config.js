import { defineConfig } from 'vite'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import singleImageFormat from 'vite-plugin-single-image-format'
import { createHtmlPlugin } from 'vite-plugin-html'
import purge from 'vite-plugin-purgecss'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  base: './',

  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(
        browserslist(['>= 0.5%', 'last 2 versions', 'not dead'])
      ),
    },
  },

  build: {
    cssMinify: 'lightningcss',
    sourcemap: false,
    assetsInlineLimit: 1024,
  },

  plugins: [
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeConditionalComments: true,
        ignoreCustomComments: [],
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
      },
    }),

    singleImageFormat({
      format: 'webp',
      reencode: true,
      webp: { quality: 80, alphaQuality: 90, smartSubsample: true },
    }),

    purge({
      content: ['./index.html'],
    }),

    compression({
      algorithms: ['brotliCompress', 'gzip'],
      threshold: 10 * 1024,
    }),
  ],
})
