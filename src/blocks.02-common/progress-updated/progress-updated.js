import {Util} from 'bootstrap';
// Функция добавления backdrop;
window.addBackdrop =($target) => {
    return $target.map((index, target)=>{
        let backdrop = document.createElement('div');
        backdrop.classList.add('progress-updated');
        backdrop.classList.add('fade');
        target.style.position = window.getComputedStyle(target).getPropertyValue('position') === 'static' ? 'relative': '';
        $(target).append(backdrop);
        Util.reflow(backdrop);
        backdrop.classList.add('show');
        return backdrop;
    });
};
// Функция удаления backdrop;
window.removeBackdrop = ($backdrop) => {
    $backdrop = $($backdrop);
    $backdrop.each((index, backdrop) => {
        if (Util.reflow(backdrop) + 1) {
            $(backdrop)
                .removeClass('show')
                .parent()
                .css('position', '')
                .one(Util.TRANSITION_END, () => {
                    $(backdrop).remove();
                })
                .emulateTransitionEnd(Util.getTransitionDurationFromElement(backdrop));
        }
    });
};
