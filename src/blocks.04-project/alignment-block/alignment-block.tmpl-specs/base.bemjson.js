const alignmentData = [
  'left-top',
  'center-top',
  'right-top',
  'left-center',
  'center-middle',
  'right-middle',
  'left-bottom',
  'center-bottom',
  'right-bottom',
];

module.exports = [
  {block: 'alignment-block', content: [
    {elem: 'wrapper', content: [
        {elem: 'grid-item'},
        {elem: 'grid-item'},
        {elem: 'grid-item'},
        {elem: 'grid-item'},
        {elem: 'center', content: alignmentData.map((item) => [
            {elem: 'item', attrs: {'data-alignment': item}, content: [
                {elem: 'text', content: item},
                {elem: 'example', attrs: {'data-example': item}},
              ]},
          ])},
        {elem: 'grid-item'},
        {elem: 'grid-item'},
        {elem: 'grid-item'},
        {elem: 'grid-item'},
      ]},
    ]},
];
