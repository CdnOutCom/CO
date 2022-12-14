/*
Copyright (c) 2017 NAVER Corp.
@egjs/persist project is licensed under the MIT license

@egjs/persist JavaScript library


@version 2.7.0-beta.0
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.eg = global.eg || {}, global.eg.Persist = factory());
}(this, (function () { 'use strict';

	var win = typeof window !== "undefined" && window || {};
	var console = win.console;
	var document$1 = win.document;
	var history = win.history;
	var location = win.location;
	var navigator = win.navigator;
	var parseFloat = win.parseFloat;
	var performance = win.performance;
	var localStorage = null;
	var sessionStorage = null;

	try {
	  localStorage = win.localStorage;
	  sessionStorage = win.sessionStorage;
	} catch (e) {}

	var CONST_PERSIST = "___persist___";
	var CONST_HASH = "___hash___";
	var CONST_DEPTHS = "depths";
	var CONST_HASH_DEPTHS_PERSIST = "" + CONST_HASH + CONST_DEPTHS + CONST_PERSIST;
	var CONST_PERSIST_STATE = "state" + CONST_PERSIST;
	var CONST_LAST_URL = "lastUrl";
	var navigation = performance && performance.navigation;
	var TYPE_NAVIGATE = navigation && navigation.TYPE_NAVIGATE || 0;
	var TYPE_RELOAD = navigation && navigation.TYPE_RELOAD || 1;
	var TYPE_BACK_FORWARD = navigation && navigation.TYPE_BACK_FORWARD || 2;
	var userAgent = navigator ? navigator.userAgent : "";
	var IS_PERSIST_NEEDED = function () {
	  var isIOS = new RegExp("iPhone|iPad", "i").test(userAgent);
	  var isMacSafari = new RegExp("Mac", "i").test(userAgent) && !new RegExp("Chrome", "i").test(userAgent) && new RegExp("Apple", "i").test(userAgent);
	  var isAndroid = new RegExp("Android ", "i").test(userAgent);
	  var isWebview = new RegExp("wv; |inapp;", "i").test(userAgent);
	  var androidVersion = isAndroid ? parseFloat(new RegExp("(Android)\\s([\\d_\\.]+|\\d_0)", "i").exec(userAgent)[2]) : undefined;
	  return !(isIOS || isMacSafari || isAndroid && (androidVersion <= 4.3 && isWebview || androidVersion < 3));
	}();

	var isSupportState = history && "replaceState" in history && "state" in history;
	var storageType = "None";

	function isStorageAvailable(storage) {
	  if (!storage) {
	    return undefined;
	  }

	  var TMP_KEY = "__tmp__" + CONST_PERSIST;

	  try {
	    // In case of iOS safari private mode, calling setItem on storage throws error
	    storage.setItem(TMP_KEY, CONST_PERSIST); // In Chrome incognito mode, can not get saved value
	    // In IE8, calling storage.getItem occasionally makes "Permission denied" error

	    return storage.getItem(TMP_KEY) === CONST_PERSIST;
	  } catch (e) {
	    return false;
	  }
	}

	var storage = function () {
	  var strg;

	  if (isStorageAvailable(sessionStorage)) {
	    strg = sessionStorage;
	    storageType = "SessionStorage";
	  } else if (isStorageAvailable(localStorage)) {
	    strg = localStorage;
	    storageType = "LocalStorage";
	  } else if (history && history.state) {
	    storageType = "History";
	  }

	  return strg;
	}();

	function warnInvalidStorageValue() {
	  /* eslint-disable no-console */
	  console.warn("window.history or session/localStorage has no valid " + "format data to be handled in persist.");
	  /* eslint-enable no-console */
	}
	/*
	 * Get state value
	 */


	function getState(key) {
	  var state;
	  var stateStr;

	  if (storage) {
	    stateStr = storage.getItem(key);
	  } else if (history.state) {
	    if (typeof history.state === "object" && history.state !== null) {
	      stateStr = history.state[key];
	    } else {
	      warnInvalidStorageValue();
	    }
	  } else {
	    stateStr = history.state;
	  } // the storage is clean


	  if (stateStr === null) {
	    return {};
	  } // "null" is not a valid


	  var isValidStateStr = typeof stateStr === "string" && stateStr.length > 0 && stateStr !== "null";

	  try {
	    state = JSON.parse(stateStr); // like '[ ... ]', '1', '1.234', '"123"' is also not valid

	    var isValidType = !(typeof state !== "object" || state instanceof Array);

	    if (!isValidStateStr || !isValidType) {
	      throw new Error();
	    }
	  } catch (e) {
	    warnInvalidStorageValue();
	    state = {};
	  } // Note2 (Android 4.3) return value is null


	  return state;
	}
	/*
	 * Set state value
	 */

	function setState(key, state) {
	  if (storage) {
	    if (state) {
	      storage.setItem(key, JSON.stringify(state));
	    } else {
	      storage.removeItem(key);
	    }
	  } else {
	    try {
	      var historyState = !history || history.state == null ? {} : history.state;

	      if (history && typeof historyState === "object") {
	        historyState[key] = JSON.stringify(state);
	        history.replaceState(historyState, document.title, location.href);
	      } else {
	        /* eslint-disable no-console */
	        console.warn("To use a history object, it must be an object that is not a primitive type.");
	        /* eslint-enable no-console */
	      }
	    } catch (e) {
	      /* eslint-disable no-console */
	      console.warn(e.message);
	      /* eslint-enable no-console */
	    }
	  }

	  state ? win[CONST_PERSIST] = true : delete win[CONST_PERSIST];
	}
	function getStorage() {
	  return storage;
	}
	function getStorageType() {
	  return storageType;
	}
	function getStateByKey(key, valueKey) {
	  if (!isSupportState && !storage) {
	    return undefined;
	  }

	  var result = getState(key)[valueKey]; // some device returns "null" or undefined

	  if (result === "null" || typeof result === "undefined") {
	    result = null;
	  }

	  return result;
	}
	function setStateByKey(key, valueKey, data) {
	  if (!isSupportState && !storage) {
	    return;
	  }

	  var beforeData = getState(key);
	  beforeData[valueKey] = data;
	  setState(key, beforeData);
	}
	/*
	 * flush current history state
	 */

	function reset(key) {
	  setState(key, null);
	}
	function getPersistState(key) {
	  return getStateByKey(CONST_PERSIST_STATE, key);
	}
	function getDepths() {
	  return getPersistState(CONST_DEPTHS) || [];
	}

	var userAgent$1 = navigator ? navigator.userAgent : "";
	var isNeeded = function () {
	  var isIOS = new RegExp("iPhone|iPad", "i").test(userAgent$1);
	  var isMacSafari = new RegExp("Mac", "i").test(userAgent$1) && !new RegExp("Chrome", "i").test(userAgent$1) && new RegExp("Apple", "i").test(userAgent$1);
	  var isAndroid = new RegExp("Android ", "i").test(userAgent$1);
	  var isWebview = new RegExp("wv; |inapp;", "i").test(userAgent$1);
	  var androidVersion = isAndroid ? parseFloat(new RegExp("(Android)\\s([\\d_\\.]+|\\d_0)", "i").exec(userAgent$1)[2]) : undefined;
	  return !(isIOS || isMacSafari || isAndroid && (androidVersion <= 4.3 && isWebview || androidVersion < 3));
	}(); // In case of IE8, TYPE_BACK_FORWARD is undefined.

	function getNavigationType() {
	  return performance && performance.navigation && performance.navigation.type;
	}
	function getHashUrl() {
	  return location ? location.href : "";
	}
	function getUrl() {
	  return getHashUrl().split("#")[0];
	}
	function getStorageKey(name) {
	  return name + CONST_PERSIST;
	}
	function getUrlKey() {
	  return getStorageKey(getUrl());
	}
	function execRec(obj, path, func) {
	  var _obj = obj;

	  if (!_obj) {
	    var firstElement = path[0];
	    _obj = isNaN(firstElement) || firstElement === "" ? {} : [];
	  }

	  var head = path.shift();

	  if (path.length === 0) {
	    if (_obj instanceof Array && isNaN(head)) {
	      console.warn("Don't use key string on array");
	    }

	    func(_obj, head);
	    return _obj;
	  }

	  _obj[head] = execRec(_obj[head], path, func);
	  return _obj;
	}

	var PersistHistory = {
	  url: "",
	  hashUrl: "",
	  hash: null,
	  length: 0,
	  useHash: false
	};

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    _construct = Reflect.construct;
	  } else {
	    _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) _setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !_isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return _setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
	  // eslint-disable-next-line no-proto
	  obj.__proto__ = proto;
	  return obj;
	};
	/**
	 * Special type of known error that {@link Persist} throws.
	 * @ko Persist ???????????? ????????? ?????? ????????? throw?????? ??????
	 * @property {string} key Error key <ko>????????? ?????? ???</ko>
	 * @property {string} message Error message <ko>?????? ?????????</ko>
	 * @property {"SessionStorage" | "LocalStorage" | "History" | "None"} storageType The storage type in which the error occurred <ko>????????? ????????? ???????????? ??????</ko>
	 * @property {number} size The size of the value in which the error occurred <ko>????????? ????????? ?????? ?????????</ko>
	 * @property {Object} values Values of high size in storage. (maxLengh: 3) <ko>??????????????? ?????? ???????????? ??????. (?????? 3???)</ko>
	 * @example
	 * ```ts
	 * import Persist, { PersistQuotaExceededError } from "@egjs/persist";
	 * try {
	 *   const persist = new Persist("key");
	 * } catch (e) {
	 *   if (e instanceof PersistQuotaExceededError) {
	 *     console.error("size", e.size);
	 *   }
	 * }
	 * ```
	 */


	var PersistQuotaExceededError =
	/*#__PURE__*/
	function (_Error) {
	  _inheritsLoose(PersistQuotaExceededError, _Error);

	  /**
	   * @param key Error message<ko>?????? ?????????</ko>
	   * @param value Error value<ko>?????? ???</ko>
	   */
	  function PersistQuotaExceededError(key, value) {
	    var _this;

	    var size = value.length;
	    var storageType = getStorageType();
	    var storage = getStorage();
	    var valuesText = "";
	    var values = [];

	    if (storage) {
	      var length = storage.length;

	      for (var i = 0; i < length; ++i) {
	        var itemKey = storage.key(i);
	        var item = storage.getItem(itemKey) || "";
	        values.push({
	          key: itemKey,
	          size: item.length
	        });
	      }

	      values = values.sort(function (a, b) {
	        return b.size - a.size;
	      }).slice(0, 3);

	      if (values.length) {
	        valuesText = " The highest values of " + storageType + " are " + values.map(function (item) {
	          var _JSON$stringify;

	          return JSON.stringify((_JSON$stringify = {}, _JSON$stringify[item.key] = item.size, _JSON$stringify));
	        }).join(", ") + ".";
	      }
	    }

	    _this = _Error.call(this, "Setting the value (size: " + size + ") of '" + key + "' exceeded the " + storageType + "'s quota." + valuesText) || this;
	    setPrototypeOf(_assertThisInitialized(_assertThisInitialized(_this)), PersistQuotaExceededError.prototype);
	    _this.name = "PersistQuotaExceededError";
	    _this.storageType = storageType;
	    _this.key = key;
	    _this.size = size;
	    _this.values = values;
	    return _this;
	  }

	  return PersistQuotaExceededError;
	}(_wrapNativeSuper(Error));

	/* eslint-disable no-use-before-define */

	function setHashDepths(depths, key) {
	  if (key === void 0) {
	    key = getUrlKey();
	  }

	  return setStateByKey(key, CONST_HASH_DEPTHS_PERSIST, depths);
	}
	/*
	 * flush current history state for hash
	 */


	function resetHash(key, hash) {
	  var originalState = getState(key);
	  var hashDepths = originalState[CONST_HASH_DEPTHS_PERSIST];

	  if (hashDepths && hashDepths.length) {
	    if (typeof hash === "undefined") {
	      var nextState = {};

	      for (var name in originalState) {
	        if (name.indexOf(CONST_HASH) === 0) {
	          nextState[name] = originalState[name];
	        }
	      }

	      setState(key, nextState);
	    } else {
	      delete originalState["" + CONST_HASH + hash];
	      setState(key, originalState);
	    }
	  } else {
	    setState(key, null);
	  }
	}

	function replaceHashDepth() {
	  var prevHash = PersistHistory.hash;
	  var prevUrl = PersistHistory.url;
	  var prevUrlKey = getStorageKey(prevUrl);
	  var prevHashUrl = PersistHistory.hashUrl;
	  var hashUrl = getHashUrl();
	  var urlKey = getUrlKey();
	  var hash = location.hash;
	  var hashLength = history.length;

	  if (hashUrl === prevHashUrl) {
	    return;
	  }

	  PersistHistory.hash = hash;
	  PersistHistory.hashUrl = hashUrl;
	  PersistHistory.length = hashLength; // remove hash info

	  resetHash(getStorageKey(prevUrl), prevHash); // remove prev hash

	  var prevDepths = getHashDepths(prevUrlKey);
	  var prevHashIndex = prevDepths.indexOf(prevHash);

	  if (prevHashIndex > -1) {
	    prevDepths.splice(prevHashIndex, 1);
	  }

	  var isSameKey = urlKey === prevUrlKey;
	  var depths = isSameKey ? prevDepths : getHashDepths();
	  var hashIndex = depths.indexOf(hash); // remove next hash info

	  if (hashIndex > -1) {
	    resetHash(urlKey, hash);
	    depths.splice(hashIndex, 1);
	  }

	  if (isSameKey) {
	    var addedIndex = hashIndex === -1 || hashIndex > prevHashIndex ? prevHashIndex : prevHashIndex - 1;
	    depths.splice(addedIndex, 0, hash);
	  } else {
	    depths.splice(0, 0, hash);
	    setHashDepths(prevDepths, prevUrlKey);
	  } // add next hash


	  setHashDepths(depths, urlKey);
	}

	function updateHashDepth(type) {
	  if (type === void 0) {
	    type = 0;
	  }

	  var prevLength = PersistHistory.length;
	  var prevHash = PersistHistory.hash;
	  var prevUrl = PersistHistory.url;
	  var prevHashUrl = PersistHistory.hashUrl;
	  var url = getUrl();
	  var hashUrl = getHashUrl();
	  var urlKey = getUrlKey();
	  var hash = location.hash;
	  var hashLength = history.length;
	  var hashType = type;

	  if (hashUrl === prevHashUrl) {
	    return;
	  }

	  var historyState = history.state;

	  if (historyState == null) {
	    var _history$replaceState;

	    hashType = TYPE_NAVIGATE; // warning

	    history.replaceState((_history$replaceState = {}, _history$replaceState[CONST_PERSIST_STATE] = true, _history$replaceState), document$1.title, location.href);
	  } else if (type === TYPE_BACK_FORWARD && hashLength !== prevLength) {
	    hashType = TYPE_NAVIGATE;
	  }

	  PersistHistory.hash = hash;
	  PersistHistory.hashUrl = hashUrl;
	  PersistHistory.length = hashLength;
	  var depths = getHashDepths();

	  if (hashType === TYPE_BACK_FORWARD) {
	    return;
	  } // remove url key
	  // remove hash key for first refresh or first navigate


	  resetHash(urlKey, hash); // Remove all url lists with higher index than current index

	  if (hashType === TYPE_NAVIGATE) {
	    var prevLastIndex = prevUrl === url ? depths.indexOf(prevHash) : 0;

	    if (prevLastIndex > -1 && prevHash != null) {
	      var removedList = depths.splice(prevLastIndex + 1, depths.length);
	      removedList.forEach(function (removedHash) {
	        resetHash(urlKey, removedHash);
	      });
	    } // If the type is NAVIGATE and there is information about current hash, delete it.


	    var currentIndex = depths.indexOf(hash);
	    ~currentIndex && depths.splice(currentIndex, 1);
	  } // Add depth for new address.


	  if (depths.indexOf(hash) < 0) {
	    depths.push(hash);
	  }

	  setHashDepths(depths);
	}

	function getHashDepths(key) {
	  if (key === void 0) {
	    key = getUrlKey();
	  }

	  return getStateByKey(key, CONST_HASH_DEPTHS_PERSIST) || [];
	}
	function isQuotaExceededError(e) {
	  return e.name === "QuotaExceededError" || e.name === "PersistQuotaExceededError";
	}
	function catchQuotaExceededError(e, key, value) {
	  if (clearFirst()) {
	    return true;
	  } else if (isQuotaExceededError(e)) {
	    throw new PersistQuotaExceededError(key, value ? JSON.stringify(value) : "");
	  } else {
	    throw e;
	  }
	}
	function trySetPersistState(key, value) {
	  try {
	    setStateByKey(CONST_PERSIST_STATE, key, value);
	  } catch (e) {
	    if (catchQuotaExceededError(e, CONST_PERSIST_STATE, value)) {
	      if (key === CONST_LAST_URL) {
	        trySetPersistState(key, value);
	      } else if (key === CONST_DEPTHS) {
	        trySetPersistState(key, value && value.slice(1));
	      }
	    }
	  }
	}
	function clearFirst() {
	  var depths = getDepths();
	  var removed = depths.splice(0, 1);

	  if (!removed.length) {
	    // There is an error because there is no depth to add data.
	    return false;
	  }

	  var removedUrl = removed[0];
	  reset(getStorageKey(removedUrl));

	  if (PersistHistory.url === removedUrl) {
	    PersistHistory.url = "";
	    trySetPersistState(CONST_LAST_URL, "");

	    if (!depths.length) {
	      // I tried to add myself, but it didn't add up, so I got an error.
	      return false;
	    }
	  }

	  trySetPersistState(CONST_DEPTHS, depths); // Clear the previous record and try to add data again.

	  return true;
	}
	function replaceDepth() {
	  var url = getUrl();

	  if (PersistHistory.useHash) {
	    replaceHashDepth();
	  }

	  if (PersistHistory.url === url) {
	    return;
	  }

	  var prevUrl = PersistHistory.url;

	  try {
	    PersistHistory.url = url;
	    var depths = getDepths(); // remove prev url

	    var prevIndex = depths.indexOf(prevUrl);

	    if (prevIndex >= 0) {
	      depths.splice(prevIndex, 1);
	      resetHash(getStorageKey(prevUrl));
	    } // remove next url info


	    var currentIndex = depths.indexOf(url);

	    if (currentIndex >= 0) {
	      depths.splice(currentIndex, 1);
	      resetHash(getStorageKey(url));
	    }

	    if (prevIndex >= 0) {
	      var addedIndex = currentIndex === -1 || currentIndex > prevIndex ? prevIndex : prevIndex - 1;
	      depths.splice(addedIndex, 0, url);
	    } else {
	      depths.push(url);
	    }

	    trySetPersistState(CONST_DEPTHS, depths);
	    trySetPersistState(CONST_LAST_URL, url);
	  } catch (e) {
	    // revert PersistHistory.url
	    PersistHistory.url = prevUrl;
	    throw e;
	  }
	}
	function updateDepth(type) {
	  if (type === void 0) {
	    type = 0;
	  }

	  var url = getUrl();

	  if (PersistHistory.useHash) {
	    updateHashDepth(type);
	  }

	  if (PersistHistory.url === url) {
	    return;
	  } // url is not the same for the first time, pushState, or replaceState.


	  var prevUrl = PersistHistory.url;

	  try {
	    PersistHistory.url = url;
	    var depths = getDepths();

	    if (type === TYPE_BACK_FORWARD) {
	      // Change current url only
	      var currentIndex = depths.indexOf(url);
	      ~currentIndex && trySetPersistState(CONST_LAST_URL, url);
	    } else {
	      var prevLastUrl = getPersistState(CONST_LAST_URL); // remove url key
	      // remove hash key for first refresh or first navigate

	      resetHash(getStorageKey(url));

	      if (type === TYPE_NAVIGATE && url !== prevLastUrl) {
	        // Remove all url lists with higher index than current index
	        var prevLastIndex = depths.indexOf(prevLastUrl);

	        if (prevLastIndex >= -1) {
	          var removedList = depths.splice(prevLastIndex + 1, depths.length);
	          removedList.forEach(function (removedUrl) {
	            reset(getStorageKey(removedUrl));
	          });
	        } // If the type is NAVIGATE and there is information about current url, delete it.


	        var _currentIndex = depths.indexOf(url);

	        ~_currentIndex && depths.splice(_currentIndex, 1);
	      } // Add depth for new address.


	      if (depths.indexOf(url) < 0) {
	        depths.push(url);
	      }

	      trySetPersistState(CONST_DEPTHS, depths);
	      trySetPersistState(CONST_LAST_URL, url);
	    }
	  } catch (e) {
	    // revert PersistHistory.url
	    PersistHistory.url = prevUrl;
	    throw e;
	  }
	}
	function clear() {
	  var depths = getDepths();
	  depths.forEach(function (url) {
	    reset(getStorageKey(url));
	  });
	  reset(CONST_PERSIST_STATE);
	  PersistHistory.url = "";
	  PersistHistory.hashUrl = "";
	  PersistHistory.hash = null;
	}
	function registerHashPersist() {
	  if (PersistHistory.useHash) {
	    return;
	  }

	  PersistHistory.useHash = true;
	  updateHashDepth(getNavigationType());
	}
	function releaseEvent() {
	  win.removeEventListener("popstate", onPopState);
	}

	function onPopState() {
	  // popstate event occurs when backward or forward
	  try {
	    updateDepth(TYPE_BACK_FORWARD);
	  } catch (e) {
	    // Global function calls prevent errors.
	    if (!isQuotaExceededError(e)) {
	      throw e;
	    }
	  }
	} // execute global


	if ("onpopstate" in win) {
	  win.addEventListener("popstate", onPopState);
	} // If navigation's type is not TYPE_BACK_FORWARD, delete information about current url.


	try {
	  updateDepth(getNavigationType());
	} catch (e) {
	  // Global function calls prevent errors.
	  if (!isQuotaExceededError(e)) {
	    throw e;
	  }
	}

	/* eslint-disable class-methods-use-this */
	/**
	 * Get or store the current state of the web page using JSON.
	 * @ko ??? ???????????? ?????? ????????? JSON ???????????? ??????????????? ?????????.
	 * @alias eg.Persist
	 *
	 * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 */

	var Persist =
	/*#__PURE__*/
	function () {
	  var Persist =
	  /*#__PURE__*/
	  function () {
	    /**
	     * @static
	     * Clear all information in Persist
	     */
	    Persist.clear = function clear$$1() {
	      clear();
	    };
	    /**
	     * @static
	     * Return whether you need "Persist" module by checking the bfCache support of the current browser
	     * @return {Boolean}
	     */


	    Persist.isNeeded = function isNeeded$$1() {
	      return isNeeded;
	    };
	    /**
	    * Constructor
	    * @param {String} key The key of the state information to be stored <ko>????????? ?????? ????????? ???</ko>
	    **/


	    function Persist(key) {
	      this.key = key || "";
	    }
	    /**
	     * Read value
	     * @param {String?} path target path
	     * @return {String|Number|Boolean|Object|Array}
	     */


	    var _proto = Persist.prototype;

	    _proto.get = function get(path) {
	      return this._get(this.key, path);
	    };
	    /**
	     * Save value
	     * @param {String} path target path
	     * @param {String|Number|Boolean|Object|Array} value value to save
	     * @return {Persist}
	     */


	    _proto.set = function set(path, value) {
	      return this._set(this.key, path, value);
	    };
	    /**
	     * Remove value
	     * @param {String} path target path
	     * @return {Persist}
	     */


	    _proto.remove = function remove(path) {
	      return this._remove(this.key, path);
	    };

	    _proto._get = function _get(key, path) {
	      // update url for pushState, replaceState
	      updateDepth(TYPE_NAVIGATE);
	      var urlKey = getUrlKey();
	      var globalState = getStateByKey(urlKey, key);

	      if (!path || path.length === 0) {
	        return globalState;
	      }

	      var pathToken = path.split(".");
	      var currentItem = globalState;
	      var isTargetExist = true;

	      for (var i = 0; i < pathToken.length; i++) {
	        if (!currentItem) {
	          isTargetExist = false;
	          break;
	        }

	        currentItem = currentItem[pathToken[i]];
	      }

	      if (!isTargetExist || currentItem == null) {
	        return null;
	      }

	      return currentItem;
	    };

	    _proto._set = function _set(key, path, value) {
	      // update url for pushState, replaceState
	      updateDepth(TYPE_NAVIGATE);
	      var urlKey = getUrlKey();
	      var globalState = getStateByKey(urlKey, key);

	      try {
	        if (path.length === 0) {
	          setStateByKey(urlKey, key, value);
	        } else {
	          var allValue = execRec(globalState, path.split("."), function (obj, head) {
	            obj[head] = value;
	          });
	          setStateByKey(urlKey, key, allValue);
	        }
	      } catch (e) {
	        if (catchQuotaExceededError(e, urlKey, value)) {
	          this._set(key, path, value);
	        }
	      }

	      return this;
	    };

	    _proto._remove = function _remove(key, path) {
	      // update url for pushState, replaceState
	      updateDepth(TYPE_NAVIGATE); // find path

	      var urlKey = getUrlKey();
	      var globalState = getStateByKey(urlKey, key);

	      try {
	        if (path.length === 0) {
	          setStateByKey(urlKey, key, null);
	        } else {
	          var value = execRec(globalState, path.split("."), function (obj, head) {
	            if (typeof obj === "object") {
	              delete obj[head];
	            }
	          });
	          setStateByKey(urlKey, key, value);
	        }
	      } catch (e) {
	        if (catchQuotaExceededError(e)) {
	          this._remove(key, path);
	        }
	      }

	      return this;
	    };

	    return Persist;
	  }();

	  Persist.VERSION = "2.7.0-beta.0";
	  Persist.StorageManager = {
	    reset: reset,
	    setStateByKey: setStateByKey,
	    getStateByKey: getStateByKey,
	    getStorage: getStorage
	  };
	  return Persist;
	}();

	/**
	 * Get or store the current state of the web page using JSON according to hash.
	 * @ko ??? ???????????? ?????? ????????? hash??? ?????? JSON ???????????? ??????????????? ?????????.
	 * @memberof eg.Persist
	 * @alias eg.Persist.HashPersist
	 * @extends eg.Persist
	 *
	 * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 */

	var HashPersist =
	/*#__PURE__*/
	function (_Persist) {
	  _inheritsLoose(HashPersist, _Persist);

	  function HashPersist() {
	    return _Persist.apply(this, arguments) || this;
	  }

	  var _proto = HashPersist.prototype;

	  /**
	   * Read value
	   * @param {String?} path target path
	   * @return {String|Number|Boolean|Object|Array}
	   */
	  _proto.get = function get(path) {
	    return this._get(this._getKey(), this._getPath(path));
	  };
	  /**
	   * Save value
	   * @param {String} path target path
	   * @param {String|Number|Boolean|Object|Array} value value to save
	   * @return {Persist}
	   */


	  _proto.set = function set(path, value) {
	    return this._set(this._getKey(), this._getPath(path), value);
	  };
	  /**
	   * Remove value
	   * @param {String} path target path
	   * @return {Persist}
	   */


	  _proto.remove = function remove(path) {
	    return this._remove(this._getKey(), this._getPath(path));
	  };

	  _proto._getKey = function _getKey() {
	    return "" + CONST_HASH + location.hash;
	  };

	  _proto._getPath = function _getPath(path) {
	    var nextPath = path;

	    if (Array.isArray(nextPath)) {
	      nextPath = [this.key].concat(nextPath);
	    } else {
	      nextPath = this.key + "." + nextPath;
	    }

	    return nextPath;
	  };

	  return HashPersist;
	}(Persist);



	var modules = ({
		HashPersist: HashPersist,
		PersistQuotaExceededError: PersistQuotaExceededError,
		default: Persist,
		updateDepth: updateDepth,
		replaceDepth: replaceDepth,
		registerHashPersist: registerHashPersist,
		releaseEvent: releaseEvent
	});

	for (var name in modules) {
	  Persist[name] = modules[name];
	}

	return Persist;

})));
//# sourceMappingURL=persist.js.map
