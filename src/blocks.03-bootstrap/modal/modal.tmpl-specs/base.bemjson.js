module.exports = [
    {tag: 'a', attrs: {'data-toggle': 'modal', 'href': '#ID'}, content: 'Модальное окно'},
    {block: 'modal', cls: 'fade', attrs: {'id': 'ID'}, content: [
        {elem: 'dialog', cls: 'modal-dialog-centered modal-lg', content: [
            {elem: 'header', content: [
                {elem: 'title', content: 'Заголовок модального окна'},
                {elem: 'close', content: {block: 'fi', mods: {icon: 'close'}}},
            ]},
            {elem: 'body', content: [
                {tag: 'p', content: 'Содержимое модального окна'},
            ]},
            {elem: 'footer', content: [
                {block: 'btn', content: 'Сохранить'},
            ]},
        ]},
    ]},
];
