"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
var Profiler = (function () {
    function Profiler(backendTimer, logger) {
        this.backendTimer = backendTimer;
        this.logger = logger;
        if (logger == null) {
            this.logger = new Logger();
        }
    }
    Profiler.prototype.profileKernel = function (name, f) {
        var _this = this;
        var result;
        var holdResultWrapperFn = function () {
            result = f();
        };
        var timer = this.backendTimer.time(holdResultWrapperFn);
        var vals = result.dataSync();
        util.checkForNaN(vals, result.dtype, name);
        timer.then(function (timing) {
            _this.logger.logKernelProfile(name, result, vals, timing.kernelMs);
        });
        return result;
    };
    return Profiler;
}());
exports.Profiler = Profiler;
var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.logKernelProfile = function (name, result, vals, timeMs) {
        var time = util.rightPad(timeMs + "ms", 9);
        var paddedName = util.rightPad(name, 25);
        var rank = result.rank;
        var size = result.size;
        var shape = util.rightPad(result.shape.toString(), 14);
        console.log("%c" + paddedName + "\t%c" + time + "\t%c" + rank + "D " + shape + "\t%c" + size, 'font-weight:bold', 'color:red', 'color:blue', 'color: orange');
    };
    return Logger;
}());
exports.Logger = Logger;
