import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // React et le routeur changent rarement : on les isole pour que le
        // navigateur les garde en cache entre deux mises à jour du site.
        manualChunks(id) {
          // La démo en un seul fichier (scripts/build_artifact.py) a besoin
          // d'un bundle unique : on désactive le découpage dans ce cas.
          if (process.env.ARTIFACT === "1") return;
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) return "router";
            if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler")) return "react";
            return "vendor";
          }
        },
      },
    },
  },
});
