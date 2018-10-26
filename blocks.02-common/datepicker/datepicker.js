import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/keycode';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/i18n/datepicker-ru';
(($)=>{
    const init = () => {
        $('[data-toggle="datepicker"]')
            .filter((item)=>!$(item).data('datepicker'))
            .datepicker({
                changeMonth: true,
                changeYear: true,
                nextText: '',
                prevText: '',
                onSelect: (date, target) => {
                    target.input.trigger('change');
                },
            });
    };
    init();
    document.addEventListener('OnDocumentHtmlChanged', init);
})($);
