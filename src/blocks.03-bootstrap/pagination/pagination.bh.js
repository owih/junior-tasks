module.exports = function(bh) {
    bh.match('pagination', function(ctx, json) {
        ctx.tag('ul');
    });
};
