parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"uK4W":[function(require,module,exports) {
var t=function(){function t(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(n,e,i){return e&&t(n.prototype,e),i&&t(n,i),n}}();function n(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}module.exports=function(){function e(t,i,r){n(this,e),this.x=t,this.y=i,this.z=r}return t(e,[{key:"addScale$",value:function(t,n){this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n}},{key:"scale",value:function(t){return new e(t*this.x,t*this.y,t*this.z)}},{key:"abs",value:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}}],[{key:"cross",value:function(t,n){return new e(t.y*n.z-t.z*n.y,t.z*n.x-t.x*n.z,t.x*n.y-t.y*n.x)}}]),e}();
},{}],"xNDZ":[function(require,module,exports) {
"use strict";var t=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),e=require("./Vector"),i=s(e);function s(t){return t&&t.__esModule?t:{default:t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}module.exports=function(){function e(t,i,s){n(this,e),this.q=t,this.S=i,this.V=s,this.color="hsl("+~~(360*Math.random())+"deg, 65%, 65%)"}return t(e,[{key:"update",value:function(t,e){this.F=i.default.cross(this.V,t(this.S)).scale(this.q),this.V.addScale$(this.F,e),this.S.addScale$(this.V,e)}},{key:"draw",value:function(t){t.fillStyle=t.strokeStyle="red",t.lineWidth=4,t.beginPath(),t.moveTo(this.S.x,this.S.y),t.lineTo(this.S.x+this.F.x/2,this.S.y+this.F.y/2),t.stroke(),t.fillStyle=t.strokeStyle="blue",t.beginPath(),t.moveTo(this.S.x,this.S.y),t.lineTo(this.S.x+this.V.x/2,this.S.y+this.V.y/2),t.stroke(),t.fillStyle=this.color,t.beginPath(),t.arc(this.S.x,this.S.y,10*Math.abs(this.q),0,2*Math.PI),t.fill()}}]),e}();
},{"./Vector":"uK4W"}],"A2T1":[function(require,module,exports) {
"use strict";var e=require("./Vector"),t=i(e),n=require("./Particle"),r=i(n);function i(e){return e&&e.__esModule?e:{default:e}}var a=document.querySelector("#world"),l=a.width=window.innerWidth,f=a.height=window.innerHeight,u=a.getContext("2d"),d=[],o=new t.default(0,0,1);function w(e){return new t.default(0,0,Math.sin(.01*e.abs()))}var c=performance.now();function s(e){var n=(e-c)/1e3;c=e,u.fillStyle="black",u.fillRect(0,0,l,f),u.fillStyle=u.strokeStyle="#ffffff15",u.lineWidth=7;for(var r=40;r<f-40;r+=80)for(var i=40;i<l-40;i+=80){var a=w(new t.default(i,r,0));u.beginPath(),u.arc(i,r,38*a.abs(),0,2*Math.PI),u[a.z<0?"fill":"stroke"]()}for(var o=d.length-1;o>=0;o--)d[o].update(w,n),d[o].draw(u);window.requestAnimationFrame(s)}window.requestAnimationFrame(s),d.push(new r.default(-1,new t.default(l/2,f/2,0),new t.default(0,-100,0))),window.addEventListener("click",function(e){d.push(new r.default(1,new t.default(e.clientX,e.clientY,0),new t.default(0,-100,0)))});
},{"./Vector":"uK4W","./Particle":"xNDZ"}]},{},["A2T1"], null)
//# sourceMappingURL=/app.3990d017.map