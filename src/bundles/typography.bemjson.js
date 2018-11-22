module.exports = {
    block: 'page',
    title: 'Шаблон типографии',
    content: [
        require('./common/header.bemjson'),
        {block: 'main', content: [
            {mix: {block: 'container'}, content: [
                require('./common/examples.bemjson'),
            ]},
        ]},
        require('./common/footer.bemjson'),
    ],
};
