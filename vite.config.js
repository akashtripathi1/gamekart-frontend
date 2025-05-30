import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      manifest: {
        short_name: "RiderDash",
        name: "E‑Commerce Rider Dashboard",
        start_url: "/rider",
        scope: "/rider",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2C3E50",
        icons: [
          {
            src: "/assets/icons/rider-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/icons/rider-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
