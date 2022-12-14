(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cronstrue", [], factory);
	else if(typeof exports === 'object')
		exports["cronstrue"] = factory();
	else
		root["cronstrue"] = factory();
})(globalThis, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 794:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronParser = void 0;
var rangeValidator_1 = __webpack_require__(586);
var CronParser = (function () {
    function CronParser(expression, dayOfWeekStartIndexZero, monthStartIndexZero) {
        if (dayOfWeekStartIndexZero === void 0) { dayOfWeekStartIndexZero = true; }
        if (monthStartIndexZero === void 0) { monthStartIndexZero = false; }
        this.expression = expression;
        this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
        this.monthStartIndexZero = monthStartIndexZero;
    }
    CronParser.prototype.parse = function () {
        var parsed = this.extractParts(this.expression);
        this.normalize(parsed);
        this.validate(parsed);
        return parsed;
    };
    CronParser.prototype.extractParts = function (expression) {
        if (!this.expression) {
            throw new Error("Expression is empty");
        }
        var parsed = expression.trim().split(/[ ]+/);
        if (parsed.length < 5) {
            throw new Error("Expression has only ".concat(parsed.length, " part").concat(parsed.length == 1 ? "" : "s", ". At least 5 parts are required."));
        }
        else if (parsed.length == 5) {
            parsed.unshift("");
            parsed.push("");
        }
        else if (parsed.length == 6) {
            var isYearWithNoSecondsPart = /\d{4}$/.test(parsed[5]) || parsed[4] == "?" || parsed[2] == "?";
            if (isYearWithNoSecondsPart) {
                parsed.unshift("");
            }
            else {
                parsed.push("");
            }
        }
        else if (parsed.length > 7) {
            throw new Error("Expression has ".concat(parsed.length, " parts; too many!"));
        }
        return parsed;
    };
    CronParser.prototype.normalize = function (expressionParts) {
        var _this = this;
        expressionParts[3] = expressionParts[3].replace("?", "*");
        expressionParts[5] = expressionParts[5].replace("?", "*");
        expressionParts[2] = expressionParts[2].replace("?", "*");
        if (expressionParts[0].indexOf("0/") == 0) {
            expressionParts[0] = expressionParts[0].replace("0/", "*/");
        }
        if (expressionParts[1].indexOf("0/") == 0) {
            expressionParts[1] = expressionParts[1].replace("0/", "*/");
        }
        if (expressionParts[2].indexOf("0/") == 0) {
            expressionParts[2] = expressionParts[2].replace("0/", "*/");
        }
        if (expressionParts[3].indexOf("1/") == 0) {
            expressionParts[3] = expressionParts[3].replace("1/", "*/");
        }
        if (expressionParts[4].indexOf("1/") == 0) {
            expressionParts[4] = expressionParts[4].replace("1/", "*/");
        }
        if (expressionParts[6].indexOf("1/") == 0) {
            expressionParts[6] = expressionParts[6].replace("1/", "*/");
        }
        expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, function (t) {
            var dowDigits = t.replace(/\D/, "");
            var dowDigitsAdjusted = dowDigits;
            if (_this.dayOfWeekStartIndexZero) {
                if (dowDigits == "7") {
                    dowDigitsAdjusted = "0";
                }
            }
            else {
                dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
            }
            return t.replace(dowDigits, dowDigitsAdjusted);
        });
        if (expressionParts[5] == "L") {
            expressionParts[5] = "6";
        }
        if (expressionParts[3] == "?") {
            expressionParts[3] = "*";
        }
        if (expressionParts[3].indexOf("W") > -1 &&
            (expressionParts[3].indexOf(",") > -1 || expressionParts[3].indexOf("-") > -1)) {
            throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
        }
        var days = {
            SUN: 0,
            MON: 1,
            TUE: 2,
            WED: 3,
            THU: 4,
            FRI: 5,
            SAT: 6,
        };
        for (var day in days) {
            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "gi"), days[day].toString());
        }
        expressionParts[4] = expressionParts[4].replace(/(^\d{1,2})|([^#/\s]\d{1,2})/g, function (t) {
            var dowDigits = t.replace(/\D/, "");
            var dowDigitsAdjusted = dowDigits;
            if (_this.monthStartIndexZero) {
                dowDigitsAdjusted = (parseInt(dowDigits) + 1).toString();
            }
            return t.replace(dowDigits, dowDigitsAdjusted);
        });
        var months = {
            JAN: 1,
            FEB: 2,
            MAR: 3,
            APR: 4,
            MAY: 5,
            JUN: 6,
            JUL: 7,
            AUG: 8,
            SEP: 9,
            OCT: 10,
            NOV: 11,
            DEC: 12,
        };
        for (var month in months) {
            expressionParts[4] = expressionParts[4].replace(new RegExp(month, "gi"), months[month].toString());
        }
        if (expressionParts[0] == "0") {
            expressionParts[0] = "";
        }
        if (!/\*|\-|\,|\//.test(expressionParts[2]) &&
            (/\*|\//.test(expressionParts[1]) || /\*|\//.test(expressionParts[0]))) {
            expressionParts[2] += "-".concat(expressionParts[2]);
        }
        for (var i = 0; i < expressionParts.length; i++) {
            if (expressionParts[i].indexOf(",") != -1) {
                expressionParts[i] =
                    expressionParts[i]
                        .split(",")
                        .filter(function (str) { return str !== ""; })
                        .join(",") || "*";
            }
            if (expressionParts[i] == "*/1") {
                expressionParts[i] = "*";
            }
            if (expressionParts[i].indexOf("/") > -1 && !/^\*|\-|\,/.test(expressionParts[i])) {
                var stepRangeThrough = null;
                switch (i) {
                    case 4:
                        stepRangeThrough = "12";
                        break;
                    case 5:
                        stepRangeThrough = "6";
                        break;
                    case 6:
                        stepRangeThrough = "9999";
                        break;
                    default:
                        stepRangeThrough = null;
                        break;
                }
                if (stepRangeThrough !== null) {
                    var parts = expressionParts[i].split("/");
                    expressionParts[i] = "".concat(parts[0], "-").concat(stepRangeThrough, "/").concat(parts[1]);
                }
            }
        }
    };
    CronParser.prototype.validate = function (parsed) {
        this.assertNoInvalidCharacters("DOW", parsed[5]);
        this.assertNoInvalidCharacters("DOM", parsed[3]);
        this.validateRange(parsed);
    };
    CronParser.prototype.validateRange = function (parsed) {
        rangeValidator_1.default.secondRange(parsed[0]);
        rangeValidator_1.default.minuteRange(parsed[1]);
        rangeValidator_1.default.hourRange(parsed[2]);
        rangeValidator_1.default.dayOfMonthRange(parsed[3]);
        rangeValidator_1.default.monthRange(parsed[4], this.monthStartIndexZero);
        rangeValidator_1.default.dayOfWeekRange(parsed[5], this.dayOfWeekStartIndexZero);
    };
    CronParser.prototype.assertNoInvalidCharacters = function (partDescription, expression) {
        var invalidChars = expression.match(/[A-KM-VX-Z]+/gi);
        if (invalidChars && invalidChars.length) {
            throw new Error("".concat(partDescription, " part contains invalid values: '").concat(invalidChars.toString(), "'"));
        }
    };
    return CronParser;
}());
exports.CronParser = CronParser;


/***/ }),

/***/ 728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpressionDescriptor = void 0;
var stringUtilities_1 = __webpack_require__(910);
var cronParser_1 = __webpack_require__(794);
var ExpressionDescriptor = (function () {
    function ExpressionDescriptor(expression, options) {
        this.expression = expression;
        this.options = options;
        this.expressionParts = new Array(5);
        if (!this.options.locale && ExpressionDescriptor.defaultLocale) {
            this.options.locale = ExpressionDescriptor.defaultLocale;
        }
        if (!ExpressionDescriptor.locales[this.options.locale]) {
            var fallBackLocale = Object.keys(ExpressionDescriptor.locales)[0];
            console.warn("Locale '".concat(this.options.locale, "' could not be found; falling back to '").concat(fallBackLocale, "'."));
            this.options.locale = fallBackLocale;
        }
        this.i18n = ExpressionDescriptor.locales[this.options.locale];
        if (options.use24HourTimeFormat === undefined) {
            options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
        }
    }
    ExpressionDescriptor.toString = function (expression, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.throwExceptionOnParseError, throwExceptionOnParseError = _c === void 0 ? true : _c, _d = _b.verbose, verbose = _d === void 0 ? false : _d, _e = _b.dayOfWeekStartIndexZero, dayOfWeekStartIndexZero = _e === void 0 ? true : _e, _f = _b.monthStartIndexZero, monthStartIndexZero = _f === void 0 ? false : _f, use24HourTimeFormat = _b.use24HourTimeFormat, _g = _b.locale, locale = _g === void 0 ? null : _g;
        var options = {
            throwExceptionOnParseError: throwExceptionOnParseError,
            verbose: verbose,
            dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
            monthStartIndexZero: monthStartIndexZero,
            use24HourTimeFormat: use24HourTimeFormat,
            locale: locale,
        };
        var descripter = new ExpressionDescriptor(expression, options);
        return descripter.getFullDescription();
    };
    ExpressionDescriptor.initialize = function (localesLoader, defaultLocale) {
        if (defaultLocale === void 0) { defaultLocale = "en"; }
        ExpressionDescriptor.specialCharacters = ["/", "-", ",", "*"];
        ExpressionDescriptor.defaultLocale = defaultLocale;
        localesLoader.load(ExpressionDescriptor.locales);
    };
    ExpressionDescriptor.prototype.getFullDescription = function () {
        var description = "";
        try {
            var parser = new cronParser_1.CronParser(this.expression, this.options.dayOfWeekStartIndexZero, this.options.monthStartIndexZero);
            this.expressionParts = parser.parse();
            var timeSegment = this.getTimeOfDayDescription();
            var dayOfMonthDesc = this.getDayOfMonthDescription();
            var monthDesc = this.getMonthDescription();
            var dayOfWeekDesc = this.getDayOfWeekDescription();
            var yearDesc = this.getYearDescription();
            description += timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
            description = this.transformVerbosity(description, !!this.options.verbose);
            description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
        }
        catch (ex) {
            if (!this.options.throwExceptionOnParseError) {
                description = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
            }
            else {
                throw "".concat(ex);
            }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getTimeOfDayDescription = function () {
        var secondsExpression = this.expressionParts[0];
        var minuteExpression = this.expressionParts[1];
        var hourExpression = this.expressionParts[2];
        var description = "";
        if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)) {
            description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
        }
        else if (!secondsExpression &&
            minuteExpression.indexOf("-") > -1 &&
            !(minuteExpression.indexOf(",") > -1) &&
            !(minuteExpression.indexOf("/") > -1) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)) {
            var minuteParts = minuteExpression.split("-");
            description += stringUtilities_1.StringUtilities.format(this.i18n.everyMinuteBetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
        }
        else if (!secondsExpression &&
            hourExpression.indexOf(",") > -1 &&
            hourExpression.indexOf("-") == -1 &&
            hourExpression.indexOf("/") == -1 &&
            !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)) {
            var hourParts = hourExpression.split(",");
            description += this.i18n.at();
            for (var i = 0; i < hourParts.length; i++) {
                description += " ";
                description += this.formatTime(hourParts[i], minuteExpression, "");
                if (i < hourParts.length - 2) {
                    description += ",";
                }
                if (i == hourParts.length - 2) {
                    description += this.i18n.spaceAnd();
                }
            }
        }
        else {
            var secondsDescription = this.getSecondsDescription();
            var minutesDescription = this.getMinutesDescription();
            var hoursDescription = this.getHoursDescription();
            description += secondsDescription;
            if (description && minutesDescription) {
                description += ", ";
            }
            description += minutesDescription;
            if (minutesDescription === hoursDescription) {
                return description;
            }
            if (description && hoursDescription) {
                description += ", ";
            }
            description += hoursDescription;
        }
        return description;
    };
    ExpressionDescriptor.prototype.getSecondsDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.everySecond(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Seconds(), s);
        }, function (s) {
            return _this.i18n.secondsX0ThroughX1PastTheMinute();
        }, function (s) {
            return s == "0"
                ? ""
                : parseInt(s) < 20
                    ? _this.i18n.atX0SecondsPastTheMinute()
                    : _this.i18n.atX0SecondsPastTheMinuteGt20() || _this.i18n.atX0SecondsPastTheMinute();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getMinutesDescription = function () {
        var _this = this;
        var secondsExpression = this.expressionParts[0];
        var hourExpression = this.expressionParts[2];
        var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Minutes(), s);
        }, function (s) {
            return _this.i18n.minutesX0ThroughX1PastTheHour();
        }, function (s) {
            try {
                return s == "0" && hourExpression.indexOf("/") == -1 && secondsExpression == ""
                    ? _this.i18n.everyHour()
                    : parseInt(s) < 20
                        ? _this.i18n.atX0MinutesPastTheHour()
                        : _this.i18n.atX0MinutesPastTheHourGt20() || _this.i18n.atX0MinutesPastTheHour();
            }
            catch (e) {
                return _this.i18n.atX0MinutesPastTheHour();
            }
        });
        return description;
    };
    ExpressionDescriptor.prototype.getHoursDescription = function () {
        var _this = this;
        var expression = this.expressionParts[2];
        var description = this.getSegmentDescription(expression, this.i18n.everyHour(), function (s) {
            return _this.formatTime(s, "0", "");
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Hours(), s);
        }, function (s) {
            return _this.i18n.betweenX0AndX1();
        }, function (s) {
            return _this.i18n.atX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
        var _this = this;
        var daysOfWeekNames = this.i18n.daysOfTheWeek();
        var description = null;
        if (this.expressionParts[5] == "*") {
            description = "";
        }
        else {
            description = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function (s) {
                var exp = s;
                if (s.indexOf("#") > -1) {
                    exp = s.substr(0, s.indexOf("#"));
                }
                else if (s.indexOf("L") > -1) {
                    exp = exp.replace("L", "");
                }
                return daysOfWeekNames[parseInt(exp)];
            }, function (s) {
                if (parseInt(s) == 1) {
                    return "";
                }
                else {
                    return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0DaysOfTheWeek(), s);
                }
            }, function (s) {
                return _this.i18n.commaX0ThroughX1();
            }, function (s) {
                var format = null;
                if (s.indexOf("#") > -1) {
                    var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
                    var dayOfWeekOfMonthDescription = null;
                    switch (dayOfWeekOfMonthNumber) {
                        case "1":
                            dayOfWeekOfMonthDescription = _this.i18n.first();
                            break;
                        case "2":
                            dayOfWeekOfMonthDescription = _this.i18n.second();
                            break;
                        case "3":
                            dayOfWeekOfMonthDescription = _this.i18n.third();
                            break;
                        case "4":
                            dayOfWeekOfMonthDescription = _this.i18n.fourth();
                            break;
                        case "5":
                            dayOfWeekOfMonthDescription = _this.i18n.fifth();
                            break;
                    }
                    format = _this.i18n.commaOnThe() + dayOfWeekOfMonthDescription + _this.i18n.spaceX0OfTheMonth();
                }
                else if (s.indexOf("L") > -1) {
                    format = _this.i18n.commaOnTheLastX0OfTheMonth();
                }
                else {
                    var domSpecified = _this.expressionParts[3] != "*";
                    format = domSpecified ? _this.i18n.commaAndOnX0() : _this.i18n.commaOnlyOnX0();
                }
                return format;
            });
        }
        return description;
    };
    ExpressionDescriptor.prototype.getMonthDescription = function () {
        var _this = this;
        var monthNames = this.i18n.monthsOfTheYear();
        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s) {
            return monthNames[parseInt(s) - 1];
        }, function (s) {
            if (parseInt(s) == 1) {
                return "";
            }
            else {
                return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Months(), s);
            }
        }, function (s) {
            return _this.i18n.commaMonthX0ThroughMonthX1() || _this.i18n.commaX0ThroughX1();
        }, function (s) {
            return _this.i18n.commaOnlyInMonthX0 ? _this.i18n.commaOnlyInMonthX0() : _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfMonthDescription = function () {
        var _this = this;
        var description = null;
        var expression = this.expressionParts[3];
        switch (expression) {
            case "L":
                description = this.i18n.commaOnTheLastDayOfTheMonth();
                break;
            case "WL":
            case "LW":
                description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
                break;
            default:
                var weekDayNumberMatches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
                if (weekDayNumberMatches) {
                    var dayNumber = parseInt(weekDayNumberMatches[0].replace("W", ""));
                    var dayString = dayNumber == 1
                        ? this.i18n.firstWeekday()
                        : stringUtilities_1.StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
                    description = stringUtilities_1.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
                    break;
                }
                else {
                    var lastDayOffSetMatches = expression.match(/L-(\d{1,2})/);
                    if (lastDayOffSetMatches) {
                        var offSetDays = lastDayOffSetMatches[1];
                        description = stringUtilities_1.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(), offSetDays);
                        break;
                    }
                    else if (expression == "*" && this.expressionParts[5] != "*") {
                        return "";
                    }
                    else {
                        description = this.getSegmentDescription(expression, this.i18n.commaEveryDay(), function (s) {
                            return s == "L"
                                ? _this.i18n.lastDay()
                                : _this.i18n.dayX0
                                    ? stringUtilities_1.StringUtilities.format(_this.i18n.dayX0(), s)
                                    : s;
                        }, function (s) {
                            return s == "1" ? _this.i18n.commaEveryDay() : _this.i18n.commaEveryX0Days();
                        }, function (s) {
                            return _this.i18n.commaBetweenDayX0AndX1OfTheMonth();
                        }, function (s) {
                            return _this.i18n.commaOnDayX0OfTheMonth();
                        });
                    }
                    break;
                }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getYearDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) {
            return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Years(), s);
        }, function (s) {
            return _this.i18n.commaYearX0ThroughYearX1() || _this.i18n.commaX0ThroughX1();
        }, function (s) {
            return _this.i18n.commaOnlyInYearX0 ? _this.i18n.commaOnlyInYearX0() : _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getSegmentDescription = function (expression, allDescription, getSingleItemDescription, getIncrementDescriptionFormat, getRangeDescriptionFormat, getDescriptionFormat) {
        var description = null;
        var doesExpressionContainIncrement = expression.indexOf("/") > -1;
        var doesExpressionContainRange = expression.indexOf("-") > -1;
        var doesExpressionContainMultipleValues = expression.indexOf(",") > -1;
        if (!expression) {
            description = "";
        }
        else if (expression === "*") {
            description = allDescription;
        }
        else if (!doesExpressionContainIncrement && !doesExpressionContainRange && !doesExpressionContainMultipleValues) {
            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
        }
        else if (doesExpressionContainMultipleValues) {
            var segments = expression.split(",");
            var descriptionContent = "";
            for (var i = 0; i < segments.length; i++) {
                if (i > 0 && segments.length > 2) {
                    descriptionContent += ",";
                    if (i < segments.length - 1) {
                        descriptionContent += " ";
                    }
                }
                if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
                    descriptionContent += "".concat(this.i18n.spaceAnd(), " ");
                }
                if (segments[i].indexOf("/") > -1 || segments[i].indexOf("-") > -1) {
                    var isSegmentRangeWithoutIncrement = segments[i].indexOf("-") > -1 && segments[i].indexOf("/") == -1;
                    var currentDescriptionContent = this.getSegmentDescription(segments[i], allDescription, getSingleItemDescription, getIncrementDescriptionFormat, isSegmentRangeWithoutIncrement ? this.i18n.commaX0ThroughX1 : getRangeDescriptionFormat, getDescriptionFormat);
                    if (isSegmentRangeWithoutIncrement) {
                        currentDescriptionContent = currentDescriptionContent.replace(", ", "");
                    }
                    descriptionContent += currentDescriptionContent;
                }
                else if (!doesExpressionContainIncrement) {
                    descriptionContent += getSingleItemDescription(segments[i]);
                }
                else {
                    descriptionContent += this.getSegmentDescription(segments[i], allDescription, getSingleItemDescription, getIncrementDescriptionFormat, getRangeDescriptionFormat, getDescriptionFormat);
                }
            }
            if (!doesExpressionContainIncrement) {
                description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
            }
            else {
                description = descriptionContent;
            }
        }
        else if (doesExpressionContainIncrement) {
            var segments = expression.split("/");
            description = stringUtilities_1.StringUtilities.format(getIncrementDescriptionFormat(segments[1]), segments[1]);
            if (segments[0].indexOf("-") > -1) {
                var rangeSegmentDescription = this.generateRangeSegmentDescription(segments[0], getRangeDescriptionFormat, getSingleItemDescription);
                if (rangeSegmentDescription.indexOf(", ") != 0) {
                    description += ", ";
                }
                description += rangeSegmentDescription;
            }
            else if (segments[0].indexOf("*") == -1) {
                var rangeItemDescription = stringUtilities_1.StringUtilities.format(getDescriptionFormat(segments[0]), getSingleItemDescription(segments[0]));
                rangeItemDescription = rangeItemDescription.replace(", ", "");
                description += stringUtilities_1.StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
            }
        }
        else if (doesExpressionContainRange) {
            description = this.generateRangeSegmentDescription(expression, getRangeDescriptionFormat, getSingleItemDescription);
        }
        return description;
    };
    ExpressionDescriptor.prototype.generateRangeSegmentDescription = function (rangeExpression, getRangeDescriptionFormat, getSingleItemDescription) {
        var description = "";
        var rangeSegments = rangeExpression.split("-");
        var rangeSegment1Description = getSingleItemDescription(rangeSegments[0]);
        var rangeSegment2Description = getSingleItemDescription(rangeSegments[1]);
        rangeSegment2Description = rangeSegment2Description.replace(":00", ":59");
        var rangeDescriptionFormat = getRangeDescriptionFormat(rangeExpression);
        description += stringUtilities_1.StringUtilities.format(rangeDescriptionFormat, rangeSegment1Description, rangeSegment2Description);
        return description;
    };
    ExpressionDescriptor.prototype.formatTime = function (hourExpression, minuteExpression, secondExpression) {
        var hour = parseInt(hourExpression);
        var period = "";
        var setPeriodBeforeTime = false;
        if (!this.options.use24HourTimeFormat) {
            setPeriodBeforeTime = !!(this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime());
            period = setPeriodBeforeTime ? "".concat(this.getPeriod(hour), " ") : " ".concat(this.getPeriod(hour));
            if (hour > 12) {
                hour -= 12;
            }
            if (hour === 0) {
                hour = 12;
            }
        }
        var minute = minuteExpression;
        var second = "";
        if (secondExpression) {
            second = ":".concat(("00" + secondExpression).substring(secondExpression.length));
        }
        return "".concat(setPeriodBeforeTime ? period : "").concat(("00" + hour.toString()).substring(hour.toString().length), ":").concat(("00" + minute.toString()).substring(minute.toString().length)).concat(second).concat(!setPeriodBeforeTime ? period : "");
    };
    ExpressionDescriptor.prototype.transformVerbosity = function (description, useVerboseFormat) {
        if (!useVerboseFormat) {
            description = description.replace(new RegExp(", ".concat(this.i18n.everyMinute()), "g"), "");
            description = description.replace(new RegExp(", ".concat(this.i18n.everyHour()), "g"), "");
            description = description.replace(new RegExp(this.i18n.commaEveryDay(), "g"), "");
            description = description.replace(/\, ?$/, "");
        }
        return description;
    };
    ExpressionDescriptor.prototype.getPeriod = function (hour) {
        return hour >= 12 ? (this.i18n.pm && this.i18n.pm()) || "PM" : (this.i18n.am && this.i18n.am()) || "AM";
    };
    ExpressionDescriptor.locales = {};
    return ExpressionDescriptor;
}());
exports.ExpressionDescriptor = ExpressionDescriptor;


