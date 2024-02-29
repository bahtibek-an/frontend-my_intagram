import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  base: '/instagram/',
})
