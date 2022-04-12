module.exports = {
    block: 'page',
    title: 'Пустая',
    content: [
        require('./common/header.bemjson'),
        {block: 'img', mods: {lazy: true}, src: 'http://place-hold.it/1200x200'},
        require('./common/footer.bemjson'),
    ],
};
