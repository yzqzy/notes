if (window.Worker) {
  // 实例化worker
  var myWorker = new Worker('js/worker.js');
  // 创建对应信息
  var message = { addThis: { num1: 1, num2: 5 } };
  // 传递信息
  myWorker.postMessage(message);

  myWorker.onmessage = function (e) {
    console.log(e.data.result);
  }
}
