const fs = require('fs');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackAssetTemplatePlugin = require('@intervolga/html-webpack-asset-template-plugin');
const HtmlIndexPlugin = require('@intervolga/html-index-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const pkg = require('./package.json');


const isProd = 'production' === process.env.NODE_ENV;
const srcPath = path.resolve(__dirname, 'src', 'bundles');

const bemJsonEntries = fs.readdirSync(srcPath)
    .filter((file) => {
      if (process.env.page && (file.indexOf(process.env.page) < 0)) return false;
      return /\.bemjson\.js$/i.test(file);
    })
    .map((file) => path.join(srcPath, file));

const moduleEntries = {};
if (isProd) {
  moduleEntries.merged = bemJsonEntries;
} else {
  bemJsonEntries.forEach((bundle)=>{
    moduleEntries[path.basename(bundle, '.js')] = bundle;
  });
}

const clientBH = 'static';


module.exports = {
  entry: moduleEntries,
  output: {
    path: path.resolve(__dirname, isProd ? 'dist' : 'build'),
    filename: 'assets/[name].js',
    publicPath: '',
  },
  devtool: isProd ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff)(\?v=[\d+.]+)?$/,
        loader: 'file-loader',
        options: {name: 'assets/[path][name].[ext]'},
      },
      {
        test: /\.woff2(\?v=[\d+.]+)?$/,
        loader: 'url-loader',
        options: {name: 'assets/[path][name].[ext]', limit: 3072},
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: 'assets/[path][name].[ext]'},
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: !isProd,
            },
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
              options: {minimize: isProd, sourceMap: isProd, importLoaders: 1},
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: isProd},
            },
          ],
        }),
      },
      {
        test: /\.(scss$)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {minimize: isProd, sourceMap: isProd, importLoaders: 1},
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: isProd},
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                data: `@import ${JSON.stringify(path.join( __dirname, 'src', 'sass-globals', 'sass-globals.scss'))};`,
                sourceMap: isProd,
              },
            },
          ],
        }),
      },
      {
        test: /\.bemjson\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: !isProd,
              babelrc: true,
            },
          },
          '@intervolga/bemrequire-loader',
          {
            loader: '@intervolga/bembh-loader',
            options: {
              client: clientBH,
              bhFilename: require.resolve('@intervolga/bh-ext'),
            },
          },
          {
            loader: '@intervolga/bemdeps-loader',
            options: {
              levels: pkg.bemLevels,
              techMap: pkg.bemTechs,
            },
          },
          {
            loader: '@intervolga/bemdecl-loader',
            options: {levels: pkg.bemLevels},
          },
          '@intervolga/bemjson-loader',
          '@intervolga/eval-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: !isProd,
            babelrc: true,
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },

  plugins: [
    // Common plugins
    new CleanWebpackPlugin(['dist', 'build']),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'LANG': JSON.stringify('ru'),
    }),
    new webpack.ProvidePlugin({}),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].css',
      disable: !isProd,
    }),
    ...bemJsonEntries.map((bemJsonName) => {
      const base = path.basename(bemJsonName, '.js');
      return new HtmlWebpackPlugin({
        chunks: [isProd ? 'merged' : base],
        filename: base + '.html',
        xhtml: true,
      });
    }),
    new HtmlWebpackAssetTemplatePlugin(),
    new HtmlIndexPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(srcPath, '**', '*.{jpeg,jpg,png,gif,svg,ico,json}'),
        context: srcPath,
      },
    ]),
    new VueLoaderPlugin(),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: isProd,
    }),
    ...isProd ? [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new OptimizeCssnanoPlugin({
        sourceMap: true,
        cssnanoOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
      }),
    ]: [],
  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'swiper': 'swiper/dist/js/swiper.min.js',
    },
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
    contentBase: path.resolve(__dirname, isProd ? 'dist' : 'build'),
    host: '0.0.0.0',
    overlay: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    proxy: {
      '/shopm': {
        target: 'http://shopm.iv34.ru',
        pathRewrite: {
          '^/shopm': '',
        },
        changeOrigin: true,
        secure: true,
      },
    },
  },
};
