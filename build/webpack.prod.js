const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const __rootname = process.cwd();

module.exports = {
  /*
  //默认 false，也就是不开启
  watch: true,
  //只有开启监听模式时，watchOptions才有意义
  watchOptions: {
    //默认为空，不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    //监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
    poll: 1000
  },
  */
  mode: 'production',
  //入口
  entry: { app: path.resolve(__rootname, './src/index.js'), search: path.resolve(__rootname, './src/search.js') },
  output: {
    path: path.resolve(__rootname, './dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(le|c)ss$/,
        // MiniCssExtractPlugin.loader没办法和style-loader一起使用
        // use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'less-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit: 10240 // 10240 byte === 10k byte
              limit: 1024, //测试文件指纹
              //这里的hash实际上是contenthash
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //这里的hash实际上是contenthash
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    })
  ]
};
