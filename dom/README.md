# DOM

  ## 一、DOM 初探、JS对象、XML

DOM Document Object Model 文档对象模型

DOM本身就是对象，又叫宿主对象。 即JavaScrip要想在浏览器中起到DOM作用的话，
需要浏览器提供一系列与DOM相关的方法，不是ECMAScript提供的，是浏览器本身提供的。

### JavaScript 对象类型

JavaScript大概分为3种对象。

#### 本地对象 Native Object

```js
Object Function Array String Number Boolean 

Error EvalError SyntaxError RangeError ReferenceError TypeError URIError

Date RegExp
```
#### 内置对象 Built-in Object

```js
Global、Math
```

global对象在ECMA是不存在的，是虚拟的，只是统称为全局，全局下的方法都属于global。

例如isNaN()、parseInt()、Number()、decodeURL()、encodeURL都是global的方法。

Infinty NaN undefined 是全局对象下的属性。

本地对象和内置对象都是ES的内部对象。都是ECMAScript提供的。

#### 宿主对象 Host Object

  执行JS脚本的环境提供的对象是宿主对象，又称浏览器对象。

  宿主对象提供的方法可能不同，即便是相同，可能实现的方式也不一样。

  浏览器与浏览器之间执行JS脚本的时候，在用到宿主对象的方法时，有可能造成兼容性问题。

  浏览器对象有window（BOM）和document（DOM）。

  DOM实际是被BOM包含的，DOM是BOM其中一部分。DOM是有w3c规范的，BOM没有标准。
  浏览器与浏览器之间运行JS，和实现某些方法的方式是不同的，所以说存在不同的BOM的方法，所以没办法给出标准。

  document是存放在window下的。宿主对象其实就是浏览器对象，JS脚本是放在浏览器上运行的。

### DOM

  DOM：通过浏览器提供的一套方法表示或者操作HTML和XML。

  DOM本身是不可以操作CSS，只可以操作HTML和XML。

### XML

  XML -> XHTML -> HTML

  HTML是参照XHTML制定的，XML为HTML奠定了一个最基本的规范。

```html
<person>
    <name>张三</name>
    <sex>男</sex>
    <age>18</age>
</person>
```

``` 
name是window上一个内置属性，属于全局数组window，全局定义变量应该避免。
```

**标签与元素**

 <person></person> 是一种标签，<perosn>标签及标签内部的所有文本加到一起叫做一个元素。

**选择元素**

```js
var box = document.getElementById('box');
var boxes = document.getElementsByTagName('div')[0];
```

### 相关问题

#### DOM是否可以操作CSS？

不能操作CSS，操作的不是CSS，是操作的元素上的属性，是内联样式。（dom.styles.backgroundColor）。

#### Jquery能不能操作CSS？

 jquery也是操作元素上的属性，是添加行内样式，不是操作样式表。
 内联样式比内部样式优先级高

  ## 二、document对象、获取元素、节点、遍历树

xml在服务器之间传输过程中，格式要求比较严格。

遍写html对于前端来说，就是搭建DOM树。

级联样式有时候是没必要写的，能大概区分的，可以不写，例如某些外层包裹的盒子。
级联样式过于长，对于性能是不佳的。

### 获取元素

```js
document.getElementById();
document.getElementsByClassName()
document.getElementsByTangName();
```

document代表整个html文档。html是根标签，JS认为整个JS是一个文档。

document其实是一个对象，是一个Object。

### DOM 原型链

```js
document.__proto__ => HTMLDocument
HTMLDocument.__proto__ => Document // Document.prototype 存在getElementById等方法
Doucment.__proto__ => Node // Node.prototype 存在nodeType nodeName等属性
Node.__proto__ => EventTarget // EventTarget.prototype 存在addEventListener removeEventListener
EventTarget.__proto__ => Object // Object.prototype 存在get方法和set方法
Object.prototype // 原型顶端
```

### document 方法

#### getElementById

```js
document.getElementById('box');
document.getElementById('Box');  
```

