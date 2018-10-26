module.exports = function(bh) {
    bh.match('main', function(ctx, json) {
        ctx.tag('main');
    });
};
