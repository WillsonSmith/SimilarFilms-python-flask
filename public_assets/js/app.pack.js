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

	var _eventEmitter = __webpack_require__(2);

	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var body = document.getElementsByTagName('body')[0];

	var voteDispatcher = (0, _dispatcher2.default)();

	function logDataResult(data) {
	  console.log(data);
	}

	function addRemoveFavourite(_ref) {
	  var _ref$alreadyActive = _ref.alreadyActive;
	  var alreadyActive = _ref$alreadyActive === undefined ? false : _ref$alreadyActive;
	  var _ref$movie = _ref.movie;
	  var movie = _ref$movie === undefined ? {} : _ref$movie;

	  if (alreadyActive) {
	    localforage.removeItem('favourited', logDataResult);
	  } else {
	    localforage.setItem('favourited', movie, logDataResult);
	  }
	}

	function updateVote(data) {
	  var isActive = data.node.classList.contains('movie-result__heart--is-active');
	  console.log(isActive);
	  addRemoveFavourite({ alreadyActive: isActive, movie: data.movie });
	  data.node.classList.toggle('movie-result__heart--is-active');
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

/***/ }
/******/ ]);