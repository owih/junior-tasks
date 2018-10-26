if (NODE_ENV === 'development') {
    let scripts = Array.from(document.getElementsByTagName('SCRIPT'));
    let script = scripts[scripts.length - 1];
    script.onload = script.onreadystatechange = function() {
        $(document).trigger('ready');
    };
}
