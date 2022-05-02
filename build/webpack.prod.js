const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
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
  entry: { index: path.resolve(__rootname, './src/index.js'), search: path.resolve(__rootname, './src/search.js') },
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  require('autoprefixer')({
                    browsers: ['last 2 version', '>1%', 'not ie <= 8']
                  })
                ];
              }
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              // remUnit: 75,
              remUnit: 37.5,
              remPrecision: 7
            }
          },
          'less-loader'
        ]
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
    }),
    new OptimizeCSSAssetsPlugin({ assetNameRegExp: /\.(le|c)ss$/g, cssProcessor: require('cssnano') }),
    new HtmlWebpackPlugin({
      //模版里面可以用ejs语法
      template: path.resolve(__rootname, './public/index.html'),
      //打包出来的html文件名称
      filename: 'index.html',
      //指定生成的html要使用哪些chunk
      chunks: ['index'],
      //打包出来的chunk中的文件自动注入到生成的html中来
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        // removeComments: false
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      //模版里面可以用ejs语法
      template: path.resolve(__rootname, './public/search.html'),
      //打包出来的html文件名称
      filename: 'search.html',
      //指定生成的html要使用哪些chunk
      chunks: ['search'],
      //打包出来的chunk中的文件自动注入到生成的html中来
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    // CSS 内联
    // new HTMLInlineCSSWebpackPlugin(),
    // 默认会删除 output 指定的输出⽬录
    new CleanWebpackPlugin()
  ]
};
