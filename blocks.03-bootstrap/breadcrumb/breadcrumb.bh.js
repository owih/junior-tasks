module.exports = function(bh) {
    bh.match('breadcrumb', function(ctx, json) {
        bh.cbc('breadcrumb__item', 'breadcrumb-item');
        let length = ctx.content().length;
        ctx
            .tag('ol')
            .content([
                ctx.content().map((item, index)=>{
                    let isActive = length == index + 1;
                    return ctx.isSimple(item) ? {elem: 'item', elemMods: {active: isActive}, content: item} : item;
                }),
            ], true);
    });
};
