module.exports = function(bh) {
    bh.match('card__link', function(ctx, json) {
        ctx.tag('a').attrs({
            'href': `#${ctx.tParam('ID') ? ctx.tParam('ID') : ''}`,
            'data-toggle': 'collapse',
        });
    });
};