IE6也可以使用该方法。支持IE6以上。
IE8以下的浏览器是不分大小写的，获取DOM元素。
IE8以下可以通过name属性获取元素。

```js
<box name="box"></box>
```

id在项目中是不可以随便用的（id="box"）。大公司中，ID一般是不作为书写样式去定义的。
id一般称之为钩子。一般用来获取元素，模块化开发中，一般都是以id作为标识，给后端对接使用，可以注入数据。

#### getElementsByTagName()

返回类数组。

类数组其实是对象，用对象来模拟数组。 IE4也支持该方法。基本不存在兼容性问题。

#### getElementsByClassName()

返回类数组。

IE8及以下的浏览器不支持该方法，存在兼容性问题。

#### getElementsByName()

基本不使用该方法，IE8以下都支持。原则只能用于有name属性的值。例如input、image、iframe。
实际上也能用name属性选择div元素。

#### querySelector()、querySelectorAll()

HTML新引入的WEB API，正式引入HTML标准。
IE7支持该方法，IE7以下不兼容。传入参数和css选择器一致。

```js
querySelector('div')、querySelector('.text'); // 类和标签有重复的情况，只选择第一个元素。
querySelector('div > p'); // 选择直系子元素
querySelector('#box'); // 选择ID属性的元素
```

```js
querySelectorAll() // 可以选择多个元素。类数组。
// 性能不好，经过测试，比其他get*的方法查询性能差。
```

querySeletor，使用remove方法，不会实时，如果单纯选择元素可以使用，如果需要实时变化，不好用。

### 节点与元素节点树

节点不是元素，不等于元素。节点包含元素，元素是节点的一部分（元素节点）。

元素节点 === DOM元素

#### 元素节点树

```js
    <ul>                                                ul
      <li>                                              li
        <h2>我是标题标签</h2>                   h2        a         p
        <a>我是超链接标签</a>
        <p>我是段落标签</p>
      </li>
    </ul>
```

#### 遍历节点树

##### parentNode

parentNode 获取父节点，elem.parentNode。  常用。

html的父节点是document。 document的父节点是null。

##### childNodes 

childNodes 获取子节点集合，不仅仅是元素节点。 常用。

##### firstChild、lastChild 

获取元素的第一个子节点和最后一个子节点。

##### previousSibling、nextSibling 

获取元素的上一个兄弟节点和下一个兄弟节点。

##### parentElement

获取父级元素节点  IE9及以下不支持。html的父元素节点是null。

##### children

获取子元素节点集合，只包含元素节点。

IE7及以下不支持。

##### childElementCount

获取子元素节点集合的长度。IE9及以下不支持。

childElementCount = children.length

##### firstElementChild、lastElementChild

获取元素的第一个元素节点和最后一个元素节点。

IE9及以下不支持。

##### previousElementSibing、nextElementSibing

获取元素的上一个兄弟元素和下一个兄弟元素。IE9及以下不支持。

#### 节点类型

* 元素节点 1
* 属性节点 2
* 文本节点 text 3
* 注释节点 comment 8
* document节点 9
* DocumentFragment节点 11

节点对应自己的节点号 

  ## 三、节点属性、方法、封装方法、DOM结构

### 节点编号

```js
元素节点 // 1
属性节点 // 2 
文本节点 // 3 #text
注释节点 // 8 #comment
document // 9 #document
DocumentFragment // 11
```

### 节点属性

#### nodeName 节点名称

```js
document.nodeName  // #document
```

节点的nodeName属性是只读的，不可更改

#### nodeValue 节点值

文本节点、注释节点、属性节点有属性值。
元素节点没有属性值，获取时为null。

```js
getAttributeNode() // 获取属性节点
```

```js
getAttributeNode('id').nodeValue === getAttributeNode('id').value;
// 属性节点可以使用nodeValue或者value获取节点值
```

节点的nodeValue是可读写的（属性、注释、文本可用）。

#### nodeType 节点类型

```js
document.nodeType // 9
```

nodeType是只读的，不可更改。

#### attributes 元素的属性节点集合

