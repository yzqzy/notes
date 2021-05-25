# CSS3

## 一、CSS进化历史、结构伪类选择器 - 选择器模块

CSS：指定文档该如何呈现给用户的一门语言。

html、css 不属于编程语言的范畴。CSS也具有函数，如rgba()。

文档指信息的集合，用标记语言作为结构，用CSS来进行呈现，呈现的就是文档。

### 1. 用户代理（UA）

文档呈现给用户的程序，叫做用户代理。

浏览器就是用户代理的其中之一，chrome、firefox用视觉呈现。
语音浏览器也可以叫做用户代理的一种，也起到将文档呈现给用户的作用。

### 2. CSS的数据类型

```js
<image>
<number>
<string>
<url>
<angle>
```

例如\<angle\>：

​	<angle\>数据类型由<number>和下列单位组成。数字与单位之间没有空格，数字为0时，单位可以省略。

​	单位：deg（°）、grad（百分度）、rad（弧度）、trun（圆数）

```css
E {
  boader: 1px solid #000;
}
```

@keyframes 定义动画
@media 媒体查询

CSS3不仅仅是定义样式这么简单。

CSS3：css2、css2.1的升级版本。3指版本号。在原有css2.1的基础上，增加了很多功能。

所有的主流浏览器对CSS3的兼容性非常好。包括IE10也全面支持CSS3。

手机端的浏览器基本全部使用响应式布局（手机浏览器全面支持CSS3）。

### 3. CSS3历史

1. 1990 HTML Tim Berners-Lee，图灵奖第一人，真正达到互联网分享资讯的第一人。
   HTML作为结构化的标记语言，描述文档的内容。

2. 1993 第一款显示图片的浏览器、Mosaic（马赛克）。
   随着用户要求提高，原本仅仅用来呈现结构部分的HTML，为了让页面更加酷炫，
   让文档和当时的需求有机的结合，出现很多混乱的结果。

```css
<font></font>
```

​	最初 ```css </font> ``` 可以省略，可以这样使用 ```css <font size="+3" color="red"> ```，出现各种离谱的写法。
​	随着页面代码不断增加，结构性非常差，代码冗余，对搜索引擎非常不友好。这就是CSS诞生的背景。

​	任何的技术都是为了解决人们的需求而诞生的。
​	css诞生是为了让结构更加明确，让页面外观有更好的呈现效果。

​	css3是css2、css2.1的升级版本。是由CSS Working Group进行策划的。

3. 2010

   由Adobe system、Apple、google、IBM、Mollia、Microsoft、Opera、
   Sun（甲骨文）、HP等组织的 CSS working Group。

   CSS3并没有出现标准规范，不同的浏览器中，有不同的实现方式，

   -moz-、-ms-、-o-、-webkit-

4. 1990 第一款浏览器诞生。

5. 1993 图形化文本展示，3年发展，导致市场非常混乱不堪。

6. 1996.12 CSS1.0 正式推出，解决样式混乱的问题。

7. 1998.05 CSS2.0 出现层叠样式。

8. 2004.02 CSS2.1 把一些不必要的，不被浏览器兼容的属性移除。

9. 2010  推出CSS3.0版本。

### 4. CSS3模块

CSS整体的结构划分为小的模块。

CSS3被拆分成模块：

​	选择器、盒模型、背景和边框、文字特效、2D/3D转换、动画、多列布局、用户界面等

### 5. 属性选择器

* 传统的属性选择器

  ```css
  E[attr = ""]  
  ```

* 匹配以提供的值开头

  ```css
  E[attr ^= ""]
  ```
  
* 匹配以提供的值结尾

  ```css
  E[attr $= ""]
  ```

* 匹配包含的字符串

  ```css
  E[attr *= ""]
  ```

  ```html
  <input type="text" textIndex="normal" /> username
  ```
  ```css
  input[textInex*="nor"] { }
  ```

  属性可以是自定义属性。

* 以单词（空格）作为选择元素

  ```css
  E[attr ~= ""]
  ```

  以空格区分的元素都可以识别。
  
  ```html
  <input type="text" textIndex="normal first" /> username
  <input type="passworld" textIndex="normal second" /> password
  ```
  ```css
  input[type~="first"] { }
  ```

  ```html
  <input type="text" textIndex="normal irst" /> username
  <input type="passworld" textIndex="normal second" /> password
  ```
  ```css
  input[type~="irst"] { }
  ```

* 匹配以提供的值(value)为开头，或以提供的值(value-)

  ```css
  E[attr |= ""]
  ```

  ```css
  input[textIndent |= 'normal'] { }
  ```

  使用场景：

    ```html
  <p lang="en-us" />
    ```

    ```css
  p[lang |= 'en'] {}
    ```

    一般这种匹配语言简写代码场景都使用这种选择器。

### 6. 结构伪类选择器

* :root 相当于HTML根节点

  html {} => :root {}、可以使用这种方式匹配HTML节点。

  :root的权重（优先级）更高。

* E:not 寻找不是指定匹配规则的元素

  ```html
  input:not ([textInent$="first"]) { }
  ```

  ```css
  <!-- 永远都不会被应用 -->
  input:not (*) { }
  ```

  :not的权重根据参数来计算的。本身的优先级是根据属性的优先级来判断的。

  ```css
  <!-- 不是table下的a，无法排除父级元素，只应用在table同级元素 -->
  :not (table) a { }
  ```

* E:empty 选择子元素的元素节点或文本节点为空

  ```css
  .box:empty { }
  ```

  HTML在解析换行和空格时，都会解析成文本。

  ```css
  div {
      width: 100px;
      height: 100px;
      border: 1px solid #000;
  }

  .box:empty {
      border: 1px solid orange;
  }
  ```

  ```html
  <div class="box"><!-- 有注释的空元素 --></div>
  <div class="box">这是空的元素</div>
  <div class="box">
      <!-- 有换行的空元素 -->
  </div>
  ```

  只有第一个盒子可以被选中，生效。

* :target 选择a标签的锚点

  ```css
  :target {
    background-color: black;
  }
  ```

  ```html
  <h4 id="one">这是h4标签</h4>
  <p id="two">这是p标签</p>
  <div id="three">这是div标签</div>
  <a id="four" href="/">这是a标签</a>
  <em id="five">这是em标签</em>
  
  <a href="#one">First</a>
  <a href="#two">Second</a>
  <a href="#three">Third</a>
  <a href="#four">Fouth</a>
  <a href="#five">Fifth/a>
  ```

  用户选择到指定的元素之后，指定的target就会生效。

  

* :first-child、:last-child、:nth-child、 :nth-last-child

  - :first-child：选择第一个元素
  - :last-child：选择最后一个元素
  - :nth-child：选择指定下标的元素（下标从1开始）
  - :nth-last-child：倒数选择指定下标的元素（下标从1开始）

    odd 奇数、even 偶数

    2n 偶数、2n + 1 奇数（参数是 αn + β 的形式，α 表示指定循环的个数，β 指定具体出现的位置）。
  
```css
  p:nth-child(4n + 1) { }
```

会寻找相邻的兄弟元素的匹配项，不会查看类型，嵌套的符合条件也会被选择。

* :first-of-type、last-of-type、nth-of-type、

  可以指定类型，会限制元素出现的类型。
  不指定类型时，会选择多个符合条件的元素，嵌套的符合条件也会被选择。

  ```css
  div span:first-of-type { }
  ```

* only-child

  寻找某一个父级下唯一的子元素。

  ```html 
  <div class="box">
      <div>
          <i>只有一个子元素</i>
      </div>
      <div>
          <i>我是i标签</i>
          <em>我是em标签</em>
          <span>
              我有一个<span>嵌套span</span>标签
          </span>
      </div>
  </div>
  ```

  ```css
  .box :only-child {
      color: red;
  }
  ```

## 二、元素状态伪类、伪元素、关系选择器 - 选择器模块

### 1. 样式失效问题

```html
<div>
    <a href="">这是div的a标签</a>
</div>
<table>
    <a href="">这是table中的a标签</a>
</table>
```

```css
:not(table) a {
    color: red;
}
```

使用以上选择器会失效，所有a标签颜色都为红色。

解决方案：给定范围后，可以正常显示。

```css
/* 第一种解决方案 */
body :not(table) a {x
  color: red;
}
```

```css
/* 第二种解决方案 */
div:not(table) a {
  color: red;
}
```

### 2. UI元素状态伪类选择器

​	当元素处于某种状态下，才会生效的。

* :hover 鼠标移入的状态

* :focus 鼠标聚焦时的状态（input）

* :active 元素被激活的状态（鼠标按下未松开）

* :enabled、:disabled、:read-only、:read-write

  元素能够被激活的元素才有这个状态。

  :enabled 表单可用的状态
  :disabled 表单禁用用的状态
  :read-only 表单只读的状态
  :read-write 表单可读写

  - input

    只读属性：readonly
    禁用属性：disabled

    只读属性和禁用属性都是不可输入，两者作为表单元素唯一的区别在于，
    readonly的数据是可以被提交的，disabled的数据不会被提交。

  - disabled、enabled

    ```html
    <input type="text" disabled /> username
    <input type="password" /> password
    ```

    ```css
    input[type = "text"]:disabled {
      background-color: orange;
    }
    input[type = "password"]:enabled {
      background-color: red;
    }
    ```

  - readonly、read-write

    ```html
    <input type="text" readonly /> username
    <input type="password" /> password
    ```

    ```css
    input[type = "text"]:read-only {
      background-color: orange;
    }
    input[type = "password"]:read-write {
      background-color: red;
    }
    ```

    disabled依然是可读可写的状态，禁用不代表元素不可写。两者并不任何关系。

