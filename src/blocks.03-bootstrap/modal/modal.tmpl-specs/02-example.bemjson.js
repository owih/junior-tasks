module.exports = [
    {block: 'modal', attrs: {style: 'display: block; position: relative'}, content: [
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
