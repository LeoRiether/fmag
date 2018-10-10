// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"Vector.js":[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function V(x, y, z) {
    _classCallCheck(this, V);

    this.x = x;
    this.y = y;
    this.z = z;
  }

  _createClass(V, [{
    key: "addScale$",
    value: function addScale$(A, c) {
      this.x += A.x * c;
      this.y += A.y * c;
      this.z += A.z * c;
    }
  }, {
    key: "scale",
    value: function scale(c) {
      return new V(c * this.x, c * this.y, c * this.z);
    }
  }, {
    key: "abs",
    value: function abs() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
  }], [{
    key: "cross",
    value: function cross(A, B) {
      return new V(A.y * B.z - A.z * B.y, A.z * B.x - A.x * B.z, A.x * B.y - A.y * B.x);
    }
  }]);

  return V;
}();
},{}],"Particle.js":[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Particle(q, S, V) {
    _classCallCheck(this, Particle);

    this.q = q;
    this.S = S;
    this.V = V;
    this.color = 'hsl(' + ~~(Math.random() * 360) + 'deg, 65%, 65%)';
  }

  _createClass(Particle, [{
    key: 'update',
    value: function update(field, dt) {
      this.F = _Vector2.default.cross(this.V, field(this.S)).scale(this.q);

      this.V.addScale$(this.F, dt);
      this.S.addScale$(this.V, dt);
    }
  }, {
    key: 'draw',
    value: function draw(canvas) {
      // Arrows I mean Vectors
      canvas.fillStyle = canvas.strokeStyle = 'red';
      canvas.lineWidth = 4;
      canvas.beginPath();
      canvas.moveTo(this.S.x, this.S.y);
      canvas.lineTo(this.S.x + this.F.x / 2, this.S.y + this.F.y / 2);
      canvas.stroke();
      canvas.fillStyle = canvas.strokeStyle = 'blue';
      canvas.beginPath();
      canvas.moveTo(this.S.x, this.S.y);
      canvas.lineTo(this.S.x + this.V.x / 2, this.S.y + this.V.y / 2);
      canvas.stroke();

      // Particle
      canvas.fillStyle = this.color;
      canvas.beginPath();
      canvas.arc(this.S.x, this.S.y, Math.abs(this.q) * 10.0, 0, 2.0 * Math.PI);
      canvas.fill();
    }
  }]);

  return Particle;
}();
},{"./Vector":"Vector.js"}],"app.js":[function(require,module,exports) {
'use strict';

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _Particle = require('./Particle');

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var world = document.querySelector('#world');
var width = world.width = window.innerWidth;
var height = world.height = window.innerHeight;
var canvas = world.getContext('2d'); // World is the canvas and canvas is the context, yes


var particles = []; // List of particles

var justAConstantFieldVectorLol = new _Vector2.default(0, 0, 1);
function field(S) {
  // return justAConstantFieldVectorLol;
  // return new V(0, 0, 5*S.abs()/width);
  return new _Vector2.default(0, 0, Math.sin(S.abs() * 0.01));
  // return new V(0, 0, S.x/width);
}

var lastT = performance.now();

function loop(nowT) {
  var dt = (nowT - lastT) / 1000.0;
  lastT = nowT;

  canvas.fillStyle = 'black';
  canvas.fillRect(0, 0, width, height);

  canvas.fillStyle = canvas.strokeStyle = '#ffffff15';
  canvas.lineWidth = 7;
  for (var i = 40; i < height - 40; i += 80) {
    for (var j = 40; j < width - 40; j += 80) {
      var f = field(new _Vector2.default(j, i, 0));
      canvas.beginPath();
      canvas.arc(j, i, f.abs() * 38.0, 0, 2.0 * Math.PI);
      canvas[f.z < 0 ? 'fill' : 'stroke']();
    }
  }

  for (var _i = particles.length - 1; _i >= 0; _i--) {
    // Loop through all of the particles

    particles[_i].update(field, dt);
    particles[_i].draw(canvas);
  }

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

particles.push(new _Particle2.default(-1, new _Vector2.default(width / 2.0, height / 2.0, 0), new _Vector2.default(0, -100.0, 0)));

window.addEventListener('click', function (e) {
  particles.push(new _Particle2.default(1, new _Vector2.default(e.clientX, e.clientY, 0), new _Vector2.default(0, -100.0, 0)));
});
},{"./Vector":"Vector.js","./Particle":"Particle.js"}],"C:\\Users\\Leonardo\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50391' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\Leonardo\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.54601421.map