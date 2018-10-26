module.exports = function(bh) {
    bh.match('col-form-label', function(ctx, json) {
        ctx.tag('label');
    });
};
