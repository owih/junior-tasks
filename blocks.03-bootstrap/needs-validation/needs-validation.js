(($)=>{
    const ClassName = {
        BLOCK: 'needs-validation',
    };
    $(`.${ClassName.BLOCK}`).on('submit', (event)=>{
        let form = event.target;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        $(form).data('poppers').forEach((popper) => popper.update());
    });
})($);