/***/ }),

/***/ 980:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.be = exports.ca = exports.fa = exports.sw = exports.sl = exports.fi = exports.sk = exports.cs = exports.he = exports.ja = exports.zh_TW = exports.zh_CN = exports.uk = exports.tr = exports.ru = exports.ro = exports.pt_BR = exports.pl = exports.sv = exports.nb = exports.nl = exports.ko = exports.id = exports.it = exports.fr = exports.es = exports.de = exports.da = exports.en = void 0;
var en_1 = __webpack_require__(751);
Object.defineProperty(exports, "en", ({ enumerable: true, get: function () { return en_1.en; } }));
var da_1 = __webpack_require__(904);
Object.defineProperty(exports, "da", ({ enumerable: true, get: function () { return da_1.da; } }));
var de_1 = __webpack_require__(511);
Object.defineProperty(exports, "de", ({ enumerable: true, get: function () { return de_1.de; } }));
var es_1 = __webpack_require__(470);
Object.defineProperty(exports, "es", ({ enumerable: true, get: function () { return es_1.es; } }));
var fr_1 = __webpack_require__(953);
Object.defineProperty(exports, "fr", ({ enumerable: true, get: function () { return fr_1.fr; } }));
var it_1 = __webpack_require__(128);
Object.defineProperty(exports, "it", ({ enumerable: true, get: function () { return it_1.it; } }));
var id_1 = __webpack_require__(258);
Object.defineProperty(exports, "id", ({ enumerable: true, get: function () { return id_1.id; } }));
var ko_1 = __webpack_require__(305);
Object.defineProperty(exports, "ko", ({ enumerable: true, get: function () { return ko_1.ko; } }));
var nl_1 = __webpack_require__(771);
Object.defineProperty(exports, "nl", ({ enumerable: true, get: function () { return nl_1.nl; } }));
var nb_1 = __webpack_require__(869);
Object.defineProperty(exports, "nb", ({ enumerable: true, get: function () { return nb_1.nb; } }));
var sv_1 = __webpack_require__(673);
Object.defineProperty(exports, "sv", ({ enumerable: true, get: function () { return sv_1.sv; } }));
var pl_1 = __webpack_require__(665);
Object.defineProperty(exports, "pl", ({ enumerable: true, get: function () { return pl_1.pl; } }));
var pt_BR_1 = __webpack_require__(461);
Object.defineProperty(exports, "pt_BR", ({ enumerable: true, get: function () { return pt_BR_1.pt_BR; } }));
var ro_1 = __webpack_require__(408);
Object.defineProperty(exports, "ro", ({ enumerable: true, get: function () { return ro_1.ro; } }));
var ru_1 = __webpack_require__(392);
Object.defineProperty(exports, "ru", ({ enumerable: true, get: function () { return ru_1.ru; } }));
var tr_1 = __webpack_require__(999);
Object.defineProperty(exports, "tr", ({ enumerable: true, get: function () { return tr_1.tr; } }));
var uk_1 = __webpack_require__(716);
Object.defineProperty(exports, "uk", ({ enumerable: true, get: function () { return uk_1.uk; } }));
var zh_CN_1 = __webpack_require__(419);
Object.defineProperty(exports, "zh_CN", ({ enumerable: true, get: function () { return zh_CN_1.zh_CN; } }));
var zh_TW_1 = __webpack_require__(139);
Object.defineProperty(exports, "zh_TW", ({ enumerable: true, get: function () { return zh_TW_1.zh_TW; } }));
var ja_1 = __webpack_require__(949);
Object.defineProperty(exports, "ja", ({ enumerable: true, get: function () { return ja_1.ja; } }));
var he_1 = __webpack_require__(389);
Object.defineProperty(exports, "he", ({ enumerable: true, get: function () { return he_1.he; } }));
var cs_1 = __webpack_require__(674);
Object.defineProperty(exports, "cs", ({ enumerable: true, get: function () { return cs_1.cs; } }));
var sk_1 = __webpack_require__(203);
Object.defineProperty(exports, "sk", ({ enumerable: true, get: function () { return sk_1.sk; } }));
var fi_1 = __webpack_require__(578);
Object.defineProperty(exports, "fi", ({ enumerable: true, get: function () { return fi_1.fi; } }));
var sl_1 = __webpack_require__(738);
Object.defineProperty(exports, "sl", ({ enumerable: true, get: function () { return sl_1.sl; } }));
var sw_1 = __webpack_require__(286);
Object.defineProperty(exports, "sw", ({ enumerable: true, get: function () { return sw_1.sw; } }));
var fa_1 = __webpack_require__(384);
Object.defineProperty(exports, "fa", ({ enumerable: true, get: function () { return fa_1.fa; } }));
var ca_1 = __webpack_require__(708);
Object.defineProperty(exports, "ca", ({ enumerable: true, get: function () { return ca_1.ca; } }));
var be_1 = __webpack_require__(445);
Object.defineProperty(exports, "be", ({ enumerable: true, get: function () { return be_1.be; } }));


/***/ }),

/***/ 282:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.allLocalesLoader = void 0;
var allLocales = __webpack_require__(980);
var allLocalesLoader = (function () {
    function allLocalesLoader() {
    }
    allLocalesLoader.prototype.load = function (availableLocales) {
        for (var property in allLocales) {
            if (allLocales.hasOwnProperty(property)) {
                availableLocales[property] = new allLocales[property]();
            }
        }
    };
    return allLocalesLoader;
}());
exports.allLocalesLoader = allLocalesLoader;


/***/ }),

/***/ 445:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.be = void 0;
var be = (function () {
    function be() {
    }
    be.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    be.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    be.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    be.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    be.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    be.prototype.everyMinute = function () {
        return "???????????? ??????????????";
    };
    be.prototype.everyHour = function () {
        return "???????????? ??????????????";
    };
    be.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "???????????????? ?????????????? ???????????? ?????????????????? ???????????????? ????????????. ???????????????? ?????????????????? ????????-????????????.";
    };
    be.prototype.atSpace = function () {
        return "?? ";
    };
    be.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "???????????? ?????????????? ?? %s ???? %s";
    };
    be.prototype.at = function () {
        return "??";
    };
    be.prototype.spaceAnd = function () {
        return " ??";
    };
    be.prototype.everySecond = function () {
        return "???????????? ??????????????";
    };
    be.prototype.everyX0Seconds = function () {
        return "???????????? %s ????????????";
    };
    be.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "?????????????? ?? %s ???? %s";
    };
    be.prototype.atX0SecondsPastTheMinute = function () {
        return "?? %s ????????????";
    };
    be.prototype.everyX0Minutes = function () {
        return "???????????? %s ????????????";
    };
    be.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "?????????????? ?? %s ???? %s";
    };
    be.prototype.atX0MinutesPastTheHour = function () {
        return "?? %s ????????????";
    };
    be.prototype.everyX0Hours = function () {
        return "???????????? %s ????????????";
    };
    be.prototype.betweenX0AndX1 = function () {
        return "?? %s ???? %s";
    };
    be.prototype.atX0 = function () {
        return "?? %s";
    };
    be.prototype.commaEveryDay = function () {
        return ", ?????????? ??????????";
    };
    be.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ???????????? %s ???????? ??????????";
    };
    be.prototype.commaX0ThroughX1 = function () {
        return ", %s ???? %s";
    };
    be.prototype.first = function () {
        return "??????????";
    };
    be.prototype.second = function () {
        return "??????????";
    };
    be.prototype.third = function () {
        return "??????????";
    };
    be.prototype.fourth = function () {
        return "????????????????";
    };
    be.prototype.fifth = function () {
        return "????????";
    };
    be.prototype.commaOnThe = function () {
        return ", ?? ";
    };
    be.prototype.spaceX0OfTheMonth = function () {
        return " %s ????????????";
    };
    be.prototype.lastDay = function () {
        return "???????????? ??????????";
    };
    be.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ?? ???????????? %s ????????????";
    };
    be.prototype.commaOnlyOnX0 = function () {
        return ", ???????????? ?? %s";
    };
    be.prototype.commaAndOnX0 = function () {
        return ", ?? ?? %s";
    };
    be.prototype.commaEveryX0Months = function () {
        return ", ???????????? %s ??????????????";
    };
    be.prototype.commaOnlyInX0 = function () {
        return ", ???????????? ?? %s";
    };
    be.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ?? ???????????? ?????????? ????????????";
    };
    be.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ?? ???????????? ?????????? ?????????? ????????????";
    };
    be.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ???????? ???? ???????????????? ?????? ????????????";
    };
    be.prototype.firstWeekday = function () {
        return "?????????? ?????????? ??????????";
    };
    be.prototype.weekdayNearestDayX0 = function () {
        return "?????????????????????? ?????????? ?????????? ???? %s";
    };
    be.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ?? %s ????????????";
    };
    be.prototype.commaEveryX0Days = function () {
        return ", ???????????? %s ????????";
    };
    be.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ?? %s ???? %s ?????? ????????????";
    };
    be.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ?? %s ?????? ????????????";
    };
    be.prototype.commaEveryX0Years = function () {
        return ", ???????????? %s ??????????";
    };
    be.prototype.commaStartingX0 = function () {
        return ", ?????????????? %s";
    };
    be.prototype.daysOfTheWeek = function () {
        return ["??????????????", "????????????????????", "??????????????", "????????????", "????????????", "??????????????", "????????????"];
    };
    be.prototype.monthsOfTheYear = function () {
        return [
            "????????????????",
            "????????",
            "??????????????",
            "????????????????",
            "??????????????",
            "??????????????",
            "????????????",
            "??????????????",
            "????????????????",
            "????????????????????",
            "????????????????",
            "??????????????",
        ];
    };
    return be;
}());
exports.be = be;


/***/ }),

/***/ 708:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ca = void 0;
var ca = (function () {
    function ca() {
    }
    ca.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ca.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ca.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ca.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ca.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ca.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "S'ha produ??t un error mentres es generava la descripci?? de l'expressi??. Revisi la sintaxi de la expressi?? de cron.";
    };
    ca.prototype.at = function () {
        return "A les";
    };
    ca.prototype.atSpace = function () {
        return "A les ";
    };
    ca.prototype.atX0 = function () {
        return "a les %s";
    };
    ca.prototype.atX0MinutesPastTheHour = function () {
        return "als %s minuts de l'hora";
    };
    ca.prototype.atX0SecondsPastTheMinute = function () {
        return "als %s segonds del minut";
    };
    ca.prototype.betweenX0AndX1 = function () {
        return "entre les %s i les %s";
    };
    ca.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre els dies %s i %s del mes";
    };
    ca.prototype.commaEveryDay = function () {
        return ", cada dia";
    };
    ca.prototype.commaEveryX0Days = function () {
        return ", cada %s dies";
    };
    ca.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", cada %s dies de la setmana";
    };
    ca.prototype.commaEveryX0Months = function () {
        return ", cada %s mesos";
    };
    ca.prototype.commaOnDayX0OfTheMonth = function () {
        return ", el dia %s del mes";
    };
    ca.prototype.commaOnlyInX0 = function () {
        return ", s??lo en %s";
    };
    ca.prototype.commaOnlyOnX0 = function () {
        return ", nom??s el %s";
    };
    ca.prototype.commaAndOnX0 = function () {
        return ", i el %s";
    };
    ca.prototype.commaOnThe = function () {
        return ", en el ";
    };
    ca.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", en l'??ltim dia del mes";
    };
    ca.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", en l'??ltim dia de la setmana del mes";
    };
    ca.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dies abans de l'??ltim dia del mes";
    };
    ca.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", en l'??ltim %s del mes";
    };
    ca.prototype.commaOnTheX0OfTheMonth = function () {
        return ", en el %s del mes";
    };
    ca.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    ca.prototype.everyHour = function () {
        return "cada hora";
    };
    ca.prototype.everyMinute = function () {
        return "cada minut";
    };
    ca.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "cada minut entre les %s i les %s";
    };
    ca.prototype.everySecond = function () {
        return "cada segon";
    };
    ca.prototype.everyX0Hours = function () {
        return "cada %s hores";
    };
    ca.prototype.everyX0Minutes = function () {
        return "cada %s minuts";
    };
    ca.prototype.everyX0Seconds = function () {
        return "cada %s segons";
    };
    ca.prototype.fifth = function () {
        return "cinqu??";
    };
    ca.prototype.first = function () {
        return "primer";
    };
    ca.prototype.firstWeekday = function () {
        return "primer dia de la setmana";
    };
    ca.prototype.fourth = function () {
        return "quart";
    };
    ca.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "del minut %s al %s passada l'hora";
    };
    ca.prototype.second = function () {
        return "segon";
    };
    ca.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "En els segons %s al %s de cada minut";
    };
    ca.prototype.spaceAnd = function () {
        return " i";
    };
    ca.prototype.spaceX0OfTheMonth = function () {
        return " %s del mes";
    };
    ca.prototype.lastDay = function () {
        return "l'??ltim dia";
    };
    ca.prototype.third = function () {
        return "tercer";
    };
    ca.prototype.weekdayNearestDayX0 = function () {
        return "dia de la setmana m??s proper al %s";
    };
    ca.prototype.commaEveryX0Years = function () {
        return ", cada %s anys";
    };
    ca.prototype.commaStartingX0 = function () {
        return ", comen??ant %s";
    };
    ca.prototype.daysOfTheWeek = function () {
        return ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"];
    };
    ca.prototype.monthsOfTheYear = function () {
        return [
            "gener",
            "febrer",
            "mar??",
            "abril",
            "maig",
            "juny",
            "juliol",
            "agost",
            "setembre",
            "octubre",
            "novembre",
            "desembre",
        ];
    };
    return ca;
}());
exports.ca = ca;


/***/ }),

