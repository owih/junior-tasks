import Swiper from 'swiper/dist/js/swiper.min';
$('.breadcrumb_swiper').each((index, item) => {
    let $this = $(item);
    let delay = $this.data('delay');
    let api = new Swiper(item, {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        freeModeMomentum: false,
        autoplay: delay && {
            delay: delay,
        },
    });
    $this.data('swiper', api);
});
