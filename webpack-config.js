const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
};

module.exports.serve = {
  context: [ path.resolve(__dirname, 'dist') ],

  config: {
  },
  hot: {
    host: 'localhost',
    port: 8080
  }
}
