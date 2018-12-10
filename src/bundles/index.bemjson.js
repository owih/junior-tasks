module.exports = {
    block: 'page',
    title: 'Пустая',
    content: [
        require('./common/header.bemjson'),
        {cls: 'container p-3', content: [
            {block: 'spreadsheet', attrs: {'data-url': 'stubs/log.json'}},
        ]},
        require('./common/footer.bemjson'),
    ],
};
