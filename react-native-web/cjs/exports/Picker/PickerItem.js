"use strict";

exports.__esModule = true;
exports.default = PickerItem;

var _createElement = _interopRequireDefault(require("../createElement"));

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
function PickerItem(props) {
  var color = props.color,
      label = props.label,
      testID = props.testID,
      value = props.value;
  var style = {
    color: color
  };
  return (0, _createElement.default)('option', {
    children: label,
    style: style,
    testID: testID,
    value: value
  });
}

module.exports = exports.default;