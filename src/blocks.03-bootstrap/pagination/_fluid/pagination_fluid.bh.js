module.exports = function(bh) {
    bh.match('pagination_fluid', function(ctx, json) {
        ctx.tag('nav');
        let content = ctx.content();
        ctx.content([
            {elem: 'control', elemMods: {prev: true}, content: '&laquo;'},
            {elem: 'list', props: json.props, content: content},
            {elem: 'control', elemMods: {next: true}, content: '&raquo;'},
        ], true);
    });
};
