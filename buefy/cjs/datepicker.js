'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-0e70abe7.js');
require('./chunk-089eb4d1.js');
require('./chunk-dbd288d9.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-687ab17c.js');
require('./chunk-b7119999.js');
require('./chunk-ae7e641a.js');
require('./chunk-bfaeef3e.js');
require('./chunk-6c6b37c4.js');
require('./chunk-6457f7be.js');
var __chunk_16 = require('./chunk-216a6240.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_16.Datepicker;
exports.default = Plugin;
