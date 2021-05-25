import { trimSpace } from '../shared/util';

const reg = /\{\{((?:.|\r?\n)+?)\}\}/g;
// (.|\r?\n) 任意字符或者0个或多个换行
// ?: 不是捕获分组
// +? 出现一次或者多次，非贪婪模式，尽可能少的匹配
// g  全局匹配
// regex101.com 正则表达式网站

export function compiler (node, vm) {
  let childNodes = node.childNodes;
  let childNodesArr = [...childNodes];

  childNodesArr.forEach(child => {
    if (child.nodeType == 1) {
      compiler(child, vm);
    } else if (child.nodeType == 3) {
      compileText(child, vm);
    }
  });
}

function getValue (expOrFn, vm) {
  let keys = expOrFn.split('.');
  return keys.reduce((prev, cur) => {
    prev = prev[cur];
    return prev;
  }, vm)
}

export function compileText (node, vm) {
  if (!node.expr) {
    // 保存表达式 {{ message }} 
    node.expr = node.textContent;
  }
  node.textContent = node.expr.replace(reg, (...args) => {
    let key = trimSpace(args[1]);
    return getValue(key, vm);
  });
}