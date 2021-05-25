const map = new Map();

// 增加
map.set('a', 'aa');
map.set('b', 'bb');

// 修改
map.set('a', 'aaa');

// 查找
const item = map.get('b');

// 删除
map.delete('b');
map.clear();
