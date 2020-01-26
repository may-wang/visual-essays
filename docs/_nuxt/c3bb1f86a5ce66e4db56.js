(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{323:function(e,t,n){"use strict";n(116);var o=n(90);t.a=Object(o.a)("layout")},324:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(50),core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__),axios__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(76),axios__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__),resize_sensor__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(326),resize_sensor__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(resize_sensor__WEBPACK_IMPORTED_MODULE_2__);__webpack_exports__.a={name:"essay",data:function(){return{essay:void 0}},created:function(){window.data=void 0,this.$store.dispatch("setTitle","Visual Essays"),this.$store.dispatch("setBanner","https://picsum.photos/1200/225")},mounted:function(){var e=this.$route.query.src.replace(/http:\/\/localhost:5000/,"file://localhost");console.log("essay",e,"https://us-central1-visual-essay.cloudfunctions.net"),this.getEssay(e)},methods:{getEssay:function(e){var t=this,n="".concat("https://us-central1-visual-essay.cloudfunctions.net","/essay?src=").concat(encodeURIComponent(e),"&nocss");console.log(n),axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(n).then((function(e){t.essay=e.data,t.$nextTick((function(){var e=document.getElementById("essay");t.getEssayMetadata(e);var n=t;new resize_sensor__WEBPACK_IMPORTED_MODULE_2___default.a(e,(function(){var e=document.getElementById("essay-spacer");n.$store.dispatch("setSpacerHeight",e?e.clientHeight:0)}))}))}))},addMetadata:function(){var e=this;window.data?window.data.forEach((function(t){"essay"===t.type&&(t.title&&e.$store.dispatch("setTitle",t.title),t.banner&&e.$store.dispatch("setBanner",t.banner))})):setTimeout((function(){e.addMetadata()}),200)},getEssayMetadata:function getEssayMetadata(essay){window.data||essay.querySelectorAll('script[type="application/ld+json"]').forEach((function(scr){eval(scr)})),this.addMetadata()}}}},326:function(e,t,n){var o,a;a=this,void 0===(o=function(){return a.returnExportsGlobal=function(){"use strict";function a(){var a,b;this.q=[],this.add=function(a){this.q.push(a)},this.call=function(){for(a=0,b=this.q.length;b>a;a++)this.q[a].call()}}function e(e,n){if(e.resizedAttached){if(e.resizedAttached)return void e.resizedAttached.add(n)}else e.resizedAttached=new a,e.resizedAttached.add(n);e.resizeSensor=document.createElement("div"),e.resizeSensor.className="resize-sensor";var o="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden; opacity: 0;",g="position: absolute; left: 0; top: 0; transition: 0s;";e.resizeSensor.style.cssText=o,e.resizeSensor.innerHTML='<div class="resize-sensor-expand" style="'+o+'"><div style="'+g+'"></div></div><div class="resize-sensor-shrink" style="'+o+'"><div style="'+g+' width: 200%; height: 200%"></div></div>',e.appendChild(e.resizeSensor),"static"==function(a,b){return a.currentStyle?a.currentStyle[b]:window.getComputedStyle?window.getComputedStyle(a,null).getPropertyValue(b):a.style[b]}(e,"position")&&(e.style.position="relative");var r=e.resizeSensor.childNodes[0],i=r.childNodes[0],_=e.resizeSensor.childNodes[1],c=function(){i.style.width=1e5+"px",i.style.height=1e5+"px",r.scrollLeft=1e5,r.scrollTop=1e5,_.scrollLeft=1e5,_.scrollTop=1e5};c();var d=!1,l=function(){e.resizedAttached&&(d&&(e.resizedAttached.call(),d=!1),t(l))};t(l);var h,f,p,q,y=function(){((p=e.offsetWidth)!=h||(q=e.offsetHeight)!=f)&&(d=!0,h=p,f=q),c()},s=function(a,b,e){a.attachEvent?a.attachEvent("on"+b,e):a.addEventListener(b,e)};s(r,"scroll",y),s(_,"scroll",y)}var t=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(a){return window.setTimeout(a,20)},n=function(a,b){var t=Object.prototype.toString.call(a),n=this._isCollectionTyped="[object Array]"===t||"[object NodeList]"===t||"[object HTMLCollection]"===t||"undefined"!=typeof jQuery&&a instanceof window.jQuery||"undefined"!=typeof Elements&&a instanceof window.Elements;if(this._element=a,n)for(var g=0,o=a.length;o>g;g++)e(a[g],b);else e(a,b)};return n.prototype.detach=function(){var b=this._isCollectionTyped,e=this._element;if(b)for(var t=0,o=e.length;o>t;t++)n.detach(e[t]);else n.detach(e)},n.detach=function(a){a.resizeSensor&&(a.removeChild(a.resizeSensor),delete a.resizeSensor,delete a.resizedAttached)},n}()}.apply(t,[]))||(e.exports=o)},333:function(e,t,n){"use strict";n.r(t);var o=n(324).a,r=n(61),_=n(134),c=n.n(_),d=n(314),l=n(323),component=Object(r.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("v-layout",[t("v-flex",[t("div",{ref:"main",attrs:{id:"main"},domProps:{innerHTML:this._s(this.essay)}})])],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VFlex:d.a,VLayout:l.a})}}]);