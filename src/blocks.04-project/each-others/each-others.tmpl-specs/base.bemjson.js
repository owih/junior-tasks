module.exports = [
  {block: 'each-others', content: [
    {elem: 'table', tag: 'table', content: [
      {elem: 'row', tag: 'tr', content: [
          {elem: 'column', mix: {elem: 'bottom'}, tag: 'td', content: [
            {elem: 'text', mix: {elem: 'right'}, content: 'Текст-заполнитель — это текст, который имеет некоторые характеристики реального письменного текста, но является случайным                  набором слов или сгенерирован иным образом.'},
            ]},
          {elem: 'column', tag: 'td', content: [
              {block: 'image', mods: {size: '100x100'}, content: [
                  {block: 'img', mods: {lazy: true}, src: 'https://via.placeholder.com/100'},
                ]},
            ]},
          {elem: 'column', mix: {elem: 'bottom'}, tag: 'td', content: [
              {elem: 'text', mix: {elem: 'left'}, content: 'Some text'},
              {elem: 'text', mix: {elem: 'center'}, content: 'Some text'},
              {elem: 'text', mix: {elem: 'right'}, content: 'Some text'},
            ]},
        ]},
        {elem: 'row', tag: 'tr', content: [
            {elem: 'column', mix: {elem: 'right'}, tag: 'td', content: [
                {block: 'image', mods: {size: '150x150'}, content: [
                    {block: 'img', mods: {lazy: true}, src: 'https://via.placeholder.com/150'},
                  ]},
              ]},
            {elem: 'column', mix: {elem: 'top'}, tag: 'td', content: [
                {elem: 'text', mix: {elem: 'right'}, content: 'Some text'},
                {elem: 'text', mix: {elem: 'center'}, content: 'Some text'},
                {elem: 'text', mix: {elem: 'left'}, content: 'Some text'},

              ]},
            {elem: 'column', mix: {elem: 'center'}, tag: 'td', content: [
                {elem: 'text', content: 'Текст-заполнитель — это текст, который имеет некоторые характеристики реального письменного текста, но является случайным                  набором слов или сгенерирован иным образом.'},
              ]},
          ]},
      ]},
    ]},
];
