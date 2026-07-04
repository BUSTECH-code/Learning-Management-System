import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process' // 👈 This explicitly imports process to bypass the build errors!

export default defineConfig({
  plugins: [react()],
  // If built on Vercel, deploy to root domain. Otherwise, use the GitHub Pages subfolder path.
  base: process.env.VERCEL ? '/' : '/Learning-Management-System/',
})