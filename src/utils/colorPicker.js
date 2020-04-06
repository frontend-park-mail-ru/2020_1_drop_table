let n,u,t,i,r,o,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function s(n,l){for(let u in l){ n[u]=l[u]; }return n}function a(n){let l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){let t,i,r,o,f=arguments;if(l=s({},l),arguments.length>3){ for(u=[u],t=3;t<arguments.length;t++){ u.push(f[t]); } }if(null!=u&&(l.children=u),null!=n&&null!=n.defaultProps){ for(i in n.defaultProps){ void 0===l[i]&&(l[i]=n.defaultProps[i]); } }return o=l.key,null!=(r=l.ref)&&delete l.ref,null!=o&&delete l.key,v(n,l,o,r)}function v(l,u,t,i){let r={type:l,props:u,key:t,ref:i,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return n.vnode&&n.vnode(r),r}function d(n){return n.children}function y(n){if(null==n||"boolean"==typeof n){ return null; }if("string"==typeof n||"number"==typeof n){ return v(null,n,null,null); }if(null!=n.__e||null!=n.__c){let l=v(n.type,n.props,n.key,null);return l.__e=n.__e,l}return n}function m(n,l){this.props=n,this.context=l;}function w(n,l){if(null==l){ return n.__p?w(n.__p,n.__p.__k.indexOf(n)+1):null; }for(let u;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){ return u.__e; } }return "function"==typeof n.type?w(n):null}function g(n){let l,u;if(null!=(n=n.__p)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break} }return g(n)}}function k(l){(!l.__d&&(l.__d=!0)&&1===u.push(l)||i!==n.debounceRendering)&&(i=n.debounceRendering,(n.debounceRendering||t)(_));}function _(){let n,l,t,i,r,o,f,e;for(u.sort(function(n,l){return l.__v.__b-n.__v.__b});n=u.pop();){ n.__d&&(t=void 0,i=void 0,o=(r=(l=n).__v).__e,f=l.__P,e=l.u,l.u=!1,f&&(t=[],i=$(f,r,s({},r),l.__n,void 0!==f.ownerSVGElement,null,t,e,null==o?w(r):o),j(t,r),i!=o&&g(r))); }}function b(n,l,u,t,i,r,o,c,s){let h,v,p,d,y,m,g,k=u&&u.__k||e,_=k.length;if(c==f&&(c=null!=r?r[0]:_?w(u,0):null),h=0,l.__k=x(l.__k,function(u){if(null!=u){if(u.__p=l,u.__b=l.__b+1,null===(p=k[h])||p&&u.key==p.key&&u.type===p.type){ k[h]=void 0; }else { for(v=0;v<_;v++){if((p=k[v])&&u.key==p.key&&u.type===p.type){k[v]=void 0;break}p=null;} }if(d=$(n,u,p=p||f,t,i,r,o,null,c,s),(v=u.ref)&&p.ref!=v&&(g||(g=[])).push(v,u.__c||d,u),null!=d){if(null==m&&(m=d),null!=u.l){ d=u.l,u.l=null; }else if(r==p||d!=c||null==d.parentNode){n:if(null==c||c.parentNode!==n){ n.appendChild(d); }else{for(y=c,v=0;(y=y.nextSibling)&&v<_;v+=2){ if(y==d){ break n; } }n.insertBefore(d,c);}"option"==l.type&&(n.value="");}c=d.nextSibling,"function"==typeof l.type&&(l.l=d);}}return h++,u}),l.__e=m,null!=r&&"function"!=typeof l.type){ for(h=r.length;h--;){ null!=r[h]&&a(r[h]); } }for(h=_;h--;){ null!=k[h]&&D(k[h],k[h]); }if(g){ for(h=0;h<g.length;h++){ A(g[h],g[++h],g[++h]); } }}function x(n,l,u){if(null==u&&(u=[]),null==n||"boolean"==typeof n){ l&&u.push(l(null)); }else if(Array.isArray(n)){ for(let t=0;t<n.length;t++){ x(n[t],l,u); } }else { u.push(l?l(y(n)):n); }return u}function C(n,l,u,t,i){let r;for(r in u){ r in l||N(n,r,null,u[r],t); }for(r in l){ i&&"function"!=typeof l[r]||"value"===r||"checked"===r||u[r]===l[r]||N(n,r,l[r],u[r],t); }}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u;}function N(n,l,u,t,i){let r,o,f,e,c;if("key"===(l=i?"className"===l?"class":l:"class"===l?"className":l)||"children"===l);else if("style"===l){ if(r=n.style,"string"==typeof u){ r.cssText=u; }else{if("string"==typeof t&&(r.cssText="",t=null),t){ for(o in t){ u&&o in u||P(r,o,""); } }if(u){ for(f in u){ t&&u[f]===t[f]||P(r,f,u[f]); } }} }else{ "o"===l[0]&&"n"===l[1]?(e=l!==(l=l.replace(/Capture$/,"")),c=l.toLowerCase(),l=(c in n?c:l).slice(2),u?(t||n.addEventListener(l,T,e),(n.t||(n.t={}))[l]=u):n.removeEventListener(l,T,e)):"list"!==l&&"tagName"!==l&&"form"!==l&&!i&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u?n.removeAttribute(l):n.setAttribute(l,u)); }}function T(l){return this.t[l.type](n.event?n.event(l):l)}function $(l,u,t,i,r,o,f,e,c,a){let h,v,p,y,w,g,k,_,C,P,N=u.type;if(void 0!==u.constructor){ return null; }(h=n.__b)&&h(u);try{n:if("function"==typeof N){if(_=u.props,C=(h=N.contextType)&&i[h.__c],P=h?C?C.props.value:h.__p:i,t.__c?k=(v=u.__c=t.__c).__p=v.__E:("prototype"in N&&N.prototype.render?u.__c=v=new N(_,P):(u.__c=v=new m(_,P),v.constructor=N,v.render=H),C&&C.sub(v),v.props=_,v.state||(v.state={}),v.context=P,v.__n=i,p=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=N.getDerivedStateFromProps&&s(v.__s==v.state?v.__s=s({},v.__s):v.__s,N.getDerivedStateFromProps(_,v.__s)),p){ null==N.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&f.push(v); }else{if(null==N.getDerivedStateFromProps&&null==e&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(_,P),!e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(_,v.__s,P)){for(v.props=_,v.state=v.__s,v.__d=!1,v.__v=u,u.__e=null!=c?c!==t.__e?c:t.__e:null,u.__k=t.__k,h=0;h<u.__k.length;h++){ u.__k[h]&&(u.__k[h].__p=u); }break n}null!=v.componentWillUpdate&&v.componentWillUpdate(_,v.__s,P);}for(y=v.props,w=v.state,v.context=P,v.props=_,v.state=v.__s,(h=n.__r)&&h(u),v.__d=!1,v.__v=u,v.__P=l,h=v.render(v.props,v.state,v.context),u.__k=x(null!=h&&h.type==d&&null==h.key?h.props.children:h),null!=v.getChildContext&&(i=s(s({},i),v.getChildContext())),p||null==v.getSnapshotBeforeUpdate||(g=v.getSnapshotBeforeUpdate(y,w)),b(l,u,t,i,r,o,f,c,a),v.base=u.__e;h=v.__h.pop();){ v.__s&&(v.state=v.__s),h.call(v); }p||null==y||null==v.componentDidUpdate||v.componentDidUpdate(y,w,g),k&&(v.__E=v.__p=null);}else { u.__e=z(t.__e,u,t,i,r,o,f,a); }(h=n.diffed)&&h(u);}catch(l){n.__e(l,u,t);}return u.__e}function j(l,u){for(let t;t=l.pop();){ try{t.componentDidMount();}catch(l){n.__e(l,t.__v);} }n.__c&&n.__c(u);}function z(n,l,u,t,i,r,o,c){let s,a,h,v,p=u.props,d=l.props;if(i="svg"===l.type||i,null==n&&null!=r){ for(s=0;s<r.length;s++){ if(null!=(a=r[s])&&(null===l.type?3===a.nodeType:a.localName===l.type)){n=a,r[s]=null;break} } }if(null==n){if(null===l.type){ return document.createTextNode(d); }n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type),r=null;}return null===l.type?p!==d&&(null!=r&&(r[r.indexOf(n)]=null),n.data=d):l!==u&&(null!=r&&(r=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,c||(v||h)&&(v&&h&&v.__html==h.__html||(n.innerHTML=v&&v.__html||"")),C(n,d,p,i,c),l.__k=l.props.children,v||b(n,l,u,t,"foreignObject"!==l.type&&i,r,o,f,c),c||("value"in d&&void 0!==d.value&&d.value!==n.value&&(n.value=null==d.value?"":d.value),"checked"in d&&void 0!==d.checked&&d.checked!==n.checked&&(n.checked=d.checked))),n}function A(l,u,t){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,t);}}function D(l,u,t){let i,r,o;if(n.unmount&&n.unmount(l),(i=l.ref)&&A(i,null,u),t||"function"==typeof l.type||(t=null!=(r=l.__e)),l.__e=l.l=null,null!=(i=l.__c)){if(i.componentWillUnmount){ try{i.componentWillUnmount();}catch(l){n.__e(l,u);} }i.base=i.__P=null;}if(i=l.__k){ for(o=0;o<i.length;o++){ i[o]&&D(i[o],u,t); } }null!=r&&a(r);}function H(n,l,u){return this.constructor(n,u)}function I(l,u,t){let i,o,c;n.__p&&n.__p(l,u),o=(i=t===r)?null:t&&t.__k||u.__k,l=h(d,null,[l]),c=[],$(u,i?u.__k=l:(t||u).__k=l,o||f,f,void 0!==u.ownerSVGElement,t&&!i?[t]:o?null:e.slice.call(u.childNodes),c,!1,t||f,i),j(c,l);}n={},m.prototype.setState=function(n,l){let u=this.__s!==this.state&&this.__s||(this.__s=s({},this.state));("function"!=typeof n||(n=n(u,this.props)))&&s(u,n),null!=n&&this.__v&&(this.u=!1,l&&this.__h.push(l),k(this));},m.prototype.forceUpdate=function(n){this.__v&&(n&&this.__h.push(n),this.u=!0,k(this));},m.prototype.render=d,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=n.debounceRendering,n.__e=function(n,l,u){for(let t;l=l.__p;){ if((t=l.__c)&&!t.__p){ try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError){ t.setState(t.constructor.getDerivedStateFromError(n)); }else{if(null==t.componentDidCatch){ continue; }t.componentDidCatch(n);}return k(t.__E=t)}catch(l){n=l;} } }throw n},r=f,o=0;