/***/ 674:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cs = void 0;
var cs = (function () {
    function cs() {
    }
    cs.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    cs.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    cs.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    cs.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    cs.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    cs.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "P??i vytv????en?? popisu do??lo k chyb??. Zkontrolujte pros??m spr??vnost syntaxe cronu.";
    };
    cs.prototype.everyMinute = function () {
        return "ka??dou minutu";
    };
    cs.prototype.everyHour = function () {
        return "ka??dou hodinu";
    };
    cs.prototype.atSpace = function () {
        return "V ";
    };
    cs.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Ka??dou minutu mezi %s a %s";
    };
    cs.prototype.at = function () {
        return "V";
    };
    cs.prototype.spaceAnd = function () {
        return " a";
    };
    cs.prototype.everySecond = function () {
        return "ka??dou sekundu";
    };
    cs.prototype.everyX0Seconds = function () {
        return "ka??d??ch %s sekund";
    };
    cs.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    cs.prototype.atX0SecondsPastTheMinute = function () {
        return "v %s sekund";
    };
    cs.prototype.everyX0Minutes = function () {
        return "ka??d??ch %s minut";
    };
    cs.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    cs.prototype.atX0MinutesPastTheHour = function () {
        return "v %s minut";
    };
    cs.prototype.everyX0Hours = function () {
        return "ka??d??ch %s hodin";
    };
    cs.prototype.betweenX0AndX1 = function () {
        return "mezi %s a %s";
    };
    cs.prototype.atX0 = function () {
        return "v %s";
    };
    cs.prototype.commaEveryDay = function () {
        return ", ka??d?? den";
    };
    cs.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ka??d??ch %s dn?? v t??dnu";
    };
    cs.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    cs.prototype.first = function () {
        return "prvn??";
    };
    cs.prototype.second = function () {
        return "druh??";
    };
    cs.prototype.third = function () {
        return "t??et??";
    };
    cs.prototype.fourth = function () {
        return "??tvrt??";
    };
    cs.prototype.fifth = function () {
        return "p??t??";
    };
    cs.prototype.commaOnThe = function () {
        return ", ";
    };
    cs.prototype.spaceX0OfTheMonth = function () {
        return " %s v m??s??ci";
    };
    cs.prototype.lastDay = function () {
        return "posledn?? den";
    };
    cs.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", posledn?? %s v m??s??ci";
    };
    cs.prototype.commaOnlyOnX0 = function () {
        return ", pouze v %s";
    };
    cs.prototype.commaAndOnX0 = function () {
        return ", a v %s";
    };
    cs.prototype.commaEveryX0Months = function () {
        return ", ka??d??ch %s m??s??c??";
    };
    cs.prototype.commaOnlyInX0 = function () {
        return ", pouze v %s";
    };
    cs.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", posledn?? den v m??s??ci";
    };
    cs.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", posledn?? pracovn?? den v m??s??ci";
    };
    cs.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dn?? p??ed posledn??m dnem v m??s??ci";
    };
    cs.prototype.firstWeekday = function () {
        return "prvn?? pracovn?? den";
    };
    cs.prototype.weekdayNearestDayX0 = function () {
        return "pracovn?? den nejbl????e %s. dni";
    };
    cs.prototype.commaOnTheX0OfTheMonth = function () {
        return ", v %s v m??s??ci";
    };
    cs.prototype.commaEveryX0Days = function () {
        return ", ka??d??ch %s dn??";
    };
    cs.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mezi dny %s a %s v m??s??ci";
    };
    cs.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. den v m??s??ci";
    };
    cs.prototype.commaEveryX0Years = function () {
        return ", ka??d??ch %s rok??";
    };
    cs.prototype.commaStartingX0 = function () {
        return ", za????naj??c?? %s";
    };
    cs.prototype.daysOfTheWeek = function () {
        return ["Ned??le", "Pond??l??", "??ter??", "St??eda", "??tvrtek", "P??tek", "Sobota"];
    };
    cs.prototype.monthsOfTheYear = function () {
        return [
            "Leden",
            "??nor",
            "B??ezen",
            "Duben",
            "Kv??ten",
            "??erven",
            "??ervenec",
            "Srpen",
            "Z??????",
            "????jen",
            "Listopad",
            "Prosinec",
        ];
    };
    return cs;
}());
exports.cs = cs;


/***/ }),

/***/ 904:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.da = void 0;
var da = (function () {
    function da() {
    }
    da.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    da.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Der opstod en fejl ved generering af udtryksbeskrivelsen. Tjek cron-ekspressionssyntaxen.";
    };
    da.prototype.at = function () {
        return "kl";
    };
    da.prototype.atSpace = function () {
        return "kl ";
    };
    da.prototype.atX0 = function () {
        return "kl %s";
    };
    da.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutter efter timeskift";
    };
    da.prototype.atX0SecondsPastTheMinute = function () {
        return "%s sekunder efter minutskift";
    };
    da.prototype.betweenX0AndX1 = function () {
        return "mellem %s og %s";
    };
    da.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellem dag %s og %s i m??neden";
    };
    da.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    da.prototype.commaEveryX0Days = function () {
        return ", hver %s. dag";
    };
    da.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", hver %s. ugedag";
    };
    da.prototype.commaEveryX0Months = function () {
        return ", hver %s. m??ned";
    };
    da.prototype.commaEveryX0Years = function () {
        return ", hvert %s. ??r";
    };
    da.prototype.commaOnDayX0OfTheMonth = function () {
        return ", p?? dag %s i m??neden";
    };
    da.prototype.commaOnlyInX0 = function () {
        return ", kun i %s";
    };
    da.prototype.commaOnlyOnX0 = function () {
        return ", kun p?? %s";
    };
    da.prototype.commaAndOnX0 = function () {
        return ", og p?? %s";
    };
    da.prototype.commaOnThe = function () {
        return ", p?? den ";
    };
    da.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", p?? den sidste dag i m??neden";
    };
    da.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", p?? den sidste hverdag i m??neden";
    };
    da.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dage f??r den sidste dag i m??neden";
    };
    da.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", p?? den sidste %s i m??neden";
    };
    da.prototype.commaOnTheX0OfTheMonth = function () {
        return ", p?? den %s i m??neden";
    };
    da.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    da.prototype.everyHour = function () {
        return "hver time";
    };
    da.prototype.everyMinute = function () {
        return "hvert minut";
    };
    da.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "hvert minut mellem %s og %s";
    };
    da.prototype.everySecond = function () {
        return "hvert sekund";
    };
    da.prototype.everyX0Hours = function () {
        return "hver %s. time";
    };
    da.prototype.everyX0Minutes = function () {
        return "hvert %s. minut";
    };
    da.prototype.everyX0Seconds = function () {
        return "hvert %s. sekund";
    };
    da.prototype.fifth = function () {
        return "femte";
    };
    da.prototype.first = function () {
        return "f??rste";
    };
    da.prototype.firstWeekday = function () {
        return "f??rste hverdag";
    };
    da.prototype.fourth = function () {
        return "fjerde";
    };
    da.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutterne fra %s til og med %s hver time";
    };
    da.prototype.second = function () {
        return "anden";
    };
    da.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderne fra %s til og med %s hvert minut";
    };
    da.prototype.spaceAnd = function () {
        return " og";
    };
    da.prototype.spaceX0OfTheMonth = function () {
        return " %s i m??neden";
    };
    da.prototype.lastDay = function () {
        return "sidste dag";
    };
    da.prototype.third = function () {
        return "tredje";
    };
    da.prototype.weekdayNearestDayX0 = function () {
        return "hverdag n??rmest dag %s";
    };
    da.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    da.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    da.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    da.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    da.prototype.commaStartingX0 = function () {
        return ", startende %s";
    };
    da.prototype.daysOfTheWeek = function () {
        return ["s??ndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "l??rdag"];
    };
    da.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "marts",
            "april",
            "maj",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return da;
}());
exports.da = da;


/***/ }),

/***/ 511:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.de = void 0;
var de = (function () {
    function de() {
    }
    de.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    de.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    de.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    de.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    de.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    de.prototype.everyMinute = function () {
        return "jede Minute";
    };
    de.prototype.everyHour = function () {
        return "jede Stunde";
    };
    de.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Beim Generieren der Ausdrucksbeschreibung ist ein Fehler aufgetreten. ??berpr??fen Sie die Syntax des Cron-Ausdrucks.";
    };
    de.prototype.atSpace = function () {
        return "Um ";
    };
    de.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Jede Minute zwischen %s und %s";
    };
    de.prototype.at = function () {
        return "Um";
    };
    de.prototype.spaceAnd = function () {
        return " und";
    };
    de.prototype.everySecond = function () {
        return "Jede Sekunde";
    };
    de.prototype.everyX0Seconds = function () {
        return "alle %s Sekunden";
    };
    de.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "Sekunden %s bis %s";
    };
    de.prototype.atX0SecondsPastTheMinute = function () {
        return "bei Sekunde %s";
    };
    de.prototype.everyX0Minutes = function () {
        return "alle %s Minuten";
    };
    de.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "Minuten %s bis %s";
    };
    de.prototype.atX0MinutesPastTheHour = function () {
        return "bei Minute %s";
    };
    de.prototype.everyX0Hours = function () {
        return "alle %s Stunden";
    };
    de.prototype.betweenX0AndX1 = function () {
        return "zwischen %s und %s";
    };
    de.prototype.atX0 = function () {
        return "um %s";
    };
    de.prototype.commaEveryDay = function () {
        return ", jeden Tag";
    };
    de.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", alle %s Tage der Woche";
    };
    de.prototype.commaX0ThroughX1 = function () {
        return ", %s bis %s";
    };
    de.prototype.first = function () {
        return "ersten";
    };
    de.prototype.second = function () {
        return "zweiten";
    };
    de.prototype.third = function () {
        return "dritten";
    };
    de.prototype.fourth = function () {
        return "vierten";
    };
    de.prototype.fifth = function () {
        return "f??nften";
    };
    de.prototype.commaOnThe = function () {
        return ", am ";
    };
    de.prototype.spaceX0OfTheMonth = function () {
        return " %s des Monats";
    };
    de.prototype.lastDay = function () {
        return "der letzte Tag";
    };
    de.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", am letzten %s des Monats";
    };
    de.prototype.commaOnlyOnX0 = function () {
        return ", nur jeden %s";
    };
    de.prototype.commaAndOnX0 = function () {
        return ", und jeden %s";
    };
    de.prototype.commaEveryX0Months = function () {
        return ", alle %s Monate";
    };
    de.prototype.commaOnlyInX0 = function () {
        return ", nur im %s";
    };
    de.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", am letzten Tag des Monats";
    };
    de.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", am letzten Werktag des Monats";
    };
    de.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s tage vor dem letzten Tag des Monats";
    };
    de.prototype.firstWeekday = function () {
        return "ersten Werktag";
    };
    de.prototype.weekdayNearestDayX0 = function () {
        return "Werktag am n??chsten zum %s Tag";
    };
    de.prototype.commaOnTheX0OfTheMonth = function () {
        return ", am %s des Monats";
    };
    de.prototype.commaEveryX0Days = function () {
        return ", alle %s Tage";
    };
    de.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", zwischen Tag %s und %s des Monats";
    };
    de.prototype.commaOnDayX0OfTheMonth = function () {
        return ", an Tag %s des Monats";
    };
    de.prototype.commaEveryX0Years = function () {
        return ", alle %s Jahre";
    };
    de.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    de.prototype.daysOfTheWeek = function () {
        return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    };
    de.prototype.monthsOfTheYear = function () {
        return [
            "Januar",
            "Februar",
            "M??rz",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember",
        ];
    };
    return de;
}());
exports.de = de;


/***/ }),

/***/ 751:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.en = void 0;
var en = (function () {
    function en() {
    }
    en.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    en.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    en.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    en.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    en.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    en.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    };
    en.prototype.everyMinute = function () {
        return "every minute";
    };
    en.prototype.everyHour = function () {
        return "every hour";
    };
    en.prototype.atSpace = function () {
        return "At ";
    };
    en.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Every minute between %s and %s";
    };
    en.prototype.at = function () {
        return "At";
    };
    en.prototype.spaceAnd = function () {
        return " and";
    };
    en.prototype.everySecond = function () {
        return "every second";
    };
    en.prototype.everyX0Seconds = function () {
        return "every %s seconds";
    };
    en.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconds %s through %s past the minute";
    };
    en.prototype.atX0SecondsPastTheMinute = function () {
        return "at %s seconds past the minute";
    };
    en.prototype.everyX0Minutes = function () {
        return "every %s minutes";
    };
    en.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    en.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    en.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    en.prototype.betweenX0AndX1 = function () {
        return "between %s and %s";
    };
    en.prototype.atX0 = function () {
        return "at %s";
    };
    en.prototype.commaEveryDay = function () {
        return ", every day";
    };
    en.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    en.prototype.commaX0ThroughX1 = function () {
        return ", %s through %s";
    };
    en.prototype.first = function () {
        return "first";
    };
    en.prototype.second = function () {
        return "second";
    };
    en.prototype.third = function () {
        return "third";
    };
    en.prototype.fourth = function () {
        return "fourth";
    };
    en.prototype.fifth = function () {
        return "fifth";
    };
    en.prototype.commaOnThe = function () {
        return ", on the ";
    };
    en.prototype.spaceX0OfTheMonth = function () {
        return " %s of the month";
    };
    en.prototype.lastDay = function () {
        return "the last day";
    };
    en.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", on the last %s of the month";
    };
    en.prototype.commaOnlyOnX0 = function () {
        return ", only on %s";
    };
    en.prototype.commaAndOnX0 = function () {
        return ", and on %s";
    };
    en.prototype.commaEveryX0Months = function () {
        return ", every %s months";
    };
    en.prototype.commaOnlyInX0 = function () {
        return ", only in %s";
    };
    en.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", on the last day of the month";
    };
    en.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", on the last weekday of the month";
    };
    en.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s days before the last day of the month";
    };
    en.prototype.firstWeekday = function () {
        return "first weekday";
    };
    en.prototype.weekdayNearestDayX0 = function () {
        return "weekday nearest day %s";
    };
    en.prototype.commaOnTheX0OfTheMonth = function () {
        return ", on the %s of the month";
    };
    en.prototype.commaEveryX0Days = function () {
        return ", every %s days";
    };
    en.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", between day %s and %s of the month";
    };
    en.prototype.commaOnDayX0OfTheMonth = function () {
        return ", on day %s of the month";
    };
    en.prototype.commaEveryHour = function () {
        return ", every hour";
    };
    en.prototype.commaEveryX0Years = function () {
        return ", every %s years";
    };
    en.prototype.commaStartingX0 = function () {
        return ", starting %s";
    };
    en.prototype.daysOfTheWeek = function () {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    };
    en.prototype.monthsOfTheYear = function () {
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
    };
    return en;
}());
exports.en = en;


/***/ }),

/***/ 470:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.es = void 0;
var es = (function () {
    function es() {
    }
    es.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    es.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    es.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    es.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    es.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    es.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocurri?? un error mientras se generaba la descripci??n de la expresi??n. Revise la sintaxis de la expresi??n de cron.";
    };
    es.prototype.at = function () {
        return "A las";
    };
    es.prototype.atSpace = function () {
        return "A las ";
    };
    es.prototype.atX0 = function () {
        return "a las %s";
    };
    es.prototype.atX0MinutesPastTheHour = function () {
        return "a los %s minutos de la hora";
    };
    es.prototype.atX0SecondsPastTheMinute = function () {
        return "a los %s segundos del minuto";
    };
    es.prototype.betweenX0AndX1 = function () {
        return "entre las %s y las %s";
    };
    es.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre los d??as %s y %s del mes";
    };
    es.prototype.commaEveryDay = function () {
        return ", cada d??a";
    };
    es.prototype.commaEveryX0Days = function () {
        return ", cada %s d??as";
    };
    es.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", cada %s d??as de la semana";
    };
    es.prototype.commaEveryX0Months = function () {
        return ", cada %s meses";
    };
    es.prototype.commaOnDayX0OfTheMonth = function () {
        return ", el d??a %s del mes";
    };
    es.prototype.commaOnlyInX0 = function () {
        return ", s??lo en %s";
    };
    es.prototype.commaOnlyOnX0 = function () {
        return ", s??lo el %s";
    };
    es.prototype.commaAndOnX0 = function () {
        return ", y el %s";
    };
    es.prototype.commaOnThe = function () {
        return ", en el ";
    };
    es.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", en el ??ltimo d??a del mes";
    };
    es.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", en el ??ltimo d??a de la semana del mes";
    };
    es.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s d??as antes del ??ltimo d??a del mes";
    };
    es.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", en el ??ltimo %s del mes";
    };
    es.prototype.commaOnTheX0OfTheMonth = function () {
        return ", en el %s del mes";
    };
    es.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    es.prototype.everyHour = function () {
        return "cada hora";
    };
    es.prototype.everyMinute = function () {
        return "cada minuto";
    };
    es.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "cada minuto entre las %s y las %s";
    };
    es.prototype.everySecond = function () {
        return "cada segundo";
    };
    es.prototype.everyX0Hours = function () {
        return "cada %s horas";
    };
    es.prototype.everyX0Minutes = function () {
        return "cada %s minutos";
    };
    es.prototype.everyX0Seconds = function () {
        return "cada %s segundos";
    };
    es.prototype.fifth = function () {
        return "quinto";
    };
    es.prototype.first = function () {
        return "primero";
    };
    es.prototype.firstWeekday = function () {
        return "primer d??a de la semana";
    };
    es.prototype.fourth = function () {
        return "cuarto";
    };
    es.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "del minuto %s al %s pasada la hora";
    };
    es.prototype.second = function () {
        return "segundo";
    };
    es.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "En los segundos %s al %s de cada minuto";
    };
    es.prototype.spaceAnd = function () {
        return " y";
    };
    es.prototype.spaceX0OfTheMonth = function () {
        return " %s del mes";
    };
    es.prototype.lastDay = function () {
        return "el ??ltimo d??a";
    };
    es.prototype.third = function () {
        return "tercer";
    };
    es.prototype.weekdayNearestDayX0 = function () {
        return "d??a de la semana m??s pr??ximo al %s";
    };
    es.prototype.commaEveryX0Years = function () {
        return ", cada %s a??os";
    };
    es.prototype.commaStartingX0 = function () {
        return ", comenzando %s";
    };
    es.prototype.daysOfTheWeek = function () {
        return ["domingo", "lunes", "martes", "mi??rcoles", "jueves", "viernes", "s??bado"];
    };
    es.prototype.monthsOfTheYear = function () {
        return [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];
    };
    return es;
}());
exports.es = es;


/***/ }),

