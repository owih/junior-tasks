// plugins
const _ = require('lodash');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackAssetTemplatePlugin = require('@intervolga/html-webpack-asset-template-plugin');
const HtmlIndexPlugin = require('@intervolga/html-index-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

// config
const git = require('git-branch');
const path = require('path');
const utils = require('./utils');
const pkg = require('../package.json');

const branch = git.sync();
const mode = _.get(process, ['env', 'NODE_ENV'], 'production');
const proxy = _.get(pkg, ['proxy'], '');
const bemLevels = _.get(pkg, ['bemLevels'], []);
const bemTechs = _.get(pkg, ['bemTechs'], []);
const publicPath = mode === 'production' ? _.get(pkg, ['publicPath'], '') : '';

const modeProduction = Boolean(['production', 'branch', 'storybook'].indexOf(mode) + 1);

const dirProject = path.resolve(__dirname, '../');
const src = path.join(dirProject, 'src');
const srcBundles = path.join(src, 'bundles');
const srcGlobalSass = path.join(src, 'sass-globals', 'globals.scss');

const regex = (path) => /\.bemjson\.js$/i.test(path);
const pathsBundles = _.filter(utils.getAllFilesInPathSync(srcBundles, [], false), regex);

let dir = 'build';
if (mode === 'branch') dir = _.join(['branch', branch], '/');
if (mode === 'production') dir = 'dist';

const fileName = {
  dir,
  main: 'assets/[name].js',
  asset: 'assets/[path][name].[ext]',
  css: '[name].css',
};

const entries = pathsBundles;
const outputPath = path.join(dirProject, fileName.dir);

const entry = modeProduction
  ? {merged: entries}
  : _.keyBy(entries, (entry) => path.basename(entry, '.js'));

const HtmlWebpackPlugins = _.map(entries, (name) => {
  const base = path.basename(name, '.js');
  return new HtmlWebpackPlugin({
    chunks: [modeProduction ? 'merged' : base],
    filename: base + '.html',
    xhtml: true,
  });
});

module.exports = {
  mode,
  entry,
  output: {
    path: outputPath,
    filename: fileName.main,
    publicPath,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        bh: {
          test: /bh\.js$/,
          name: 'merged.bh',
          priority: 0,
        },
      },
    },
  },
  devServer: {
    contentBase: outputPath,
    host: '0.0.0.0',
    overlay: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    proxy: {
      '/proxy': {
        target: proxy,
        pathRewrite: {
          '^/proxy': '',
        },
        changeOrigin: true,
        secure: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff)(\?v=[\d+.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: fileName.asset},
          },
        ],
      },
      {
        test: /\.woff2(\?v=[\d+.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {name: fileName.asset, limit: 3072},
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: fileName.asset},
          },
          {
            loader: 'image-webpack-loader',
            options: {disable: !modeProduction},
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {minimize: modeProduction, sourceMap: modeProduction, importLoaders: 1},
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: modeProduction},
            },
          ],
        }),
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {minimize: modeProduction, sourceMap: modeProduction, importLoaders: 1},
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: modeProduction},
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: `@import ${JSON.stringify(srcGlobalSass)};`,
                sassOptions: {
                  sourceMap: modeProduction,
                  outputStyle: 'expanded',
                },
              },
            },
          ],
        }),
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {cacheDirectory: !modeProduction, babelrc: true},
          },
        ],
      },
      {
        test: /\.bemjson\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {cacheDirectory: !modeProduction, babelrc: true},
          },
          {
            loader: '@intervolga/bemrequire-loader',
          },
          {
            loader: '@intervolga/bembh-loader',
            options: {client: 'static', bhFilename: require.resolve('@intervolga/bh-ext')},
          },
          {
            loader: '@intervolga/bemdeps-loader',
            options: {levels: bemLevels, techMap: bemTechs},
          },
          {
            loader: '@intervolga/bemdecl-loader',
            options: {levels: bemLevels},
          },
          {
            loader: '@intervolga/bemjson-loader',
          },
          {
            loader: '@intervolga/eval-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(mode),
      'LANG': JSON.stringify('ru'),
    }),
    new webpack.ProvidePlugin({}),

    ...HtmlWebpackPlugins,
    new HtmlIndexPlugin({}),
    new HtmlWebpackAssetTemplatePlugin({}),

    new ExtractTextPlugin({
      allChunks: true,
      filename: fileName.css,
      disable: !modeProduction,
    }),
    new OptimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {preset: ['default', {discardComments: {removeAll: true}}]},
    }),
    new ImageminPlugin({test: /\.(jpe?g|png|gif|svg)$/i, disable: !modeProduction}),

    new CopyWebpackPlugin([
      {from: path.join(srcBundles, '**', '*.{jpeg,jpg,png,gif,svg,ico,json}'), context: srcBundles},
    ]),

    new CleanWebpackPlugin([outputPath]),
  ],
};
