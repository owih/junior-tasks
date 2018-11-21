module.exports = function(bh) {
    bh.match('breadcrumb__list', function(ctx, json) {
        ctx.tag('ol');
        let content = ctx.content();
        if (Array.isArray(content)) {
            content = content.map((item, index) => ctx.isSimple(item) ? {elem: 'item', cls: 'breadcrumb-item', content: item} : item);
            ctx.content(content, true);
        }
    });
};
