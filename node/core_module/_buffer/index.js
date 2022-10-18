{
  const b1 = Buffer.alloc(10)
  // 16 进制数据
  console.log(b1) // <Buffer 00 00 00 00 00 00 00 00 00 00>

  const b2 = Buffer.allocUnsafe(10)
  // 可能存在未回收的空间用来创建新空间
  console.log(b2) // <Buffer 08 00 00 00 00 00 00 00 00 00>
}

{
  // 第一个参数可以接收三种类型，分别是字符串类型、数组类型、或者 buffer 类型
  // 第二个参数是字符编码，默认是 utf-8
  const b1 = Buffer.from('1')
  console.log(b1) // <Buffer 31>

  const b2 = Buffer.from('中')
  console.log(b2) // <Buffer e4 b8 ad>
  console.log(b2.toString()) // 中

  const b3 = Buffer.from([1, 2, 3])
  console.log(b3) // <Buffer 01 02 03>

  const b4 = Buffer.from([1, 2, '中'], 'utf-8')
  // 对于数组类型，如果我们想要使用中文，需要事先把中文转成十六进制数字
  console.log(b4) // <Buffer 01 02 00>

  const b5 = Buffer.from([0xe4, 0xb8, 0xad], 'utf-8')
  // 对于数组类型，如果我们想要使用中文，需要事先把中文转成十六进制数字
  console.log(b5) //<Buffer e4 b8 ad>
  console.log(b5.toString()) // 中

  const b6 = Buffer.from([0x60, 0b1001, 12])
  console.log(b6) // <Buffer 60 09 0c>
  console.log(b6.toString()) // `

  const b7 = Buffer.alloc(3)
  const b8 = Buffer.from(b7)
  console.log(b7) // <Buffer 00 00 00>
  console.log(b8) // <Buffer 00 00 00>

  b7[0] = 1
  // from 使用 buffer 类型，并不是共享空间，而是利用原有长度创建新空间
  console.log(b7) // <Buffer 01 00 00>
  console.log(b8) // <Buffer 00 00 00>
}

console.log('---------------------------------------------------------------------')
