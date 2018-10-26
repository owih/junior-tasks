const FixedTopControl = (()=>{
    const CLASS = {
        BLOCK: 'fixed-top-control',
        FIXED: 'fixed-top',
        STICKY: 'sticky-top',
    };
    const EVENT = {
        FIXED: 'fixed.iv.fixedTopControl',
        STICK: 'sticky.iv.fixedTopControl',
    };
    class FixedTopControl {
        constructor(className) {
            this.elements = document.getElementsByClassName(className);
            window.addEventListener('scroll', this.check.bind(this));
        }
        check() {
            Array.prototype.forEach.call(this.elements, (elem) => {
                if (elem.children[0].className.indexOf(CLASS.STICKY) + 1) {
                    elem.children[0].isStycky = true;
                }
                if (FixedTopControl.offset(elem).top < window.pageYOffset) {
                    elem.style.height = elem.offsetHeight + 'px';
                    elem.children[0].classList.add(CLASS.FIXED);
                    elem.children[0].classList.remove(CLASS.STICKY);
                    if (!elem.children[0].isFixed) {
                        $(elem.children[0]).trigger(new $.Event(EVENT.FIXED));
                    }
                    elem.children[0].isFixed = true;
                } else {
                    elem.style.height = '';
                    elem.children[0].classList.remove(CLASS.FIXED);
                    if (elem.children[0].isStycky) {
                        elem.children[0].classList.add(CLASS.STICKY);
                    }
                    if (elem.children[0].isFixed) {
                        $(elem.children[0]).trigger(new $.Event(EVENT.STICK));
                    }
                    elem.children[0].isFixed = false;
                }
            });
        }
        static offset(elem) {
            if (!elem.getClientRects().length) {
                return {top: 0, left: 0};
            }
            let rect = elem.getBoundingClientRect();
            let win = elem.ownerDocument.defaultView;
            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset,
            };
        }
    }
    new FixedTopControl(CLASS.BLOCK);
    return FixedTopControl;
})();
export default FixedTopControl;
