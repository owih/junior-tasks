import {Util} from 'bootstrap';
(($)=>{
    const EVENT = {
        SHOW: 'show.iv.open',
        HIDE: 'hide.iv.open',
    };
    const CLASS = {
        SHOW: 'show',
    };
    const SELECTOR = {
        DATA_TOGGLE: '[data-toggle="open"]',
    };
    $(document).on('click', SELECTOR.DATA_TOGGLE, (event)=>{
        let target = $(Util.getSelectorFromElement(event.currentTarget));
        let isOpen = target.toggleClass(CLASS.SHOW).hasClass(CLASS.SHOW);
        target.trigger(new $.Event(isOpen ? EVENT.SHOW : EVENT.HIDE));
        event.preventDefault();
    });
})($);
