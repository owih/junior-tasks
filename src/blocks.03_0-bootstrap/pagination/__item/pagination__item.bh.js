module.exports = function(bh) {
    bh.match('pagination__item', function(ctx, json) {
        ctx.tag('li');
    });
};
