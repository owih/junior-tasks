module.exports = function (bh) {
    bh.match('spreadsheet', function (ctx, json) {
        ctx.tParam('ID', ctx.generateId());
        ctx.attrs({
            'id': ctx.tParam('ID'),
        });
    });
};
