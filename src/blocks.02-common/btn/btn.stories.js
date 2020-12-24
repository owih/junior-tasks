const {getExample} = require('helpers');
module.exports = Object.assign({
  default: {
    title: 'Blocks/btn',
  },
}, getExample(require.context('!!babel-loader!./', true, /\.tmpl-specs\/(.*).bemjson\.js$/)));
