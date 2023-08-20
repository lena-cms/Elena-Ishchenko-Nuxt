export default {
  css: ["~/style.css"],
  buildModules: ["@nuxt/postcss8"],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};