const path = require('path')
module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8080,
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
        '@root': path.resolve(__dirname, '.')
      }
    }
  },
}
