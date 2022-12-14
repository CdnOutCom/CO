var _PROPERTIES_FLIP;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import createReactDOMStyle from './createReactDOMStyle';
import hash from './hash';
import hyphenateStyleName from './hyphenateStyleName';
import normalizeValueWithProperty from './normalizeValueWithProperty';
import prefixStyles from '../../../modules/prefixStyles';
var cache = new Map();
var emptyObject = {};
var classicGroup = 1;
var atomicGroup = 2.2;
var customGroup = {
  borderColor: 2,
  borderRadius: 2,
  borderStyle: 2,
  borderWidth: 2,
  display: 2,
  flex: 2,
  margin: 2,
  overflow: 2,
  overscrollBehavior: 2,
  padding: 2,
  marginHorizontal: 2.1,
  marginVertical: 2.1,
  paddingHorizontal: 2.1,
  paddingVertical: 2.1
};
var borderTopLeftRadius = 'borderTopLeftRadius';
var borderTopRightRadius = 'borderTopRightRadius';
var borderBottomLeftRadius = 'borderBottomLeftRadius';
var borderBottomRightRadius = 'borderBottomRightRadius';
var borderLeftColor = 'borderLeftColor';
var borderLeftStyle = 'borderLeftStyle';
var borderLeftWidth = 'borderLeftWidth';
var borderRightColor = 'borderRightColor';
var borderRightStyle = 'borderRightStyle';
var borderRightWidth = 'borderRightWidth';
var right = 'right';
var marginLeft = 'marginLeft';
var marginRight = 'marginRight';
var paddingLeft = 'paddingLeft';
var paddingRight = 'paddingRight';
var left = 'left'; // Map of LTR property names to their BiDi equivalent.

var PROPERTIES_FLIP = (_PROPERTIES_FLIP = {}, _PROPERTIES_FLIP[borderTopLeftRadius] = borderTopRightRadius, _PROPERTIES_FLIP[borderTopRightRadius] = borderTopLeftRadius, _PROPERTIES_FLIP[borderBottomLeftRadius] = borderBottomRightRadius, _PROPERTIES_FLIP[borderBottomRightRadius] = borderBottomLeftRadius, _PROPERTIES_FLIP[borderLeftColor] = borderRightColor, _PROPERTIES_FLIP[borderLeftStyle] = borderRightStyle, _PROPERTIES_FLIP[borderLeftWidth] = borderRightWidth, _PROPERTIES_FLIP[borderRightColor] = borderLeftColor, _PROPERTIES_FLIP[borderRightStyle] = borderLeftStyle, _PROPERTIES_FLIP[borderRightWidth] = borderLeftWidth, _PROPERTIES_FLIP[left] = right, _PROPERTIES_FLIP[marginLeft] = marginRight, _PROPERTIES_FLIP[marginRight] = marginLeft, _PROPERTIES_FLIP[paddingLeft] = paddingRight, _PROPERTIES_FLIP[paddingRight] = paddingLeft, _PROPERTIES_FLIP[right] = left, _PROPERTIES_FLIP); // Map of I18N property names to their LTR equivalent.

var PROPERTIES_I18N = {
  borderTopStartRadius: borderTopLeftRadius,
  borderTopEndRadius: borderTopRightRadius,
  borderBottomStartRadius: borderBottomLeftRadius,
  borderBottomEndRadius: borderBottomRightRadius,
  borderStartColor: borderLeftColor,
  borderStartStyle: borderLeftStyle,
  borderStartWidth: borderLeftWidth,
  borderEndColor: borderRightColor,
  borderEndStyle: borderRightStyle,
  borderEndWidth: borderRightWidth,
  end: right,
  marginStart: marginLeft,
  marginEnd: marginRight,
  paddingStart: paddingLeft,
  paddingEnd: paddingRight,
  start: left
};
var PROPERTIES_VALUE = ['clear', 'float', 'textAlign'];
export function atomic(style) {
  var compiledStyle = {
    $$css: true
  };
  var compiledRules = [];

  function atomicCompile(prop, value) {
    var valueString = stringifyValueWithProperty(value, prop);
    var cacheKey = prop + valueString;
    var cachedResult = cache.get(cacheKey);
    var identifier;

    if (cachedResult != null) {
      identifier = cachedResult[0];
      compiledRules.push(cachedResult[1]);
    } else {
      identifier = createIdentifier('r', prop, value);
      var order = customGroup[prop] || atomicGroup;
      var rules = createAtomicRules(identifier, prop, value);
      var orderedRules = [rules, order];
      compiledRules.push(orderedRules);
      cache.set(cacheKey, [identifier, orderedRules]);
    }

    return identifier;
  }

  Object.keys(style).sort().forEach(function (prop) {
    var value = style[prop];

    if (value != null) {
      var localizeableValue; // BiDi flip values

      if (PROPERTIES_VALUE.indexOf(prop) > -1) {
        var _left = atomicCompile(prop, 'left');

        var _right = atomicCompile(prop, 'right');

        if (value === 'start') {
          localizeableValue = [_left, _right];
        } else if (value === 'end') {
          localizeableValue = [_right, _left];
        }
      } // BiDi flip properties


      var propPolyfill = PROPERTIES_I18N[prop];

      if (propPolyfill != null) {
        var ltr = atomicCompile(propPolyfill, value);
        var rtl = atomicCompile(PROPERTIES_FLIP[propPolyfill], value);
        localizeableValue = [ltr, rtl];
      } // BiDi flip transitionProperty value


      if (prop === 'transitionProperty') {
        var values = Array.isArray(value) ? value : [value];
        var polyfillIndices = [];

        for (var i = 0; i < values.length; i++) {
          var val = values[i];

          if (typeof val === 'string' && PROPERTIES_I18N[val] != null) {
            polyfillIndices.push(i);
          }
        }

        if (polyfillIndices.length > 0) {
          var ltrPolyfillValues = [].concat(values);
          var rtlPolyfillValues = [].concat(values);
          polyfillIndices.forEach(function (i) {
            var ltrVal = ltrPolyfillValues[i];

            if (typeof ltrVal === 'string') {
              var ltrPolyfill = PROPERTIES_I18N[ltrVal];
              var rtlPolyfill = PROPERTIES_FLIP[ltrPolyfill];
              ltrPolyfillValues[i] = ltrPolyfill;
              rtlPolyfillValues[i] = rtlPolyfill;

              var _ltr = atomicCompile(prop, ltrPolyfillValues);

              var _rtl = atomicCompile(prop, rtlPolyfillValues);

              localizeableValue = [_ltr, _rtl];
            }
          });
        }
      }

      if (localizeableValue == null) {
        localizeableValue = atomicCompile(prop, value);
      } else {
        compiledStyle['$$css$localize'] = true;
      }

      compiledStyle[prop] = localizeableValue;
    }
  });
  return [compiledStyle, compiledRules];
}
/**
 * Compile simple style object to classic CSS rules.
 * No support for 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */

