// vue.config.js
module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/style/settings/var.scss";
          @import "@/style/tools/_sassMagic.scss";
          `,
      },
    },
  },
}