let CSS_INTEGER = '[-\\+]?\\d+%?'; // http://www.w3.org/TR/css3-values/#number-value

let CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'; // Allow positive/negative integer/number. Don't capture the either/or, just the entire outcome

let CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')'; // Parse function params
// Parens and commas are optional, and this also allows for whitespace between numbers

let PERMISSIVE_MATCH_3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';
let PERMISSIVE_MATCH_4 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'; // Regex patterns for functional color strings

let REGEX_FUNCTIONAL_RGB = new RegExp('rgb' + PERMISSIVE_MATCH_3);
let REGEX_FUNCTIONAL_RGBA = new RegExp('rgba' + PERMISSIVE_MATCH_4);
let REGEX_FUNCTIONAL_HSL = new RegExp('hsl' + PERMISSIVE_MATCH_3);
let REGEX_FUNCTIONAL_HSLA = new RegExp('hsla' + PERMISSIVE_MATCH_4); // Color string parsing regex

let HEX_START = '^(?:#?|0x?)';
let HEX_INT_SINGLE = '([0-9a-fA-F]{1})';
let HEX_INT_DOUBLE = '([0-9a-fA-F]{2})';
let REGEX_HEX_3 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + '$');
let REGEX_HEX_4 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + '$');
let REGEX_HEX_6 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + '$');
let REGEX_HEX_8 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + '$'); // Kelvin temperature bounds

let KELVIN_MIN = 1000;
let KELVIN_MAX = 40000; // Math shorthands

let log = Math.log;
let round = Math.round;
let floor = Math.floor;
/**
 * @desc Parse a scss unit string - either regular int or a percentage number
 * @param str - scss unit string
 * @param max - max unit value, used for calculating percentages
 */

function parseUnit(str, max) {
    let isPercentage = str.indexOf('%') > -1;
    let num = parseFloat(str);
    return isPercentage ? max / 100 * num : num;
}
/**
 * @desc Parse hex str to an int
 * @param str - hex string to parse
 */


function parseHexInt(str) {
    return parseInt(str, 16);
}
/**
 * @desc Convert nunber into to 2-digit hex
 * @param int - number to convert
 */


function intToHex(int) {
    return int.toString(16).padStart(2, '0');
}

let IroColor = function IroColor(value, onChange) {
    // The default Color value
    this.$ = {
        h: 0,
        s: 0,
        v: 0,
        a: 1
    };
    if (value) { this.set(value); } // The watch callback function for this Color will be stored here

    this.onChange = onChange;
    this.initialValue = Object.assign({}, this.$); // copy initial value
};

let prototypeAccessors = { hsv: { configurable: true },hsva: { configurable: true },hue: { configurable: true },saturation: { configurable: true },value: { configurable: true },alpha: { configurable: true },kelvin: { configurable: true },rgb: { configurable: true },rgba: { configurable: true },hsl: { configurable: true },hsla: { configurable: true },rgbString: { configurable: true },rgbaString: { configurable: true },hexString: { configurable: true },hex8String: { configurable: true },hslString: { configurable: true },hslaString: { configurable: true } };
/**
 * @desc Set the Color from any valid value
 * @param value - new color value
 */


IroColor.prototype.set = function set (value) {
    if (typeof value === 'string') {
        if (/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(value)) {
            this.hexString = value;
        } else if (/^rgba?/.test(value)) {
            this.rgbString = value;
        } else if (/^hsla?/.test(value)) {
            this.hslString = value;
        }
    } else if (typeof value === 'object') {
        if (value instanceof IroColor) {
            this.hsv = value.hsv;
        } else if (typeof value === 'object' && 'r' in value && 'g' in value && 'b' in value) {
            this.rgb = value;
        } else if (typeof value === 'object' && 'h' in value && 's' in value && 'v' in value) {
            this.hsv = value;
        } else if (typeof value === 'object' && 'h' in value && 's' in value && 'l' in value) {
            this.hsl = value;
        }
    } else {
        throw new Error('Invalid color value');
    }
};
/**
 * @desc Shortcut to set a specific channel value
 * @param format - hsv | hsl | rgb
 * @param channel - individual channel to set, for example if model = hsl, chanel = h | s | l
 * @param value - new value for the channel
 */


