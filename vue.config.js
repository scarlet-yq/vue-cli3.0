const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  configureWebpack: config => {
    Object.assign(config, {
      entry: {
        main: '@/main.js'
      },
      resolve: {
        extensions: ['.js', '.vue'],
        alias: {
          'vue': 'vue/dist/vue.esm.js',
          '@': resolve('./src')
        }
      },
      optimization: {
        minimizer: [
          // js mini
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false // set to true if you want JS source maps
          }),
          // css mini
          new OptimizeCSSPlugin({})
        ],
        splitChunks: {
          chunks: 'async',
          // 大于30KB才单独分离成chunk
          minSize: 30000,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: true,
          cacheGroups: {
            default: {
              priority: -20,
              reuseExistingChunk: true
            },
            vendors: {
              name: 'vendors',
              test: /node_modules/,
              priority: -10,
              chunks: 'all'
            }
          }
        },
        runtimeChunk: {
          name: 'manifest'
        }
      }
    })
  }
}
