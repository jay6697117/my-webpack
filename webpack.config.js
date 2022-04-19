const path = require('path');
module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: { app: './src/index.js', search: './src/search.js' },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
};
