module.exports = function(bh) {
    bh.match('pagination__item', function(ctx, json) {
        ctx.tag('li');
        ctx.mix({block: 'page-item'});
        let props = Object.assign({
            active: false,
        }, json.props ? json.props : {});
        let content = ctx.content();
        if (ctx.isSimple(content)) {
            if (props.active) {
                ctx.mix({block: 'active'});
                ctx.content({tag: 'span', cls: 'page-link', content: content}, true);
            } else {
                ctx.content({block: 'a', cls: 'page-link', content: content}, true);
            }
        }
    });
};