```js
attributes[0] // 获取属性集合第一个 使用较少
attributes[0].nodeValue === attributes[0].value // 获取属性值
getAttributeNode() // 获取属性节点 使用较少
getAttribute() // 获取节点属性值
setAttribute() // 设置节点属性值
hasChildNodes() // 判断节点是否有子节点 返回值为true或false。
```

注意，div标签换行也算文本节点，判断为true。

IE7以下不支持children方法，可用作兼容性处理。

### 类数组

数组是一种特殊的对象。类数组一定有length属性。类数组是没有push方法的。

```js
var obj = {
  '0': 1,
  '1': 2,
  '2': 3,
  'length': 3,
  'push': Array.prototype.push,
  'splice': Array.prototype.splice
}
```

类数组可以继承数组的push方法使用，length是自动增加的。
可以使用继承数组splice方法，使类数组像真正的数组。

**区分自定义类数组和真正数组？**

打印信息中，自定义类数组的length属性是深紫色的，浅紫色的属性系统内置的。

### DOM 结构树

```js
                                Node

  文档方向          文档字符方向            元素方向        属性方向

  Document         Character              Element         Attributes

1 HTMLDocument     Text   Comment        1 HTMLElement   
2 XMLDocument                            2 XMLElement  之前浏览器存在，现在没有该对象

                    HTMLHeadElement HTMLBodyElement HTMLTitleElmment HTMLParagraphElement

                        HTMLInputElement  HTMLTableElement  HTMLOthersElement
```

我们认为的DOM结构树的顶点是Node。
DOM是操作HTML和XML的，DOM是不能够直接操作CSS的，只能通过style来操作行间样式。

document.get** 都是继承于 Document 的。

Element.prototype 存在 get*，query* 方法，但是没有getElementById方法。

可以使用 **Object.prototype.toString.call()** 查看节点类型

```js
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(div); // "[object HTMLDivElement]"
```

### DOM 操作深入

通过方法选择元素后再经过构造函数实例化，最终形成DOM对象。

```js
<div></div> -> document.getElementsByTagName('div')[0] 
            -> HTMLDivElement () {} -> new HTMLDivElement() => DOM对象
```

任何对象都是实例化出来的，有些对象底层帮助我们实例化，自定义对象需要自己实例化。

**getElementById()**  

只存在于Document.prototype，Element.prototype以及HTMLElement都没有此方法。

**getElementsByName()**

只存在于Document.prototype，Element.prototype不存在此方法。

**getElementsByClassName()、getElementsByTagName()、querySelector()、querySelectorAll()**

存在于Document.prototype、Element.prototype

***通配符**

在CSS中会为所有元素添加样式。
在DOM中会选择全部标签，只能用在getElmentsByTagName()中，一般不会使用。

**如何选择body和head元素？**

HTMLDocument.prototype 存在 body 和 head 属性，可以直接获取对应元素。

```js
document.body、document.head
```

HTMLDocument 存在 title 属性，可以获取title标签内文本。

```js
document.title
```

**如何获取html元素？**

Document.prototype 存在 documentElement 属性，可以直接获取html元素。

```js
document.documentElement
```

### 原型编程案例

#### 获取子元素集合

```js
/**
 * @description 获取子元素集合
 * @param {object} node - 元素节点
 * @returns {object}
 */
function elemChildren (node) {
  var temp = {
        'length': 0,
        'push': Array.prototype.push,
        'splice': Array.prototype.splice
      },
      len = node.childNodes.length;
  
  for (var i = 0; i < len; i++) {
    var childItem = node.childNodes[i];

    if (childItem.nodeType === 1) {
      temp.push(childItem);
    }
  }

  return temp;
}
```

  ## 四、节点创建删除、元素属性设置获取、节点属性

动态创建出的元素不在DOM树上，存放于内存中。可以通过document.body.appendChild()添加进DOM树。

### 操作元素节点

#### createElement()

 创建元素。此方法只存在于Document.prototype上。

```js
document.createElement('div');
```

#### createTextNode() 

创建文本节点。此方法只存在于Document.prototype上。

