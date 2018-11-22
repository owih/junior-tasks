module.exports = function (bh) {
    bh.match('card__collapse', function (ctx, json) {
        ctx.mix({block: 'collapse'});
        ctx.attrs({
            'id': ctx.tParam('ID') || ctx.generateId(),
        });
    });
};
