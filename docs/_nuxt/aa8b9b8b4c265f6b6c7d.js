(window.webpackJsonp=window.webpackJsonp||[]).push([[5,7],{322:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n(90);function o(e){var t=e.match(/^(https?)\:\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);return t&&{protocol:t[1],host:t[2],hostname:t[3],origin:"".concat(t[1],"://").concat(t[2]),port:t[4],pathname:t[5],search:t[6],hash:t[7]}}},323:function(e,t,n){var o,a;a=this,void 0===(o=function(){return a.returnExportsGlobal=function(){"use strict";function a(){var a,b;this.q=[],this.add=function(a){this.q.push(a)},this.call=function(){for(a=0,b=this.q.length;b>a;a++)this.q[a].call()}}function e(e,n){if(e.resizedAttached){if(e.resizedAttached)return void e.resizedAttached.add(n)}else e.resizedAttached=new a,e.resizedAttached.add(n);e.resizeSensor=document.createElement("div"),e.resizeSensor.className="resize-sensor";var o="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden; opacity: 0;",g="position: absolute; left: 0; top: 0; transition: 0s;";e.resizeSensor.style.cssText=o,e.resizeSensor.innerHTML='<div class="resize-sensor-expand" style="'+o+'"><div style="'+g+'"></div></div><div class="resize-sensor-shrink" style="'+o+'"><div style="'+g+' width: 200%; height: 200%"></div></div>',e.appendChild(e.resizeSensor),"static"==function(a,b){return a.currentStyle?a.currentStyle[b]:window.getComputedStyle?window.getComputedStyle(a,null).getPropertyValue(b):a.style[b]}(e,"position")&&(e.style.position="relative");var r=e.resizeSensor.childNodes[0],i=r.childNodes[0],_=e.resizeSensor.childNodes[1],c=function(){i.style.width=1e5+"px",i.style.height=1e5+"px",r.scrollLeft=1e5,r.scrollTop=1e5,_.scrollLeft=1e5,_.scrollTop=1e5};c();var l=!1,d=function(){e.resizedAttached&&(l&&(e.resizedAttached.call(),l=!1),t(d))};t(d);var h,f,p,q,m=function(){((p=e.offsetWidth)!=h||(q=e.offsetHeight)!=f)&&(l=!0,h=p,f=q),c()},s=function(a,b,e){a.attachEvent?a.attachEvent("on"+b,e):a.addEventListener(b,e)};s(r,"scroll",m),s(_,"scroll",m)}var t=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(a){return window.setTimeout(a,20)},n=function(a,b){var t=Object.prototype.toString.call(a),n=this._isCollectionTyped="[object Array]"===t||"[object NodeList]"===t||"[object HTMLCollection]"===t||"undefined"!=typeof jQuery&&a instanceof window.jQuery||"undefined"!=typeof Elements&&a instanceof window.Elements;if(this._element=a,n)for(var g=0,o=a.length;o>g;g++)e(a[g],b);else e(a,b)};return n.prototype.detach=function(){var b=this._isCollectionTyped,e=this._element;if(b)for(var t=0,o=e.length;o>t;t++)n.detach(e[t]);else n.detach(e)},n.detach=function(a){a.resizeSensor&&(a.removeChild(a.resizeSensor),delete a.resizeSensor,delete a.resizedAttached)},n}()}.apply(t,[]))||(e.exports=o)},324:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(50),core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(38),core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__),axios__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(76),axios__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(322),resize_sensor__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(323),resize_sensor__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(resize_sensor__WEBPACK_IMPORTED_MODULE_4__);__webpack_exports__.default={name:"main-mixin",data:function(){return{essay:void 0}},computed:{html:function(){return this.$store.getters.html},baseUrl:function(){return this.$store.getters.baseUrl},markup:function(){return this.$store.getters.markup}},created:function(){this.$store.dispatch("setTitle","Visual Essays"),this.$store.dispatch("setBanner","https://picsum.photos/1200/225")},methods:{getStaticPage:function(e){var t=this;console.log("markup=".concat(this.markup)),e=0===e.indexOf("http")?e:"".concat(this.baseUrl,"/").concat("wikitext"===this.markup?"wiki/":"").concat(e);var n=Object(_utils__WEBPACK_IMPORTED_MODULE_3__.a)(e);return console.log("Page ".concat(this.$options.name,": markup=").concat(this.markup," url=").concat(e)),"markdown"===this.markup?this.getMarkdown(e).then((function(html){t.$store.dispatch("setHtml",html),t.$nextTick((function(){t.updateLinks()}))})):"wikitext"===this.markup?this.getWikitext(n.hostname,e.split("/").slice(4).join("/")).then((function(html){t.$store.dispatch("setHtml",html),t.$nextTick((function(){t.cleanWikitext(),t.updateLinks()}))})):void 0},getMarkdown:function(e){var t=this;return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(e).then((function(e){return t.$marked(e.data)}))},getWikitext:function(e,title){return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("https://".concat(e,"/w/api.php?action=parse&format=json&page=").concat(encodeURIComponent(title))).then((function(e){return e.data.parse?e.data.parse.text["*"]:""}))},updateLinks:function(){var e=this;console.log("updateLinks",this.$options.name),this.$refs[this.$options.name]&&(this.$refs[this.$options.name].querySelectorAll("a").forEach((function(link){if(link.href){var t=Object(_utils__WEBPACK_IMPORTED_MODULE_3__.a)(link.href);if(console.log("parsedUrl.origin=".concat(t.origin," baseUrl=").concat(e.baseUrl," window.location.origin=").concat(window.location.origin," window.location.hostname=").concat(window.location.hostname," markup=").concat(e.markup)),(0===e.baseUrl.indexOf(t.origin)||window.location.origin===t.origin||"localhost"===window.location.hostname)&&-1===link.href.indexOf("#"))if("wikitext"===e.markup)if("File:"===t.pathname.slice(6,11))link.href="".concat(e.baseUrl,"/wiki/File:").concat(t.pathname.slice(11));else{var n=t.pathname.slice(6);link.removeAttribute("href"),link.addEventListener("click",(function(t){e.$router.push("/essay/".concat(n))}))}else{var o=0===t.pathname.indexOf("/visual-essays/")?t.pathname.slice(15):t.pathname.slice(1);o=".md"==o.slice(o.length-3)?o.slice(0,o.length-3):o,link.removeAttribute("href"),link.addEventListener("click",(function(t){e.$router.push("/essay/".concat(o))}))}}})),this.$refs[this.$options.name].querySelectorAll("img").forEach((function(img){var t=Object(_utils__WEBPACK_IMPORTED_MODULE_3__.a)(img.src);t.origin!==e.baseUrl&&window.location.origin!==t.origin&&"localhost"!==window.location.hostname||"wikitext"===e.markup&&"/w/images/"===t.pathname.slice(0,10)&&(img.src="".concat(e.baseUrl).concat(t.pathname))})))},cleanWikitext:function(){this.$refs[this.$options.name]&&this.$refs[this.$options.name].querySelectorAll(".mw-editsection").forEach((function(a){a.remove()}))},getEssay:function(e){var t=this;window.data=void 0;var n="".concat("https://us-central1-visual-essay.cloudfunctions.net","/essay?src=").concat(encodeURIComponent(e),"&nocss");axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(n).then((function(e){return t.essay=e.data})).then((function(e){return t.onLoaded()}))},onLoaded:function onLoaded(){var _this6=this,essayElem=document.getElementById("visual-essay");if(console.log("onLoaded",essayElem),essayElem){var _this=this;if(new resize_sensor__WEBPACK_IMPORTED_MODULE_4___default.a(essayElem,(function(){var e=document.getElementById("essay-spacer");_this.$store.dispatch("setSpacerHeight",e?e.clientHeight:0)})),console.log("onLoaded",window.data),!window.data){var jsonld=essayElem.querySelectorAll('script[type="application/ld+json"]');jsonld.length>0&&jsonld.forEach((function(scr){eval(scr)}))}this.addMetadata(),this.updateLinks()}else setTimeout((function(){_this6.onLoaded()}),1e3)},addMetadata:function(){var e=this;window.data?window.data.forEach((function(t){"essay"===t.type&&(t.title&&e.$store.dispatch("setTitle",t.title),t.banner&&e.$store.dispatch("setBanner",t.banner))})):setTimeout((function(){e.addMetadata()}),1e3)}}}},325:function(e,t,n){"use strict";n(115);var o=n(91);t.a=Object(o.a)("layout")},328:function(e,t,n){"use strict";n.r(t);n(38);var o={name:"help",mixins:[n(324).default],mounted:function(){this.getStaticPage(this.$store.getters.pages[this.$options.name])}},r=n(61),_=n(132),c=n.n(_),l=n(313),d=n(325),component=Object(r.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("v-layout",[t("v-flex",[t("div",{ref:this.$options.name,domProps:{innerHTML:this._s(this.html)}})])],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VFlex:l.a,VLayout:d.a})}}]);