/***/ 384:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fa = void 0;
var fa = (function () {
    function fa() {
    }
    fa.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fa.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    fa.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fa.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fa.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    fa.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "?????????? ???? ?????????? ?????????????? ?????? ?????????? ???? ??????. ???????? ???????????? ???? ???? ?????????? ????????.";
    };
    fa.prototype.everyMinute = function () {
        return "???? ??????????";
    };
    fa.prototype.everyHour = function () {
        return "???? ????????";
    };
    fa.prototype.atSpace = function () {
        return "???? ";
    };
    fa.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "???? ?????????? ?????? %s ?? %s";
    };
    fa.prototype.at = function () {
        return "????";
    };
    fa.prototype.spaceAnd = function () {
        return " ??";
    };
    fa.prototype.everySecond = function () {
        return "???? ??????????";
    };
    fa.prototype.everyX0Seconds = function () {
        return "???? %s ??????????";
    };
    fa.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "?????????? %s ???? %s ?????????? ??????????";
    };
    fa.prototype.atX0SecondsPastTheMinute = function () {
        return "???? %s ?????????? ???? ?????????? ??????????";
    };
    fa.prototype.everyX0Minutes = function () {
        return "???? %s ??????????";
    };
    fa.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "?????????? %s ???? %s ???????? ??????????";
    };
    fa.prototype.atX0MinutesPastTheHour = function () {
        return "???? %s ?????????? ???? ???? ????????";
    };
    fa.prototype.everyX0Hours = function () {
        return "???? %s ????????";
    };
    fa.prototype.betweenX0AndX1 = function () {
        return "?????? %s ?? %s";
    };
    fa.prototype.atX0 = function () {
        return "???? %s";
    };
    fa.prototype.commaEveryDay = function () {
        return ", ???? ??????";
    };
    fa.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ???? %s ?????? ???? ????????";
    };
    fa.prototype.commaX0ThroughX1 = function () {
        return ", %s ???? %s";
    };
    fa.prototype.first = function () {
        return "??????";
    };
    fa.prototype.second = function () {
        return "??????";
    };
    fa.prototype.third = function () {
        return "??????";
    };
    fa.prototype.fourth = function () {
        return "??????????";
    };
    fa.prototype.fifth = function () {
        return "????????";
    };
    fa.prototype.commaOnThe = function () {
        return ", ???? ";
    };
    fa.prototype.spaceX0OfTheMonth = function () {
        return " %s ??????";
    };
    fa.prototype.lastDay = function () {
        return "?????????? ??????";
    };
    fa.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ???? %s ??????";
    };
    fa.prototype.commaOnlyOnX0 = function () {
        return ", ?????? ???? %s";
    };
    fa.prototype.commaAndOnX0 = function () {
        return ", ?? ???? %s";
    };
    fa.prototype.commaEveryX0Months = function () {
        return ", ???? %s ??????";
    };
    fa.prototype.commaOnlyInX0 = function () {
        return ", ?????? ???? %s";
    };
    fa.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ???? ?????????? ?????? ??????";
    };
    fa.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ???? ?????????? ?????? ??????";
    };
    fa.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ?????? ?????? ???? ?????????? ?????? ??????";
    };
    fa.prototype.firstWeekday = function () {
        return "?????????? ??????";
    };
    fa.prototype.weekdayNearestDayX0 = function () {
        return "?????? ?????????? ???? ?????? %s";
    };
    fa.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ???? %s ??????";
    };
    fa.prototype.commaEveryX0Days = function () {
        return ", ???? %s ??????";
    };
    fa.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ?????? ?????? %s ?? %s ??????";
    };
    fa.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ???? %s ??????";
    };
    fa.prototype.commaEveryMinute = function () {
        return ", ???? minute";
    };
    fa.prototype.commaEveryHour = function () {
        return ", ???? ????????";
    };
    fa.prototype.commaEveryX0Years = function () {
        return ", ???? %s ??????";
    };
    fa.prototype.commaStartingX0 = function () {
        return ", ???????? %s";
    };
    fa.prototype.daysOfTheWeek = function () {
        return ["???????????????", "????????????", "???????????????", "????????????????", "?????????????????", "????????", "????????"];
    };
    fa.prototype.monthsOfTheYear = function () {
        return ["????????????", "??????????", "????????", "??????????", "????", "????????", "??????????", "??????????", "??????????????", "??????????", "????????????", "????????????"];
    };
    return fa;
}());
exports.fa = fa;


/***/ }),

/***/ 578:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fi = void 0;
var fi = (function () {
    function fi() {
    }
    fi.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    fi.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Virhe kuvauksen generoinnissa. Tarkista cron-syntaksi.";
    };
    fi.prototype.at = function () {
        return "Klo";
    };
    fi.prototype.atSpace = function () {
        return "Klo ";
    };
    fi.prototype.atX0 = function () {
        return "klo %s";
    };
    fi.prototype.atX0MinutesPastTheHour = function () {
        return "%s minuuttia yli";
    };
    fi.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "%s minuuttia yli";
    };
    fi.prototype.atX0SecondsPastTheMinute = function () {
        return "%s sekunnnin j??lkeen";
    };
    fi.prototype.betweenX0AndX1 = function () {
        return "%s - %s v??lill??";
    };
    fi.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", kuukauden p??ivien %s ja %s v??lill??";
    };
    fi.prototype.commaEveryDay = function () {
        return ", joka p??iv??";
    };
    fi.prototype.commaEveryHour = function () {
        return ", joka tunti";
    };
    fi.prototype.commaEveryMinute = function () {
        return ", joka minuutti";
    };
    fi.prototype.commaEveryX0Days = function () {
        return ", joka %s. p??iv??";
    };
    fi.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", joka %s. viikonp??iv??";
    };
    fi.prototype.commaEveryX0Months = function () {
        return ", joka %s. kuukausi";
    };
    fi.prototype.commaEveryX0Years = function () {
        return ", joka %s. vuosi";
    };
    fi.prototype.commaOnDayX0OfTheMonth = function () {
        return ", kuukauden %s p??iv??";
    };
    fi.prototype.commaOnlyInX0 = function () {
        return ", vain %s";
    };
    fi.prototype.commaOnlyOnX0 = function () {
        return ", vain %s";
    };
    fi.prototype.commaOnThe = function () {
        return ",";
    };
    fi.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", kuukauden viimeisen?? p??iv??n??";
    };
    fi.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", kuukauden viimeisen?? viikonp??iv??n??";
    };
    fi.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", kuukauden viimeinen %s";
    };
    fi.prototype.commaOnTheX0OfTheMonth = function () {
        return ", kuukauden %s";
    };
    fi.prototype.commaX0ThroughX1 = function () {
        return ", %s - %s";
    };
    fi.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s p??iv???? ennen kuukauden viimeist?? p??iv????";
    };
    fi.prototype.commaStartingX0 = function () {
        return ", alkaen %s";
    };
    fi.prototype.everyHour = function () {
        return "joka tunti";
    };
    fi.prototype.everyMinute = function () {
        return "joka minuutti";
    };
    fi.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "joka minuutti %s - %s v??lill??";
    };
    fi.prototype.everySecond = function () {
        return "joka sekunti";
    };
    fi.prototype.everyX0Hours = function () {
        return "joka %s. tunti";
    };
    fi.prototype.everyX0Minutes = function () {
        return "joka %s. minuutti";
    };
    fi.prototype.everyX0Seconds = function () {
        return "joka %s. sekunti";
    };
    fi.prototype.fifth = function () {
        return "viides";
    };
    fi.prototype.first = function () {
        return "ensimm??inen";
    };
    fi.prototype.firstWeekday = function () {
        return "ensimm??inen viikonp??iv??";
    };
    fi.prototype.fourth = function () {
        return "nelj??s";
    };
    fi.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "joka tunti minuuttien %s - %s v??lill??";
    };
    fi.prototype.second = function () {
        return "toinen";
    };
    fi.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "joka minuutti sekunttien %s - %s v??lill??";
    };
    fi.prototype.spaceAnd = function () {
        return " ja";
    };
    fi.prototype.spaceAndSpace = function () {
        return " ja ";
    };
    fi.prototype.spaceX0OfTheMonth = function () {
        return " %s kuukaudessa";
    };
    fi.prototype.third = function () {
        return "kolmas";
    };
    fi.prototype.weekdayNearestDayX0 = function () {
        return "viikonp??iv?? l??hint?? %s p??iv????";
    };
    fi.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fi.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fi.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fi.prototype.lastDay = function () {
        return "viimeinen p??iv??";
    };
    fi.prototype.commaAndOnX0 = function () {
        return ", ja edelleen %s";
    };
    fi.prototype.daysOfTheWeek = function () {
        return ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
    };
    fi.prototype.monthsOfTheYear = function () {
        return [
            "tammikuu",
            "helmikuu",
            "maaliskuu",
            "huhtikuu",
            "toukokuu",
            "kes??kuu",
            "hein??kuu",
            "elokuu",
            "syyskuu",
            "lokakuu",
            "marraskuu",
            "joulukuu",
        ];
    };
    return fi;
}());
exports.fi = fi;


/***/ }),

/***/ 953:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fr = void 0;
var fr = (function () {
    function fr() {
    }
    fr.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fr.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    fr.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fr.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fr.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    fr.prototype.everyMinute = function () {
        return "toutes les minutes";
    };
    fr.prototype.everyHour = function () {
        return "toutes les heures";
    };
    fr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Une erreur est survenue en g??n??rant la description de l'expression cron. V??rifiez sa syntaxe.";
    };
    fr.prototype.atSpace = function () {
        return "?? ";
    };
    fr.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Toutes les minutes entre %s et %s";
    };
    fr.prototype.at = function () {
        return "??";
    };
    fr.prototype.spaceAnd = function () {
        return " et";
    };
    fr.prototype.everySecond = function () {
        return "toutes les secondes";
    };
    fr.prototype.everyX0Seconds = function () {
        return "toutes les %s secondes";
    };
    fr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "les secondes entre %s et %s apr??s la minute";
    };
    fr.prototype.atX0SecondsPastTheMinute = function () {
        return "%s secondes apr??s la minute";
    };
    fr.prototype.everyX0Minutes = function () {
        return "toutes les %s minutes";
    };
    fr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "les minutes entre %s et %s apr??s l'heure";
    };
    fr.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutes apr??s l'heure";
    };
    fr.prototype.everyX0Hours = function () {
        return "toutes les %s heures";
    };
    fr.prototype.betweenX0AndX1 = function () {
        return "de %s ?? %s";
    };
    fr.prototype.atX0 = function () {
        return "?? %s";
    };
    fr.prototype.commaEveryDay = function () {
        return ", tous les jours";
    };
    fr.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    fr.prototype.commaX0ThroughX1 = function () {
        return ", de %s ?? %s";
    };
    fr.prototype.first = function () {
        return "premier";
    };
    fr.prototype.second = function () {
        return "second";
    };
    fr.prototype.third = function () {
        return "troisi??me";
    };
    fr.prototype.fourth = function () {
        return "quatri??me";
    };
    fr.prototype.fifth = function () {
        return "cinqui??me";
    };
    fr.prototype.commaOnThe = function () {
        return ", le ";
    };
    fr.prototype.spaceX0OfTheMonth = function () {
        return " %s du mois";
    };
    fr.prototype.lastDay = function () {
        return "le dernier jour";
    };
    fr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", le dernier %s du mois";
    };
    fr.prototype.commaOnlyOnX0 = function () {
        return ", uniquement le %s";
    };
    fr.prototype.commaAndOnX0 = function () {
        return ", et %s";
    };
    fr.prototype.commaEveryX0Months = function () {
        return ", tous les %s mois";
    };
    fr.prototype.commaOnlyInX0 = function () {
        return ", uniquement en %s";
    };
    fr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", le dernier jour du mois";
    };
    fr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", le dernier jour ouvrable du mois";
    };
    fr.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s jours avant le dernier jour du mois";
    };
    fr.prototype.firstWeekday = function () {
        return "premier jour ouvrable";
    };
    fr.prototype.weekdayNearestDayX0 = function () {
        return "jour ouvrable le plus proche du %s";
    };
    fr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Days = function () {
        return ", tous les %s jours";
    };
    fr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", du %s au %s du mois";
    };
    fr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Years = function () {
        return ", tous les %s ans";
    };
    fr.prototype.commaDaysX0ThroughX1 = function () {
        return ", du %s au %s";
    };
    fr.prototype.commaStartingX0 = function () {
        return ", d??part %s";
    };
    fr.prototype.daysOfTheWeek = function () {
        return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    };
    fr.prototype.monthsOfTheYear = function () {
        return [
            "janvier",
            "f??vrier",
            "mars",
            "avril",
            "mai",
            "juin",
            "juillet",
            "ao??t",
            "septembre",
            "octobre",
            "novembre",
            "d??cembre",
        ];
    };
    return fr;
}());
exports.fr = fr;


/***/ }),

/***/ 389:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.he = void 0;
var he = (function () {
    function he() {
    }
    he.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    he.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    he.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    he.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    he.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    he.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "?????????? ?????????? ?????? ?????????? ?????????? ????????????. ???????? ???? ?????????? ???????????? cron.";
    };
    he.prototype.everyMinute = function () {
        return "???? ??????";
    };
    he.prototype.everyHour = function () {
        return "???? ??????";
    };
    he.prototype.atSpace = function () {
        return "?? ";
    };
    he.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "???? ?????? %s ???? %s";
    };
    he.prototype.at = function () {
        return "??";
    };
    he.prototype.spaceAnd = function () {
        return " ??";
    };
    he.prototype.everySecond = function () {
        return "???? ????????";
    };
    he.prototype.everyX0Seconds = function () {
        return "???? %s ??????????";
    };
    he.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "%s ???? %s ?????????? ???? ????????";
    };
    he.prototype.atX0SecondsPastTheMinute = function () {
        return "?? %s ?????????? ???? ????????";
    };
    he.prototype.everyX0Minutes = function () {
        return "???? %s ????????";
    };
    he.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "%s ???? %s ???????? ???? ????????";
    };
    he.prototype.atX0MinutesPastTheHour = function () {
        return "?? %s ???????? ???? ????????";
    };
    he.prototype.everyX0Hours = function () {
        return "???? %s ????????";
    };
    he.prototype.betweenX0AndX1 = function () {
        return "%s ???? %s";
    };
    he.prototype.atX0 = function () {
        return "?? %s";
    };
    he.prototype.commaEveryDay = function () {
        return ", ???? ??????";
    };
    he.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ???? %s ???????? ??????????";
    };
    he.prototype.commaX0ThroughX1 = function () {
        return ", %s ???? %s";
    };
    he.prototype.first = function () {
        return "??????????";
    };
    he.prototype.second = function () {
        return "??????";
    };
    he.prototype.third = function () {
        return "??????????";
    };
    he.prototype.fourth = function () {
        return "??????????";
    };
    he.prototype.fifth = function () {
        return "??????????";
    };
    he.prototype.commaOnThe = function () {
        return ", ?? ";
    };
    he.prototype.spaceX0OfTheMonth = function () {
        return " %s ???? ??????????";
    };
    he.prototype.lastDay = function () {
        return "???????? ????????????";
    };
    he.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ???? ?? %s ???? ??????????";
    };
    he.prototype.commaOnlyOnX0 = function () {
        return ", ???? ?? %s";
    };
    he.prototype.commaAndOnX0 = function () {
        return ", ???? %s";
    };
    he.prototype.commaEveryX0Months = function () {
        return ", ???? %s ????????????";
    };
    he.prototype.commaOnlyInX0 = function () {
        return ", ???? ?? %s";
    };
    he.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ???????? ???????????? ???? ??????????";
    };
    he.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ???????? ???????? ???????????? ???? ??????????";
    };
    he.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ???????? ???????? ???????? ???????????? ??????????";
    };
    he.prototype.firstWeekday = function () {
        return "?????? ???????? ????????????";
    };
    he.prototype.weekdayNearestDayX0 = function () {
        return "?????? ???????? ???????????? ?????????? ???? %s";
    };
    he.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ???????? ??%s ???? ??????????";
    };
    he.prototype.commaEveryX0Days = function () {
        return ", ???? %s ????????";
    };
    he.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ?????? ???????? ??%s ????%s ???? ??????????";
    };
    he.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ???????? ??%s ???? ??????????";
    };
    he.prototype.commaEveryX0Years = function () {
        return ", ???? %s ????????";
    };
    he.prototype.commaStartingX0 = function () {
        return ", ?????? ?? %s";
    };
    he.prototype.daysOfTheWeek = function () {
        return ["?????? ??????????", "?????? ??????", "?????? ??????????", "?????? ??????????", "?????? ??????????", "?????? ????????", "?????? ??????"];
    };
    he.prototype.monthsOfTheYear = function () {
        return ["??????????", "????????????", "??????", "??????????", "??????", "????????", "????????", "????????????", "????????????", "??????????????", "????????????", "??????????"];
    };
    return he;
}());
exports.he = he;


/***/ }),

/***/ 258:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.id = void 0;
var id = (function () {
    function id() {
    }
    id.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    id.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    id.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    id.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    id.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    id.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Terjadi kesalahan saat membuat deskripsi ekspresi. Periksa sintaks ekspresi cron.";
    };
    id.prototype.everyMinute = function () {
        return "setiap menit";
    };
    id.prototype.everyHour = function () {
        return "setiap jam";
    };
    id.prototype.atSpace = function () {
        return "Pada ";
    };
    id.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Setiap menit diantara %s dan %s";
    };
    id.prototype.at = function () {
        return "Pada";
    };
    id.prototype.spaceAnd = function () {
        return " dan";
    };
    id.prototype.everySecond = function () {
        return "setiap detik";
    };
    id.prototype.everyX0Seconds = function () {
        return "setiap %s detik";
    };
    id.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "detik ke %s sampai %s melewati menit";
    };
    id.prototype.atX0SecondsPastTheMinute = function () {
        return "pada %s detik lewat satu menit";
    };
    id.prototype.everyX0Minutes = function () {
        return "setiap %s menit";
    };
    id.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "menit ke %s sampai %s melewati jam";
    };
    id.prototype.atX0MinutesPastTheHour = function () {
        return "pada %s menit melewati jam";
    };
    id.prototype.everyX0Hours = function () {
        return "setiap %s jam";
    };
    id.prototype.betweenX0AndX1 = function () {
        return "diantara %s dan %s";
    };
    id.prototype.atX0 = function () {
        return "pada %s";
    };
    id.prototype.commaEveryDay = function () {
        return ", setiap hari";
    };
    id.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", setiap hari %s  dalam seminggu";
    };
    id.prototype.commaX0ThroughX1 = function () {
        return ", %s sampai %s";
    };
    id.prototype.first = function () {
        return "pertama";
    };
    id.prototype.second = function () {
        return "kedua";
    };
    id.prototype.third = function () {
        return "ketiga";
    };
    id.prototype.fourth = function () {
        return "keempat";
    };
    id.prototype.fifth = function () {
        return "kelima";
    };
    id.prototype.commaOnThe = function () {
        return ", di ";
    };
    id.prototype.spaceX0OfTheMonth = function () {
        return " %s pada bulan";
    };
    id.prototype.lastDay = function () {
        return "hari terakhir";
    };
    id.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", pada %s terakhir bulan ini";
    };
    id.prototype.commaOnlyOnX0 = function () {
        return ", hanya pada %s";
    };
    id.prototype.commaAndOnX0 = function () {
        return ", dan pada %s";
    };
    id.prototype.commaEveryX0Months = function () {
        return ", setiap bulan %s ";
    };
    id.prototype.commaOnlyInX0 = function () {
        return ", hanya pada %s";
    };
    id.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", pada hari terakhir bulan ini";
    };
    id.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", pada hari kerja terakhir setiap bulan";
    };
    id.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s hari sebelum hari terakhir setiap bulan";
    };
    id.prototype.firstWeekday = function () {
        return "hari kerja pertama";
    };
    id.prototype.weekdayNearestDayX0 = function () {
        return "hari kerja terdekat %s";
    };
    id.prototype.commaOnTheX0OfTheMonth = function () {
        return ", pada %s bulan ini";
    };
    id.prototype.commaEveryX0Days = function () {
        return ", setiap %s hari";
    };
    id.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", antara hari %s dan %s dalam sebulan";
    };
    id.prototype.commaOnDayX0OfTheMonth = function () {
        return ", pada hari %s dalam sebulan";
    };
    id.prototype.commaEveryHour = function () {
        return ", setiap jam";
    };
    id.prototype.commaEveryX0Years = function () {
        return ", setiap %s tahun";
    };
    id.prototype.commaStartingX0 = function () {
        return ", mulai pada %s";
    };
    id.prototype.daysOfTheWeek = function () {
        return ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    };
    id.prototype.monthsOfTheYear = function () {
        return [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
    };
    return id;
}());
exports.id = id;


