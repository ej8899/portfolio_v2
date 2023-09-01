import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [react(), eslint(), vue()],

  // "@" becomes the default path for src
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    // fix plugin-react-swc error {
    preserveSymlinks: true,
  },
  server: {
    watch: {
      usePolling: true,
    }
  }
});
