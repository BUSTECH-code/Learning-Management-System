import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Learning-Management-System/', // 👈 ADD THIS EXACT LINE
})