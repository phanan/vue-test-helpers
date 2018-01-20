const path = require('path')
const JsMinify = require('babel-minify-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-test-helpers.min.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    '@vue/test-utils': 'commonjs @vue/test-utils'
  },
  plugins: [
    new JsMinify()
  ]
}
