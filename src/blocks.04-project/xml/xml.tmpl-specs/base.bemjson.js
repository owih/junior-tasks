module.exports = [
  {block: 'xml', content: [
      {elem: 'result', content: 'Результат:'},
      {elem: 'number', content: 'Количество попыток:'},
      {block: 'btn', attrs: {'data-trigger': 'send'}, content: 'Отправить запрос'},
    ]},
];
