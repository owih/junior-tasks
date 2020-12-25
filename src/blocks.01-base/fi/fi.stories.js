const {getExample} = require('helpers');
module.exports = Object.assign({
  default: {
    title: 'Blocks/fi',
  },
}, getExample(require.context('!!babel-loader!./', true, /\.tmpl-specs\/(.*).bemjson\.js$/)));
