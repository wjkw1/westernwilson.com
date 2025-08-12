// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  mode: "static",
  router: {
    base: "/westernwilson.com/",
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 2,
          searchDepth: 2,
        },
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: "github-light",
            // Theme used if `html.dark`
            dark: "github-dark",
            // Theme used if `html.sepia`
            sepia: "monokai",
          },
        },
      },
    },
  },

  modules: [
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxt/fonts",
  ],

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
