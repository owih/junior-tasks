//  Функция подключения скрипта
window.addHeadScript = function(url, calback) {
    if (Array.isArray(url)) {
        let self = this;
        let prom = [];
        url.forEach(function(item) {
            prom.push(self.addHeadScript(item));
        });
        return Promise.all(prom);
    }
    return new Promise((resolve, reject) => {
        let r = false;
        let t = document.getElementsByTagName('script')[0];
        let s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = url;
        s.async = true;
        s.onload = s.onreadystatechange = function() {
            if (!r && (!this.readyState || this.readyState === 'complete')) {
                r = true;
                resolve(this);
                calback();
            }
        };
        s.onerror = s.onabort = reject;
        t.parentNode.insertBefore(s, t);
    });
};
window.isNumeric = (n) => {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
};
window.setAttributes = (element, attributes)=>{
    Object.keys(attributes).forEach((prop)=>{
        const value = attributes[prop];
        if (value !== false) {
            element.setAttribute(prop, attributes[prop]);
        } else {
            element.removeAttribute(prop);
        }
    });
};
window.setStyles = (element, styles) => {
    Object.keys(styles).forEach((prop) => {
        let unit = '';
        // add unit if the value is numeric and is one of the following
        if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && window.isNumeric(styles[prop])) {
            unit = 'px';
        }
        element.style[prop] = styles[prop] + unit;
    });
};
