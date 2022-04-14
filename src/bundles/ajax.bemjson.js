module.exports = {
  block: 'page',
  title: 'AJAX',
  content: [
    require('./common/header.bemjson'),
    {cls: 'p-4', content: [
        require('./../blocks.04-project/xml/xml.tmpl-specs/base.bemjson'),
      ]},
    require('./common/footer.bemjson'),
  ],
};
