const {getExample} = require('helpers');
module.exports = Object.assign({
  default: {
    title: 'Blocks/list',
  },
}, getExample(require.context('!!babel-loader!./', true, /\.tmpl-specs\/(.*).bemjson\.js$/)));
