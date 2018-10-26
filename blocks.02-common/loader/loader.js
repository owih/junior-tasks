const loader = (()=>{
    var loading = {};
    var loaded = {};
    var head = document.getElementsByTagName('head')[0];
    var runCallbacks = function(path, type) {
        var cbs = loading[path];
        var cb = null;
        var i = 0;
        delete loading[path];
        while (cb = cbs[i++]) {
            cb[type] && cb[type]();
        }
    };
    var onSuccess = function(path) {
        loaded[path] = true;
        runCallbacks(path, 'success');
    };
    var onError = function(path) {
        runCallbacks(path, 'error');
    };
    var loader =  function(path, success, error) {
        if(loaded[path]) {
            success && success();
            return;
        }

        if(loading[path]) {
            loading[path].push({ success : success, error : error });
            return;
        }

        loading[path] = [{ success : success, error : error }];

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = (location.protocol === 'file:' && !path.indexOf('//')? 'http:' : '') + path;

        if('onload' in script) {
            script.onload = function() {
                script.onload = script.onerror = null;
                onSuccess(path);
            };

            script.onerror = function() {
                script.onload = script.onerror = null;
                onError(path);
            };
        } else {
            script.onreadystatechange = function() {
                var readyState = this.readyState;
                if(readyState === 'loaded' || readyState === 'complete') {
                    script.onreadystatechange = null;
                    onSuccess(path);
                }
            };
        }

        head.insertBefore(script, head.lastChild);
    };
    window.loader = loader;
    return loader;
})();
export default loader;