IroColor.prototype.setChannel = function setChannel (format, channel, value) {
    let obj;

    this[format] = Object.assign({}, this[format],
        ( obj = {}, obj[channel] = value, obj ));
};
/**
 * @desc Reset color back to its initial value
 */


IroColor.prototype.reset = function reset () {
    this.hsva = this.initialValue;
};
/**
 * @desc make new Color instance with the same value as this one
 */


IroColor.prototype.clone = function clone () {
    return new IroColor(this);
};
/**
 * @desc remove color onChange
 */


IroColor.prototype.unbind = function unbind () {
    this.onChange = undefined;
};
/**
 * @desc Convert hsv object to rgb
 * @param hsv - hsv color object
 */


IroColor.hsvToRgb = function hsvToRgb (hsv) {
    let h = hsv.h / 60;
    let s = hsv.s / 100;
    let v = hsv.v / 100;
    let i = floor(h);
    let f = h - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    let mod = i % 6;
    let r = [v, q, p, p, t, v][mod];
    let g = [t, v, v, q, p, p][mod];
    let b = [p, p, t, v, v, q][mod];
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255
    };
};
/**
 * @desc Convert rgb object to hsv
 * @param rgb - rgb object
 */


IroColor.rgbToHsv = function rgbToHsv (rgb) {
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let delta = max - min;
    let hue = 0;
    let value = max;
    let saturation = max === 0 ? 0 : delta / max;

    switch (max) {
        case min:
            hue = 0; // achromatic

            break;

        case r:
            hue = (g - b) / delta + (g < b ? 6 : 0);
            break;

        case g:
            hue = (b - r) / delta + 2;
            break;

        case b:
            hue = (r - g) / delta + 4;
            break;
    }

    return {
        h: hue * 60,
        s: saturation * 100,
        v: value * 100
    };
};
/**
 * @desc Convert hsv object to hsl
 * @param hsv - hsv object
 */


IroColor.hsvToHsl = function hsvToHsl (hsv) {
    let s = hsv.s / 100;
    let v = hsv.v / 100;
    let l = (2 - s) * v;
    let divisor = l <= 1 ? l : 2 - l; // Avoid division by zero when lightness is close to zero

    let saturation = divisor < 1e-9 ? 0 : s * v / divisor;
    return {
        h: hsv.h,
        s: saturation * 100,
        l: l * 50
    };
};

prototypeAccessors.hsv.get = function () {
    let value = this.$;
    return {
        h: value.h,
        s: value.s,
        v: value.v
    };
};

prototypeAccessors.hsv.set = function (newValue) {
    let oldValue = this.$;
    newValue = Object.assign({}, oldValue,
        newValue); // If this Color is being watched for changes we need to compare the new and old values to check the difference
    // Otherwise we can just be lazy

    if (this.onChange) {
        // Compute changed values
        let changes = {
            h: false,
            v: false,
            s: false,
            a: false
        };

        for (let key in oldValue) {
            changes[key] = newValue[key] != oldValue[key];
        }

        this.$ = newValue; // If the value has changed, call hook callback

        if (changes.h || changes.s || changes.v || changes.a) { this.onChange(this, changes); }
    } else {
        this.$ = newValue;
    }
};

prototypeAccessors.hsva.get = function () {
    return Object.assign({}, this.$);
};

prototypeAccessors.hsva.set = function (value) {
    this.hsv = value;
};

prototypeAccessors.hue.get = function () {
    return this.$.h;
};

prototypeAccessors.hue.set = function (value) {
    this.hsv = {
        h: value
    };
};

prototypeAccessors.saturation.get = function () {
    return this.$.s;
};

prototypeAccessors.saturation.set = function (value) {
    this.hsv = {
        s: value
    };
};

prototypeAccessors.value.get = function () {
    return this.$.v;
};

prototypeAccessors.value.set = function (value) {
    this.hsv = {
        v: value
    };
};

// prototypeAccessors.alpha.get = function () {
//     return this.$.a;
// };
//
// prototypeAccessors.alpha.set = function (value) {
//     this.hsv = Object.assign({}, this.hsv,
//         {a: value});
// };
//
// prototypeAccessors.kelvin.get = function () {
//     return IroColor.rgbToKelvin(this.rgb);
// };
//
// prototypeAccessors.kelvin.set = function (value) {
//     this.rgb = IroColor.kelvinToRgb(value);
// };

prototypeAccessors.rgb.get = function () {
    let ref = IroColor.hsvToRgb(this.$);
    let r = ref.r;
    let g = ref.g;
    let b = ref.b;
    return {
        r: round(r),
        g: round(g),
        b: round(b)
    };
};

prototypeAccessors.rgb.set = function (value) {
    this.hsv = Object.assign({}, IroColor.rgbToHsv(value),
        {a: value.a === undefined ? 1 : value.a});
};

prototypeAccessors.rgba.get = function () {
    return Object.assign({}, this.rgb,
        {a: this.alpha});
};

prototypeAccessors.rgba.set = function (value) {
    this.rgb = value;
};

prototypeAccessors.hsl.get = function () {
    let ref = IroColor.hsvToHsl(this.$);
    let h = ref.h;
    let s = ref.s;
    let l = ref.l;
    return {
        h: round(h),
        s: round(s),
        l: round(l)
    };
};

prototypeAccessors.hsl.set = function (value) {
    this.hsv = Object.assign({}, IroColor.hslToHsv(value),
        {a: value.a === undefined ? 1 : value.a});
};

prototypeAccessors.hsla.get = function () {
    return Object.assign({}, this.hsl,
        {a: this.alpha});
};

prototypeAccessors.hsla.set = function (value) {
    this.hsl = value;
};

prototypeAccessors.rgbString.get = function () {
    let rgb = this.rgb;
    return ("rgb(" + (rgb.r) + ", " + (rgb.g) + ", " + (rgb.b) + ")");
};

prototypeAccessors.rgbString.set = function (value) {
    let match;
    let r,
        g,
        b,
        a = 1;

    if (match = REGEX_FUNCTIONAL_RGB.exec(value)) {
        r = parseUnit(match[1], 255);
        g = parseUnit(match[2], 255);
        b = parseUnit(match[3], 255);
    } else if (match = REGEX_FUNCTIONAL_RGBA.exec(value)) {
        r = parseUnit(match[1], 255);
        g = parseUnit(match[2], 255);
        b = parseUnit(match[3], 255);
        a = parseUnit(match[4], 1);
    }

    if (match) {
        this.rgb = {
            r: r,
            g: g,
            b: b,
            a: a
        };
    } else {
        throw new Error('Invalid rgb string');
    }
};

prototypeAccessors.rgbaString.get = function () {
    let rgba = this.rgba;
    return ("rgba(" + (rgba.r) + ", " + (rgba.g) + ", " + (rgba.b) + ", " + (rgba.a) + ")");
};

