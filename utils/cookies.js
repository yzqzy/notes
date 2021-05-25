var manageCookies = {
  set: function (key, value, expTime) {
    document.cookie = key + '=' + value + ';max-age=' + expTime;
    return this;
  },
  delete: function (key) {
    return this.set(key, '', -1);
  },
  get: function (key, callback) {
    var cookiesArr = document.cookie.split('; ');
    for (var i = 0; i < cookiesArr.length; i++) {
      var cookieItem = cookiesArr[i],
          cookieItemArr = cookieItem.split('=');

      if (cookieItemArr[0] === key) {
        callback(cookieItemArr[1]);
        return this;
      }
    }
    callback(undefined);
    return this;  
  }
}