const path = require('path');
const fs = require('fs');
const yml = require('js-yaml');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CordovaHtmlOutputPlugin = require('./webpack/plugins/CordovaHtmlOutputPlugin.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const envConfig = yml.safeLoad(fs.readFileSync('./env.yml', 'utf8'));

const entryFile = path.join(__dirname, 'src/main.ts');
const devServerPort = 8081;

let config = function (env) {
  const envName = (env && typeof env !== "undefined" && env.release) ? 'production' : 'development'

  let returner = {
    entry: entryFile,
    mode: envName,

    resolve: {
      extensions: ['.js', '.json', '.ts'],
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        'src': path.resolve(__dirname, 'src/'),
        'assets': path.resolve(__dirname, 'src/assets/'),
        'classes': path.resolve(__dirname, 'src/classes/'),
        'components': path.resolve(__dirname, 'src/components/'),
        'utils': path.resolve(__dirname, 'src/utils/'),
      }
    },

    output: {
      pathinfo: true,
      devtoolLineToLine: true,
      filename: '[hash].[name].js',
      sourceMapFilename: "[hash].[name].js.map",
      path: path.join(__dirname, 'www')
    },

    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/,
          loader: 'file-loader',
          options: {name: '[name].[ext]?[hash]'}
        },
        {
          test: /\.(woff2?|eot|ttf|otf|mp3|wav)(\?.*)?$/,
          loader: 'file-loader',
          options: {name: '[name].[ext]?[hash]'}
        },
        {
          test: /\.svg$/,
          loader: 'url-loader'
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(envName),
          ...Object.assign({}, ...Object.entries(envConfig.default).concat(Object.entries(envConfig[envName])).map((keyValue)  => {
            return {[keyValue[0]]: JSON.stringify(keyValue[1])}
          })),
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true,
        meta: {
          // 'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' }
        },
        minify: {
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeAttributeQuotes: true,
          useShortDoctype: true,
          decodeEntities: true,
          collapseWhitespace: true,
          minifyCSS: true
        }
      }),
    ]
  };

  if (typeof env === 'undefined' || typeof env.devserver === 'undefined') {
    returner.plugins.push(new CordovaHtmlOutputPlugin());
    returner.plugins.push(new ExtractTextPlugin("styles.css"));
    returner.module.rules.push({
      test: /\.scss$/, use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
              loader: 'css-loader',
              options: {
                  minimize: true
              }
          },
          {
              loader: 'sass-loader'
          }
      ]
      })
    })
  } else {
    returner.module.rules.push({
      test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader']
    })
  }

  if (env) {
    if (typeof env.devserver !== 'undefined' && env.devserver) {
      returner.entry = [
        entryFile,
        path.resolve(__dirname, "webpack/dev_helpers/CordovaDeviceRouter.js")
      ]
      returner.output.publicPath = "/"
      returner.devtool = "eval"
      returner.devServer = {
        contentBase: path.join(__dirname, "www"),
        port: devServerPort,
        stats: {colors: true},
        watchOptions: {
          aggregateTimeout: 300,
          poll: 100,
          ignored: /node_modules|platforms/,
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        host: "0.0.0.0"
      }
      returner.plugins.push(new webpack.NamedModulesPlugin())
    } else if (typeof env.release !== 'undefined' && env.release) {
      returner.plugins.push(new CleanPlugin("www", {
        root: path.join(__dirname, "."),
        dry: false,
        verbose: false,
        exclude: ["index.html"]
      }))
      returner.plugins.push(new UglifyJsPlugin())
    }
  }

  return returner
}

module.exports = config
