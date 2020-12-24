const {getExample} = require('helpers');
module.exports = Object.assign({
  default: {
    title: 'Blocks/palette',
  },
}, getExample(require.context('!!babel-loader!./', true, /\.tmpl-specs\/(.*).bemjson\.js$/)));