prototypeAccessors.rgbaString.set = function (value) {
    this.rgbString = value;
};

prototypeAccessors.hexString.get = function () {
    let rgb = this.rgb;
    return ("#" + (intToHex(rgb.r)) + (intToHex(rgb.g)) + (intToHex(rgb.b)));
};

prototypeAccessors.hexString.set = function (value) {
    let match;
    let r,
        g,
        b,
        a = 255;

    if (match = REGEX_HEX_3.exec(value)) {
        r = parseHexInt(match[1]) * 17;
        g = parseHexInt(match[2]) * 17;
        b = parseHexInt(match[3]) * 17;
    } else if (match = REGEX_HEX_4.exec(value)) {
        r = parseHexInt(match[1]) * 17;
        g = parseHexInt(match[2]) * 17;
        b = parseHexInt(match[3]) * 17;
        a = parseHexInt(match[4]) * 17;
    } else if (match = REGEX_HEX_6.exec(value)) {
        r = parseHexInt(match[1]);
        g = parseHexInt(match[2]);
        b = parseHexInt(match[3]);
    } else if (match = REGEX_HEX_8.exec(value)) {
        r = parseHexInt(match[1]);
        g = parseHexInt(match[2]);
        b = parseHexInt(match[3]);
        a = parseHexInt(match[4]);
    }

    if (match) {
        this.rgb = {
            r: r,
            g: g,
            b: b,
            a: a / 255
        };
    } else {
        throw new Error('Invalid hex string');
    }
};

prototypeAccessors.hex8String.get = function () {
    let rgba = this.rgba;
    return ("#" + (intToHex(rgba.r)) + (intToHex(rgba.g)) + (intToHex(rgba.b)) + (intToHex(floor(rgba.a * 255))));
};

prototypeAccessors.hex8String.set = function (value) {
    this.hexString = value;
};

prototypeAccessors.hslString.get = function () {
    let hsl = this.hsl;
    return ("hsl(" + (hsl.h) + ", " + (hsl.s) + "%, " + (hsl.l) + "%)");
};

prototypeAccessors.hslString.set = function (value) {
    let match;
    let h,
        s,
        l,
        a = 1;

    if (match = REGEX_FUNCTIONAL_HSL.exec(value)) {
        h = parseUnit(match[1], 360);
        s = parseUnit(match[2], 100);
        l = parseUnit(match[3], 100);
    } else if (match = REGEX_FUNCTIONAL_HSLA.exec(value)) {
        h = parseUnit(match[1], 360);
        s = parseUnit(match[2], 100);
        l = parseUnit(match[3], 100);
        a = parseUnit(match[4], 1);
    }

    if (match) {
        this.hsl = {
            h: h,
            s: s,
            l: l,
            a: a
        };
    } else {
        throw new Error('Invalid hsl string');
    }
};

prototypeAccessors.hslaString.get = function () {
    let hsla = this.hsla;
    return ("hsl(" + (hsla.h) + ", " + (hsla.s) + "%, " + (hsla.l) + "%, " + (hsla.a) + ")");
};

prototypeAccessors.hslaString.set = function (value) {
    this.hslString = value;
};

Object.defineProperties( IroColor.prototype, prototypeAccessors );

let sliderDefaultOptions = {
    sliderShape: 'bar',
    sliderType: 'value',
    minTemperature: 2200,
    maxTemperature: 11000
};
/**
 * @desc Get the bounding dimensions of the slider
 * @param props - slider props
 */

function getSliderDimensions(props) {
    let width = props.width;
    let sliderSize = props.sliderSize;
    let borderWidth = props.borderWidth;
    let handleRadius = props.handleRadius;
    let padding = props.padding;
    let sliderShape = props.sliderShape;
    let ishorizontal = props.layoutDirection === 'horizontal'; // automatically calculate sliderSize if its not defined

    sliderSize = sliderSize ? sliderSize : padding * 2 + handleRadius * 2 + borderWidth * 2;

    if (sliderShape === 'circle') {
        return {
            handleStart: props.padding + props.handleRadius,
            handleRange: width - padding * 2 - handleRadius * 2 - borderWidth * 2,
            width: width,
            height: width,
            cx: width / 2,
            cy: width / 2,
            radius: width / 2 - borderWidth / 2
        };
    } else {
        return {
            handleStart: sliderSize / 2,
            handleRange: width - sliderSize,
            radius: sliderSize / 2,
            x: 0,
            y: 0,
            width: ishorizontal ? sliderSize : width,
            height: ishorizontal ? width : sliderSize
        };
    }
}
/**
 * @desc Get the current slider value for a given color, as a percentage
 * @param props - slider props
 * @param color
 */

function getCurrentSliderValue(props, color) {
    let hsva = color.hsva;

    switch (props.sliderType) {
        case 'alpha':
            return hsva.a * 100;

        case 'kelvin':
            let minTemperature = props.minTemperature;
            let maxTemperature = props.maxTemperature;
            let temperatureRange = maxTemperature - minTemperature;
            let percent = (color.kelvin - minTemperature) / temperatureRange * 100; // clmap percentage

            return Math.max(0, Math.min(percent, 100));

        case 'hue':
            return hsva.h /= 3.6;

        case 'saturation':
            return hsva.s;

        case 'value':
        default:
            return hsva.v;
    }
}
/**
 * @desc Get the current slider value from user input
 * @param props - slider props
 * @param x - global input x position
 * @param y - global input y position
 */

function getSliderValueFromInput(props, x, y) {
    let ref = getSliderDimensions(props);
    let handleRange = ref.handleRange;
    let handleStart = ref.handleStart;
    let handlePos;

    if (props.layoutDirection === 'horizontal') {
        handlePos = -1 * y + handleRange + handleStart;
    } else {
        handlePos = x - handleStart;
    } // clamp handle position


    handlePos = Math.max(Math.min(handlePos, handleRange), 0);
    let percent = Math.round(100 / handleRange * handlePos);

    switch (props.sliderType) {
        case 'kelvin':
            let minTemperature = props.minTemperature;
            let maxTemperature = props.maxTemperature;
            let temperatureRange = maxTemperature - minTemperature;
            return minTemperature + temperatureRange * (percent / 100);

        case 'alpha':
            return percent / 100;

        case 'hue':
            return percent * 3.6;

        default:
            return percent;
    }
}
/**
 * @desc Get the current handle position for a given color
 * @param props - slider props
 * @param color
 */

function getSliderHandlePosition(props, color) {
    let ref = getSliderDimensions(props);
    let width = ref.width;
    let height = ref.height;
    let handleRange = ref.handleRange;
    let handleStart = ref.handleStart;
    let ishorizontal = props.layoutDirection === 'horizontal';
    let sliderValue = getCurrentSliderValue(props, color);
    let midPoint = ishorizontal ? width / 2 : height / 2;
    let handlePos = handleStart + sliderValue / 100 * handleRange;

    if (ishorizontal) {
        handlePos = -1 * handlePos + handleRange + handleStart * 2;
    }

    return {
        x: ishorizontal ? midPoint : handlePos,
        y: ishorizontal ? handlePos : midPoint
    };
}
/**
 * @desc Get the gradient stops for a slider
 * @param props - slider props
 * @param color
 */

