export default function cookies() {
    const doc = typeof document === 'undefined' ? {cookie: ''} : document

    function get(key: string) {
        var splat = doc.cookie.split(/;\s*/);
        for (var i = 0; i < splat.length; i++) {
            var ps = splat[i].split('=');
            var k = unescape(ps[0]);
            if (k === key) return unescape(ps[1]);
        }
        return undefined;
    }

    function set(key: string, value: any, opts: any) {
        if (!opts) opts = {};
        var s = escape(key) + '=' + escape(value);
        if (opts.expires) s += '; expires=' + opts.expires;
        if (opts.path) s += '; path=' + escape(opts.path);
        if (opts.domain) s += '; domain=' + escape(opts.domain);
        if (opts.secure) s += '; secure';
        doc.cookie = s;
        return s;
    }

    return {
        set, get
    }
}

