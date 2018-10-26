import Inputmask from 'inputmask';
(($) => {
    let im = new Inputmask();
    let target = '[data-inputmask], [data-inputmask-regex]';
    window.Inputmask = Inputmask;
    $(document)
        .on('OnDocumentHtmlChanged', () => {
            im.mask($(target).not('.init').addClass('init').toArray());
        })
        .on('ready', () => {
            im.mask($(target).not('.init').addClass('init').toArray());
        });
})($);