export function classic(style, name) {
  var compiledStyle = {
    $$css: true
  };
  var compiledRules = [];

  var animationKeyframes = style.animationKeyframes,
      rest = _objectWithoutPropertiesLoose(style, ["animationKeyframes"]);

  var identifier = createIdentifier('css', name, style);
  var selector = "." + identifier;
  var animationName;

  if (animationKeyframes != null) {
    var _processKeyframesValu = processKeyframesValue(animationKeyframes),
        animationNames = _processKeyframesValu[0],
        keyframesRules = _processKeyframesValu[1];

    animationName = animationNames.join(',');
    compiledRules.push.apply(compiledRules, keyframesRules);
  }

  var block = createDeclarationBlock(_objectSpread(_objectSpread({}, rest), {}, {
    animationName: animationName
  }));
  compiledRules.push("" + selector + block);
  compiledStyle[identifier] = identifier;
  return [compiledStyle, [[compiledRules, classicGroup]]];
}
/**
 * Compile simple style object to inline DOM styles.
 * No support for 'animationKeyframes', 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */

export function inline(originalStyle, isRTL) {
  var style = originalStyle || emptyObject;
  var frozenProps = {};
  var nextStyle = {};

  for (var originalProp in style) {
    var originalValue = style[originalProp];
    var prop = originalProp;
    var value = originalValue;

    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
      continue;
    } // BiDi flip values


    if (PROPERTIES_VALUE.indexOf(originalProp) > -1) {
      if (originalValue === 'start') {
        value = isRTL ? 'right' : 'left';
      } else if (originalValue === 'end') {
        value = isRTL ? 'left' : 'right';
      }
    } // BiDi flip properties


    var propPolyfill = PROPERTIES_I18N[originalProp];

    if (propPolyfill != null) {
      prop = isRTL ? PROPERTIES_FLIP[propPolyfill] : propPolyfill;
    } // BiDi flip transitionProperty value


    if (originalProp === 'transitionProperty') {
      (function () {
        // $FlowFixMe
        var originalValues = Array.isArray(originalValue) ? originalValue : [originalValue];
        originalValues.forEach(function (val, i) {
          if (typeof val === 'string') {
            var valuePolyfill = PROPERTIES_I18N[val];

            if (valuePolyfill != null) {
              originalValues[i] = isRTL ? PROPERTIES_FLIP[valuePolyfill] : valuePolyfill;
            }
          }
        });
      })();
    } // Create finalized style


    if (!frozenProps[prop]) {
      nextStyle[prop] = value;
    }

    if (PROPERTIES_I18N.hasOwnProperty(originalProp)) {
      frozenProps[prop] = true;
    }
  }

  return createReactDOMStyle(nextStyle, true);
}
/**
 * Create a value string that normalizes different input values with a common
 * output.
 */

export function stringifyValueWithProperty(value, property) {
  // e.g., 0 => '0px', 'black' => 'rgba(0,0,0,1)'
  var normalizedValue = normalizeValueWithProperty(value, property);
  return typeof normalizedValue !== 'string' ? JSON.stringify(normalizedValue || '') : normalizedValue;
}
/**
 * Create the Atomic CSS rules needed for a given StyleSheet rule.
 * Translates StyleSheet declarations to CSS.
 */

