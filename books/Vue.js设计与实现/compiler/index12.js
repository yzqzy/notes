// 定义文本模式，作为状态表
const TextModes = {
  DATA: 'DATA',
  RCDATA: 'RCDATA',
  RAETEXT: 'RAETEXT',
  CDATA: 'CDATA'
}

// 解析器函数，接收模板作为参数
function parse(str) {
  // 定义上下文对象
  const context = {
    // source 是模板内容，用于解析过程中进行消费
    source: str,
    // 解析器当前处于文本模式，初始模式为 DATA
    mode: TextModes.DATA,
    // advanceBy 函数用来消费指定数量的字符，它接收一个数字作为参数
    advanceBy(num) {
      // 根据给定字符数 num，截取位置 num 后的模板内容，并替换模板内容
      context.source = context.source.slice(num)
    },
    // 无论是开始标签还是结束标签，都有可能存在无用的空白字符，例如 <div   >
    advanceSpaces() {
      // 匹配空白字符
      const match = /^[\t\r\n\f ]+/.exec(context.source)
      if (match) {
        // 调用 advanceBy 函数消费空白字符
        context.advanceBy(match[0].length)
      }
    }
  }

  // 调用 parseChildren 函数开始解析，它返回解析后得到的子节点
  // parseChildren 函数接收两个参数
  // 第一个参数是上下文对象 context
  // 第二个参数是由父代节点构成的节点栈，初始时栈为空
  const nodes = parseChildren(context, [])

  // 解析器返回 Root 根节点
  return {
    type: 'Root',
    // 使用 nodes 作为根节点的 children
    children: nodes
  }
}

function parseChildren(context, ancestors) {
  // 定义 nodes 数组存储子节点，它将作为最终的返回值
  let nodes = []
  // 从上下文对象中取得当前状态，包括模式 mode 和模板内容 source
  const { mode, source } = context

  // 开始 while 循环，只要满足条件就会一直对字符串进行解析
  while (!isEnd(context, ancestors)) {
    let node
    // 只有 DATA 模式和 RCDATA 模式才支持插值节点的解析
    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {
      // 只有 DATA 模式才支持标签节点的解析
      if (mode === TextModes.DATA && source[0] === '<') {
        if (source[1] === '!') {
          if (source.startsWith('<!--')) {
            // 注释
            node = parseComment(context)
          } else if (source.startsWith('<![CDATA[')) {
            // CDATA
            node = parseCDATA(context, ancestors)
          }
        } else if (source[1] === '/') {
          // 结束标签，这里需要抛出错误
          console.error('无效的结束标签')
          continue
        } else if (/[a-z]/i.test(source[1])) {
          // 标签
          node = parseElement(context, ancestors)
        }
      } else if (source.startsWith('{{')) {
        // 解析插值
        node = parseInterpolation(context)
      }
    }

    // node 不存在，说明处理其他模式，即非 DATA 模式且非 RCDATA 模式
    // 这时一切内容作为文本处理
    if (!node) {
      // 解析文本节点
      node = parseText(context)
    }

    // 将节点添加到 nodes 数组中
    nodes.push(node)
  }

  // 当 while 循环停止后，说明子节点解析完毕，返回子节点
  return nodes
}

function isEnd(context, ancestors) {
  // 当模板内容解析完毕后，停止
  if (!context.source) return true

  // 与父级节点栈中所有节点比较
  for (let i = ancestors.length - 1; i >= 0; --i) {
    // 只要栈中存在与当前结束标签同名的节点，就停止状态机
    if (context.source.startsWith(`</${ancestors[i].tag}`)) {
      return true
    }
  }
}

// const template = `<div>
//   <p>Text1</>
//   <p>Text2</>
// </div>`
const template = `<div>+--<p>Text1</p>+--<p>Text2</p>+</div>`

function parseElement(context, ancestors) {
  // 解析开始标签
  const element = parseTag(context)
  if (element.isSelfClosing) return element

  // 切换正确的文本模式
  if (element.tag === 'textarea' || element.tag === 'title') {
    // 如果由 parseTag 解析得到的标签是 <textarea> 或 <title>，则切换到 RCDATA 模式
    context.mode = TextModes.RCDATA
  } else if (/style|xmp|iframe|noembed|noframes|noscript/.test(element.tag)) {
    // 如果由 parseTag 解析得到的标签是
    // <style>、<xmp>、<iframe>、<noembed>、<noframes>、<noscript>
    // 则切换到 RAWTEXT 模式
    context.mode = TextModes.RAETEXT
  } else {
    // 否则切换到 DATA 模式
    context.mode = TextModes.DATA
  }

  ancestors.push(element)
  element.children = parseChildren(context, ancestors)
  ancestors.pop()

  if (context.source.startsWith(`</${element.tag}`)) {
    parseTag(context, 'end')
  } else {
    // 缺少闭合标签
    console.log(`${element.tag} 标签缺少闭合标签`)
  }

  return element
}

