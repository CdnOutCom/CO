"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DType;
(function (DType) {
    DType["float32"] = "float32";
    DType["int32"] = "int32";
    DType["bool"] = "bool";
})(DType = exports.DType || (exports.DType = {}));
var Rank;
(function (Rank) {
    Rank["R0"] = "R0";
    Rank["R1"] = "R1";
    Rank["R2"] = "R2";
    Rank["R3"] = "R3";
    Rank["R4"] = "R4";
})(Rank = exports.Rank || (exports.Rank = {}));
var UpcastInt32AndMap;
(function (UpcastInt32AndMap) {
    UpcastInt32AndMap["float32"] = "float32";
    UpcastInt32AndMap["int32"] = "int32";
    UpcastInt32AndMap["bool"] = "int32";
})(UpcastInt32AndMap || (UpcastInt32AndMap = {}));
var UpcastBoolAndMap;
(function (UpcastBoolAndMap) {
    UpcastBoolAndMap["float32"] = "float32";
    UpcastBoolAndMap["int32"] = "int32";
    UpcastBoolAndMap["bool"] = "bool";
})(UpcastBoolAndMap || (UpcastBoolAndMap = {}));
var UpcastFloat32AndMap;
(function (UpcastFloat32AndMap) {
    UpcastFloat32AndMap["float32"] = "float32";
    UpcastFloat32AndMap["int32"] = "float32";
    UpcastFloat32AndMap["bool"] = "float32";
})(UpcastFloat32AndMap || (UpcastFloat32AndMap = {}));
var upcastTypeMap = {
    float32: UpcastFloat32AndMap,
    int32: UpcastInt32AndMap,
    bool: UpcastBoolAndMap
};
function upcastType(typeA, typeB) {
    return upcastTypeMap[typeA][typeB];
}
exports.upcastType = upcastType;
function sumOutType(type) {
    return upcastType(type, 'int32');
}
exports.sumOutType = sumOutType;