/***/ }),

/***/ 128:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.it = void 0;
var it = (function () {
    function it() {
    }
    it.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    it.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    it.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    it.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    it.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    it.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "?? verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
    };
    it.prototype.at = function () {
        return "Alle";
    };
    it.prototype.atSpace = function () {
        return "Alle ";
    };
    it.prototype.atX0 = function () {
        return "alle %s";
    };
    it.prototype.atX0MinutesPastTheHour = function () {
        return "al %s minuto passata l'ora";
    };
    it.prototype.atX0SecondsPastTheMinute = function () {
        return "al %s secondo passato il minuto";
    };
    it.prototype.betweenX0AndX1 = function () {
        return "tra le %s e le %s";
    };
    it.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tra il giorno %s e %s del mese";
    };
    it.prototype.commaEveryDay = function () {
        return ", ogni giorno";
    };
    it.prototype.commaEveryX0Days = function () {
        return ", ogni %s giorni";
    };
    it.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ogni %s giorni della settimana";
    };
    it.prototype.commaEveryX0Months = function () {
        return ", ogni %s mesi";
    };
    it.prototype.commaEveryX0Years = function () {
        return ", ogni %s anni";
    };
    it.prototype.commaOnDayX0OfTheMonth = function () {
        return ", il giorno %s del mese";
    };
    it.prototype.commaOnlyInX0 = function () {
        return ", solo in %s";
    };
    it.prototype.commaOnlyOnX0 = function () {
        return ", solo il %s";
    };
    it.prototype.commaAndOnX0 = function () {
        return ", e il %s";
    };
    it.prototype.commaOnThe = function () {
        return ", il ";
    };
    it.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", l'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", nell'ultima settimana del mese";
    };
    it.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s giorni prima dell'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", l'ultimo %s del mese";
    };
    it.prototype.commaOnTheX0OfTheMonth = function () {
        return ", il %s del mese";
    };
    it.prototype.commaX0ThroughX1 = function () {
        return ", %s al %s";
    };
    it.prototype.everyHour = function () {
        return "ogni ora";
    };
    it.prototype.everyMinute = function () {
        return "ogni minuto";
    };
    it.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Ogni minuto tra le %s e le %s";
    };
    it.prototype.everySecond = function () {
        return "ogni secondo";
    };
    it.prototype.everyX0Hours = function () {
        return "ogni %s ore";
    };
    it.prototype.everyX0Minutes = function () {
        return "ogni %s minuti";
    };
    it.prototype.everyX0Seconds = function () {
        return "ogni %s secondi";
    };
    it.prototype.fifth = function () {
        return "quinto";
    };
    it.prototype.first = function () {
        return "primo";
    };
    it.prototype.firstWeekday = function () {
        return "primo giorno della settimana";
    };
    it.prototype.fourth = function () {
        return "quarto";
    };
    it.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuti %s al %s dopo l'ora";
    };
    it.prototype.second = function () {
        return "secondo";
    };
    it.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "secondi %s al %s oltre il minuto";
    };
    it.prototype.spaceAnd = function () {
        return " e";
    };
    it.prototype.spaceX0OfTheMonth = function () {
        return " %s del mese";
    };
    it.prototype.lastDay = function () {
        return "l'ultimo giorno";
    };
    it.prototype.third = function () {
        return "terzo";
    };
    it.prototype.weekdayNearestDayX0 = function () {
        return "giorno della settimana pi?? vicino al %s";
    };
    it.prototype.commaStartingX0 = function () {
        return ", a partire %s";
    };
    it.prototype.daysOfTheWeek = function () {
        return ["domenica", "luned??", "marted??", "mercoled??", "gioved??", "venerd??", "sabato"];
    };
    it.prototype.monthsOfTheYear = function () {
        return [
            "gennaio",
            "febbraio",
            "marzo",
            "aprile",
            "maggio",
            "giugno",
            "luglio",
            "agosto",
            "settembre",
            "ottobre",
            "novembre",
            "dicembre",
        ];
    };
    return it;
}());
exports.it = it;


/***/ }),

/***/ 949:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ja = void 0;
var ja = (function () {
    function ja() {
    }
    ja.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ja.prototype.everyMinute = function () {
        return "??????";
    };
    ja.prototype.everyHour = function () {
        return "??????";
    };
    ja.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "??????????????????????????????????????????????????????????????????Cron ??????????????????????????????????????????";
    };
    ja.prototype.atSpace = function () {
        return "?????????????????????";
    };
    ja.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "%s ?????? %s ????????????";
    };
    ja.prototype.at = function () {
        return "?????????????????????";
    };
    ja.prototype.spaceAnd = function () {
        return "???";
    };
    ja.prototype.everySecond = function () {
        return "??????";
    };
    ja.prototype.everyX0Seconds = function () {
        return "%s ?????????";
    };
    ja.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "?????? %s ????????? %s ?????????";
    };
    ja.prototype.atX0SecondsPastTheMinute = function () {
        return "?????? %s ?????????";
    };
    ja.prototype.everyX0Minutes = function () {
        return "%s ?????????";
    };
    ja.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "?????? %s ????????? %s ?????????";
    };
    ja.prototype.atX0MinutesPastTheHour = function () {
        return "?????? %s ?????????";
    };
    ja.prototype.everyX0Hours = function () {
        return "%s ????????????";
    };
    ja.prototype.betweenX0AndX1 = function () {
        return "%s ??? %s ??????";
    };
    ja.prototype.atX0 = function () {
        return "????????????????????? %s";
    };
    ja.prototype.commaEveryDay = function () {
        return "?????????";
    };
    ja.prototype.commaEveryX0DaysOfTheWeek = function () {
        return "??????????????? %s ?????????";
    };
    ja.prototype.commaX0ThroughX1 = function () {
        return "???%s ?????? %s ??????";
    };
    ja.prototype.first = function () {
        return "1 ??????";
    };
    ja.prototype.second = function () {
        return "2 ??????";
    };
    ja.prototype.third = function () {
        return "3 ??????";
    };
    ja.prototype.fourth = function () {
        return "4 ??????";
    };
    ja.prototype.fifth = function () {
        return "5 ??????";
    };
    ja.prototype.commaOnThe = function () {
        return "??????";
    };
    ja.prototype.spaceX0OfTheMonth = function () {
        return "???????????? %s";
    };
    ja.prototype.commaOnTheLastX0OfTheMonth = function () {
        return "??????????????? %s ???";
    };
    ja.prototype.commaOnlyOnX0 = function () {
        return "%s ?????????";
    };
    ja.prototype.commaEveryX0Months = function () {
        return "???%s ????????????";
    };
    ja.prototype.commaOnlyInX0 = function () {
        return "%s ?????????";
    };
    ja.prototype.commaOnTheLastDayOfTheMonth = function () {
        return "??????????????????";
    };
    ja.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return "????????????????????????";
    };
    ja.prototype.firstWeekday = function () {
        return "???????????????";
    };
    ja.prototype.weekdayNearestDayX0 = function () {
        return "%s ?????????????????????";
    };
    ja.prototype.commaOnTheX0OfTheMonth = function () {
        return "?????? %s ???";
    };
    ja.prototype.commaEveryX0Days = function () {
        return "???%s ?????????";
    };
    ja.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return "????????? %s ????????? %s ?????????";
    };
    ja.prototype.commaOnDayX0OfTheMonth = function () {
        return "????????? %s ??????";
    };
    ja.prototype.spaceAndSpace = function () {
        return "???";
    };
    ja.prototype.commaEveryMinute = function () {
        return "?????????";
    };
    ja.prototype.commaEveryHour = function () {
        return "?????????";
    };
    ja.prototype.commaEveryX0Years = function () {
        return "???%s ?????????";
    };
    ja.prototype.commaStartingX0 = function () {
        return "???%s ?????????";
    };
    ja.prototype.aMPeriod = function () {
        return "AM";
    };
    ja.prototype.pMPeriod = function () {
        return "PM";
    };
    ja.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return "?????????????????? %s ??????";
    };
    ja.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ja.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ja.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ja.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ja.prototype.lastDay = function () {
        return "?????????";
    };
    ja.prototype.commaAndOnX0 = function () {
        return "????????? %s";
    };
    ja.prototype.daysOfTheWeek = function () {
        return ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"];
    };
    ja.prototype.monthsOfTheYear = function () {
        return ["1???", "2???", "3???", "4???", "5???", "6???", "7???", "8???", "9???", "10???", "11???", "12???"];
    };
    return ja;
}());
exports.ja = ja;


/***/ }),

/***/ 305:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ko = void 0;
var ko = (function () {
    function ko() {
    }
    ko.prototype.setPeriodBeforeTime = function () {
        return true;
    };
    ko.prototype.pm = function () {
        return "??????";
    };
    ko.prototype.am = function () {
        return "??????";
    };
    ko.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ko.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ko.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ko.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ko.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ko.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "????????? ????????? ???????????? ??? ????????? ??????????????????. cron ????????? ????????? ??????????????????.";
    };
    ko.prototype.everyMinute = function () {
        return "1?????????";
    };
    ko.prototype.everyHour = function () {
        return "1????????????";
    };
    ko.prototype.atSpace = function () {
        return "?????? ";
    };
    ko.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "%s ??? %s ????????? ??? ???";
    };
    ko.prototype.at = function () {
        return "??????";
    };
    ko.prototype.spaceAnd = function () {
        return " ???";
    };
    ko.prototype.everySecond = function () {
        return "1?????????";
    };
    ko.prototype.everyX0Seconds = function () {
        return "%s?????????";
    };
    ko.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "?????? ??? %s????????? %s?????????";
    };
    ko.prototype.atX0SecondsPastTheMinute = function () {
        return "?????? ??? %s?????????";
    };
    ko.prototype.everyX0Minutes = function () {
        return "%s?????????";
    };
    ko.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "?????? ??? %s????????? %s??????";
    };
    ko.prototype.atX0MinutesPastTheHour = function () {
        return "?????? ??? %s?????????";
    };
    ko.prototype.everyX0Hours = function () {
        return "%s????????????";
    };
    ko.prototype.betweenX0AndX1 = function () {
        return "%s?????? %s ??????";
    };
    ko.prototype.atX0 = function () {
        return "%s??????";
    };
    ko.prototype.commaEveryDay = function () {
        return ", ??????";
    };
    ko.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ??? ??? %s?????????";
    };
    ko.prototype.commaX0ThroughX1 = function () {
        return ", %s?????? %s??????";
    };
    ko.prototype.first = function () {
        return "??? ??????";
    };
    ko.prototype.second = function () {
        return "??? ??????";
    };
    ko.prototype.third = function () {
        return "??? ??????";
    };
    ko.prototype.fourth = function () {
        return "??? ??????";
    };
    ko.prototype.fifth = function () {
        return "?????? ??????";
    };
    ko.prototype.commaOnThe = function () {
        return ", ?????? ";
    };
    ko.prototype.spaceX0OfTheMonth = function () {
        return " ?????? ?????? %s";
    };
    ko.prototype.lastDay = function () {
        return "????????? ???";
    };
    ko.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ?????? ?????? ????????? %s";
    };
    ko.prototype.commaOnlyOnX0 = function () {
        return ", %s??????";
    };
    ko.prototype.commaAndOnX0 = function () {
        return ", ??? %s???";
    };
    ko.prototype.commaEveryX0Months = function () {
        return ", %s????????????";
    };
    ko.prototype.commaOnlyInX0 = function () {
        return ", %s?????????";
    };
    ko.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ?????? ?????? ????????? ??????";
    };
    ko.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ?????? ?????? ????????? ?????????";
    };
    ko.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", ?????? ?????? ????????? ??? %s??? ???";
    };
    ko.prototype.firstWeekday = function () {
        return "??? ?????? ??????";
    };
    ko.prototype.weekdayNearestDayX0 = function () {
        return "?????? ?????? ????????? ??? %s";
    };
    ko.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ?????? ?????? %s???";
    };
    ko.prototype.commaEveryX0Days = function () {
        return ", %s?????????";
    };
    ko.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ?????? ?????? %s??? ??? %s??? ??????";
    };
    ko.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ?????? ?????? %s??????";
    };
    ko.prototype.commaEveryMinute = function () {
        return ", 1?????????";
    };
    ko.prototype.commaEveryHour = function () {
        return ", 1????????????";
    };
    ko.prototype.commaEveryX0Years = function () {
        return ", %s?????????";
    };
    ko.prototype.commaStartingX0 = function () {
        return ", %s??????";
    };
    ko.prototype.daysOfTheWeek = function () {
        return ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"];
    };
    ko.prototype.monthsOfTheYear = function () {
        return ["1???", "2???", "3???", "4???", "5???", "6???", "7???", "8???", "9???", "10???", "11???", "12???"];
    };
    return ko;
}());
exports.ko = ko;


/***/ }),

/***/ 869:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nb = void 0;
var nb = (function () {
    function nb() {
    }
    nb.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    nb.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    nb.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    nb.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    nb.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    nb.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "En feil inntraff ved generering av uttrykksbeskrivelse. Sjekk cron syntaks.";
    };
    nb.prototype.at = function () {
        return "Kl.";
    };
    nb.prototype.atSpace = function () {
        return "Kl.";
    };
    nb.prototype.atX0 = function () {
        return "p?? %s";
    };
    nb.prototype.atX0MinutesPastTheHour = function () {
        return "p?? %s minutter etter timen";
    };
    nb.prototype.atX0SecondsPastTheMinute = function () {
        return "p?? %s sekunder etter minuttet";
    };
    nb.prototype.betweenX0AndX1 = function () {
        return "mellom %s og %s";
    };
    nb.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellom dag %s og %s av m??neden";
    };
    nb.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    nb.prototype.commaEveryX0Days = function () {
        return ", hver %s dag";
    };
    nb.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", hver %s ukedag";
    };
    nb.prototype.commaEveryX0Months = function () {
        return ", hver %s m??ned";
    };
    nb.prototype.commaEveryX0Years = function () {
        return ", hvert %s ??r";
    };
    nb.prototype.commaOnDayX0OfTheMonth = function () {
        return ", p?? dag %s av m??neden";
    };
    nb.prototype.commaOnlyInX0 = function () {
        return ", bare i %s";
    };
    nb.prototype.commaOnlyOnX0 = function () {
        return ", p?? %s";
    };
    nb.prototype.commaAndOnX0 = function () {
        return ", og p?? %s";
    };
    nb.prototype.commaOnThe = function () {
        return ", p?? ";
    };
    nb.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", p?? den siste dagen i m??neden";
    };
    nb.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", den siste ukedagen i m??neden";
    };
    nb.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dager f??r den siste dagen i m??neden";
    };
    nb.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", p?? den siste %s av m??neden";
    };
    nb.prototype.commaOnTheX0OfTheMonth = function () {
        return ", p?? den %s av m??neden";
    };
    nb.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    nb.prototype.everyHour = function () {
        return "hver time";
    };
    nb.prototype.everyMinute = function () {
        return "hvert minutt";
    };
    nb.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Hvert minutt mellom %s og %s";
    };
    nb.prototype.everySecond = function () {
        return "hvert sekund";
    };
    nb.prototype.everyX0Hours = function () {
        return "hver %s time";
    };
    nb.prototype.everyX0Minutes = function () {
        return "hvert %s minutt";
    };
    nb.prototype.everyX0Seconds = function () {
        return "hvert %s sekund";
    };
    nb.prototype.fifth = function () {
        return "femte";
    };
    nb.prototype.first = function () {
        return "f??rste";
    };
    nb.prototype.firstWeekday = function () {
        return "f??rste ukedag";
    };
    nb.prototype.fourth = function () {
        return "fjerde";
    };
    nb.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuttene fra %s til og med %s etter timen";
    };
    nb.prototype.second = function () {
        return "sekund";
    };
    nb.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundene fra %s til og med %s etter minuttet";
    };
    nb.prototype.spaceAnd = function () {
        return " og";
    };
    nb.prototype.spaceX0OfTheMonth = function () {
        return " %s i m??neden";
    };
    nb.prototype.lastDay = function () {
        return "den siste dagen";
    };
    nb.prototype.third = function () {
        return "tredje";
    };
    nb.prototype.weekdayNearestDayX0 = function () {
        return "ukedag n??rmest dag %s";
    };
    nb.prototype.commaStartingX0 = function () {
        return ", starter %s";
    };
    nb.prototype.daysOfTheWeek = function () {
        return ["s??ndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "l??rdag"];
    };
    nb.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "mars",
            "april",
            "mai",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "desember",
        ];
    };
    return nb;
}());
exports.nb = nb;


/***/ }),

