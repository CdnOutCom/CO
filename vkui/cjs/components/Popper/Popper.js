"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popper = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _reactPopper = require("react-popper");

var _AppRootPortal = require("../AppRoot/AppRootPortal");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _useExternRef = require("../../hooks/useExternRef");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _excluded = ["targetRef", "children", "getRef", "placement", "onPlacementChange", "arrow", "arrowClassName", "sameWidth", "offsetDistance", "offsetSkidding", "forcePortal", "style"];
var ARROW_PADDING = 8;
var ARROW_WIDTH = 20;
var ARROW_HEIGHT = 8;

var Popper = function Popper(_ref) {
  var _targetRef$current3;

  var targetRef = _ref.targetRef,
      children = _ref.children,
      getRef = _ref.getRef,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? "bottom-start" : _ref$placement,
      onPlacementChange = _ref.onPlacementChange,
      arrow = _ref.arrow,
      arrowClassName = _ref.arrowClassName,
      sameWidth = _ref.sameWidth,
      _ref$offsetDistance = _ref.offsetDistance,
      offsetDistance = _ref$offsetDistance === void 0 ? 8 : _ref$offsetDistance,
      _ref$offsetSkidding = _ref.offsetSkidding,
      offsetSkidding = _ref$offsetSkidding === void 0 ? 0 : _ref$offsetSkidding,
      _ref$forcePortal = _ref.forcePortal,
      forcePortal = _ref$forcePortal === void 0 ? true : _ref$forcePortal,
      compStyles = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _React$useState = React.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      popperNode = _React$useState2[0],
      setPopperNode = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      smallTargetOffsetSkidding = _React$useState4[0],
      setSmallTargetOffsetSkidding = _React$useState4[1];

  var platform = (0, _usePlatform.usePlatform)();
  var setExternalRef = (0, _useExternRef.useExternRef)(getRef, setPopperNode);
  var modifiers = React.useMemo(function () {
    var modifiers = [{
      name: "preventOverflow"
    }, {
      name: "offset",
      options: {
        offset: [arrow ? offsetSkidding - smallTargetOffsetSkidding : offsetSkidding, arrow ? offsetDistance + ARROW_HEIGHT : offsetDistance]
      }
    }, {
      name: "flip"
    }];

    if (arrow) {
      modifiers.push({
        name: "arrow",
        options: {
          padding: ARROW_PADDING
        }
      });
    }

    if (sameWidth) {
      var _sameWidth = {
        name: "sameWidth",
        enabled: true,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: function fn(_ref2) {
          var state = _ref2.state;
          state.styles.popper.width = "".concat(state.rects.reference.width, "px");
        },
        effect: function effect(_ref3) {
          var state = _ref3.state;
          state.elements.popper.style.width = "".concat(state.elements.reference.offsetWidth, "px");
        }
      };
      modifiers.push(_sameWidth);
    }

    return modifiers;
  }, [arrow, sameWidth, smallTargetOffsetSkidding, offsetSkidding, offsetDistance]);

  var _usePopper = (0, _reactPopper.usePopper)(targetRef.current, popperNode, {
    placement: placement,
    modifiers: modifiers
  }),
      styles = _usePopper.styles,
      state = _usePopper.state,
      attributes = _usePopper.attributes;

  var resolvedPlacement = state === null || state === void 0 ? void 0 : state.placement;
  var isEdgePlacement = !!resolvedPlacement && resolvedPlacement.includes("-"); // true, ???????? ???????????? ?????????????????? ?? ????????
  // ???????? ???????????? ???????????????? ?? ????????, ???? ?????????? ?????????????????????? ???????????????? ?????? ?? ?????? ??????????????, ?????????? ?????????????? ???? ???????????????????????? ????
  // ?????????????? ????-???? ?????????????????? ???????????????? ????????????????????

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (arrow && isEdgePlacement) {
      var _ref4, _targetRef$current, _targetRef$current2;

      var placementDirection = resolvedPlacement !== null && resolvedPlacement !== void 0 && resolvedPlacement.startsWith("bottom") || resolvedPlacement !== null && resolvedPlacement !== void 0 && resolvedPlacement.startsWith("top") ? "vertical" : "horizontal";
      var arrowSize = placementDirection === "vertical" ? ARROW_WIDTH : ARROW_HEIGHT;
      var targetSize = (_ref4 = placementDirection === "vertical" ? (_targetRef$current = targetRef.current) === null || _targetRef$current === void 0 ? void 0 : _targetRef$current.offsetWidth : (_targetRef$current2 = targetRef.current) === null || _targetRef$current2 === void 0 ? void 0 : _targetRef$current2.offsetHeight) !== null && _ref4 !== void 0 ? _ref4 : 0;

      if (targetSize < arrowSize + 2 * ARROW_PADDING) {
        setSmallTargetOffsetSkidding(ARROW_PADDING + arrowSize / 2);
      }
    } else {
      setSmallTargetOffsetSkidding(0);
    }
  }, [arrow, isEdgePlacement]);
  React.useEffect(function () {
    if (resolvedPlacement) {
      onPlacementChange && onPlacementChange({
        placement: resolvedPlacement
      });
    }
  }, [onPlacementChange, resolvedPlacement]);
  var dropdown = (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, attributes.popper, {
    vkuiClass: (0, _getClassName.getClassName)("Popper", platform),
    ref: setExternalRef,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, compStyles), styles.popper), {}, {
      minWidth: sameWidth ? (_targetRef$current3 = targetRef.current) === null || _targetRef$current3 === void 0 ? void 0 : _targetRef$current3.scrollWidth : undefined
    })
  }), arrow && (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, attributes.arrow, {
    vkuiClass: "Popper__arrow",
    "data-popper-arrow": true,
    style: styles.arrow
  }), (0, _jsxRuntime.createScopedElement)("svg", {
    vkuiClass: "Popper__arrow-in",
    className: arrowClassName,
    width: "20",
    height: "8",
    viewBox: "0 0 20 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _jsxRuntime.createScopedElement)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 0C13 0 15.9999 8 20 8H0C3.9749 8 7 0 10 0Z",
    fill: "currentColor"
  }))), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Popper__content"
  }, children));
  return (0, _jsxRuntime.createScopedElement)(_AppRootPortal.AppRootPortal, {
    forcePortal: forcePortal,
    vkuiClass: "PopperPortal"
  }, dropdown);
};

exports.Popper = Popper;
//# sourceMappingURL=Popper.js.map