module.exports = function(bh) {
    bh.match('card', function(ctx, json) {
        ctx.tParam('ID', ctx.generateId(), true);
    });
};
