module.exports = [
    {tag: 'nav', content: [
        {block: 'pagination', content: [
            {elem: 'item', cls: 'page-item', content: [
                {block: 'a', cls: 'page-link', mix: {block: 'fi', mods: {icon: 'angle-left'}}},
            ]},
            new Array(5).fill('').map((item, index)=>[
                {elem: 'item', cls: 'page-item', content: [
                    {block: 'a', cls: 'page-link', content: ++index},
                ]},
            ]),
            {elem: 'item', cls: 'page-item', content: [
                {block: 'a', cls: 'page-link', mix: {block: 'fi', mods: {icon: 'angle-right'}}},
            ]},
        ]},
    ]},
];
