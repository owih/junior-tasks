module.exports = {
    block: 'page',
    title: 'Пустая',
    content: [
        require('./common/header.bemjson'),
        {cls: 'container p-3', content: [
            require('./common/virtualized.bemjson'),
        ]},
        require('./common/footer.bemjson'),
    ],
};
