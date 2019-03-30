const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.plugins.delete('prefetch')
    },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('./src')
      }
    }
  }
}
