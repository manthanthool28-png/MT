import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base + HashRouter => works on GitHub Pages whether this is
// deployed as a user site (manthanthool28-png.github.io) or a project repo.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false },
})
