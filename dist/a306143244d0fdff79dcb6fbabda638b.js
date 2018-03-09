// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var search = {
    sport: function sport() {

        var elInput = document.querySelector('.searchSport'),
            elDiv = document.querySelectorAll("#sportList div"),
            elP = document.querySelectorAll('.sport');

        elInput.addEventListener('keyup', function () {
            var filter = elInput.value.toUpperCase();
            for (var i = 0; i < elP.length; i++) {
                var elA = document.querySelectorAll('a');
                if (elA[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    elDiv[i].classList.remove('gone');
                } else {
                    elDiv[i].classList.add('gone');
                }
            }
        });
    },
    sporter: function sporter() {
        var elInput = document.querySelector('.searchName'),
            elDiv = document.querySelectorAll(".sporterList div"),
            elP = document.querySelectorAll('.sporter');

        elInput.addEventListener('keyup', function () {
            var filter = elInput.value.toUpperCase();
            for (var i = 0; i < elP.length; i++) {
                var elA = document.querySelectorAll('.sporter a');
                if (elA[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    elDiv[i].classList.remove('gone');
                } else {
                    elDiv[i].classList.add('gone');
                }
            }
        });
    }

};

exports.default = search;
},{}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _search = require('./search.js');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var query = {

    callSport: function callSport() {
        var endpointUrl = 'https://query.wikidata.org/sparql',
            sparqlQuery = '\n            SELECT DISTINCT ?sportclass ?sportclassLabel WHERE {\n                ?person wdt:P19 wd:Q727 .\n                ?person wdt:P106 ?sportclass .\n                ?sportclass wdt:P279 wd:Q2066131 .\n                SERVICE wikibase:label { bd:serviceParam wikibase:language "nl". \n            }\n        }ORDER BY ?sportclassLabel',
            fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery),
            headers = { 'Accept': 'application/sparql-results+json' };

        fetch(fullUrl, { headers: headers }).then(function (body) {
            return body.json();
        }).then(function (json) {
            var vars = json.head.vars,
                results = json.results,
                elSportList = document.querySelector('#sportList');

            var _loop = function _loop(result) {

                var p = document.createElement('p'),
                    a = document.createElement('a'),
                    pdiv = document.createElement('div'),
                    spinner = document.querySelector('.spinner');
                a.innerHTML = result.sportclassLabel.value;
                p.classList.add('sport');
                p.appendChild(a);
                pdiv.appendChild(p);
                elSportList.appendChild(pdiv);
                spinner.classList.add('gone');

                pdiv.addEventListener('click', function () {
                    var wikidataUri = result.sportclass.value;
                    query.callSporter(wikidataUri);
                });
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = results.bindings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var result = _step.value;

                    _loop(result);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            _search2.default.sport();
        });
    },
    callSporter: function callSporter(wikidataUri) {
        var elSporters = document.querySelector('#sporters'),
            back = document.querySelector('.back'),
            sportListdiv = document.querySelector('.sportlist');
        elSporters.classList.add('sporterListShow');
        sportListdiv.classList.add('sportListGone');
        back.addEventListener('click', function () {
            sportListdiv.classList.remove('sportListGone');
            elSporters.classList.remove('sporterListShow');
            var sporters = document.querySelector('.sporterList');
            console.log(sporters);
            setTimeout(function () {
                sporters.innerHTML = "";
            }, 1000);
        });

        var endpointUrl = 'https://query.wikidata.org/sparql';
        wikidataUri = wikidataUri.replace('http://www.wikidata.org/entity/', '');
        var sparqlQuery = 'SELECT ?personLabel ?person WHERE {\n            ?person wdt:P19 wd:Q727 .\n            ?person wdt:P106 wd:' + wikidataUri + ' .\n            SERVICE wikibase:label { bd:serviceParam wikibase:language "nl". }\n            }\n        ORDER BY ?personLabel',
            fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery),
            headers = { 'Accept': 'application/sparql-results+json' };

        fetch(fullUrl, { headers: headers }).then(function (body) {
            return body.json();
        }).then(function (json) {
            var vars = json.head.vars,
                results = json.results;

            var _loop2 = function _loop2(result) {

                var p = document.createElement('p'),
                    elSporterList = document.querySelector('.sporterList'),
                    a = document.createElement('a'),
                    pdiv = document.createElement('div');
                a.innerHTML = result.personLabel.value;
                p.classList.add('sporter');
                p.appendChild(a);
                pdiv.appendChild(p);
                elSporterList.appendChild(pdiv);

                pdiv.addEventListener('click', function () {
                    var wikidataUri = result.person.value;
                    console.log(wikidataUri);
                    query.callPerson(wikidataUri);
                });
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {

                for (var _iterator2 = results.bindings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var result = _step2.value;

                    _loop2(result);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            _search2.default.sporter();
        });
    },

    callPerson: function callPerson() {}
};

exports.default = query;
},{"./search.js":7}],3:[function(require,module,exports) {
'use strict';

var _queryCall = require('./queryCall.js');

var _queryCall2 = _interopRequireDefault(_queryCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'strict mode';

    var app = {
        init: function init() {
            _queryCall2.default.callSport();
        }
    };
    app.init();
})();
},{"./queryCall.js":5}],25:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50631' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
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
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
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
        parents.push(+k);
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
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[25,3])
//# sourceMappingURL=/dist/a306143244d0fdff79dcb6fbabda638b.map