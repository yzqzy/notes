const $ = (function () {
  const randomNum = () => {
    let num = 0;
    for (let i = 0; i < 20; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }

  const formatData = (obj) => {
    let str = '';
    for (let key in obj) {
      str += `${key}=${obj[key]}&`;
    }
    return str.replace(/&$/, '');
  }

  const ajax = (options = {}) => {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest()
                                    : new ActiveXObject('Microsoft.XMLHTTP');

    if (!xhr) {
      throw new Error('您的浏览器不支持异步发起 HTTP 请求');
    } 

    let type = (options.type || 'GET').toUpperCase(),
        dataType = options.dataType && options.dataType.toUpperCase() || 'JSON',
        url = options.url,
        data = options.data || null,
        fail = options.fail || function () {},
        success = options.success || function () {},
        complete = options.complete || function () {},

        timeout = options.timeout || 3 * 10 * 1000,
        jsonp = options.jsonp || 'cb',
        jsonpCallback = options.jsonpCallback || `Jquery${randomNum()}_${Date.now()}`,
        async = options.async === false ? false : true;

    if (!url) {
      throw new Error('您没有填写 URL');
    }

    if (dataType === 'JSONP') {
      if (type !== 'GET') {
        throw new Error('JSONP 格式必须是 GET 请求');
      }

      const oScript = document.createElement('script');

      oScript.src = !!~url.indexOf('?') ? `${url}&${jsonp}=${jsonpCallback}`
                                        : `${url}?${jsonp}=${jsonpCallback}`;

      document.body.appendChild(oScript);
      document.body.removeChild(oScript);

      window[jsonpCallback] = function (data) {
        success(data);
      }

      return;
    }

    t = setTimeout(() => {
      xhr.abort();
      fail();
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
          fail();
        }

        complete();
        clearTimeout(t);
        t = null;
        xhr = null;
      }
    }

    xhr.open(type, url, async);
    type === 'POST' && xhr.setRequestHeader('Content-type', 'appliction/x-www-form-urlencoded');
    xhr.send(type === 'GET' ? null : formatData(data));
  }

  const post = ({ url, data, success, fail, complete }) => {
    ajax({
      type: 'POST',
      url,
      data,
      success,
      fail,
      complete
    });
  }

  const get = ({ url, success, fail, complete }) => {
    ajax({
      type: 'GET',
      url,
      success,
      fail,
      complete
    });
  }

  return {
    ajax,
    get,
    post
  }
})();