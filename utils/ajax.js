var $ = (function () {
  function _ajax (opt) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest()
                                    : new ActiveXObject('Microsoft.XMLHTTP');
    var t = null;

    if (!xhr) {
      throw new Error('您的浏览器不支持异步发起HTTP请求');
    }

    var opt = opt || {},
        type = (opt.type || 'GET').toUpperCase(),
        async = opt.async === false  ? false : true,
        dataType = opt.dataType && opt.dataType.toUpperCase() || 'JSON',
        jsonp = opt.jsonp || 'cb',
        jsonpCallback = opt.jsonpCallback || 'Jquery' + _randomNum() + '_' + new Date().getTime(),
        url = opt.url,
        data = opt.data || null,
        timeout = opt.timeout || 1000 * 30,
        error = opt.error || function () {},
        success = opt.success || function () {},
        complete = opt.complete || function () {};

    if (!url) {
      throw new Error('您没有填写URL');
    }

    if (dataType.toUpperCase() === 'JSONP' && type !== 'GET') {
      throw new Error('JSONP格式必须是GET请求');
    }

    if (dataType.toUpperCase() === 'JSONP') {
      var oScript = document.createElement('script');
      oScript.src = url.indexOf('?') === -1 ? url + '?' + jsonp + '=' + jsonpCallback
                                            : url + '&' + jsonp + '=' + jsonpCallback;

      document.body.appendChild(oScript);
      document.body.removeChild(oScript);

      window[jsonpCallback] = function (data) {
        success(data);
      }
      return;
    }
    
    t = setTimeout(function () {
      xhr.abort();
      error();
      complete();
      clearTimeout(t);
      t = null;
      xhr = null;
    }, timeout);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          switch (dataType) {
            case 'JSON':
              success(JSON.parse(xhr.responseText));
              break;
            case 'TEXT':
              success(xhr.responseText);
              break;
            case 'XML':
              success(xhr.responseXML);
              break;
            default:
              success(JSON.parse(xhr.responseText));
              break;
          }
        } else {
          error();
        }
        complete();
        clearTimeout(t);
        t = null;
        xhr = null;
      }
    }

    xhr.open(type, url, async);
    type === 'POST' && xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(type === 'GET' ? null : _formatDatas(data));
  }

  function _post (url, data, successCB, errorCB, completeCB) {
    _ajax({
      type: 'POST',
      url: url,
      data: data,
      success: successCB,
      error: errorCB,
      complete: completeCB
    });
  }

  function _get (url, successCB, errorCB, completeCB) {
    _ajax({
      type: 'GET',
      url: url,
      success: successCB,
      error: errorCB,
      complete: completeCB
    });
  }

  function _formatDatas (obj) {
    var str = '';
    for (var key in obj) {
     str += key + '=' + obj[key] + '&';
    }
    return str.replace(/&$/, '');
  }

  function _randomNum () {
    var num = 0;
    for (var i = 0; i < 20; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }

  return {
    ajax: _ajax,
    post: _post,
    get: _get
  }
})();

var ajaxDomain = (function () {
  function createIframe (frameId, frameUrl) {
    var frame = document.createElement('iframe');
    frame.src = frameUrl;
    frame.id = frameId;
    frame.style.display = 'none';
    return frame;
  }

  return function (opt) {
    document.domain = opt.basicDomain;
    var iframe = createIframe(opt.frameId, opt.frameUrl);
    frame.onload = function () {
      var $$ = document.getElementById(opt.frameId).contentWindow.$;
      $$.ajax({
        url: opt.url,
        type: opt.type,
        data: opt.data,
        success: opt.success,
        error: opt.error
      });
    }
    document.body.appendChild(iframe);
  }
})();