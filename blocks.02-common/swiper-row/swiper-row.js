import Swiper from 'swiper/dist/js/swiper.min';
(($) => {
    let instance = Array.from(document.getElementsByClassName('swiper-row')).map((block)=>{
        return new Swiper(block.getElementsByClassName('swiper-container')[0], {
            slidesPerView: 'auto',
            spaceBetween: 0,
            watchSlidesVisibility: true,
            slidesPerGroup: 1,
            navigation: {
                nextEl: block.getElementsByClassName('swiper-row__button_next'),
                prevEl: block.getElementsByClassName('swiper-row__button_prev'),
            },
            pagination: {
                el: block.getElementsByClassName('swiper-pagination'),
                type: 'bullets',
                clickable: true,
            },
        });
    });
    $(document).on('shown.bs.tab shown.bs.collapse shown.bs.modal', (event) => {
        instance.forEach((swiper) => {
            swiper.update();
        });
    });
})($);
