"use strict";

exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _ExecutionEnvironment = _interopRequireDefault(require("fbjs/lib/ExecutionEnvironment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var canUseDOM = _ExecutionEnvironment.default.canUseDOM;
var dimensions = {
  window: {
    fontScale: 1,
    height: 0,
    scale: 1,
    width: 0
  },
  screen: {
    fontScale: 1,
    height: 0,
    scale: 1,
    width: 0
  }
};
var listeners = {};

var Dimensions = /*#__PURE__*/function () {
  function Dimensions() {}

  Dimensions.get = function get(dimension) {
    (0, _invariant.default)(dimensions[dimension], "No dimension set for key " + dimension);
    return dimensions[dimension];
  };

  Dimensions.set = function set(initialDimensions) {
    if (initialDimensions) {
      if (canUseDOM) {
        (0, _invariant.default)(false, 'Dimensions cannot be set in the browser');
      } else {
        if (initialDimensions.screen != null) {
          dimensions.screen = initialDimensions.screen;
        }

        if (initialDimensions.window != null) {
          dimensions.window = initialDimensions.window;
        }
      }
    }
  };

  Dimensions._update = function _update() {
    if (!canUseDOM) {
      return;
    }

    var win = window;
    var docEl = win.document.documentElement;
    dimensions.window = {
      fontScale: 1,
      height: docEl.clientHeight,
      scale: win.devicePixelRatio || 1,
      width: docEl.clientWidth
    };
    dimensions.screen = {
      fontScale: 1,
      height: win.screen.height,
      scale: win.devicePixelRatio || 1,
      width: win.screen.width
    };

    if (Array.isArray(listeners['change'])) {
      listeners['change'].forEach(function (handler) {
        return handler(dimensions);
      });
    }
  };

  Dimensions.addEventListener = function addEventListener(type, handler) {
    var _this = this;

    listeners[type] = listeners[type] || [];
    listeners[type].push(handler);
    return {
      remove: function remove() {
        _this.removeEventListener(type, handler);
      }
    };
  };

  Dimensions.removeEventListener = function removeEventListener(type, handler) {
    if (Array.isArray(listeners[type])) {
      listeners[type] = listeners[type].filter(function (_handler) {
        return _handler !== handler;
      });
    }
  };

  return Dimensions;
}();

exports.default = Dimensions;

if (canUseDOM) {
  Dimensions._update();

  window.addEventListener('resize', Dimensions._update, false);
}

module.exports = exports.default;