module.exports = function(bh) {
    bh.match('breadcrumb_swiper', function(ctx, json) {
        let length = ctx.content().length;
        ctx
            .tag('nav')
            .cls('swiper-container')
            .content([
                {tag: 'ol', cls: 'swiper-wrapper m-0 p-0', content: [
                    ctx.content().map((item, index)=>{
                        let isActive = length == index + 1;
                        return ctx.isSimple(item) ? {elem: 'item', cls: 'swiper-slide', elemMods: {active: isActive}, content: item} : item;
                    }),
                ]},
            ], true);
    });
};