```js
document.createTextNode('123');
```

#### createComment() 

创建注释节点。此方法只存在于Document.prototype上。

```js
document.createComment('我是注释');
```

#### appendChild(node|element) 

添加子元素 。此方法存在于Node.prototype中。

appendChild()不仅有增加功能，还有剪切功能。可以动态的增加和剪切节点。  

#### insertBefore()

 插入元素。此方法存在于Node.prototype中。

c.insertBefore(a, b)：在父级c节点下的子节点b之前插入a节点。

####  removeChild() 

移除子节点。此方法存在于Node.prototype中。
在父节点下移除子节点。只是剪切掉，并不是删除掉，存在于内存中。

```js
选择元素  -> 构造函数实例化         -  div节点
div         new HTMLDivElement()      removeChild
            -> div DOM对象            只是在DOM文档中移除节点
            存到内存中                 没有删除内存中的节点
```

```js
document.getElementsByTagName('p');
function getElementsByTagName (element) {
	// 1. 从html选择p元素
	// 2. 通过实例化HTMLParagraphElement()变成DOM节点、DOM元素
}
```

####  remove()

删除节点，ES5方法。此方法存在于Element.prototype中。

删除本节点，在内存中也进行删除。

```js
div.remove();
```

#### innerHTML innerText 

innerHTML存在于Element.prototype和HTMLElement.prototype上。
innerText存在于HTMLElement.prototype上。

innerHTML会取出标签内所有元素的字符串，包括标签（html字符串）。
innerText会取出标签内所有文本，仅限于文本（过滤掉标签，只剩下文本）。

innerText赋值时不会解析字符串，innerHTML会解析字符串。

innerText老版本火狐浏览器不支持该属性，可以使用textContent。
textContent老版本IE不支持该属性。

**为什么innerText不会解析字符串？**

innterText会把字符串中的标签解析成字符实体。

```js
<a href="https://www.baidu.com">我是超链接</a>
&lt;a href="https://www.baidu.com"&gt;我是超链接&lt;/a&gt;
```

#### replaceChild(new, origin)

用新节点替换旧节点

#### createDocumentFragment

```js
document.createDocumentFragment(); // 创建文档片段（碎片）
```

可以动态创建div添加元素，然后添加到UI中，但是会有外部包裹div。
可以使用DocumentFragment，不存在DOM节点树中，没有外部包裹。可以提高性能。

如果创建列表，不使用字符串拼接，存在大量属性时，都可以使用DocumentFragment，字符串的性能相对较好。

### 操作元素属性

#### setAttribute(key, value)

为元素设置属性和属性值

```js
div.setAttribute('id', 'box')
```

#### getAttribute(key) 

获取元素属性值

```js
div.getAttribute('id')
```

#### data-*

自定义属性。HTML5版本中给元素增加data-*的属性，这个属性可以满足我们自定义属性。

```js
data-name="yangzhiqiang" data-age="18"
```

可以使用element.dataset获取此属性。该属性存在于HTMLElement.prototype中。
也可以通过getAttribute('data-name')获取属性值。        

IE9及以下没有dataset属性。

## 五、滚动距离与高度、兼容模式、可视尺寸

### 查看滚动条高度

滚动条的距离不是“滚动条”距离上侧有多远，并不是真正的物理距离，是有一定的比例，要真正看页面向上移动了多少。

常规方法：IE9某些版本和IE8及以下版本没有此属性

```js
window.pageXoffset/pageYpffset
```

 IE9/IE8以下：

```js
document.body.scrollLeft/scrollTop
document.documentElement.scrollLeft/scrollTop
```

不常见：

```js
window.scrollX/scrollY
```

    Broswers                    IE6789b         IE678/O/FFs   IE9s       C/Sbs    O/FFb     O/FFs
    (b指代怪异模式)     
    document.documentElement    value:0           yes         yes        value:0  value:0   yes
    document.body               yes               value:0     value:0    yes      yes       value:0
    pageOffset                  undefined         undefined   yes        yes      yes       yes
    scroll                      undefined         undefined   undefined  yes      yes       yes

