"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof2(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
};!function (e) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Url = e();
}(function () {
  return function i(a, u, c) {
    function f(t, e) {
      if (!u[t]) {
        if (!a[t]) {
          var o = "function" == typeof require && require;if (!e && o) return o(t, !0);if (s) return s(t, !0);var n = new Error("Cannot find module '" + t + "'");throw n.code = "MODULE_NOT_FOUND", n;
        }var r = u[t] = { exports: {} };a[t][0].call(r.exports, function (e) {
          return f(a[t][1][e] || e);
        }, r, r.exports, i, a, u, c);
      }return u[t].exports;
    }for (var s = "function" == typeof require && require, e = 0; e < c.length; e++) {
      f(c[e]);
    }return f;
  }({ 1: [function (e, t, o) {
      window.addEventListener("popstate", function (e) {
        u.triggerPopStateCb(e);
      });var u = t.exports = { _onPopStateCbs: [], _isHash: !1, queryString: function queryString(e, t) {
          e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");var o = new RegExp("[\\?&]" + e + "=([^&#]*)"),
              n = o.exec(location.search),
              r = null;return null === n ? !!(o = new RegExp("[\\?&]" + e + "(\\&([^&#]*)|$)")).test(location.search) || void 0 : (r = n[1].replace(/\+/g, " "), t ? r : decodeURIComponent(r));
        }, parseQuery: function parseQuery(e) {
          var t = {};if ("string" != typeof e && (e = window.location.search), !(e = e.replace(/^\?/g, ""))) return {};for (var o, n = e.split("&"), r = 0, i = null; r < n.length; ++r) {
            i = (o = n[r].indexOf("=")) < 0 ? (o = n[r].length, !0) : decodeURIComponent(n[r].slice(o + 1)), t[decodeURIComponent(n[r].slice(0, o))] = i;
          }return t;
        }, stringify: function stringify(o) {
          if (!o || o.constructor !== Object) throw new Error("Query object should be an object.");var n = "";return Object.keys(o).forEach(function (e) {
            var t = o[e];n += e, !0 !== t && (n += "=" + encodeURIComponent(o[e])), n += "&";
          }), n = n.replace(/\&$/g, "");
        }, updateSearchParam: function updateSearchParam(e, t, o, n) {
          if ("object" !== (void 0 === e ? "undefined" : _typeof(e))) {
            var r = this.parseQuery();if (void 0 === t) delete r[e];else {
              if (r[e] === t) return u;r[e] = t;
            }var i = (i = this.stringify(r)) && "?" + i;return this._updateAll(window.location.pathname + i + location.hash, o, n), u;
          }for (var a in e) {
            e.hasOwnProperty(a) && this.updateSearchParam(a, e[a], o, n);
          }
        }, getLocation: function getLocation() {
          return window.location.pathname + window.location.search + window.location.hash;
        }, hash: function hash(e, t) {
          return void 0 === e ? location.hash.substring(1) : (t || (setTimeout(function () {
            u._isHash = !1;
          }, 0), u._isHash = !0), location.hash = e);
        }, _updateAll: function _updateAll(e, t, o) {
          return window.history[t ? "pushState" : "replaceState"](null, "", e), o && u.triggerPopStateCb({}), e;
        }, pathname: function pathname(e, t, o) {
          return void 0 === e ? location.pathname : this._updateAll(e + window.location.search + window.location.hash, t, o);
        }, triggerPopStateCb: function triggerPopStateCb(t) {
          this._isHash || this._onPopStateCbs.forEach(function (e) {
            e(t);
          });
        }, onPopState: function onPopState(e) {
          this._onPopStateCbs.push(e);
        }, removeHash: function removeHash(e, t) {
          this._updateAll(window.location.pathname + window.location.search, e || !1, t || !1);
        }, removeQuery: function removeQuery(e, t) {
          this._updateAll(window.location.pathname + window.location.hash, e || !1, t || !1);
        }, version: "2.5.0" };
    }, {}] }, {}, [1])(1);
});