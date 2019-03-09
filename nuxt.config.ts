import pkg from './package.json';

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    title: pkg.name
  },

  // https://nuxtjs.org/api/configuration-env/
  env:{
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
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
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    // /*
    //  ** You can extend webpack config here
    //  */
    // extend(config, ctx) {}
  }
};