function createAtomicRules(identifier, property, value) {
  var rules = [];
  var selector = "." + identifier; // Handle non-standard properties and object values that require multiple
  // CSS rules to be created.

  switch (property) {
    case 'animationKeyframes':
      {
        var _processKeyframesValu2 = processKeyframesValue(value),
            animationNames = _processKeyframesValu2[0],
            keyframesRules = _processKeyframesValu2[1];

        var block = createDeclarationBlock({
          animationName: animationNames.join(',')
        });
        rules.push.apply(rules, ["" + selector + block].concat(keyframesRules));
        break;
      }
    // Equivalent to using '::placeholder'

    case 'placeholderTextColor':
      {
        var _block = createDeclarationBlock({
          color: value,
          opacity: 1
        });

        rules.push(selector + "::-webkit-input-placeholder" + _block, selector + "::-moz-placeholder" + _block, selector + ":-ms-input-placeholder" + _block, selector + "::placeholder" + _block);
        break;
      }
    // Polyfill for additional 'pointer-events' values
    // See d13f78622b233a0afc0c7a200c0a0792c8ca9e58

    case 'pointerEvents':
      {
        var finalValue = value;

        if (value === 'auto' || value === 'box-only') {
          finalValue = 'auto!important';

          if (value === 'box-only') {
            var _block3 = createDeclarationBlock({
              pointerEvents: 'none'
            });

            rules.push(selector + ">*" + _block3);
          }
        } else if (value === 'none' || value === 'box-none') {
          finalValue = 'none!important';

          if (value === 'box-none') {
            var _block4 = createDeclarationBlock({
              pointerEvents: 'auto'
            });

            rules.push(selector + ">*" + _block4);
          }
        }

        var _block2 = createDeclarationBlock({
          pointerEvents: finalValue
        });

        rules.push("" + selector + _block2);
        break;
      }
    // Polyfill for draft spec
    // https://drafts.csswg.org/css-scrollbars-1/

    case 'scrollbarWidth':
      {
        if (value === 'none') {
          rules.push(selector + "::-webkit-scrollbar{display:none}");
        }

        var _block5 = createDeclarationBlock({
          scrollbarWidth: value
        });

        rules.push("" + selector + _block5);
        break;
      }

    default:
      {
        var _createDeclarationBlo;

        var _block6 = createDeclarationBlock((_createDeclarationBlo = {}, _createDeclarationBlo[property] = value, _createDeclarationBlo));

        rules.push("" + selector + _block6);
        break;
      }
  }

  return rules;
}
/**
 * Creates a CSS declaration block from a StyleSheet object.
 */


function createDeclarationBlock(style) {
  var domStyle = prefixStyles(createReactDOMStyle(style));
  var declarationsString = Object.keys(domStyle).map(function (property) {
    var value = domStyle[property];
    var prop = hyphenateStyleName(property); // The prefixer may return an array of values:
    // { display: [ '-webkit-flex', 'flex' ] }
    // to represent "fallback" declarations
    // { display: -webkit-flex; display: flex; }

    if (Array.isArray(value)) {
      return value.map(function (v) {
        return prop + ":" + v;
      }).join(';');
    } else {
      return prop + ":" + value;
    }
  }) // Once properties are hyphenated, this will put the vendor
  // prefixed and short-form properties first in the list.
  .sort().join(';');
  return "{" + declarationsString + ";}";
}
/**
 * An identifier is associated with a unique set of styles.
 */


function createIdentifier(prefix, name, value) {
  var hashedString = hash(name + stringifyValueWithProperty(value, name));
  return process.env.NODE_ENV !== 'production' ? prefix + "-" + name + "-" + hashedString : prefix + "-" + hashedString;
}
/**
 * Create individual CSS keyframes rules.
 */


function createKeyframes(keyframes) {
  var prefixes = ['-webkit-', ''];
  var identifier = createIdentifier('r', 'animation', keyframes);
  var steps = '{' + Object.keys(keyframes).map(function (stepName) {
    var rule = keyframes[stepName];
    var block = createDeclarationBlock(rule);
    return "" + stepName + block;
  }).join('') + '}';
  var rules = prefixes.map(function (prefix) {
    return "@" + prefix + "keyframes " + identifier + steps;
  });
  return [identifier, rules];
}
/**
 * Create CSS keyframes rules and names from a StyleSheet keyframes object.
 */


function processKeyframesValue(keyframesValue) {
  if (typeof keyframesValue === 'number') {
    throw new Error("Invalid CSS keyframes type: " + typeof keyframesValue);
  }

  var animationNames = [];
  var rules = [];
  var value = Array.isArray(keyframesValue) ? keyframesValue : [keyframesValue];
  value.forEach(function (keyframes) {
    if (typeof keyframes === 'string') {
      // Support external animation libraries (identifiers only)
      animationNames.push(keyframes);
    } else {
      // Create rules for each of the keyframes
      var _createKeyframes = createKeyframes(keyframes),
          identifier = _createKeyframes[0],
          keyframesRules = _createKeyframes[1];

      animationNames.push(identifier);
      rules.push.apply(rules, keyframesRules);
    }
  });
  return [animationNames, rules];
}