/***/ 771:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nl = void 0;
var nl = (function () {
    function nl() {
    }
    nl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    nl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    nl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    nl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    nl.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    nl.prototype.everyMinute = function () {
        return "elke minuut";
    };
    nl.prototype.everyHour = function () {
        return "elk uur";
    };
    nl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Er is een fout opgetreden bij het vertalen van de gegevens. Controleer de gegevens.";
    };
    nl.prototype.atSpace = function () {
        return "Op ";
    };
    nl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Elke minuut tussen %s en %s";
    };
    nl.prototype.at = function () {
        return "Op";
    };
    nl.prototype.spaceAnd = function () {
        return " en";
    };
    nl.prototype.everySecond = function () {
        return "elke seconde";
    };
    nl.prototype.everyX0Seconds = function () {
        return "elke %s seconden";
    };
    nl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconden %s t/m %s na de minuut";
    };
    nl.prototype.atX0SecondsPastTheMinute = function () {
        return "op %s seconden na de minuut";
    };
    nl.prototype.everyX0Minutes = function () {
        return "elke %s minuten";
    };
    nl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuut %s t/m %s na het uur";
    };
    nl.prototype.atX0MinutesPastTheHour = function () {
        return "op %s minuten na het uur";
    };
    nl.prototype.everyX0Hours = function () {
        return "elke %s uur";
    };
    nl.prototype.betweenX0AndX1 = function () {
        return "tussen %s en %s";
    };
    nl.prototype.atX0 = function () {
        return "op %s";
    };
    nl.prototype.commaEveryDay = function () {
        return ", elke dag";
    };
    nl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", elke %s dagen van de week";
    };
    nl.prototype.commaX0ThroughX1 = function () {
        return ", %s t/m %s";
    };
    nl.prototype.first = function () {
        return "eerste";
    };
    nl.prototype.second = function () {
        return "tweede";
    };
    nl.prototype.third = function () {
        return "derde";
    };
    nl.prototype.fourth = function () {
        return "vierde";
    };
    nl.prototype.fifth = function () {
        return "vijfde";
    };
    nl.prototype.commaOnThe = function () {
        return ", op de ";
    };
    nl.prototype.spaceX0OfTheMonth = function () {
        return " %s van de maand";
    };
    nl.prototype.lastDay = function () {
        return "de laatste dag";
    };
    nl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", op de laatste %s van de maand";
    };
    nl.prototype.commaOnlyOnX0 = function () {
        return ", alleen op %s";
    };
    nl.prototype.commaAndOnX0 = function () {
        return ", en op %s";
    };
    nl.prototype.commaEveryX0Months = function () {
        return ", elke %s maanden";
    };
    nl.prototype.commaOnlyInX0 = function () {
        return ", alleen in %s";
    };
    nl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", op de laatste dag van de maand";
    };
    nl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", op de laatste werkdag van de maand";
    };
    nl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dagen v????r de laatste dag van de maand";
    };
    nl.prototype.firstWeekday = function () {
        return "eerste werkdag";
    };
    nl.prototype.weekdayNearestDayX0 = function () {
        return "werkdag dichtst bij dag %s";
    };
    nl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", op de %s van de maand";
    };
    nl.prototype.commaEveryX0Days = function () {
        return ", elke %s dagen";
    };
    nl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tussen dag %s en %s van de maand";
    };
    nl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", op dag %s van de maand";
    };
    nl.prototype.commaEveryX0Years = function () {
        return ", elke %s jaren";
    };
    nl.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    nl.prototype.daysOfTheWeek = function () {
        return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    };
    nl.prototype.monthsOfTheYear = function () {
        return [
            "januari",
            "februari",
            "maart",
            "april",
            "mei",
            "juni",
            "juli",
            "augustus",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return nl;
}());
exports.nl = nl;


/***/ }),

/***/ 665:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pl = void 0;
var pl = (function () {
    function pl() {
    }
    pl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    pl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Wyst??pi?? b????d podczas generowania opisu wyra??enia cron. Sprawd?? sk??adni?? wyra??enia cron.";
    };
    pl.prototype.at = function () {
        return "O";
    };
    pl.prototype.atSpace = function () {
        return "O ";
    };
    pl.prototype.atX0 = function () {
        return "o %s";
    };
    pl.prototype.atX0MinutesPastTheHour = function () {
        return "w %s minucie";
    };
    pl.prototype.atX0SecondsPastTheMinute = function () {
        return "w %s sekundzie";
    };
    pl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    pl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s-ego do %s-ego dnia miesi??ca";
    };
    pl.prototype.commaEveryDay = function () {
        return ", co dzie??";
    };
    pl.prototype.commaEveryX0Days = function () {
        return ", co %s dni";
    };
    pl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", co %s dni tygodnia";
    };
    pl.prototype.commaEveryX0Months = function () {
        return ", co %s miesi??cy";
    };
    pl.prototype.commaEveryX0Years = function () {
        return ", co %s lat";
    };
    pl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s-ego dnia miesi??ca";
    };
    pl.prototype.commaOnlyInX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaOnlyOnX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaAndOnX0 = function () {
        return ", i %s";
    };
    pl.prototype.commaOnThe = function () {
        return ", ";
    };
    pl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ostatni dzie?? miesi??ca";
    };
    pl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ostatni dzie?? roboczy miesi??ca";
    };
    pl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dni przed ostatnim dniem miesi??ca";
    };
    pl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ostatni %s miesi??ca";
    };
    pl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s miesi??ca";
    };
    pl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    pl.prototype.everyHour = function () {
        return "co godzin??";
    };
    pl.prototype.everyMinute = function () {
        return "co minut??";
    };
    pl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Co minut?? od %s do %s";
    };
    pl.prototype.everySecond = function () {
        return "co sekund??";
    };
    pl.prototype.everyX0Hours = function () {
        return "co %s godzin";
    };
    pl.prototype.everyX0Minutes = function () {
        return "co %s minut";
    };
    pl.prototype.everyX0Seconds = function () {
        return "co %s sekund";
    };
    pl.prototype.fifth = function () {
        return "pi??ty";
    };
    pl.prototype.first = function () {
        return "pierwszy";
    };
    pl.prototype.firstWeekday = function () {
        return "pierwszy dzie?? roboczy";
    };
    pl.prototype.fourth = function () {
        return "czwarty";
    };
    pl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    pl.prototype.second = function () {
        return "drugi";
    };
    pl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    pl.prototype.spaceAnd = function () {
        return " i";
    };
    pl.prototype.spaceX0OfTheMonth = function () {
        return " %s miesi??ca";
    };
    pl.prototype.lastDay = function () {
        return "ostatni dzie??";
    };
    pl.prototype.third = function () {
        return "trzeci";
    };
    pl.prototype.weekdayNearestDayX0 = function () {
        return "dzie?? roboczy najbli??szy %s-ego dnia";
    };
    pl.prototype.commaStartingX0 = function () {
        return ", startowy %s";
    };
    pl.prototype.daysOfTheWeek = function () {
        return ["niedziela", "poniedzia??ek", "wtorek", "??roda", "czwartek", "pi??tek", "sobota"];
    };
    pl.prototype.monthsOfTheYear = function () {
        return [
            "stycze??",
            "luty",
            "marzec",
            "kwiecie??",
            "maj",
            "czerwiec",
            "lipiec",
            "sierpie??",
            "wrzesie??",
            "pa??dziernik",
            "listopad",
            "grudzie??",
        ];
    };
    return pl;
}());
exports.pl = pl;


/***/ }),

/***/ 461:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pt_BR = void 0;
var pt_BR = (function () {
    function pt_BR() {
    }
    pt_BR.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pt_BR.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pt_BR.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pt_BR.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pt_BR.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    pt_BR.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocorreu um erro ao gerar a descri????o da express??o Cron.";
    };
    pt_BR.prototype.at = function () {
        return "??s";
    };
    pt_BR.prototype.atSpace = function () {
        return "??s ";
    };
    pt_BR.prototype.atX0 = function () {
        return "??s %s";
    };
    pt_BR.prototype.atX0MinutesPastTheHour = function () {
        return "aos %s minutos da hora";
    };
    pt_BR.prototype.atX0SecondsPastTheMinute = function () {
        return "aos %s segundos do minuto";
    };
    pt_BR.prototype.betweenX0AndX1 = function () {
        return "entre %s e %s";
    };
    pt_BR.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre os dias %s e %s do m??s";
    };
    pt_BR.prototype.commaEveryDay = function () {
        return ", a cada dia";
    };
    pt_BR.prototype.commaEveryX0Days = function () {
        return ", a cada %s dias";
    };
    pt_BR.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", a cada %s dias de semana";
    };
    pt_BR.prototype.commaEveryX0Months = function () {
        return ", a cada %s meses";
    };
    pt_BR.prototype.commaOnDayX0OfTheMonth = function () {
        return ", no dia %s do m??s";
    };
    pt_BR.prototype.commaOnlyInX0 = function () {
        return ", somente em %s";
    };
    pt_BR.prototype.commaOnlyOnX0 = function () {
        return ", somente de %s";
    };
    pt_BR.prototype.commaAndOnX0 = function () {
        return ", e de %s";
    };
    pt_BR.prototype.commaOnThe = function () {
        return ", na ";
    };
    pt_BR.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", no ??ltimo dia do m??s";
    };
    pt_BR.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", no ??ltimo dia da semana do m??s";
    };
    pt_BR.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dias antes do ??ltimo dia do m??s";
    };
    pt_BR.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", na ??ltima %s do m??s";
    };
    pt_BR.prototype.commaOnTheX0OfTheMonth = function () {
        return ", no %s do m??s";
    };
    pt_BR.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    pt_BR.prototype.everyHour = function () {
        return "a cada hora";
    };
    pt_BR.prototype.everyMinute = function () {
        return "a cada minuto";
    };
    pt_BR.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "a cada minuto entre %s e %s";
    };
    pt_BR.prototype.everySecond = function () {
        return "a cada segundo";
    };
    pt_BR.prototype.everyX0Hours = function () {
        return "a cada %s horas";
    };
    pt_BR.prototype.everyX0Minutes = function () {
        return "a cada %s minutos";
    };
    pt_BR.prototype.everyX0Seconds = function () {
        return "a cada %s segundos";
    };
    pt_BR.prototype.fifth = function () {
        return "quinta";
    };
    pt_BR.prototype.first = function () {
        return "primeira";
    };
    pt_BR.prototype.firstWeekday = function () {
        return "primeiro dia da semana";
    };
    pt_BR.prototype.fourth = function () {
        return "quarta";
    };
    pt_BR.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "do minuto %s at?? %s de cada hora";
    };
    pt_BR.prototype.second = function () {
        return "segunda";
    };
    pt_BR.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "No segundo %s at?? %s de cada minuto";
    };
    pt_BR.prototype.spaceAnd = function () {
        return " e";
    };
    pt_BR.prototype.spaceX0OfTheMonth = function () {
        return " %s do m??s";
    };
    pt_BR.prototype.lastDay = function () {
        return "o ??ltimo dia";
    };
    pt_BR.prototype.third = function () {
        return "terceira";
    };
    pt_BR.prototype.weekdayNearestDayX0 = function () {
        return "dia da semana mais pr??ximo do dia %s";
    };
    pt_BR.prototype.commaEveryX0Years = function () {
        return ", a cada %s anos";
    };
    pt_BR.prototype.commaStartingX0 = function () {
        return ", iniciando %s";
    };
    pt_BR.prototype.daysOfTheWeek = function () {
        return ["domingo", "segunda-feira", "ter??a-feira", "quarta-feira", "quinta-feira", "sexta-feira", "s??bado"];
    };
    pt_BR.prototype.monthsOfTheYear = function () {
        return [
            "janeiro",
            "fevereiro",
            "mar??o",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
        ];
    };
    return pt_BR;
}());
exports.pt_BR = pt_BR;


/***/ }),

/***/ 408:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ro = void 0;
var ro = (function () {
    function ro() {
    }
    ro.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ro.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Eroare la generarea descrierii. Verifica??i sintaxa.";
    };
    ro.prototype.at = function () {
        return "La";
    };
    ro.prototype.atSpace = function () {
        return "La ";
    };
    ro.prototype.atX0 = function () {
        return "la %s";
    };
    ro.prototype.atX0MinutesPastTheHour = function () {
        return "la ??i %s minute";
    };
    ro.prototype.atX0SecondsPastTheMinute = function () {
        return "la ??i %s secunde";
    };
    ro.prototype.betweenX0AndX1 = function () {
        return "??ntre %s ??i %s";
    };
    ro.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ??ntre zilele %s ??i %s ale lunii";
    };
    ro.prototype.commaEveryDay = function () {
        return ", ??n fiecare zi";
    };
    ro.prototype.commaEveryX0Days = function () {
        return ", la fiecare %s zile";
    };
    ro.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", la fiecare a %s-a zi a s??pt??m??nii";
    };
    ro.prototype.commaEveryX0Months = function () {
        return ", la fiecare %s luni";
    };
    ro.prototype.commaEveryX0Years = function () {
        return ", o dat?? la %s ani";
    };
    ro.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ??n ziua %s a lunii";
    };
    ro.prototype.commaOnlyInX0 = function () {
        return ", doar ??n %s";
    };
    ro.prototype.commaOnlyOnX0 = function () {
        return ", doar %s";
    };
    ro.prototype.commaAndOnX0 = function () {
        return ", ??i %s";
    };
    ro.prototype.commaOnThe = function () {
        return ", ??n ";
    };
    ro.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ??n ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ??n ultima zi lucr??toare a lunii";
    };
    ro.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s zile ??nainte de ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ??n ultima %s a lunii";
    };
    ro.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ??n %s a lunii";
    };
    ro.prototype.commaX0ThroughX1 = function () {
        return ", de %s p??n?? %s";
    };
    ro.prototype.everyHour = function () {
        return "??n fiecare or??";
    };
    ro.prototype.everyMinute = function () {
        return "??n fiecare minut";
    };
    ro.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "??n fiecare minut ??ntre %s ??i %s";
    };
    ro.prototype.everySecond = function () {
        return "??n fiecare secund??";
    };
    ro.prototype.everyX0Hours = function () {
        return "la fiecare %s ore";
    };
    ro.prototype.everyX0Minutes = function () {
        return "la fiecare %s minute";
    };
    ro.prototype.everyX0Seconds = function () {
        return "la fiecare %s secunde";
    };
    ro.prototype.fifth = function () {
        return "a cincea";
    };
    ro.prototype.first = function () {
        return "prima";
    };
    ro.prototype.firstWeekday = function () {
        return "prima zi a s??pt??m??nii";
    };
    ro.prototype.fourth = function () {
        return "a patra";
    };
    ro.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "??ntre minutele %s ??i %s";
    };
    ro.prototype.second = function () {
        return "a doua";
    };
    ro.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "??ntre secunda %s ??i secunda %s";
    };
    ro.prototype.spaceAnd = function () {
        return " ??i";
    };
    ro.prototype.spaceX0OfTheMonth = function () {
        return " %s a lunii";
    };
    ro.prototype.lastDay = function () {
        return "ultima zi";
    };
    ro.prototype.third = function () {
        return "a treia";
    };
    ro.prototype.weekdayNearestDayX0 = function () {
        return "cea mai apropiat?? zi a s??pt??m??nii de ziua %s";
    };
    ro.prototype.commaMonthX0ThroughMonthX1 = function () {
        return ", din %s p??n?? ??n %s";
    };
    ro.prototype.commaYearX0ThroughYearX1 = function () {
        return ", din %s p??n?? ??n %s";
    };
    ro.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "la ??i %s de minute";
    };
    ro.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return "la ??i %s de secunde";
    };
    ro.prototype.commaStartingX0 = function () {
        return ", pornire %s";
    };
    ro.prototype.daysOfTheWeek = function () {
        return ["duminic??", "luni", "mar??i", "miercuri", "joi", "vineri", "s??mb??t??"];
    };
    ro.prototype.monthsOfTheYear = function () {
        return [
            "ianuarie",
            "februarie",
            "martie",
            "aprilie",
            "mai",
            "iunie",
            "iulie",
            "august",
            "septembrie",
            "octombrie",
            "noiembrie",
            "decembrie",
        ];
    };
    return ro;
}());
exports.ro = ro;


/***/ }),

/***/ 392:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ru = void 0;
var ru = (function () {
    function ru() {
    }
    ru.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ru.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ru.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ru.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ru.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ru.prototype.everyMinute = function () {
        return "???????????? ????????????";
    };
    ru.prototype.everyHour = function () {
        return "???????????? ??????";
    };
    ru.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "?????????????????? ???????????? ???? ?????????? ?????????????????? ???????????????? ??????????????????. ?????????????????? ?????????????????? ????????-??????????????????.";
    };
    ru.prototype.atSpace = function () {
        return "?? ";
    };
    ru.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "???????????? ???????????? ?? %s ???? %s";
    };
    ru.prototype.at = function () {
        return "??";
    };
    ru.prototype.spaceAnd = function () {
        return " ??";
    };
    ru.prototype.everySecond = function () {
        return "???????????? ??????????????";
    };
    ru.prototype.everyX0Seconds = function () {
        return "???????????? %s ????????????";
    };
    ru.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "?????????????? ?? %s ???? %s";
    };
    ru.prototype.atX0SecondsPastTheMinute = function () {
        return "?? %s ????????????";
    };
    ru.prototype.everyX0Minutes = function () {
        return "???????????? %s ??????????";
    };
    ru.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "???????????? ?? %s ???? %s";
    };
    ru.prototype.atX0MinutesPastTheHour = function () {
        return "?? %s ??????????";
    };
    ru.prototype.everyX0Hours = function () {
        return "???????????? %s ??????????";
    };
    ru.prototype.betweenX0AndX1 = function () {
        return "?? %s ???? %s";
    };
    ru.prototype.atX0 = function () {
        return "?? %s";
    };
    ru.prototype.commaEveryDay = function () {
        return ", ???????????? ????????";
    };
    ru.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ???????????? %s ???????? ????????????";
    };
    ru.prototype.commaX0ThroughX1 = function () {
        return ", %s ???? %s";
    };
    ru.prototype.first = function () {
        return "????????????";
    };
    ru.prototype.second = function () {
        return "????????????";
    };
    ru.prototype.third = function () {
        return "????????????";
    };
    ru.prototype.fourth = function () {
        return "??????????????????";
    };
    ru.prototype.fifth = function () {
        return "??????????";
    };
    ru.prototype.commaOnThe = function () {
        return ", ?? ";
    };
    ru.prototype.spaceX0OfTheMonth = function () {
        return " %s ????????????";
    };
    ru.prototype.lastDay = function () {
        return "?????????????????? ????????";
    };
    ru.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ?? ?????????????????? %s ????????????";
    };
    ru.prototype.commaOnlyOnX0 = function () {
        return ", ???????????? ?? %s";
    };
    ru.prototype.commaAndOnX0 = function () {
        return ", ?? ?? %s";
    };
    ru.prototype.commaEveryX0Months = function () {
        return ", ???????????? %s ??????????????";
    };
    ru.prototype.commaOnlyInX0 = function () {
        return ", ???????????? ?? %s";
    };
    ru.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ?? ?????????????????? ???????? ????????????";
    };
    ru.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ?? ?????????????????? ???????????? ???????? ????????????";
    };
    ru.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ???????? ???? ???????????????????? ?????? ????????????";
    };
    ru.prototype.firstWeekday = function () {
        return "???????????? ???????????? ????????";
    };
    ru.prototype.weekdayNearestDayX0 = function () {
        return "?????????????????? ???????????? ???????? ?? %s";
    };
    ru.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ?? %s ????????????";
    };
    ru.prototype.commaEveryX0Days = function () {
        return ", ???????????? %s ????????";
    };
    ru.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ?? %s ???? %s ?????????? ????????????";
    };
    ru.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ?? %s ?????????? ????????????";
    };
    ru.prototype.commaEveryX0Years = function () {
        return ", ???????????? %s ??????";
    };
    ru.prototype.commaStartingX0 = function () {
        return ", ???????????? %s";
    };
    ru.prototype.daysOfTheWeek = function () {
        return ["??????????????????????", "??????????????????????", "??????????????", "??????????", "??????????????", "??????????????", "??????????????"];
    };
    ru.prototype.monthsOfTheYear = function () {
        return [
            "????????????",
            "??????????????",
            "????????",
            "????????????",
            "??????",
            "????????",
            "????????",
            "????????????",
            "????????????????",
            "??????????????",
            "????????????",
            "??????????????",
        ];
    };
    return ru;
}());
exports.ru = ru;


