# solid.js

## svelte.js

svelte.js

没有虚拟 DOM，重编译轻运行。

vue、react 中使用虚拟 DOM 确实是为了优化性能，但是这是建立在 vue 的响应式更新和 react 的 fiber tree diff 的基础之上的，虚拟 DOM 方便了框架内的抽象处理，并不是虚拟 DOM 比直接操作 DOM 快。

svelte.js 没有虚拟 DOM，借助编译时的能力，直接把操作转化为原生 DOM 操作，因此 svelte.js 开发的应用可以做到体积小且性能高。

svelte.js 本身使用了模板的写法，加上标签指令和响应式语法，svelte.js 写出来看上去更接近 vue 的用法。


solid.js 采用了 jsx 的写法，加上类似 hooks 的语法，写出来看上去更像是 react。

solid.js 和 react 有本质的区别，它们只是看上去像，从原理上来说，solid.js 和 svelte.js 更接近。

## solid vs react

计时器案例对比

```jsx
// react

function Count() {
	const [num, setNum] = useState(0)
  
	return (
		<div>
			{num}
			<div onClick={() => setNum((p) => p + 1)}>+</div>
			<div onClick={() => setNum(0)}>reset</div>
			<div onClick={() => setNum((p) => p - 1)}>-</div>
		</div>
	)
}
```

```jsx
// solid

function Count() {
	const [num, setNum] = createSignal(0)
	return (
		<div>
			{num()}
			<div onClick={() => setNum((p) => p + 1)}>+</div>
			<div onClick={() => setNum(0)}>reset</div>
			<div onClick={() => setNum((p) => p - 1)}>-</div>
		</div>
	)
}
```



solid.js 数据变化时直接更新变化的内容，不需要整体 diff，效率提升非常明显。

solid.js 另一个重要的提升点就是编译时，类似 svelte，solid 也会在编译时做很多优化工作，由于没有虚拟 dom，solid 会直接把操作转化为 dom API 的调用，速度非常快。


在线阅读源码：[https://github.dev/solidjs/solid](https://github.dev/solidjs/solid)

在线查看编译结果：[https://playground.solidjs.com/](https://playground.solidjs.com/)

> 仓库页面敲击句号键，可以使用快捷方式打开 github.dev

## packages

packages

* solid 是 solid.js 的核心，里面包含了 solid.js 基础能力的实现
* solid-element 是 WebComponents 相关，为 solid.js 封装了 WebComponents 的能力
* solid-ssr 和 ssr 相关，提供了一些 ssr 渲染的辅助工具
* babel-preset-solid 是 babel 实现，主要是 jsx 转化相关内容
* test-integration 一些测试相关内容

## reactive


```js
// packages/src/solid/src/reactive/signal.ts

// Inspired by S.js by Adam Haile, https://github.com/adamhaile/S
```

solid.js 中 reactive 源码部分实现参考了 S.js 这个库，[S.js](https://github.com/adamhaile/S) 是一个很轻量的响应式库。

```js
let greeting = S.data('Hello')
let name = S.data('world')

S(() => (document.body.textContent = `${greeting()}, ${name()}!`))

name('reactivity')
```

[https://github.dev/adamhaile/S](https://github.dev/adamhaile/S)

基于发布订阅方式实现响应式效果。



## summary

相比较于 vue 和 react，solid 的源码很有学习和借鉴意义，没有过多的兼容和无奈的写法，都是很明确的实现，可以作为相关学习的优秀范本。
