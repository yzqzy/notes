/** 接口类型 start */
// TypeScript 对对象的类型检测遵循一种被称之为“鸭子类型”（duck typing）或者“结构化类型（structural subtyping）”的准则，
// 即只要两个对象的结构一致，属性和方法的类型一致，则它们的类型就是一致的。

function Study(language: { name: string; age: () => number }) {
  console.log(`ProgramLanguage ${language.name} created ${language.age()} years ago.`);
}

Study({
  name: 'TypeScript',
  age: () => new Date().getFullYear() - 2012
});
/** 接口类型 end */