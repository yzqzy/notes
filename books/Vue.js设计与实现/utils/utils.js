let handleError = null;

export default {
  foo (fn) {
    callWithErrorHandling(fn);
  },
  bar (fn) {
    callWithErrorHandling(fn);
  },
  // 用户注册错误处理函数
  registerErrorHandler (fn) {
    handleError = fn;
  }
}

function callWithErrorHandling (fn) {[
  try {
    fn && fn();
  } catch (error) {
    // 抛出错误
    handleError && handleError(error);
  }
]}