module.exports = function(bh) {
    bh.match('dropdown-menu', function(ctx, json) {
        let isArray = Array.isArray(ctx.content());
        ctx.content(
            isArray &&
            ctx.content().map((item) => [{elem: 'item', mix: {block: 'dropdown-item'}, content: item}]),
            isArray
        );
    });
};
