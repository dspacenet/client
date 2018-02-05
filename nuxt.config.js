const nodeExternals = require('webpack-node-externals')

module.exports = {
  // Headers of the page
  head: {
    title: 'DSpaceNet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt client for DSpaceNet' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/sb-admin.css' }
    ]
  },
  // External modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/axios'
  ],
  // Customize the progress bar color
  loading: { color: '#3B8070' },
  // Build configuration
  build: {
    extend (config, ctx) {
      /**
       * Whitelist vue-awesome
       */
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/]
          })
        ]
      }
      /*
      ** Run ESLint on save
      */
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // Plugins
  plugins: [
    '~/plugins/icon.js'
  ],
  // Axios global configuration
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3500/api/'
  },
  // Auth Setup
  auth: {
    endpoints: {
      login: { url: 'login', method: 'post', propertyName: 'token' },
      logout: { url: 'logout', method: 'get' },
      user: { url: 'user', method: 'get', propertyName: 'user' }
    }
  },
  // Middleware
  middleware: ['auth']
}
