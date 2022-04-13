module.exports = [
  {block: 'inline', content: [
      {elem: 'content', content: [
        {elem: 'text', content: 'Some unreachable text'},
        {elem: 'image', mix: {elem: 'top'}, content: [
            {block: 'image', mods: {size: '100x100'}, content: [
                {block: 'img', mods: {lazy: true}, src: 'https://via.placeholder.com/100x100'},
              ]},
          ]},
        ]},
      {elem: 'content', content: [
          {elem: 'text', content: 'Some unreachable text'},
          {elem: 'image', mix: {elem: 'middle'}, content: [
              {block: 'image', mods: {size: '100x100'}, content: [
                  {block: 'img', mods: {lazy: true}, src: 'https://via.placeholder.com/100x100'},
                ]},
            ]},
        ]},
      {elem: 'content', content: [
          {elem: 'text', content: 'Some unreachable text'},
          {elem: 'image', mix: {elem: 'bottom'}, content: [
              {block: 'image', mods: {size: '100x100'}, content: [
                  {block: 'img', mods: {lazy: true}, src: 'https://via.placeholder.com/100x100'},
                ]},
            ]},
        ]},
    ]},
];
