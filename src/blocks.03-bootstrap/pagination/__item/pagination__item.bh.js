module.exports = function (bh) {
    bh.match('pagination__item', function (ctx, json) {
        ctx.tag('li');
        ctx.mix({block: 'page-item'});
        let active = json.active;
        let content = ctx.content();
        if (ctx.isSimple(content)) {
            if (!active) {
                ctx.content({block: 'a', cls: 'page-link', content: content}, true);
            } else {
                ctx.mix({block: 'active'});
                ctx.content({tag: 'span', cls: 'page-link', content: content}, true);
            }
        }
    });
};
