module.exports = function (bh) {
    bh.match('pagination__list', function (ctx, json) {
        ctx.tag('ul');
        let props = Object.assign({
            amount: 3,
            active: 0,
        }, json.props ? json.props : {});
        if (props.amount) {
            let content = [...new Array(props.amount)].map((item, index) => [
                {elem: 'item', props: {active: index == props.active}, content: index + 1},
            ]);
            ctx.content(content);
        }
    });
};
