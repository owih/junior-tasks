import {Util} from 'bootstrap';
(($)=>{
    $('[data-toggle="agreement"]').on('change', (e)=>{
        $(Util.getSelectorFromElement(e.target))
            .data('form', $(e.target).closest('form'))
            .modal('show');
        e.target.checked = !e.target.checked;
        e.preventDefault();
    });
    $(document).on('click', '[data-agreement]', (e)=>{
        let form = $(e.target).closest('.modal').data('form');

        form.find('[data-toggle="agreement"]')
            .prop('checked', e.target.dataset['agreement'] == 'Y');
        form.find('[type="submit"]')
            .prop('disabled', e.target.dataset['agreement'] != 'Y');
    });
})($);

