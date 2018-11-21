module.exports = function(bh) {
    bh.match('form-text', function(ctx, json) {
        ctx.tag('small');
    });
};
