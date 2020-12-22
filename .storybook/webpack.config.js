const path = require('path');
const babelrcRoots = path.resolve(__dirname, '../');
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
  // Return the altered config
  return config;
};
