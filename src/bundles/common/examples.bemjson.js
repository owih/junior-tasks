const examples = [
    {title: 'Глобальные настройки', example: [
        require('./../../blocks.02-common/gide-line/gide-line.tmpl-specs/01-headings.bemjson'),
    ]},
    {title: 'Используемые цвета', example: [
        require('./../../blocks.02-common/palette/palette.tmpl-specs/01-default.bemjson'),
    ]},
    {title: 'Заголовки', example: [
        require('./../../blocks.01-base/h/h.tmpl-specs/10-all.bemjson'),
    ]},
    {title: 'Таблицы', example: [
        require('./../../blocks.01-base/table/table.tmpl-specs/10-all.bemjson.js'),
    ]},
    {title: 'Изображения с подписью (Figures)', example: [
        require('./../../blocks.01-base/figure/figure.tmpl-specs/10-all.bemjson.js')
    ]},
    {title: 'Списки', example: [
        require('./../../blocks.01-base/list/list.tmpl-specs/10-default.bemjson'),
        require('./../../blocks.01-base/list/list.tmpl-specs/20-numerical.bemjson'),
    ]},
    {title: 'Хлебные крошки', example: [
        require('./../../blocks.03-bootstrap/breadcrumb/breadcrumb.tmpl-specs/01-default.bemjson'),
        require('./../../blocks.03-bootstrap/breadcrumb/breadcrumb.tmpl-specs/02-fluid.bemjson'),
    ]},
    {title: 'Постраничная навигация', example: [
        require('./../../blocks.03-bootstrap/pagination/pagination.tmpl-specs/01-default.bemjson'),
        require('./../../blocks.03-bootstrap/pagination/pagination.tmpl-specs/02-fluid.bemjson'),
    ]},
    {title: 'Кнопки', example: [
        require('./../../blocks.02-common/btn/btn.tmpl-specs/10-all-styled.bemjson.js'),
        require('./../../blocks.02-common/btn/btn.tmpl-specs/20-all-size.bemjson.js'),
    ]},
    {title: 'Элементы формы', example: [
        require('./../../blocks.02-common/form-control/form-control.tmpl-specs/10-default.bemjson.js'),
        require('./../../blocks.02-common/form-control/form-control.tmpl-specs/20-select.bemjson.js'),
        require('./../../blocks.02-common/form-control/form-control.tmpl-specs/30-textarea.bemjson.js'),
        require('./../../blocks.02-common/form-control/form-control.tmpl-specs/40-file.bemjson.js'),
        require('./../../blocks.02-common/form-check/form-check.tmpl-specs/10-checkbox.bemjson.js'),
        require('./../../blocks.02-common/form-check/form-check.tmpl-specs/20-radio.bemjson.js'),
    ]},
    {title: 'Модальное окно', example: [
        require('./../../blocks.03-bootstrap/modal/modal.tmpl-specs/02-example.bemjson'),
    ]},
];
const example = (block) => [
    {block: 'example', content: [
        {elem: 'view', content: block},
        {elem: 'schema', content: `${JSON.stringify(block, null, 2)}`},
    ]},
];
module.exports = [
    {cls: 'row', content: [
        {cls: 'col-12', content: [
            {cls: 'accordion', attrs: {id: 'examples'}, content: [
                examples.map((item) => [
                    {block: 'card', mix: {block: 'mb-4'}, content: [
                        {elem: 'header', content: [
                            {elem: 'link', content: item.title},
                        ]},
                        {elem: 'collapse', attrs: {'data-parent': '#examples'}, content: [
                            {elem: 'body', cls: 'p-0', content: [
                                Array.isArray(item.example) && item.example.map((block) => {
                                    if (Array.isArray(block)) {
                                        return block.map((block) => example(block));
                                    } else {
                                        return example(block);
                                    }
                                })
                            ]},
                        ]},
                    ]},
                ]),
            ]},
        ]},
    ]},
];