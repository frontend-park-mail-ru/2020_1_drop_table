!function (n) {
    var e = {};

    function t(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {i: r, l: !1, exports: {}};
        return n[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }

    t.m = n, t.c = e, t.d = function (n, e, r) {
        t.o(n, e) || Object.defineProperty(n, e, {enumerable: !0, get: r})
    }, t.r = function (n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0})
    }, t.t = function (n, e) {
        if (1 & e && (n = t(n)), 8 & e) return n;
        if (4 & e && "object" == typeof n && n && n.__esModule) return n;
        var r = Object.create(null);
        if (t.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: n
        }), 2 & e && "string" != typeof n) for (var o in n) t.d(r, o, function (e) {
            return n[e]
        }.bind(null, o));
        return r
    }, t.n = function (n) {
        var e = n && n.__esModule ? function () {
            return n.default
        } : function () {
            return n
        };
        return t.d(e, "a", e), e
    }, t.o = function (n, e) {
        return Object.prototype.hasOwnProperty.call(n, e)
    }, t.p = "", t(t.s = 34)
}([function (n, e, t) {
    "use strict";
    e.__esModule = !0, e.extend = l, e.indexOf = function (n, e) {
        for (var t = 0, r = n.length; t < r; t++) if (n[t] === e) return t;
        return -1
    }, e.escapeExpression = function (n) {
        if ("string" != typeof n) {
            if (n && n.toHTML) return n.toHTML();
            if (null == n) return "";
            if (!n) return n + "";
            n = "" + n
        }
        if (!a.test(n)) return n;
        return n.replace(o, i)
    }, e.isEmpty = function (n) {
        return !n && 0 !== n || !(!c(n) || 0 !== n.length)
    }, e.createFrame = function (n) {
        var e = l({}, n);
        return e._parent = n, e
    }, e.blockParams = function (n, e) {
        return n.path = e, n
    }, e.appendContextPath = function (n, e) {
        return (n ? n + "." : "") + e
    };
    var r = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;", "=": "&#x3D;"},
        o = /[&<>"'`=]/g, a = /[&<>"'`=]/;

    function i(n) {
        return r[n]
    }

    function l(n) {
        for (var e = 1; e < arguments.length; e++) for (var t in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], t) && (n[t] = arguments[e][t]);
        return n
    }

    var s = Object.prototype.toString;
    e.toString = s;
    var u = function (n) {
        return "function" == typeof n
    };
    u(/x/) && (e.isFunction = u = function (n) {
        return "function" == typeof n && "[object Function]" === s.call(n)
    }), e.isFunction = u;
    var c = Array.isArray || function (n) {
        return !(!n || "object" != typeof n) && "[object Array]" === s.call(n)
    };
    e.isArray = c
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0;
    var r = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];

    function o(n, e) {
        var t = e && e.loc, a = void 0, i = void 0, l = void 0, s = void 0;
        t && (a = t.start.line, i = t.end.line, l = t.start.column, s = t.end.column, n += " - " + a + ":" + l);
        for (var u = Error.prototype.constructor.call(this, n), c = 0; c < r.length; c++) this[r[c]] = u[r[c]];
        Error.captureStackTrace && Error.captureStackTrace(this, o);
        try {
            t && (this.lineNumber = a, this.endLineNumber = i, Object.defineProperty ? (Object.defineProperty(this, "column", {
                value: l,
                enumerable: !0
            }), Object.defineProperty(this, "endColumn", {
                value: s,
                enumerable: !0
            })) : (this.column = l, this.endColumn = s))
        } catch (n) {
        }
    }

    o.prototype = new Error, e.default = o, n.exports = e.default
}, function (n, e, t) {
    var r = t(3);
    n.exports = (r.default || r).template({
        compiler: [8, ">= 4.3.0"], main: function (n, e, t, r, o) {
            var a, i = n.lookupProperty || function (n, e) {
                if (Object.prototype.hasOwnProperty.call(n, e)) return n[e]
            };
            return '<div class="decorateContainer">\n\n    <div class="labelContainer">\n        <div class="labelField">\n            <span>' + n.escapeExpression("function" == typeof (a = null != (a = i(t, "name") || (null != e ? i(e, "name") : e)) ? a : n.hooks.helperMissing) ? a.call(null != e ? e : n.nullContext || {}, {
                name: "name",
                hash: {},
                data: o,
                loc: {start: {line: 5, column: 18}, end: {line: 5, column: 26}}
            }) : a) + '</span>\n        </div>\n        <div class="decorateField">\n            <div class="rectField">\n                <div class="decorateRect"></div>\n            </div>\n\n            <div class="decorateCircle"></div>\n        </div>\n    </div>\n\n</div>'
        }, useData: !0
    })
}, function (n, e, t) {
    n.exports = t(13).default
}, function (n, e, t) {
    "use strict";
    var r, o = function () {
        return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r
    }, a = function () {
        var n = {};
        return function (e) {
            if (void 0 === n[e]) {
                var t = document.querySelector(e);
                if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
                    t = t.contentDocument.head
                } catch (n) {
                    t = null
                }
                n[e] = t
            }
            return n[e]
        }
    }(), i = [];

    function l(n) {
        for (var e = -1, t = 0; t < i.length; t++) if (i[t].identifier === n) {
            e = t;
            break
        }
        return e
    }

    function s(n, e) {
        for (var t = {}, r = [], o = 0; o < n.length; o++) {
            var a = n[o], s = e.base ? a[0] + e.base : a[0], u = t[s] || 0, c = "".concat(s, " ").concat(u);
            t[s] = u + 1;
            var d = l(c), p = {css: a[1], media: a[2], sourceMap: a[3]};
            -1 !== d ? (i[d].references++, i[d].updater(p)) : i.push({
                identifier: c,
                updater: v(p, e),
                references: 1
            }), r.push(c)
        }
        return r
    }

    function u(n) {
        var e = document.createElement("style"), r = n.attributes || {};
        if (void 0 === r.nonce) {
            var o = t.nc;
            o && (r.nonce = o)
        }
        if (Object.keys(r).forEach((function (n) {
            e.setAttribute(n, r[n])
        })), "function" == typeof n.insert) n.insert(e); else {
            var i = a(n.insert || "head");
            if (!i) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            i.appendChild(e)
        }
        return e
    }

    var c, d = (c = [], function (n, e) {
        return c[n] = e, c.filter(Boolean).join("\n")
    });

    function p(n, e, t, r) {
        var o = t ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
        if (n.styleSheet) n.styleSheet.cssText = d(e, o); else {
            var a = document.createTextNode(o), i = n.childNodes;
            i[e] && n.removeChild(i[e]), i.length ? n.insertBefore(a, i[e]) : n.appendChild(a)
        }
    }

    function f(n, e, t) {
        var r = t.css, o = t.media, a = t.sourceMap;
        if (o ? n.setAttribute("media", o) : n.removeAttribute("media"), a && btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a)))), " */")), n.styleSheet) n.styleSheet.cssText = r; else {
            for (; n.firstChild;) n.removeChild(n.firstChild);
            n.appendChild(document.createTextNode(r))
        }
    }

    var h = null, m = 0;

    function v(n, e) {
        var t, r, o;
        if (e.singleton) {
            var a = m++;
            t = h || (h = u(e)), r = p.bind(null, t, a, !1), o = p.bind(null, t, a, !0)
        } else t = u(e), r = f.bind(null, t, e), o = function () {
            !function (n) {
                if (null === n.parentNode) return !1;
                n.parentNode.removeChild(n)
            }(t)
        };
        return r(n), function (e) {
            if (e) {
                if (e.css === n.css && e.media === n.media && e.sourceMap === n.sourceMap) return;
                r(n = e)
            } else o()
        }
    }

    n.exports = function (n, e) {
        (e = e || {}).singleton || "boolean" == typeof e.singleton || (e.singleton = o());
        var t = s(n = n || [], e);
        return function (n) {
            if (n = n || [], "[object Array]" === Object.prototype.toString.call(n)) {
                for (var r = 0; r < t.length; r++) {
                    var o = l(t[r]);
                    i[o].references--
                }
                for (var a = s(n, e), u = 0; u < t.length; u++) {
                    var c = l(t[u]);
                    0 === i[c].references && (i[c].updater(), i.splice(c, 1))
                }
                t = a
            }
        }
    }
}, function (n, e, t) {
    "use strict";
    n.exports = function (n) {
        var e = [];
        return e.toString = function () {
            return this.map((function (e) {
                var t = function (n, e) {
                    var t = n[1] || "", r = n[3];
                    if (!r) return t;
                    if (e && "function" == typeof btoa) {
                        var o = (i = r, l = btoa(unescape(encodeURIComponent(JSON.stringify(i)))), s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l), "/*# ".concat(s, " */")),
                            a = r.sources.map((function (n) {
                                return "/*# sourceURL=".concat(r.sourceRoot || "").concat(n, " */")
                            }));
                        return [t].concat(a).concat([o]).join("\n")
                    }
                    var i, l, s;
                    return [t].join("\n")
                }(e, n);
                return e[2] ? "@media ".concat(e[2], " {").concat(t, "}") : t
            })).join("")
        }, e.i = function (n, t, r) {
            "string" == typeof n && (n = [[null, n, ""]]);
            var o = {};
            if (r) for (var a = 0; a < this.length; a++) {
                var i = this[a][0];
                null != i && (o[i] = !0)
            }
            for (var l = 0; l < n.length; l++) {
                var s = [].concat(n[l]);
                r && o[s[0]] || (t && (s[2] ? s[2] = "".concat(t, " and ").concat(s[2]) : s[2] = t), e.push(s))
            }
        }, e
    }
}, function (n, e, t) {
    "use strict";

    function r(n) {
        return n && n.__esModule ? n : {default: n}
    }

    e.__esModule = !0, e.HandlebarsEnvironment = c;
    var o = t(0), a = r(t(1)), i = t(7), l = t(21), s = r(t(9)), u = t(10);
    e.VERSION = "4.7.3";
    e.COMPILER_REVISION = 8;
    e.LAST_COMPATIBLE_COMPILER_REVISION = 7;
    e.REVISION_CHANGES = {
        1: "<= 1.0.rc.2",
        2: "== 1.0.0-rc.3",
        3: "== 1.0.0-rc.4",
        4: "== 1.x.x",
        5: "== 2.0.0-alpha.x",
        6: ">= 2.0.0-beta.1",
        7: ">= 4.0.0 <4.3.0",
        8: ">= 4.3.0"
    };

    function c(n, e, t) {
        this.helpers = n || {}, this.partials = e || {}, this.decorators = t || {}, i.registerDefaultHelpers(this), l.registerDefaultDecorators(this)
    }

    c.prototype = {
        constructor: c, logger: s.default, log: s.default.log, registerHelper: function (n, e) {
            if ("[object Object]" === o.toString.call(n)) {
                if (e) throw new a.default("Arg not supported with multiple helpers");
                o.extend(this.helpers, n)
            } else this.helpers[n] = e
        }, unregisterHelper: function (n) {
            delete this.helpers[n]
        }, registerPartial: function (n, e) {
            if ("[object Object]" === o.toString.call(n)) o.extend(this.partials, n); else {
                if (void 0 === e) throw new a.default('Attempting to register a partial called "' + n + '" as undefined');
                this.partials[n] = e
            }
        }, unregisterPartial: function (n) {
            delete this.partials[n]
        }, registerDecorator: function (n, e) {
            if ("[object Object]" === o.toString.call(n)) {
                if (e) throw new a.default("Arg not supported with multiple decorators");
                o.extend(this.decorators, n)
            } else this.decorators[n] = e
        }, unregisterDecorator: function (n) {
            delete this.decorators[n]
        }, resetLoggedPropertyAccesses: function () {
            u.resetLoggedProperties()
        }
    };
    var d = s.default.log;
    e.log = d, e.createFrame = o.createFrame, e.logger = s.default
}, function (n, e, t) {
    "use strict";

    function r(n) {
        return n && n.__esModule ? n : {default: n}
    }

    e.__esModule = !0, e.registerDefaultHelpers = function (n) {
        o.default(n), a.default(n), i.default(n), l.default(n), s.default(n), u.default(n), c.default(n)
    }, e.moveHelperToHooks = function (n, e, t) {
        n.helpers[e] && (n.hooks[e] = n.helpers[e], t || delete n.helpers[e])
    };
    var o = r(t(14)), a = r(t(15)), i = r(t(16)), l = r(t(17)), s = r(t(18)), u = r(t(19)), c = r(t(20))
}, function (n, e) {
    var t;
    t = function () {
        return this
    }();
    try {
        t = t || new Function("return this")()
    } catch (n) {
        "object" == typeof window && (t = window)
    }
    n.exports = t
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0;
    var r = t(0), o = {
        methodMap: ["debug", "info", "warn", "error"], level: "info", lookupLevel: function (n) {
            if ("string" == typeof n) {
                var e = r.indexOf(o.methodMap, n.toLowerCase());
                n = e >= 0 ? e : parseInt(n, 10)
            }
            return n
        }, log: function (n) {
            if (n = o.lookupLevel(n), "undefined" != typeof console && o.lookupLevel(o.level) <= n) {
                var e = o.methodMap[n];
                console[e] || (e = "log");
                for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) r[a - 1] = arguments[a];
                console[e].apply(console, r)
            }
        }
    };
    e.default = o, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0, e.createProtoAccessControl = function (n) {
        var e = Object.create(null);
        e.constructor = !1, e.__defineGetter__ = !1, e.__defineSetter__ = !1, e.__lookupGetter__ = !1;
        var t = Object.create(null);
        return t.__proto__ = !1, {
            properties: {
                whitelist: r.createNewLookupObject(t, n.allowedProtoProperties),
                defaultValue: n.allowProtoPropertiesByDefault
            },
            methods: {
                whitelist: r.createNewLookupObject(e, n.allowedProtoMethods),
                defaultValue: n.allowProtoMethodsByDefault
            }
        }
    }, e.resultIsAllowed = function (n, e, t) {
        return i("function" == typeof n ? e.methods : e.properties, t)
    }, e.resetLoggedProperties = function () {
        Object.keys(a).forEach((function (n) {
            delete a[n]
        }))
    };
    var r = t(23), o = function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (null != n) for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
        return e.default = n, e
    }(t(9)), a = Object.create(null);

    function i(n, e) {
        return void 0 !== n.whitelist[e] ? !0 === n.whitelist[e] : void 0 !== n.defaultValue ? n.defaultValue : (function (n) {
            !0 !== a[n] && (a[n] = !0, o.log("error", 'Handlebars: Access has been denied to resolve the property "' + n + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details'))
        }(e), !1)
    }
}, function (n, e, t) {
    var r = t(3);
    n.exports = (r.default || r).template({
        compiler: [8, ">= 4.3.0"], main: function (n, e, t, r, o) {
            var a, i = null != e ? e : n.nullContext || {}, l = n.hooks.helperMissing, s = n.escapeExpression,
                u = n.lookupProperty || function (n, e) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) return n[e]
                };
            return '<form class="formField" method="post">\n    <div class="InputField">\n        <input type="text" id="full-name" required/>\n        <label for="full-name">' + s("function" == typeof (a = null != (a = u(t, "name") || (null != e ? u(e, "name") : e)) ? a : l) ? a.call(i, {
                name: "name",
                hash: {},
                data: o,
                loc: {start: {line: 4, column: 31}, end: {line: 4, column: 39}}
            }) : a) + '</label>\n    </div>\n\n    <div class="InputField">\n        <input type="email" id="email" required/>\n        <label for="email">' + s("function" == typeof (a = null != (a = u(t, "email") || (null != e ? u(e, "email") : e)) ? a : l) ? a.call(i, {
                name: "email",
                hash: {},
                data: o,
                loc: {start: {line: 9, column: 27}, end: {line: 9, column: 36}}
            }) : a) + '</label>\n    </div>\n\n    <div class="InputField">\n        <input type="password" id="password" required/>\n        <label for="password">' + s("function" == typeof (a = null != (a = u(t, "password") || (null != e ? u(e, "password") : e)) ? a : l) ? a.call(i, {
                name: "password",
                hash: {},
                data: o,
                loc: {start: {line: 14, column: 30}, end: {line: 14, column: 42}}
            }) : a) + '</label>\n    </div>\n\n    <div class="InputField">\n        <input type="password" id="re-password" required/>\n        <label for="re-password">' + s("function" == typeof (a = null != (a = u(t, "repeatedPassword") || (null != e ? u(e, "repeatedPassword") : e)) ? a : l) ? a.call(i, {
                name: "repeatedPassword",
                hash: {},
                data: o,
                loc: {start: {line: 19, column: 33}, end: {line: 19, column: 53}}
            }) : a) + '</label>\n    </div>\n    <div class="haveAccount">\n        <label>уже есть аккаунт? </label>\n        <label class="loginSpan">Войти </label>\n    </div>\n\n    <input type="submit" value="Готово"/>\n\n</form>;'
        }, useData: !0
    })
}, function (n, e, t) {
    var r = t(3);
    n.exports = (r.default || r).template({
        compiler: [8, ">= 4.3.0"], main: function (n, e, t, r, o) {
            var a, i = null != e ? e : n.nullContext || {}, l = n.hooks.helperMissing, s = n.escapeExpression,
                u = n.lookupProperty || function (n, e) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) return n[e]
                };
            return '<form class="formField">\n\n    <div class="InputField">\n        <input type="email" id="email" required/>\n        <label for="email">' + s("function" == typeof (a = null != (a = u(t, "email") || (null != e ? u(e, "email") : e)) ? a : l) ? a.call(i, {
                name: "email",
                hash: {},
                data: o,
                loc: {start: {line: 5, column: 27}, end: {line: 5, column: 36}}
            }) : a) + '</label>\n    </div>\n\n    <div class="InputField">\n        <input type="password" id="password" required/>\n        <label for="password">' + s("function" == typeof (a = null != (a = u(t, "password") || (null != e ? u(e, "password") : e)) ? a : l) ? a.call(i, {
                name: "password",
                hash: {},
                data: o,
                loc: {start: {line: 10, column: 30}, end: {line: 10, column: 42}}
            }) : a) + '</label>\n    </div>\n\n\n    <input type="submit" value="Готово"/>\n\n</form>;'
        }, useData: !0
    })
}, function (n, e, t) {
    "use strict";

    function r(n) {
        return n && n.__esModule ? n : {default: n}
    }

    function o(n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (null != n) for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
        return e.default = n, e
    }

    e.__esModule = !0;
    var a = o(t(6)), i = r(t(24)), l = r(t(1)), s = o(t(0)), u = o(t(25)), c = r(t(27));

    function d() {
        var n = new a.HandlebarsEnvironment;
        return s.extend(n, a), n.SafeString = i.default, n.Exception = l.default, n.Utils = s, n.escapeExpression = s.escapeExpression, n.VM = u, n.template = function (e) {
            return u.template(e, n)
        }, n
    }

    var p = d();
    p.create = d, c.default(p), p.default = p, e.default = p, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0;
    var r = t(0);
    e.default = function (n) {
        n.registerHelper("blockHelperMissing", (function (e, t) {
            var o = t.inverse, a = t.fn;
            if (!0 === e) return a(this);
            if (!1 === e || null == e) return o(this);
            if (r.isArray(e)) return e.length > 0 ? (t.ids && (t.ids = [t.name]), n.helpers.each(e, t)) : o(this);
            if (t.data && t.ids) {
                var i = r.createFrame(t.data);
                i.contextPath = r.appendContextPath(t.data.contextPath, t.name), t = {data: i}
            }
            return a(e, t)
        }))
    }, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    (function (r) {
        e.__esModule = !0;
        var o, a = t(0), i = t(1), l = (o = i) && o.__esModule ? o : {default: o};
        e.default = function (n) {
            n.registerHelper("each", (function (n, e) {
                if (!e) throw new l.default("Must pass iterator to #each");
                var t, o = e.fn, i = e.inverse, s = 0, u = "", c = void 0, d = void 0;

                function p(e, t, r) {
                    c && (c.key = e, c.index = t, c.first = 0 === t, c.last = !!r, d && (c.contextPath = d + e)), u += o(n[e], {
                        data: c,
                        blockParams: a.blockParams([n[e], e], [d + e, null])
                    })
                }

                if (e.data && e.ids && (d = a.appendContextPath(e.data.contextPath, e.ids[0]) + "."), a.isFunction(n) && (n = n.call(this)), e.data && (c = a.createFrame(e.data)), n && "object" == typeof n) if (a.isArray(n)) for (var f = n.length; s < f; s++) s in n && p(s, s, s === n.length - 1); else if (r.Symbol && n[r.Symbol.iterator]) {
                    for (var h = [], m = n[r.Symbol.iterator](), v = m.next(); !v.done; v = m.next()) h.push(v.value);
                    for (f = (n = h).length; s < f; s++) p(s, s, s === n.length - 1)
                } else t = void 0, Object.keys(n).forEach((function (n) {
                    void 0 !== t && p(t, s - 1), t = n, s++
                })), void 0 !== t && p(t, s - 1, !0);
                return 0 === s && (u = i(this)), u
            }))
        }, n.exports = e.default
    }).call(this, t(8))
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0;
    var r, o = t(1), a = (r = o) && r.__esModule ? r : {default: r};
    e.default = function (n) {
        n.registerHelper("helperMissing", (function () {
            if (1 !== arguments.length) throw new a.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
        }))
    }, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0;
    var r, o = t(0), a = t(1), i = (r = a) && r.__esModule ? r : {default: r};
    e.default = function (n) {
        n.registerHelper("if", (function (n, e) {
            if (2 != arguments.length) throw new i.default("#if requires exactly one argument");
            return o.isFunction(n) && (n = n.call(this)), !e.hash.includeZero && !n || o.isEmpty(n) ? e.inverse(this) : e.fn(this)
        })), n.registerHelper("unless", (function (e, t) {
            if (2 != arguments.length) throw new i.default("#unless requires exactly one argument");
            return n.helpers.if.call(this, e, {fn: t.inverse, inverse: t.fn, hash: t.hash})
        }))
    }, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0, e.default = function (n) {
        n.registerHelper("log", (function () {
            for (var e = [void 0], t = arguments[arguments.length - 1], r = 0; r < arguments.length - 1; r++) e.push(arguments[r]);
            var o = 1;
            null != t.hash.level ? o = t.hash.level : t.data && null != t.data.level && (o = t.data.level), e[0] = o, n.log.apply(n, e)
        }))
    }, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0, e.default = function (n) {
        n.registerHelper("lookup", (function (n, e, t) {
            return n ? t.lookupProperty(n, e) : n
        }))
    }, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0;
    var r, o = t(0), a = t(1), i = (r = a) && r.__esModule ? r : {default: r};
    e.default = function (n) {
        n.registerHelper("with", (function (n, e) {
            if (2 != arguments.length) throw new i.default("#with requires exactly one argument");
            o.isFunction(n) && (n = n.call(this));
            var t = e.fn;
            if (o.isEmpty(n)) return e.inverse(this);
            var r = e.data;
            return e.data && e.ids && ((r = o.createFrame(e.data)).contextPath = o.appendContextPath(e.data.contextPath, e.ids[0])), t(n, {
                data: r,
                blockParams: o.blockParams([n], [r && r.contextPath])
            })
        }))
    }, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0, e.registerDefaultDecorators = function (n) {
        a.default(n)
    };
    var r, o = t(22), a = (r = o) && r.__esModule ? r : {default: r}
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0;
    var r = t(0);
    e.default = function (n) {
        n.registerDecorator("inline", (function (n, e, t, o) {
            var a = n;
            return e.partials || (e.partials = {}, a = function (o, a) {
                var i = t.partials;
                t.partials = r.extend({}, i, e.partials);
                var l = n(o, a);
                return t.partials = i, l
            }), e.partials[o.args[0]] = o.fn, a
        }))
    }, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0, e.createNewLookupObject = function () {
        for (var n = arguments.length, e = Array(n), t = 0; t < n; t++) e[t] = arguments[t];
        return r.extend.apply(void 0, [Object.create(null)].concat(e))
    };
    var r = t(0)
}, function (n, e, t) {
    "use strict";

    function r(n) {
        this.string = n
    }

    e.__esModule = !0, r.prototype.toString = r.prototype.toHTML = function () {
        return "" + this.string
    }, e.default = r, n.exports = e.default
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0, e.checkRevision = function (n) {
        var e = n && n[0] || 1, t = l.COMPILER_REVISION;
        if (e >= l.LAST_COMPATIBLE_COMPILER_REVISION && e <= l.COMPILER_REVISION) return;
        if (e < l.LAST_COMPATIBLE_COMPILER_REVISION) {
            var r = l.REVISION_CHANGES[t], o = l.REVISION_CHANGES[e];
            throw new i.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + o + ").")
        }
        throw new i.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + n[1] + ").")
    }, e.template = function (n, e) {
        if (!e) throw new i.default("No environment passed to template");
        if (!n || !n.main) throw new i.default("Unknown template object: " + typeof n);
        n.main.decorator = n.main_d, e.VM.checkRevision(n.compiler);
        var t = n.compiler && 7 === n.compiler[0];
        var r = {
            strict: function (n, e, t) {
                if (!(n && e in n)) throw new i.default('"' + e + '" not defined in ' + n, {loc: t});
                return n[e]
            }, lookupProperty: function (n, e) {
                var t = n[e];
                return null == t ? t : Object.prototype.hasOwnProperty.call(n, e) ? t : c.resultIsAllowed(t, r.protoAccessControl, e) ? t : void 0
            }, lookup: function (n, e) {
                for (var t = n.length, o = 0; o < t; o++) {
                    if (null != (n[o] && r.lookupProperty(n[o], e))) return n[o][e]
                }
            }, lambda: function (n, e) {
                return "function" == typeof n ? n.call(e) : n
            }, escapeExpression: o.escapeExpression, invokePartial: function (t, r, a) {
                a.hash && (r = o.extend({}, r, a.hash), a.ids && (a.ids[0] = !0)), t = e.VM.resolvePartial.call(this, t, r, a);
                var l = o.extend({}, a, {hooks: this.hooks, protoAccessControl: this.protoAccessControl}),
                    s = e.VM.invokePartial.call(this, t, r, l);
                if (null == s && e.compile && (a.partials[a.name] = e.compile(t, n.compilerOptions, e), s = a.partials[a.name](r, l)), null != s) {
                    if (a.indent) {
                        for (var u = s.split("\n"), c = 0, d = u.length; c < d && (u[c] || c + 1 !== d); c++) u[c] = a.indent + u[c];
                        s = u.join("\n")
                    }
                    return s
                }
                throw new i.default("The partial " + a.name + " could not be compiled when running in runtime-only mode")
            }, fn: function (e) {
                var t = n[e];
                return t.decorator = n[e + "_d"], t
            }, programs: [], program: function (n, e, t, r, o) {
                var a = this.programs[n], i = this.fn(n);
                return e || o || r || t ? a = d(this, n, i, e, t, r, o) : a || (a = this.programs[n] = d(this, n, i)), a
            }, data: function (n, e) {
                for (; n && e--;) n = n._parent;
                return n
            }, mergeIfNeeded: function (n, e) {
                var t = n || e;
                return n && e && n !== e && (t = o.extend({}, e, n)), t
            }, nullContext: Object.seal({}), noop: e.VM.noop, compilerInfo: n.compiler
        };

        function a(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = t.data;
            a._setup(t), !t.partial && n.useData && (o = f(e, o));
            var i = void 0, l = n.useBlockParams ? [] : void 0;

            function s(e) {
                return "" + n.main(r, e, r.helpers, r.partials, o, l, i)
            }

            return n.useDepths && (i = t.depths ? e != t.depths[0] ? [e].concat(t.depths) : t.depths : [e]), (s = h(n.main, s, r, t.depths || [], o, l))(e, t)
        }

        return a.isTop = !0, a._setup = function (a) {
            if (a.partial) r.protoAccessControl = a.protoAccessControl, r.helpers = a.helpers, r.partials = a.partials, r.decorators = a.decorators, r.hooks = a.hooks; else {
                var i = o.extend({}, e.helpers, a.helpers);
                !function (n, e) {
                    Object.keys(n).forEach((function (t) {
                        var r = n[t];
                        n[t] = function (n, e) {
                            var t = e.lookupProperty;
                            return u.wrapHelper(n, (function (n) {
                                return o.extend({lookupProperty: t}, n)
                            }))
                        }(r, e)
                    }))
                }(i, r), r.helpers = i, n.usePartial && (r.partials = r.mergeIfNeeded(a.partials, e.partials)), (n.usePartial || n.useDecorators) && (r.decorators = o.extend({}, e.decorators, a.decorators)), r.hooks = {}, r.protoAccessControl = c.createProtoAccessControl(a);
                var l = a.allowCallsToHelperMissing || t;
                s.moveHelperToHooks(r, "helperMissing", l), s.moveHelperToHooks(r, "blockHelperMissing", l)
            }
        }, a._child = function (e, t, o, a) {
            if (n.useBlockParams && !o) throw new i.default("must pass block params");
            if (n.useDepths && !a) throw new i.default("must pass parent depths");
            return d(r, e, n[e], t, 0, o, a)
        }, a
    }, e.wrapProgram = d, e.resolvePartial = function (n, e, t) {
        n ? n.call || t.name || (t.name = n, n = t.partials[n]) : n = "@partial-block" === t.name ? t.data["partial-block"] : t.partials[t.name];
        return n
    }, e.invokePartial = function (n, e, t) {
        var r = t.data && t.data["partial-block"];
        t.partial = !0, t.ids && (t.data.contextPath = t.ids[0] || t.data.contextPath);
        var a = void 0;
        t.fn && t.fn !== p && function () {
            t.data = l.createFrame(t.data);
            var n = t.fn;
            a = t.data["partial-block"] = function (e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return t.data = l.createFrame(t.data), t.data["partial-block"] = r, n(e, t)
            }, n.partials && (t.partials = o.extend({}, t.partials, n.partials))
        }();
        void 0 === n && a && (n = a);
        if (void 0 === n) throw new i.default("The partial " + t.name + " could not be found");
        if (n instanceof Function) return n(e, t)
    }, e.noop = p;
    var r, o = function (n) {
        if (n && n.__esModule) return n;
        var e = {};
        if (null != n) for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
        return e.default = n, e
    }(t(0)), a = t(1), i = (r = a) && r.__esModule ? r : {default: r}, l = t(6), s = t(7), u = t(26), c = t(10);

    function d(n, e, t, r, o, a, i) {
        function l(e) {
            var o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], l = i;
            return !i || e == i[0] || e === n.nullContext && null === i[0] || (l = [e].concat(i)), t(n, e, n.helpers, n.partials, o.data || r, a && [o.blockParams].concat(a), l)
        }

        return (l = h(t, l, n, i, r, a)).program = e, l.depth = i ? i.length : 0, l.blockParams = o || 0, l
    }

    function p() {
        return ""
    }

    function f(n, e) {
        return e && "root" in e || ((e = e ? l.createFrame(e) : {}).root = n), e
    }

    function h(n, e, t, r, a, i) {
        if (n.decorator) {
            var l = {};
            e = n.decorator(e, l, t, r && r[0], a, i, r), o.extend(e, l)
        }
        return e
    }
}, function (n, e, t) {
    "use strict";
    e.__esModule = !0, e.wrapHelper = function (n, e) {
        if ("function" != typeof n) return n;
        return function () {
            var t = arguments[arguments.length - 1];
            return arguments[arguments.length - 1] = e(t), n.apply(this, arguments)
        }
    }
}, function (n, e, t) {
    "use strict";
    (function (t) {
        e.__esModule = !0, e.default = function (n) {
            var e = void 0 !== t ? t : window, r = e.Handlebars;
            n.noConflict = function () {
                return e.Handlebars === n && (e.Handlebars = r), n
            }
        }, n.exports = e.default
    }).call(this, t(8))
}, function (n, e, t) {
    var r = t(4), o = t(29);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [[n.i, o, ""]]);
    var a = {insert: "head", singleton: !1}, i = (r(o, a), o.locals ? o.locals : {});
    n.exports = i
}, function (n, e, t) {
    (e = t(5)(!1)).push([n.i, '.error{\n    color: #A32704;\n}\nhtml {\n    min-width: 480px;\n    max-width: 1440px;\n}\n\n.labelField {\n    display: inline-block;\n    vertical-align: center;\n    font-family: Montserrat;\n    font-style: normal;\n    font-weight: normal;\n    overflow: auto;\n    margin: auto;\n    top: 0;\n    left: 2rem;\n    bottom: 0;\n    right: 2rem;\n    width: 100%;\n}\n\n.loginField > img {\n    height: 65%;\n    overflow: auto;\n    margin: auto;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}\n\n\n.decorateContainer {\n    width: 100%;\n\n}\n\n.labelContainer {\n    width: 60%;\n    height: 50%;\n    padding-left: 10%;\n    padding-top: 5%;\n}\n\n.labelField span {\n    width: 100%;\n    height: 100%;\n    font-family: \'FuturaDemiCTT Normal\', arial;\n    font-style: normal;\n    font-size: 3rem;\n}\n\n.decorateField {\n    padding-top: 0;\n    padding-left: 50%;\n    display: inline-flex;\n    justify-content: space-between;\n\n}\n\n.rectField {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    padding-right: 1rem;\n}\n\n.decorateRect {\n    width: 10rem;\n    height: 0.2rem;\n    left: 50%;\n    background-color: #A32704;\n}\n\n.decorateCircle {\n    width: 2.5rem;\n    height: 2.5rem;\n    left: 60%;\n    background-color: #A32704;\n    border-radius: 50%;\n}\n\n\n.formContainer {\n    width: 100%;\n}\n\n\n.formField {\n    font-family: \'FuturaBookCTT Normal\', arial;\n    width: 25%;\n    margin: 0 auto;\n    padding-bottom: 5%;\n}\n\n.cafeFormField {\n    font-family: \'FuturaBookCTT Normal\', arial;\n    width: 50%;\n    margin: 0 auto;\n    padding-bottom: 5%;\n}\n\ninput {\n    background: none;\n    color: #000000;\n    padding-top: 5%;\n    padding-bottom: 5%;\n    font-size: 1rem;\n\n}\n\ninput:focus, input:active {\n    outline: none;\n}\n\ninput[type="text"], input[type="email"], input[type="password"] {\n    border: none;\n    border-bottom: solid 2px #000000;\n    width: 100%;\n\n}\n\ninput[type="submit"] {\n    font-weight: 500;\n    color: white;\n    background-color: #A32704;\n    margin-top: 2rem;\n    width: 100%;\n}\n\ninput[type="submit"]:hover {\n    cursor: pointer;\n}\n\ninput[type="submit"]:active {\n    color: white;\n    background: #A32704;\n\n}\n\n.InputField {\n\n    margin-top: 8%;\n    margin-left: auto;\n    margin-right: auto;\n    position: relative;\n\n\n}\n\n.InputField input {\n    padding-top: 2%;\n}\n\n.InputField label {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    font-size: 1.2rem;\n    color: rgb(0, 0, 0);\n    pointer-events: none;\n    -webkit-transition: all 0.15s ease-out 0s;\n    transition: all 0.15s ease-out 0s;\n}\n\n.InputField input:focus + label,\n.InputField input.has-value + label {\n    top: -1rem;\n    font-size: 1rem;\n    color: rgb(0, 0, 0);\n}\n\n.haveAccount {\n    width: 100%;\n    padding-top: 2rem;\n    display: inline-block;\n    text-align: center;\n}\n\n.haveAccount span {\n    display: block;\n    word-wrap: break-word;\n    font-family: \'FuturaDemiCTT Normal\', arial;\n}\n\n.loginSpan {\n    display: block;\n    word-wrap: break-word;\n    text-decoration: underline;\n}\n\n.newCafeContainer {\n    display: flex;\n    justify-content: space-between;\n    padding-bottom: 2rem;\n\n}\n\n.photoContainer {\n    text-align: center;\n}\n\n.photoContainer img {\n    width: 75%;\n\n}\n\n.photoContainer span {\n    display: block;\n    font-family: \'FuturaBookCTT Normal\', arial, serif;\n}\n\n@media only screen and (max-width: 680px) {\n\n    .formField {\n        width: 75%;\n    }\n\n    input {\n        padding-top: 10%;\n        padding-bottom: 10%;\n    }\n\n\n    .InputField input:focus + label,\n    .InputField input.has-value + label {\n        top: -0.5rem;\n        font-size: 1rem;\n        color: rgb(0, 0, 0);\n    }\n\n    .decorateCircle {\n        left: 40%;\n    }\n\n    .newCafeContainer {\n        display: table;\n        justify-content: space-between;\n        padding-bottom: 2rem;\n\n    }\n\n}\n\n\n@media (max-width: 850px) {\n\n\n}\n\n', ""]), n.exports = e
}, function (n, e, t) {
    var r = t(4), o = t(31);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [[n.i, o, ""]]);
    var a = {insert: "head", singleton: !1}, i = (r(o, a), o.locals ? o.locals : {});
    n.exports = i
}, function (n, e, t) {
    (e = t(5)(!1)).push([n.i, ".header {\n    overflow: hidden;\n    background-color: #ffffff;\n    height: max-content;\n    width: 100%;\n    float: right;\n    display: inline-flex;\n    justify-content: space-between;\n    top: 0;\n    /*margin-bottom: 5rem;*/\n    z-index: 3;\n\n}\n\n.rightPart {\n    display: inline-flex;\n    justify-content: right;\n}\n\n\n.header a {\n    color: black;\n    float: right;\n    padding: 2rem;\n    text-decoration: none;\n    font-size: 1.5rem;\n    line-height: 1.5rem;\n    background-color: white;\n}\n\n.header img {\n    height: 5rem;\n    overflow: auto;\n    margin: auto;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}\n\n.navHeader {\n    float: right;\n    padding-right: 0;\n}\n\n.header ul {\n    margin: 0;\n    padding-top: 0;\n    padding-right: 0;\n    z-index: 3;\n    list-style: none;\n    overflow: hidden;\n    background-color: #fff;\n    float: right;\n    font-family: Montserrat;\n\n}\n\n.header li a {\n    padding: 1rem 2rem;\n    text-decoration: none;\n}\n\n.header li a:hover,\n.header .menu-btn:hover {\n    background-color: #f4f4f4;\n}\n\n.header .menu {\n    clear: both;\n    max-height: 0;\n    transition: max-height .2s ease-out;\n}\n\n.header .menu-icon {\n    cursor: pointer;\n    display: inline-block;\n    float: right;\n    padding: 2rem 0;\n    position: relative;\n    user-select: none;\n}\n\n.header .menu-icon .navicon {\n    background: #333;\n    display: block;\n    height: 4px;\n    position: relative;\n    transition: background .2s ease-out;\n    width: 24px;\n}\n\n.header .menu-icon .navicon:before,\n.header .menu-icon .navicon:after {\n    background: #333;\n    content: '';\n    display: block;\n    height: 100%;\n    position: absolute;\n    transition: all .2s ease-out;\n    width: 100%;\n}\n\n.header .menu-icon .navicon:before {\n    top: 1rem;\n}\n\n.header .menu-icon .navicon:after {\n    top: -1rem;\n}\n\n.header .menu-btn {\n    display: none;\n}\n\n.header .menu-btn:checked ~ .menu {\n    max-height: 15rem;\n}\n\n.header .menu-btn:checked ~ .menu-icon .navicon {\n    background: transparent;\n}\n\n.header .menu-btn:checked ~ .menu-icon .navicon:before {\n    transform: rotate(-45deg);\n}\n\n.header .menu-btn:checked ~ .menu-icon .navicon:after {\n    transform: rotate(45deg);\n}\n\n.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,\n.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {\n    top: 0;\n}\n\n\n@media (min-width: 850px) {\n    .header ul {\n        float: right;\n    }\n\n    .header li {\n        float: right;\n    }\n\n    .header li a {\n        padding: 2rem 2rem;\n    }\n\n    .header .menu {\n        clear: none;\n        float: right;\n        max-height: none;\n    }\n\n    .header .menu-icon {\n        display: none;\n    }\n\n\n}\n", ""]), n.exports = e
}, function (n, e, t) {
    var r = t(4), o = t(33);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [[n.i, o, ""]]);
    var a = {insert: "head", singleton: !1}, i = (r(o, a), o.locals ? o.locals : {});
    n.exports = i
}, function (n, e, t) {
    (e = t(5)(!1)).push([n.i, '.error{\n    color: #A32704;\n}\nhtml {\n    min-width: 480px;\n    max-width: 1440px;\n}\n\n.labelField {\n    display: inline-block;\n    vertical-align: center;\n    font-family: Montserrat;\n    font-style: normal;\n    font-weight: normal;\n    overflow: auto;\n    margin: auto;\n    top: 0;\n    left: 2rem;\n    bottom: 0;\n    right: 2rem;\n    width: 100%;\n}\n\n.loginField > img {\n    height: 65%;\n    overflow: auto;\n    margin: auto;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}\n\n\n.decorateContainer {\n    width: 100%;\n\n}\n\n.labelContainer {\n    width: 60%;\n    height: 50%;\n    padding-left: 10%;\n    padding-top: 5%;\n}\n\n.labelField span {\n    width: 100%;\n    height: 100%;\n    font-family: \'FuturaDemiCTT Normal\', arial;\n    font-style: normal;\n    font-size: 3rem;\n}\n\n.decorateField {\n    padding-top: 0;\n    padding-left: 50%;\n    display: inline-flex;\n    justify-content: space-between;\n\n}\n\n.rectField {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    padding-right: 1rem;\n}\n\n.decorateRect {\n    width: 10rem;\n    height: 0.2rem;\n    left: 50%;\n    background-color: #A32704;\n}\n\n.decorateCircle {\n    width: 2.5rem;\n    height: 2.5rem;\n    left: 60%;\n    background-color: #A32704;\n    border-radius: 50%;\n}\n\n\n.formContainer {\n    width: 100%;\n}\n\n\n.formField {\n    font-family: \'FuturaBookCTT Normal\', arial;\n    width: 25%;\n    margin: 0 auto;\n    padding-bottom: 5%;\n}\n\n.cafeFormField {\n    font-family: \'FuturaBookCTT Normal\', arial;\n    width: 50%;\n    margin: 0 auto;\n    padding-bottom: 5%;\n}\n\ninput {\n    background: none;\n    color: #000000;\n    padding-top: 5%;\n    padding-bottom: 5%;\n    font-size: 1rem;\n\n}\n\ninput:focus, input:active {\n    outline: none;\n}\n\ninput[type="text"], input[type="email"], input[type="password"] {\n    border: none;\n    border-bottom: solid 2px #000000;\n    width: 100%;\n\n}\n\ninput[type="submit"] {\n    font-weight: 500;\n    color: white;\n    background-color: #A32704;\n    margin-top: 2rem;\n    width: 100%;\n}\n\ninput[type="submit"]:hover {\n    cursor: pointer;\n}\n\ninput[type="submit"]:active {\n    color: white;\n    background: #A32704;\n\n}\n\n.InputField {\n\n    margin-top: 8%;\n    margin-left: auto;\n    margin-right: auto;\n    position: relative;\n\n\n}\n\n.InputField input {\n    padding-top: 2%;\n}\n\n.InputField label {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    font-size: 1.2rem;\n    color: rgb(0, 0, 0);\n    pointer-events: none;\n    -webkit-transition: all 0.15s ease-out 0s;\n    transition: all 0.15s ease-out 0s;\n}\n\n.InputField input:focus + label,\n.InputField input.has-value + label {\n    top: -1rem;\n    font-size: 1rem;\n    color: rgb(0, 0, 0);\n}\n\n.haveAccount {\n    width: 100%;\n    padding-top: 2rem;\n    display: inline-block;\n    text-align: center;\n}\n\n.haveAccount span {\n    display: block;\n    word-wrap: break-word;\n    font-family: \'FuturaDemiCTT Normal\', arial;\n}\n\n.loginSpan {\n    display: block;\n    word-wrap: break-word;\n    text-decoration: underline;\n}\n\n.newCafeContainer {\n    display: flex;\n    justify-content: space-between;\n    padding-bottom: 2rem;\n\n}\n\n.photoContainer {\n    text-align: center;\n}\n\n.photoContainer img {\n    width: 75%;\n\n}\n\n.photoContainer span {\n    display: block;\n    font-family: \'FuturaBookCTT Normal\', arial, serif;\n}\n\n@media only screen and (max-width: 680px) {\n\n    .formField {\n        width: 75%;\n    }\n\n    input {\n        padding-top: 10%;\n        padding-bottom: 10%;\n    }\n\n\n    .InputField input:focus + label,\n    .InputField input.has-value + label {\n        top: -0.5rem;\n        font-size: 1rem;\n        color: rgb(0, 0, 0);\n    }\n\n    .decorateCircle {\n        left: 40%;\n    }\n\n    .newCafeContainer {\n        display: table;\n        justify-content: space-between;\n        padding-bottom: 2rem;\n\n    }\n\n}\n\n\n@media (max-width: 850px) {\n\n\n}\n\n', ""]), n.exports = e
}, function (n, e, t) {
    "use strict";
    t.r(e);
    var r = t(2), o = t.n(r), a = (t(28), t(11)), i = t.n(a);

    function l(n, e, t) {
        const r = document.createElement("div");
        r.className = "error", r.textContent = t, n.insertBefore(r, e.parentNode)
    }

    function s() {
        let n = document.createElement("div");
        n.className = "registerContainer";
        let e = document.createElement("div");
        e.className = "decorateContainer", e.innerHTML = o()({name: "Регистрация"}), n.appendChild(e);
        let t = document.createElement("div");
        return t.className = "formContainer", t.innerHTML = i()({
            name: "Имя",
            email: "Почта",
            password: "Пароль",
            repeatedPassword: "Повторите пароль"
        }), n.appendChild(t), t = t.firstElementChild, t.addEventListener("submit", (function (n) {
            n.preventDefault(), function (n) {
                let e = n.querySelectorAll(".error");
                for (let n of e) n.outerHTML = "";
                const t = n.elements.email, r = n.elements["re-password"], o = n.elements.password;
                let a = !0;
                t.validity.valid && "" !== t.value || (l(n, t, "Некорректный email"), a = !1), o.value !== r.value && (l(n, r, "Пароли не совпадают"), a = !1), "" === o.value && (l(n, o, "Некорректный пароль"), a = !1)
            }(t);
            const e = t.elements.email.value, r = t.elements.password.value, o = t.elements["full-name"].value;
            var a, i;
            a = {name: o, email: e, password: r}, i = n => console.log(n), fetch("/api/v1/owner", {
                method: "POST",
                body: JSON.stringify(a),
                credentials: "include"
            }).then(n => i(n.json())).catch(n => console.log(n))
        })), n
    }

    console.log("kek");
    t(30);

    function u() {
        console.log("kek");
        document.getElementById("app");
        var n = document.createElement("div");
        return n.className = "header", n.innerHTML = '<div class = "logoDiv">\n        <img src="https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg" class="logo">\n    </div>\n\n    <div class="rightPart">\n    <div class="navHeader">\n    <input class="menu-btn" type="checkbox" id="menu-btn" />\n    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>\n    <ul class="menu">\n        <li><a href="#myCafe">мои кафе</a></li>\n        <li><a href="#staff">работники</a></li>\n        <li><a href="#add">добавить</a></li>\n        <li><a href="#stat">статистика</a></li>\n    </ul>\n    </div>\n    <div class = "userPicDiv">\n        <img src="https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg">\n    </div>\n</div>\n', n
    }

    t(32);
    var c = t(12), d = t.n(c);

    function p() {
        let n = document.createElement("div");
        n.className = "loginContainer";
        let e = document.createElement("div");
        e.className = "decorateContainer", e.innerHTML = o()({name: "Привет, сладкий петушок"}), n.appendChild(e);
        let t = document.createElement("div");
        return t.className = "formContainer", t.innerHTML = d()({
            email: "Почта",
            password: "Пароль"
        }), n.appendChild(t), t = t.firstElementChild, t.addEventListener("submit", (function (n) {
            n.preventDefault();
            t.elements.email.value, t.elements.password.value;
            !function (n, e, t) {
                let r = new Headers;
                r.append("Accept", "application/json");
                let o = new Request(n, {method: "POST", headers: r, mode: "cors", body: "asd"});
                fetch(o).then(n => {
                    if (n.ok) return n.json();
                    throw new Error("BAD HTTP stuff")
                }).then(n => {
                    t(n)
                }).catch(n => {
                    console.log("ERROR:", n.message)
                })
            }("http://127.0.0.1:60000/api/v1/owner", 0, n => console.log(n))
        })), n
    }

    const f = document.body;
    let h = [{
        url: "", callback: function () {
            f.innerHTML = 'тут типа будет главная страница /reg /login\n<a href="#login">login</a>\n<a href="#reg">reg</a>'
        }
    }];

    function m() {
        let n = window.location.hash.substr(1), e = h[0];
        h.forEach(t => {
            n === t.url && (e = t)
        }), e.callback()
    }

    window.addEventListener("popstate", m), setTimeout(m, 0), h.push({
        url: "reg", callback: () => {
            f.innerHTML = "", f.appendChild(u()), f.appendChild(s())
        }
    }), h.push({
        url: "login", callback: () => {
            f.innerHTML = "", f.appendChild(u()), f.appendChild(p())
        }
    })
}]);