* :checked :default :indeterminate 

  :checked 被选中状态
  :default 默认状态（默认选项），默认被选中
  :indeterminate 页面打开时，没有被选中的状态，不确定的状态。

  :checked，表单中仅限于单选框和复选框中被选中的状态，自定义radio的时候，可以使用这个状态。

  - :checked :default

    ```html
    <input type="radio" />
    <input type="checkbox" />
    <input type="checkbox" />
    ```

    ```css
    input[type = "radio"]:checked {
      outline: 2px solid #000;
    }
    input[type = "checkbox"]:checked {
      outline: 2px solid #000;
    }
    input[type = "checkbox"] {
      outline: 2px solid orange;
    }
    ```

  - :defualt指页面打开时，处于选中状态的单选框和复选框的样式。

    ```html
    <input type="radio" checked />

    <input type="checkbox" id="read" checked />
    <label for="read">阅读</label>
    <input type="checkbox" id="tourist" />
    <label for="tourist">旅游</label>
    <input type="checkbox" id="playing" />
    <label for="playing">打球</label>
    ```

    ```css
    input[type = "radio"]:default {
      outline: 2px solid orange;
    }
    input[type = "checkbox"]:checked {
      outline: 2px solid #000;
    }
    input[type = "checkbox"]:default {
      outline: 2px solid orange;
    }
    ```

    单选框的默认选中状态，:default状态存在兼容性问题，IE没有实现:default属性。
    
  - :indeterminate
  
    ```css
    :indeterminate, :indeterminate + label {
        background-color: blue;
    }
    ```
  
* radio 
  
  ```html
  <div>
      <input type="radio" id="checkbox" />
      <label for="checkbox">这是input1</label>
  </div>
  
  <div>
      <input type="radio" id="radio" checked />
      <label for="radio">这是input1</label>
  </div>
  ```

  效果不理想，点击时背景颜色并不会消失。存在兼容性问题。
  
* checkbox 需要配合JS使用。
  
  ```html
  <div>
    <input type="checkbox" id="checkbox" />
    <label for="checkbox">这是input1</label>
  </div>

  <div>
    <input type="checkbox" id="radio" />
    <label for="radio">这是input1</label>
  </div>
  ```

  ```js
  <script type="text/javascript">
    var inputs = document.getElementsByTagName('input');
    Array.from(inputs).forEach(item => (item.indeterminate = true));
  </script>
  ```

### 3. 伪元素选择器 

* ::before ::after
* ::first-letter ::first-line ::selection
* ::first-letter 选择第一个字母（字）
* ::first-line 选择第一行的字
* ::selection 文本被选中时的状态
* ::first-letter, ::first-line, 在块级元素中才会生效，也不支持荷兰文字。
  
  并不是所有的样式都可以指定，比如background-color属性等，会被忽略掉。
      	
  
  ```css
  .box {
    width: 200px;
    height: 200px;
    border: 1px solid #000;
  }
  
  .box p::first-line {
    color: orange;
  }
  .box p::first-letter {
    color: red;
  }
  .box p::selection {
    color: aquamarine;
  }
  ```
  
	```html
	<div class="box">
    <p class="text">
      测试测试测试测试测试测试测试测试
      测试测试测试测试测试测试测试测试
    </p>
	</div>
	```


  文本不可选中：user-select: none; 
  测试使用，生产环境不要使用，需要使用JS来限制。

### 4.  关系选择器

* E F 后代选择器 
* E > F  直接子元素选择器，选择自己的下一代。   

  ```css  
  div span {
    background-color: orange;
  }
  div > span {
    background-color: blue;
  }
  ```

  ```html
  <div>
    <span>
      这是span1
      <span>这是span2</span>
    </span>
  </div>
  ```
  
* E + F 相邻兄弟选择器
  
  只能寻找相邻的兄弟元素，不包括本身。

  ```css
  .text1 + p {
    background-color: orange;
  }
  ```
  
  ```html
  <p class="text1">这是第1个p元素</p>
  <p class="text2">这是第2个p元素</p>
  <p class="text3">这是第3个p元素</p>
  <p class="text4">这是第4个p元素</p>
  <p class="text5">这是第5个p元素</p>
  ```
  
* E ~ F 一般兄弟选择器
  
  寻找多个兄弟元素，往下寻找。包括嵌套的p元素。
  
  ```css
  .text1 ~ p {
    background-color: orange;
  }
  ```

  ```html
  <p class="text1">这是第1个p元素</p>
  <p class="text2">这是第2个p元素</p>
  <p class="text3">
    这是第3个p元素
    <p>这是里面的p元素</p>
  </p>
  <p class="text4">
    这是第4个p元素
    <p>这是里面的p元素</p>
  </p>
  <p class="text5">这是第5个p元素</p>
  ```

## 三、背景、边框图片 - 背景与边框模块

### 1. 案例：自定义radio

```html        
<div class="radio-wrapper clearfix">
  <div class="radio-box">
    <input type="radio" name="sex" id="male" checked />
    <label for="male">
      <span class="fa fa-mars"></span>
    </label>
  </div>
  <div class="radio-box">
    <input type="radio" name="sex" id="female" >
    <label for="female">
      <span class="fa fa-venus"></span>
    </label>
  </div>
</div>
```

```css        
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}

.radio-wrapper {
  width: 300rpx;
}

.radio-box {
  float: left;
  position: relative;
  width: 80px;
  height: 80px;
  margin-left: 15px;
}

.radio-box input[type = "radio"] {
  visibility: hidden;
}

.radio-box input[type = "radio"]:checked + label {
  background-color: burlywood;
}

.radio-box label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border-radius: 50%;
  text-align: center;
  line-height: 90px;
}

.radio-box span {
  font-size: 40px;
  color: #fff;
}
```

### 2. 背景图片 background

  * background-image 

    引号加与不加都可以。

    ```css
    background-image: url(图片地址);
    background-image: url('图片地址');
    ```

  * background-position 

    （居于元素定点位置进行定位）百分比，像素值均可。

    ```css
    repeat: no-repeat;
    background-position: 0 0;
    ```

  * background-size

    百分比、像素值、contain、conver、
    contain：填充，默认取短边，可能不会显示出来。
    conver：覆盖

    ```css
    background-size: 200px 200px;
    ```
  
  * background-attachent

    此时的背景图片相对于谁定位。
  
    fixed: 固定图片，不滚动  相对于视口（包括border和padding）
    scroll：图片可以滚动 相对于当前元素本身（不包含border）
    local: 图片可以滚动 相对于内容区域（不包含border和padding）
    fixed时，使用background-position属性无效。

    ```css
    background-attachent
    ```

  * background-origin

    规定当前原点位置。
  
    border-box：以边框的位置作为起点
    padding-box 以padding的位置作为起点
    content-box： 以内容的位置作为起点
    background-attachent为fixed时，该属性不生效。

    ```css
    background-origin
    ```
  
  * background-clip
   
    将背景图片进行裁剪。
  
    border-box：只保留边框内部的内容区域的内容
    padding-box 只保留padding内部内容区域的内容
    content-box： 只保留内容区域的内容

简写形式

  ```css
  background: url repeat attachment postion/size;
  background: url(img/1.png) no-repeat scroll 0 0/100% 100%;
  background: url(img/1.png) no-repeat scroll 0 0;
  
  background: url repeat attachment postion/size origin clip;
  background: url(img/1.png) no-repeat scroll 0 0 border-box content-box;
  ```

mozilla的书写顺序

  ```css
  background：url postion/size attachment origin clip;
  background：url 0 0/ contain fixed border-box content-box;
  ```

当手册与公司写法出现冲突时

  background-origin  background-clip的书写顺序是一定的；
  background-postion/ background-size的书写顺序也是一定的；
  只要保证这两组分别是一起的，属性都会生效。

### 3. 边框图片 border-image

  * border-image: url(img/1.png) 70 repeat;
  
  * border-image-source
  
    决定当前边框图片引用的资源。

    ```css
    border-image-source: url(img/1.png);
    ```
  
  * border-image-slice
  
    决定边框图片切割的位置。

    ```css
    border-image-slice: 70 70 70 70; 上右下左
    border-image-slice: 70 70; 上下 左右
    border-image-slice: 70; 上右下左
    ```
  
    默认单位是像素（px），不需要在加单位。

    ```css
    border-image-slice: 10% 20% 30% 40%; 上右下左
    ```
  
  * border-image-repeat
  
    当前图片的显示方式。
  
    stretch：图片拉伸，图片不会被切割
    repeat：4个角的图片进行平铺，不是整数倍时，图片会被切割
    round：4个角的图片进行平铺，不会进行切割
  
  * border-image-width
  
    定义边框的宽度，可以使用此属性重新定义border-width。
  
  * border-image-outset
  
    图片向外扩充的距离。

简写形式

  ```css
  border-image: url border-image-slice border-image-repeat;
  border-image: url(img/1.png) 70 repeat;
  border-image: url slice / width / outset  border-image-repeat;
  border-image: url(img/1.png) 70 / 70px / 20px repeat;
  ```

  order-image会把border的属性全部都替换掉。

注意事项

  ```css
  border-image: url(img/1.png);
  ```

  使用border-image至少指定一个地址，地址是必选项，别的都是可选项。
  只有一个图片时，盒子的四个角都有完整的图片显示。
  如果slice切割超过图片大小，中间轮空，盒子的四个角都会显示图片。

## 四、盒子阴影、边框圆角 - 背景与边框模块

### 1. border-radius

#### 1.1 圆角

border-radius: 50%; 圆角

```html  
<div class="box"></div>
```

```css
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  border-radius: 50%;
}


.box {
  width: 200px;
  height: 200px;
  border: 20px solid #000;
  box-sizing: border-box;
  border-top: 20px solid yellow;
  border-right: 20px solid red;
  border-bottom-color: blue;

  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
```

50% 代表百分比。

当盒子为200px时，指定的像素就是100px。

```css
.box {
  width: 200px;
  height: 200px;
  border: 20px solid #000;
  box-sizing: border-box;
  border-top: 20px solid yellow;
  border-right: 20px solid red;
  border-bottom-color: blue;

  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
}
```

100px 指代当前定宽度和高度指定的值，可以写作 100px 100px。

```css
.box {
  width: 200px;
  height: 200px;
  border: 20px solid #000;
  box-sizing: border-box;
  border-top: 20px solid yellow;
  border-right: 20px solid red;
  border-bottom-color: blue;

  border-top-left-radius: 100px 100px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 100px;
}
```

使用百分比也是确认具体的像素。

#### 1.2 实现椭圆

```css
.box {
  width: 400px;
  height: 200px;
  border: 20px solid #000;
  box-sizing: border-box;
  border-top: 20px solid yellow;
  border-right: 20px solid red;
  border-bottom-color: blue;

  border-top-left-radius: 200px 100px;
  border-top-right-radius: 200px 100px;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50%;
}
```

```html
<div class="wrap">
  <div class="box"></div>
</div>
```

#### 1.3 不同写法

