"use strict";

exports.__esModule = true;
exports.default = exports.preprocess = exports.createTextShadowValue = exports.createBoxShadowValue = void 0;

var _normalizeColor = _interopRequireDefault(require("./compiler/normalizeColor"));

var _normalizeValueWithProperty = _interopRequireDefault(require("./compiler/normalizeValueWithProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var emptyObject = {};
/**
 * Shadows
 */

var defaultOffset = {
  height: 0,
  width: 0
};

var createBoxShadowValue = function createBoxShadowValue(style) {
  var shadowColor = style.shadowColor,
      shadowOffset = style.shadowOffset,
      shadowOpacity = style.shadowOpacity,
      shadowRadius = style.shadowRadius;

  var _ref = shadowOffset || defaultOffset,
      height = _ref.height,
      width = _ref.width;

  var offsetX = (0, _normalizeValueWithProperty.default)(width);
  var offsetY = (0, _normalizeValueWithProperty.default)(height);
  var blurRadius = (0, _normalizeValueWithProperty.default)(shadowRadius || 0);
  var color = (0, _normalizeColor.default)(shadowColor || 'black', shadowOpacity);

  if (color != null && offsetX != null && offsetY != null && blurRadius != null) {
    return offsetX + " " + offsetY + " " + blurRadius + " " + color;
  }
};

exports.createBoxShadowValue = createBoxShadowValue;

var createTextShadowValue = function createTextShadowValue(style) {
  var textShadowColor = style.textShadowColor,
      textShadowOffset = style.textShadowOffset,
      textShadowRadius = style.textShadowRadius;

  var _ref2 = textShadowOffset || defaultOffset,
      height = _ref2.height,
      width = _ref2.width;

  var radius = textShadowRadius || 0;
  var offsetX = (0, _normalizeValueWithProperty.default)(width);
  var offsetY = (0, _normalizeValueWithProperty.default)(height);
  var blurRadius = (0, _normalizeValueWithProperty.default)(radius);
  var color = (0, _normalizeValueWithProperty.default)(textShadowColor, 'textShadowColor');

  if (color && (height !== 0 || width !== 0 || radius !== 0) && offsetX != null && offsetY != null && blurRadius != null) {
    return offsetX + " " + offsetY + " " + blurRadius + " " + color;
  }
};
/**
 * Preprocess styles
 */


exports.createTextShadowValue = createTextShadowValue;

var preprocess = function preprocess(originalStyle) {
  var style = originalStyle || emptyObject;
  var nextStyle = {};

  for (var originalProp in style) {
    var originalValue = style[originalProp];
    var prop = originalProp;
    var value = originalValue;

    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
      continue;
    } // Convert shadow styles


    if (prop === 'shadowColor' || prop === 'shadowOffset' || prop === 'shadowOpacity' || prop === 'shadowRadius') {
      var boxShadowValue = createBoxShadowValue(style);

      if (boxShadowValue != null && nextStyle.boxShadow == null) {
        var boxShadow = style.boxShadow;
        prop = 'boxShadow';
        value = boxShadow ? boxShadow + ", " + boxShadowValue : boxShadowValue;
      } else {
        continue;
      }
    } // Convert text shadow styles


    if (prop === 'textShadowColor' || prop === 'textShadowOffset' || prop === 'textShadowRadius') {
      var textShadowValue = createTextShadowValue(style);

      if (textShadowValue != null && nextStyle.textShadow == null) {
        var textShadow = style.textShadow;
        prop = 'textShadow';
        value = textShadow ? textShadow + ", " + textShadowValue : textShadowValue;
      } else {
        continue;
      }
    }

    nextStyle[prop] = value;
  } // $FlowIgnore


  return nextStyle;
};

exports.preprocess = preprocess;
var _default = preprocess;
exports.default = _default;