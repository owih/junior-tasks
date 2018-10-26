const ITEMS = 25;
const ACTIVE = 1;
module.exports = [
    {block: 'swiper-page-pagination', attrs: {'data-active': ACTIVE}, content: [
        {elem: 'button', mods: {prev: true}, content: [
            {block: 'a', cls: 'page-link m-0', mix: {block: 'fi', mods: {icon: 'angle-left'}}},
        ]},
        {cls: 'swiper-container swiper-container-horizontal', content: [
            {cls: 'swiper-wrapper', content: [
                {cls: 'swiper-slide w-auto m-0 page-item disabled', content: [
                    {block: 'a', cls: 'page-link m-0', mix: {block: 'fi', mods: {icon: 'angle-left'}}},
                ]},
                new Array(ITEMS).fill('').map((item, index) => [
                    {cls: index + 1 == ACTIVE ? 'swiper-slide w-auto page-item active' : 'swiper-slide w-auto page-item', content: [
                        {block: 'a', cls: 'page-link active', content: index + 1},
                    ]},
                ]),
                {cls: 'swiper-slide w-auto page-item', content: [
                    {block: 'a', cls: 'page-link', mix: {block: 'fi', mods: {icon: 'angle-right'}}},
                ]},
            ]},
        ]},
        {elem: 'button', mods: {next: true}, content: [
            {block: 'a', cls: 'page-link', mix: {block: 'fi', mods: {icon: 'angle-right'}}},
        ]},
    ]},
];
