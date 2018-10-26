module.exports = function(bh) {
    bh.match('needs-validation', function(ctx, json) {
        ctx.tag('form').attrs({
            novalidate: true,
        });
    });
};
