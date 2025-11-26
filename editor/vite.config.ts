import { defineConfig } from 'vite';


export default defineConfig({
  base: './',
  build: {
    outDir: '../docs/assets/editor',
    assetsDir: 'assets',
    //Include this for relevant cache-busting features
    //manifest: true,
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        // May want to add cache-busting here
        entryFileNames: 'editor.js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
