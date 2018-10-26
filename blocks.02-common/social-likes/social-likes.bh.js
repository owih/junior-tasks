module.exports = function(bh) {
    bh.match('social-likes', function(ctx, json) {
        ctx.content(ctx.content().map((item)=>[
            {cls: item, attrs: {'data-service': item}},
        ]), true);
    });
};
