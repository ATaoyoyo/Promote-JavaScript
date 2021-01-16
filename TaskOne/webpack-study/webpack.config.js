const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  // 打包模式
  mode: 'development',
  // 入口
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js')
  },
  // 出口
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/[name].js'
  },
  module: {
    // 规则
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 不包括
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader',
        options: {
          esModule: false
        }
      }
    ],
  },
  // 实例化插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['index'],
      excludeChunks: ['node_modules']
    })
  ],
  devServer: {
    open: true,
    port: 3300,
    host: 'localhost',
  }
}