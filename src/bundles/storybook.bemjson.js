const path = require('path');
const utils = require('./../../settings/utils');
const src = path.resolve(__dirname, '../');

module.exports = {
  block: 'page',
  title: 'Storybook example',
  content: utils.getAllFilesInPathSync(src)
    .filter((path) => /.tmpl-specs.*\.bemjson\.js$/i.test(path))
    .map((path)=> require(path)),
};
