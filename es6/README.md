# ES6

  ## ES6版本过渡历史

    JavaScript
    
      ECMAScript
      DOM
      BOM

    浏览器的阶段

      HTML 1，HTML 2，HTML3 1991 - 1997   
      IETF（The Internet Enginneering Task Force） 国际互联网工程任务组

      1997.1 HTML3.2 版本发布 从这个版本到现在，归属于W3C组织（万维网联盟）。

      
      ECMA  日内瓦  ECMA-262规范 ECMAScript脚本语言规范


      1995 LiveScript诞生 但是并不强大  
          更名为JavaScript

      1996  javascript 1.0 1.1

      1997 Jscript IE抄了一份javascript，叫做JScript，网景公司倒闭，并把源码公开

      1997.6 ECMAScript 1.0（以当初JavaScript第一个版本为蓝本）

      1998.6 ECMAScript 2.0

      1999.12 ECMAScript 3.0

      2000  ECMAScript 4.0 草案没有通过 改动比较激进
            成员：TC39（technical committe 39）

      2007  ECMAScript 4.0 准备发布（草案没有通过），TC39绝大数成员不支持发布
            
      2008.7  ECMAScript 3.1版本发布 -> ECMAScript5 （3.1版本直接过渡到5版本，只是修改了名称）

              大会项目代号（hamony）针对4.0版本的问题，进行拆分

      2009.12 正式发布ECMAScript5

              将4.0版本内容分为两部分 
              javascript.next（放入草案中）ES6
              javascript.next.next（放入草案中）ES7

      2011.6  ECMAScript5.1 成为国际标准

      2013.3  javascript.next（草案冻结）

      2013.12  javascript.next（草案发布）

      2015.6  ECMAScript6正式发布，从这开始，每年6月份出来一个新版本升级。

    ES6 ECMAScript ECMAScript2016 ECMAScript2017 ECMAScript2018 有什么联系 ？

      任何组织、任何时候都可以向委员会的成员提交提案，只要提案被采用，会把收集的操作，隔一段时间发布一次。

      ES6通常指版本更迭。

      从2015.6到现在，发布的版本都属于ES6。
      ECMAScript2016 ECMAScript2017 ECMAScript2018只是小版本的改动，统称ES6。

      学习ES6，是指学习2015年ES6发布以来，所有的内容。

      ES7还是草案，并没有完全支持。

    babel 编译器  需要npm包管理工具进行安装

      npm 包管理工具 功能块（代码块） node
      node是服务器环境，可以运行js代码。

      npm init 或者 npm init -y

      创建 .babelrc 文件。babel运行之前加载的文件

      npm i babel-preset-env --save-dev （env包括所有规则集）

      配置 .beablrc 

        {
          "presets": ["babel-preset-env"]
        }

      npm i babel-cli --save-dev 

      配置package.json文件

        "build": "babel src/app.js -o dist/bundle.js",
        "dev": "babel-node ./src/app.js"

        可以使用babel编译或者运行脚本文件

      babel register：可以运行原文件时同时自动编译
      babel core：Babel 编译时使用的API方法集合

      var map = new Map(); // babel不能转译Map。
      可以配置babel-polyfill进行转译，可以转译成浏览器可以识别的代码。


      可以在浏览器中通过script的形式引入babel.min.js.
      <script type="text/label"></script>

      也可以使用Traceur转译ES6语法。谷歌提供的转码工具。


      https://node.green  关于node对于ES6支持情况的调查。

  ## 块级作用域与嵌套、let、暂行性死区

      函数作用域

        函数执行前一刻 会产生[[scope]]对象 里面存的的是AO、GO

          AO: 函数执行期上下文
          GO: 全局执行期上下文

        函数声明提升 var 

          var a = 1;
          var a = 2;

          存在变量污染问题，通过立即执行函数来解决一部分问题。

          kiss原则（keep it simple stupid） 保持简单、傻瓜式操作

        针对这一问题 推出let语法 块级作用域

          if (1) {
            // 块级作用域
          }

          for (var i = 0; i < 10; i++) {
            // 块级作用域
          }

          for (; 1; ) {
            // 块级作用域
            break;
          }

          {
            // 块级作用域
          }

    let 

      语法特征：

        1. 不能在同一作用域下重复声明

          包括全局作用域、函数作用域等。
          同一作用域下同时使用let、var，不能重复声明。

          function test (a) {
            let a = 10;
            console.lof(a);
          }
          test(); // 报错

          function test (a) {
            {
              let a = 10;
            }

            console.log(a);
          }
          test(); // undefined
          
          function test (a) {
            {
              let a = 10;
            console.log(a);
            }
          }
          test(); // 10

        2. let 不会声明提升

          在声明之前，不能使用该变量，会产生一个暂时性死区。
          只要在let所对应的作用域范围之内，let都不会提升。

          console.log(a); // 报错
          let a = 10;

          var a = a;
          console.log(a); // undefined

          let b = b;
          console.log(b); // 报错

          function test (x = y, y = 2) {
            console.log(x, y);
          }
          test(); // 报错（y is not defined）暂时性死区导致的问题

          function test (x = 2, y = x) {
            console.log(x, y); // 2 2 
          }
          test();

          typeof(a); // undefined

          typeof(a); // 报错 typeof不再安全 暂时性死区
          let a;

        3. let只能在当前的作用域下生效

          {
            let a = 2;
          }
          console.log(a); // 报错


          for (; 1; ) {
            let a = 1;
          }
          console.log(a); // 死循环，不会报错


          for (; 1; ) {
            let a = 1;
            break;
          }
          console.log(a); // 报错


          for (let i = 0; i < 10; i++) { }
          console.log(i); // 报错


          var arr = [];
          for (var i = 0; i < 10; i++) {
            arr[i] = function () {
              console.log(i);
            }
          }
          for (var i = 0; i < 10; i++) {
            arr[i](); 
            // 0-9
            // var i 重新赋值 
          }


          for (var i = 0; i < 10; i++) {
            i = 'a';
            console.log(i); // 1个a
          }
          for (var i = 0; i < 10; i++) {
            var i = 'a';
            console.log(i); // 1个a
          }


          for (let i = 0; i < 10; i++) {
            i = 'a';
            console.log(i); // 1个a
          }
          for (let i = 0; i < 10; i++) {
            var i = 'a';
            console.log(i); // 报错
          }
          for (let i = 0; i < 10; i++) {
            let i = 'a';
            console.log(i); // 10个a
          }

          () 和 {} 不是同一个块级作用域。
          () 是 父级作用域。

          块级作用域因为有let才有意义，var关键字存在变量的声明提升。
          let本质上就是为了JS增加一个块级作用域。

      ES6在块级作用域中允许声明函数，并不推荐使用函数声明的方式来定义函数。
      主要使用函数表达式的方式声明函数。

        if (i) {
          function test () {}
        }
        try {
          function test () {}
        }

        if (i) {
         var test = function () {}
        }
        try {
          var test2 = function () {}
        }

      块级作用域是没有返回值的

        var a = for () { return }; // 错误

        {
          return; // 错误
        }

        提案中有一个do的方式，可以实现，但目前仅仅是一个草案。

          do {
            return xxx;
          }

      块级作用域 == 函数的立即调用 ? 

        错误。不等于。

        本质是完全不同的东西。
        函数有返回值，块级作用域没有返回值。
        虽然能够使用函数立即执行的方式模拟块级作用域，但是不是相等。

      let 语法特征总结：

        1. 不能在同一作用域下重复声明
        2. let不会声明提升
        3. let只能在当前的作用域下生效

  ## let进阶、const、全部变量与顶层对象

    for (var i = 0; i < 10; i++) {
      i = 'a';
      console.log(i); // a
    }
    for (var i = 0; i < 10; i++) {
      var i = 'a';
      console.log(i); // a
    }
    for (let i = 0; i < 10; i++) {
      var i = 'a';
      console.log(i); // a
    }
    for (let i = 0; i < 10; i++) {
      var i = 'a';
      console.log(i); // 报错
    }
    for (let i = 0; i < 10; i++) {
      let i = 'a';
      console.log(i); // 10个a
    }


    ES5只能在顶层作用域或者在函数作用域中声明函数。
    ES6允许在块级作用域声明函数。

    {
      let a = 1;
      function a () { }
      console.log(a); // 报错 重复声明
    }

    {
      let a = 1;
      {
        function a () { } // 函数存在作用域提升
      }
      console.log(a); // 1
    }

    const 定义常量

      不希望变量被更改 const http = require('http');

      语法特征：

        1. 定义常量必须赋值，常量不能更改

          const a = 13;

        2. 产生块级作用域，不能提升，存在暂时性死区

          {
            console.log(a); // 报错
            const a = 12;
          }

        3. 与let一致，不能重复声明

          const a = 12;
          let a = 10; // 报错
          
        4. 原始值和引用值都不能更改，但是可以修改或添加引用值的属性

          const obj = {};
          obj.name = 'yueluo';

          const 只能保证栈内存的引用指针不会被改变。

          可以使用对象冻结（freeze）解决此类问题。 Object.freeze(obj);
          对象冻结只能进行一层对象的冻结，可以使用递归对对象内部属性进行再处理。

          自定义冻结

            function freeze (obj) {
              Object.freeze(obj);
              for (const key in obj) {
                if (typeof(obj[key]) === 'object' && obj[key] !== null) {
                  Object.freeze(obj[key]);
                  freeze(obj[key]);
                }
              }
            }                  

            freeze不常用，定义模块时，导出模块一般是实例化对象形式或者函数形式。
            从根源上解决更改属性值的问题。

    顶层对象

      浏览器环境中顶层对象是window。顶层对象的属性和全局变量是等效的。  
      ES6为了改变现状，提出let、const、class 会生成块级作用域。

      node环境中顶层对象是global。

      不同环境的顶层对象是不一致的。

      es6 提案所有的对象都是global，仅仅是提案，并没有实施。

  ## 解构赋值、函数默认值、数组解构、对象解构

    var x = 1;
    {
      let x = x;
      console.log(x); // 暂时性死区 TDZ（Temporal Dead Zone）
      // let关键字声明 取得是当前作用域下x x并没有赋值 所以报错
    }

    参数默认值问题

      function foo (x, y) {
        x = x || 1;
        y = y || 2;
        console.log(x + y);
      }
      foo(); // 3
      foo(5, 6); // 11
      foo(5); // 7
      foo(null, 6); // 7
      foo(0, 5); // 6

      falsy（虚值） 通过Boolean转换转化为假的值就是虚值。

      ES5

        function foo (x, y) {
          var a = typeof(arguments[0]) !== 'undefined' ? arguments[0] : 1,
              b = typeof(arguments[1]) !== 'undefined' ? arguments[1] : 2;
          console.log(a + b);
        }
        foo(0, 5); // 5

      ES6

        function foo (x = 1, y = 2) {
          console.log(x + y);
        }
        foo(0, 5); // 5


      let x = 1;
      function foo (y = x) {
        let x = 2;
        console.log(y);
      }
      foo(); // 1

      let x = 1;
      function foo (x = 2) {
        let x = 2;
        console.log(x);
      }
      foo(); // 报错 x已经被定义

      function foo (x = 2) {
        let x = 2;
        console.log(x);
      }
      foo(1); // 报错 x已经被定义

      定义的函数默认值会影响内部作用域的值，不能重复声明。

      let x = 1;
      function foo (x = x) {
        let x = 2;
        console.log(x);
      }
      foo(10); // 报错 x已经被定义

      let x = 1;
      function foo (x = x) {
        console.log(x);
      }
      foo(10); // 报错 暂时性死区 x is defined
      函数执行时，函数的参数会形成单独的参数作用域，函数执行完成后，参数作用域消失。

      let x = 1;
      function foo (x = x) {
        let x = 2;
        console.log(x);
      }
      foo(10); // 报错 x已经被定义
      参数作用域和函数作用域究竟有什么不同？

      let x = 1;
      function foo (y = x) {
        let x = 2;
        console.log(y);
      }
      foo(); // 1

      function foo (x = 2) {
        let x = 2;
        console.log(x);
      }
      foo(); // a被重复声明 
      手册说参数也存在自己的作用域，独立于函数作用域，但是实际情况存在出入。

      let x = 1;
      function foo(x = x) {
        console.log(x);
      }
      foo(); // x is not defined 暂时性死区

      var w = 1,
          z = 2;
      function foo (x = w + 1, y = x + 1, z = z + 1) {
        console.log(x, y, z);
      }
      foo(); // 报错 暂时性死区 z is not defined

      var w = 1,
          y = 6;
      function foo (x = w + 1, y = x + 1) {
        console.log(x, y);
      }
      foo(); // 2 3  

      let a = 99;
      function foo (b = a + 1) {
        console.log(b);
      }
      foo(); // 100
      a = 100;
      foo(); // 101
      参数传值每次都是重新计算的，不会保留上次的执行结果。
      函数的参数为表达式的情况下，加载的方式是惰性求值的方式，每一次都需要计算表达式的值。

    解构

      ES6新增的语法特性：解构赋值

      let a = 1,
          b = 2,
          c = 3;

      let [a, b, c] = [1, 2, 3];
      console.log(a, b, c); // 1 2 3

      解构依然是一种赋值的过程。
      解构是通过模式匹配（结构化赋值）的方式进行赋值的，需要保证结构一致。

      let [d, [e], [f]] = [1, [2]. [3]];
      console.log(d, e, f); // 1 2 3

      let [a, [b, c], [d, [e, f, [g]]]] = [1, [4, 3], [5, [1, 3, [2]]]];
      console.log(a, b, c, d, e, f, g); // 1 4 3 5 1 3 2

      解构失败，变量多，匹配不到的值是undefined，以undefined作为填充。

      不完全解构：值多，并没有完全解构。

      解构的默认值

        let [a = 6] = [1];
        console.log(a); // 1
        
        let [a = 6] = [];
        console.log(a); // 6

        let [a, b = 2] = [1];
        console.log(a, b); // 1 2

        let [a, b = 2] = [1, null];
        console.log(a, b); // 1 null

        let [a, b = 2] = [1, false];
        console.log(a, b); // 1 false

        let [a, b = 2] = [1, NaN];
        console.log(a, b); // 1 NaN

        function test () {
          console.log(10);
        }
        let [x = test()] = [1];
        console.log(x); // 1

        默认值可以是函数
        function test () {
          console.log(10);
        }
        let [x = test()] = [];
        console.log(x); // undefined

        默认值可以是变量
        let [x = 1, y = x] = [];
        console.log(x, y); // 1 1

        let x = 5;
        let [x = 1, y = x] = [];
        console.log(x, y); // x 已经被定义

        let [x = 1, y = x] = [2];
        console.log(x, y); // 2 2

        let [x = 1, y = x] = [1, 2];
        console.log(x, y); // 1 2

        let [x = y, y = 1] = [];
        console.log(x, y); // 报错 y is not defined
        
      对象解构

        对象拓展

          let obj = {};        
          let obj1 = new Object(); // 不常用
          let obj2 = Object.create(null); // 可以指定原型 不常用

          obj.name
          obj.name = 'yueluo'
          obj['name'] = 'yueluo'
          delete obj.name

          var name = 'yueluo',
              age = 14;
          var person = {
            name: name,
            age: age,
            sex: 'male',
            eat: function () {
              console.log('eating');
            }
          }
          console.log(person);

          ES6 变量和属性名一致时可以简写，
          定义方法的functoin关键字也可以省略。
          var name = 'yueluo',
              age = 14;
          var person = {
            name,
            age,
            sex: 'male',
            eat () {
              console.log('eating');
            }
          }
          console.log(person);
          console.log(person.eat());

        ES6支持属性拼接

          let firstName = 'ai',
              secondName = 'xiaoye',
              name = 'ai xiaoye';
          let person = {
            [firstName + secondName]: name
          }

        解构需要结构完全一致，通过属性名称获取对应的名称的值。
        let { a: a, b: b, c: c } = { a: 1, b: 2, c: 3 };
        console.log(a, b, c); // 1 2 3

        变量和属性名一致时，可以简写。
        let { a, b, c } = { a: 1, b: 2, c: 3 };
        console.log(a, b, c); // 1 2 3

        解构都存在不完全解构和解构失败的情况。

        不完全解构
        let { a = 2, b } = { a: 1, b: 2, c: 3 };
        console.log(a, b); // 1 2 

        解构失败
        let { a = 2, b, c, d, e, f } = { b: 2, c: 3 };
        console.log(a, b, c, d, e, f); // 2 2 3 undefined undefined undefined
        解构失败默认为undefined。

        let [d, [e], [f]] = [2, [1], [3]];
        console.log(d, e, f); // 2 1 3
        数组解构存在顺序问题。

        let { a, b, c } = { b: 2, a: 1, c: 3 }; 
        console.log(a, b, c); // 1 2 3
        对象结构不存在顺序问题。

        var person = {
          name: 'zhangsan',
          son: {
            name: 'lisi',
            age: 30,
            son: {
              name: 'wangwu',
              age: 12
            }
          }
        }
        let { son: { son: { name } } } = person;
        console.log(name); // wangwu

  ## 隐式转换、函数参数解构、解构本质、()用法

    解构赋值

      let { a } = { a: 1 };
      console.log(a); // 1

      let a;
      { a } = { a: 1 };
      console.log(a); // 报错 语法错误 认为{a}作用域，需要转为表达式

      let a;
      ({ a } = { a: 1 });
      console.log(a); // 1
      通过括号的方式转为表达式。

      模式匹配本质是声明一个变量，通过模式匹配的方式进行变量的赋值。

      let  a = [1, 2, 3],
          obj = {};
      [obj.a, obj.b, obj.c] = a;
      console.log(obj); // { a: 1, b: 2, c: 3 }

      let [a] = [1];
      console.log(a); // 1

      let { a: b } = {};
      console.log(b); // undefined

      let [(a)] = [1]; // 语法错误
      let { a: (b) } = {}; // 语法错误
      let { (a): b } = {}; // 语法错误
      let ({a: b}) = {}; // let is not defined
      当用let或者var声明时，只要使用（）就报错。

      function ((z)) {} // 语法错误

      function foo ([z]) {
        return z;
      }
      console.log(foo([2])); // 2
      函数传参也相对于变量的声明。
      通过函数定义参数时，不能使用（），报错。

      let arr = [1, 2, 3];
      let { 0: first, [arr.length - 1]: last } = arr;
      console.log(first, last); // 1 3
      数组本身也是一种对象，可以使用对象进行解构，只要规则属性相同，就可以获取对应的值。

      [(b)] = [3];
      console.log(b); // 3

      ([b]) = [3];
      console.log(b); // 报错

      ({a: (b) = {}});
      console.log(b); // {} 作为默认值处理，本身并没有进行匹配

      var a = {};
      [(a.b)] = [3];
      console.log(a); // {b: 3}

      let a = 'x',
          b = 'y',
          obj = {};
      ({ a: obj[a + b] } = { a: 2 });
      console.log(obj); // { xy: 2 }

      let obj = { a: 1, b: 2, c: 3 },
          obj2 = {};
      ({ a: obj2.x, b: obj2.y, c: obj2.z } = obj)
      console.log(obj2); // {x: 1, y: 2, z: 3}

      数值交换
      let a = 10,
          b = 20;
      [a, b] = [b, a];
      console.log(a, b); // 20 10

      解构赋值是指变量的解构，变量的解构。
      变量的解构本质就是变量的赋值。
      解构使用模式匹配的方式。

      let { a: x, a: y } = { a: 1 };
      console.log(x, y); // 1 1
      模式匹配允许匹配同源属性（同一个源属性）。 

      let person = {
        name: 'zhangsan',
        age: 50,
        son: {
          name: 'lisi',
          ageLi: 30,
          son: {
            name: 'wangwu',
            ageWang: 18,
            son: {
              name: 'zhaoliu',
              ageZhao: 3
            }
          }
        }
      }
      let { son: { son: { son } } } = person;
      console.log(son); // {name: "zhaoliu", ageZhao: 3}
      let { son: { son: { son: { ageZhao }, ageWang }, ageLi } } = person;
      console.log(ageLi, ageWang, ageZhao); // 30 18 3
      let { 
            son: {
              son: {
                son: { 
                  ageZhao
                }, 
                ageWang 
              }, 
              ageLi 
            } 
          } = person;
      console.log(ageLi, ageWang, ageZhao); // 30 18 3
      主张通过合理的缩进来规范解构赋值。为了增加可读性可以使用缩进。

      var x = 200,
          y = 300,
          z = 100;
      var obj = { x:  { y: 42 }, z: { y: z } };
      ({ y: x = { y: y } } = obj); // undefined -> x = { y: 300 }
      ({ z: y = { y: z } } = obj); // y = { y: z } -> y = { y: 100 }
      ({ x: z = { y: x } } = obj); // z = { y: 42 } 
      console.log(x.y, y.y, z.y); // 300 100 42
      使用对象或数组解构赋默认值的这种方式，慎用（可读性较差）。

      以数组解构的方式传递参数。
      function test ([x, y]) {
        console.log(x, y); 
      } 
      test([1, 2]); // 1 2
      test([1]); // 1 undefined
      test([]); // undefined undefined
      test(); // 报错

      function foo ({ x, y }) {
        console.log(x, y);
      }
      foo({ y: 2, x: 1 }); // 1 2
      foo({ x: 1, y: 2 }); // 1 2
      foo({ x: 1 }); // 1 undefined
      foo({ }); // undefined
      foo(); // 报错

      function foo ({ x = 10 } = {}, { y } = { y: 10 }) {
        console.log(x, y);
      }
      foo(); // 10 10
      foo({}, {}); // 10 undefined
      foo({ x: 2 }, { y: 3 }); // 2 3

      ({ x = 10 } = {}); 
      console.log(x); // 10 
      ({ y } = { y = 10 });
      console.log(y); // 10

    解构的隐式转换问题

      const [a, b, c, d, e] = 'hello';
      console.log(a, b, c, d, e); // h e l l o
      字符串隐式转换为类数组，从而可以打印出对应值。

      let { length: len } = 'hello';
      console.log(len); // 5            

      let { toString: toStr } = 123;
      console.log(toStr); // function toString () { }
      console.log(toStr === Number.prototype.toString); // true

      let { toString: toStr } = false;
      console.log(toStr === Boolean.prototype.toString); // true

      boolean、number、string 都能进行隐式转换。


      let { prop  } = undefined;
      console.log(prop); // 报错

      let { prop  } = null;
      console.log(prop); // 报错

      undefined、null 没有包装类，不能进行隐式转换。

  ## this指向、箭头函数基本形式、rest运算符

    参数默认值问题

      function test (a, b) { }
      test(1);
      console.log(test.length); // 2

      function test (a, b, c = 1) { }
      test(1);
      console.log(test.length); // 2

      function test (c = 1, a, b) { }
      test(1);
      console.log(test.length); // 0

      function test (a, b, c = 1, d, e) { }
      test(1);
      console.log(test.length); // 2

      根据当前给的默认值，实际打印的形参长度会发生变化。
      依据当前赋默认值的位置，向前计数。


      function test (a, b, c, d) {
        arguments[1] = 7;
        console.log(b); // 7
      }
      test(1, 2, 3, 4, 5);

      function test (a, b, c = 1, d) {
        arguments[1] = 7;
        console.log(b); // 2
      }
      test(1, 2, 3, 4, 5);

      function test (a, b, c, d = 1) {
        arguments[1] = 7;
        console.log(b); // 2
      }
      test(1, 2, 3, 4, 5);

      当一旦给默认值时，arguments的映射关系就不存在。


      function foo ({ x, y = 5  }) {
        console.log(x, y);
      }
      foo({}); // undefined 5 
      foo({ x: 1 }); // 1 5
      foo({ x: 1, y: 2 }); // 1 2
      foo(); // 报错  undefine和null不能经过包装

      function foo ({ x, y = 5 } = {}) {
        console.log(x, y);
      }
      foo(); // undefined 5 不会报错，达到兼容性的处理

      function fetch (url, { body = "", method = "GET", header = {} } = { }) { } 
      fetch的兼容性处理

      var x = 1;
      function foo (x = x) {}
      // 报错 x is not defined  TDZ 暂时性死区

      undefined 和 is not defined

        undefined 没有值
        is not defined 变量没有声明

      var x = 1;
      function foo (x, y = function() { x = 2; console.log(x) }) {
        var x = 3;
        y();
        console.log(x);
      }
      foo(); // 2 3
      console.log(x); // 1

      var x = 1;
      function foo (x, y = function() { var x = 2; console.log(x) }) {
        var x = 3;
        y();
        console.log(x);
      }
      foo(); // 2 3
      console.log(x); // 1
      参数存在参数作用域（块级作用域）。

      var x = 1;
      function foo (x, y = function() { x = 2; console.log(x) }) {
        x = 3;
        y();
        console.log(x);
      }
      foo(); // 2 2
      console.log(x); // 1

    this 指向问题

      1. 默认绑定
          
        函数内部默认this指向window，严格模式下指向undefined

      2. 隐式绑定

        谁调用this就指向谁

      3. 显示绑定

        call/apply/bind 改变this指向，如果不是对象，会转为对应的包装类

        call(obj, a, b, c);
        apply(obj, [a, b, c]);
        bind(obj, a, b, c);

      4. new 

        构造函数实例化的时候，将this指向转变为实例化对象。
        
      new的优先级最高，显示绑定大于隐式绑定，隐式绑定大于默认绑定。

      new > 显示绑定 > 隐式绑定 > 默认绑定

    箭头函数

      只有一个参数

        var f = ( a ) => a;
        var f = function (a) {
          return a;
        }

      无参数

        var f = () => 5;
        var f = function () {
          return 5;
        }

      多个参数

        var f = (a, b) => a + b;
        var f = function (a, b) {
          return a + b;
        }

      不定长参数

        var f = (..args) = 5;


      let f = (a, b) => {
        var a = 3;
        var a = 4;
        console.log(a + b);
      }
      f(); // 7

      箭头函数和解构赋值同时使用
      const full = ({ first, last } = {}) => first + '' + last;
      console.log(full({ first: 'yue', last: 'luo' }));

      var arr = [1233, 2323, 2, 435, 121, 686, 3];
      var arr2 = arr.sort((a, b) => a - b);
      console.log(arr2); // [2, 3, 121, 435, 686, 1233, 2323]

      var sum = (a, b) => {
        console.log(arguments);
        return a + b;
      }
      sum(1, 2); // arguments is not defined
      箭头函数中不存在arguments。
      箭头函数并不是使用function关键字来定义的，本质是两个东西。

    rest运算符

      rest运算符，也叫spread运算符。用来展开或收集。

      var sum = (...args) => { // 收集原则
        console.log(args); // [1, 2, 3] 数组，不是类数组
      }
      sum(1, 2, 3); 

      function foo (x, y, z) {
        console.log(x, y, z);
      }
      foo(...[1, 2, 3]); // 1 2 3 展开原则
      foo.apply(null, [1, 2, 3]);      
      foo.apply(undefined, [1, 2, 3]);
      使用apply时，传入null或undefined，指向失败，调用方还是原来的this指向。

      let a = [2, 3, 4],
          b = [1, ...a, 5];
      console.log(b); // [1, 2, 3, 4, 5]
      console.log([1].concat(a, [5])); // [1, 2, 3, 4, 5]     

      let fn = (a, b, ...c) => {
        console.log(a, b, c);
      }
      fn(1, 2, 3, 4, 5, 6, 7); // 1 2 [3, 4, 5, 6, 7]
      收集剩余参数的所有部分，拓展运算符必须是最后一个参数。


      数组排序：

        function sortNum () {
          return Array.prototype.slice.call(arguments).sort(function (a, b) {
            return a - b;
          });
        }
        console.log(sortNum(12, 2313, 12, 2, 2124, 3434124, 1, 123)); //  [1, 2, 12, 12, 123, 2124, 2313, 3434124]

        const sortNum = (...args) => args.sort((a, b) => a - b);
        console.log(sortNum(12, 2313, 12, 2, 2124, 3434124, 1, 123)); //  [1, 2, 12, 12, 123, 2124, 2313, 3434124]

      console.log((function (a) {}).length); // 1
      console.log((function (...a) {}).length); // 0
      console.log((function (b, ...a) {}).length); // 1
      console.log((function (b, c, ...a) {}).length); // 2
      console.log((function (b, c, d = 0, ...a) {}).length); // 2
      默认值和rest操作符都不能通过length属性访问到长度，会访问之前参数的长度。length不再准确。

  ## 箭头函数的实质、箭头函数的使用场景
    
    (a, b) => ({ a: 1, b: 4 })
    返回一个对象的基本形式

    不定长参数：rest运算符 - 拓展运算符 - 展开运算符 
    function fn (first, last, ...args) { }
    fn(1, 2, 3, 5, 4, 5);

    箭头函数本身并不是由function关键字定义的，是由胖箭头（=>）的操作符来定义的。
    本质上不是一个东西。

    箭头函数this指向是由外层的函数作用域来决定的，和function不同。
    箭头函数不能作为构造函数来使用。
    箭头函数没有arguments对象，使用rest（拓展运算符）替代。
    箭头函数使用generator，yield命令不能生效。

    function foo () {
      return (a) => {
        console.log(this.a);
      }
    }
    var obj1 = { a: 2 },
        obj2 = { a: 3 };
    var bar = foo.call(obj1);
    bar.call(obj2); // 2
    箭头函数的作用域是由外层函数决定的，执行时foo的this指向obj1。

    const person = {
      eat () {
        console.log(this);
      },
      drink: () => {
        console.log(this);
      }
    }
    person.eat(); // person
    person.drink(); // window

    箭头函数的应用场景

      (function () {
        function Button () {
          this.button = document.getElementById('button');
        }

        Button.prototype = {
          init () {
            this.bindEvent();
          },

          bindEvent () {
            // this.button.addEventListener('click', this.btnClick.bind(this), false);
            this.button.addEventListener('click', () => this.btnClick(), false);
          },

          btnClick () {
            console.log(this);
          }
        }

        new Button().init();
      })();

    嵌套时的this指向问题

      function foo () {
        return () => {
          return () => {
            return () => {
              console.log('id', this.id);
            }
          }
        }
      }
      var f = foo.call({ id: 1 }),
          f1 = f.call({ id: 2 })()(),
          f2 = f().call({ id: 3 })(),
          f3 = f()().call({ id: 4 });
      // 1 1 1 

      箭头函数内部没有this的机制，this指向是固化的，访问的都是最外层的this。
      箭头函数this指向固化 -> 内部没有this机制 -> 只能通过父级作用域来获取this，闭包的this
          -> 不能作为构造函数来使用 -> 使用call/apply/bind无效

    箭头函数不存在arguments

      var test = () => {
        console.log(arguments); // arguments is not defined
      }
      test();

      function foo () {
        setTimeout(() => {
          console.log(arguments); // Arguments(5) [1, 2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
        }, 200);
      }
      foo(1, 2, 3, 4, 5); 
      箭头函数的确不存在arguments对象，但是可以获取外层作用域的arguments对象。

      一个函数执行导致另一个函数的定义，就会形成闭包。

    function insert (value) {
      return {
        into: function (array) {
          return {
            after: function (afterValue) {
              array.splice(array.indexOf(afterValue) + 1, 0, value)
              return array;
            }
          }
        }
      }
    }
    console.log(insert(5).into([1, 2, 3, 4, 6, 7, 8]).after(4));

    const insert = (value) => ({
      into: (array) => ({
        after: (afterValue) => {
          array.splice(array.indexOf(afterValue) + 1, 0, value)
          return array;
        }
      })
    })
    console.log(insert(5).into([1, 2, 3, 4, 6, 7, 8]).after(4));

    箭头函数的使用场景：

      1. 简单的函数表达式；
         返回值相对单一；
         函数内部没有this的引用；
         函数内部不存在递归、事件绑定、事件解绑；
      
        [1222, 22, 1, 3334, 212424, 21].sort((a, b) => a - b);

      2.  内层的函数表达式，需要调用this（var self = this，bind），
          需要确保this指向正确的时候，可以使用箭头函数。

      3. var args = Array.prototype.slice.call(arguments);

        function sortNumber () {
          return Array.prototype.slice.call(arguments).sort((a, b) => a - b);
        }
        
        const sortNumber = (...numbers) => numbers.sort((a, b) => a - b); 
        console.log(sortNumber(222, 111, 13334, 1, 132424));

    不适合箭头函数的情况：

      函数声明，执行语句比较多同时需要用到递归，
      需要引用函数名以及事件绑定，解绑定等情况，应该避免使用箭头函数。

  ## 函数名/对象拓展、描述符、getter/setter

    函数的拓展

      var f = function () { }
      console.log(f.name); // f
      ES5包括之前返回的空字符串。
      ES6返回值为函数名。

      console.log(Function);
      每次声明function，都是实例化一个Function构造函数。

      console.log(new Function().name); // anonymous
      console.log((new Function).name); // anonymous
      通过构造函数实例化的名称，函数名称是anonymous。

      function foo () {}
      console.log(foo.bind({}).name); // bound foo 
      console.log(foo.call({}).name); // 报错 
      console.log(foo.apply({}).name); // 报错

    对象的拓展

      const foo = "bar";
      const baz = { foo };
      console.log(baz); // { foo: 'bar' }

      const person = {
        age: '12',
        say: function () {
          console.log(this.age);
        }
      }
      person.say();

      let age = 12;
      const person = {
        age
      }
      consoe.log(person.age);

      var arr = [1, 2, 232, 12, 4, 121];
      console.log(arr[2]); // 232
      console.log(arr['2']); // 232
      定义的属性都是字符串。

      const obj = {
        class () {  }
      }
      不推荐写法，class是关键字。

      let obj = {};
      obj.foo = true;
      obj['f' + 'o' + 'o'] = false;
      console.log(obj); // { foo: false }

      let a = 'hello';
      let b = 'world';
      let obj = {
        [a + b]: true,
        ['hello' + b]: 123,
        ['hello' + 'world']: undefined
      }
      console.log(obj); // { helloworld: undefined }

      var myObj = {};
      myObj[true] = 'foo';
      myObj[3] = 'bar';
      myObj[myObj] = 'baz';
      console.log(myObj); // {3: "bar", true: "foo", [object Object]: "baz"}
      对象指定键名赋值时，会调用本身原型上的toString方法，转换为字符串再赋值。

      const a = { a: 1 };
      const b = { b: 2 };
      const obj= {
        [a]: 'value a',
        [b]: 'value b'
      }
      console.log(obj); // { '[object Object]': 'value b' }

      const person = {
        sayName () {
          console.log('hello');
        }
      }
      console.log(person.sayName.name); // sayName

    属性描述符

      es5之前 javascript没有提供检测属性的方法。
      检测是否是只读属性、是否是可遍历属性、属性值是否只读。
      es5之后，提供属性描述符的东西。

      let obj = { a: 2 };
      console.log(Object.getOwnPropertyDescriptor(obj, 'a')); 
      // {value: 2, writable: true, enumerable: true, configurable: true}

      configurable：可配置 
      enumerable：可枚举
      writable：可写
      value：值

      defineProperty 修改一个已有的属性，或添加一个新的属性。

      let obj = {};
      Object.defineProperty(obj, 'a', {
        value: 2,
        enumerable: true,
        writable: true,
        configurable: true
      });
      console.log(obj);
      // { a: 2 }
      console.log(Object.getOwnPropertyDescriptor(obj, 'a')); 
      // {value: 2, writable: true, enumerable: true, configurable: true}

      obj.a = 3; 
      // writable为false的情况，不能赋值，可以删除。
      // 1. 如果当前不是严格模式，会静默失败。
      // 2. 如果当前是严格模式，会报错。

      delete obj.a;
      // configurable为false的情况，不能删除。
      // 1. 非严格模式，静默失败。
      // 2.严格模式，报错。

    getter、setter

      属性描述符的一种。

      get、put操作

        let obj  = { a: 1 };

        obj.a;
        // [[Get]] 默认操作：查找当前属性，如果没有，继续查找原型上的属性

        obj.a = 3;
        // [[Put]] 默认操作（赋值）
        // 1. getter，setter
        // 2. writable：false，不可修改 true 可修改
        // 3. 赋值

      ES5使用getter、setter来修改默认操作。

      get

        var obj = {
          log: ['example', 'test'],
          get latest () {
            if (this.log.length === 0 ) {
              return undefined;
            }

            return this.log[this.log.length - 1];
          }
        }
        console.log(obj.latest); // test

        var myObj = {
          get a () {
            return 2;
          }
        }
        Object.defineProperty(myObj, 'b', {
          get: function () {
            return this.a * 2;
          },
          enumerable: true,
          configuable: true
        })
        console.log(myObj.b); // 4

        在定义get、set时，不能使用value和writable属性。
        可以使用enumerable和configuable。
        
        MDN文档说明属性描述符和存取描述符不能一起使用。

      set

        var lang = {
          set current (name) {
            this.log.push(name);
          },
          log: []
        }
        lang.current = 'ch';
        lang.current = 'en';
        console.log(lang.log); // ["ch", "en"]

      get、set
      
        var obj = {
          get a () {
            return this._a;
          },
          set a (val) {
            this._a = val * 2;
          }
        }
        obj.a = 3;
        console.log(obj.a); // 6

  ## 对象密封4种方式、assign、取值函数的拷贝
    
    const obj = {
      get foo () {

      },
      set foo (x) {

      }
    }
    // console.log(obj.foo.name); // 报错
    Object.getOwnPropertyDescriptor(obj, 'foo');
    // {enumerable: true, configurable: true, get: ƒ, set: ƒ}
    var descriptor =  Object.getOwnPropertyDescriptor(obj, 'foo');
    console.log(descriptor.get.name); // get foo

    var a = { a: 2 };
    var descriptor =  Object.getOwnPropertyDescriptor(a, 'a');
    console.log(descriptor);
    // {value: 2, writable: true, enumerable: true, configurable: true}

    对象常量的常见配置方式：

      var obj = { a: 2 };

      1. configurable: false  不可删除
      2. writable: false 不可写
      3. Object.preventExtensions(obj); 对象不可拓展

    var obj = { a: 2 };
    console.log(Object.isExtensible(obj)); // true 对象可拓展 
    Object.preventExtensions(obj); // 设置对象不可拓展
    obj.b = 2; // 严格模式下对对象进行拓展会报错
    obj.a = 3;
    console.log(Object.isExtensible(obj)); // false 对象不可拓展 
    console.log(obj); // { a: 3 }
    delete obj.a;
    console.log(obj); // { }


    Object.defineProperty 定义的属性，属性描述符都是false。
    通过对象点的语法添加属性，使用getOwnPropertyDescriptor查看，属性描述符都是true。

    Object.preventExtensions()：禁止对象拓展，原有属性可修改，可删除

    var obj = { a: 2 };
    console.log(Object.isSealed(obj)); // false 对象未密封
    Object.seal(obj); // 设置对象密封 
    // 本质是调用preventExtensions，并将属性的configurable属性设置为false 
    console.log(Object.isSealed(obj)); // true 对象密封
    obj.b = 3;
    obj.a = 2;
    console.log(obj); // { a: 2 }
    delete obj.a;
    console.log(obj); // { a: 2 }

    var arr = [1];
    Object.seal(arr);
    arr[0] = 2;
    arr.length = 0; 
    // arr.push(2); // 报错
    console.log(arr); // [2]

    Object.seal()：密封对象，不可拓展、不可删除、可修改，不能解决数组的问题，数组仍然可以赋值


    var obj = { a: 2};
    console.log(Object.isFrozen(obj)); // false 对象未密封
    Object.freeze(obj); // 设置对象密封
    console.log(Object.isFrozen(obj)); // true 对象密封
    obj.a = 3;
    obj.b = 2;
    console.log(obj); // { a: 2 }
    delete obj.a;
    console.log(obj); // { a: 2}

    var arr = [1];
    Object.freeze(arr); 
    arr[0] = 2;
    console.log(arr); // [1] 
    arr.push(2); // 报错
    console.log(obj); 

    Object.freeze()：密封对象，不可拓展、不可删除、不可修改，对数组也有效，并没有深度冻结

    自定义对象冻结方法

      function freeze (obj) {
        Object.freeze(obj);
        for (const key in obj) {
          if (typeof(obj[key]) === 'object' && obj[key] !== null) {
            freeze(obj[key]);
          }
        }
      }   

    
    Object.is()：比较元素符的拓展

      console.log(NaN === NaN); // false
      console.log(+0 === -0); // true

      ===：全等，严格相等 sameVal算法
      ==: 需要进行隐式类型转换，再进行判断

      与全等区别：

        Object.is(NaN, NaN); // true 
        Object.is(+0, -0); // false

      {} === {}; // false
      Object.is({}, {}); // false

      false === 0; // false
      Object.is(false, 0); // false

    Object.assign()：合并一个对象

      将需要合并的源对象合并到目标对象。

      Object.assign(tar, ...sources);

      let obj = { a: 1 };
      let tar = {};
      let copy = Object.assign(tar, obj);
      console.log(tar); // { a: 1 }
      console.log(copy); // { a: 1 }
      console.log(copy === tar); // true

      const tar = { a: 1 },
            tar2 = { b: 2 },
            tar3 = { c: 3 };
      Object.assign(tar, tar2, tar3);
      console.log(tar); // {a: 1, b: 2, c: 3}

      const tar = { a: 1, b: 1 },
            tar2 = { b: 2, c: 2 },
            tar3 = { c: 3 };
      Object.assign(tar, tar2, tar3);
      console.log(tar); // {a: 1, b: 2, c: 3}

      Object.assign(undefined, { a: 1 }); // 报错
      Object.assign(null, { a: 1 }); // 报错
      Object.assign(1, { a: 1 }); // Number(1, a: 1);
      Object.assign(false, { a: 1 }); // Boolean(1, a: 1);
      Object.assign('', { a: 1 }); // String(1, a: 1);

      Object.assign({ a: 1 }, undefined); // { a: 1 }
      Object.assign({ a: 1 }, 1); // { a: 1 }
      Object.assign({ a: 1 }, 123); // { a: 1 }
      Object.assign({ a: 1 }, '1'); // {0: "1", a: 1}
      Object.assign({ a: 1 }, '123'); // {0: "1", 1: "2", 2: "3", a: 1}
      Object.assign({ a: 1 }, true); // { a: 1 }
      如果当前的参数转成对象，对象内的属性是否是可枚举的，如果可枚举，才可以拷贝。

      const test1 = 'abc',
            test2 = true,
            test3 = 10;
      Object.assign({}, test1, test2, test3); // {0: "a", 1: "b", 2: "c"}

      new String('abc'); // String { "abc" } { 0: 'a', 1: 'b', 2: 'c' } 可枚举属性
      new Booean(true); // Boolean { true } [[PrimitiveValue]]: true 不可枚举
      new Number(10); // Number { true } [[PrimitiveValue]]: 10 不可枚举


      var obj = { a: 3 };
      Object.defineProperty(obj, 'b', {
        value: 4
      });
      Object.assign({ }, obj); // { a: 3 }

      var obj = { a: 3 };
      Object.defineProperty(obj, 'b', {
        value: 4,
        enumerable: true
      });
      Object.assign({ }, obj); // { a: 3, b: 4 }

      Object.cretae(自定义原型， 对象及属性描述符).
      var obj = Object.create({ foo: 1 }, {
        bar: {
          value: 2
        },
        baz: {
          value: 3,
          enumerable: true
        }
      });
      console.log(obj); // { baz: 3, bar: 2 } prototype foo: 1
      Object.assign({ }, obj); // {baz: 3}
      Object.assign只拷贝可枚举的属性，原型上的属性不会拷贝。继承属性和不可枚举的属性不能拷贝。

      Symbol()

        Symbol是一个函数，是新增的一个原始类型。

        var a = Symbol(),
            b = Symbol();
        a === b; // false
        
        var a = Symbol('a'),
            b = Symbol('a');
        a === b; // false

      Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' }); // {a: "b", Symbol(c): "d"}
      Symbol类型的值可以被Object.assign拷贝，不会重复的值。

      const obj1 = { a: { b: 1 } };
      const obj2 = Object.assign({}, obj1);
      obj1.a.b = 2;
      console.log(obj2); // { a: { b: 2 } }
      Object.assign复制的对象是浅拷贝的对象。

      const target = { a: { b: 'c', d: 'e' } };
      const source = { a: { b: 'hello' } };
      Object.assign(target, source); // { a: { b: 'hello' } } 
      拷贝时，同名的属性直接整个替换掉。

      Object.assign([1, 2, 3], [ 4, 5]); // [4, 5, 3]
      拷贝数组时，根据属性名进行替换，数组的默认下标是从0开始。

      const source = {
        get foo () {
          return 1;
        }
      };
      const target = {};
      Object.assign(target, source); // { foo: 1 } 
      Object.assign拷贝 get、set时，直接将具体的值拷贝出来

      Object.assign 的用法

        1. 给原型扩充方法

          Object.assign(person.prototype, {
            eat () {},
            drink () {},
            age: 1
          });
        
        2. 克隆对象、合并对象

        3. 默认值处理

          const DEFAULT = {
            url: {
              host: 'http://www.yueluo.club',
              prot: 80
            }
          }
          function test (option) {
            option = Object.assign({}, DEFAULT, option);
            console.log(option);
          }
          test({ url: { port: 8080 } }); // { url: { port: 8080 } }

    Object.defineProperties() 定义多个属性

      var obj = {};
      Object.defineProperties(obj, {
        a: {
          value: true,
          wirtable: true
        },
        b: {
          value: 'hello',
          writable: false
        }
      });
      console.log(obj); // {a: true, b: "hello"}

    Object.getOwnPropertyDescriptors() 获取多个属性的描述

      console.log(Object.getOwnPropertyDescriptors(obj));
      // {
      //   a: {value: true, writable: false, enumerable: false, configurable: false},
      //   b: {value: "hello", writable: false, enumerable: false, configurable: false}
      // }

      可以使用它实现浅拷贝。

        var obj = {
          a: 1,
          b: 2,
          c: 3
        }
        
        const cloneObj = Object.create(Object.getPrototypeOf(obj),
          Object.getOwnPropertyDescriptors(obj));
        console.log(cloneObj); // {a: 1, b: 2, c: 3}

        const clone = obj => Object.create(
          Object.getPrototypeOf(obj),
          Object.getOwnPropertyDescriptors(obj)
        );
        console.log(clone(obj)); // {a: 1, b: 2, c: 3}

    拷贝get、set问题（取值函数的拷贝问题）

      const source = {
        set foo (value) {
          console.log(value);
        }
      }
      const tar = {};
      Object.assign(tar, source); // { foo: undefined }

      Object.defineProperties(tar, Object.getOwnPropertyDescriptors(source));
      console.log(Object.getOwnPropertyDescriptor(tar, 'foo')); 
      // {get: undefined, enumerable: true, configurable: true, set: ƒ}
      console.log(tar);
      // {
      //   set foo (value) {
      //     console.log(value);
      //   }
      // }

      可以借助defineProperties和getOwnPropertyDescriptors完成get和set的拷贝。

    部署对象的几种方式（定义对象）

      const obj = { a: 1 };

      const obj = Object.create(prot);
      obj.foo = 123;

      const obj = Object.assign(Object.create(prot), {
        foo: 123
      });

      const obj = Object.create(prot, Object.getOwnPropertyDescriptors({
        foo: 123
      }));

  ## super、4种遍历方式、原型、symbol遍历

    function Person () {
      this.name = 'zhangsan';
      this.age = 18;
    }
    var person = new Person();
    console.log(person);

    prototype是构造函数的属性，也是实例化出来的所有对象的公共祖先。
    原型的终点是Object.prototype。

    person.__proto__ = {}; // 修改方式不合理，影响性能，也会影响到所有继承改属性的对象

    __proto__ 系统内置属性，不建议使用 
      
      1. 语义化，内部属性，原则上应该修改
      2. 访问效率特别慢
      3. 所有继承自该原型的对象都会影响到

    Object.create(指定原型，对象) 创建原型
    Object.setPrototypeOf() 修改原型
    Object.getPrototypeOf() 读取操作

    Object.setPrototypeOf()、Object.getPrototypeOf()

      let proto = {
        y: 20,
        z: 40
      }
      let obj = { x: 10 };
      let obj1 = Object.setPrototypeOf(obj, proto);
      console.log(obj1); 
      console.log(obj1 === obj); // true
      console.log(obj); 

      let obj = Object.setPrototypeOf(1, { a: 1 });
      console.log(obj); // 1
      var proto = Object.getPrototypeOf(obj);
      console.log(proto); // Number { 0, ... }  

      Object.getPrototypeOf(Number(1)); // Numer { 0, ... }
      console.log(Object.getPrototypeOf(1) === Number.prototype); // true
      获取Object.setPrototypeOf()设置的原型时，经过包装类包装，获取的实际是Number的原型。
      使用Object.setPrototypeOf()给不是对象的值设置原型属性时，是没有任何效果的。
      使用Object.setPrototypeOf()给undefined和null设置原型属性，会报错。

      let obj = Object.setPrototypeOf('foo', { a: 1, b: 2 });
      console.log(Object.getPrototypeOf(obj)); // String { "", ... }
      console.log(Object.getPrototypeOf(obj) === String.prototype); // true

    Object.keys()、Object.values()、Object.entries()

      const foo = {
        a: 1,
        b: 2,
        c: 3
      }
      Object.defineProperties(foo, {
        d: {
          value: 4,
          enumerable: true
        },
        f: {
          value: 5,
          enumerable: false
        }
      });

      console.log(Object.keys(foo)); // ["a", "b", "c", "d"]  
      console.log(Object.values(foo)); // [1, 2, 3, 4]
      console.log(Object.entries(foo)); // [ ["a", 1], ["b", 2], ["c", 3], ["d", 4] ]

      Object.keys()：可以遍历自身可枚举属性的键名（不包含继承属性）
      Object.values()：可以遍历自身可枚举属性的键值（不包含继承属性）
      Object.entries()：可以遍历自身可枚举属性的键值集合（不包含继承属性）

      Object.keys({}); // []
      Object.keys(1); // []
      Object.keys(true); // []
      Object.keys('123'); // ['1', '2', '3']
      Object.keys(undefined); // 报错
      Object.keys(null); // 报错

    super -> this

      this指向对象本身。
      super关键字指向对象的原型对象。

      let proto = {
        y: 20,
        z: 40
      };
      let obj = {
        x: 10,
        foo: super.y
      };
      Object.setPrototypeOf(obj, proto);
      console.log(obj); // 'super' keyword unexpected here

      let proto = {
        y: 20,
        z: 40
      };
      let obj = {
        x: 10,
        foo: function () {
          console.log(super.y);
        }
      };
      Object.setPrototypeOf(obj, proto);
      obj.foo(); // 'super' keyword unexpected here

      let proto = {
        y: 20,
        z: 40
      };
      let obj = {
        x: 10,
        foo: () => {
          console.log(super.y);
        }
      };
      Object.setPrototypeOf(obj, proto);
      obj.foo(); // 'super' keyword unexpected here

      let proto = {
        y: 20,
        z: 40
      };
      let obj = {
        x: 10,
        foo () {
          console.log(super.y);
        }
      };
      Object.setPrototypeOf(obj, proto);
      obj.foo(); // 20

      super关键字有很多限制，只可以在对象的简写形式的写法中才能生效。

      let proto = {
        y: 20,
        z: 40,
        bar: function () {
          console.log(this.y);
        }
      };
      let obj = {
        x: 10,
        foo () {
          console.log(super.bar());
        }
      };
      Object.setPrototypeOf(obj, proto);
      obj.foo(); // 20

    symbol

      symbol是ES6引入的一种新的基本类型。Symbol是一种原始值类型。

      引入Symbol用于解决对象属性名的重名问题。

      原始值类型：string、number、boolean、undefined、null、symbol
      引用值类型：Object、Array、Function

      Symbol() // 不是构造函数，是普通函数，可以生成独一无二的值

      new Symbol(); // 报错

      console.log(Symbol() === Symbol()); // false
      console.log(typeof(Symbol)); // symbol
      console.log(Symbol()); // Symbol()

      let s1 = Symbol();
      s1.a = 1;
      console.log(s1.a); // undefined

      为了区分Symbol的值，可以传入不同的字符串识别不同的值。

      let s1 = Symbol('foo');
      console.log(s1); // Symbol(foo)

      var obj = { a: 1 };
      let s1 = Symbol(obj); // 使用对象参数时，使用Object.prototype.toString将参数转为字符串
      console.log(s1); // Symbol([object Object])

      console.log(Symbol(undefined)); // Symbol()
      console.log(Symbol(null)); // Symbol(null)

      let s1 = Symbol();
      console.log(s1 + 1);
      // Cannot convert a Symbol value to a number 
      // 无法进行隐式类型转换，不能将Symbol类型转为number类型
      console.log(Number(s1)); // 报错
      console.log(String(s1)); // Symbol()
      console.log(Boolean(s1)); // true
      只有Number类型不能转换，会报错。
      Number、String、Boolean类型可以转换。

      let s1 = Symbol(null);
      console.log(Object.getPrototypeOf(s1)); // Symbol(...)
      可以获取到Symbol的原型，有自己的构造函数。

      console.log(Symbol().toString()); // 'Symbol()' 
      console.log(!Boolean(Symbol(null))); // false
      console.log(!Symbol(null)); // false 
      可以直接取反进行隐式类型转换，隐式类型转换仅限于Boolean。

      Symbol的使用方式

        let name = Symbol();
        let person = {};
        person[name] = 'zhangsan';
        console.log(person); // {Symbol(): "zhangsan"}

        let name = Symbol();
        let person = {
          [name]: 'lisi'
        }
        console.log(person); // {Symbol(): "lisi"}

        let name = Symbol(),
            person = {};
        Object.defineProperty(person, name, {
          value: 'zhangsan'
        });
        console.log(person); // {Symbol(): "zhangsan"}
        console.log(person.name); // undefined
        console.log(person[name]); // zhangsan

        const name = Symbol(),
              person = {};
        person.name = 'zhangsan';
        console.log(person[name]); // undefined
        console.log(person['name']); // zhangsan

        let name = Symbol(),
            eat = Symbol();
        let person = {
          [name]: 'zhangsan',
          [eat] () {
            console.log(this[name]);
          }
        }
        person[eat](); // zhangsan

        let s1 = Symbol;
        console.log(s1); // Symbol() 构造函数，如果调用它，必须执行它，不能实例化它

      Symbol.for()、Symbol.keyFor()

        let s3 = Symbol('foo');
        let s4 = Symbol('foo');
        console.log(s3 === s4); // false
        console.log(s3 === s1); // false  

        let s1 = Symbol.for('foo');
        let s2 = Symbol.for('foo');
        console.log(s1 === s2); // true
        // 可以使用Symbol.for()的方式获取到相同的Symbol值。

        console.log(Symbol.keyFor(s1)); // foo 
        console.log(Symbol.keyFor(s2)); // foo 
        console.log(Symbol.keyFor(s1) === Symbol.keyFor(s2)); // true

        let s = Symbol('foo');
        console.log(Symbol.keyFor(s)); // undefined
        使用Object.keyFor()打印的是以Object.for()声明的值。

      Symbol属性的遍历

        const obj = {};
        let a = Symbol('a'),
            b = Symbol('b');
        obj[a] = 'hello';
        obj[b] = 'world';
        obj.a = 'hello world';

        for (let key in obj) {
          console.log(key); 
        }
        // for in循环不能遍历Symbol属性
        
        for (let key of obj) {
          console.log(key);
        }
        // 报错 obj is not iterable

        var  copy = {};
        Object.assign(copy, obj);
        console.log(obj);
        // {Symbol(a): "hello", Symbol(b): "world"}
        // 使用Object.assign可以合并Symbol属性的对象

        只针对Symbol属性的对象，用来遍历Symbol属性。
                
        Object.getOwnPropertySymbols()：获取对象的Symbol属性集合（只会遍历Symbol属性的值）。
        console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(a), Symbol(b)] 

        let arr = Object.getOwnPropertySymbols(obj);
        arr.forEach(item => console.log(item)); 
        // Symbol(a) 
        // Symbol(b)

        属性遍历案例  

          const obj = { c: 1, d: 2 };

          let a = Symbol('a'),
              b = Symbol('b'),
              _a = Symbol('_a'),
              _b = Symbol('_b');

          obj[a] = 'hello';
          obj[b] = 'world';

          Object.defineProperties(obj, {
            e: {
              value: 5,
              enumerable: true
            },
            f: {
              value: 6,
              enumerable: false
            },
            [_a]: {
              value: -1,
              enumerable: true
            },
            [_b]: {
              value: -2,
              enumerable: false
            }
          });

          let h = Symbol('h'),
              i = Symbol('i'),
              j = Symbol('j');

          const obj1 = {
            g: 7,
            [h]: 8
          }

          Object.defineProperties(obj1, {
            [i]: {
              value: 9,
              enumerable: true
            },
            [j]: {
              value: 10
            },
            k: {
              value: 11
            }
          });

          Object.setPrototypeOf(obj, obj1);

          for (let i in obj) {
            console.log(i);
          }
          // c d e g 
          // for in 可以遍历自身和原型上的可枚举属性（不包含Symbol类型的值）

          console.log(Object.keys(obj)); 
          // ["c", "d", "e"]
          // Object.keys() 可以遍历自身的可枚举属性（不包含Symbol类型的值）

          console.log(Object.getOwnPropertySymbols(obj)); 
          // [ Symbol(a), Symbol(b)m Symbol(_a), Symbol(_b) ]
          // Object.getOwnPropertySymbols() 可以遍历自身Symbol类型的值（可枚举、不可枚举都可以遍历）

          var obj3 = Object.assign({}, obj);
          console.log(obj3); 
          // Object.assign() 拷贝自身可枚举的属性（包含Symbol类型的值、不包含原型上的属性）

          console.log(JSON.parse(JSON.stringify(obj)));
          // JSON.stringify() 可以拷贝自身可枚举的属性（不包含原型上的属性，不包含Symbol类型的属性）

  ## Symbol、iterator、forOf、typeArray

    function foo () {
      return function () {
        return function () {
          return function () {
            console.log('id：', this.id);
          }
        }
      }
    }
    var f = foo.call({ id: 1 });  
    var t1 = f.call({ id: 2 })()(); // id: undefined
    var t2 = f().call({ id: 3 })(); // id: undefined
    var t3 = f()().call({ id: 4 }); // id: 4

    ... 拓展运算符  ES2017得到进一步的加强

      var obj = {
        a: 1, 
        b: 2,
        c: 3 
      };
      var obj1 = {
        a: 4,
        d: 5,
        e: 6
      }

      var obj2 = {};
      Object.assign(obj2, obj, obj1);
      console.log(obj2); // {a: 4, b: 2, c: 3, d: 5, e: 6}

      var obj3 = {
        ...obj,
        ...obj1
      }
      console.log(obj3); // {a: 4, b: 2, c: 3, d: 5, e: 6}

    symbol、iterator

      var s = Symbol(); 
      console.log(Object.getPrototypeOf(s)); // Symbol( ... )

      foo instance Foo
      FOO[Symbol.hasInstance]
      用户调用instaceof判断时，会调用FOO[Symbol.hasInstannce]接口。

      isConcatSpreadable：是否可以连接拓展。

      iterator： Symbol(Symbol.iterator) 迭代器接口
    
      迭代器：iterator

      let arr = [1, 2, 3, 4];
      console.log(arr); 
      //可以看到原型上有Symbol(Symbol.iterator)，说明当前对象已经部署迭代器接口

        let arr = [1, 2, 3, 4, 5];

      console.log(arr[Symbol.iterator]); // ƒ values() { [native code] }
      let iter = arr[Symbol.iterator]();
      console.log(iter); // Array Iterator {}

      console.log(iter.next()); // {value: 1, done: false}
      console.log(iter.next()); // {value: 2, done: false}
      console.log(iter.next()); // {value: 3, done: false}
      console.log(iter.next()); // {value: 4, done: false}
      console.log(iter.next()); // {value: 5, done: false}
      console.log(iter.next()); // {value: undefined, done: true}
      迭代是对数据结构读取的一种方式，是有序的、连续的、基于拉取的一种消耗数据的组织方式。

      对象是无序的，键名是无序的。

      常见数据结构：

        Array、
        类数组：arguments、nodeList、
        TypeArray：用于保存二进制数据、二进制数据的缓存区
        Map、Set、WeakMap、WeakSet

        数据读取不能统一用for循环的方式来遍历数据，可以使用迭代有序的抽取数据。
        提供统一迭代的方式，为所有的数据类型部署迭代接口。
        迭代器：可以让部署了iterator接口的数据类型，能够以统一的方式进行迭代。

        [Symbol.iterator]: 隐式的迭代器接口

      自定义迭代对象

        function makeIterator (array) {
          var nextIndex = 0,
              total = array.length;

          return {
            next: function () {
              return nextIndex < total ? { value: array[nextIndex++] , done: false }
                                       : { value: undefined, done: true };
            }
          }
        }

        const arr = [1, 2, 3, 4];
        
        const iter = makeIterator(arr); 

        console.log(iter.next()); // { vaue: 1, done: false }
        console.log(iter.next()); // { vaue: 2, done: false }
        console.log(iter.next()); // { vaue: 3, done: false }
        console.log(iter.next()); // { vaue: 4, done: false }
        console.log(iter.next()); // { vaue: undefined, done: true }

      TypeArray 类型数组

        JavaScript没有TypeArray的构造函数。只是一种概念，JS中不存在。
        console.log(TypeArray); // TypeArray is not defined

        TypeArray是用来处理二进制数据的。

        const tArray = new Int8Array(); // 声明8进制数据

        const tArray = new Int8Array(4);
        console.log(tArray); // Int8Array(4) [0, 0, 0, 0]
        默认填充的数据都是0。

        const tArray = new Int8Array(4);
        tArray[0] = 100;
        console.log(tArray); // Int8Array(4) [100, 0, 0, 0]

      for of

        ES6中借鉴了c++、Java、c#、python语言，提供简单统一的接口，for of循环，
        实际上调用了Symbol.iterator接口。

        let arr = [1, 2, 3, 4, 5];

        for (let i of arr) {
          console.log(i);
        }
        // 1
        // 2
        // 3
        // 4
        // 5

        部署了Symbol.iterator接口的对象，都可以使用for of进行迭代。

        for in 拿到的是下标，用于遍历对象。
        for of 用来迭代部署过iterator接口的值。

        迭代器读取是一种有序的，连续的，不适用于对象。

        let obj = {
          start: [1, 2, 3, 4],
          end: [5, 6, 7]
        }
        for (let i of obj) {
          console.log(i); //  obj is not iterable
        }
        没有部署iterator接口，无法迭代对象，可以手动部署iterator接口，用于对象的迭代。

        let obj = {
          start: [1, 3, 2, 4],
          end: [5, 7, 6],
          [Symbol.iterator] () {
            let index = 0,
                arr = [...this.start, ...this.end],
                len = arr.length;

            return {
              next () {
                if (index < len) {
                  return {
                    value: arr[index++],
                    done: false
                  }
                } else {
                  return {
                    value: undefined,
                    done: true
                  }
                }
              }
            }
          }
        }
        for (let i of obj) {
          console.log(i);
        }
        // 1 3 2 4 5 7 6

  ## array/数值拓展、ArrayOf、ArrayFrom

    迭代器补充部分

      let obj = {
        start: [1, 2, 3, 4, 5],
        end: [7, 8, 9],
        [Symbol.iterator] () {
          let index = 0,
              arr = [...this.start, ...this.end],
              len = arr.length;

          return {
            next () {
              if (index < len) {
                return {
                  value: arr[index++],
                  done: false
                }
              } else {
                return {
                  value: undefined,
                  done: true
                }
              }
            }
          }
        }
      }

      var iter = obj[Symbol.iterator]();

      console.log(iter.next());
      console.log(iter.next()); 
      console.log(iter.next()); 

      var iter = obj[Symbol.iterator]();

      console.log(iter.next());
      console.log(iter.next()); 
      console.log(iter.next());

      for (let i of obj) {
        console.log(i);
      }
      // 1 2 3 4 5 6 7 8 9

      也可以使用拓展运算符把部署了iterator接口的对象进行拓展。
      console.log(...obj); // 1 2 3 4 5 6 7 8 9

    数组的拓展 Array 相关方法

      Array.of() // 用来声明一个数组

        Array.of(); // []
        Array.of(3); // [3] 数值为3，可以弥补new Array()的缺点
        Array.of(3, 4, 6); // [3, 4, 6]

      Array.from() // 将类数组，数组，部署过iterator接口的对象转为真正的数组

        Array.of(obj); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

        存在三个参数 (arrayLike, mapFn, thisArg)
        
        let arr = [1, 2, 3, 4];
        let result = arr.map(function (val) {
          return val * 2;
        });
        console.log(result); // [2, 4, 6, 8]

        let arr = Array.from([1, 2, 3, 4], function (val, idx) {
          return val * 2;
        });
        console.log(arr); // [2, 4, 6, 8]

        Array.from 可以将转换后的数组，经过第二个参数进行map处理。第三个参数用于处理this指向问题。

      fill(value, start, end) 填充元素，修改原数组

        let arr = [1, 2, 3, 4];
        arr.fill(5);
        console.log(arr); // [5, 5, 5, 5]

        let arr = [1, 2, 3, 4];
        arr.fill(5, 1);
        console.log(arr); // [1, 5, 5, 5] 第三个参数默认是数组的长度

        let arr = [1, 2, 3, 4];
        arr.fill(5, 1, 2);
        console.log(arr); // [1, 5, 3, 4]  
        左闭右开区间  [1, 2)

        let arr = [1, 2, 3, 4];
        arr.fill(5, 1, 1);
        console.log(arr); // [1, 2, 3, 4]  
        如果起始下标和结束下标一致，不做处理。

        let arr = [1, 2, 3, 4];
        arr.fill(5, -3, -2);
        console.log(arr); // [1, 5, 3, 4]  

        let arr = [1, 2, 3, 4];
        arr.fill(5, NaN, -2);
        console.log(arr); // [5, 5, 3, 4]   
        如果起始下标为NaN，按照0处理

        let arr = [1, 2, 3, 4];
        arr.fill(5, NaN, NaN);
        console.log(arr); // [1, 2, 3, 4]
        如果起始下标和结束下标一致，不做处理

        let arr = [1, 2, 3, 4];
        arr.fill(5, 2, 5);
        console.log(arr); // [1, 2, 5, 5]
        结束下标超出，不做处理，不会添加新元素


        console.log([].fill.call({ length:3 }, 4));
        // {0: 4, 1: 4, 2: 4, length: 3}
        可以给对象填充元素。

      keys() / values() / entries()

        let obj = {
          a: 1,
          b: 2,
          c: 3
        }
        console.log(Object.keys(obj)); // ["a", "b", "c"]
        console.log(Object.values(obj)); // [1, 2, 3]
        console.log(Object.entries(obj)); // [ ["a", 1], ["b", 2], ["c", 3] ]

        let arr = ['a', 'b', 'c'];
        console.log(arr.keys()); // Array Iterator {}
        console.log(arr.values()); // Array Iterator {}
        console.log(arr.entries()); // Array Iterator {}

        var iter = arr.entries();
        console.log(iter.next()); // {value: Array(2), done: false}
        console.log(iter.next()); // {value: Array(2), done: false}
        console.log(iter.next()); // {value: Array(2), done: false}
        console.log(iter.next()); // {value: undefined, done: true}

        var iter = arr.values();
        for (let i of iter) {
          console.log(i); 
        }
        // a b c

        var iter = arr.keys();
        for (let i of iter) {
          console.log(i); 
        }
        // 0 1 2

        var iter = arr.entries();
        for (let i of iter) {
          console.log(i); 
        }
        // [0, 'a'] [1, 'b'] [2, 'c']

        数组使用keys() / values() / entries()，返回的是一个迭代对象，可以使用for of来处理。

      copyWithin()  将数组内部的成员移动到相应位置

        var arr = [1, 2, 3, 4, 5];
        arr.copyWithin(2);
        console.log(arr); // [1, 2, 1, 2, 3]

        var arr = [1, 2, 3, 4, 5];
        arr.copyWithin(-2);
        console.log(arr); // [1, 2, 3, 1, 2]

        var arr = [1, 2, 3, 4, 5];
        arr.copyWithin(0, 3, 4);
        console.log(arr); // [4, 2, 3, 4, 5]

        var arr = [1, 2, 3, 4, 5];
        arr.copyWithin(-2, -3, -1);
        console.log(arr); // [1, 2, 3, 3, 4]

        参数和fill一致。第一个参数确认位置，2、3个参数确认复制的元素，
        不会新添数组项，只会在原有的数组项进行修改。

        console.log([].copyWithin.call({ length: 5, 3: 1 }, 0, 3));
        // {0: 1, 3: 1, length: 5}
        console.log([].copyWithin.call({ length: 5, 3: 1, 4: 2 }, 0, 3));
        // {0: 1, 1: 2, 3: 1, 4: 2, length: 5}

      find()  / findIndex()

        var arr = [1, 2, 3, 4];
        var res = arr.find(function (value, index, arr) {
          return value > 2;
        });
        console.log(res); // 3
        var arr = [1, 2, 3, 4];
        find 返回第一个条件为true的值

        var arr = [1, 2, 3, 4];
        var res = arr.findIndex(function (value, index, arr) {
          return value > 2;
        });
        console.log(res); // 2
        findIndex 返回第一个条件为true的值的下标

        console.log([NaN].indexOf(NaN)); // -1
        console.log([NaN].findIndex(x => Object.is(NaN, x))); // 0         
        使用findIndex可以一定程序弥补indexOf的不足。

      includes()  判断元素是否包含在数组中

        console.log([1, 2, 3].includes(1)); // true
        console.log([1, 2, 3].includes(4)); // false

        console.log([1, 2, NaN].includes(NaN)); // true
        ES6提供的方法已经从本质是解决NaN不等于NaN。
        使用includes语义化比较好。

        console.log([NaN].indexOf(NaN)); // -1
        console.log([NaN].includes(NaN)); // true

      数组在ES6中提供的方法都是比较实用的。

    数值的拓展 主要包括方法的调整和新增方法

      十六进制
      console.log(0x1f7); // 503 
      ES5便存在16进制的表示方法。

      ES6提供二进制和八进制的表示方法。 

      八进制
      console.log(0o767); // 503 
      console.log(0O767); // 503

      十进制转二进制
      console.log(Number.prototype.toString.call(503, 2)); // 111110111

      二进制转十进制
      console.log(parseInt(111110111, 2)); // 503

      二进制
      console.log(0b111110111); // 503
      console.log(0B111110111); // 503

      数值的拓展包括全局方法的调整和定义新增方法。

      将全局方法parseInt、isNaN等定义到Number的构造器上。

      isNaN()

        console.log(isNaN(1)); // false
        console.log(isNaN(NaN)); // true
        console.log(isNaN('NaN')); // true

        全局的方法isNaN()添加到Number的构造器上。
        
        console.log(Number.isNaN(NaN)); // true
        console.log(Number.isNaN('NaN')); // false

        console.log(isNaN('NaN')); // true 提供隐式转换
        console.log(Number.isNaN('NaN')); // false  修正 不会进行隐式转换

      isFinite() 判断数字是否是有限（有效）的数字

        console.log(isFinite(42)); // true

        console.log(isFinite(NaN)); // false
        console.log(isFinite(Infinity)); // false
        
        console.log(isFinite(Infinity)); // false
        console.log(Number.isFinite(Infinity)); // false
        
        console.log(isFinite(Infinity)); // false
        console.log(Number.isFinite(Infinity)); // false

        console.log(isFinite(42)); // true
        console.log(Number.isFinite(42)); // true

        console.log(isFinite('42')); // true
        console.log(Number.isFinite('42')); // false
        不提供隐式转换

      parseInt / parseFloat

        和ES5相同，只是重新定义在Number的构造器上，为了减少原型上的属性。

      isInteger 判断数值是否是一个整数

        console.log(Number.isInteger(24)); // true
        console.log(Number.isInteger(24.0)); // true

        javascript引擎中相同的整数和浮点数认为是同一个值。

        console.log(Number.isInteger(24.1)); // false

        安全整数：

          MAX_SAFE_INTEGER: 9007199254740991 现阶段JS引擎能够解析的最大的整数。更大的数值虽然能够解析，但是不准确。
          MIN_SAFE_INTEGER: -9007199254740991 现阶段JS引擎能够解析的最小的整数。更小的数值虽然能够解析，但是不准确。

          console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); // true
          console.log(Number.MIN_SAFE_INTEGER === -Math.pow(2, 53) + 1); // true

        MAX_VALUE：能够处理的最大的数值（包括浮点数）
        MIN_VALUE：能够处理的最小的数值（包括浮点数）

      isSafeInteger 判断数值是否是安全范围之内的一个整数

    Math 拓展 内置对象，不存在构造器

      Math.abs 绝对值
      ...

  ## 正则方法、修饰符yus、UTF_16编码方式

    /\w/gim

    逻辑部分  修饰符部分

    g global      全局匹配
    i ignoreCase  忽略大小写
    m mutli-line  多行匹配

    var str = 'sdjflssefvjeio',
        reg = /\w/gim;

    str.match(reg); // ["s", "d", "j", "f", "l", "s", "s", "e", "f", "v", "j", "e", "i", "o"]

    元字符

      \w  代表数字、字母、下划线  可能是word的缩写
      \W  除了\w以外的所有的字符

      \d  代表数字  可能是digit的缩写

      \s  代表和制表符相关的所有字符 \t \n \v \f 。 可能是space的缩写

          \n  换行
          \r  回车
          \t  制表
          \v  垂直换行
          \f  换页

      \b  代表单词边界  可以记作bridge的简写，桥的两边

      . 除了 “ \n \r 行分隔符 段分隔符 ” 之外的字符都可以匹配

    /[\w\W]/gim; // 所有字符

    正向预查（先行断言）：一种查询方式    先行否定断言。

      /x(?=y)/ 只匹配y前面的x规则的值

    正则新增特性

      1. 声明正则的变化方式
      2. 将字符串上的正则方法进行了调整（主要是位置上的调整）
      3. 新增修饰符 y、u、s


      1. 声明正则的变化方式

        var reg1 = new RegExp('xyz', 'ig'),
            reg2 = /xyz/ig;

        var str  = 'xyzxyzxyzxyzxyzxyzxyz';

        console.log(str.match(reg1));
        // ["xyz", "xyz", "xyz", "xyz", "xyz", "xyz", "xyz"]
        console.log(str.match(reg2));
        // ["xyz", "xyz", "xyz", "xyz", "xyz", "xyz", "xyz"]

        ES5中两种声明方式是等效的。

        var reg = new RegExp(/xyz/gi),
            str = 'xyz2exyzwfaxyz';
        console.log(str.match(reg)); // ["xyz", "xyz", "xyz"]
        ES5种第一个参数传递正则表达式的形式，会报错。

        var reg = new RegExp(/xyz/gi, 'm'),
            str = 'xyz2exyz\nwfaxyz';
        console.log(str.match(reg)); // ["xyz", index: 0, input: "xyz2exyz↵wfaxyz", groups: undefined]
        第一个参数和第二个参数同时存在时，以当前的第二个参数为准，忽略原有表达式关于修饰符的部分。

      2. 正则方法位置的调整

        console.log(RegExp.prototype); // {constructor: ƒ, exec: ƒ, …}

        原型上属性

          flags 
          global     g
          ignoreCase i
          multiline  m 
          source     正则本身
          sticky 

        原型上方法

          test
          toString
          compile
          exec

          Symbol(Symbol.match)  
          Symbol(Symbol.replace)
          Symbol(Symbol.search)
          Symbol(Symbol.split)
          原本方法是定义在String的原型上的，ES6把这部分方法定义到正则对象的原型上。

          String.prototype.match  ->  RegExp.prototype[Symbol.match]
          String.prototype.matchAll  ->  RegExp.prototype[Symbol.matchAll]
          String.prototype.replace  ->  RegExp.prototype[Symbol.replace]
          String.prototype.search  ->  RegExp.prototype[Symbol.search]
          String.prototype.split  ->  RegExp.prototype[Symbol.split]

      3. 新增的修饰符 y u s

        var reg = new RegExp('xyz', 'gi');
        console.log(reg.global); // true
        console.log(reg.ignoreCase); // true
        console.log(reg.multiline); // false

        y (sticky) 修饰符 粘连

          var reg = new RegExp('xyz', 'gi');
          console.log(reg.sticky); // false 

          var reg = new RegExp('xyz', 'giy');
          console.log(reg.sticky); // true 

          每一个修饰符对应的就是一个属性。

          var str = 'aaa_aa_a',
              reg1 = /a+/g,
              reg2 = /a+/y;
          console.log(reg1.exec(str)); // ["aaa", index: 0, input: "aaa_aa_a", groups: undefined]
          console.log(reg2.exec(str)); // ["aaa", index: 0, input: "aaa_aa_a", groups: undefined]
          console.log(reg1.exec(str)); // ["aa", index: 4, input: "aaa_aa_a", groups: undefined]
          console.log(reg2.exec(str)); // null

          g   剩余位置中存在当前匹配项，可以匹配
          y   剩余位置中存在当前匹配项，且匹配的值必须和上一次的值连接


          var reg = /\wsss/giy;
          // source 返回的是正则的主体
          console.log(reg.source); // \wsss 
          // flags 返回的是正则的修饰符
          console.log(reg.flags); // giy  


        u (unicode) 修饰符  

          码点：
          
            JavaScript中每一个字符串都是以一定的方式存储和编码的，以UTF-16的方式进行存储。

            unicode 分区定义

              17个平面  

                2*16 （BMP 基本平面）

                U+0000 - u+FFFF （BMP范围）码点范围 UTF-16的存储极限

                0000就是4个码点

                有时，两个字节表明不了一个汉字，使用的4个字节。
                
                U+D800 - U+DFFF 
                D800以上不存在字符和码点对应的，800以上的是需要映射的内容，每一个映射的内容都表示一个具体的字符
                D800以上的可以使用4个字节来处理。

                console.log('\u20bb7'); // ₻7 16进制表示方法 
                console.log('\uD842\uDFB7'); // 𠮷 

                当码点数大于D800时，需要用4个字节的方法来表示。
                
                ES6中新增一种表示方式，可以正确解析字符。
                console.log('\u{20bb7}'); // 𠮷

                情报编码相关内容可以了解下。

            console.log(/^\uD83D/.test('\uD83D\uDC2A')); // true 一种错误的匹配方式
            console.log(/^\uD83D/u.test('\uD83D\uDC2A')); // false 认为是一整个匹配方式，所以是false

            var s = '\uD842\uDFB7';
            console.log(s); // 𠮷
            console.log(/^.$/.test(s)); // false
            整个UTF-16的存储的物理极限是U+0000 - U+FFFF，一旦超出，. 并不能匹配出这个字符。
            console.log(/^.$/u.test(s)); // true 可以让.识别超过800的编码

            u 是针对之前编码的缺陷推出的措施。对unicode的标识进行进一步的优化。

            console.log('\u{20bb7}'); // 𠮷
            ES6可以使用{}的方式识别5位的编码。

            console.log(/a{2}/.test('aa')); // true
            console.log(/{20bb7}/u.test('𠮷')); // 报错
            console.log(/\u{20bb7}/.test('𠮷')); // false
            console.log(/\u{20bb7}/u.test('𠮷')); // true
            /u 用来说明不是量词，用来表示unicode编码。
            u 用来匹配超出物理极限的值，当作一个字符处理
            
        s dotAll  代表所有的方式

          ES6中新的提案，ES2018年已经被实现，让.可以匹配任何字符，目前并没有兼容。

          \n \r 行分隔符 段分隔符

          U2028 - U2029 点所不能代表的字符

          console.log(/foo.bar/.test('foo\nbar')); // false 
          console.log(/foo.bar/s.test('foo\nbar')); // true 

          console.log(/foo.bar/.dotAll); // false
          console.log(/foo.bar/s.dotAll); // true

  ## Unicode表示法、字符串方法、模板字符串

    y 修饰符

      console.log('x##'.split(/#/y)); // ["x", "", ""]
      console.log('x##'.split(/#/g)); // ["x", "", ""]

      console.log('##x'.split(/#/y)); // ["", "", "x"]
      console.log('##x'.split(/#/g)); // ["", "", "x"]

      console.log('#x#'.split(/#/y)); // ["", "x", ""]
      console.log('#x#'.split(/#/g)); // ["", "x", ""]

      console.log('##'.split(/#/y)); // ["", "", ""]
      console.log('##'.split(/#/g)); // ["", "", ""]

      y修饰符和g修饰符相比较现阶段并不能体现匹配第一位的特点。

    字符串拓展（ES6拓展）

      console.log("\u61"); // 报错 不是十六进制

      console.log("\u0061"); // a
      以十六进制的方式来表示当前数字的方式，使用的码是Unicode码。

      console.log('\u20BB7'); // ₻7
      当码点数超过物理极限时，只会解析部分码点（以4位进行截取，再进行解析）。

      JavaScript字符串是以UTF-16的编码方式进行储存的。

      UTF-16两个字节的物理极限是 FFFF。
      标识字符以外的字符时，需要用4个字节来表示。

      console.log("\u20BB7"); // ₻7 
      console.log("\u{20BB7}"); // 𠮷
      ES6提供 {} 的方式，可以正确解析超过4位数的码点。

      U+0000 - U+FFFF 物理极限取值  有部分汉字无法表示，就需要使用4个字节来表示一个字符
      U+DB00 - B+DFFF 此区间是一个预留的空位。超出800按照4个字节进行解析。

      console.log('\uD842\uDFB7'); // 𠮷

      ES6提供的 unicode的字符串的表示方式
      console.log('\u0041'); // A
      console.log('\u0041\u0042\u0043'); // ABC
      console.log('\u{0041}\u{0042}\u{0043}'); // ABC
      console.log('\u{41}\u{42}\u{43}'); // ABC

      console.log('\uD842\uDFB7' === '\u{20BB7}'); // true
      console.log('\uD842\uDFB7' === "\u{20BB7}"); // true  JavaScript是不区分单引号和双引号的。

      var s = '\u{20BB7}';
      console.log(s.length); // 2
      JavaScript内部以UTF-16的方式进行编码，通常所说的字符长度，每个字符占两个字节。
      '\u{20BB7}' -> '\uD842\uDFB7' 
      length本质是在判断字符的个数，所以对应的长度为2。

      输出索引所对应的字符 ES5
      console.log(s.charAt(0)); // � 
      console.log(s.charAt(1)); // �
      单独读一个字符，不能正确表示一个字符，所以输出乱码

      输出字符所对应的unicode码的十进制码点 ES5
      console.log(s.charCodeAt(0)); // 55362 
      console.log(s.charCodeAt(1)); // 57271

      console.log(s.charCodeAt(0)); // 55362 
      console.log(s.charCodeAt(1)); // 57271

      console.log(Number.prototype.toString.call(55362, 16)); // d842
      console.log(Number.prototype.toString.call(57271, 16)); // dfb7

      codePointAt() 返回在指定下标处的码点 ES6
        
        var s = '\u{20BB7}a';
        console.log(s); // 𠮷a
        console.log(s.length); // 3

        console.log(s.codePointAt(0)); // 134071
        console.log(s.codePointAt(1)); // 57271
        console.log(s.codePointAt(2)); // 97
        console.log(Number.prototype.toString.call(134071, 16)); // 20bb7
        console.log(Number.prototype.toString.call(97, 16));

        codePointAt() 可以匹配当前正确的字符。

      字符串上存在迭代器接口

        var s = '𠮷a';

        for (let value of s) {
          console.log(value); // 𠮷 a
        }

        ES6底层中可以通过正确的解析方式将超出字符串极限的值打印出来。

        一个字节占8个byte。

        function is32Bit (c) {
          return c.codePointAt(0) > 0xFFFF;
        }
        console.log(is32Bit('𠮷')); // true
        console.log(0xFFFF); // 65535 
        比对的时候，自动转为10进制，再进行比较。

        is32Bit 在处理二进制数据时，可以使用is32Bit。

      formCodePoint / formCharCode 返回指定码点的字符

        ES5不能识别超出物理极限的码点。

        console.log(String.fromCharCode(0x20BB7)); // ஷ

        fromCharCode的处理方式是舍弃第一位，只处理后几位。
        console.log(String.fromCharCode(0x0BB7)); // ஷ

        console.log(String.fromCodePoint(0x20BB7)); // 𠮷 正确解析

        for (let code of 'foo') {
          console.log(code); // f o o
        }

      for of 可以正确处理超出字符极限的字符

        let str = String.fromCodePoint(0x20BB7);
        for (let i = 0; i < str.length; i++) {
          console.log(str[i]); // � �
        }
        for (let i of str) {
          console.log(i); // 𠮷
        }

      includes()、startsWith()、endWith() 条件成立，返回布尔值

        let s = 'Hello World!';

        console.log(s.startsWith('Hello')); // true       
        console.log(s.endsWith('!')); // true
        console.log(s.includes('o')); // true 

      repeat  重复

        console.log('x'.repeat(3)); // xxx
        console.log('x'.repeat(2.9)); // xx
        console.log('x'.repeat(NaN)); // 空位 
        console.log('x'.repeat(0)); // 空位
        console.log('x'.repeat('3')); // xxx  

        转换方式 底层使用parseInt转整

      padStart()、padEnd()  填充开始、填充结束

        console.log('x'.padStart(5, 'ab')); // ababx 
        console.log('x'.padStart(4, 'ab')); // abax 

        console.log('x'.padEnd(5, 'ab')); // xaba 
        console.log('x'.padEnd(4, 'ab')); // xabab 

    模板字符串

      let name = 'web',
          info= 'developer';

      let msg = `i am a ${name} ${info}`;
      console.log(msg); // i am a web developer

      console.log(`
          <div>
            <div>${name}</div>
            <div>${info}</div>
          </div>      
      `);
      // <div>
      //    <div>web</div>
      //    <div>developer</div>
      //  </div>      
      
      
      let x = 1, y = 2;
      console.log(`${x} + ${y} = ${x + y}`); // 1 + 2 = 3
      console.log(`${x} + ${y * 2} = ${x + y * 2}`); // 1 + 4 = 5

      let obj = { x: 1, y: 2 };
      console.log(`${obj.x + obj.y}`); // 3

      ${} {} 是一个表达式，可以进行计算。


      function fn () {
        return 'hello world';
      }
      console.log(`foo ${fn()} bar`); // foo hello world bar

      function fn () {
        return [1, 2, 3, 4];
      }
      console.log(`foo ${fn()} bar`); // foo 1,2,3,4 bar

      let msg = 'Hello, ${place}';
      console.log(msg); // 报错

      let msg = 'Hello, ${'place'}';
      console.log(msg); // Hello, place 模板字符串和传统字符串存在嵌套

      const temp = data => `
        <table>
          ${
            data.map(addr => `
              <tr><td>${addr.first}<td/></tr>
              <tr><td>${addr.last}<td/></tr>
            `).join('')
          }
        </table>
      `
      const data = [
        {
          first: 'zhang',
          last: 'san'
        },
        {
          first: 'li',
          last: 'si'
        }
      ];
      console.log(temp(data));

      // <table>
      //  <tr><td>zhang<td/></tr>
      //  <tr><td>san<td/></tr>
      // 
      //  <tr><td>li<td/></tr>
      //  <tr><td>si<td/></tr>
      // </table>

      如果传入的数组的first的值为 'alert('sss')'，当前这种模板渲染方式存在问题。

    ES5模板替换方式

      new RegExp(/{{(.*?)}}/gim);

    标签模板

      let a = 5,
          b = 10;

      console.log(`Hello ${a + b} world ${a * b}`);  

      tag`Hello ${a + b} world ${a * b}`;
	  
      function tag ($, $1, $2) {
        console.log($, $1, $2);
      }
      //  ["Hello ", " world ", "", raw: Array(3)] 15 50
	  
			可以使用标题模板防止恶意注入。
	  
	  
			function safeHtml ($) {
				let s = $;
				
				for (let i= 1; i < arguments.length; i++) {
					let arg = arguments[i] + '';
					
					s += arg.replace(/</g, '$lt;')
					        .replace(/>/g, '$gt;');
					
					s += $[i];
				}
				
				return s;
			}
		
			let sender = '<script>alert("abc")</script>';
			
			let msg = safeHtml`<p>${sender} has sent your msg</p>`
				
			console.log(msg); 
			// <p>, has sent your msg</p>$lt;script$gt;alert("abc")$lt;/script$gt; has sent your msg</p>
			
  ## map与set
			
    数组本身是一种特殊的对象。

    稀松数组、密集数组  如果值存在empty，就是稀松数组。

    Set

      ES6新增的数据类型，Set是一个构造函数，需要实例化。

      成员是唯一的"数组"。数据结构类似于对象。

      var set = new Set();
      console.log(set); 
      
    Map

      ES6新增的数据类型，Map是一个构造函数，需要实例化。

    Set、Map、Promise、Proxy 都是ES6新增的语法。
    babel无法对其降级，可以使用polyfill、babel-polyfill插件进行处理。

    Set

      add、clear、delete、entries、keys、values、has、forEach

      var set = new Set();
      set.add(5);
      set.add(4);
      set.add(6);
      console.log(set); // Set(3) {5, 4, 6}

      var set = new Set([5, 7]);
      console.log(set); // Set(2) {5, 7}
      传入的参数只能是部署过迭代器接口的数据结构（数组、类数组等）。

      Set的成员是唯一的。可以使用Set结构来去重，取交集并集等。

        var set = new Set([undefined, undefined]);
        console.log(set); // Set(1) {undefined}

        var set = new Set([null, null]);
        console.log(set); // Set(1) {null}

        var set = new Set([5, '5']);
        console.log(set); // Set(2) {5, "5"}

        var set = new Set([true, 1]);
        console.log(set); // Set(2) {true, 1}

        var set = new Set([NaN, NaN]);
        console.log(set); // Set(1) {NaN}

        var set = new Set([{}, {}]);
        console.log(set); // Set(2) {{…}, {…}}

      Set已经处理NaN不等于NaN的问题。

      add 添加数据

        var x = { id: 1},
            y = { id: 2 };

        var set = new Set();
        set.add(x);
        set.add(y);
        set.add(x);
        console.log(set); // Set(2) {{…}, {…}

        var set = new Set();
        set.add(x)
           .add(y)
           .add(x);
        console.log(set); // Set(2) {{…}, {…}

        Set可以进行链式调用。添加子项时返回值是set结构本身。

      size  Set的长度

        var set = new Set([1, 2]);
        console.log(set.size); // 2

      delete 删除数据

        var set = new Set([1, 2]);

        set.delete(2); // true
        set.delete(2); // false

        console.log(set); // Set(1) {1}

      clear 清空

        var set = new Set([1, 2]);
        set.clear(); // undefined 
        console.log(set); // Set(0) {}

        var set = new Set([1, 2]);
        console.log(set); // Set(0) {}
        set.clear(); // undefined 
        console.log(set); // Set(0) {}

      has 用于判断set中是否包含某一项

        var set = new Set([1, 2]);

        console.log(set.has(1)); // true
        console.log(set.has(3)); // false

      注意：Set的 clear和delete操作是实时的，只要执行，无论在哪执行也会有变化。

      const set = new Set([2, 3, 4, 5]);

      keys、entries、values

        console.log(set.keys()); // SetIterator {2, 3, 4, 5}
        console.log(set.entries()); // SetIterator {2 => 2, 3 => 3, 4 => 4, 5 => 5}
        console.log(set.values()); // SetIterator {2, 3, 4, 5}

        Set 不存在键名，键名和键值是一致的。 keys和values是一致的。
        keys、entries、values的返回值都是可迭代的。

        for (let i of set.keys()) {
          console.log(i); // 2 3 4 5
        }

        for (let i of set) {
          console.log(i); // 2 3 4 5
        }

        console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true

      forEach

        const set = new Set(['a', 'b', 'd', 'c', 'f']);

        set.forEach((val, key, arr) => {
          console.log(val, key, arr);
        });
        // a a Set(5) {"a", "b", "d", "c", "f"} 
        // b b Set(5) {"a", "b", "d", "c", "f"}
        // d d Set(5) {"a", "b", "d", "c", "f"}
        // c c Set(5) {"a", "b", "d", "c", "f"}
        // f f Set(5) {"a", "b", "d", "c", "f"}

        console.log(...set); // a b d c f
        可以使用拓展运算符展开set。拓展运算符可以拓展部署迭代器接口的数据结构。

      数组去重

        console.log([...new Set([1, 2, 1, 2 , 3])]); //  [1, 2, 3]

        可以使用set配合展开运算符进行数组去重操作。

      数组映射关系处理 - 值 * 2

        let set = new Set([1, 2, 3, 4, 5, 6]),
            set1 = new Set([...set].map(val => val * 2));
        console.log(set1); // Set(6) {2, 4, 6, 8, 10, …}

      parseInt()

        var arr = [1, 2, 3, 4];
        var arr1 = arr.map(parseInt);
        console.log(arr1); //  [1, NaN, NaN, NaN]

        parseInt参数为两个时，第二个参数当作进制处理

        parseInt(1, 0); // 1
        parseInt(2, 1); // NaN  2 以 1进制数处理
        parseInt(3, 2); // NaN  3 以 2进制数处理
        parseInt(4, 3); // NaN  4 以 3进制数处理

        let set = new Set([1, 2, 3, 4, 5, 6]);
        let set2 = new Set([...set].filter(x => (x % 2) === 0));
        console.log(set2); // Set(3) {2, 4, 6}

      实现交集、并集、差集
        
        let a = new Set([1, 2, 3]),
            b = new Set([4, 3, 2]);

        并集

          let union = new Set([...a, ...b]);
          console.log(union); // Set(4) {1, 2, 3, 4}

        交集

          let intersect = new Set([...a].filter(x => b.has(x)));
          console.log(intersect); // Set(2) {2, 3}

        差集
          
          let difference = new Set([...a].filter(x => !b.has(x)));
          console.log(difference); // Set(1) {1}

      同步获取set结构值的方法

        let set = new Set([1, 2, 3]);

        let set1 = new Set(Array.from(set));
        console.log(set1); // Set(3) {1, 2, 3}

        let set2 = new Set([...set]);
        console.log(set2); // Set(3) {1, 2, 3}

    Map

      键和值一一对应。

      var m = {},
          x = { id: 1 },
          y = { id: 2 };

      m[x]= 'foo';
      m[y] = 'bar';

      console.log(m[x]); // bar
      console.log(m[y]); // bar

      传统对象处理对象作为键存储时，会调用toString方法，对象并不能实现真正的键值一一对应。


      var m = new Map(),
          x = { id: 1 },
          y = { id: 2 };

      m.set(x, 'foo');
      m.set(y, 'bar');

      console.log(m.get(x)); // foo
      console.log(m.get(y)); // bar

      Map可以实现键值一一对应。

      Map是具备Iterator接口的数据结构，传参必须是一个双元的数组结构。

      let m = new Map([
        ['name', 'zhangsan'],
        ['title', '23']
      ]);
      console.log(m); // Map(2) {"name" => "zhangsan", "title" => "23"}

      let m = new Map();
      m.set('name', 'zhangsan');
      m.set('age', '34');
      console.log(m); // Map(2) {"name" => "zhangsan", "age" => "34"}

      var items = [
        ['name', 'zhangsan'],
        ['title', '23']
      ];
      let m = new Map();
      items.forEach(([key, value]) => m.set(key, value));      
      console.log(m); // Map(2) {"name" => "zhangsan", "title" => "23"}

      键名相同，存在值覆盖的情况。

      const map = new Map();
      map.set(1, 'foo');
      map.set(1, 'bar');
      console.log(map); // Map(1) {1 => "bar"}
      console.log(map.get(1)); // bar 
      console.log(map.get(2)); // undefined

      const map = new Map();
      map.set([5], 5555);
      console.log(map.get([5])); // undefined

      const map = new Map();
      map.set(-0, 123);
      console.log(map.get(+0)); // 123

      console.log(+0 === -0); // true
      console.log(Object.is(+0, -0)); // false

      const map = new Map();

      map.set(true, 1);
      map.set('true', 2);
      console.log(map.get(true)); // 1

      map.set(undefined, 1);
      map.set(null, 2);
      console.log(map.get(undefined)); // 1
      console.log(map.get(null)); // 2

      Map真正实现了键和值的关系。

      map.set(NaN, '123');
      console.log(map.get(NaN)); // 123

      Map也具备Symbol.iterator接口。

      基本方法和Set数据结构保持一致。使用方法和Set也相同。

      console.log(map[Symbol.iterator] === map.entries); // true

      for (let [key, values] of map) {
        console.log(key, values);
      }

  ## WeakMap与WeakSet、proxy与reflect

    Map转数组结构

      const map = new Map();

      map.set(true, 7)
         .set({ foo: 3 }, ['abc']);

      console.log(...map); // [true, 7] (2) [{…}, Array(1)]
      console.log([...map]); // [Array(2), Array(2)]

    Map转对象

      const map = new Map();

      map.set(true, 7)
         .set({ foo: 3 }, ['abc']);

      console.log(strMapToObj(map)); // {true: 7, [object Object]: Array(1)}

      function strMapToObj (map) {
        let obj = Object.create(null);
        
        for (let [key, value] of map) {
          obj[key] = value;
        }

        return obj;
      }

    对象转Map

      console.log(objectToMap({
        true: 7,
        no: false
      })); // Map(2) {"true" => 7, "no" => false}

      function objectToMap (obj) {
        let map = new Map();

        for (let key of Object.keys(obj)) {
          map.set(key, obj[key]);
        }

        return map;
      }

    Map、Set、Array、Object

      增加元素

        map.set() 

        set.add()

        obj[key] = value;

        array.push()

      查找元素

        map.has()

        set.has()

        value in object 可以遍历原型属性
        object.hasOwnProperty(value) 可以遍历原型属性
        
        array.find(() => { })

      修改元素

        map.set()

        set.forEach(item => item.t ? item.t = 2 : ''); // 针对引用值

        object[key] = value;

        arr.forEach(item => (item.t ? item.t = 2 : '')); // 针对引用值
        arr.findIndex() // 针对原始值

      删除元素

        map.delete()
        
        set.forEach(item => item.t ? set.delete(item) : '');

        delete object[value]

        array.findIndex(() => {})
          
          -> array.splice(index, 1)

      Map 和 Set 也部署迭代器接口，并且在底层优化方面做的更好，使用也比较简单、优雅。

    WeakMap WeakSet

      可以当作是阉割版的 Map 和 Set 。

      1. 不存在遍历方法
      2. 成员只能是对象
      3. 回收机制不同，弱引用，不考虑引用，直接释放。

      WeakMap 和 WeakSet 行为是无法预测的，最好不要使用。
  
      const set = new WeakSet();
      set.add(1); // Invalid value used in weak set

      const map = new WeakMap();
      map.set({ id: 1 }, 1); // WeakMap {{…} => 1}
      map.set(1, 1); // Invalid value used as weak map key

      WeakMap的键名只能是对象。

    Proxy

      代理模式的一种实现。

      let star = {
        name: 'yang',
        age: '23',
        phone: 'star 15900000000'
      }

      let agent = new Proxy(star, {
        get (target, key) {
          // 拦截取值操作 

          if (key === 'phone') {
            return 'agent 15200000000';
          }

          if (key === 'price') {
            return 200000;
          }

          return target[key];
        },

        set (target, key, value) {
          // 拦截赋值操作 

          if (value < 200000) {
            throw new Error('价格太低');
          } else {
            target[key] = value;

            return true;
          }
        },

        has (target, key) {
          // 可以拦截in操作符，不包括 for in

          if (key === 'customPrice') {
            return target[key];
          } else {
            console.log('请联系 agent 15200000000');
            return false;
          }
        },

        deleteProperty () {
          // 删除相关的操作
        },

        ownKeys () {

        }
      });

      console.log(agent.phone); 
      console.log(agent.price); 
      console.log(agent.name);
      
      agent.customPrice = 250000;
      // agent.customPrice = 150000;

      console.log('customPrice' in agent); // true
      console.log('customPrice2' in agent); // false

    Reflect

      Reflect上面对应的方法就是一个个操作。也说明Proxy可以拦截什么操作。

      let obj = {
        a: 1,
        b: 2,
        c: 3
      }

      console.log(Reflect.get(obj, 'a'));

      Reflect.set(obj, 'a', 10);

      console.log(Reflect.has(obj, 'a'));

      console.log(obj);

      Reflect 语义化相对好一些。

      Object.defineProperty =>  Reflect.defineProperty
      try catch 的方式捕获错误   可以根据返回值判断是否定义成功

      将构造器上的方法移到Reflect的原型上，底层做了一些优化，语义化更好。其实意义不大。
      
  ## class与对象

    function

      function Person (name, age) {
        this.name = name;
        this.age = age;
      }
      
      // Person(); // 普通函数执行
      // new Person(); // 实例化对象

      Person.prototype.say = function () {
        return `my name is ${this.name}, my age is ${this.age}`;
      }

      const person = new Person('yang', '13');

      person.say();

      console.log(Object.getPrototypeOf(person)); // { say: ƒ, constructor: ƒ } ...

      console.log(Object.getPrototypeOf(person).constructor === Person); // true
      // 原型上的构造器是其本身。

      console.log(Person.prototype === Object.getPrototypeOf(person)); // true

      console.log(person.__proto__ === Person.prototype); // true 
      console.log(person.__proto__ === Object.getPrototypeOf(person)); //  true

      console.log(Object.keys(Person.prototype)); // ['say']
      // 通过传统方式定义的函数，是可枚举的。

    class 类

      ES6 新推出的关键字，ES6之前是保留字。

      JavaScript 中并不存在真正的类，本质是只是一个语法糖（模拟类的方式）。

      class Person {
        constructor (name, age) {
          // 实例化的属性配置：私有属性
          this.name = name;
          this.age = age;
        }

        // 公有属性
        say () {
          console.log( `my name is ${this.name}, my age is ${this.age}`);
        }

        eat () {
          console.log('I can eat');
        }

        drink () {
          console.log('I can drink');
        }
      }

      const person = new Person('yang', 23);

      console.log(person); // Person {name: "yang", age: 23}

      person.say(); // my name is yang, my age is 23
      person.eat(); // I can eat
      person.drink(); // I can drink

      console.log(Object.keys(Person.prototype)); // [] 
      通过class关键字定义的方法是不可枚举的。


      class Person {}
      console.log(new Person());
      当没有定义constructor时，会默认添加一个constructor。
      

      class Person {
        constructor () { }
      }
      console.log(new Person() instanceof Person); // true

      class Person {
        constructor () {
          return Object.create(null);
        }
      }
      console.log(new Person() instanceof Person); // false


      const Person = class {
        say () {
          console.log(1);
        }
      }
      console.log(new Person().say()); // 1
      class 依然可以使用表达式的方式来定义。


      const Person = class {
        say () {
          console.log(2);
        }
      }();
      Person.say(); // error
      构造函数必须通过new的方式来定义。


      const person = new class {
        say () {
          console.log(2);
        }
      }();
      person.say(); // 2
      不建议使用。

      const person = new class {
        constructor (name, age) {
          this.name = name;
          this.age = age;
        }

        say () {
          console.log(2);
        }
      }('yang', 24);
      console.log(person); // {name: "yang", age: 24}


      console.log(new Person()); 
      class Person { }
      class 关键字定义的对象 不存在变量提升，存在暂时性死区（TDZ）


      class Person {
        a = 1;
      }
      console.log(new Person()); // Person {a: 1}
      这样定义的变量，默认放到私有属性中，ES7新出的特性。


      如何让公有的函数私有化？

        const eat = Symbol('eat');
        class Person {
          say () {
            console.log('say');
          }

          [eat] () {
            console.log('eat');
          }
        }
        const person = new Person();
        person.say(); // say
        person[eat](); // eat
        可以通过Symbol的方式定义私有方法。

        class Person {
          say (baz) {
            children.call(this, baz);
          }
        }
        function children (baz) {
          return this.bar = baz;
        }
        也可以使用定义函数的方式，在外部定义函数，不暴露这个方法。

      static  静态方法

        class Person {
          static b = 2;

          static a () {
            console.log('a');
          }
        }

        console.log(Person.a()); // a

        静态方法不会被实例继承的，可以通过当前类来定义。

        目前，也可以定义静态属性。ES2017 就已经支持。        
        console.log(Person.b); // 2

        static 只能在类中生效。

      var obj = {
        get a () {
          console.log(1);
        },
        set b (value) {
          console.log(2);
        }
      }
      obj.a; // 1
      obj.b = 2; // 2 


      class Person {
        get a () {
          console.log('a');
        }

        set b (val) {
          console.log(val);
        }
      }
      const person = new Person();
      person.a; // a
      person.b = 3; // 3
      可以在 class 中定义 getter 和 setter       

      在类（class）中，默认是使用严格模式的。


      私有属性：构造器上的属性

      公有属性：原型上的属性，公有属性只存在方法，变量声明都被转换成私有的
               
               共有属性私有化：一种是Symbol、一种是函数包装

      静态属性：static  可以定义静态属性和方法

      class 特征：

        1. 函数声明可以提升，class不能提升，存在暂时性死区（TDZ）
        2. class 中共有属性的方法不可枚举
        3. class 中默认是严格模式
        4. 没有手动定义constructor时，会默认添加构造器，不会报错
        5. 必须通过new的方式来执行

      继承（extends）：

        class中继承是非常简单的。

        class Parent {
          constructor (name = 'yang') {
            this.name = name;
          }

          say () { }

          static a () {  }
        }

        class Child extends Parent {
        }

        let child = new Child();
        console.log(child); // Child {name: "yang"}

        子类（派生类）不能继承父类的静态属性，可以继承公有属性。

        派生类中，必须通过super关键字来指定this。不适用super定义派生类的构造器，会报错。
        class Parent {
          constructor (name = 'yang') {
            this.name = name;
          }
        }
        class Child extends Parent {
          constructor (name = 'wang', age = 23) {
            super(name);
            this.type = 'child';
            this.age = age;
          }
        }
        console.log(new Child()); // Child {name: "wang", type: "child", age: 23}


        super可以指向原型对象。
        let proto = {
          y: 20,
          z: 40
        }
        let obj = {
          x: 10,
          foo () {
            console.log(super.y);
          }
        }
        Object.setPrototypeOf(obj, proto);
        obj.foo(); // 20


        super 作为对象的时候：

          1. 在对象当中指代对象的原型
          2. 静态方法中，指向自己的父类


    class 源码部分

      1. TDZ 暂时性死区
      2. 严格模式 use strict
      3. 原型上的方法不可枚举
      4. 只能够通过 new 来执行
      5. 不声明构造器时，存在默认的构造器

      class Person {
        constructor (name, age) {
          this.name = name;
          this.age = age;
        }

        say () {
          console.log('Hello World');
        }

        drink () {
          console.log('drink');
        }

        static eat () {
          console.log('eat');
        }
      }

      使用babel进行转译

    修饰器模式（装饰器）

      代理模式 在目标对象设置代理层，起到拦截的功能。

      装饰器模式 可以访问对象，只是修饰作用，在原有功能基础上附加新的功能。

      修饰器模式：为对象添加新的功能，不改变原有的结构和功能。

      装饰器在现阶段无法实现的，需要安装第三方包（babel-ployfill）实现。
      @readOnly 

      插件：babel-plugin-transform-decorators-legacy

      npm i babel-plugin-transform-decorators-legacy --save-dev

      .babelrc

        {
          "presets": ["env"],
          "plugins": [
            "babel-plugin-transform-decorators-legacy"
          ]
        }

      
      @testable
      class Person {
      }
      let person = new Person();
      function testable (target) {
        console.log(1);
        target.isTestable = true;
      }


      class Person {
        @readonly
        say () {

        }
      }
      let person = new Person();
      person.say();
      function readonly (target, name, descriptor) {
        console.log(target, name, descriptor);
        dscriptor.writable = false; // 设置属性不可写
      }

      可以使用  npx babel index.js --watch --out-file bundle.js  动态监听文件

      使用装饰器 可以让业务和逻辑分离，可以用来埋点分析。


      埋点案例

        let log = (type) => {
          return function (target, name, descriptor) {
            let src_method = descriptor.value;

            descriptor.value = (...arg) => {
              src_method.apply(target, arg, );

              console.log(type); // 打印日志
            }
          }
        }
        class AD {
          @log('show')
          show () {
            console.log('ad is show');
          }

          @log('click')
          click () {
            console.log('ad is click');
          }
        }

        let ad = new Ad();
        ad.show(); // show
        ad.click(); // click

        修饰器模式 开放封闭原则 拓展原有方法，不修改现有方法。

  ## 异步的开端-promise

    const fs = require('fs');

    fs.readFile('./name.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      if (data) {
        fs.readFile(data, 'utf-8', (err, data) => {

          fs.readFile(data, 'utf-8', (err, data) => {
            console.log(data);
          });
        });
      }
    });

    回调处理异步的时候，难于维护，功能无法拓展，

    try catch 只能捕获同步代码的错误，异步代码是无法捕获错误的。

      try {
        console.log(a);
      } catch (error) {
        console.log(error.message); // a is not defined
      }

      try {
        setTimeout(() => {
          console.log(a);
        }, 30)
      } catch (error) {
        console.log(error.message); // 直接报错，无法捕获错误
      }


    回调地狱：

      1. 难于维护，不便拓展
      2. try catch 无法捕获异步代码的异常
      3. 同步并发问题（同步执行两个异步操作） 
      
    jQuery中实现回调管理的工具：Callbacks

      let cb = $.Callbacks();
      function a (x, y) {
        console.log('a', x, y);
      }      
      function b (x, y) {
        console.log('b', x, y);
      }
      cb.add(a, b);
      cb.fire(10, 20);

      
      deferer 使用Callbacks管理回调。

      function waitHandle () {
        var dtd = $.Deferred();

        var wait = function () {
          var task = function () {
            dtd.resolve();
          }

          setTimeout(task, 2000);
          returen dtd;
        }

        return wait(dtd);
      }

      var w = waitHandle();

      w
        .done(function () {
          console.log('ok') 
        })
        .fail(function () {
          console.log('error');
        });

      w
        .then(
          function () {

          },
          function () {

          }
        )

      w.reject(); // 异步失败后，全部都是失败。可以在外层显示调用reject方法。


      function waitHandle () {
        var dtd = $.Deferred();

        var wait = function () {
          var task = function () {
            dtd.resolve();
          }

          setTimeout(task, 2000);
          returen dtd.promise();
        }

        return wait(dtd);
      }

      jQuery中处理异步的方式 Callbacks -> Deferred -> Promise promise最初的形式
      promise 无法显示调用reject() 方法。

    promise 是一种规范。  promise A+ 规范

    不止jQuery一种方式实现promise，有很多库也实现了promise。
    都是遵循promise A+ 规范定义promise的行为和方法。

    bluebird：promiseA+规范定义的工具包

    ES6中的promise

      // executor 执行者
      new Promise(function (resolve, reject) {
        console.log('promise');
      });
      console.log(1);

      // promise 
      // 1
      同步执行。
      
      promise 存放以后才会结束的事件，可以被当作一个容器。

      异步操作 状态

        1. pending 进行中
        2. fufilled（resolve）已成功
        3. reject 已失效

        a. 异步操作的状态不受外界影响；
        b. 状态存在不可逆性，一旦状态发生变化，不会再改变；

           promise固化之后，再对promise对象添加回调函数，可以直接拿到结果。
           如果是事件的话，一旦错过，就是真的错过了。 

           进行中 -> 已成功
           进行中 -> 已失效

      new Promise(function (resolve, reject) {
        console.log('promise');
        reject();
      });
      通过函数调用的方式改变promise的状态。

      const promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          Math.random() * 100 > 60 ? resolve()
                                  : reject();
        }, 300)
      });

      promise
        .then(res => {
          console.log('函数执行完成');
        })
        .catch(err => {
          console.log('函数执行失败');
        });
        
      promise.then(
        () => {
          console.log('函数执行完成');
        },
        () => {
          console.log('函数执行失败');
        }
      );
      
      
      const promise = new Promise((resolve, reject) => {
        console.log(0);
        resolve(1);
      });

      promise.then(
        (val) => {
          console.log(val);
        },

        (reason) => {
          console.log(reason);
        }
      );

      console.log(2);
      // 0 
      // 2
      // 1
      promise 的resolve和reject是异步操作，调用的是异步的回调函数。

      
    setTimeout 和 promise

      setTimeout(() => {
        console.log('time');
      });
      const promise = new Promise((resolve, reject) => {
        console.log(0);
        resolve(1);
      });

      promise.then(
        (val) => {
          console.log(val);
        },

        (reason) => {
          console.log(reason);
        }
      );
      console.log(2);

      // 0
      // 2
      // 1
      // time

      JS异步代码中分为两种任务，宏任务和微任务。

        微任务：promise、process.nextTick
        宏任务：setTimeout、setInternal ...

        宏任务任务队列、微任务任务队列

        每一次事件轮询时，当主线程任务完成后，会调用任务队列中的回调函数推入到执行栈中。
        优先放入微任务队列的回调函数，然后再处理宏任务队列中的回调函数。

      Promise.resolve().then(
        () => {
          console.log('promise1');

          setTimeout(() => {
            console.log('setTimeout2')
          }) 
        }
      );
      setTimeout(() => {
        console.log('setTimeout1');

        Promise.resolve().then(() => {
          console.log('promise2');
        });
      });

      // promise1
      // setTimeout1
      // promise2
      // setTimeout2

      // promise1
      // setTimeout1
      // setTimeout2
      // promise2

      宏任务和微任务 针对异步函数进行划分的，对于同步代码来说没有意义。

    链式调用问题


      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() * 100 > 60 ? resolve('ok')
                              : reject('no');
        });
      });

      promise
        .then(
          (val) => {
            console.log(val);
          },
          (reason) => {
            console.log(reason);
          }
        )
        .then(
          (val) => {
            console.log('second', val);
          },
          (reason) => {
            console.log('second', reason);
          }
        )

      // ok
      // second undefined

      // no
      // second no


      let promise = new Promise((resolve, reject) => {
        resolve(1);
      });

      promise
        .then(
          (val) => {
            console.log(val);
            return 2;
          }
        )
        .then(
          (val) => {
            console.log('second', val);
          }
        );

      // 1
      // second 2

      链式调用时，第二次调用的值是上次then函数 return 返回的值。
      第一次then的返回值作为下一次then的执行参数。

      let promise = new Promise((resolve, reject) => {
        resolve(1);
      });

      promise
        .then(
          (val) => {
            console.log(val);

            return new Promise((resolve, reject) => {
              reject(2);
            });
          }
        )
        .then(
          (val) => {
            console.log('success', val);
          },
          (err) => {
            console.log('error', err);
          }
        );

        // 1
        // error 2

        链式调用时，then函数中可以继续返回promise对象。

  ## promise的使用方法和自定义promisify

    promise 中如果抛出错误，状态就会转为reject状态。

    const promise = new Promise((resolve, reject) => {
      resolve(a);
    });

    promise.then(
      (res) => {
        console.log('resolve', res);
      }, 
      (err) => {
        console.log('reject', err.message);
      }
    );
    // reject a is not defined

    then存在两个参数，第一个为成功的回调函数，第二个为错误的回调函数。
    promise then的第二个回调函数等同于promise.catch()。

    推荐使用 .then .catch 的方法。
    promise
      .then(() => {})
      .catch(() => {})

    状态固化

      状态发生固化，意味着状态不再发生变化。

      let promise = new Promise((resolve, reject) => {
        resolve('ok');
        console.log(a);
      });
      promise
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })

      状态已经固化成成功状态，catch并不能捕获到当前的异常。


    catch捕获异常时，能够向后传递，直接捕获，是一种冒泡行为。状态固化之后，无法捕获。
    then函数如果不传任何参数，会直接忽略掉。

    promise代表的是一个异步函数。

    状态依赖问题

      const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('fail'))
        }, 3000);  
      });
      const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(p1);
        }, 1000)
      });
      p2
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.message);
        })
      // fail
      p1 作为参数传递给 p2 时，会导致 p2 状态无效。p2 状态依赖 p1 状态。
      会等待p1状态完成后再固化状态，这是底层帮我们处理的事情。    

    const p1 = new Promise((resolve, reject) => {
      resolve(1);
      console.log('2');
    });
    p1.then(res => {
      console.log(res);
    });
    // '2'
    // 1
    resolve、reject 不会终止函数执行，

    promise如何管理异步回调之间的关系？

      all、race

      all 
      
        异步操作全部成功的时候返回成功，返回所有成功的promise的值
        如果全部都失败，返回第一个触发失败的promsie的信息。
        如果有一个异步函数失败就失败，返回错误的promise的信息。

        const p1 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(1);
          }, 1000);
        });
        const p2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(2);
          }, 3000);
        });
        const p3 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(3);
          }, 2000);
        });

        Promise.all([p1, p2, p3])
          .then(arr => {
            console.log(arr);
          })
          .catch(err => {
            console.log(err);
          })      

        // [1, 2, 3]

      race 
      
        异步操作只有一个成功就成功，返回第一个执行成功的promise的值。
        异步操作失败，返回失败的promise的值。

        const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
          }, 1000);
        });
        const p2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(2);
          }, 3000);
        });
        const p3 = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(3);
          }, 2000);
        });

        Promise.race([p1, p2, p3])
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })

        // 1


      all：参数是iter对象

        所有都成功，返回iter对象里的所有返回值数组。
        如果失败，返回 iterable 里的第一个失败的的promise。
        对象的错误信息作为它的失败的错误信息。

      race：

        不管是成功还是失败，都会返回一个promise对象。
        promise 对象也会将成功或失败的详情作为返回值。

    thenable：绑定了 then 的对象都可以叫做thenable。

    Promise.resolve()

      直接返回一个promise对象。
      
      let thenable = {
        then: function (resolve) {
          resolve(42);
        }
      }
      let p1 = Promise.resolve(thenable);
      p1.then(val => console.log(val)); // 42


      let promise = Promise.resolve('hello');
      promise
        .then((val) => {
          console.log(val);
        });
      // hello
      
              
      setTimeout(() => {
        console.log(3); 
      });
      Promise.resolve().then(() => {
        console.log(2);
      })
      console.log(1);
      // 1
      // 2
      // 3
      Promise.resove().then 是本轮循环的微任务。

    Promise.reject()

      const promise = Promise.reject('123');
      promise
        .then(res => {
          console.log('then', res);
        })
        .catch(err => {
          console.log('catch', err);
        })

    Promise 处理回调函数 异步函数promise化

      function readFile (path) {
        return new Promise((resolve, reject) => {
          fs.readFile(path, 'utf-8', (err, data) => {
            if (data) {
              resolve(data);
              return;
            }
            console.log(err);
          });
        });
      }

      readFile('./name.txt')
        .then(data => readFile(data))
        .then(data => readFile(data))
        .then(data => console.log(data)); // 90分

    自定义 promisify

      function promisify (func) {
        return (...args) => {
          return new Promise((resolve, reject) => {
            func(...args, (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
        }
      }

      let readFile = promisify(fs.readFile);

      readFile('./name.txt', 'utf-8')
        .then(data => readFile(data, 'utf-8'))
        .then(data => readFile(data, 'utf-8'))
        .then(data => console.log(data)); // 90分

      node 版本 8.0后，这个方法被封装到util。

        const fs = require('fs'),
              util = require('util');

        let readFile = util.promisify(fs.readFile);

        readFile('./name.txt', 'utf-8')
          .then(data => readFile(data, 'utf-8'))
          .then(data => readFile(data, 'utf-8'))
          .then(data => console.log(data));

      将fs模块的方法全部promise化

        const fs = require('fs');

        function promisify (func) {
          return (...args) => {
            return new Promise((resolve, reject) => {
              func(...args, (err, data) => {
                if (err) {
                  return reject(err);
                }
                resolve(data);
              });
            });
          }
        }

        function promisifyAll (obj) {
          for (let [key, func] of Object.entries(obj)) {
            if (typeof func === 'function') {
              obj[key + 'Promise'] = promisify(func);
            }
          }
        }

        promisifyAll(fs);

        fs.readFilePromise('./name.txt', 'utf-8')
          .then(data => fs.readFilePromise(data, 'utf-8'))
          .then(data => fs.readFilePromise(data, 'utf-8'))
          .then(data => console.log(data));

  ## iterator与generator

    迭代器的一种实现方式

      迭代：一种有序的、连续的抽取数据的方式

      function makeIterator (arr) {
        var nextIdx = 0;

        return {
          next () {
            if (nextIdx < arr.length) {
              return {
                value: arr[nextIdx++],
                done: false
              }
            } else {
              return {
                value: undefined,
                done: true
              }
            }
          }
        }
      }

      var it = makeIterator(['a', 'b']);
      console.log(it.next());
      console.log(it.next());
      console.log(it.next());
      // { value: 'a', done: false }
      // { value: 'b', done: false }
      // { value: undeinfed, done: true }

    迭代器模式：结构化模式，从源 以一次一个的方式抽取
    迭代器：迭代器模式的实现方式，一种有序的，连续的，基于抽取的组织方式

    迭代器在前端中是不分内部迭代器和外部迭代器的。

    内部迭代器：系统内部定义好的迭代规则，调用时能够一次性拿到所有的元素，这种方式叫外部迭代器。

      for of [1, 2, 3]

    外部迭代器：自定义部署迭代器接口，自定义实现迭代器

    对象不具备迭代器接口，可以自己部署迭代器接口（外部迭代器）。

      const obj = {
        start: [1, 3, 2],
        end: [7, 8, 9],
        [Symbol.iterator] () {
          var nextIndex = 0,
              arr = [...this.start, ...this.end],
              len = arr.length;

          return {
            next () {
              return nextIndex < len ? { value: arr[nextIndex++], done: false }
                                    : { value: undefined, done: true };
            }
          }    
        }
      }

      for (let i of obj) {
        console.log(i);
      }
      // 1 3 2 7 8 9

    console.log(new Map([ ['a', 1], ['b', 2] ]));
    // Map { 'a' => 1, 'b' => 2 }

    let map = new Map([ ['a', 1], ['b', 2] ]);
    for (const i of map) {
      console.log(i);
    }
    // [ 'a', 1 ]
    // [ 'b', 2 ]

    let map = new Map([ ['a', 1], ['b', 2] ]);
    for (const [key, value] of map) {
      console.log(key, value);
    }
    // a 1
    // b 2

    部署过iterator接口的结构：array、map、set、string、TypeArray、nodeList、arguments

    使用 for of 迭代对象？
            
      let obj = {
        a: 1,
        b: 2,
        c: 3,
        [Symbol.iterator] () {
          const map = new Map();

          for (const [key, value] of Object.entries(this)) {
            map.set(key, value);
          }

          let mapEntries = [...map.entries()],
              nextIdx = 0,
              length = mapEntries.length;

          return {
            next () {
              return nextIdx < length ? { value: mapEntries[nextIdx++], done: false }
                                      : { value: undefined, done: true }
            }
          }
        }
      }
      for (const [key, value]  of obj) {
        console.log(key, value);
      }
      // a 1
      // b 2
      // c 3
    
    迭代器 是一种线性的处理方式，对象不是线性的数据。

    默认使用 iterator 接口的场合有哪些？

      1. 拓展运算符（...）
      2. for of 
      3. Array.from()
      4. map、set
      5. Promise.all()、Promise.race()
      6. yield

    迭代器除了部署 next 方法，还可以部署return、throw方法。

      let obj = {
        a: 1,
        b: 2,
        c: 3,
        [Symbol.iterator] () {
          const map = new Map();

          for (const [key, value] of Object.entries(this)) {
            map.set(key, value);
          }

          let mapEntries = [...map.entries()],
              nextIdx = 0,
              length = mapEntries.length;

          return {
            next () {
              return nextIdx < length ? { value: mapEntries[nextIdx++], done: false }
                                      : { value: undefined, done: true }
            },
            return () {
              return {
                value: 'break this iterator',
                done: true
              }
            }
          }
        }
      }
      for (const [key, value]  of obj) {
        console.log(key, value);
        break;
      }

      可以使用 break、throw new Error 等触发 return 方法。

    generator 生成器

      生成器，用于生成迭代器对象。

      function * test () { }
      let iter = test();
      console.log(iter); // 

      返回值是迭代器对象，需要配合yield使用。

      function * test () {
        yield 'a';
        yield 'b';
        yield 'c';
        yield 'd';
      }
      let iter = test();
      console.log(iter.next()); // { value: 'a', done: false }
      console.log(iter.next()); // { value: 'b', done: false } 
      console.log(iter.next()); // { value: 'c', done: false }
      console.log(iter.next()); // { value: 'd', done: false }
      console.log(iter.next()); // { value: undefined, done: true }

      yield产出的同时，会暂停函数执行。

      yield 相当于一个状态机，可以根据返回值不同进行不同的处理。

      yield 和 return 的区别？

        function * test () {
          console.log(0);
          yield 'a';
          console.log(1);
          yield 'b';
          console.log(2);
          yield 'c';
          console.log(3);
          return 'd';
        }
        const iter = test();
        console.log(iter.next());
        // 0
        // { value: 'a', done: false }
        console.log(iter.next());
        // 1
        // { value: 'b', done: false }
        console.log(iter.next());
        // 2
        // { value: 'c', done: false }
        console.log(iter.next());
        // 3
        // { value: 'd', done: true }
        console.log(iter.next());
        // { value: undefined, done: true }

        迭代器接口迭代的是yield产出的值，如果yield没有产出值，就算存在值，done也是true。

        return 虽然也会产出值，但是不会记录在iterator中。

        yield本质是暂停，存在记忆的功能，每一次yield都会记住上次的位置，然后接着向下执行。
        return只可以产出值，没有记忆功能，结束函数运行。

        break在函数体内是无法使用的。

      yield在普通函数中使用，会报错，只能出现在生成器中。

      function * test () {
        let a = yield 'a';
        console.log(a);
        yield 'b';
        yield 'c';
        return 'd';
      }
      const iter = test();
      console.log(iter.next());
      // { value: 'a', done: false }
      console.log(iter.next());
      // undefined
      // { value: 'ab', done: false }

      yield本身并不产生值，返回值为undefined，可以使用next方法进行传值。

      function * demo () {
        yield
      }
      let iter = demo();
      console.log(iter.next());
      // { value: undefined, done: false }
      yield 可以单独存在，是一个单独的表达式。

      function * demo () {
        console.log('hello' + yield 123); // 报错
        console.log('hello' + (yield 123)); // 不报错
      }


      function * demo () {
        foo(yield 'a', yield 'b');
      }
      function foo (a, b) {
        console.log(a, b);
      }
      let iter = demo();
      console.log(iter.next())
      // { value: 'a', done: false }
      console.log(iter.next())
      // { value: 'b', done: false }
      console.log(iter.next())
      // undefined undefined
      // { value: undefined, done: true }

      function * foo () {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
        yield 6;
        return 7;
      }
      for (let i of foo()) {
        console.log(i);
      }
      // 1 2 3 4 5 
      yield产出的值不包括return的值，可以被for of迭代。

      yield的返回值问题

        function * foo () {
          let value1 = yield 1;
          console.log(value1);

          let value2 = yield 2;
          console.log(value2);

          let value3 = yield 3;
          console.log(value3);

          let value4 = yield 4;
          console.log(value4);
        }
        let iter = foo();
        console.log(iter.next('one'));
        // { value: 1, done: false }
        console.log(iter.next('two'));
        // two
        // { value: 2, done: false }
        
        next是一种蛇形的赋值方式。
        第一个next的值可以不传，没有实际意义。

      对象部署迭代接口优化

        let obj = {
          start: [1, 3, 2],
          end: [7, 8, 9],
          [Symbol.iterator]: function * () {
            var nextIdx = 0,
                arr = [...this.start, ...this.end],
                len = arr.length;

            while (nextIdx < len) {
              yield arr[nextIdx++];
            }
          }
        }
        for (const i of obj) {
          console.log(i);
        }
        // 1 3 2 7 8 9

        
        let obj = {
          a: 1,
          b: 2,
          c: 3,
          [Symbol.iterator]: function * () {
            const map = new Map();

            for (const [key, value] of Object.entries(this)) {
              map.set(key, value);
            }

            let mapEntries = [...map.entries()],
                nextIdx = 0,
                length = mapEntries.length;

            while (nextIdx < length) {
              yield mapEntries[nextIdx++];
            }
          }
        }
        for (const [key, value]  of obj) {
          console.log(key, value);
        }
        // a 1
        // b 2
        // c 3

      异步代码 generator 优化 

        1. 

          const fs = require('fs');

          function promisify (fn) {
            return (...args) => {
              return new Promise((resolve, reject) => {
                fn(...args, (err, data) => {
                  if (err) {
                    return reject(err);
                  }
                  resolve(data);
                })
              });
            }
          }
            
          let readFile = promisify(fs.readFile);

          function * read () {
            let val1 = yield readFile('./name.txt', 'utf-8');
            let val2 = yield readFile(val1, 'utf-8');
            yield readFile(val2, 'utf-8');
          }

          const iter = read();

          let { value, done } = iter.next();

          value
            .then(val1 => {
              let { value } = iter.next(val1);

              value.then(val2 => {

                let { value } = iter.next(val2);

                value.then(val3 => {
                  console.log(val3);
                })
              })
            })

        2.
        
          const fs = require('fs');

          function promisify (fn) {
            return (...args) => {
              return new Promise((resolve, reject) => {
                fn(...args, (err, data) => {
                  if (err) {
                    return reject(err);
                  }
                  resolve(data);
                })
              });
            }
          }
            
          let readFile = promisify(fs.readFile);

          function * read () {
            let val1 = yield readFile('./name.txt', 'utf-8');
            let val2 = yield readFile(val1, 'utf-8');
            yield readFile(val2, 'utf-8');
          }


          function Co (iter) {
            return new Promise((resolve, reject) => {
              let next = (data) => {
                const { value, done } = iter.next(data);

                if (done) {
                  resolve(data);
                } else {
                  value.then(val => next(val));
                }
              }
              
              next();
            });  
          }

          Co(read()).then(val => {
            console.log(val);
          });

        3. 

          Co 是一个模块，可以使用 npm 进行安装。
          Co模块是TJ编写的。是NodeJS开发的参与者。  

          TJ 写过 Koa、Co、express、jade、mocha 。。。

          const co = reuqire('co');

          let promise = co(read());
          promise.then(val => {
            console.log(val);
          })

          function * read () {
            let val1 = yield readFile('./name.txt', 'utf-8');
            let val2 = yield readFile(val1, 'utf-8');
            yield readFile(val2, 'utf-8');
          }
          async await 其实就是对于 generator的优化。
          将 * 转换成 async，yield 转换成 yield。

          async function read () {
            let val1 = await readFile('./name.txt', 'utf-8');
            let val2 = await readFile(val1, 'utf-8');
            awiat readFile(val2, 'utf-8');
          }

          async 本质上就是 co、generator、promise来实现。

          async 特性在ES2017中实现，node 9 版本也实现了此写法。

  ## async与await、ES6的模块化

    iterator return

      function * get () {
        yield 1;
        yield 2;
        yield 3;
      }

      let g = get();

      console.log(g.next()); // { value: 1, done: false }
      console.log(g.return()); // { value: undefined, done: true }
      console.log(g.next()); // { value: undefined, done: true }
      
      function * get () {
        yield 1;
        yield 2;
        yield 3;
      }

      let g = get();

      console.log(g.next()); // { value: 1, done: false }
      console.log(g.return(10)); // { value: 10, done: true }
      console.log(g.next()); // { value: undefined, done: true }

      return时，终结整个迭代的过程，与在函数中使用return的效果是一致的。
      调用迭代器上的return方法，相当于显示的的在函数中调用return方法，传值方式也是一致的。

      function * get () {
        yield 1;
        return 10;
        yield 2;
        yield 3;
      }

      let g = get();

      console.log(g.next()); // { value: 1, done: false }
      console.log(g.next()); // { value: 10, done: true }
      console.log(g.next()); // { value: undefined, done: true }

    iterator throw

      抛出一个错误。try catch 可以配合 throw 使用。

      try {
        throw new Error('a is not defined'); 
      } catch (e) {
        console.log(e.message || e);
      }

      try catch 只能捕获同步代码的错误，异步代码的错误是无法捕获的。

      try {
        setTimeout(() => {
          console.log(a); // 报错
        })
      } catch (error) {
        console.log(error.message || error);
      }

      try catch 本质是同步代码，出错的时候已经执行完毕。


      var g = function * () {
        try {
          yield;
        } catch (error) {
          console.log('inner ', error.message || e);
        }
      }
      const i = g();
      console.log(i.throw('a'));
      console.log(i.next());
      // 报错
      try catch 无法捕获迭代器对象抛出的错误。


      var g = function * () {
        try {
          yield;
        } catch (error) {
          console.log('inner ', error.message || error);
        }
      }

      const i = g();
      console.log(i.next()); // { value: undefined, done: false }
      // inner a
      console.log(i.throw('a')); // { value: undefined, done: true }
      yield之前是无法捕获到异常的，要想使用try catch捕获异常，必须让next方法执行一次，才能捕获到。

      var g = function * () {
        yield 1;
        try {
          yield 2;
        } catch (error) {
          console.log('inner ', error.message || error);
        }
        yield 3;
      }

      const i = g();
      console.log(i.next()); // { value: 1, done: false }
      console.log(i.next()); // { value: 2, done: false }
      // inner b
      console.log(i.throw('b')); // { value: 3, done: false }
      console.log(i.next()); // { value: undefined, done: true }
      throw抛出错误，同时也具有next的效果。

      function * gen () {
        try {
          yield console.log(1);
        } catch (error) {
          console.log(error && error.message || error);  
        }
        yield console.log(2);
        yield console.log(3);
      }
      let i = gen();
      i.next();
      i.throw();
      i.next();
      // 1
      // undefined
      // 2
      // 3

    异步代码捕获

      const fs = require('fs'),
            co = require('co'),
            util = require('util');

      const readFile = util.promisify(fs.readFile);

      function * read () {
        try {
          let value1 = yield readFile('./name.txt', 'utf-8');
          let value2 = yield readFile(value1, 'utf-8');
          let value3 = yield readFile(value2, 'utf-8');
        } catch (error) {
          console.log('err', error && error.message || error);    
        }
      }

      co(read()).then(data => console.log(data));

      代码不会报错。

      try catch 在生成器函数中，是可以捕获到异步代码的异常的。

    async await

      async 本质上就是 generator 生成器函数。是一种语法糖。

      const fs = require('fs');

      const readFile = promisify(fs.readFile);

      function promisify (func) {
        return (...args) => {
          return new Promise((resolve, reject) => {
            func(...args, (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
        }
      }

      async function read () {
        try {
          let value1 = await readFile('./name.txt', 'utf-8');
          let value2 = await readFile(value1, 'utf-8');
          let value3 = await readFile(value2, 'utf-8');
          return value3;
        } catch (error) {
          console.log('err', error && error.message || error);    
        }
      }
      read().then(data => console.log(data)); // 90分

      async 函数对应的特点

        1. 内置执行器（co）封装到async函数内部
        2. 更好的语义化
        3. 更广的适用性（co的局限性）
        4. 返回值是promise对象

      async function read () {
        let value1 = await readFile('./name.txt', 'utf-8');
        console.log(a);
        return value1;
      }
      read()
        .then(data => console.log(data))
        .catch(err => console.log(err.message || err));
      
      async function read () {
        let value1 = await readFile('./name.tx', 'utf-8');
        console.log(a);
        return value1;
      }
      read()
        .then(data => console.log(data))
        .catch(err => console.log(err.message || err));

      函数体内部可以根据promise状态触发错误的回调函数，可以捕获到错误。
      async的返回值是promise对象，可以根据状态触发不同的回调函数。

      async function read () {
        let value1;
        try {
          value1 = await readFile('./name.tx', 'utf-8');
          console.log(a);
        } catch (error) {
          console.log('inner', error.message || error);    
        }
        return value1;
      }
      read()
        .then(data => console.log(data))
        .catch(err => console.log(err.message || err));
      可以通过try catch捕获内部的错误。try catch捕获错误比较精确。

      async function read () {
        let value1 = await 1;
        return value1;
      }
      read()
        .then(data => console.log(data))
        .catch(err => console.log(err.message || err));
      await后可以不是promise对象，可以是一个值。

    多个异步函数，如果出现一个错误，如何拿到成功的值？

      let promise = Promise.all([
        readFile('./name.txt', 'utf-8'),
        readFile('./numbe.txt', 'utf-8'),
        readFile('./score.txt', 'utf-8')
      ])

      promise
        .then(arr => console.log(arr))
        .catch(err => console.log(err.message || err));

      Promise.all 如果一个错误，就会返回错误信息，不会返回成功信息。

      一种比较low的解决方式

        async function readAll () {
          let val1,
              val2,
              val3,
              res = new Set();
          
          try {
            val1 = await readFile('./name.txt', 'utf-8');
          } catch (error) {
            console.log('val1', error);    
          }

          try {
            val2 = await readFile('./numbe.txt', 'utf-8');
          } catch (error) {
            console.log('val1', error);    
          }

          try {
            val3 = await readFile('./score.txt', 'utf-8');
          } catch (error) {
            console.log('val1', error);    
          }

          res.add(val1);
          res.add(val2);
          res.add(val3);

          return res;
        }

        readAll()
          .then(arr => console.log(arr))
          .catch(err => console.log(err));

      异步的核心就是promise，其他就是边边角角的问题。

  ## PromiseA+规范阅读与源码重写

    PromiseA+规范

      Promise是一个构造函数。

      let promise = new Promise(() => {
        // Promise对象实例化时，内部匿名函数是自动执行的。 => excutor
      });

      promise 状态

        pending、fulfilled、rejected

      promise 链式调用

        1. 通过return传递结果

          ```js
          promise
            .then(value => {
              return res;
            })
            .then(value => {
              console.log(value);
            });
          ```

        2. 通过新的promise resolve结果

          ```js
          promise
            .then(value => {
              return value;
            })
            .then(value => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(value);
                });
              });
            });
            .then(value => {
              console.log(value);
            });
          ```

        3. 通过新的promise reject原因

          ```js
          promise
            .then(value => {
              return value;
            })
            .then(value => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject('error');
                });
              });
            });
            .then(value => {
              console.log(value);
            }, (reason) => {
              console.log(reason);
            });
          ```

        4. then走失败的回调函数后，再走then

          ```js
          promise
            .then(value => {
              return value;
            })
            .then(value => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject('error');
                });
              });
            });
            .then(value => {
              console.log(value);
            }, (reason) => {
              console.log(reason);
            })
            .then((value) => {
              console.log('fulfilled', value); // checked
            }, (reason) => {
              console.log('rejected', reason);
            });
          ```

        5. then中使用throw new error

          ```js
          promise
            .then(value => {
              return value;
            })
            .then(value => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject('error');
                });
              });
            });
            .then(value => {
              console.log(value);
            }, (reason) => {
              console.log(reason);
            })
            .then((value) => {
              throw new Error('this is a error');
            })
            .then((value) => {
              console.log(value);
            }, (reason) => {
              console.log(reason);
            }); 
          ```

        6. catch捕获异常

          catch在promise的源码层面上就是一个then，catch也遵循then的运行原则。

          ```js
          promise
            .then(value => {
              return value;
            })
            .then(value => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject('error');
                });
              });
            });
            .then(value => {
              console.log(value);
            }, (reason) => {
              console.log(reason);
            })
            .then((value) => {
              throw new Error('this is a error');
            })
            .then((value) => {
              console.log(value);
            })
            .catch(error => {
              console.log('catch', error);
              return 'catch error';
            })
            .then(value => {
              console.log('then', value);
            });
          ```

      promise 成功条件

        1. then return 返回普通的javascript value
        2. then return 新的promise成功态的结果

      promise 失败条件

        1. then return 新的promise失败态的原因
        2. then 抛出了异常 throw new Error

      promise 链式调用

        javascript jQuery return this
        then 不具备this
        return new Promise

        ```js
        let promise2 = promise.then(() => {
          // return 第一次返回的结果
        }).then((value) => {
          // return 第二次返回的结果
        });
        ```

        ```js
        let promise2 = promise.then(() => {
          // return 第一次返回的结果
        });
        promise2.then(() => { 

        });
        ```

        第一种写法和第二种写法有区别嘛？

        第一种写法promise2是两次then的结果，第二种写法promise2是一次then的结果。

      