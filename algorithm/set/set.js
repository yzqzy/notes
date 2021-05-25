const set = new Set();

// 添加元素
set.add(1);
set.add(5);
set.add(5);
set.add('some text');

const obj = { a: 1, b: 2 };
set.add(obj);

// 判断元素是否存在
const has = set.has(5);

// 删除元素
set.delete(5);

// 获取集合数量
const size = set.size;


// // for of 
// for (let item of set) {
//   console.log(item);
// }

// // keys
// for (let item of set.keys()) {
//   console.log(item);
// }

// // values
// for (let item of set.values()) {
//   console.log(item);
// }

// // entries
// for (let item of set.entries()) {
//   console.log(item);
// }


// // Set 转为 Array
// [...set];
// Array.from(set);

// // Array 转 Set
// new Set([1, 2, 3]);


const set2 = new Set([1, 2, 3]);

// 交集
const intersection = new Set([...set].filter(x => set2.has(x)));

// 差集
const difference = new Set([...set].filter(x => !set2.has(x)));