chrome浏览器不支持document.body，其他的都支持。

### 兼容模式

浏览器的怪异模式和标准模式。浏览器是向后兼容的。

DOM的语法是由W3C来规范的，之前写的东西是不符合W3C规范的。
W3C定义一行代码（```<!DOCTYPE html>```），以区别浏览器模式，于是有了浏览器怪异模式和标准模式。

```<!DOCTYPE html>``` 标准模式

可以使用document.compatMode查看当前模式。

CSS1Compat 标准模式（W3C规定的模式）
BackCompat 怪异模式（浏览器默认向后兼容5个版本的模式，现在浏览器基本都是兼容5个版本）

### 可视尺寸

获取浏览器可视区域的尺寸（窗口的尺寸）。

常规方法：

```js
window.innerWidth/innerHeight 包括滚动条高度
```

IE9/IE8及以下：

```js
标准模式：document.documentElement.clientWidth/clientHeight 不包括滚动条高度 
怪异模式：document.body.clientWidth/clientHeight 包括滚动条高度
```




      window.outerWidth/outerHeight 
      
        包含滚动条、侧边栏、工具条等。使用较少
    
      * 可视尺寸函数封装
        可以通过判断兼容模式封装获取视图的函数。


    滚动距离 = 可视区域 + 滚动条高度 (window.innerWidth + window.pagexOffset)
    
      document.body.scrollWidth/scrollHeight
      document.documentElement.scrollWidth/scrollHeight
    
      * 封装获取滚动距离函数