// 由于 parseTag 既用来处理开始标签，也用来处理结束标签，因为我们设计第二个参数 type
// 用来代表当前处理的是开始标签还是结束标签，type 的默认值为 'start'，即默认作为开始标签处理
function parseTag(context, type = 'start') {
  // 从上下文对象中拿到 advanceBy 函数
  const { advanceBy, advanceSpaces } = context

  // 处理开始标签和结束标签的正则表达式不同
  const match = type === 'start'
    // 匹配开始标签
    ? /^<([a-z][^\t\r\n\f />]*)/i.exec(context.source)
    // 匹配结束标签
    : /^<\/([a-z][^\t\r\n\f />]*)/i.exec(context.source)
  // 匹配成功后，正则表达式的第一个捕获组的值就是标签名称
  const tag = match[1]
  // 消费正则表达式匹配的全部内容，例如 '<div' 这段内容
  advanceBy(match[0].length)
  // 消费标签中无用的空白字符
  advanceSpaces()
  // 调用 parseAttributes 函数完成属性与执行的解析，并得到 props 数组
  // props 数组是由指令节点与属性节点共同组成的数组
  const props = parseAttributes(context)

  // 在消费匹配的内容后，如果字符串以 '/>' 开头，则说明这是一个自闭合标签
  const isSelfClosing = context.source.startsWith('/>')
  // 如果是自闭和标签，则消费 '/>'，否则消费 '>'
  advanceBy(isSelfClosing ? 2 : 1)

  // 返回标签节点
  return {
    type: 'Element',
    // 标签名称
    tag,
    // 标签的属性暂时留空
    props,
    // 子节点留空
    children: [],
    // 是否自闭合
    isSelfClosing
  }
}

function parseAttributes(context) {
  const { advanceBy, advanceSpaces } = context
  // 用来存储解析过程中产生的属性节点和指定节点
  const props = []

  // 开始 while 循环，不断地消费模板内容，直至遇到标签的 "结束部分" 为止
  while (
    !context.source.startsWith('>') && 
    !context.source.startsWith('/>')
  ) {
    // 解析属性或指令
    // 该正则用于匹配属性名称
    const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)

    // 得到属性名称
    const name = match[0]
    // 消费属性名称
    advanceBy(name.length)
    // 消费属性名称与等于号之间的空白字符
    advanceSpaces()
    // 消费等于号
    advanceBy(1)
    // 消费等于号与属性值之间的空白字符
    advanceSpaces()

    // 属性值
    let value = ''

    // 获取当前模板内容的第一个字符
    const quote = context.source[0]
    // 判断属性值是否被引号引用
    const isQuoted = quote === '"' || quote === "'"

    if (isQuoted) {
      // 属性值被引号引用，消费引号
      advanceBy(1)
      // 获取下一个引号的索引
      const enQuoteIndex = context.source.indexOf(quote)
      if (enQuoteIndex > -1) {
        // 获取下一个引号之前的内容作为属性值
        value = context.source.slice(0, enQuoteIndex)
        // 消费属性值
        advanceBy(value.length)
        // 消费引号
        advanceBy(1)
      } else {
        // 缺少引号错误
        console.error('缺少引号')
      }
    } else {
      // 说明属性值没有被引号引用
      // 下一个空白字符之前的内容全部作为属性值
      const match = /^[^\t\r\n\f >]+/.exec(context.source)
      // 获取属性值
      value = match[0]
      // 消费属性值
      advanceBy(value.length)
    }
    // 消费属性值后面的空白字符
    advanceSpaces()

    // 使用属性名称 + 属性值创建一个属性节点，添加到 props 数组中
    props.push({
      type: 'Attribute',
      name,
      value
    })
  }

  // 将解析结果返回
  return props
}

function parseText() {

}

// const ast = parse('<div id="foo" v-show="display"></div>')
const ast = parse('<div :id="dynamicId" @click="handler" v-on:mousedown="onMouseDown"></div>')

console.log(ast)