/***/ }),

/***/ 203:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sk = void 0;
var sk = (function () {
    function sk() {
    }
    sk.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sk.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sk.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sk.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sk.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Pri vytv??ran?? popisu do??lo k chybe. Skontrolujte pros??m spr??vnos?? syntaxe cronu.";
    };
    sk.prototype.everyMinute = function () {
        return "ka??d?? min??tu";
    };
    sk.prototype.everyHour = function () {
        return "ka??d?? hodinu";
    };
    sk.prototype.atSpace = function () {
        return "V ";
    };
    sk.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Ka??d?? min??tu medzi %s a %s";
    };
    sk.prototype.at = function () {
        return "V";
    };
    sk.prototype.spaceAnd = function () {
        return " a";
    };
    sk.prototype.everySecond = function () {
        return "ka??d?? sekundu";
    };
    sk.prototype.everyX0Seconds = function () {
        return "ka??d??ch %s sek??nd";
    };
    sk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    sk.prototype.atX0SecondsPastTheMinute = function () {
        return "v %s sek??nd";
    };
    sk.prototype.everyX0Minutes = function () {
        return "ka??d??ch %s min??t";
    };
    sk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "min??ty od %s do %s";
    };
    sk.prototype.atX0MinutesPastTheHour = function () {
        return "v %s min??t";
    };
    sk.prototype.everyX0Hours = function () {
        return "ka??d??ch %s hod??n";
    };
    sk.prototype.betweenX0AndX1 = function () {
        return "medzi %s a %s";
    };
    sk.prototype.atX0 = function () {
        return "v %s";
    };
    sk.prototype.commaEveryDay = function () {
        return ", ka??d?? de??";
    };
    sk.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ka??d??ch %s dn?? v t????dni";
    };
    sk.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    sk.prototype.first = function () {
        return "prv??";
    };
    sk.prototype.second = function () {
        return "druh??";
    };
    sk.prototype.third = function () {
        return "tret??";
    };
    sk.prototype.fourth = function () {
        return "??tvrt??";
    };
    sk.prototype.fifth = function () {
        return "piaty";
    };
    sk.prototype.commaOnThe = function () {
        return ", ";
    };
    sk.prototype.spaceX0OfTheMonth = function () {
        return " %s v mesiaci";
    };
    sk.prototype.lastDay = function () {
        return "posledn?? de??";
    };
    sk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", posledn?? %s v mesiaci";
    };
    sk.prototype.commaOnlyOnX0 = function () {
        return ", iba v %s";
    };
    sk.prototype.commaAndOnX0 = function () {
        return ", a v %s";
    };
    sk.prototype.commaEveryX0Months = function () {
        return ", ka??d??ch %s mesiacov";
    };
    sk.prototype.commaOnlyInX0 = function () {
        return ", iba v %s";
    };
    sk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", posledn?? de?? v mesiaci";
    };
    sk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", posledn?? pracovn?? de?? v mesiaci";
    };
    sk.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dn?? pred posledn??m d??om v mesiaci";
    };
    sk.prototype.firstWeekday = function () {
        return "prv?? pracovn?? de??";
    };
    sk.prototype.weekdayNearestDayX0 = function () {
        return "pracovn?? de?? najbli????ie %s. d??u";
    };
    sk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", v %s v mesiaci";
    };
    sk.prototype.commaEveryX0Days = function () {
        return ", ka??d??ch %s dn??";
    };
    sk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", medzi d??ami %s a %s v mesiaci";
    };
    sk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. de?? v mesiaci";
    };
    sk.prototype.commaEveryX0Years = function () {
        return ", ka??d??ch %s rokov";
    };
    sk.prototype.commaStartingX0 = function () {
        return ", za????naj??cich %s";
    };
    sk.prototype.daysOfTheWeek = function () {
        return ["Nede??a", "Pondelok", "Utorok", "Streda", "??tvrtok", "Piatok", "Sobota"];
    };
    sk.prototype.monthsOfTheYear = function () {
        return [
            "Janu??r",
            "Febru??r",
            "Marec",
            "Apr??l",
            "M??j",
            "J??n",
            "J??l",
            "August",
            "September",
            "Okt??ber",
            "November",
            "December",
        ];
    };
    return sk;
}());
exports.sk = sk;


/***/ }),

/***/ 738:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sl = void 0;
var sl = (function () {
    function sl() {
    }
    sl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Pri generiranju opisa izraza je pri??lo do napake. Preverite sintakso izraza cron.";
    };
    sl.prototype.at = function () {
        return "Ob";
    };
    sl.prototype.atSpace = function () {
        return "Ob ";
    };
    sl.prototype.atX0 = function () {
        return "ob %s";
    };
    sl.prototype.atX0MinutesPastTheHour = function () {
        return "ob %s.";
    };
    sl.prototype.atX0SecondsPastTheMinute = function () {
        return "ob %s.";
    };
    sl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    sl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s. do %s. dne v mesecu";
    };
    sl.prototype.commaEveryDay = function () {
        return ", vsak dan";
    };
    sl.prototype.commaEveryX0Days = function () {
        return ", vsakih %s dni";
    };
    sl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", vsakih %s dni v tednu";
    };
    sl.prototype.commaEveryX0Months = function () {
        return ", vsakih %s mesecev";
    };
    sl.prototype.commaEveryX0Years = function () {
        return ", vsakih %s let";
    };
    sl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. dan v mesecu";
    };
    sl.prototype.commaOnlyInX0 = function () {
        return ", samo v %s";
    };
    sl.prototype.commaOnlyOnX0 = function () {
        return ", samo v %s";
    };
    sl.prototype.commaAndOnX0 = function () {
        return "in naprej %s";
    };
    sl.prototype.commaOnThe = function () {
        return ", ";
    };
    sl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", zadnji %s v mesecu";
    };
    sl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", zadnji delovni dan v mesecu";
    };
    sl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dni pred koncem meseca";
    };
    sl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", zadnji %s v mesecu";
    };
    sl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s v mesecu";
    };
    sl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    sl.prototype.everyHour = function () {
        return "vsako uro";
    };
    sl.prototype.everyMinute = function () {
        return "vsako minuto";
    };
    sl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Vsako minuto od %s do %s";
    };
    sl.prototype.everySecond = function () {
        return "vsako sekundo";
    };
    sl.prototype.everyX0Hours = function () {
        return "vsakih %s ur";
    };
    sl.prototype.everyX0Minutes = function () {
        return "vsakih %s minut";
    };
    sl.prototype.everyX0Seconds = function () {
        return "vsakih %s sekund";
    };
    sl.prototype.fifth = function () {
        return "peti";
    };
    sl.prototype.first = function () {
        return "prvi";
    };
    sl.prototype.firstWeekday = function () {
        return "prvi delovni dan";
    };
    sl.prototype.fourth = function () {
        return "??etrti";
    };
    sl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minute od %s do %s";
    };
    sl.prototype.second = function () {
        return "drugi";
    };
    sl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunde od %s do %s";
    };
    sl.prototype.spaceAnd = function () {
        return " in";
    };
    sl.prototype.spaceX0OfTheMonth = function () {
        return " %s v mesecu";
    };
    sl.prototype.lastDay = function () {
        return "zadnji??";
    };
    sl.prototype.third = function () {
        return "tretji";
    };
    sl.prototype.weekdayNearestDayX0 = function () {
        return "delovni dan, najbli??ji %s. dnevu";
    };
    sl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sl.prototype.commaStartingX0 = function () {
        return ", za??en??i %s";
    };
    sl.prototype.daysOfTheWeek = function () {
        return ["Nedelja", "Ponedeljek", "Torek", "Sreda", "??etrtek", "Petek", "Sobota"];
    };
    sl.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "marec",
            "april",
            "maj",
            "junij",
            "julij",
            "avgust",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return sl;
}());
exports.sl = sl;


/***/ }),

/***/ 673:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sv = void 0;
var sv = (function () {
    function sv() {
    }
    sv.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sv.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sv.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sv.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sv.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sv.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ett fel intr??ffade vid generering av uttryckets beskrivning. Kontrollera cron-uttryckets syntax.";
    };
    sv.prototype.everyMinute = function () {
        return "varje minut";
    };
    sv.prototype.everyHour = function () {
        return "varje timme";
    };
    sv.prototype.atSpace = function () {
        return "Kl ";
    };
    sv.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Varje minut mellan %s och %s";
    };
    sv.prototype.at = function () {
        return "Kl";
    };
    sv.prototype.spaceAnd = function () {
        return " och";
    };
    sv.prototype.everySecond = function () {
        return "varje sekund";
    };
    sv.prototype.everyX0Seconds = function () {
        return "varje %s sekund";
    };
    sv.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderna fr??n %s till och med %s efter minuten";
    };
    sv.prototype.atX0SecondsPastTheMinute = function () {
        return "p?? %s sekunder efter minuten";
    };
    sv.prototype.everyX0Minutes = function () {
        return "var %s minut";
    };
    sv.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuterna fr??n %s till och med %s efter timmen";
    };
    sv.prototype.atX0MinutesPastTheHour = function () {
        return "p?? %s minuten efter timmen";
    };
    sv.prototype.everyX0Hours = function () {
        return "var %s timme";
    };
    sv.prototype.betweenX0AndX1 = function () {
        return "mellan %s och %s";
    };
    sv.prototype.atX0 = function () {
        return "kl %s";
    };
    sv.prototype.commaEveryDay = function () {
        return ", varje dag";
    };
    sv.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", var %s dag i veckan";
    };
    sv.prototype.commaX0ThroughX1 = function () {
        return ", %s till %s";
    };
    sv.prototype.first = function () {
        return "f??rsta";
    };
    sv.prototype.second = function () {
        return "andra";
    };
    sv.prototype.third = function () {
        return "tredje";
    };
    sv.prototype.fourth = function () {
        return "fj??rde";
    };
    sv.prototype.fifth = function () {
        return "femte";
    };
    sv.prototype.commaOnThe = function () {
        return ", den ";
    };
    sv.prototype.spaceX0OfTheMonth = function () {
        return " %sen av m??naden";
    };
    sv.prototype.lastDay = function () {
        return "den sista dagen";
    };
    sv.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", p?? sista %s av m??naden";
    };
    sv.prototype.commaOnlyOnX0 = function () {
        return ", varje %s";
    };
    sv.prototype.commaAndOnX0 = function () {
        return ", och p?? %s";
    };
    sv.prototype.commaEveryX0Months = function () {
        return ", var %s m??nad";
    };
    sv.prototype.commaOnlyInX0 = function () {
        return ", bara p?? %s";
    };
    sv.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", p?? sista dagen av m??naden";
    };
    sv.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", p?? sista veckodag av m??naden";
    };
    sv.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dagar f??re den sista dagen i m??naden";
    };
    sv.prototype.firstWeekday = function () {
        return "f??rsta veckodag";
    };
    sv.prototype.weekdayNearestDayX0 = function () {
        return "veckodagen n??rmast dag %s";
    };
    sv.prototype.commaOnTheX0OfTheMonth = function () {
        return ", p?? den %s av m??naden";
    };
    sv.prototype.commaEveryX0Days = function () {
        return ", var %s dag";
    };
    sv.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellan dag %s och %s av m??naden";
    };
    sv.prototype.commaOnDayX0OfTheMonth = function () {
        return ", p?? dag %s av m??naden";
    };
    sv.prototype.commaEveryX0Years = function () {
        return ", var %s ??r";
    };
    sv.prototype.commaStartingX0 = function () {
        return ", startar %s";
    };
    sv.prototype.daysOfTheWeek = function () {
        return ["s??ndag", "m??ndag", "tisdag", "onsdag", "torsdag", "fredag", "l??rdag"];
    };
    sv.prototype.monthsOfTheYear = function () {
        return [
            "januari",
            "februari",
            "mars",
            "april",
            "maj",
            "juni",
            "juli",
            "augusti",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return sv;
}());
exports.sv = sv;


/***/ }),

/***/ 286:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sw = void 0;
var sw = (function () {
    function sw() {
    }
    sw.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sw.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sw.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sw.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sw.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    sw.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Kuna tatizo wakati wa kutunga msemo. Angalia cron expression syntax.";
    };
    sw.prototype.everyMinute = function () {
        return "kila dakika";
    };
    sw.prototype.everyHour = function () {
        return "kila saa";
    };
    sw.prototype.atSpace = function () {
        return "Kwa ";
    };
    sw.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Kila dakika kwanzia %s hadi %s";
    };
    sw.prototype.at = function () {
        return "Kwa";
    };
    sw.prototype.spaceAnd = function () {
        return " na";
    };
    sw.prototype.everySecond = function () {
        return "kila sekunde";
    };
    sw.prototype.everyX0Seconds = function () {
        return "kila sekunde %s";
    };
    sw.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunde ya %s hadi %s baada ya dakika";
    };
    sw.prototype.atX0SecondsPastTheMinute = function () {
        return "at %s seconds past the minute";
        return "sekunde %s baada ya dakika";
    };
    sw.prototype.everyX0Minutes = function () {
        return "kila dakika %s";
    };
    sw.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    sw.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    sw.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    sw.prototype.betweenX0AndX1 = function () {
        return "kati ya %s na %s";
    };
    sw.prototype.atX0 = function () {
        return "kwenye %s";
    };
    sw.prototype.commaEveryDay = function () {
        return ", kila siku";
    };
    sw.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", kila siku %s ya wiki";
    };
    sw.prototype.commaX0ThroughX1 = function () {
        return ", %s hadi %s";
    };
    sw.prototype.first = function () {
        return "ya kwanza";
    };
    sw.prototype.second = function () {
        return "ya pili";
    };
    sw.prototype.third = function () {
        return "ya tatu";
    };
    sw.prototype.fourth = function () {
        return "ya nne";
    };
    sw.prototype.fifth = function () {
        return "ya tano";
    };
    sw.prototype.commaOnThe = function () {
        return ", kwenye ";
    };
    sw.prototype.spaceX0OfTheMonth = function () {
        return " siku %s ya mwezi";
    };
    sw.prototype.lastDay = function () {
        return "siku ya mwisho";
    };
    sw.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaOnlyOnX0 = function () {
        return ", kwa %s tu";
    };
    sw.prototype.commaAndOnX0 = function () {
        return ", na pia %s";
    };
    sw.prototype.commaEveryX0Months = function () {
        return ", kila mwezi wa %s";
    };
    sw.prototype.commaOnlyInX0 = function () {
        return ", kwa %s tu";
    };
    sw.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", siku ya mwisho wa mwezi";
    };
    sw.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", wikendi ya mwisho wa mwezi";
    };
    sw.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", siku ya %s kabla ya siku ya mwisho wa mwezi";
    };
    sw.prototype.firstWeekday = function () {
        return "siku za kazi ya kwanza";
    };
    sw.prototype.weekdayNearestDayX0 = function () {
        return "siku ya kazi karibu na siku ya %s";
    };
    sw.prototype.commaOnTheX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaEveryX0Days = function () {
        return ", kila siku %s";
    };
    sw.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", kati ya siku %s na %s ya mwezi";
    };
    sw.prototype.commaOnDayX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaEveryX0Years = function () {
        return ", kila miaka %s";
    };
    sw.prototype.commaStartingX0 = function () {
        return ", kwanzia %s";
    };
    sw.prototype.daysOfTheWeek = function () {
        return ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];
    };
    sw.prototype.monthsOfTheYear = function () {
        return [
            "Januari",
            "Februari",
            "Machi",
            "Aprili",
            "Mei",
            "Juni",
            "Julai",
            "Agosti",
            "Septemba",
            "Oktoba",
            "Novemba",
            "Desemba",
        ];
    };
    return sw;
}());
exports.sw = sw;


/***/ }),

