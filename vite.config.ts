import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'path';
import {libInjectCss} from 'vite-plugin-lib-inject-css';
import {viteStaticCopy} from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'clyso-ui-kit',
      formats: ['es'],
      fileName: (format) => `clyso-ui-kit.${format}.js`,
    },
    rollupOptions: {
      // external modules won't be bundled into your library
      external: [
        'vue',
        'naive-ui',
        'vue-router',
        'js-cookie',
        'vite-plugin-svg-icons',
      ], // not every external has a global
      output: {
        // disable warning on src/index.ts using both default and named export
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps (not useful if 'umd' is not in lib.formats)
        globals: {
          vue: 'Vue',
        },
      },
    },
    emptyOutDir: true,
    commonjsOptions: {
      esmExternals: true,
    },
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    vueDevTools(),
    libInjectCss(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets',
          dest: '',
        },
        {
          src: 'src/styles',
          dest: '',
        },
      ],
    }),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
});
