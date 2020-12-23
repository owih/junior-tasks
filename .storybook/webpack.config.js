const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dirProject = path.resolve(__dirname, '../');

const src = path.join(dirProject, 'src');
const srcBundles = path.join(src, 'bundles');

module.exports = async ({ config, mode }) => {
  const modeProduction = mode === 'production';
  config.module.rules.push({
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: !modeProduction,
          babelrc: true,
        }
      },
    ],
  });
  config.plugins.push(
    new CopyWebpackPlugin([
      {from: path.join(srcBundles, '**', '*.{jpeg,jpg,png,gif,svg,ico,json}'), context: srcBundles},
    ]),
  );
  // Return the altered config
  return config;
};
