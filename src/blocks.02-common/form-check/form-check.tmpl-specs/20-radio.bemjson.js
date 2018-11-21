module.exports = [
    {block: 'form-check', prop: {type: 'radio', name: 'RADIO_TEST', checked: true}, content: 'Радио кнопка выбрана'},
    {block: 'form-check', prop: {type: 'radio', name: 'RADIO_TEST'}, content: 'Радио кнопка'},
    {block: 'form-check', prop: {type: 'radio', name: 'RADIO_TEST'}, disabled: true, content: 'Радио кнопка заблокирована'},
    {block: 'form-check', prop: {type: 'radio', checked: true, disabled: true}, content: 'Радио кнопка заблокирована/выбрана'},
];
