module.exports = function (bh) {
    bh.match('breadcrumb_fluid', function (ctx, json) {
        ctx.tag('nav');
        let content = ctx.content(); 
        ctx.content({elem: 'list', content: content}, true);
    });
};
