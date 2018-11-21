module.exports = function(bh) {
    bh.match('pagination_fluid', function(ctx, json) {
        ctx.tag('nav');
        let content = ctx.content();
        ctx.content([
            {elem: 'control', content: '<'},
            {elem: 'list', props: json.props, content: content},
            {elem: 'control', content: '>'},
        ], true);
    });
};