​    
​    Element.getBoundingClientRect() 
​    
​      获取DOM的基本信息，包括宽度、高度等，包括margin和padding值。数据不实时，基本不会使用。
​    
​      {"x":210,"y":210,"width":220,"height":220,"top":210,"right":430,"bottom":430,"left":210}
​    
​    Element.offsetLeft/offsetTop
​    
​      获取距离左边和上边的距离，相对于父级定位元素开始计算，如果没有定位元素，寻找可视区域边框。
​    
​      margin塌陷解决措施：
​    
​        1. 父级元素设置border-top: 1px solid #000;
​        2. 触发BFC （HTML-7）
​           父级元素设置绝对定位、overflow:hidden等
​    
​    Element.offsetParent
​    
​      返回有定位的父级元素
​    
      * 封装寻找元素距离边框的距离函数


    操作滚动条
    
      window.scroll(x. y)/window.scrollTo(x, y)  滚动到某个位置。
      window.scrollBy(x, y) 每一次滚动多少，累加。

  ## 读写样式属性、操作伪元素、元素运动初探

    DOM间接操作CSS，不能直接操作CSS样式表，是通过修改标签上的样式属性来更改CSS样式。
    
    Element.style.xxx 
    
      可读可写、
        div.style.width = '100px';
        console.log(div.style.width);
    
      所有的属性都要用小驼峰命名、
    
      值一定是字符串、
    
      复合值一定拆解赋值（eg：border），不建议大量使用.语法赋值，建议使用类名切换的方式。
        oDiv.style.borderWidth = '1px';
        oDiv.style.borderStyle = 'solid';
        oDiv.style.borderColor = '#000';
    
        类名切换
        oDiv.className += ' active';
    
      保留字前面加css 
        oDiv.style.cssFloat = '';
    
    查看CSS可设置属性集合
    
      console.log(oDiv.style); // 不可以获取CSS样式表内属性。
      console.log(window.getComputedStyle(oDiv, null));
    
    window.getComputedStyle() 
      
      查看计算样式、IE8及以下不支持。
      可以获取CSS样式表内属性。 获取值不包含padding。
    
      IE8及以下：Element.currentStyle
    
      获取高度和宽度最好不要使用offsetWidth和offsetHeight，获取的值包含padding。
    
      console.log(window.getComputedStyle(oDiv, null).width);
      console.log(window.getComputedStyle(oDiv, null)['width]); 
    
      getComputedStyle(oDiv, null); 
    
        第二个参数，可以获取伪元素大小，属性是只读的，不可更改。
        window.getComputedStyle(oDiv, 'after')['width'] 
    
    * JS运动案例
    
    * 操作伪元素案例 - 类名方式操作
    
    * 下拉菜单案例

  ## 事件处理函数、冒泡捕获、阻止冒泡默认事件

    事件 -> 反馈
    
    通过某一事件而产生效果，这就叫绑定事件处理函数（程序）。
    
    事件是元素本身就有的特性，我们所说的绑定事件，是绑定事件的处理函数（事件的反馈）。
    
    事件 + 事件的反馈 = 前端交互（交互体验）
    
    交互是前端的核心价值。
    
    绑定事件处理函数，onclick叫做事件句柄。
    oDiv.onclick = function () { }
    
    事件源，事件作用在谁身上，谁就是事件源。
    
    非严格模式下，this指向window。
    
    如何绑定事件处理函数？
    
      1. Element.onclcik = function () {}
    
        兼容性好。但是一个元素的同一个事件只能绑定一个处理函数，第二个事件绑定会覆盖第一个。
        没有办法给同一个元素同一个事件绑定多个处理函数。
    
      2. 内联事件监听器（行内事件监听器）
    
        <button onclcick=""></button> 直接在元素上直接绑定事件处理函数。
    
        如果第一种和第二种同时绑定，第一种绑定的处理函数会覆盖第二种。也叫事件覆盖。
    
      3. Element.addEventListener(); 
    
        参数（事件类型，事件处理函数，false）
    
        W3C规范，IE9以下不兼容。
        同一个元素同一个事件可以绑定多个事件处理函数，都会执行。
        同一个元素同一个事件绑定多次同一个事件处理函数时，只会触发一次。
    
      4. IE8及以下 Element.attachEvent()
    
        参数（事件类型，事件处理函数）
    
        同一个元素同一个事件可以绑定多个事件处理函数，都会执行。
        同一个元素同一个事件绑定多次同一个事件处理函数时，会触发多次。
    
        Element.attachEvent('onclick', function () {
          绑定的事件处理函数this指向window。
        });
    
    * 添加事件处理函数方式兼容性封装
    
    如何解除事件处理函数？
    
      1. Element.onclick = null;
    
        oDiv.onclick = function () {
          this.onclick = null;
        }
    
      2. Element.removeEventListener(type, fn, false);
    
        函数引用，事件类型需要与绑定时一致。
    
        非严格模式下，可以利用arguments.callee来解除事件处理函数。
    
        oDiv.addEventListener('click', function () {
          this.removeEventListener('click', arguments.callee, false);
        }, false);
    
        严格模式下，可以声明函数，拿到函数引用来解除事件处理函数。
    
        oDiv.addEventListener('click', test, false)
    
        function test () {
          this.removeEventListener('click', test, false);        
        }
    
      3. Element.detachEvent(type, fn);
    
        函数引用，事件类型需要与绑定时一致。
    
        oDiv.detachEvent('onclick', test); 移除与removeEventListener一致
    
    事件处理程序的运行环境（this问题）
    
      事件句柄（onclick）的方式和添加监听器(addEventListener)的方式，事件处理函数的this都是指向元素本身。
      attachEvent绑定的事件处理函数的this指向window。可以使用bind、call、apply改变this指向。
    
    a标签嵌套问题
    
      内联元素嵌套内联元素渲染成DOM是两个互不关联内联元素。
      a标签不管是不是块级元素，渲染出来的都是两个互不关联的a标签。
    
      <a href="http://www.baidu.com">                   <a href="http://www.baidu.com"></a>
        百度 <a href="hhtp://www.taobao.com">淘宝</a> -> <a href="hhtp://www.taobao.com">淘宝</a>
      </a>
    
    事件捕获、事件冒泡
    
      <div class="wrapper">
        <div class="outer">
          <div class="inner"></div>
        </div>
      </div>
    
      事件冒泡
    
        从DOM结构来看，由最里层一层一层的把事件向外传递的现象，叫做冒泡现象。
    
        同时添加click的事件处理函数，点击子元素时，父级元素的事件处理函数也会触发，这是一种冒泡现象。                                                     
        事件向父级冒泡，然后触发冒泡相对应的事件处理函数。
    
      事件捕获
    
        从DOM结构来看，由最外层向最里层把事件向内传递的现象，叫做捕获现象。
    
        总体来说，自嵌套关系最顶层的父级元素开始捕获事件，直到事件源的子元素，事件捕获完成。
    
        可以设置addEventListener的第三个参数为true，就是事件捕获，值为false，就是事件冒泡。


      事件捕获是先执行的，事件冒泡是后执行的。事件捕获作用到事件源上时，不存在捕获现象，正常执行函数。
    
        outer.addEventListener('click', function () {
          console.log('bubble outer');
        }, false);
    
        outer.addEventListener('click', function () {
          console.log('outer');
        }, true);
    
        打印：bubble outer、outer


      focus、blur、change、submit、reset、select 没有冒泡和捕获现象。
      IE浏览器没有事件捕获现象，老版本除chrome之外，没有事件捕获。
    
      事件捕获与webkit内核有关。
    
    阻止冒泡事件
    
      冒泡常常带来许多问题，所以需要取消冒泡默认事件。
    
      event 存在于函数的参数中，IE8存在window，window.event. 
      var e = ev || window.event;
    
      W3C规范：e.stopPropagation();
      IE：e.cancelBubble = true;
    
    阻止默认事件
    
      可以用来阻止a标签、form表单默认行为。
    
      1. return false
      
        兼容性较好、只能在用句柄的方式中使用，对于addEventListener添加的事件无效。
    
        document.oncontextmenu = function () {
          return false;
        }
    
      2. W3C规范：e.preventDefault()
    
        IE9及以下不兼容。
    
        document.oncontextmenu = function (ev) {
          var e = ev || window.event;
          e.preventDefault();
        }
    
      3. IE9以下：e.returnValue = false;
    
        document.oncontextmenu = function (ev) {
          var e = ev || window.event;
          e.returnValue = false;
        }
    
    阻止a标签默认事件
    
      1. <a href="javascript:void(0)">点击<a> => void(0) = return 0;
      2. <a href="javascript:;">点击<a>
      3. <a href="#">点击<a> （#可以当作锚点使用）
      4. a.onclick = function (e) {
          e.preventDefault();
        }

  ## 冒泡捕获流、事件与事件源对象、事件委托

    事件流：描述从页面中接收事件的顺序（与冒泡、捕获相关）
    
    微软IE提出事件冒泡流（Event Bubbling）
    
    Netscape（网景）提出事件捕获流（Event Captureing）
    
    事件流分为3个阶段：
    
      事件捕获阶段
      处于目标阶段  事件源所绑定的事件处理函数触发时
      事件冒泡阶段
    
    DOM事件级别
    
      DOM级别是对事件类型的定义，是不同时期的DOM事件规范。
    
      DOM0级 
    
        定义on之类的事件模型（onmouseover、onmouseout），以句柄的方式绑定事件处理函数。
    
        onclick为例，支持两种写法。
          1. 元素属性 onclick=""
          2. Element.onclick = function () {}
    
     DOM1级 
    
        没有定义事件模型。
    
     DOM2级
    
        定义addEventListener()、removeEventListener()，使用3个参数，成为W3C规范。
    
        IE9以下，没有遵守规范，必须用attachEvent、detachEvent。
    
     DOM3级
    
        对于DOM2级的扩展，增加更多的事件类型（load、scroll、keydown、keyup等）
        允许用户自定义事件。
    
    事件与事件源对象
    
      一旦对某个元素进行某一事件的触发，那么浏览器就会把这个事件触发以后的详细信
      息包装成一个对象（e、ev、event），传递到事件处理函数的参数中去。
    
      IE不是传到事件处理函数的参数中，是传到window.event中。
    
      target、srcElement就是事件源对象。
    
        FF（火狐）只有target属性
        IE只有srcElement属性
        chrome两个属性都有
    
      btn.onclick = function (ev) {
        var e = ev || window.event,
            tar = e.target || e.srcElement;
        console.log(e);
      }
    
    事件委托/事件代理
    
      把事件委托给父级，事件被触发后会冒泡到父级，就算点击子级元素，
      在父级元素上也能得到被点击的事件源对象，进行处理。
    
      好处：
    
        1. 减少多次绑定事件处理函数，对性能优化较好。
        2. 对于动态增加的元素，可以获取到事件源。
        3. 可以动态获取子元素下标
    
        oList.onclick = function (ev) {
          var e = ev || window.event,
              tar = e.target || e.srcElement,
              tagName = tar.tagName.toLowerCase(),
              idx = [].indexOf.call(oLi, tar);
    
          if (tagName === 'li') {
            console.log(tar, tar.innerText, tagName, idx);
          }
        }
    
      * ul事件代理案例

  ## 鼠标行为坐标系、pageXY封装、拖拽函数封装

    鼠标行为 -> 坐标系
    
    事件对象用来保存事件触发时一系列的信息。
    
    事件源对象上的属性
    
      clientX/Y 鼠标位置相对于当前页面可视区域的坐标（不包括滚动条的距离）
      x/y       同clientX/Y，FF不支持该属性（旧版本），不建议使用
      pageX/Y   鼠标位置相对于当前文档（document）的坐标（包括滚动条的距离）
                IE9以下不支持（现在W3C标准归到jQuery标准下），不建议使用
      layerX/Y  同pageX/Y，IE11以下同clientX/Y，不建议使用
      screenX/Y 鼠标位置相对于浏览器屏幕边缘的坐标
      offsetX/Y 鼠标位置相对于块级元素的坐标（包含边框，safari不包括），不建议使用
    
    元素坐标：clientX/Y + 滚动条距离？
    
      margin存在8像素问题、IE6 有些版本存在16像素。
      
      元素坐标应该等于clientX/Y加上滚动条距离，再减去文档偏移距离。
    
      * 获取鼠标位置（pagePos）函数封装
    
    推拽行为
    
      mousedown 鼠标按下的事件
      mouseup 鼠标抬起的事件
      mousemove 鼠标移动的事件
    
      * 拖拽函数封装

  ## 鼠标事件深入、点击与拖拽分离、双击事件

    mousedown + mouseup = click
    
    鼠标左中右有对应值
    
      event：e.button 0 左、1 中、2 右
    
      使用mousedown可以触发事件查看该属性。
    
      IE10以上存在此属性，IE9、IE8、IE7、IE6、不同版本记录的值是不同的。
    
    使用mousedown和mouseup模拟单击或双击事件，使用mousemove实时计算元素位置，并做相应移动。

  ## 解决事件代理和鼠标移动事件的窘态

    mouseover、mouseout 鼠标的划入划出（移入移出）
    
      使用mouseover和mouseout实现和hover一样的效果，移入改变颜色可以使用mouseover。
    
      mouseover和mouseout存在冒泡行为，会影响父级元素，可以取消冒泡事件。
    
      划入划出的事件处理函数对自己绑定的元素及每一个子元素都生效，可以被其子元素多次触发。
    
    mouseenter、mouseleave
    
      mouseenter、mouseleave 最早是IE提出的，后来各大W3C浏览器都支持，兼容性较好。
    
      mouseenter和mouseleave存在类似冒泡的行为，但不是冒泡事件，不可以被取消。
    
      划入划出的事件处理函数只对自己绑定的元素负责，不对其子元素生效，不会被其子元素频繁触发。
    
    一般来说，复杂的程序，用mouseenter、mouseleave较多，可控性比较强。DOM结构比较简单，
    列表项之类，可以使用mouseover、mouseout。
    
    * list划入划出案例（手风琴效果）
    
      使用mousemove及事件代理实现滑动效果，性能比较好。
      mouseenter只对绑定的元素有效，使用方式只能循环绑定多次，性能较差。
      mouserover对自己子元素也会生效，可以实现滑动效果，性能相对mousemove较差。