/***/ 999:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tr = void 0;
var tr = (function () {
    function tr() {
    }
    tr.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    tr.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    tr.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    tr.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    tr.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    tr.prototype.everyMinute = function () {
        return "her dakika";
    };
    tr.prototype.everyHour = function () {
        return "her saat";
    };
    tr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "??fade a????klamas??n?? olu??tururken bir hata olu??tu. Cron ifadesini g??zden ge??irin.";
    };
    tr.prototype.atSpace = function () {
        return "Saat ";
    };
    tr.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Saat %s ve %s aras??ndaki her dakika";
    };
    tr.prototype.at = function () {
        return "Saat";
    };
    tr.prototype.spaceAnd = function () {
        return " ve";
    };
    tr.prototype.everySecond = function () {
        return "her saniye";
    };
    tr.prototype.everyX0Seconds = function () {
        return "her %s saniyede bir";
    };
    tr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "dakikalar??n %s. ve %s. saniyeleri aras??";
    };
    tr.prototype.atX0SecondsPastTheMinute = function () {
        return "dakikalar??n %s. saniyesinde";
    };
    tr.prototype.everyX0Minutes = function () {
        return "her %s dakikada bir";
    };
    tr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "saatlerin %s. ve %s. dakikalar?? aras??";
    };
    tr.prototype.atX0MinutesPastTheHour = function () {
        return "saatlerin %s. dakikas??nda";
    };
    tr.prototype.everyX0Hours = function () {
        return "her %s saatte";
    };
    tr.prototype.betweenX0AndX1 = function () {
        return "%s ile %s aras??nda";
    };
    tr.prototype.atX0 = function () {
        return "saat %s";
    };
    tr.prototype.commaEveryDay = function () {
        return ", her g??n";
    };
    tr.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ay??n her %s g??n??";
    };
    tr.prototype.commaX0ThroughX1 = function () {
        return ", %s ile %s aras??nda";
    };
    tr.prototype.first = function () {
        return "ilk";
    };
    tr.prototype.second = function () {
        return "ikinci";
    };
    tr.prototype.third = function () {
        return "??????nc??";
    };
    tr.prototype.fourth = function () {
        return "d??rd??nc??";
    };
    tr.prototype.fifth = function () {
        return "be??inci";
    };
    tr.prototype.commaOnThe = function () {
        return ", ay??n ";
    };
    tr.prototype.spaceX0OfTheMonth = function () {
        return " %s g??n??";
    };
    tr.prototype.lastDay = function () {
        return "son g??n";
    };
    tr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ay??n son %s g??n??";
    };
    tr.prototype.commaOnlyOnX0 = function () {
        return ", sadece %s g??n??";
    };
    tr.prototype.commaAndOnX0 = function () {
        return ", ve %s";
    };
    tr.prototype.commaEveryX0Months = function () {
        return ", %s ayda bir";
    };
    tr.prototype.commaOnlyInX0 = function () {
        return ", sadece %s i??in";
    };
    tr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ay??n son g??n??";
    };
    tr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ay??n son i?? g??n??";
    };
    tr.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ay??n son g??n??nden ??nceki g??nler";
    };
    tr.prototype.firstWeekday = function () {
        return "ilk i?? g??n??";
    };
    tr.prototype.weekdayNearestDayX0 = function () {
        return "%s. g??n?? sonras??ndaki ilk i?? g??n??";
    };
    tr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ay??n %s";
    };
    tr.prototype.commaEveryX0Days = function () {
        return ", %s g??nde bir";
    };
    tr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ay??n %s. ve %s. g??nleri aras??";
    };
    tr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ay??n %s. g??n??";
    };
    tr.prototype.commaEveryX0Years = function () {
        return ", %s y??lda bir";
    };
    tr.prototype.commaStartingX0 = function () {
        return ", ba??lang???? %s";
    };
    tr.prototype.daysOfTheWeek = function () {
        return ["Pazar", "Pazartesi", "Sal??", "??ar??amba", "Per??embe", "Cuma", "Cumartesi"];
    };
    tr.prototype.monthsOfTheYear = function () {
        return [
            "Ocak",
            "??ubat",
            "Mart",
            "Nisan",
            "May??s",
            "Haziran",
            "Temmuz",
            "A??ustos",
            "Eyl??l",
            "Ekim",
            "Kas??m",
            "Aral??k",
        ];
    };
    return tr;
}());
exports.tr = tr;


/***/ }),

/***/ 716:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uk = void 0;
var uk = (function () {
    function uk() {
    }
    uk.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    uk.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    uk.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    uk.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    uk.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    uk.prototype.everyMinute = function () {
        return "??????????????????";
    };
    uk.prototype.everyHour = function () {
        return "????????????????";
    };
    uk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "?????????????????? ?????????????? ???????????? ?????????????????? ??????????. ?????????????????? ???????????????????????? ?????????????????? cron ????????????.";
    };
    uk.prototype.atSpace = function () {
        return "?? ";
    };
    uk.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "?????????????????? ?????? %s ???? %s";
    };
    uk.prototype.at = function () {
        return "??";
    };
    uk.prototype.spaceAnd = function () {
        return " ????";
    };
    uk.prototype.everySecond = function () {
        return "??????????????????";
    };
    uk.prototype.everyX0Seconds = function () {
        return "?????????? %s ????????????";
    };
    uk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "?? %s ???? %s ??????????????";
    };
    uk.prototype.atX0SecondsPastTheMinute = function () {
        return "?? %s ??????????????";
    };
    uk.prototype.everyX0Minutes = function () {
        return "?????????? %s ????????????";
    };
    uk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "?? %s ???? %s ??????????????";
    };
    uk.prototype.atX0MinutesPastTheHour = function () {
        return "?? %s ??????????????";
    };
    uk.prototype.everyX0Hours = function () {
        return "?????????? %s ??????????";
    };
    uk.prototype.betweenX0AndX1 = function () {
        return "?????? %s ???? %s";
    };
    uk.prototype.atX0 = function () {
        return "?? %s";
    };
    uk.prototype.commaEveryDay = function () {
        return ", ??????????????";
    };
    uk.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ?????????? %s ???????? ??????????";
    };
    uk.prototype.commaX0ThroughX1 = function () {
        return ", %s ???? %s";
    };
    uk.prototype.first = function () {
        return "????????????";
    };
    uk.prototype.second = function () {
        return "????????????";
    };
    uk.prototype.third = function () {
        return "????????????";
    };
    uk.prototype.fourth = function () {
        return "??????????????????";
    };
    uk.prototype.fifth = function () {
        return "??'????????";
    };
    uk.prototype.commaOnThe = function () {
        return ", ?? ";
    };
    uk.prototype.spaceX0OfTheMonth = function () {
        return " %s ????????????";
    };
    uk.prototype.lastDay = function () {
        return "???????????????? ????????";
    };
    uk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ?? ???????????????? %s ????????????";
    };
    uk.prototype.commaOnlyOnX0 = function () {
        return ", ???????????? ?? %s";
    };
    uk.prototype.commaAndOnX0 = function () {
        return ", ?? ?? %s";
    };
    uk.prototype.commaEveryX0Months = function () {
        return ", ?????????? %s ????????????";
    };
    uk.prototype.commaOnlyInX0 = function () {
        return ", ???????????? ?? %s";
    };
    uk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ?? ???????????????? ???????? ????????????";
    };
    uk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ?? ???????????????? ???????????? ????????????";
    };
    uk.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ???????? ???? ???????????????????? ?????? ????????????";
    };
    uk.prototype.firstWeekday = function () {
        return "???????????? ????????????";
    };
    uk.prototype.weekdayNearestDayX0 = function () {
        return "???????????? ???????????????????? ???? %s ??????";
    };
    uk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ?? %s ????????????";
    };
    uk.prototype.commaEveryX0Days = function () {
        return ", ?????????? %s ????????";
    };
    uk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ?????? %s ???? %s ?????????? ????????????";
    };
    uk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ???? %s ???????? ????????????";
    };
    uk.prototype.commaEveryX0Years = function () {
        return ", ?????????? %s ????????";
    };
    uk.prototype.commaStartingX0 = function () {
        return ", ?????????????? %s";
    };
    uk.prototype.daysOfTheWeek = function () {
        return ["????????????", "??????????????????", "????????????????", "????????????", "????????????", "??'????????????", "????????????"];
    };
    uk.prototype.monthsOfTheYear = function () {
        return [
            "????????????",
            "??????????",
            "????????????????",
            "??????????????",
            "??????????????",
            "??????????????",
            "????????????",
            "??????????????",
            "????????????????",
            "??????????????",
            "????????????????",
            "??????????????",
        ];
    };
    return uk;
}());
exports.uk = uk;


/***/ }),

/***/ 419:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zh_CN = void 0;
var zh_CN = (function () {
    function zh_CN() {
    }
    zh_CN.prototype.setPeriodBeforeTime = function () {
        return true;
    };
    zh_CN.prototype.pm = function () {
        return "??????";
    };
    zh_CN.prototype.am = function () {
        return "??????";
    };
    zh_CN.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    zh_CN.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    zh_CN.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    zh_CN.prototype.commaYearX0ThroughYearX1 = function () {
        return ", ???%s??????%s???";
    };
    zh_CN.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    zh_CN.prototype.everyMinute = function () {
        return "?????????";
    };
    zh_CN.prototype.everyHour = function () {
        return "?????????";
    };
    zh_CN.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "???????????????????????????????????????????????????cron??????????????????";
    };
    zh_CN.prototype.atSpace = function () {
        return "???";
    };
    zh_CN.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "??? %s ??? %s ??????????????????";
    };
    zh_CN.prototype.at = function () {
        return "???";
    };
    zh_CN.prototype.spaceAnd = function () {
        return " ???";
    };
    zh_CN.prototype.everySecond = function () {
        return "??????";
    };
    zh_CN.prototype.everyX0Seconds = function () {
        return "?????? %s ???";
    };
    zh_CN.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "?????????????????? %s ??? %s ???";
    };
    zh_CN.prototype.atX0SecondsPastTheMinute = function () {
        return "?????????????????? %s ???";
    };
    zh_CN.prototype.everyX0Minutes = function () {
        return "?????? %s ??????";
    };
    zh_CN.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "?????????????????? %s ??? %s ??????";
    };
    zh_CN.prototype.atX0MinutesPastTheHour = function () {
        return "?????????????????? %s ??????";
    };
    zh_CN.prototype.everyX0Hours = function () {
        return "?????? %s ??????";
    };
    zh_CN.prototype.betweenX0AndX1 = function () {
        return "??? %s ??? %s ??????";
    };
    zh_CN.prototype.atX0 = function () {
        return "???%s";
    };
    zh_CN.prototype.commaEveryDay = function () {
        return ", ??????";
    };
    zh_CN.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ???????????? %s ???";
    };
    zh_CN.prototype.commaX0ThroughX1 = function () {
        return ", %s???%s";
    };
    zh_CN.prototype.first = function () {
        return "?????????";
    };
    zh_CN.prototype.second = function () {
        return "?????????";
    };
    zh_CN.prototype.third = function () {
        return "?????????";
    };
    zh_CN.prototype.fourth = function () {
        return "?????????";
    };
    zh_CN.prototype.fifth = function () {
        return "?????????";
    };
    zh_CN.prototype.commaOnThe = function () {
        return ", ????????????";
    };
    zh_CN.prototype.spaceX0OfTheMonth = function () {
        return "%s";
    };
    zh_CN.prototype.lastDay = function () {
        return "??????????????????";
    };
    zh_CN.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ????????????????????????%s";
    };
    zh_CN.prototype.commaOnlyOnX0 = function () {
        return ", ???%s";
    };
    zh_CN.prototype.commaAndOnX0 = function () {
        return ", ?????????%s";
    };
    zh_CN.prototype.commaEveryX0Months = function () {
        return ", ?????? %s ??????";
    };
    zh_CN.prototype.commaOnlyInX0 = function () {
        return ", ??????%s";
    };
    zh_CN.prototype.commaOnlyInMonthX0 = function () {
        return ", ??????%s???";
    };
    zh_CN.prototype.commaOnlyInYearX0 = function () {
        return ", ?????? %s ???";
    };
    zh_CN.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ????????????????????????";
    };
    zh_CN.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ?????????????????????????????????";
    };
    zh_CN.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", ???????????????%s???";
    };
    zh_CN.prototype.firstWeekday = function () {
        return "??????????????????";
    };
    zh_CN.prototype.weekdayNearestDayX0 = function () {
        return "????????? %s ???????????????";
    };
    zh_CN.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ????????????%s";
    };
    zh_CN.prototype.commaEveryX0Days = function () {
        return ", ?????? %s ???";
    };
    zh_CN.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ???????????? %s ??? %s ??????";
    };
    zh_CN.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ?????????%s";
    };
    zh_CN.prototype.commaEveryX0Years = function () {
        return ", ?????? %s ???";
    };
    zh_CN.prototype.commaStartingX0 = function () {
        return ", %s??????";
    };
    zh_CN.prototype.dayX0 = function () {
        return " %s ???";
    };
    zh_CN.prototype.daysOfTheWeek = function () {
        return ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"];
    };
    zh_CN.prototype.monthsOfTheYear = function () {
        return ["??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????", "?????????"];
    };
    return zh_CN;
}());
exports.zh_CN = zh_CN;


/***/ }),

/***/ 139:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zh_TW = void 0;
var zh_TW = (function () {
    function zh_TW() {
    }
    zh_TW.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    zh_TW.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    zh_TW.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    zh_TW.prototype.commaYearX0ThroughYearX1 = function () {
        return ", ???%s??????%s???";
    };
    zh_TW.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    zh_TW.prototype.everyMinute = function () {
        return "?????????";
    };
    zh_TW.prototype.everyHour = function () {
        return "?????????";
    };
    zh_TW.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "????????????????????????????????????????????????????????? cron ??????????????????";
    };
    zh_TW.prototype.atSpace = function () {
        return "??? ";
    };
    zh_TW.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "??? %s ??? %s ??????????????????";
    };
    zh_TW.prototype.at = function () {
        return "???";
    };
    zh_TW.prototype.spaceAnd = function () {
        return " ???";
    };
    zh_TW.prototype.everySecond = function () {
        return "??????";
    };
    zh_TW.prototype.everyX0Seconds = function () {
        return "??? %s ???";
    };
    zh_TW.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "??????????????? %s ??? %s ???";
    };
    zh_TW.prototype.atX0SecondsPastTheMinute = function () {
        return "??????????????? %s ???";
    };
    zh_TW.prototype.everyX0Minutes = function () {
        return "??? %s ??????";
    };
    zh_TW.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "??????????????? %s ??? %s ??????";
    };
    zh_TW.prototype.atX0MinutesPastTheHour = function () {
        return "??????????????? %s ???";
    };
    zh_TW.prototype.everyX0Hours = function () {
        return "??? %s ??????";
    };
    zh_TW.prototype.betweenX0AndX1 = function () {
        return "??? %s ??? %s ??????";
    };
    zh_TW.prototype.atX0 = function () {
        return "??? %s";
    };
    zh_TW.prototype.commaEveryDay = function () {
        return ", ??????";
    };
    zh_TW.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ???????????? %s ???";
    };
    zh_TW.prototype.commaX0ThroughX1 = function () {
        return ", %s ??? %s";
    };
    zh_TW.prototype.first = function () {
        return "?????????";
    };
    zh_TW.prototype.second = function () {
        return "?????????";
    };
    zh_TW.prototype.third = function () {
        return "?????????";
    };
    zh_TW.prototype.fourth = function () {
        return "?????????";
    };
    zh_TW.prototype.fifth = function () {
        return "?????????";
    };
    zh_TW.prototype.commaOnThe = function () {
        return ", ????????? ";
    };
    zh_TW.prototype.spaceX0OfTheMonth = function () {
        return "%s ";
    };
    zh_TW.prototype.lastDay = function () {
        return "????????????";
    };
    zh_TW.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ????????????????????? %s ";
    };
    zh_TW.prototype.commaOnlyOnX0 = function () {
        return ", ?????? %s";
    };
    zh_TW.prototype.commaAndOnX0 = function () {
        return ", ??? %s";
    };
    zh_TW.prototype.commaEveryX0Months = function () {
        return ", ??? %s ???";
    };
    zh_TW.prototype.commaOnlyInX0 = function () {
        return ", ?????? %s";
    };
    zh_TW.prototype.commaOnlyInMonthX0 = function () {
        return ", ??????%s";
    };
    zh_TW.prototype.commaOnlyInYearX0 = function () {
        return ", ?????? %s ???";
    };
    zh_TW.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ?????????????????????";
    };
    zh_TW.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ??????????????????????????????";
    };
    zh_TW.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ????????????????????????????????????";
    };
    zh_TW.prototype.firstWeekday = function () {
        return "??????????????????";
    };
    zh_TW.prototype.weekdayNearestDayX0 = function () {
        return "????????? %s ???????????????";
    };
    zh_TW.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ????????? %s ";
    };
    zh_TW.prototype.commaEveryX0Days = function () {
        return ", ??? %s ???";
    };
    zh_TW.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ???????????? %s ??? %s ??????";
    };
    zh_TW.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ????????? %s";
    };
    zh_TW.prototype.commaEveryX0Years = function () {
        return ", ??? %s ???";
    };
    zh_TW.prototype.commaStartingX0 = function () {
        return ", %s ??????";
    };
    zh_TW.prototype.dayX0 = function () {
        return " %s ???";
    };
    zh_TW.prototype.daysOfTheWeek = function () {
        return ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"];
    };
    zh_TW.prototype.monthsOfTheYear = function () {
        return ["??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????", "?????????"];
    };
    return zh_TW;
}());
exports.zh_TW = zh_TW;


/***/ }),

/***/ 586:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function assert(value, message) {
    if (!value) {
        throw new Error(message);
    }
}
var RangeValidator = (function () {
    function RangeValidator() {
    }
    RangeValidator.secondRange = function (parse) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var second = parseInt(parsed[i], 10);
                assert(second >= 0 && second <= 59, 'seconds part must be >= 0 and <= 59');
            }
        }
    };
    RangeValidator.minuteRange = function (parse) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var minute = parseInt(parsed[i], 10);
                assert(minute >= 0 && minute <= 59, 'minutes part must be >= 0 and <= 59');
            }
        }
    };
    RangeValidator.hourRange = function (parse) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var hour = parseInt(parsed[i], 10);
                assert(hour >= 0 && hour <= 23, 'hours part must be >= 0 and <= 23');
            }
        }
    };
    RangeValidator.dayOfMonthRange = function (parse) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var dayOfMonth = parseInt(parsed[i], 10);
                assert(dayOfMonth >= 1 && dayOfMonth <= 31, 'DOM part must be >= 1 and <= 31');
            }
        }
    };
    RangeValidator.monthRange = function (parse, monthStartIndexZero) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var month = parseInt(parsed[i], 10);
                assert(month >= 1 && month <= 12, monthStartIndexZero ? 'month part must be >= 0 and <= 11' : 'month part must be >= 1 and <= 12');
            }
        }
    };
    RangeValidator.dayOfWeekRange = function (parse, dayOfWeekStartIndexZero) {
        var parsed = parse.split(',');
        for (var i = 0; i < parsed.length; i++) {
            if (!isNaN(parseInt(parsed[i], 10))) {
                var dayOfWeek = parseInt(parsed[i], 10);
                assert(dayOfWeek >= 0 && dayOfWeek <= 6, dayOfWeekStartIndexZero ? 'DOW part must be >= 0 and <= 6' : 'DOW part must be >= 1 and <= 7');
            }
        }
    };
    return RangeValidator;
}());
exports["default"] = RangeValidator;


/***/ }),

/***/ 910:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringUtilities = void 0;
var StringUtilities = (function () {
    function StringUtilities() {
    }
    StringUtilities.format = function (template) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return template.replace(/%s/g, function (substring) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return values.shift();
        });
    };
    StringUtilities.containsAny = function (text, searchStrings) {
        return searchStrings.some(function (c) {
            return text.indexOf(c) > -1;
        });
    };
    return StringUtilities;
}());
exports.StringUtilities = StringUtilities;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toString = void 0;
var expressionDescriptor_1 = __webpack_require__(728);
var allLocalesLoader_1 = __webpack_require__(282);
expressionDescriptor_1.ExpressionDescriptor.initialize(new allLocalesLoader_1.allLocalesLoader());
exports["default"] = expressionDescriptor_1.ExpressionDescriptor;
var toString = expressionDescriptor_1.ExpressionDescriptor.toString;
exports.toString = toString;

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});