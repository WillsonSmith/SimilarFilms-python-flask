/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _dispatcher = __webpack_require__(1);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _movieStore = __webpack_require__(2);

	var _movieStore2 = _interopRequireDefault(_movieStore);

	var _build = __webpack_require__(4);

	var _build2 = _interopRequireDefault(_build);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var body = document.getElementsByTagName('body')[0];

	var voteDispatcher = (0, _dispatcher2.default)();

	localforage.getItem('favourited', function (data) {
	  _movieStore2.default.movies = data;
	  var movieStoreKeys = Object.keys(_movieStore2.default.movies);
	  movieStoreKeys.forEach(function (key) {
	    var movieItem = document.querySelector('[data-id=\'' + key + '\']');
	    if (_movieStore2.default.movies[key] && movieItem) {
	      movieItem.classList.add('movie-result__heart--is-active');
	    }
	  });

	  var buildTemplate = document.querySelector('[data-build-template]');
	  if (buildTemplate) {
	    (0, _build2.default)(buildTemplate, movieStoreKeys.map(function (key) {
	      return _movieStore2.default.movies[key];
	    }));
	  }
	});

	function updateVote(data) {
	  var isActive = data.node.classList.contains('movie-result__heart--is-active');
	  var movieExists = _movieStore2.default.movies[data.movie.id];
	  if (movieExists) {
	    _movieStore2.default.movies[data.movie.id] = null;
	  } else {
	    _movieStore2.default.movies[data.movie.id] = data.movie;
	  }

	  data.node.classList.toggle('movie-result__heart--is-active');
	  _movieStore2.default.trigger('update');
	}

	function handleVoteClick(event) {
	  var target = event.target;
	  if (target.classList.contains('movie-result__heart')) {
	    voteDispatcher.dispatch({
	      type: 'vote',
	      node: target,
	      movie: {
	        film: target.getAttribute('data-film'),
	        id: target.getAttribute('data-id'),
	        rating: target.getAttribute('data-rating'),
	        image: target.getAttribute('data-image')
	      }
	    });
	  }
	}

	voteDispatcher.register('vote', updateVote);
	body.addEventListener('click', handleVoteClick);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Dispatcher;
	function Dispatcher() {
	  var listeners = {};

	  return {
	    register: function register(type) {
	      var _listeners$type;

	      if (!listeners[type]) {
	        listeners[type] = [];
	      }

	      for (var _len = arguments.length, callbacks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        callbacks[_key - 1] = arguments[_key];
	      }

	      (_listeners$type = listeners[type]).push.apply(_listeners$type, callbacks);
	    },
	    remove: function remove(type, callback) {
	      listeners[type] = listeners[type].filter(function (listener) {
	        return listener !== callback;
	      });
	    },
	    dispatch: function dispatch(event) {
	      if (listeners[event.type]) {
	        listeners[event.type].forEach(function (listener) {
	          return listener(event);
	        });
	      }
	    }
	  };
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _eventEmitter = __webpack_require__(3);

	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var movieStore = {
	  movies: {}
	};

	function logDataResult(data) {
	  console.log(data);
	}

	var movieStoreEvents = (0, _eventEmitter2.default)();
	movieStoreEvents.mixin(movieStore);
	movieStore.bind('update', function () {
	  localforage.setItem('favourited', movieStore.movies, logDataResult);
	});
	exports.default = movieStore;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = EventEmitter;
	function EventEmitter() {
	  var events = {};
	  var EventsHandlers = {
	    bind: function bind(event, callback) {
	      if (!events[event]) {
	        events[event] = [];
	      }
	      events[event].push(callback);
	    },
	    unbind: function unbind(event, callback) {
	      events[event] = events[event].filter(function (event) {
	        return event !== callback;
	      });
	    },
	    trigger: function trigger(event) {
	      var _this = this;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      events[event].forEach(function (event) {
	        return event.apply.apply(event, [_this].concat(args));
	      });
	    }
	  };

	  return {
	    mixin: function mixin(toObject) {
	      var handlers = ['bind', 'unbind', 'trigger'];
	      if (typeof toObject === 'function') {
	        handlers.forEach(function (handler) {
	          return toObject.prototype[handler] = EventsHandlers[handler];
	        });
	      } else {
	        handlers.forEach(function (handler) {
	          return toObject[handler] = EventsHandlers[handler];
	        });
	      }
	      // When there is more support, the above can be replace with Object.assign
	      // Object.assign(toObject, EventsHandlers);
	    }
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = builder;
	var fragment = document.createDocumentFragment();

	function cloneNode(node) {
	  return node.cloneNode(true);
	}

	function fillAttributes(node, data) {
	  return function (key) {
	    var dataKey = 'data-' + key;
	    var nodeHasAttribute = node.hasAttribute(dataKey);
	    if (nodeHasAttribute) {
	      node.setAttribute(dataKey, data[key]);
	    }
	  };
	}

	function buildNewItem(node) {
	  return function (data) {
	    if (data) {
	      var tempNode = cloneNode(node);
	      var fillAttrsNode = tempNode.querySelector('[data-build-fill-attrs]');
	      var dataKeys = Object.keys(data);
	      dataKeys.forEach(fillData(tempNode, data));
	      if (fillAttrsNode) {
	        dataKeys.forEach(fillAttributes(fillAttrsNode, data));
	      }
	      fragment.appendChild(tempNode);
	    }
	  };
	}

	function fillData(node, data) {
	  return function (key) {
	    var buildKey = node.querySelector('[data-build-' + key + ']');
	    if (buildKey) {
	      if (buildKey.tagName === "IMG") {
	        buildKey.src = 'http://image.tmdb.org/t/p/w300' + data[key];
	      } else {
	        buildKey.textContent = data[key];
	      }
	    }
	  };
	}

	function builder(node, dataSource) {
	  var heldNode = cloneNode(node);
	  node.parentNode.removeChild(node);
	  dataSource.forEach(buildNewItem(heldNode));
	  document.getElementById('resultId').appendChild(fragment);
	}

/***/ }
/******/ ]);