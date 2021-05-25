# 碎片知识

  ## 同步与异步加载的三种方法、企业级异步加载

    异步加载

      1. 异步加载，指加载JS脚本，我们可以设置属性，浏览器帮我们执行加载操作。
      2. 可以自己写一个异步加载方法，执行异步加载操作。

    企业级工具函数写法

      命名空间写法

        命名空间写法可以让我们知道方法出自于哪里，把某些功能封装在一起。

        1. var utils = {
            func1: function () { },
            func2: function () { }
          }

          utils.func1();

        2. Element.prototype = {
            func1: function () { },
            func2: function () { }
          }

          elem.func1();
    
    探究同步加载

      可以在head标签内或者body标签内引入外部脚本文件。

      为什么外部JS脚本引入放在body标签最底部？CSS脚本引入可以放在head标签内？

        当浏览器遇到CSS外部样式引入，会新开辟新线程加载文件，不会影响DOM解析。
        当浏览器遇到未设置异步的script标签，会阻塞DOM解析，等到JS加载并且执行完毕，才会继续解析DOM。
        这种加载script标签的方式，叫做同步加载（阻塞加载、同步模式、阻塞模式）。
        放在页面最后，可以极大的减少阻塞，不能完全解决解决阻塞问题（多个script标签存在，会有阻塞现象）。

      为什么加载JS脚本默认是同步的？

        JS中常常存在修改DOM结构、重定向、对DOM的增加删除，如果异步，会产生DOM冲突。

    探究异步加载

      异步加载（defer、async），就是浏览器会并行加载script脚本，和link标签差不多。
      
      异步加载同时，不会阻塞解析CSS，解析DOM结构，不会阻塞浏览器后续处理。

      defer：IE8及以下至IE4都可以使用，IE4已经存在该方法。异步加载，不阻塞后续处理，
             但是加载完不会立即执行。DOM树构建完毕后会顺序执行script脚本。

      async：W3C标准，HTML5新增属性，IE9及以上支持该属性。
             异步加载，不阻塞后续处理，加载完毕会立刻执行script脚本。

      异步加载JS脚本是不能对文档进行操作的，异步加载会存在DOM冲突。
    
      defer和async同时设置，也是异步加载的，除IE8之下，优先判断为async。

      异步加载不常用，一般工具函数、与DOM操作无关的JS脚本、按需加载的才会使用异步加载。

      按需加载，比如点击反馈效果，封装一个模块，点击时，按需加载，然后实现对应效果。
    
    企业级异步加载

      var s = document.createElement('script'); // 主动创建就是异步加载

      s.type = 'text/javascript';
      s.async = true; // 无实际作用，只是在标签上添加async属性
      s.src = 'js/index.js'; // src引入时已经在下载（加载）JS脚本，不会执行

      document.body.appendChild(s); // 放入html中，执行JS脚本

      异步加载时，不会触发window.onload方法，建议在window.onload之后进行异步加载。
      
        ;(function () {
          function async_load () {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'js/index.js';
            document.body.appendChild(s);
          }

          if (window.attachEvent) {
            window.attachEvent('onload', async_load);
          } else {
            window.addEventListener('load', async_load, false);
          }
        })();

      一般来说，异步加载一般写在最上面，一般企业会在head标签内放一个关于页面配置的脚本文件。
      可以借助这个script脚本文件，把异步加载的script脚本放到head标签内。
          
        ;(function () {
          function async_load () {
            var s = document.createElement('script'),
                oScript = document.getElementsByTagName('script')[0];

            s.type = 'text/javascript';
            s.async = true;
            s.src = 'js/index.js';

            oScript.parentNode.insertBefore(s, oScript);
          }

          if (window.attachEvent) {
            window.attachEvent('onload', async_load);
          } else {
            window.addEventListener('load', async_load, false);
          }
        })();

      如果又要进行异步加载，又要立刻执行JS脚本内方法，如何实现？

        readyState onreadystatechange IE提出的事件
        s.onload 事件 W3C浏览器存在该方法，IE不存在

        function async_exec (url, fn) {
          var s = document.createElement('script'),
              oScript = document.getElementsByTagName('script')[0];

          s.type = 'text/javascript';
          s.async = true;

          if (s.readyState) {
            s.onreadystatechange = function () {
              var state = s.readyState;

              if (state === 'complate' || state === 'loaded') {
                utils[fn]();
              }
            }
          } else {
            s.onload = function () {
              utils[fn]();
            }
          }
          
          s.src = url;
          oScript.parentNode.insertBefore(s, oScript);
        }

        async_exec('js/index.js', 'test1');

    微信的SDK是放在最上边的，所以每次加载都会由一定的延迟，页面阻塞产生白屏现象（同步加载）。
    PC端可以放在上面，移动端移动不要把script引入写在最上面，2.5s之内如果用户看不到页面，就是失败的。

  ## 异步加载案例、放大模式、宽放大模式

    window.frameElement 返回当前window对象的元素，chrome没有反应，IE、火狐有反应。

    * 异步加载案例（async_load）

    模块

      方法集合

        var utils = (function () {
          function test1 () { }
          function test2 () { }

          return {
            test1: test1,
            test2: test2
          }
        })();

      功能体

        function init_modules () {
            initCompute();
        }

        var initCompute = (function () {
          function init () {
            bindEvent();
          }

          function bindEvent () { }

          return function () {
            init();
          }
        })();

    模块间继承（模块依赖）

      var mod1 = (function () {
        var test1 = function () {
          console.log('test1');
        },

        test2 = function () {
          console.log('test2');
        },

        test3 = function () {
          console.log('test3');
        }

        return {
          test1: test1,
          test2: test2,
          test3: test3
        }
      })();

      var mod2 = (function (mod) {
        var test4 = function () {
          mod.test1();
        },

        test5 = function () {
          mod.test2();
        },

        test6 = function () {
          mod.test3();
        }

        return {
          test4: test4,
          test5: test5,
          test6: test6
        }
      })(mod1);

      mod2.test5();
      mod2.test6();
      mod2.test7();

      这种写模块的方式就是模块化的放大模式（augmentation），可以进行多人协作开发。

    放大模式

      module_1.js

        var mod = {};

        mod = (function (module) {
          module.a = 1;

          module.test1 = function () {
            console.log('test1');
          }

          return module;
        })(mod);

      module_2.js

        var mod = (function (module) {
          module.b = 2;

          module.test2 = function () {
            console.log('test2');
          }

          return module;
        })(mod);

      index.html

        mod.test1();
        mod.test2();

    宽放大模式 (Loose augmentation)

      module_1.js

        var mod = (function (module) {
          module.a = 1;

          module.test1 = function () {
            console.log('test1');
          }

          return module;
        })(mod || {});

      module_2.js

        var mod = (function (module) {
          module.b = 2;

          module.test2 = function () {
            console.log('test2');
          }

          return module;
        })((mod || {});

      index.html

        mod.test1();
        mod.test2();

    模块化外层一般是存在全局变量的，可以注入全局变量。

  ## 探究bind与call、apply的区别，重写bind方法

    call、bind、apply 改变this指向

    bind与call的区别：

      bind改变this指向后返回一个新的函数，不执行。
      call改变this指向并立即执行。

    