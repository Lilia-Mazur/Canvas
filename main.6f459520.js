parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"KIzB":[function(require,module,exports) {
"use strict";var t,e=document.getElementById("canvas"),n=document.getElementById("clear"),r=e.getContext("2d"),y=e.offsetLeft,a=e.offsetTop,x=[],o=[],i={x:0,y:0},l={x:0,y:0},h=0,f=function(t){return{x:t.clientX-y,y:t.clientY-a}};function u(t,e){var n=(e.y2-e.y1)*(t.x2-t.x1)-(e.x2-e.x1)*(t.y2-t.y1);if(0===n)return!1;var r=((e.x2-e.x1)*(t.y1-e.y1)-(e.y2-e.y1)*(t.x1-e.x1))/n,y=((t.x2-t.x1)*(t.y1-e.y1)-(t.y2-t.y1)*(t.x1-e.x1))/n;return!(r<0||r>1||y<0||y>1)&&{x:Math.round(t.x1+r*(t.x2-t.x1)),y:Math.round(t.y1+r*(t.y2-t.y1))}}function v(e){if(0===h&&0===e.button)i=f(e),t=!0,h=1;else{l=f(e);for(var n={x1:i.x,y1:i.y,x2:l.x,y2:l.y},r=0;r<x.length;r++){var y=u(x[r],n);y&&2!==e.button&&o.push(y)}0===e.button&&x.push(n),g(),h=0,t=!1}}function s(e){if(t){g(),l=f(e);var n={x1:i.x,y1:i.y,x2:l.x,y2:l.y};r.beginPath(),r.moveTo(i.x,i.y),r.lineTo(l.x,l.y),r.stroke();for(var y=0;y<x.length;y++){var a=u(x[y],n);a&&(r.fillStyle="red",r.beginPath(),r.arc(a.x,a.y,5,0,Math.PI+2*Math.PI/2,!0),r.fill(),r.stroke())}}}function c(e){if(t){t=!1,h=0,l=f(e);for(var n={x1:i.x,y1:i.y,x2:l.x,y2:l.y},r=0;r<x.length;r++){var y=u(x[r],n);y&&o.push(y)}x.push(n),g()}}function g(){if(r.clearRect(0,0,e.width,e.height),0!==x.length){for(var t=0;t<x.length;t++)r.beginPath(),r.moveTo(x[t].x1,x[t].y1),r.lineTo(x[t].x2,x[t].y2),r.stroke();for(var n=0;n<o.length;n++)r.beginPath(),r.fillStyle="red",r.arc(o[n].x,o[n].y,5,0,Math.PI+2*Math.PI/2,!0),r.fill(),r.stroke()}}function d(){var t=setInterval(m,100);setTimeout(function(){x.length=0,o.length=0,m(),clearInterval(t)},3e3)}function m(){r.clearRect(0,0,e.width,e.height);for(var t=0;t<x.length;t++){var n=Math.abs(x[t].x1-x[t].x2)/20,y=Math.abs(x[t].y1-x[t].y2)/20;if(n<=1&&y<=1)return;var a=x[t].x1>x[t].x2?x[t].x1-n:x[t].x1+n,i=x[t].y1>x[t].y2?x[t].y1-y:x[t].y1+y,l=x[t].x2>x[t].x1?x[t].x2-n:x[t].x2+n,h=x[t].y2>x[t].y1?x[t].y2-y:x[t].y2+y;r.beginPath(),r.moveTo(a,i),r.lineTo(l,h),r.stroke(),x[t]={x1:a,y1:i,x2:l,y2:h};for(var f=0;f<x.length;f++){var v=u(x[t],x[f]);v&&o.push(v)}}for(var s=0;s<o.length;s++)r.beginPath(),r.fillStyle="red",r.arc(o[s].x,o[s].y,5,0,Math.PI+2*Math.PI/2,!0),r.fill(),r.stroke();o.length=0}e.addEventListener("mousedown",v),e.addEventListener("mousemove",s),e.addEventListener("mouseout",c),n.addEventListener("click",d);
},{}]},{},["KIzB"], null)
//# sourceMappingURL=main.6f459520.js.map