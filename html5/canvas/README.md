# Canvas

## 绘制圆形、添加样式和颜色、变形

canvas 兼容性比较好，IE9 就开始支持 canvas。

```html
<canvas id="J-canvas" width="300" height="150"></canvas>
```

```css
<style type="text/css">
  #J-canvas {
    border: 1px solid #000;
  }
</style>
```

canvas 仅支持一种原生图形的绘制，就是矩形（正方形就是特殊的矩形）。

```js
onst oCanvas = document.getElementById('J-canvas');

// 1. 获取渲染上下文 (上下文类型) 
const ctx = oCanvas.getContext('2d');
```

> 2d：CanvasRenderingContext2D
> webgl：WebGLRenderingContext

### 绘制矩形

矩形类型：

* 填充满的矩形；
* 只有轮廓的矩形；
* 透明矩形。

#### 绘制填充满矩形

fillRect(x, y, width, height)

```js
ctx.fillStyle = 'orange';
ctx.fillRect(50, 50, 100, 100);
```

#### 绘制透明矩形

clearRect(x, y, width, height)

清除指定区域，类似橡皮擦擦掉内容的效果。

```js
ctx.fillStyle = 'orange';
ctx.fillRect(50, 50, 100, 100);
ctx.clearRect(75, 75, 50, 50);
```

#### 绘制带轮廓矩形

stroke 笔画。

```js
ctx.strokeStyle = 'orange';
ctx.strokeRect(50, 50, 100, 100);
```

### 绘制路径

创建路径 ，使用画图命令画出路径，一旦路径被创建，可以通过描边或者填充来渲染图形。

```js
// 创建新路径
ctx.beginPath();
// 设置路径颜色（可选）
ctx.strokeStyle = 'orange';
// 设置路径宽度（可选）
ctx.lineWidth = 10;
// 设置起始点
ctx.moveTo(50, 50);
// 设置终止点
ctx.lineTo(100, 100);
// 绘制
ctx.stroke();
```

### 绘制三角形

closePath 闭合路径。通过闭合路径可以将最后点和起始点做连接。

```js
ctx.beginPath();
ctx.strokeStyle = 'orange';
ctx.moveTo(50, 50);
ctx.lineWidth = 5;
ctx.lineTo(150, 50);
ctx.lineTo(100, 100);
ctx.closePath();
ctx.stroke();
```

### 绘制圆形

arc(x, y, radius, startAngle, endAngle, anticlockwise)；

> arc ：弧（度）
>
> anticlockwise：逆时针的

#### 360° 圆形

```js
ctx.beginPath();
ctx.arc(70, 70, 50, 0, 2 * Math.PI);
ctx.stroke();
```

#### 90° 圆形

```js
ctx.beginPath();
ctx.arc(70, 70, 50, 0, Math.PI / 180 * 90, true);
ctx.stroke();
```

### 绘制不规律图形

arcTo(x1, y1, x2, y2, radius);

> x，y：控制点坐标

```js
ctx.beginPath();
ctx.moveTo(150, 20);
ctx.arcTo(150, 100, 50, 20, 30);
ctx.lineTo(50, 20);
ctx.stroke();
```

<img src="./images/arcTo.png" />

### 贝塞尔曲线

贝塞尔曲线由 1962 年法国工程师 皮埃尔·贝塞尔提出，起初用于汽车的主体设计。

二次贝塞尔曲线（quadraticCurveTo）：

<img src="./images/2.gif" />

三次贝塞尔曲线：

<img src="./images/3.gif" />

可以借助贝塞尔曲线实现比较复杂的路径绘制。

比如可以实现旋转木马等效果。

#### 二次贝塞尔曲线

quadraticCurveTo(cpx, cpy, x, y)

> cp：control point 控制点

```js
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.quadraticCurveTo(230, 30, 50, 100);
ctx.stroke();
```

