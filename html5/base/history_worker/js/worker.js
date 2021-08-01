this.onmessage = function (e) {
  if (e.data.addThis) {
    var sumMessage = {
      result: e.data.addThis.num1 + e.data.addThis.num2
    }
    this.postMessage(sumMessage);
  }
}