```css
.wrap {
  width: 300px;
  height: 100px;
  border: 1px solid #000;
}

.box {
  width: 300px;
  height: 100px;
  border-radius: 30px;
  background-color: orange;
}
```

4个边高度和宽度都是30px。

```css
border-radius: 30px; 

border-radius: 30px 30px;

border-radius: 30px 30px 30px;

border-radius: 30px 30px 30px 30px;

border-radius: 30px 30px 30px 30px / 30px 30px 30px 30px;

border-radius: 30px 30px 30px 30px / 30px 30px 30px;

border-radius: 30px 30px 30px 30px / 30px 30px;

border-radius: 30px 30px 30px 30px / 30px;
```

##### 1.3.1 百分比写法

长宽都是33.33%的百分比。

```css
/* 第一种写法 */
border-radius: 33.33%;
border-radius: 33.33% 33.33%; 

/* 第二种写法 */
border-top-left-radius: 100px 33.33px;
border-top-right-radius: 100px 33.33px;
border-bottom-right-radius: 100px 33.33px;
border-bottom-left-radius: 100px 33.33px;
```

##### 1.3.2 一般写法

```css
/* 第一种写法 */
border-radius: 100px 50px; 

/* 第二种写法 */
border-top-left-radius: 100px 100px;
border-top-right-radius: 50px 50px;
border-bottom-right-radius: 100px 100px;
border-bottom-left-radius: 50px 50px;
```

border-radius 一个值时，每一个宽高比都是 30% 30%.
二个值时，左上角为第一个值，右上代表第二个值，
右下为第一个值，左下为第二个值。对应关系是 1 2 1 2。

```css
/* 第一种写法 */
border-radius: 100px 50px 100px; 

/* 第二种写法 */
border-top-left-radius: 100px 100px;
border-top-right-radius: 50px 50px;
border-bottom-right-radius: 100px 100px;
border-bottom-left-radius: 50px 50px;
```

三个值时，效果和两个值一致。1 2 1（存在3） 2

##### 1.3.3 “/” 的写法

```css
/* 第一种写法 */
border-radius: 100px / 50px; 

/* 第二种写法 */
border-top-left-radius: 100px 50px;
border-top-right-radius: 100px 50px;
border-bottom-right-radius: 100px 50px;
border-bottom-left-radius: 100px 50px;
```

'/' 的方式代表一个角的宽高比。

```css
/* 第一种写法 */
border-radius: 100px 50px / 50px 30px; 

/* 第二种写法 */
border-top-left-radius: 100px 50px;
border-top-right-radius: 50px 30px;
border-bottom-right-radius: 100px 50px;
border-bottom-left-radius: 50px 30px;
```

```css
/* 第一种写法 */
border-radius: 100px 50px 80px/ 50px 30px; 

/* 第二种写法 */
border-top-left-radius: 100px 50px;
border-top-right-radius: 50px 30px;
border-bottom-right-radius: 80px 50px;
border-bottom-left-radius: 50px 30px;
```

```css
/* 第一种写法 */
border-radius: 100px 50px 80px/ 50px 100px; 

/* 第二种写法 */
border-top-left-radius: 100px 50px;
border-top-right-radius: 50px 100px;
border-bottom-right-radius: 80px 50px;
border-bottom-left-radius: 50px 100px;
```

00 + 50 > 100，高度超出盒子的最大值，图像变形。
一旦超出盒子的大小，图片就会变形。

```css
/* 第一种写法 */
border-radius: 10% 30% 50% 70%; 

/* 第二种写法 */
border-top-left-radius: 10%;
border-top-right-radius: 30%;
border-bottom-right-radius: 50%;
border-bottom-left-radius: 70%;
```

百分比代表每一个角的角度。
图片变形 50% + 70% = 120% > 100% 

```css
/* 第一种写法 */
border-radius: 10% 30% 50%; 

/* 第二种写法 */
border-top-left-radius: 10%;
border-top-right-radius: 30%;
border-bottom-right-radius: 50%;
border-bottom-left-radius: 30%;
```

1212 的规则进行赋值。

```css
/* 第一种写法 */
border-radius: 10% 20% / 30% 50%;

/* 第二种写法 */
border-top-left-radius: 10% 30%;
border-top-right-radius: 20% 50%;
border-bottom-right-radius: 10% 30%;
border-bottom-left-radius: 20% 50%;
```
```css
/* 第一种写法 */
border-radius: 10% 20% 50% / 30% 50%;

/* 第二种写法 */
border-top-left-radius: 10% 30%;
border-top-right-radius: 20% 50%;
border-bottom-right-radius: 50% 30%;
border-bottom-left-radius: 20% 50%;
```

#### 1.4 实现半圆

```html
<div class="wrap">
  <div class="box"></div>
</div>
```

第一种实现方法

```css
.wrap {
  width: 200px;
  height: 100px;
}

.box {
  width: 200px;
  height: 100px;
  background-color: orange;
  border-top-left-radius: 100px 100px;
  border-top-right-radius: 100px 100px;
}
```

第二种实现方法

```css
border-radius: 100px 100px 0 0 / 100px 100px 0 0;
```

第三种实现方法

```css
border-radius: 100px 100px 0 0;
```

#### 1.5 实现叶子

```html
<div class="wrap">
  <div class="box"></div>
</div>
```

第一种实现方法

```css
.wrap {
  width: 300px;
  height: 100px;
  border: 1px solid #000;
}

.box {
  width: 300px;
  height: 100px;
  border-top-left-radius: 290px 93px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 290px 93px;
  border-top-right-radius: 2px;
  background-color: orange;
}
```

第二种实现方法

```css
border-radius: 97% 3% 98% 3%;
```

