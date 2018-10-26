import Swiper from 'swiper/dist/js/swiper.min';
(($) => {
    const ClassName = {
        BLOCK: 'swiper-page-pagination',
        NEXT: 'swiper-page-pagination__button_next',
        PREV: 'swiper-page-pagination__button_prev',
    };

    const init = () => {
        Array.from(document.getElementsByClassName(ClassName.BLOCK)).forEach((block)=>{
            let $block = $(block).filter(':visible');
            if ($block.length) {
                if (!$block.data('swiper')) {
                    let active = Number(block.dataset.active) - 1;
                    let visible = Math.floor(block.offsetWidth / 40);
                    $block.data('swiper', new Swiper(block.getElementsByClassName('swiper-container')[0], {
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        watchSlidesVisibility: true,
                        initialSlide: (active > visible/2) ? active - visible/2 : 0,
                        navigation: {
                            nextEl: block.getElementsByClassName(ClassName.NEXT),
                            prevEl: block.getElementsByClassName(ClassName.PREV),
                        },
                    }));
                } else {
                    $block.data('swiper').update();
                }
            }
        });
    };
    init();
    $(document).on('OnDocumentHtmlChanged shown.bs.tab shown.bs.collapse shown.bs.modal', (event) => init);
})($);