function getSliderGradient(props, color) {
    let hsv = color.hsv;

    switch (props.sliderType) {
        case 'alpha':
            let rgb = color.rgb;
            return [[0, ("rgba(" + (rgb.r) + "," + (rgb.g) + "," + (rgb.b) + ",0)")], [100, ("rgb(" + (rgb.r) + "," + (rgb.g) + "," + (rgb.b) + ")")]];

        case 'kelvin':
            let stops = [];
            let min = props.minTemperature;
            let max = props.maxTemperature;
            let numStops = 8;
            let range = max - min;

            for (let kelvin = min, stop = 0; kelvin < max; kelvin += range / numStops, stop += 1) {
                let ref = IroColor.kelvinToRgb(kelvin);
                let r = ref.r;
                let g = ref.g;
                let b = ref.b;
                stops.push([100 / numStops * stop, ("rgb(" + r + "," + g + "," + b + ")")]);
            }

            return stops;

        case 'hue':
            return [[0, '#f00'], [16.666, '#ff0'], [33.333, '#0f0'], [50, '#0ff'], [66.666, '#00f'], [83.333, '#f0f'], [100, '#f00']];

        case 'saturation':
            let noSat = IroColor.hsvToHsl({
                h: hsv.h,
                s: 0,
                v: hsv.v
            });
            let fullSat = IroColor.hsvToHsl({
                h: hsv.h,
                s: 100,
                v: hsv.v
            });
            return [[0, ("hsl(" + (noSat.h) + "," + (noSat.s) + "%," + (noSat.l) + "%)")], [100, ("hsl(" + (fullSat.h) + "," + (fullSat.s) + "%," + (fullSat.l) + "%)")]];

        case 'value':
        default:
            let hsl = IroColor.hsvToHsl({
                h: hsv.h,
                s: hsv.s,
                v: 100
            });
            return [[0, '#000'], [100, ("hsl(" + (hsl.h) + "," + (hsl.s) + "%," + (hsl.l) + "%)")]];
    }
}
/**
 * @desc Get the gradient coords for a slider
 * @param props - slider props
 */

function getSliderGradientCoords(props) {
    let ishorizontal = props.layoutDirection === 'horizontal';
    return {
        x1: '0%',
        y1: ishorizontal ? '100%' : '0%',
        x2: ishorizontal ? '0%' : '100%',
        y2: '0%'
    };
}

/**
 * @desc Get the point as the center of the wheel
 * @param props - wheel props
 */
function getWheelDimensions(props) {
    let rad = props.width / 2;
    return {
        width: props.width,
        radius: rad - props.borderWidth,
        cx: rad,
        cy: rad
    };
}
/**
 * @desc Translate an angle according to wheelAngle and wheelDirection
 * @param props - wheel props
 * @param angle - input angle
 */

function translateWheelAngle(props, angle, invert) {
    let wheelAngle = props.wheelAngle;
    let wheelDirection = props.wheelDirection;

    if (!invert && wheelDirection === 'clockwise' || invert && wheelDirection === 'anticlockwise') {
        angle = (invert ? 180 : 360) - (wheelAngle - angle);
    } else {
        angle = wheelAngle + angle;
    } // javascript's modulo operator doesn't produce positive numbers with negative input
    // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e


    return (angle % 360 + 360) % 360;
}
/**
 * @desc Get the current handle position for a given color
 * @param props - wheel props
 * @param color
 */

function getWheelHandlePosition(props, color) {
    let hsv = color.hsv;
    let ref = getWheelDimensions(props);
    let cx = ref.cx;
    let cy = ref.cy;
    let handleRange = props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
    let handleAngle = (180 + translateWheelAngle(props, hsv.h, true)) * (Math.PI / 180);
    let handleDist = hsv.s / 100 * handleRange;
    let direction = props.wheelDirection === 'clockwise' ? -1 : 1;
    return {
        x: cx + handleDist * Math.cos(handleAngle) * direction,
        y: cy + handleDist * Math.sin(handleAngle) * direction
    };
}
/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */

function getWheelValueFromInput(props, x, y) {
    let ref = getWheelDimensions(props);
    let cx = ref.cx;
    let cy = ref.cy;
    let handleRange = props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
    x = cx - x;
    y = cy - y; // Calculate the hue by converting the angle to radians

    let hue = translateWheelAngle(props, Math.atan2(-y, -x) * (180 / Math.PI)); // Find the point's distance from the center of the wheel
    // This is used to show the saturation level

    let handleDist = Math.min(Math.sqrt(x * x + y * y), handleRange);
    return {
        h: Math.round(hue),
        s: Math.round(100 / handleRange * handleDist)
    };
}


// Keep track of html <base> elements for resolveSvgUrl
// getElementsByTagName returns a live HTMLCollection, which stays in sync with the DOM tree
// So it only needs to be called once
let BASE_ELEMENTS = document.getElementsByTagName('base');
/**
 * @desc Resolve an SVG reference URL
 * This is required to work around how Safari and iOS webviews handle gradient URLS under certain conditions
 * If a page is using a client-side routing library which makes use of the HTML <base> tag,
 * Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
 * More info on the problem:
 * https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
 * https://github.com/jaames/iro.js/issues/18
 * https://github.com/jaames/iro.js/issues/45
 * https://github.com/jaames/iro.js/pull/89
 * @props url - SVG reference URL
 */

function resolveSvgUrl(url) {
    // Sniff useragent string to check if the user is running Safari
    let ua = window.navigator.userAgent;
    let isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    let isIos = /iPhone|iPod|iPad/i.test(ua);
    let location = window.location;
    return (isSafari || isIos) && BASE_ELEMENTS.length > 0 ? ((location.protocol) + "//" + (location.host) + (location.pathname) + (location.search) + url) : url;
}
/**
 * @desc Get the path commands to draw an svg arc
 * @props cx - arc center point x
 * @props cy - arc center point y
 * @props radius - arc radius
 * @props startAngle - arc start angle
 * @props endAngle - arc end angle
 */

function getSvgArcPath(cx, cy, radius, startAngle, endAngle) {
    let largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    startAngle *= Math.PI / 180;
    endAngle *= Math.PI / 180;
    let x1 = cx + radius * Math.cos(endAngle);
    let y1 = cy + radius * Math.sin(endAngle);
    let x2 = cx + radius * Math.cos(startAngle);
    let y2 = cy + radius * Math.sin(startAngle);
    return ("M " + x1 + " " + y1 + " A " + radius + " " + radius + " 0 " + largeArcFlag + " 0 " + x2 + " " + y2);
}
/**
 * @desc Given a specifc (x, y) position, test if there's a handle there and return its index, else return null.
 *       This is used for components like the box and wheel which support multiple handles when multicolor is active
 * @props x - point x position
 * @props y - point y position
 * @props handlePositions - array of {x, y} coords for each handle
 */

function getHandleAtPoint(props, x, y, handlePositions) {
    for (let i = 0; i < handlePositions.length; i++) {
        let dX = handlePositions[i].x - x;
        let dY = handlePositions[i].y - y;
        let dist = Math.sqrt(dX * dX + dY * dY);

        if (dist < props.handleRadius) {
            return i;
        }
    }

    return null;
}

