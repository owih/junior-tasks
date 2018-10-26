import 'lightgallery.js';
const Selector = {
    TARGET: '[data-toggle="lightgallery"]',
    GALLERY: '.lightgallery',
};
(($) => {
    $(Selector.TARGET).each((index, item) => {
        if (!$(Selector.GALLERY).has(item).length) {
            lightGallery(document.body, {
                selector: Selector.TARGET,
            });
        }
    });
    $(Selector.GALLERY).each((index, item)=>{
        lightGallery(item, {
            selector: Selector.TARGET,
        });
    });
})($);
