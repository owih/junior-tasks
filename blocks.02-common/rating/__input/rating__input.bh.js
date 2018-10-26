module.exports = function(bh) {
    bh.match('rating__input', function(ctx, json) {
        ctx
            .tag('input')
            .cls('custom-control-input')
            .attrs({
                type: 'radio',
                required: true,
            });
    });
};
