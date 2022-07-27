function freeze (obj) {
  Object.freeze(obj);
  for (const key in obj) {
    if (typeof(obj[key]) === 'object' && obj[key] !== null) {
      freeze(obj[key]);
    }
  }
}   

const person = {
  name: 'zhangsan',
  son: {
    name: 'lisi',
    son: {
      name: 'wangwu',
      son: {
        name: 'zhaoliu'
      }
    }
  }
};

// Object.freeze(person);
freeze(person);

person.name = 'zhangsan2';
person.son.name = 'lisi2';
console.log(person);