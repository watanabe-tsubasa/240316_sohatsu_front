import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
       enabled: true
      },
      manifest: {
      name: "いらいらぷんぷん",
      short_name: "いらいらぷんぷん",
      description: "いらいらぷんぷん",
      icons: [
        {
          src: "icon.png",
          type: "image/png",
          sizes: "192x192"
        },
        // {
        //   src: "app_icon/icon-512.png",
        //   sizes: "512x512",
        //   type: "image/png"
        // },
        // {
        //   src: "app_icon/icon-512.png",
        //   sizes: "512x512",
        //   type: "image/png",
        //   purpose: "any maskable"
        // }
      ],
      start_url: "index.html",
      lang: "ja"
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})