let iroColorPickerOptionDefaults = {
    width: 300,
    height: 300,
    handleRadius: 8,
    handleSvg: null,
    handleProps: {
        x: 0,
        y: 0
    },
    color: '#fff',
    colors: [],
    borderColor: '#fff',
    borderWidth: 0,
    wheelLightness: true,
    wheelAngle: 0,
    wheelDirection: 'anticlockwise',
    layoutDirection: 'vertical',
    sliderSize: null,
    sliderMargin: 12,
    padding: 6
};

let SECONDARY_EVENTS = ["mousemove" /* MouseMove */, "touchmove" /* TouchMove */, "mouseup" /* MouseUp */, "touchend" /* TouchEnd */];
// Base component class for iro UI components
// This extends the Preact component class to allow them to react to mouse/touch input events by themselves
let IroComponentBase = /*@__PURE__*/(function (Component) {
    function IroComponentBase(props) {
        Component.call(this, props);
        // Generate unique ID for the component
        // This can be used to generate unique IDs for gradients, etc
        this.uid = (Math.random() + 1).toString(36).substring(5);
    }

    if ( Component ) IroComponentBase.__proto__ = Component;
    IroComponentBase.prototype = Object.create( Component && Component.prototype );
    IroComponentBase.prototype.constructor = IroComponentBase;
    IroComponentBase.prototype.render = function render (props) {
        let eventHandler = this.handleEvent.bind(this);
        let rootProps = {
            onMouseDown: eventHandler,
            onTouchStart: eventHandler
        };
        let isHorizontal = props.layoutDirection === 'horizontal';
        let margin = props.margin === null ? props.sliderMargin : props.margin;
        let rootStyles = {
            overflow: 'visible',
            display: isHorizontal ? 'inline-block' : 'block'
        };
        // first component shouldn't have any margin
        if (props.index > 0) {
            rootStyles[isHorizontal ? 'marginLeft' : 'marginTop'] = margin;
        }
        return (h(d, null, props.children(this.uid, rootProps, rootStyles)));
    };
    // More info on handleEvent:
    // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
    // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
    IroComponentBase.prototype.handleEvent = function handleEvent (e) {
        let this$1 = this;

        let inputHandler = this.props.onInput;
        // Get the screen position of the component
        let bounds = this.base.getBoundingClientRect();
        // Prefect default browser action
        e.preventDefault();
        // Detect if the event is a touch event by checking if it has the `touches` property
        // If it is a touch event, use the first touch input
        let point = e.touches ? e.changedTouches[0] : e;
        let x = point.clientX - bounds.left;
        let y = point.clientY - bounds.top;
        switch (e.type) {
            case "mousedown" /* MouseDown */:
            case "touchstart" /* TouchStart */:
                SECONDARY_EVENTS.forEach(function (event) {
                    document.addEventListener(event, this$1, { passive: false });
                });
                inputHandler(x, y, 0 /* Start */);
                break;
            case "mousemove" /* MouseMove */:
            case "touchmove" /* TouchMove */:
                inputHandler(x, y, 1 /* Move */);
                break;
            case "mouseup" /* MouseUp */:
            case "touchend" /* TouchEnd */:
                inputHandler(x, y, 2 /* End */);
                SECONDARY_EVENTS.forEach(function (event) {
                    document.removeEventListener(event, this$1);
                });
                break;
        }
    };

    return IroComponentBase;
}(m));

function IroHandle(props) {
    let radius = props.r;
    let url = props.url;
    return (h("svg", { className: ("IroHandle IroHandle--" + (props.index) + " " + (props.isActive ? 'IroHandle--isActive' : '')), x: props.x, y: props.y, style: {
                overflow: 'visible'
            } },
        url && (h("use", Object.assign({ xlinkHref: resolveSvgUrl(url) }, props.props))),
        !url && (h("circle", { r: radius, fill: "none", "stroke-width": 2, stroke: "#000" })),
        !url && (h("circle", { r: radius - 2, fill: props.fill, "stroke-width": 2, stroke: "#fff" }))));
}
IroHandle.defaultProps = {
    fill: 'none',
    x: 0,
    y: 0,
    r: 8,
    url: null,
    props: { x: 0, y: 0 }
};

let HUE_STEPS = Array.apply(null, { length: 360 }).map(function (_, index) { return index; });
function IroWheel(props) {
    let ref = getWheelDimensions(props);
    let width = ref.width;
    let radius = ref.radius;
    let cx = ref.cx;
    let cy = ref.cy;
    let colors = props.colors;
    let borderWidth = props.borderWidth;
    let colorPicker = props.parent;
    let activeColor = props.color;
    let hsv = activeColor.hsv;
    let handlePositions = colors.map(function (color) { return getWheelHandlePosition(props, color); });
    function handleInput(x, y, inputType) {
        if (inputType === 0 /* Start */) {
            // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
            let activeHandle = getHandleAtPoint(props, x, y, handlePositions);
            // If the input hit a handle, set it as the active handle, but don't update the color
            if (activeHandle !== null) {
                colorPicker.setActiveColor(activeHandle);
            }
            // If the input didn't hit a handle, set the currently active handle to that position
            else {
                colorPicker.inputActive = true;
                activeColor.hsv = getWheelValueFromInput(props, x, y);
                props.onInput(inputType);
            }
        }
        // move is fired when the user has started dragging
        else if (inputType === 1 /* Move */) {
            colorPicker.inputActive = true;
            activeColor.hsv = getWheelValueFromInput(props, x, y);
        }
        // let the color picker fire input:start, input:move or input:end events
        props.onInput(inputType);
    }
    return (h(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("svg", Object.assign({}, rootProps, { className: "IroWheel", width: width, height: width, style: rootStyles }),
        h("defs", null,
            h("radialGradient", { id: uid },
                h("stop", { offset: "0%", "stop-color": "#fff" }),
                h("stop", { offset: "100%", "stop-color": "#fff", "stop-opacity": "0" }))),
        h("g", { className: "IroWheelHue", "stroke-width": radius, fill: "none" }, HUE_STEPS.map(function (angle) { return (h("path", { key: angle, d: getSvgArcPath(cx, cy, radius / 2, angle, angle + 1.5), stroke: ("hsl(" + (translateWheelAngle(props, angle)) + ", 100%, 50%)") })); })),
        h("circle", { className: "IroWheelSaturation", cx: cx, cy: cy, r: radius, fill: ("url(" + (resolveSvgUrl('#' + uid)) + ")") }),
        props.wheelLightness && (h("circle", { className: "IroWheelLightness", cx: cx, cy: cy, r: radius, fill: "#000", opacity: 1 - hsv.v / 100 })),
        h("circle", { className: "IroWheelBorder", cx: cx, cy: cy, r: radius, fill: "none", stroke: props.borderColor, "stroke-width": borderWidth }),
        colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (h(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
        h(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
}

function IroSlider(props) {
    let activeColor = props.color;
    let ref = getSliderDimensions(props);
    let width = ref.width;
    let height = ref.height;
    let radius = ref.radius;
    let handlePos = getSliderHandlePosition(props, activeColor);
    let gradient = getSliderGradient(props, activeColor);
    let isAlpha = props.sliderType === 'alpha';
    function handleInput(x, y, type) {
        let value = getSliderValueFromInput(props, x, y);
        props.parent.inputActive = true;
        activeColor[props.sliderType] = value;
        props.onInput(type);
    }
    return (h(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("svg", Object.assign({}, rootProps, { className: "IroSlider", width: width, height: height, style: rootStyles }),
        h("defs", null,
            h("linearGradient", Object.assign({ id: 'g' + uid }, getSliderGradientCoords(props)), gradient.map(function (ref) {
                let offset = ref[0];
                let color = ref[1];

                return (h("stop", { offset: (offset + "%"), "stop-color": color }));
            })),
            isAlpha && (h("pattern", { id: 'b' + uid, width: "8", height: "8", patternUnits: "userSpaceOnUse" },
            h("rect", { x: "0", y: "0", width: "8", height: "8", fill: "#fff" }),
            h("rect", { x: "0", y: "0", width: "4", height: "4", fill: "#ccc" }),
            h("rect", { x: "4", y: "4", width: "4", height: "4", fill: "#ccc" }))),
            isAlpha && (h("pattern", { id: 'f' + uid, width: "100%", height: "100%" },
            h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (resolveSvgUrl('#b' + uid)) + ")") }),
            " }",
            h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (resolveSvgUrl('#g' + uid)) + ")") })))),
        h("rect", { className: "IroSliderBg", rx: radius, ry: radius, x: props.borderWidth / 2, y: props.borderWidth / 2, width: width - props.borderWidth, height: height - props.borderWidth, "stroke-width": props.borderWidth, stroke: props.borderColor, fill: ("url(" + (resolveSvgUrl((isAlpha ? '#f' : '#g') + uid)) + ")") }),
        h(IroHandle, { isActive: true, index: activeColor.index, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePos.x, y: handlePos.y }))); }));
}
IroSlider.defaultProps = Object.assign({}, sliderDefaultOptions);

