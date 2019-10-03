const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry : './src/app.jsx',
  output: {
    path      : path.resolve(__dirname, 'dist'), // 打包之后放置在哪里
    publicPath: "/dist/",
    filename  : 'js/app.js',
  },
  resolve: {
    alias: {
      page     : path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component'),
      util     : path.resolve(__dirname, 'src/util'),
      service  : path.resolve(__dirname, 'src/service'),
    }
  },
  module: {
    rules: [
      // react 语法的处理
      {
        test   : /\.jsx$/,
        exclude: /(node_modules)/,
        use    : {
          loader : 'babel-loader',
          options: {
            presets: ['env', 'react'],
          }
        }
      },
      // css 文件处理 style-loader
      {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : 'css-loader'
        })
      },
      // sass 文件处理 sass-loader node-sass
      {
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : ['css-loader', 'sass-loader']
        })
      },
      // 图片的配置 file-loader url-loader
      {
        test: /\.(png|jpg|gif)$/,
        use : [
          {
            loader : 'url-loader',
            options: {
              limit  : 8192,
              name   : 'resource/[name].[ext]'
            }
          }
        ]
      },
      // 配置字体 font-awesome
      {
        test: /\.(eot|svg|ttf|woff|woff2|oft)/,
        use : [
          {
            loader : 'url-loader',
            options: {
              limit  : 8192,
              name   : 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 处理HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon : './favicon.ico'
    }),
    // 独立CSS文件
    new ExtractTextPlugin('css/[name].css'),
    // 提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name    : 'common',
      filename: 'js/base.js'
    })
  ],
  devServer: {
    port: 8086,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage': {
        target      : 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target      : 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  }
};