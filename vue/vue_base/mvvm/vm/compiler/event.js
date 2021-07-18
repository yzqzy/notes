import { formatData, randomNum } from '../../shared/utils';

const reg_onClick = /onClick\=\"(.+?)\"/g;
const reg_fnName = /^(.+?)\(/;
const reg_args = /\((.*?)\)/;

const eventPool = [];

export function eventFormat (template) {
  return template.replace(reg_onClick, function (node, key) {
    const _mark =  randomNum();

    eventPool.push({
      mark: _mark,
      hander: key.trim(),
      type: 'click'
    });

    return `data-mark="${_mark}"`;
  });
}

export function bindEvent (methods)  {
  const allElements = document.querySelectorAll('*');

  let oItem = null;
  let _mark = 0;

  eventPool.forEach(event => {
    for (let i = 0; i < allElements.length; i++) {
      oItem = allElements[i];

      _mark = parseInt(oItem.dataset.mark);

      if (event.mark === _mark) {
        oItem.addEventListener(event.type, function () {
          const fnName = event.hander.match(reg_fnName)[1];
          const args = formatData(event.hander.match(reg_args)[1]);

          methods[fnName](args);
        }, false);
      }
    }
  });
}
