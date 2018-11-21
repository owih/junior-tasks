module.exports = function(bh) {
    bh.match('modal__close', function(ctx, json) {
        ctx
            .tag('button')
            .mix({block: 'close'})
            .attrs({
                'data-dismiss': 'modal',
            })
            .content('&times;');
    });
};
