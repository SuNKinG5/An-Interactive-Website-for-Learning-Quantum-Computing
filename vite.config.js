import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        learn: resolve(__dirname, "pages/LearnPage.html"),
        simulator: resolve(__dirname, "pages/SimulatorPage.html"),
        algorithms: resolve(__dirname, "pages/AlgorithmsPage.html"),
        blochSphere: resolve(__dirname, "pages/BlochSphere.html"),
        practice: resolve(__dirname, "pages/PracticePage.html"),
        about: resolve(__dirname, "pages/AboutPage.html"),
      },
    },
  },
});
