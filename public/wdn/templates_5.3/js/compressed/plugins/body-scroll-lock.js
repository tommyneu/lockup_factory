!function(e,o){if("function"==typeof define&&define.amd)define(["exports"],o);else if("undefined"!=typeof exports)o(exports);else{var t={exports:{}};o(t.exports),e.bodyScrollLock=t.exports}}(this,function(e){"use strict";function o(e){if(Array.isArray(e)){for(var o=0,t=Array(e.length);o<e.length;o++)t[o]=e[o];return t}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0});var t=!1;if("undefined"!=typeof window){var n={get passive(){t=!0}};window.addEventListener("testPassive",null,n),window.removeEventListener("testPassive",null,n)}var i="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),r=[],d=!1,l=-1,c=void 0,u=void 0,s=void 0,a=function(e){return r.some(function(o){return!(!o.options.allowTouchMove||!o.options.allowTouchMove(e))})},f=function(e){var o=e||window.event;return!!a(o.target)||(o.touches.length>1||(o.preventDefault&&o.preventDefault(),!1))},v=function(e){if(void 0===s){var o=!!e&&!0===e.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;if(o&&t>0){var n=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);s=document.body.style.paddingRight,document.body.style.paddingRight=n+t+"px"}}void 0===c&&(c=document.body.style.overflow,document.body.style.overflow="hidden")},m=function(){void 0!==s&&(document.body.style.paddingRight=s,s=void 0),void 0!==c&&(document.body.style.overflow=c,c=void 0)},y=function(){return window.requestAnimationFrame(function(){if(void 0===u){u={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var e=window,o=e.scrollY,t=e.scrollX,n=e.innerHeight;document.body.style.position="fixed",document.body.style.top=-o,document.body.style.left=-t,setTimeout(function(){return window.requestAnimationFrame(function(){var e=n-window.innerHeight;e&&o>=n&&(document.body.style.top=-(o+e))})},300)}})},p=function(){if(void 0!==u){var e=-parseInt(document.body.style.top,10),o=-parseInt(document.body.style.left,10);document.body.style.position=u.position,document.body.style.top=u.top,document.body.style.left=u.left,window.scrollTo(o,e),u=void 0}},g=function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight},w=function(e,o){var t=e.targetTouches[0].clientY-l;return!a(e.target)&&(o&&0===o.scrollTop&&t>0?f(e):g(o)&&t<0?f(e):(e.stopPropagation(),!0))};e.disableBodyScroll=function(e,n){if(!e)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(!r.some(function(o){return o.targetElement===e})){var c={targetElement:e,options:n||{}};r=[].concat(o(r),[c]),i?y():v(n),i&&(e.ontouchstart=function(e){1===e.targetTouches.length&&(l=e.targetTouches[0].clientY)},e.ontouchmove=function(o){1===o.targetTouches.length&&w(o,e)},d||(document.addEventListener("touchmove",f,t?{passive:!1}:void 0),d=!0))}},e.clearAllBodyScrollLocks=function(){i&&(r.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),d&&(document.removeEventListener("touchmove",f,t?{passive:!1}:void 0),d=!1),l=-1),i?p():m(),r=[]},e.enableBodyScroll=function(e){if(!e)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");r=r.filter(function(o){return o.targetElement!==e}),i&&(e.ontouchstart=null,e.ontouchmove=null,d&&0===r.length&&(document.removeEventListener("touchmove",f,t?{passive:!1}:void 0),d=!1)),i?p():m()}});
//# sourceMappingURL=body-scroll-lock.js.map