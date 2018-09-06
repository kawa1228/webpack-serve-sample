const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
  {
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    entry: {
      'index': path.resolve(__dirname, './src/scripts/', "index.js"),
      'show': path.resolve(__dirname, './src/scripts/', "show.js"),
    },
    output: {
      path: path.resolve(__dirname, './dist/'),
      publicPath: '/',
      filename: '[name]-[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.js|jsx?$/,
          exclude:[ /node_modules/ ],
          loader: 'babel-loader'
        },
      ]
    },
    devtool: 'source-map',
    serve: {
      open: true,
      port: 8080,
      content: path.resolve(__dirname, 'public'),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "src/html/index.html" })
    ]
  },
  {
    entry: './src/stylesheets/index.sass',
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'app.css'
    },
    module: {
      rules: [
        {
          test: /\.sass$/,
          exclude: [ /node_modules/ ],
          use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            }
          )
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('app.css')
    ]
  },
]
