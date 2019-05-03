var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
// var autoprefixer = require('autoprefixer');
// var cssnano = require('cssnano');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
// var VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = function(env, options) {
  return {
    entry: [
      './js/index.js',
    ],
    output: {
      path: path.resolve(__dirname, '../assets'),
      publicPath: path.resolve(__dirname, '../assets'),
      filename: './js/bundle.js',
      chunkFilename: './js/[name].bundle.[chunkhash].js',
    },
    devtool: "source-map",
    module: {
      rules: [{
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            // customElement: true,
            // tag: 'my-comp'
          },
        }
      }, 
      // {
        // test: /\.js$/,
        // include: path.resolve(__dirname, 'js'),
        // use: [{
        //   loader: 'babel-loader',
        //   options: {
        //     presets: [["@babel/preset-env", {
        //       targets: {
        //         browsers: ['last 6 version', 'ie >= 9']
        //       },
        //       useBuiltIns: 'usage'
        //     }]]
        //   }
        // }]
      // }, 
      {
        test: /\.less$|\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            url: false
          }
        }, 
        // {
          // loader: 'postcss-loader',
          // options: {
          //   plugins: [
          //     autoprefixer({
          //       browsers: ['last 6 version', 'ie >= 9']
          //     }),
          //     options.mode === 'production' ? cssnano({
          //       preset: 'default',
          //     }) : function(){}
          //   ],
          //   sourceMap: true
          // }
        // }, {
          // loader: 'less-loader',
          // options: {
          //   paths: [
          //     path.resolve(__dirname, 'css') // для быстрого import из css/
          //   ],
          //   sourceMap: true
          // }
        // }
        ]
      }]
    },
    resolve: {
      // see below for an explanation
      mainFields: ['svelte', 'browser', 'module', 'main']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './css/bundle.css'
      })
    ]
  };
};
