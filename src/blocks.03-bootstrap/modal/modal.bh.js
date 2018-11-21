module.exports = function(bh) {
    bh.match('modal', function(ctx, json) {
        ctx
            .attrs({
                id: ctx.generateId(),
                tabindex: '-1',
                role: 'dialog',
            });
    });
};
