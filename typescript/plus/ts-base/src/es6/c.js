"use strict";
exports.__esModule = true;
// 批量导入
var a_1 = require("./a");
// 导入时起别名
var a_2 = require("./a");
// 导入模块的所有成员，绑定到 All 上
var All = require("./a");
// 不加 {}，导入默认
var a_3 = require("./a");
console.log('-- es6 module start --');
console.log(a_1.a, a_1.b, a_1.c);
var p = {
    x: 1,
    y: 2
};
console.log(a_2.f);
console.log(All);
(0, a_3["default"])();
console.log('-- es6 module end --');