// Turn a component into a widget
// This returns a factory function that can be used to create an instance of the widget component
// The first function param is a DOM element or CSS selector for the element to mount to,
// The second param is for config options which are passed to the component as props
// This factory function can also delay mounting the element into the DOM until the page is ready
function createWidget(WidgetComponent) {
    let widgetFactory = function (parent, props) {
        let widget; // will become an instance of the widget component class
        let widgetRoot = document.createElement('div');
        // Render widget into a temp DOM node
        I(h(WidgetComponent, Object.assign({}, {ref: function (ref) { return widget = ref; }},
            props)), widgetRoot);
        function mountWidget() {
            let container = parent instanceof Element ? parent : document.querySelector(parent);
            container.appendChild(widget.base);
            widget.onMount(container);
        }
        // Mount it into the DOM when the page document is ready
        if (document.readyState !== 'loading') {
            mountWidget();
        }
        else {
            document.addEventListener('DOMContentLoaded', mountWidget);
        }
        return widget;
    };
    // Allow the widget factory to inherit component prototype + static class methods
    // This makes it easier for plugin authors to extend the base widget component
    widgetFactory.prototype = WidgetComponent.prototype;
    Object.assign(widgetFactory, WidgetComponent);
    // Add reference to base component too
    widgetFactory.__component = WidgetComponent;
    return widgetFactory;
}

