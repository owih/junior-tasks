module.exports = function(bh) {
    bh.match('rating', function(ctx, json) {
        let name = ctx.generateId();
        ctx.content(
            new Array(5).fill([
                {elem: 'item', content: [
                    {block: 'fi', mods: {icon: 'star-o'}},
                ]},
            ])
        );
        if (json.control) {
            ctx.content([
                ctx.content().map(() => {
                    let id = ctx.generateId();
                    return [
                        {elem: 'input', attrs: {name: name, id: id}},
                        {elem: 'item', attrs: {for: id}, content: [
                            {block: 'fi', mods: {icon: 'star-o'}},
                        ]},
                    ];
                }),
                {block: 'tooltip-form-control', cls: 'invalid-feedback', content: {block: 'text-white', content: 'Поле заполнено не верно'}},
            ], true);
        } else {
            ctx.attrs({'data-rating': '3', 'data-content': 'Рейтинг: 3,5'});
        }
    });
};
