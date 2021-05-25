function freeze (obj) {
  Object.freeze(obj);
  for (const key in obj) {
    if (typeof(obj[key]) === 'object' && obj[key] !== null) {
      Object.freeze(obj[key]);
      freeze(obj[key]);
    }
  }
}

const person = {
  son: {
    lisi: 18,
    zhangsan: 19
  },
  car: ['mazda', 'BMW'],
  lang: {
    js: {
      dom: 'dom',
      bom: 'bom'
    }
  }
}

freeze(person);
person.son.wangwu = 20;
person.car[2] = 'benze';
person.lang.js.dom = 'dom1';
console.log(person);