// 类型守卫
{
  // 类型守卫的作用在于触发类型缩小，它还可以用来区分类型集合中的不同成员。
  const convertToUpperCase = (strOrArray: string | string[]) => {
    if (typeof strOrArray === 'string') {
      return strOrArray.toUpperCase();
    } else if (Array.isArray(strOrArray)) {
      return strOrArray.map(item => item.toUpperCase());
    }
  }
}


// 