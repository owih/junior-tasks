module.exports = function(bh) {
    bh.match('nav__item', function(ctx, json) {
        ctx.tag('li');
    });
};
