/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import _EventSubscription from './_EventSubscription';

/**
 * EmitterSubscription represents a subscription with listener and context data.
 */
var EmitterSubscription = /*#__PURE__*/function (_EventSubscription2) {
  _inheritsLoose(EmitterSubscription, _EventSubscription2);

  /**
   * @param {EventEmitter} emitter - The event emitter that registered this
   *   subscription
   * @param {EventSubscriptionVendor} subscriber - The subscriber that controls
   *   this subscription
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */
  function EmitterSubscription(emitter, subscriber, listener, context) {
    var _this;

    _this = _EventSubscription2.call(this, subscriber) || this;
    _this.emitter = emitter;
    _this.listener = listener;
    _this.context = context;
    return _this;
  }
  /**
   * Removes this subscription from the emitter that registered it.
   * Note: we're overriding the `remove()` method of _EventSubscription here
   * but deliberately not calling `super.remove()` as the responsibility
   * for removing the subscription lies with the EventEmitter.
   */


  var _proto = EmitterSubscription.prototype;

  _proto.remove = function remove() {
    this.emitter.removeSubscription(this);
  };

  return EmitterSubscription;
}(_EventSubscription);

export default EmitterSubscription;