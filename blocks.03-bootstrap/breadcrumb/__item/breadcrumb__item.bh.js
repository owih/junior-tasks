module.exports = function(bh) {
    bh.match('breadcrumb__item', function(ctx, json) {
        let isActive = ctx.mod('active');
        ctx
            .tag('li')
            .content(
                !isActive ? {block: 'a', content: ctx.content()} : {tag: 'span', content: ctx.content()},
                ctx.isSimple(ctx.content())
            );
    });
};
