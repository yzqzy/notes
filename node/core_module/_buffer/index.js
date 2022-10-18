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

{
  // fill

  {
    const buffer = Buffer.alloc(6)

    // 将给定数据填充到 buffer 中
    // 如果给定数据不能全部填充，这时会将数据反复填充
    buffer.fill('123')

    console.log(buffer) // <Buffer 31 32 33 31 32 33>
    console.log(buffer.toString()) // 123123
  }

  {
    const buffer = Buffer.alloc(6)

    // 如果填充数据超出最大长度，会截断
    buffer.fill('123456789')
    console.log(buffer) // <Buffer 31 32 33 34 35 36>
    console.log(buffer.toString()) // 123
  }

  {
    const buffer = Buffer.alloc(6)

    // fill 第二个参数代表起始位置
    buffer.fill('123', 1)
    console.log(buffer) // <Buffer 00 31 32 33 31 32>
    console.log(buffer.toString()) // 12312
  }

  {
    const buffer = Buffer.alloc(6)

    // fill 第三个参数代表结束位置
    buffer.fill('123', 1, 3)
    console.log(buffer) // <Buffer 00 31 32 00 00 00>
    console.log(buffer.toString()) // 12
  }

  {
    const buffer = Buffer.alloc(6)

    // 16 进制 7b
    buffer.fill(123)
    console.log(buffer) // <Buffer 7b 7b 7b 7b 7b 7b>
    console.log(buffer.toString()) // {{{{{{
  }
}

console.log('-----------------------------')

{
  // write

  {
    const buffer = Buffer.alloc(6)

    // 和 fill 不同点在于不会重复写入数据
    buffer.write('123')

    console.log(buffer) // <Buffer 31 32 33 00 00 00>
    console.log(buffer.toString()) // 123
  }

  {
    const buffer = Buffer.alloc(6)

    // 第二个参数代表从 buffer 哪个位置开始写入
    // 第三个参数代表当前要写入的长度
    buffer.write('123', 1, 2)

    console.log(buffer) // <Buffer 00 31 32 00 00 00>
    console.log(buffer.toString()) // 12
  }
}

console.log('-----------------------------')

{
  // toString

  {
    const buffer = Buffer.from('月落')

    console.log(buffer) // <Buffer e6 9c 88 e8 90 bd>
    console.log(buffer.toString()) // 月落
  }

  {
    const buffer = Buffer.from('月落')

    console.log(buffer) // <Buffer e6 9c 88 e8 90 bd>
    console.log(buffer.toString('utf-8')) // 月落
  }

  {
    const buffer = Buffer.from('月落')

    console.log(buffer) // <Buffer e6 9c 88 e8 90 bd>
    // utf-8 编码值，一个汉字三个子节
    console.log(buffer.toString('utf-8', 3)) // 落
  }

  {
    const buffer = Buffer.from('月落')

    console.log(buffer) // <Buffer e6 9c 88 e8 90 bd>
    console.log(buffer.toString('utf-8', 3, 9)) // 落
  }
}

console.log('-----------------------------')

{
  // slice

  {
    const buffer1 = Buffer.from('月落')
    console.log(buffer1) // <Buffer e6 9c 88 e8 90 bd>
    console.log(buffer1.toString()) // 月落

    const buffer2 = buffer1.slice()
    console.log(buffer2) // <Buffer e6 9c 88 e8 90 bd>
    console.log(buffer2.toString()) // 月落

    const buffer3 = buffer1.slice(3)
    console.log(buffer3) // <Buffer e8 90 bd>
    console.log(buffer3.toString()) // 落

    const buffer4 = buffer1.slice(-6)
    console.log(buffer4) // <Buffer e6 9c 88 e8 90 bd>
    console.log(buffer4.toString()) // 月落
  }
}

console.log('-----------------------------')

{
  // indexOf

  {
    const buffer = Buffer.from('月落月落月落')
    console.log(buffer) // <Buffer e6 9c 88 e8 90 bd e6 9c 88 e8 90 bd e6 9c 88 e8 90 bd>
    console.log(buffer.toString()) // 月落月落月落

    console.log(buffer.indexOf('月')) // 0
    console.log(buffer.indexOf('月', 3)) // 6

    console.log(buffer.indexOf('月H', 3)) // -1
  }
}

