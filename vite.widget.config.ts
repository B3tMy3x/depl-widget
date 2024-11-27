import { defineConfig } from 'vite';

export default defineConfig({
  base: '/depl-widget/',
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: 'src/widget/index.ts',
      name: 'ChatbotWidget',
      formats: ['umd'],
      fileName: 'chatbot-widget'
    },
    outDir: 'dist/widget',
    rollupOptions: {
      output: {
        entryFileNames: 'widget/assets/[name]-[hash].js',
        chunkFileNames: 'widget/assets/[name]-[hash].js',
        assetFileNames: 'widget/assets/[name]-[hash][extname]'
      }
    }
  }
});
