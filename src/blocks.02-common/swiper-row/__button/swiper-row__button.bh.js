module.exports = function(bh) {
    bh.match('swiper-row__button', function(ctx, json) {
        ctx.tag('button').attr('type', 'button');
    });
};