兼容性: [查看MDN官网](https://developer.mozilla.org/zh-CN/)

### 2. box-shadow

```html
<div class="box"></div>
```

```css
.box {
  width: 200px;
  height: 200px;
  background-color: orange;
} 
```

box-shadow: x-offset y-offset blur-radius spead-radius color inset;
​    

* x-offset：向右偏移
* y-offset：向下偏移
* blur-radius：模糊半径(物体清晰与否, 默认值为0）
* spead-radius：拓展半径（决定阴影的大小）
* color：阴影颜色
* inset：向内投影
​    
box-shadow: 10px 10px 10px 1px;
​    
盒子阴影和盒子同等大小。


可以同时为盒子设置多个阴影（多重阴影）。

```css
box-shadow: 4px 2px 1px 1px #f40,
            0px 0px 1px 1px #000,
            -4px -2px 6px blue inset;
```

box-shadow比较影响性能,尽量少用,多重阴影基本不使用.

## 五、word-wrap、white-space、word-break - 文字与颜色模块

### 1. text-shadow（文本阴影）

text-shadow: x-offset y-offset blur-radius color;
      
* x-offset：向右偏移
* y-offset：向下偏移
* blur-radius：模糊半径(物体清晰与否, 默认值为0）
* color：阴影颜色
  
```html
<p>这是测试</p>
```

```css
p {
  text-shadow: 2px 2px 3px red;
}

p {
  text-shadow: 20px 20px 3px red,
                30px 50px 3px blue;
}
```

### 2. word-wrap （文字折行）

原本是微软的私有属性，目前在CSS3草案中重新命名，等同于overflow-wrap。
overflow-wrap属性有的浏览器不兼容，所以还是以word-wrap为准。
     
word-wrap对于中英文处理方式是不同的。
    
CJK Chinese/Japanese/Korea  日语、韩语同中文的处理方式是一致的。
    
normal | break-word
    
#### 2.1 normal

* 英文

  解析单词时，如果长度过长，会超出文本范围。

  对于半角的空格，连字符（-）会默认换行。

  半角和全角

  - 半角：字节和英文单词是一致 1个字节
  - 全角：字节和汉字一致 2个字节

  对于多行文本来说，必须都手动换行，否则还是会超出文本范围。

* 中文

  只要汉字达到文本界限，都会默认换行。
  浏览器不会让标点符号位于文字行首。

  如果标点符号超出文本范围，然后文本会随标点符号一起作为行首。

  如何让标签符号位于行首？
  可以在标点符号前添加空格处理。
  
#### 2.2 break-word

* 英文

  对于超出部分的长单词，会进行截断处理，让单词被打断。

  如何让单词换行的同时，不打断单词？

    可以使用word-break属性。word-break: break-all。
  
* 中文
  
### 3. word-break 文本折行

normal | break-all | keep-all

#### 3.1 break-all

单词之间的断句，单词截断的一种处理方式。

#### 3.2 keep-all

把所有的单词都展示完全，超出也不处理。

word-wrap对文本会有另起一行的处理，word-break会强行进行文字打断，并另起一行。
    
### 4. white-space 

针对空格、换行等空白的处理。

normal | pre | nowrap | pre-wrap | pre-line
    
```html
<div class="box">
  saaaaaaaaaaaaaaasdsa


  adadasda


  asdsadasda
</div>
```

#### 4.1 normal

默认合并换行为一个空格，超出单词不处理。
默认会合并多个空格为一个空格。

换行和空格都直接合并成一个，文字超出不进行处理，如果存在空格，会进行换行。

#### 4.2 nowrap

换行合并，空格合并，文字不会折行，全部排列在一行。

强制性的将文本展示到一行内。

#### 4.3 pre

根据pre标签对文本的处理方式设计的pre。
将换行和空格全部保留，文本超出不会换行。

```html
<pre></pre> 
```

可以使用pre标签将换行和空格等全部保留下来。

```html
<pre>
  &lt;html&gt;
    &lt;head&gt;
    &lt;/head&gt;

    &lt;body&gt;
    &lt;/body&gt;
  &lt;/html&gt;
</pre>
```

#### 4.4 pre-line

保留换行，一行中空格合并。文本超出正常换行。

#### 4.5 pre-wrap

将换行和空格全部保留，文本超出会换行。

兼容性：
    
pre-line、pre-wrap 是css3新增的，IE7及IE7以下都不支持。

#### 4.6 单行文本溢出

```css
overflow: hidden;
white-space: nowrap; // 单行显示
text-overflow: ellipsis; // 溢出部分以小圆点显示
```

### 5. css语法

css语法是以属性和值构成的。 

```css  
.box {
  color: red;
}
```

color: red; => 属性和值的方式叫做css声明，声明是以分号隔开的。
      
所有的声明都在 {} 包裹之下。
{} => css声明块，以 {} 的形式被组合起来。

选择器放置在声明块的最前面，用来选择页面中的元素或多个元素。
选择器和声明块被称为规则的集合，简称CSS规则。

CSS规则可以定义很多的样式，不同的规则可能选择同一个元素。
不同的属性设置不同的样式，CSS3的样式的展示是由层叠样式表决定的。

层叠是一种算法，层叠算法，决定哪个优先级更高。
    
CSS规则 =>

  ```css
  .box {
    color: red;
  }
  ```

css语句包括两类：
    
  * css规则
  * at规则
    

css1 css2.1下只能够使用css规则。css3中新增at规则。
    
@ketframes at 规则
    
> at规则通过CSS样式在一些特殊的场景下会有特殊的用法。

at规则包括什么？
    
* @keyframes 定义动画
* @charset 定义样式表使用的字符集
* @import 引入外部样式表
* @namespace 配置xml使用，能够在xml取一个单独的命名空间
* @media 媒体查询
* @font-face 引入字体文件
* ...

at语法可以归结成一类，条件规则组。
    
条件规则组：  

```css
@keyframes {
  from { }
  to { }
}
```

@font-face
    
指定一个字体。

https://www.dafont.com

ttf、otf 字体格式

```css
@font-face {
  font-family: 'yueluoFont';
  src: url('../font/Mathline.otf'),
      url('../font/Mathline.otf')
      format('otf');
}

.box {
  font-family: 'yueluoFont';
}
```

因为浏览器对字体的支持情况不一致，使用多个字体时要用format指定字体后缀。

## 六、column多列布局、gradient - 文字与颜色模块

### 1. 补充部分：text-overflow
    
ellipsis | clip（默认值）

其他属性不常用，兼容性不好。
多列布局的相关属性最低版本的要求是IE10。

```html
<div class="box">
  ssssssssssssssssssssssssssssssss
  ssssssssssssssssssssssssssssssss
  ssssssssssssssssssssssssssssssss
</div>
```

```css
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
}
```

### 2. 多列布局 columns
    
多列布局不是布局方式，是文字的多列布局。是文字的一种排列方式。
    
columns: 宽度(column-width) 列数(column-count);
    
```html
<div class="box">
  <p>“我们要坚持人民至上、生命至上，统筹资源，团结合作，尽最大努力保护人民生命安全和身体健康，最大限度降低疫情负面影响。”</p>
　<p>新冠肺炎疫情发生以来，习近平主席始终坚持人民至上理念，在统筹做好本国疫情防控和经济社会发展工作的同时，频繁与多个国家领导人及国际组织负责人保持电话、书信、视频会议为主渠道的“云外交”沟通，处处体现着习近平主席以人民为中心的发展思想。</p>
</div>
```
      
#### 2.1 column

```css
.box {
  width: 600px;
  height: 400px;
  border: 1px solid #000;
  columns: 100px 3;
}

.box {
  column-width: 200;
  column-count: 2;
}
```

宽度和列数都是可选项。
宽度和列数可以只配置一项，两者是有冲突的。

默认字体是16px。多列布局中的距离也是16px。
可以控制文字大小来控制列与列之间的距离。

```css
.box {
  width: 600px;
  height: 400px;
  border: 1px solid #000;
  font-size: 0;
}

.box p {
  font-size: 16px;
}
```
    
通过更改默认字体大小的方式来修改默认制表符的大小，也就是列与列之间的宽度。
这种方式也存在问题，如果盒子中增加标题，字体为0.
可以通过修改column-gap属性，来修改制表符大小。

#### 2.2 column-gap
      
gap：间歇 缺口。

```css
column-gap：制表符宽度。
column-gap: 2px;
column-gap: 10%;
```

也可以使用百分比的方式，基于盒子的大小。
不过其兼容性不好，IE10不支持百分比的写法。
    
#### 2.3 column-rule 文本分割线

```css 
column-rule：1px solid #000;

column-rule-width: 1px;
column-rule-style: solid;
column-rule-color: #000;

column-rule-style：
```

solid（实线） | dotted（点状） |
dashed（虚线）| double（双实线）|
groove（凹槽）| ridge（脊背）|
insert（向里）| outset（向外）|
none | hidden |

```css
.box {
  width: 600px;
  height: 400px;
  border: 1px solid #000;
  columns: 100px 100;
  column-gap: 2px;
  column-rule: 1px dotted #000;
}
```
    
#### 2.4 column-span
    
none（默认值 元素横跨一列） | all（元素横跨所有列）
    
column-span: none | all;

```css                
.box h2 {
  column-span: all;
}
```

```css
column-span: all;
```

元素横跨所有列。
    
### 3. gradient、渐变
    
#### 3.1 颜色相关
    
```css
rgb：rgb(123, 123, 123)
rgba：rgba(123, 123, .5)
```

```css
hsl：hsl(120, 70%, 12%)
```
h hue 色调  -360-360
l light 亮度 光源强弱问题 0-100% 百分比
s saturation 饱和度 0-100% 百分比

值 > 360 时，值实际等于 => 值 % 360 

```css    
hsla: hsla(120, 70%, 12%, .5)
```
    
```css
background-color: rgba(255, 255, 255, .8);
background-color: hsl(120, 70%, 12%);
```
    
#### 3.2 渐变
    
渐变方式有两种，线性渐变和径向渐变。
    
渐变是一个image方式的值，本质上是一张图片。
    
* linear-gradient：线性渐变

  ```css
  background-image: ([derection], color, color);
  background-image: ([derection], color [percent], color [percent]);
  ```

* radial-gradient: 径向渐变

  ```css
  background-image: ([shape at position], color [percent], color [percent]);
  ```
          
渐变都兼容IE10，IE9及IE9以下都不兼容。以线性渐变为例。
    
```css
background-image: linear-gradient([derection], color, color));
background-image: -webkit-linear-gradient([derection], color, color));
background-image: -moz-linear-gradient([derection], color, color));
background-image: -o-linear-gradient([derection], color, color));
```

```html
<div class="box"></div>
```

```css
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  background-image: linear-gradient(red, green);
}
```
    
##### 3.2.1 线性渐变
    
```css
background-image: linear-gradient(red 0, green 100%);
background-image: linear-gradient(red 50, green 100%);
background-image: linear-gradient(red 0, yellow 50%, green 100%);

background-image: linear-gradient(to top, red 0, green 100%);
background-image: linear-gradient(to bottom, red 0, green 100%);
background-image: linear-gradient(to left, red 0, green 100%);
background-image: linear-gradient(to right, red 0, green 100%);

background-image: linear-gradient(to top right, red 0, green 100%);
background-image: linear-gradient(to top left, red 0, green 100%);
background-image: linear-gradient(to bottom left, red 0, green 100%);
background-image: linear-gradient(to bottom right, red 0, green 100%);
```
    
也可以根据角度设置方向。
    
```css
background-image: linear-gradient(45deg, red 0, green 100%);
background-image: linear-gradient(125deg, red 0, green 100%);
```

##### 3.2.2 径向渐变

```css
background-image: radial-gradient(circle, red, green);
background-image: radial-gradient(circle, red 0, green 100%);
```

position可以用像素、关键字或者百分比指定。

```css
background-image: radial-gradient(circle at 100px 100px, red 0, green 100%);
background-image: radial-gradient(circle at 100px, red 0, green 100%);
background-image: radial-gradient(circle at 100px center, red 0, green 100%);
background-image: radial-gradient(circle at center center, red 0, green 100%);
background-image: radial-gradient(circle at top center, red 0, green 100%);
background-image: radial-gradient(circle at 200px 0, red 0, green 100%);
background-image: radial-gradient(circle at 100% 0, red 0, green 100%);
background-image: radial-gradient(circle 100px at 100% 0, red 0, green 100%);
background-image: radial-gradient(circle 200px at 100% 0, red 0, green 100%);

background-image: radial-gradient(ellipse 100px 50px at center, red 0, green 100%);
background-image: radial-gradient(ellipse at center, red 0, green 100%);
background-image: radial-gradient(ellipse 200px 100px at center, red 0, green 100%);
```
    
案例
  
```css
background-image: radial-gradient(ellipse at center, red 10%, gold 30%, orange 50%, blue 100%);
```

## 七、repeating-linear/radial-grident - 文字与颜色模块

```html
<div class="box"></div>
```
    
### 1. repeating-linear-gradient
    
重复的线性渐变。
    
```css
background-image: repeating-linear-gradient(red, green 20%);

background-image: repeating-linear-gradient(to top, red, green 20%);
/* 实际上存在默认值，to bottom。 */
```

```css
background-image: repeating-linear-gradient(to bottom left, red, green 20%);
```

#### 1.1 斑马纹实现

```css
.box {
  width: 300px;
  height: 100px;
  border: 1px solid #000;
  background-image: repeating-linear-gradient(to bottom right, #000 0, #fff 10%);
}
```

```css
background-image: repeating-linear-gradient(to bottom left, red, green 10%, blue 10%);
/* 如果重复定义同一个百分比，需要定义结束位置。 */
```

```css
background-image: repeating-linear-gradient(to bottom left, red, yellow 10%,green 10%, blue 20%);
/* 百分比是可以被重写的，需要指定区段，0-10%是一段，10-20是一段。 */
```
    
### 2. repeating-radial-gradient
    
重复的径向渐变。
    
```css
background-image: repeating-radial-gradient(circle, red, green 50%);
background-image: repeating-radial-gradient(circle, red, green 10%);
background-image: repeating-radial-gradient(circle, red, green 10%, yellow 20%);
```

```css
background-image: repeating-radial-gradient(circle, red, green 10%, yellow 10%, blue 20%);
/* 区段划分。 */
```

```css
background-image: repeating-radial-gradient(circle 100px, red, green 10%, yellow 10%, blue 20%);
background-image: repeating-radial-gradient(circle 100px at 0 0, red, green 10%, yellow 10%, blue 20%);
```

```css
background-image: repeating-radial-gradient(ellipse 200px 100px at center, red, green 10%, yellow 10%, blue 20%);
```
    
* 案例 Button

## 八、hsl、opacity与rgba、overflow-x、resize - 盒模型与FLEX模块

查看兼容性的网站：https://caniuse.com/
提供渐变颜色的模板：http://lea.verou.me/css3patterns/
渐变生成的网站：http://www.colorzilla.com/gradient-editor/
    
### 1. hsl
      
hsl(hue, saturation, lightness)

* h hue 色调  -360-360 色相环
* s saturation 饱和度 0-100% 百分比
* l light 亮度 光源强弱问题 0-100% 百分比

```css
background-color: hsl(60, 50%, 50%);
```
    
* 0/360 - 红色（赤色）red
* 60 - 橙黄 yellow
* 120 - 绿色 green
* 180 - 青色 cyan
* 240 - 蓝色 blue
* 300 - 紫色（洋红）magenta
    
速记
    
1. 赤橙黄绿青蓝紫
2. young guys can be messy Rascals. 
    
### 2. opacity与rgba
    
为什么存在opacity，要使用rgba?
    
opacity会作用在整个元素上，从而使元素上的内容都起到透明的效果。
如果仅需要颜色有透明的效果，建议使用rgba。

### 3. 盒模型（css-box，CSS Basic Box Model）

对文章进行布局时，浏览器渲染引擎会将所有元素渲染成矩形盒子，这就是通常所说的盒子模型。

盒模型包括 content area、padding area、border area、margin area。
    
#### 3.1 盒模型存在层级关系
      
![盒模型](https://gitee.com/heora/review/blob/master/css3/images/css_div3.jpg)

#### 3.2 盒模型存在两种
      
W3C标准盒模型、IE6混杂模式的盒模型
    
* W3C标准盒模型：

  - 盒子所占空间宽度 = border area + padding area + content area
  - 盒子宽度 = content area
 
* IE盒模型：  

  - 盒子所占空间宽度 = border area + padding area + content area
  - 盒子宽度 = border area + padding area + content area
    
```css
box-sizing: border-box; // IE6盒模型
```

border-box  => E盒子模型的兼容性模式
padding内收、边框内收的方式 => border-box

![盒模型对比](https://gitee.com/heora/review/blob/master/css3/images/css-box.png)
    
#### 3.3 传统的布局方式，就是利用盒子模型来实现的
    
1. 不规则布局，
2. 两栏布局、三栏布局

利用margin、padding、position、box-sizing等属性实现布局。
    
### 4. overflow-x/overflow-y
    
visible | hidden | scroll | auto
    
```css
overflow: hidden; // 溢出隐藏
```

```css
overflow-x: scroll; // 水平方向溢出部分 滚动
```
    
定义scroll属性时，内容区域没有超出，也会存在滚动条。
overflow-x，overflow-x，只要定义其中一个值，另一个的值也发生变化，由visible变为auto。
    
overflow不是一个复合值，不可以这样定义 'overflow: scroll auto;'。
    
### 5. resize
    
both（默认值） | none | horizontal | vertical

* both 两边都可以拉伸
* none 不能拉伸
* horizontal 水平拉伸
* vertical 垂直拉伸

重新定义尺寸。
    
通常使用它的场景是 \<textarea\>\</textarea\> 。
    
```html
<textarea name="" id="" cols="30" rows="10"></textarea>
```

```css    
textarea {
  resize: none;
}
```

可以使用resize定义 textarea 不能被拉伸。


#### 5.1 div设置both默认不生效

```html        
<div class="text"></div>
```

```css
div.text {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  resize: both;
}
```

要想使div设置both生效，需要设置overflow属性。
    
```html
<div class="text"></div>
```

```css
div.text {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  resize: both;
  overflow: auto;
}
```

只有当overflow不等于默认值时，resize才会生效。
    
#### 5.2 resize的使用场景
    
* 块级元素
* table 单元格
* 内联块元素
    
前提，overflow不等于默认值。

## 九、传统布局缺陷、弹性盒子、 flexContainer - 盒模型与FLEX模块

    传统布局缺陷
    
      1. 等高问题，两栏布局、三栏布局实现比较复杂；
      2. 元素内容水平和垂直居中问题；
    
    弹性布局
    
      可以伸缩、变换的盒子，随着视口变化，内容展示方式也不同。
    
      兼容性：IE10、chrome21、opera12.1、firefox22支持 
    
      大多数浏览器不需要加兼容性前缀，兼容IE10需要添加-ms前缀，uc浏览器必须要加-webkit前缀。
    
      完整兼容性写法
    
        div {
          display: flex;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
        }
    
      flexbox - flexible box 弹性盒子布局、弹性盒模型
    
        可以让子元素之间提供强大的空间分布和对齐能力。
    
      flex布局是一维布局，只能处理一个维度。
    
      二维布局：CSS Grid Layout 网格布局
    
      flex布局由flex container（父级容器）和flex item（项目）构成。
    
      ![img](./images/flex.png)
    
      main axis 主轴  cross axis 交叉轴 
    
      主轴决定布局的方向。
    
      父容器（flex container）存在6个属性：
    
        1. flex-direction：
        
          row（默认值） | row-reverse | column | column-reverse
    
          决定主轴方向及flex item的排列方向。
    
        2. flex-wrap：
    
          nowrap（默认值）| wrap | wrap-reverse
    
          盒子超出是否换行展示。
    
        3. flex-flow：
    
          简写形式。 flex-flow: flex-direction | flex-wrap;
    
          flex-flow: row wrap;
          
        4. justify-content：
    
          flex-start（默认值）| flex-end | center
          space-between（两端对齐） | space-around（flex item两侧间距相等）
    
          决定主轴上的对齐方式。
    
        5. align-items：
    
          flex-start（默认值）| flex-end | center
          baseline（基准线）| stretch
    
          决定交叉轴（与主轴垂直的轴）的对齐方式。
    
          baseline
    
            基准线是基于项目中文本的线，基准线和文字位置和文字大小都有关系。
    
            ![baseline](./images/baseline.png)
    
          stretch
    
            没有设置高度时，自动撑满整个容器的高度。
    
            ![stretch](./images/stretch.png)
    
        6. align-content：
    
          flex-start | flex-end | center 
          space-between | space-around | stretch
    
          决定多根轴线的对齐方式。
    
          可以用于调整多根轴线之间的间距。
    
          stretch
    
            占满整个交叉轴区域，如果存在多根轴线，会平分交叉轴区域。
    
      子项目（flex item）属性
    
        1. flex-grow 放大的比例
        2. flex-shrink 缩小比例
        3. flex-basis 伸缩基准值
        4. flex flex-grow flex-shrink flex-basis 简写
        5. order 排列顺序
        6. align-self 单个项目的对齐方式
        
        order
    
          指定排列顺序。
    
          .blue {
            order: 3;
            background-color: blue;
          }
          .red {
            order: 1;
            background-color: red;
          }
          .orange {
            order: 2;
            background-color: orange;
          }
    
          ![order](./images/order.png)

  ## 十、弹性布局、flexItem的属性及用法 - 盒模型与FLEX模块

    flex布局在移动端应用较广。
    
    flex container 
    
      1. flex direction 2. flex wrap 3. flex flow
      4. justify-content 5. align-items 6. align-content
    
    flex item
    
      1. flex-grow 放大的比例
    
        0 （默认值）| number
    
        会查看所有子项目的flex-grow属性，再用剩余空间除以flex-grow（非默认值）的和。
        如果没有剩余空间，此属性就会失效。
    
        存在flex-basis定义时，使用它作为待计算子项的宽度。
    
        500 - 300 = 200 （剩余空间）
        200 / 2（flex-grow相加的值） = 100px
        100（盒子宽度） + 100 = 200px
    
        .orange {
          flex-grow: 1;
          background-color: orange;
        }
    
      2. flex-shrink 缩小比例
    
        1（默认值）| number
    
        只有空间不足时才会用到此属性。缩小比例为0时，不缩小盒子，会超出默认盒子范围。
    
        存在flex-basis定义时，使用它作为待计算子项的宽度。
      
        600（待收缩盒子应占宽度 6 * 100） - （500 - 300）200（剩余空间） = 400px（整体收缩的值）;
        400 / 6 = 66.67;
        100 - 66.67 = 33.33;      
    
      3. flex-basis 伸缩基准值
    
        分配剩余空间之前，项目占据主轴的空间的计算值。
    
        auto（默认值）- 对应元素宽度
    
        一般不指定此项，默认取元素的实际宽度。取值后，会覆盖原本宽度。
        定义放大（flex-grow）和伸缩（flex-shrink）时，都是根据伸缩基准值的大小。
    
      4. flex 简写
    
        auto（默认值） | none
    
        auto: 1 1 auto;
        none: 0 0 auto;
    
        flex: flex-grow flex-shrink flex-basis;
    
      5. order 排列顺序
    
        定义单个项目的排列顺序。
    
      6. align-self 单个项目的对齐方式
    
        flex-start（默认值）| flex-end | center
        baseline（基准线）| stretch | auto
    
        取值与align-items完全一致。多了一个默认值auto。
    
        如果父级盒子定义了align-items，可以使用此属性定义单独的样式。

  ## 十一、京东布局布局技巧、企业命名规范 - 盒模型与FLEX模块

    vertical-align: middle;
    
      使内联块（inline-block）后面的内联块居中。
    
    position: absolute;
    
      position定义absoulte之后，默认就变为inline-block。

  ## 十二、flex布局深入、grid布局探究 - 盒模型与FLEX模块

    css书写规则
    
      1. 代码不能出现没有类型的情况
      2. 能够复用的代码尽量提取出来 
    
    通常定义flex布局的时候，需要将所有的元素都定义为flex布局。
    
    浮动布局哪些属性会失效：
    
      1. 浮动相关的 float
    
      2. 清除浮动会失效
    
        定义了float属性的元素，存在于浮动层级，将元素变成inline-block。
        影响布局相关的不会生效，但是变成inline-block的特性还会存在。
    
        定义了flex布局，最好不要使用float，会产生歧义。
        建议使用 display: inline-box。
        
      3. column vertical-align失效
    
    grid布局
    
      1. 传统布局
      2. flex布局：一维布局
      3. grid布局：二维布局
    
      grid布局兼容性很差，很多浏览器不支持。
      2017年的部分浏览器才开始支持grid布局。
    
      safari还没有支持网络属性，例如不支持grid-template-rows属性。
    
      优势：
    
        处理复杂的二维布局时，使用grid布局更有优势。
        gird是二维布局，会有两个主轴，在两个主轴上都可以进行布局。
    
      属性：
    
        Grid Container
        Grid Item
        Grid Line：分为垂直和水平两个方向
        Gird Track：相邻网格线之前的距离
        Grid Cell：网格的一个单元
    
        ```js
        display: grid;
        ```
    
        gird布局和flex布局很相似。

  ## 十三、transform、css属性值定义语法 - 动画与3D模块

    如何阅读css语法：
    
      CSS属性值定义语法（CSS value definition syntax）是用来限定CSS属性合法取值的专门语法。
      CSS属性值定义语法描述了哪些值是可取的CSS属性，基本组成元素包括关键字、符号与带类型的参数。
    
      https://developer.mozilla.org/zh-CN/docs/Web/CSS/Value_definition_syntax
    
      1. 基本组成元素：
    
        （1）关键字：
    
          一般关键字：一般关键字都有预先的定义，不需要引号，如auto、smaller或ease-in。
    
          特殊关键字：inherit（继承）与initial（初始值）
            
            所有css属性值都可以使用inherit或者initial。
            这两个关键字不会出现在CSS语法合法值定义中，但都是隐含可用的。
    
        （2）符号：
    
          CSS中，有一些符号是可以出现的，比如斜杠（'/'）或者逗号（','）等，它们用来分割属性值。
          逗号用来分割数个并列值，或者分割函数的参数。
          斜杠用来分割一个值的多个部分，通常用在CSS缩写中。
    
        （3）带类型的参数
    
          基本类型
    
            一些类型在css中经常出现，CSS规范中将其专门定义，称为基本类型，用一对
            尖括号表示：'<与>'，例如：<angle>，<string>，...
    
              <angle>
    
                语法：<angle>数据类型由<number>和下列单位组成，数字与单位之间没有空格。
    
                单位：deg、grad、rad、turn 
    
                值的类型根据不同的兼容性可能有不同的定义方式。
    
         其他类型
    
            其他类型同样也用一对尖括号来表示。
    
            其他类型分为两种：
    
              1. 共享同一个属性名称的数个类型，它们出现在一对引号中，经常用于属性的缩写。
    
              2. 不共享同一个属性的数个类型，他们与基本类型很相似。
    
                不同的是，这种参数仅在规范中相关属性的描述处定义，而基本类型在规范中有专门定义。
    
      2. 组合符号
    
        (1) 方括号
    
          方括号将数个基本元素组成一个整体，用来强调组合的优先级。
    
            bold [ thin && <length> ]
    
          以下均为该例的合法取值：
    
            1. bold thin 2vh
            2. bold 0 thin
            3. bold thin 3.5em
    
          以下不是合法取值：
    
            thin bold 3em 
    
            因为bold被放置在方括号定义的整体之中。
            根据定义，bold必须出现在方括号定义的整体之前。
    
        (2) 并置
    
          并置是指将数个关键字、符号或类型，用空格分开写在一起。
          并置所有的元素都必须出现并且按所规定的顺序出现。例如：
    
            bold <length>, thin
    
          以下均为该例的合法取值
    
            1. bold lem, thin
            2. bold 0, thin
            3. bold 2.5cm, thin
            4. bold 3vh, thin
    
          以下不是合法值
    
            1. thin lem, bold 
              
              因为顺序有错
    
            2. bold lem thin 
            
              因为所有元素都必须出现，包括逗号。
    
            3. bold 0.5ms, thin 
    
              因为ms是时间值，不是长度值：<length>
    
        (3) “与”组合符：&&
    
          "与"组合符连接的各个部分都必须出现，但是顺序任意。例如：
    
            bold && <length>
    
          以下均为该例的合法取值
    
            1. bold lem
            2. bold 0
            3. 2.5cm bold
            4. 3vh bold
    
          以下不是合法值
    
            1. bold
    
              因为长度值没有出现。
    
            2. bold 1em bold
    
              因为各部分必须恰好出现一次。
    
          注：并置的优先级高于"与"组合符。
          
            例如bold thin && <length> 等价于 [bold thin] && <length>。
            它们的合法取值是：bold thin <length> 或 <length> bold thin，
            但不能是 bold <length> thin。
    
        (4) “或”组合符：||
    
          “或”组合符表示其连接的所有组成元素是可选的，次序任意，但是至少其中一个要出现。
          “或”组合符通常用于描述属性缩写中的各部分。
    
            <'border-width'> || <'border-style'> || <'border-color'>
    
          以下均为该例的合法取值
    
            1. lem solid blue
            2. blue 1em
            3. solid 1px yellow
    
          以下不是合法值
    
            1. blue yellow：因为一个组成部分最多出现一次
            2. bold 因为它不允许出现


          注：“与”组合符的优先级高于“或”组合符。
    
            例如bold || thin && <length>  等价于 bold || [thin && <length>]，
            它们的合法取值是：bold、thin <length>、bold thin <length>、
            或者 thin <length> bold。但不能是 <length> bold thin。
            因为bold 若出现，则必须出现在 thin && <length> 整体的前面或后面。
    
        （5）“互斥”组合符
    
          “互斥”组合符表示各组成部分中只能恰好出现一个，通常用于分隔一个属性的所有可选值。例如：
    
            <percentage> | <length> | left | center | right | top | bottom
    
          以下均为该例的合法取值
    
            1. 3%
            2. 0
            3. 3.5rem
            4. left
            5. center
            6. right
            7. top
            8. bottom
    
          以下不是合法值
    
            1. center 3%
            2. 3em 4.5em
    
          注：“或”组合符的优先级高于“互斥组合符”。
          比如 bold | thin || <length> 等价于 bold | [thin || <length>],
          它们的合法取值是：bold、thin、<length>、<length> thin、thin <length>，
          但不能是bold <length>，因为“互斥”组合符所连接的数个部分中，只有一个能出现。
    
      3. 数量符号
    
        数量符号用于描述一个元素可以出现多次。若不标注，则这个元素比如恰好出现一次。
    
        注意数量描述符不能叠加出现，并且优先级最高。
    
        （1）星号（*）
    
          星号表示可以出现零次（即不出现），一次，或任意多次。例如：
    
            bold smaller*
    
          以下均为该例的合法取值
    
            1. bold
            2. bold smaller
            3. bold smaller smaller
            4. bold smaller smaller smaller and so on.
    
          以下不是合法值
    
            smaller 因为bold并置于smaller，必须出现在任何smaller之前
    
        （2）加号 (+)
    
          加号表示可以出现一次或多次。例如：
    
            bold smaller+
    
          以下均为该例的合法取值
    
            1. bold smaller
            2. bold smaller smaller
            3. bold smaller smaller smaller and so on.
    
          以下不是合法值
    
            1. bold 因为smaller必须出现至少一次。
            2. smaller 因为bold 是并置关系，必须在smaller之前出现。
    
        （3）问号 (?)
    
          问号表示可选，即出现零次或一次。例如：
    
            bold smaller?
    
          以下均为该例的合法取值
    
            1. bold
            2. bold smaller
    
          以下不是合法值
    
            1. bold smaller smaller 因为smaller最多出现一次。
            2. smaller 因为bold是并置关系，必须出现在smaller之前。
    
        （4）大括号 ({ })
    
          大括号包含两个以逗号分隔的整数A与B，表示最少出现A次，且最多出现B次。例如：
    
            bold smaller{1,3}
    
          以下均为该例的合法取值
    
            1. bold smaller
            2. bold smaller smaller
            3. bold smaller smaller smaller
    
          以下不是合法值
    
            1. bold 因为smaller 至少要出现一次。
            2. bold smaller smaller smaller smaller 因为smaller 最多出现三次。
            3. smaller 因为bold是并置关系，必须出现在smaller之前。
    
        （5）井号 (#)
    
          井号表示可以出现一次或多次，与加号相似。但是其多次出现必须以逗号分隔。例如：
    
            bold smaller#
    
          以下均为该例的合法取值
    
            1. bold smaller
            2. bold smaller, smaller
            3. bold smaller, smaller, smaller and so on.
    
          以下不是合法值
    
            1. bold 因为smaller必须至少出现一次。
            2. bold smaller smaller smaller 因为多个smaller必须以逗号分隔。
            3. smaller 因为bold是并置关系，必须出现在smaller之前。
    
        （6）叹号 (!)
    
          组后面的叹号表示该组是必需的，并且至少产生一个值；
          即使组内项目的语法允许省略全部的值，也至少要保留一个值。
    
            [ bold? smaller? ]!
    
          以下均为该例的合法取值
    
            1. bold
            2. smaller
            3. bold smaller
          
          以下不是合法值
    
            1. bold 和 smaller都没有：因为至少要出现一个。
            2. smaller bold：因为 bold 必须出现在 smaller 前面。
            3. bold smaller bold：因为 bold 只能出现一次。
    
      4. 总结
    
        符号      名称          描述                            示例
    
        组合符号
    
                  并置          各部分必须出现且按顺序出现        solid <length>
    
        &&        “与”组合符    各部分必须出现，但可以不按顺序     <length> && <string>
    
        ||        “或”组合符    各部分至少出现一个，可以不按顺序   <'border-image-outset'> || <'border-image-slice'>
    
        |         “互斥”组合符  各部分恰好出现一个                smaller | small | normal | big | bigger
    
        []        方括号        强调优先级                       bold [ thin && <length> ]


        数量符号
    
                  无数量符号    恰好一次                            solid
    
        *         星号         零次、一次或多次                     bold smaller*
    
        +         加号         一次或多次                           bold smaller+
    
        ?         问号         零次或一次（即可选）                  bold smaller?
    
        {A,B}     大括号       至少A次，至多B次                      bold smaller{1,3}
    
        #         井号         一次或多次，但多次出现必须以逗号分隔	   bold smaller#
    
        !         叹号        组必须产生一个值                       [ bold? smaller? ]!
    
    盒子居中
    
      <div class="box">
        <div class="inner"></div>
      </div>
    
      1. 定位 + margin
    
      ```css
      .box {
        position: relative;
        top: 100px;
        left: 50%;
        margin-left: -150px;
        width: 300px;
        height: 300px;
        padding: 50px;
        border: 1px solid #000;
      }
      ```
    
      2. calc
    
      ```css
      .box {
        position: relative;
        top: 100px;
        left: calc(50% - 150px);
        width: 300px;
        height: 300px;
        padding: 50px;
        border: 1px solid #000;
      }
      ```
    
    transform
    
      https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform
    
      CSS transform属性允许你旋转（rotate），缩放（scale），倾斜（skew）或平移（translate）给定元素。
      这是通过修改CSS视觉格式化模型的坐标空间来实现的。 transform属性可以指定为关键字值none 或一个或多个<transform-function>值。
    
      transform属性只对块级元素生效。
    
      1. 值：
    
        <transform-function>
    
          要应用的一个或多个CSS变换函数。 变换函数按从左到右的顺序相乘，这意味着复合变换按从右到左的顺序有效地应用。
    
        none
    
          不应用任何变换。
    
      2. 语法格式
    
        none | <transform-list>
    
        where 
    
        <transform-list> = <transform-function>+ 
    
        where 
        <transform-function> = <matrix()> | <translate()> | <translateX()> | <translateY()> | <scale()> | <scaleX()>...
    
        where 
        <matrix()> = matrix( <number>#{6} )
        <translate()> = translate( <length-percentage> , <length-percentage>? )
        <translateX()> = translateX( <length-percentage> )
        <translateY()> = translateY( <length-percentage> )
        <scale()> = scale( <number> , <number>? )
        ...
    
        where 
        <length-percentage> = <length> | <percentage>
    
      3. transform-function
    
        笛卡尔坐标系（2D坐标系）。计算机的屏幕的坐标系原点是屏幕左上角。右x，下y。
        对于3D笛卡尔坐标系，计算机图形学中使用的是左手演示的笛卡尔坐标系。右x，下y，外z。
    
        3D坐标系中，z轴可以理解为眼睛到屏幕的中间的一条垂线。
        屏幕到眼睛的方向就是正方向，反之，为反方向。
    
        （1）rotate 旋转
    
          transform: rotate(0);
          transform: rotate(0deg);
          transform: rotateZ(0deg);
    
          rotate默认是沿着屏幕的Z轴进行旋转的，rotate() => rotateZ()。
    
          transform: rotateX(70deg);
          transform: rotateY(70deg);
    
          当旋转到一定角度，盒子就看不到了。
          这就可以说明所有元素都是一个平面元素，盒子是没有厚度的。
    
          rotate3d()
    
            可以指定一个轴，让平面元素沿着指定轴进行旋转。
    
            轴：原点到指定点的连线确定一个轴。
    
            transform: rotate3d(0, 40, 0, 70deg); <=>  transform: rotateY(70deg);
            transform: rotate3d(45, 45, 0, 120deg);
    
        （2）scale 缩放
    
          transform: scaleX(2); // x方向，放大两倍
          transform: scaleX(.5); // x方向，缩小一倍
    
          transform: scaleY(2); // y方向，放大两倍
          transform: scaleY(1.5); // y方向，放大1.5倍
    
          transform: scaleZ(2); // z方向，放大两倍
          transform: scaleZ(0); // z方向，缩小一倍
          由于是垂直于当前平面，所以放大也观察不出效果。
          但是如果值为0，元素就是消失。
    
          transform: scale(2); // x、y方向同时放大两倍
          transform: scale(1, .5); // x不缩放，y方向缩小0.5倍
    
          transform: scale3d(2, 2, 2); // x,y,z，同时放大两倍
    
        （3）skew 倾斜
    
          transform: skewX(30deg); // x方向，倾斜30度，x倾斜，元素两边会拉伸。
          transform: skewY(30deg); // y方向，倾斜30度，x倾斜，元素两边会拉伸。
          transform: skew(30deg, 30deg); // x,y方向，同时倾斜30度
    
        （4）translate 平移
    
          transform: translateX(100px); // x方向，平移100像素
          transform: translateY(100px); // y方向，平移100像素
          transform: translate3d(100px, 100px, 100px); // x，y，z方向，平移100像素
    
          transform: translateX(150px) translateY(150px); // x,y方向，平移150像素
    
        transform: rotate(50deg) translateX(150px) translateY(150px); // 先旋转，再平移
        transform: translateX(150px) translateY(150px) rotate(50deg); // 先平移，再旋转

  ## 十四、三次贝塞尔曲线、transition、animation - 动画与3D模块

    transform-origin
    
      用于更改元素的原点。任何转换都基于控制点，即原点。
    
      transform-origin: left; // x 0%, y 50%
        => transform-origin: 0% 50%;
    
        定义一个值的时候，另一个值默认为center。
    
      transform-origin: center center; // 默认值 x 50% y 50%
        => transform-origin: 50% 50%;
    
      transform-origin: left center; // x 0%, y 50%
        => transform-origin: 0% 50%;
    
      transform-origin: left top; // x 0%, y 0%
        => transform-origin: 0% 0%;
    
      transform-origin: right center; // x 100%, y 50%
        => transform-origin: 100% 50%;
    
      transform-origin: 0% 100% 10px;
        第三个值是z轴的值。
    
    transition 转变
    
      用来定义过渡效果的属性。
    
      ```css
      .inner:hover {
        transform: rotate(30deg);
        transition-property: transform;
        transition-duration: 2s;
        transition-timing-function: ease;
        transition-delay: 1s;
      }
      ```
    
    三次贝塞尔曲线 （cubic-bezier-timing function）
    
      linear | ease | ease-in | ease-out |
      ease-in-out | cubic-bezier
    
      三次贝塞尔曲线是一个函数，用来生成速度曲线的函数。
      三次贝塞尔曲线由两个控制点决定。
    
      transition-timing-function: cubic-bezier(0.42, 0, 1, 1);
    
      1. 线性过渡效果
    
        cubic-bezier(0, 0, 1, 1) <=> linear
    
      2. 由慢到快的过渡效果（由慢开始）
    
        cubic-bezier(0.42, 0, 1, 1) <=> ease-in 
    
      3. 由快到慢的过渡效果（由慢结束）
    
        cubic-bezier(0, 0, 0.58, 1) <=> ease-out
    
      4. 开始慢，结束慢的过渡效果（由慢开始和慢结束）
    
        cubic-bezier(0.42 0, 0.58, 1) <=> ease-in-out
    
      5. 由慢到快，再由快到慢的过渡效果（慢速开始变快，然后慢速结束）
    
        cubic-bezier(0.25, 0.01, 0.25, 1) <=> ease
    
      ...
    
      简写
    
      ```css
      .inner:hover {
        transform: rotate(30deg);
        transition: transform 2s ease-in 1s;
      }
      ```
    
      多个效果的过渡效果
    
      ```css
      .inner:hover {
        width: 200px;
        height: 200px;
        background-color: red;
        transform: rotate(30deg);
        transition: transform 2s, width 2s, height 2s, background-color 2s;
      }
      ```
    
      =>
    
        ```css
        .inner:hover {
          width: 200px;
          height: 200px;
          background-color: red;
          transform: rotate(30deg);
          transition: all 2s;
        }
        ```
    
        不建议使用all，动画是一种消耗性能的操作，如果明确是哪个属性具有动画效果，需要单独指定。
    
      =>
    
        多个元素时，推荐下面这样定义。
    
        ```css
        .inner:hover {
          width: 200px;
          height: 200px;
          background-color: red;
          transform: rotate(30deg);
          transition-property: transform, width, height, background-color;
          transition-duration: 2s;
        }
        ```
    
    animation 动画
    
      @keyframes 定义动画如何实现的过程。
    
      1. animation-name 动画名称
      2. animation-duration 动画持续时间
      3. animation-timing-function 动画速度曲线
      4. animation-iteration-count 动画周期播放次数
    
        infinite（循环）| 次数（number）
    
      5. animation-direction 动画是否反向播放
    
        normal（默认值）| reverse（反向）|
        
        alternate（动画交替反向，不常用）和动画曲线相关
        alternate-reverse（动画反向交替，不常用）和动画曲线相关
    
      6. animation-fill-mode 
      7. transition
    
      transition触发条件一般用事件的方式进行触发，可以和JS配合使用。
      transition没有办法设置循环次数，animation可以。
    
      animation和JS交互性不强，如果想实现动画，可以用CSS3来写，也可以使用JS。

  ## 十五、响应式设计、@媒体查询、GPU硬件加速 - 响应式设计模块

    盒子垂直水平居中
    
      <div class="wrap">
        <div class="box"></div>
      </div>
    
      1. 父元素 padding，子元素宽度100% 不常用
    
      ```css
      .wrap {
        width: 500px;
        height: 500px;
        padding: 100px;
        border: 1px solid #000;
        box-sizing: border-box;
      }
    
      .box {
        width: 100%;
        height: 100%;
        background-color: orange;
      }
      ```        
    
      2. postion绝对定位
    
      ```css
      .wrap {
        position: relative;
        width: 500px;
        height: 500px;
        border: 1px solid #000;
        box-sizing: border-box;
      }
    
      .box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -50px;
        width: 100px;
        height: 100px;
        background-color: orange;
      }
      ```
    
      3. calc计算值
    
      ```css
      .wrap {
        position: relative;
        width: 500px;
        height: 500px;
        border: 1px solid #000;
        box-sizing: border-box;
      }
    
      .box {
        position: absolute;
        top: calc(50% - 50px);
        left: calc(50% - 50px);
        width: 100px;
        height: 100px;
        background-color: orange;
      }
      ```
    
    4. transform
    
    ```css
    .wrap {
      position: relative;
      width: 500px;
      height: 500px;
      border: 1px solid #000;
      box-sizing: border-box;
    }
    
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50px, -50px);
      width: 100px;
      height: 100px;
      background-color: orange;
    }
    ```
    
    5. 弹性盒子
    
    ```css
    .wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 500px;
      height: 500px;
      border: 1px solid #000;
      box-sizing: border-box;
    }
    
    .box {
      width: 100px;
      height: 100px;
      background-color: orange;
    }
    ```

  文字居中

    元素内容不定时，长度可变时的解决方案。
    
    ```css
    .wrap {
      position: relative;
      width: 500px;
      height: 500px;
      border: 1px solid #000;
      box-sizing: border-box;
    }
    
    .box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      background-color: orange;
    }
    ```
    
    如何让文字层级到盒子层级之下？
    
    定义3d元素必须设置 transform-style，这样3d属性才会生效。
    
      ```css
        transform-style: preserve-3d;
      ```
    
    ```css
    .wrap {
      position: relative;
      width: 500px;
      height: 500px;
      background-color: green;
      transform-style: preserve-3d;
      opacity: .6;
    }
    
    .box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, -1px);
      font-size: 40px;
      background-color: orange;
    }
    ```

  硬件加速模式（GPU加速模式，物理加速）

    使用3d属性时，渲染引擎不再是webkit渲染引擎，启用的是GPU硬件加速。
    开启硬件加速模式，让此时的渲染模式由CPU传向GPU。
    
    手机端定义多动画时，对CPU是一个很大的负担，可能会出现动画闪烁的情况。
    可以将CPU动画的部分，强制开启硬件加速模式。
    
    只要使用和3d相关的属性，都可以开启CPU硬件加速模式。
    在手机端，当硬件配置不高时，可以给CPU分担压力，但是不建议这样使用。
    GPU加速功能会把手机内存产生负担，当大规模调用GPU时，手机会卡顿。
    
    所有的动画元素都是position: absoutlte;元素。
    当所有动画都开启CPU加速，计算量过大时，可能会出现元素丢失现象。
    如果不是非常棘手的问题，GPU硬件加速一定要慎用。
    
    CPU 处理器
    GPU 针对视觉相关的处理器，即显卡，用于处理图像

  响应式设计

    RWD（response web design）
    
      将网格布局（flex） + 弹性图片等 + 媒体查询全部整合起来，为了让网站也呈现自动缩放。 
    
    来源：
    
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
      针对手机系统（android、ios），可以设置viewport标签。
      如果没有设置viewport，会将所有的内容展示出来。
    
      为了针对这种情况，可以使用响应式设计。
    
    媒体查询 @media
    
      可以根据设备的特性进行不同的处理。
    
      ```css
      @media screen and (max-width: 960px) and (min-width: 768px) {
        body {
          background-color: red;
        }
      }
    
      @media screen and (max-width: 768px) and (min-width: 550px) {
        body {
          background-color: blue;
        }
      }
    
      @media screen and (max-width: 550px) {
        body {
          background-color: orange;
        }
      }
      ```
    
      @media基本所有的浏览器都支持，不支持的可以使用polyfill.js进行兼容。
    
      https://developer.mozilla.org/zh-CN/docs/Web/CSS/media
    
      （1）media type 查询类型
    
        all、print、screen ...
      
      （2）media condition
    
        通过 and、only、not、逗号（,） 连接多个条件表达式。
    
        and , not（与或非）、only 基本不使用。
    
        1. not
    
          not 以后的所有内容取反。
    
          ```css
          @media not screen and (max-width: 550px) {
            body {
              background-color: orange;
            }
          }
          ```
    
        2. only
    
          老版本浏览器需要指定这个属性，目前已经不需要使用。          
    
          ```css
          @media only screen and (max-width: 550px) {
            body {
              background-color: orange;
            }
          }
          ```
    
        3. “,”
    
          或逻辑。多个条件只有一个为真就可以。
    
          ```css
          @media (max-width: 768px), (min-width: 550px) {
            body {
              background-color: orange;
            }
          }
          ```
    
      （3）media feature 条件规则组
    
        width、min-width、max-width 可视宽度
        height、min-height、max-height 可视高度
        orientation 输出设备中页面可见区域是否大于或等于宽，即定义屏幕横屏或者竖屏展示。
    
          portrait（竖屏）、landscape（横屏）
    
        color、_、_、 颜色
        device-width、_、_  设备宽度
        device-heiight、_、_ 设备高度
        aspect-ratio、_、_  输出设备中页面可见区域宽度与高度的比率
        ...
    
        定义条件时的可选值。常用的是width和height。
    
        orientation
    
        ```css
        @media (max-width: 768px) and (min-width: 550px) {
          body {
            background-color: orange;
          }
        }
    
        @media screen and (orientation: landscape) {
          body {
            background-color: red;
          }
        }
        ```
    
      补充部分：
    
        整个CSS体系中一共有两种规则。一个是@规则，一个是一般规则。
    
        第二种规则引入方式 link
    
          ```css
          <link
            type="text/css"
            rel="stylesheet"
            @media="(max-width: 768px) and (min-width: 550px)"
            href="css/index.css"
          />
          ```
          ```css
          <link
            type="text/css"
            rel="stylesheet"
            @media="(max-width: 768px) and (min-width: 550px) and (orientation: landscape)"
            href="css/index.css"
          />
          ```
          @规则成立时，引入CSS样式文件。
    
        第三种规则引入方式 @import
    
          @import url;
          @import url list-of-media-queries;
    
          ```css
          @import url(css/index.css);
          ```
          ```css
          @import url(css/index.css) (max-width: 768px) and (min-width: 550px) and (orientation: landscape)";
          ```
          ```css
          @import url(css/index.css) screen and (max-width: 768px) and (min-width: 550px) and (orientation: landscape)";
          ```
    
          ```css
          @import url(css/index.css) screen and (max-width: 960px) and (min-width: 768px)";
          @import url(css/index1.css) screen and (max-width: 768px) and (min-width: 550px)";
          @import url(css/index2.css) screen and (max-width: 550px);
          ```
    
      link、@import区别
    
        link是一个标签，异步加载（预加载、等到@media条件通过，才会执行），不阻塞渲染和window.onload事件。
    
        @import是在css文件中编写的，存在兼容性问题（非常低的老版本不支持该属性）。
    
      em、rem、px
    
        em 相对于父级元素的font-size的大小。
        rem 相对于根标签的font-size的大小。
    
        ```html
        <div class="wrap">
          <p class="a">横屏是一个rem，竖屏是3个rem</p>
          <p class="b">我是一个rem</p>
        </div>
        ```
    
        rem 应用：
          
          ```css
          .html {
            font-size: 12px;
          }
    
          .wrap {
            font-size: 20px;
          }
    
          .b {
            font-size: 1rem;
          }
    
          @media screen and (orientation: portrait) {
            .a {
              font-size: 3rem;
            }
          }
    
          @media screen and (orientation: landscape) {
            .a {
              font-size: 1rem;
            }
          }
          ```
    
          只和根元素的font-size有关系。
    
        em 应用：
    
          ```css
          .html {
            font-size: 12px;
          }
    
          .wrap {
            font-size: 20px;
          }
    
          .b {
            font-size: 1em;
          }
    
          @media screen and (orientation: portrait) {
            .a {
              font-size: 3em;
            }
          }
    
          @media screen and (orientation: landscape) {
            .a {
              font-size: 1em;
            }
          }
          ```
    
          只和父级元素的font-size大小有关。

  ## 十六、CSS3媒体查询进行屏幕适配 - 响应式设计模块

    请用CSS3适配 ... 到 ... 屏幕。
    
      => CSS3媒体查询 @media
    
    all、print、screen、speech
    
    专业名词不可以错，使用白话文描述答案。
    
    ```css
    html {
      height: 100%;
    }
    
    @media screen and (max-width: 379px) {
      html {
        background-color: black;
      }
    }
    
    @media screen and (min-width: 480px) and (max-width: 767px) {
      html {
        background-color: red;
      }
    }
    
    @media screen and (min-width: 768px) and (max-width: 959px) {
      html {
        background-color: pink;
      }
    }
    
    @media screen and (min-width: 960px) and (max-width: 1190px) {
      html {
        background-color: purple;
      }
    }
    
    @media screen and (min-width: 1200px) {
      html {
        background-color: orange;
      }
    }
    ```
    
    可以通过媒体查询分别计算不同屏幕下的font-size。

  ## 十七、webkit属性、设备与设备独立像素、css像素 - 补充

    webkit私有属性
    
      https://www.html.cn/book/css/webkit/behavior/index.htm
    
      （1）-webkit-appearance（此API已废弃）
    
        说明：
    
          改变按钮和其他控件的外观，使其类似于原生控件。
    
          1. -webkit-appearance是一个不规范的属性（unsupported Webkit property），它没有出现在CSS规范草案中。
          2. 此属性非标准且渲染效果在不同浏览器下不同，有些属性值甚至不支持，需慎用。        
    
        语法：
    
          -webkit-appearnce：none | button | button-bevel...
    
          默认值：none
    
        取值：
    
          -webkit-appearance取值    介绍                chrome    safari   IOS Safari    Android Browser
    
          none           去除系统默认appearance的样式，  支持       支持      支持            支持
                            常用于IOS下移除原生样式。
    
          button         渲染成button的风格             支持       支持       支持            支持
    
          ...
    
      （2）-webkit-filter
    
        说明：
    
          CSS滤镜属性，可以在元素呈现之前，为元素的渲染提供一些效果，如模糊、颜色转移之类的。
          滤镜常用于调整图像、背景、边框的渲染。
    
          1. CSS标准里包含了一些已实现预设效果的函数。你也可以将设定了滤镜效果的SVG文件，
             通过URL引用给SVG滤镜元素（SVG filter element）。
    
        语法:
    
          -webkit-filter：none | blur(px) | brightness() | contrast() | grayscale()
                          hue-rotate(deg) | invert() | opacity() | saturate() | sepia()
                          drop-shadow(radius) | url()
    
          默认值：none
    
        取值：
    
          none                      无SVG滤镜效果
          blur(<number>px)          设置对象的模糊效果
          brightness(<percentage>)  设置对象的亮度。除了百分比以外，也可以用非负数表达。
          contrast(<percentage>)    设置对象的对比度。除了百分比之外，也可以用0-1的数字表达。
          grayscale(<percentage>)   设置对象的灰度。除了百分比之外，也可以用0-1的数字表达。
          hue-rotate(<number>deg)   设置对象的色相旋转。用0-360数字表达。
          invert(<percentage>)      设置对象的反色。除了百分比之外，也可以用0-1的数字表达。
          opacity(<percentage>)     设置对象的透明度。除了百分比之外，也可以用0-1的数字表达。
          saturate(<percentage>)    设置对象的饱和度。除了百分比以外，也可以用非负数表达。
          sepia(<percentage>)       设置对象的褐色程度。除了百分比之外，也可以用0-1的数字表达。
          drop-shadow(<length>      设置对象的阴影。
           <length> radius <color>)   第一个长度是向右偏移距离，第二个长度是向下偏移距离，都可为负值，都是必传参数；
                                      第三个参数是阴影圆角，可选；
                                      第四个参数是阴影颜色，可选；
          url(path.svg#a)           设置对象滤镜效果。通过SVG可实现以上效果。SVG可写在页面，
                                    也可外部引用。可增加锚节点。
    
        （3）