(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{323:function(t,n,e){"use strict";e(116);var o=e(90);n.a=Object(o.a)("layout")},328:function(t,n,e){"use strict";e.r(n);e(38);var o=e(76),c=e.n(o),r={name:"contact",data:function(){return{html:void 0}},mounted:function(){var t=this;c.a.get("".concat("https://jstor-labs.github.io/visual-essays","/").concat(this.$options.name,".md")).then((function(n){return t.html=t.$marked(n.data)}))}},l=e(61),h=e(134),d=e.n(h),m=e(314),f=e(323),component=Object(l.a)(r,(function(){var t=this.$createElement,n=this._self._c||t;return n("v-layout",[n("v-flex",[n("div",{domProps:{innerHTML:this._s(this.html)}})])],1)}),[],!1,null,null,null);n.default=component.exports;d()(component,{VFlex:m.a,VLayout:f.a})}}]);