(($)=>{
    const ClassName = {
        BLOCK: 'rating',
    };
    Array.from(document.getElementsByClassName(ClassName.BLOCK)).forEach((block) => {
        $(block).popover({
            placement: 'top',
            trigger: 'hover',
        });
    });
})($);
