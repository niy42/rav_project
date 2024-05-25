import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /*optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
         NodeGlobalsPolyfillPlugin({
           buffer: true,
           process: true,
         })
       ]
    }
  },*/
  resolve: {
    alias: {
      // This Rollup aliases are required for StackBlitz in browser
      // Optional, but useful for config completeness
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    }
  }
});
