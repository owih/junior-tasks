module.exports = function(bh) {
    bh.match('rating__item', function(ctx, json) {
        ctx.attr('for') && ctx.tag('label');
    });
};
