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

	var _smallDataStore = __webpack_require__(2);

	var _smallDataStore2 = _interopRequireDefault(_smallDataStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var similarFilmsStore = (0, _smallDataStore2.default)();
	var favouriteStore = similarFilmsStore.new();

	var voteDispatcher = (0, _dispatcher2.default)();

	function sendVote(data) {
	  console.log('test');
	  console.log(data);
	}

	voteDispatcher.register("vote", sendVote);

	[].concat(_toConsumableArray(document.querySelectorAll('.result'))).forEach(function (result) {
	  result.querySelector('.fav').addEventListener('click', function (fav) {
	    voteDispatcher.dispatch({
	      type: "vote",
	      data: {
	        value: true
	      }
	    });
	  });
	});

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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function smallDataStore(instantInitiator) {

	  var groupedStores = [];
	  var storeActions = function storeActions(object) {
	    var store = object;

	    return {
	      get: function get(key) {
	        return store[key];
	      },
	      set: function set(key, value) {
	        store[key] = value;
	        return store[key];
	      },
	      keys: function keys() {
	        return Object.keys(store);
	      },
	      update: function update(key, callback) {
	        callback(store[key]);
	        return store[key];
	      }
	    };
	  };
	  var newStore = function newStore() {
	    var initial = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var store = initial;
	    var actions = storeActions(store);
	    groupedStores.push(actions);
	    return actions;
	  };

	  if (instantInitiator) {
	    return newStore(instantInitiator);
	  }

	  return {
	    storeGroup: function storeGroup() {
	      return groupedStores;
	    },

	    new: newStore
	  };
	}

	exports.default = smallDataStore;

/***/ }
/******/ ]);