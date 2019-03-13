import pkg from './package.json';

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources'],

  /*
   ** Build configuration
   */
  build: {
    //   /*
    //   ** You can extend webpack config here
    //   */
    //   extend(config, ctx) {
    //   }
  },

  /**
   * Style resources module configuration
   */
  styleResources: {
    scss: [
      './assets/scss/_variables.scss',
      './assets/scss/_mixins.scss'
    ]
  }
};
