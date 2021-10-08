function say(word) {
    console.log(word);
}
say('hello world');
var entity = {
    add: function (a, b) { return a + b; },
    del: function (a, b) {
        return a - b;
    }
};
function convert(x) {
    if (typeof x === 'string') {
        return Number(x);
    }
    if (typeof x === 'number') {
        return String(x);
    }
    return -1;
}
var x1 = convert('1'); // => number
var x2 = convert(1); // => string
var x3 = convert(null); // -1
// 类型谓词
function isString(s) {
    return typeof s === 'string';
}
function isNumber(n) {
    return typeof n === 'number';
}
function operator(x) {
    if (isString(x)) { // ok x 类型缩小为 string
    }
    //   if (isNumber(x)) { // ts(2345) unknown 不能赋值给 number
    //   }
}
var StudyInterface = function (language) { return console.log(language.name + " " + language.age()); };
// 联合类型
function formatUnit(size, unit) {
    if (unit === void 0) { unit = 'px'; }
}
formatUnit(1, 'em'); // ok
formatUnit('1px', 'rem'); // ok
var mixed = {
    id: 1,
    name: 'name',
    age: 18
};
var intersectionA = 'em'; // ok
var intersectionB = 'rem'; // ok
// 枚举类型
var Day;
(function (Day) {
    Day[Day["SUNDAY"] = 0] = "SUNDAY";
    Day[Day["MONDAY"] = 1] = "MONDAY";
    Day[Day["TUESDAY"] = 2] = "TUESDAY";
    Day[Day["WEDNESDAY"] = 3] = "WEDNESDAY";
    Day[Day["THURSDAY"] = 4] = "THURSDAY";
    Day[Day["FRIDAY"] = 5] = "FRIDAY";
    Day[Day["SATURDAY"] = 6] = "SATURDAY";
})(Day || (Day = {}));
// 泛型
function reflect(param) {
    return param;
}
var reflectStr = reflect('string'); // str 类型是 string
var reflectNum = reflect(1); // num 类型 number
// useState
function useState(state, initialValue) {
    return [state, function (s) { return void 0; }];
}
// 泛型约束
function reflectSpecified(param) {
    return param;
}
reflectSpecified('string'); // ok
reflectSpecified(1); // ok
reflectSpecified(true); // ok
var setValueOfObj = function (obj, key, value) { return (obj[key] = value); };
setValueOfObj({ id: 1, name: 'name' }, 'id', 2); // ok
setValueOfObj({ id: 1, name: 'name' }, 'name', 'new name'); // ok
