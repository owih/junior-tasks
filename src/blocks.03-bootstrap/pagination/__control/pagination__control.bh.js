module.exports = function(bh) {
    bh.match('pagination__control', function(ctx, json) {
        ctx.mix({block: 'page-item'});
        let content = ctx.content();
        if (ctx.isSimple(content)) {
            ctx.content({tag: 'button', attrs: {type: 'button'}, cls: 'page-link', content: content}, true);
        }
    });
};
