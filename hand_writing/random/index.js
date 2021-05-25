const result = [...ORIGIN_TASKS, ...ALOGRITHM_TASKS],
      len = result.length;


const randomNum = Math.floor(Math.random() * len);

document.body.innerText = result[randomNum];