let IroColorPicker = /*@__PURE__*/(function (Component) {
    function IroColorPicker(props) {
        let this$1 = this;

        Component.call(this, props);
        this.colors = [];
        this.inputActive = false;
        this.events = {};
        this.activeEvents = {};
        this.deferredEvents = {};
        this.id = props.id;
        let colors = props.colors.length > 0 ? props.colors : [props.color];
        colors.forEach(function (colorValue) { return this$1.addColor(colorValue); });
        this.setActiveColor(0);
        // Pass all the props into the component's state,
        // Except we want to add the color object and make sure that refs aren't passed down to children
        this.state = Object.assign({}, props,
            {color: this.color,
                colors: this.colors,
                layout: props.layout});
    }

    if ( Component ) IroColorPicker.__proto__ = Component;
    IroColorPicker.prototype = Object.create( Component && Component.prototype );
    IroColorPicker.prototype.constructor = IroColorPicker;
    // Plubic multicolor API
    /**
     * @desc Add a color to the color picker
     * @param color new color to add
     * @param index optional color index
     */
    IroColorPicker.prototype.addColor = function addColor (color, index) {
        if ( index === void 0 ) index = this.colors.length;

        // Create a new iro.Color
        // Also bind it to onColorChange, so whenever the color changes it updates the color picker
        let newColor = new IroColor(color, this.onColorChange.bind(this));
        // Insert color @ the given index
        this.colors.splice(index, 0, newColor);
        // Reindex colors
        this.colors.forEach(function (color, index) { return color.index = index; });
        // Update picker state if necessary
        if (this.state) {
            this.setState({ colors: this.colors });
        }
        // Fire color init event
        this.deferredEmit('color:init', newColor);
    };
    /**
     * @desc Remove a color from the color picker
     * @param index color index
     */
    IroColorPicker.prototype.removeColor = function removeColor (index) {
        let color = this.colors.splice(index, 1)[0];
        // Destroy the color object -- this unbinds it from the color picker
        color.unbind();
        // Reindex colors
        this.colors.forEach(function (color, index) { return color.index = index; });
        // Update picker state if necessary
        if (this.state) {
            this.setState({ colors: this.colors });
        }
        // If the active color was removed, default active color to 0
        if (color.index === this.color.index) {
            this.setActiveColor(0);
        }
        // Fire color remove event
        this.emit('color:remove', color);
    };
    /**
     * @desc Set the currently active color
     * @param index color index
     */
    IroColorPicker.prototype.setActiveColor = function setActiveColor (index) {
        this.color = this.colors[index];
        if (this.state) {
            this.setState({ color: this.color });
        }
        // Fire color switch event
        this.emit('color:setActive', this.color);
    };
    /**
     * @desc Replace all of the current colorPicker colors
     * @param newColorValues list of new colors to add
     */
    IroColorPicker.prototype.setColors = function setColors (newColorValues) {
        let this$1 = this;

        // Unbind color events
        this.colors.forEach(function (color) { return color.unbind(); });
        // Destroy old colors
        this.colors = [];
        // Add new colors
        newColorValues.forEach(function (colorValue) { return this$1.addColor(colorValue); });
        // Reset active color
        this.setActiveColor(0);
        this.emit('color:setAll', this.colors);
    };
    // Public ColorPicker events API
    /**
     * @desc Set a callback function for an event
     * @param eventList event(s) to listen to
     * @param callback - Function called when the event is fired
     */
    IroColorPicker.prototype.on = function on (eventList, callback) {
        let this$1 = this;

        let events = this.events;
        // eventList can be an eventType string or an array of eventType strings
        (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
            // Add event callback
            (events[eventType] || (events[eventType] = [])).push(callback);
            // Call deferred events
            // These are events that can be stored until a listener for them is added
            if (this$1.deferredEvents[eventType]) {
                // Deffered events store an array of arguments from when the event was called
                this$1.deferredEvents[eventType].forEach(function (args) {
                    callback.apply(null, args);
                });
                // Clear deferred events
                this$1.deferredEvents[eventType] = [];
            }
        });
    };
    /**
     * @desc Remove a callback function for an event added with on()
     * @param eventList - event(s) to listen to
     * @param callback - original callback function to remove
     */
    IroColorPicker.prototype.off = function off (eventList, callback) {
        let this$1 = this;

        (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
            let callbackList = this$1.events[eventType];
            // this.emitHook('event:off', eventType, callback);
            if (callbackList)
            { callbackList.splice(callbackList.indexOf(callback), 1); }
        });
    };
    /**
     * @desc Emit an event
     * @param eventType event to emit
     */
    IroColorPicker.prototype.emit = function emit (eventType) {
        let this$1 = this;
        let args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        let activeEvents = this.activeEvents;
        let isEventActive = activeEvents.hasOwnProperty(eventType) ? activeEvents[eventType] : false;
        // Prevent event callbacks from firing if the event is already active
        // This stops infinite loops if something in an event callback causes the same event to be fired again
        // (e.g. setting the color inside a color:change callback)
        if (!isEventActive) {
            activeEvents[eventType] = true;
            let callbackList = this.events[eventType] || [];
            callbackList.forEach(function (fn) { return fn.apply(this$1, args); });
            activeEvents[eventType] = false;
        }
    };
    /**
     * @desc Emit an event now, or save it for when the relevent event listener is added
     * @param eventType - The name of the event to emit
     */
    IroColorPicker.prototype.deferredEmit = function deferredEmit (eventType) {
        let ref;

        let args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
        let deferredEvents = this.deferredEvents;
        (ref = this).emit.apply(ref, [ eventType ].concat( args ));
        (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
    };
    // Public utility methods
    IroColorPicker.prototype.setOptions = function setOptions (newOptions) {
        this.setState(Object.assign({}, this.state, newOptions));
    };
    /**
     * @desc Resize the color picker
     * @param width - new width
     */
    IroColorPicker.prototype.resize = function resize (width) {
        this.setOptions({ width: width });
    };
    /**
     * @desc Reset the color picker to the initial color provided in the color picker options
     */
    IroColorPicker.prototype.reset = function reset () {
        this.colors.forEach(function (color) { return color.reset(); });
        this.setState({ colors: this.colors });
    };
    /**
     * @desc Called by the createWidget wrapper when the element is mounted into the page
     * @param container - the container element for this ColorPicker instance
     */
    IroColorPicker.prototype.onMount = function onMount (container) {
        this.el = container;
        this.deferredEmit('mount', this);
    };
    // Internal methods
    /**
     * @desc React to a color update
     * @param color - current color
     * @param changes - shows which h,s,v,a color channels changed
     */
    IroColorPicker.prototype.onColorChange = function onColorChange (color, changes) {
        this.setState({ color: this.color });
        if (this.inputActive) {
            this.inputActive = false;
            this.emit('input:change', color, changes);
        }
        this.emit('color:change', color, changes);
    };
    /**
     * @desc Handle input from a UI control element
     * @param type - event type
     */
    IroColorPicker.prototype.emitInputEvent = function emitInputEvent (type) {
        if (type === 0 /* Start */) {
            this.emit('input:start', this.color);
        }
        else if (type === 1 /* Move */) {
            this.emit('input:move', this.color);
        }
        else if (type === 2 /* End */) {
            this.emit('input:end', this.color);
        }
    };
    IroColorPicker.prototype.render = function render (props, state) {
        let this$1 = this;

        let layout = state.layout;
        // use layout shorthands
        if (!Array.isArray(layout)) {
            switch (layout) {
                // TODO: implement some?
                default:
                    layout = [
                        { component: IroWheel },
                        { component: IroSlider } ];
            }
            // add transparency slider to the layout
            if (state.transparency) {
                layout.push({
                    component: IroSlider,
                    options: {
                        sliderType: 'alpha'
                    }
                });
            }
        }
        return (h("div", { class: "IroColorPicker", id: state.id, style: {
                display: state.display
            } }, layout.map(function (ref, componentIndex) {
            let UiComponent = ref.component;
            let options = ref.options;

            return (h(UiComponent, Object.assign({}, state, options, { ref: undefined, onInput: this$1.emitInputEvent.bind(this$1), parent: this$1, index: componentIndex })));
        })));
    };

    return IroColorPicker;
}(m));
IroColorPicker.defaultProps = Object.assign({}, iroColorPickerOptionDefaults,
    {colors: [],
        display: 'block',
        id: null,
        layout: 'default',
        margin: null});
let IroColorPickerWidget = createWidget(IroColorPicker);

function IroBox(props) {
    let ref = getBoxDimensions(props);
    let width = ref.width;
    let height = ref.height;
    let radius = ref.radius;
    let colors = props.colors;
    let colorPicker = props.parent;
    let activeColor = props.color;
    let gradients = getBoxGradients(props, activeColor);
    let handlePositions = colors.map(function (color) { return getBoxHandlePosition(props, color); });
    function handleInput(x, y, inputType) {
        if (inputType === 0 /* Start */) {
            // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
            let activeHandle = getHandleAtPoint(props, x, y, handlePositions);
            // If the input hit a handle, set it as the active handle, but don't update the color
            if (activeHandle !== null) {
                colorPicker.setActiveColor(activeHandle);
            }
            // If the input didn't hit a handle, set the currently active handle to that position
            else {
                colorPicker.inputActive = true;
                activeColor.hsv = getBoxValueFromInput(props, x, y);
                props.onInput(inputType);
            }
        }
        // move is fired when the user has started dragging
        else if (inputType === 1 /* Move */) {
            colorPicker.inputActive = true;
            activeColor.hsv = getBoxValueFromInput(props, x, y);
        }
        // let the color picker fire input:start, input:move or input:end events
        props.onInput(inputType);
    }
    return (h(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("svg", Object.assign({}, rootProps, { className: "IroBox", width: width, height: height, style: rootStyles }),
        h("defs", null,
            h("linearGradient", { id: 's' + uid, x1: "0%", y1: "0%", x2: "100%", y2: "0%" }, gradients[0].map(function (ref) {
                let offset = ref[0];
                let color = ref[1];

                return (h("stop", { offset: (offset + "%"), "stop-color": color }));
            })),
            h("linearGradient", { id: 'l' + uid, x1: "0%", y1: "0%", x2: "0%", y2: "100%" }, gradients[1].map(function (ref) {
                let offset = ref[0];
                let color = ref[1];

                return (h("stop", { offset: (offset + "%"), "stop-color": color }));
            })),
            h("pattern", { id: 'f' + uid, width: "100%", height: "100%" },
                h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (resolveSvgUrl('#s' + uid)) + ")") }),
                " }",
                h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (resolveSvgUrl('#l' + uid)) + ")") }))),
        h("rect", { rx: radius, ry: radius, x: props.borderWidth / 2, y: props.borderWidth / 2, width: width - props.borderWidth, height: height - props.borderWidth, "stroke-width": props.borderWidth, stroke: props.borderColor, fill: ("url(" + (resolveSvgUrl('#f' + uid)) + ")") }),
        colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (h(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
        h(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
}

let index = {
    Color: IroColor,
    ColorPicker: IroColorPickerWidget,
    ui: {
        h: h,
        ComponentBase: IroComponentBase,
        Slider: IroSlider,
        Wheel: IroWheel,
    },

};

export default index;
