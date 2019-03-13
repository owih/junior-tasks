module.exports = function(bh) {
    bh.match('breadcrumb__item', function(ctx, json) {
        ctx.tag('li');
        ctx.mix({block: 'breadcrumb-item'});
        let content = ctx.content();
        if (ctx.isSimple(content)) {
            if (!ctx.isLast()) {
                ctx.content({block: 'a', content: content}, true);
            } else {
                ctx.content({tag: 'span', content: content}, true);
            }
        }
    });
};
