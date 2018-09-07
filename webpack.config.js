const path = require('path')
const { basename, dirname, join, relative, resolve } = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob")

const src = path.resolve(__dirname, './src/')
const dist = path.resolve(__dirname, './dist/')

const scriptsEntries = path.resolve(src, './scripts/')
const stylesheetsEntries = path.resolve(src, './stylesheets/')

const entries = {}
glob.sync("./src/scripts/entries/**/*.js").map(function(file) {
  const regEx = new RegExp(`./src/scripts/entries/`);
  const key = file.replace(regEx, '');
  entries[key] = file
})

module.exports = [
  {
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    entry: entries,
    output: {
      path: dist,
      publicPath: '/',
      filename: '[name]'
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
  },
  {
    entry: './src/stylesheets/index.sass',
    output: {
      path: dist,
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
