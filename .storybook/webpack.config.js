const path = require('path');
const webpack = require('./../settings/webpack.config');
const utils = require('./../settings/utils');

const helpers = path.resolve(path.join(__dirname, '..', '.storybook', 'helpers.js'));
const pathsTmpls = path.resolve(path.join(__dirname, '..', 'src', 'bundles', 'storybook.bemjson.js'));

module.exports = async ({ config, mode }) => {
  config.entry = [
    ...config.entry,
    pathsTmpls,
  ];
  
  config.resolve.alias['helpers$'] = helpers;
  
  config.module.rules = [
    ...config.module.rules,
    ...webpack.module.rules.slice(3), // storybook сам обрабатывает статику отключим первые 3 лоадера
  ];
  config.plugins = [
    ...config.plugins,
    ...webpack.plugins,
  ];
  return config;
};
