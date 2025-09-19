import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html', // output file name
      open: true, // automatically open the report in your browser after build
    }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    modulePreload: {
      polyfill: false,
      resolveDependencies: () => [],
    },
  },
  server: {
    port: 5173,
    strictPort: true, // Falla si el puerto está en uso
    host: true
  }
})