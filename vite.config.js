import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Uses global environment checking to safely support both Vercel and GitHub Pages
  base: typeof globalThis.process !== 'undefined' && globalThis.process.env.VERCEL ? '/' : '/Learning-Management-System/',
})