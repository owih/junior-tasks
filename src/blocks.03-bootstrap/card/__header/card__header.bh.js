module.exports = function(bh) {
    bh.match('card__header', function(ctx, json) {
        ctx.mix({block: 'card-header'});
        ctx.tag('h4');
    });
};
