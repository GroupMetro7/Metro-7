import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),

    VitePWA({
      devOptions: {
        enabled: true,
      },
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "autoUpdate",
      injectManifest: {
        swDest: "dist/sw.js",
      },
      manifest: {
        name: "Metro-7 App",
        short_name: "Metro-7",
        icons: [
          {
            src: "/MipMap/M7 64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/MipMap/M7 192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/MipMap/M7 512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/MipMap/M7 512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#1a1a1a",
        background_color: "#1a1a1a",
        display: "standalone",
        orientation: "portrait",
      },
    }),
  ],
  optimizeDeps: {
  include: ['@popperjs/core', 'bootstrap']
}
})
