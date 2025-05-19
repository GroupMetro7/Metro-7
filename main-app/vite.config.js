import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
      registerType: 'autoUpdate',
       workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Metro-7_PWA',
        short_name: 'Metro-7',
        description: 'Metro-7 PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/brand_logo/M7_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/brand_logo/M7_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})