console.log('-----------------------------')

{
  // copy

  {
    const buffer1 = Buffer.from('月落')
    const buffer2 = Buffer.alloc(6)

    // 将 buufer1 的数据拷贝到 buffer2 中
    buffer1.copy(buffer2)

    console.log(buffer1.toString()) // 月落
    console.log(buffer2.toString()) // 月落
  }

  {
    const buffer1 = Buffer.from('月落')
    const buffer2 = Buffer.alloc(6)

    // 第二个参数代表需要填充的起始位置
    buffer1.copy(buffer2, 3)

    console.log(buffer1.toString()) // 月落
    console.log(buffer2.toString()) // 月
  }

  {
    const buffer1 = Buffer.from('月落')
    const buffer2 = Buffer.alloc(6)

    // 第三个参数代表原数据的开始读取位置
    buffer1.copy(buffer2, 3, 3)

    console.log(buffer1.toString()) // 月落
    console.log(buffer2.toString()) // 落
  }

  {
    const buffer1 = Buffer.from('月落')
    const buffer2 = Buffer.alloc(6)

    // 第四个参数代表原数据的结束读取位置
    buffer1.copy(buffer2, 3, 3, 6)

    console.log(buffer1.toString()) // 月落
    console.log(buffer2.toString()) // 落
  }

  {
    const buffer1 = Buffer.from('月落月落')
    const buffer2 = Buffer.alloc(9)

    // 第四个参数代表原数据的结束读取位置
    buffer1.copy(buffer2, 3, 3, 9)

    console.log(buffer1.toString()) // 月落月落
    console.log(buffer2.toString()) // 落月
  }
}

console.log('---------------------------------------------------------------------')

{
  // concat

  {
    const buffer1 = Buffer.from('月落')
    const buffer2 = Buffer.from(' heora')

    const buffer3 = Buffer.concat([buffer1, buffer2])

    console.log(buffer3) // <Buffer e6 9c 88 e8 90 bd 20 68 65 6f 72 61>
    console.log(buffer3.toString()) // 月落 heora
  }

  {
    const buffer1 = Buffer.from('月落')
    const buffer2 = Buffer.from(' heora')

    // 可以使用第二个参数限制 buffer 长度
    const buffer3 = Buffer.concat([buffer1, buffer2], 9)

    console.log(buffer3) // <Buffer e6 9c 88 e8 90 bd 20 68 65>
    console.log(buffer3.toString()) // 月落 he
  }
}

console.log('-----------------------------')

{
  // isBuffer

  {
    const buffer1 = Buffer.alloc(3)
    console.log(Buffer.isBuffer(buffer1)) // true

    const buffer2 = 3
    console.log(Buffer.isBuffer(buffer2)) // false
  }
}

console.log('---------------------------------------------------------------------')

{
  Buffer.prototype.split = function (sep) {
    const len = Buffer.from(sep).length
    const ans = []

    let start = 0
    let offset = 0

    while ((offset = this.indexOf(sep, start)) !== -1) {
      ans.push(this.slice(start, offset))
      start = offset + len
    }

    ans.push(this.slice(start))

    return ans
  }

  const buffer = Buffer.from('月落爱学习爱工作爱骑行爱健身爱')

  const bufferArr = buffer.split('爱')

  console.log(bufferArr)
  // [
  //   <Buffer e6 9c 88 e8 90 bd>,
  //   <Buffer e5 ad a6 e4 b9 a0>,
  //   <Buffer e5 b7 a5 e4 bd 9c>,
  //   <Buffer e9 aa 91 e8 a1 8c>,
  //   <Buffer e5 81 a5 e8 ba ab>,
  //   <Buffer >
  // ]

  console.log(bufferArr.map(buf => buf.toString())) // [ '月落', '学习', '工作', '骑行', '健身', '' ]
}
