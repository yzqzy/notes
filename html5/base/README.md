# HTML5

  ## localStorage、sessionStorage、cookie

              Cookie       LocalStorage   SessionStorage

    容量      4kb             5MB          5MB
    兼容      HTML4/HTML5     HTML5         HTML5
    访问限制  任意窗口         任意窗口       同一个标签页
    过期时间  可以手动设置      不会过期      标签页关闭就会过期（会话存储）
    存储位置  浏览器、服务器    浏览器        浏览器
    请求      会发送到服务器    不会          不会

    Cookie，每次请求的时候都会被发送到服务器上。

    Cookie可以理解为一个个的小文件，用来保存用户的偏好信息。
    比如访问外文网站时的偏好，下次访问网站时，不需要重复选择信息。
    可以记录访问时间及访问访点击连接等等。可以记录用户偏好。
    cookie选择保存的内容是和开发者有关系的。读取cookie也是存在限制的。
    cookie发展到后期，不再存储一些信息，因为容量有限，转为保存唯一的ID。数据保存在服务器上。
    cookie充当浏览器的标识符。通过ID获取访问用户，数据在第三方存储。

    广告宣传，根据cookie保存对应信息，虽然可能当前网站不认识客户端。
    比如在腾讯网站看到某个广告，广告来源的网站会保存一个cookie，下次访问别的网站时，也会查找数据进行展示。
    根据偏好推动不同的广告信息。

    cookie的设置方法

      document.cookie 读取页面所包含的cookie的内容

      新增name  document.cookie = "name=Tom";            


    LocalStorage、SessionStorage

      chrome浏览器的appliaction里可以查看localStorage和SessionStorage的内容。
      键值对的方式。

      localStorage.setItem('name', 'yueluo');
      localStorage.getItem('name');

      如果设置相同的键名，会覆盖原有同名的键值。
      sessionStroage设置和读取方式和LocalStorage保持一致。

      localStorage.removeItem('name'); // 删除数据
      localStorage.clear(); // 删除所有数据

      LocalStorage存在同源策略的问题。

  ## cookie增删改查、用户追踪

    HTTP协议无状态的。 stateless。

    会话（session）和cookie。

    浏览器起到类似用户代理的作用，向服务器请求资源。

    cookie只有大约4kb的存储空间。和会话相关的信息，一般是放在服务器上的。

    例如访问淘宝网相关的网站，每个用户看到的内容是不一样。

    跟踪用户，收集用户喜好，根据喜好去展示想看的内容。


    跟踪用户常见的几种形式：

      1. HTTP headers 

        请求头中包含一些内容。例如referer，反应当前请求的页面是从哪一个页面来的。

      2. 客户端IP地址

        IP地址可能是动态的，不稳定。

      3. 用户登录

      4. 胖url

        用户浏览器网站的时候，部分网站会生成特定版本的url。包含特殊字段，作为每一个用户的唯一标识。

      5. cookie的解决方案

        服务器发送给用户浏览器并保存在本地的数据。

    cookie如何创建的？

      服务器响应请求时，在响应头里会增加Set-Cookie一项，cookie就会保存在浏览器中。
      之后每一次做请求时，在请求头部，就会携带cookie信息。

    cookie包含的字段

      name：cookie名称
      value：cookie值
      domain：执行哪些主机可以接收用户信息
      path：主机下哪些路径可以接收用户信息
      Expires/Max-Age：指定过期时间
    
    document.cookie = 'name=jack; max-age=5000';
    
    var date = new Date(), day = date.getDay();
    date.setDate(day + 10);
    document.cookie = 'name=xiaoming; expires=' + date;

    也可以设置expires或者max-age作为过期时间。
    如果没有设置过期时间，重新启动浏览器就会清除掉cookie信息。格林威治时间。

    可以通过设置过期时间为过去的时间，进行删除cookie操作。

    cookie操作函数封装

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

  ## history、worker

    history

      history是window上的一个属性，保存了用户在当前浏览器访问的一些历史记录。
      history下面有很多方法，这些方法可以帮我们模拟浏览器前进和后退的操作。

      单页面应用，可以使用history对象来实现。

      window.history.legnth // 会话条目（entry）数量
      
      这些条目保存在history的栈中，作为状态。

      history.back()  // 回退操作 =》 浏览器下点击后退按钮
      history.forward(); // 前进操作 =》 浏览器点击前进按钮
      history.go()  // 接收的参数是数字、-1 就会回退一次、1 代表前进一次

      history.replaceState('key', null, 'test') 
      第一个参数作为状态对象的名称，可以是JSON对象或者字符串 （可以使用history.state获取设置的名称） 
      第二个参数一般用来设置当前页面的名字，大部分浏览器不支持。
      最后一个参数的作用，就是改变路由的地址，页面不会立即重新加载url，不会检查url是否存在，是相对地址。
      不会改变整体条目的数量。

      history.pushState() 
      参数和replaceState保持一致。
      会改变整体条目的数量。

      popstate事件

        通过popstate事件的触发，改变页面UI效果。

        每一个history里的状态都叫做一个个的条目，当前活跃的条目，叫做active history entry。

        在每一次活动的历史条目发生改变的时候，就会有一个popstate的事件派发（dispatch）给window对象。
        新增和替换条目不会触发popstate事件，只有在点击回退按钮时，才会触发popstate事件。

      hashchange事件

        可以使用hashchange事件来做单页面应用

    worker

        worker 工人

        为什么出现worker？

          JS是一个单线程的。single thread。

          ajax 非阻塞，不是一个多线程

        web worker

          让应用在后台产生分离的脚本，开启一个新的进程。

          页面和worker之间通信

          postMessage，页面和workder之间发送信息

          onmessage，接收信息

        worker 缺陷

          documeng、window、parent

          不能进行任何的DOM操作，可以发送ajax请求。

          可以使用settimeout和setinterval等方法。

        一个worker可以委派其他worker进行工作。
        可以使用importScripts方法加载其他的worker。

        可以通过terminate()方法终止worker方法。
        
  ## 获取当前位置、设备速度、设备方向

    geolocation 地理位置

      window.navigator下的属性.

      getCurrentPosition 获取当前位置

        window.navigator.geolocation.getCurrentPosition(success, failure);

        function success (e) {
          console.log('获取当前位置成功', e);
        }

        function failure (e) {
          console.log('获取位置失败', e);
        }

        使用谷歌的API服务，谷歌地图查找。

      watchPosition 监控位置

        window.navigator.geolocation.watchPosition

      第三个参数是配置项，比如可以添加超时处理。精确度处理。
      {
        timeout: 500,
      }
      maximunAge：监控用户的过期时间，默认一直监控
      enableHighAccuracy：


    设置速度  devicemotion

      var accDiff = 10,
          lastTime = 0,
          lastAtc = {
            x: 0,
            y: 0,
            z: 0
          };
      window.addEventListener('devicemotion', function (e) {
        var curTime = new Date().getTime(),
            curAtc =  {
              x: e.acceleration.x,
              y: e.acceleration.y,
              z: e.acceleration.z
            };

        if (curTime - lastTime > 1000) {
          if (Math.abs(curAtc.x - lastAtc.x) > accDiff ||
              Math.abs(curAtc.y - lastAtc.y) > accDiff || 
              Math.abs(curAtc.z - lastAtc.z) > accDiff) {
            console.log('你刚才摇了一下');
          }
        }
      });

    设备方向  deviceorientation

      判断设备方向，做类似指南针的应用。

      alpha、beta、gamma

      window.addEventListener('deviceorientation', function (e) {
        console.log(e.alpha); // 设备沿着z轴的方向  0-360
        console.log(e.beta); // 设备沿着x轴的方向 -180-180
        console.log(e.gamma); // 设备沿着z轴的方向 -90-90
      })

      alpha 0的话 指向正北的方向

      webkitCompassHeading判断设备位置指向正北 ios特有 

  ## touchstart、touchmove、touchend

    移动端事件处理

      iphone浏览器 移动端不发达 全部都是PC端网站

      存在300ms的检测，是否缩放屏幕，判断点击第二次。
      click移动端存在问题 300ms延迟问题 

      pc端的dbclick（双击）存在失效问题

      移动端新增事件

      touch事件 触摸事件

      touchEvent

        touchstart：手指按下的时候出发
        touchmove：屏幕上滑动触发
        touchend：手指抬起的时候触发
        touchcancel：比如滑动屏幕，突然接电话

      事件属性

        touches：左右在当前文档上的所有的触点
        changedTouches：和当前事件相关的所有触点
        targetTouches：作用在当前元素上的触点

        一般都是多点触控时用的属性

        

