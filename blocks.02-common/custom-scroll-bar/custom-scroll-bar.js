import SimpleBar from 'simplebar';
(($)=>{
    const detectionCssScrollBar = () => {
        var test = document.createElement('div');
        var sb = document.createElement('div');
        var property = 'scrollbar{width:0px;}';
        var fake = false;
        var root = document.body;
        if (!root) {
            fake = true;
            root = document.documentElement.appendChild(document.createElement('body'));
        }
        sb.id = '__sb';
        sb.style.overflow = 'scroll';
        sb.style.width = '40px';
        sb.innerHTML = `&shy;<style>#${sb.id}::-webkit-${property}</style>`;
        test.appendChild(sb);
        root.appendChild(test);
        var ret = sb.scrollWidth == 40;
        document.body.removeChild(test);
        if (fake) {
            document.documentElement.removeChild(root);
        }
        return ret;
    };
    window.SimpleBar = SimpleBar;
    if (!detectionCssScrollBar()) {
        $('.custom-scroll-bar').each((index, el)=>{
            $(el).data('simplebar', new SimpleBar(el));
        });
        $(document).on('OnDocumentHtmlChanged shown.bs.tab shown.bs.collapse shown.bs.modal', (event) => {
            $('.custom-scroll-bar').each((index, el)=>{
                if ($(el).data('simplebar')) {
                    $(el).data('simplebar').recalculate();
                } else {
                    $(el).data('simplebar', new SimpleBar(el));
                }
            });
        });
    }
})($);
