const fs = require('fs')

const ws = fs.createWriteStream('test.txt', {
  highWaterMark: 3
})

let flag = ws.write('1')
console.log(flag) // true

flag = ws.write('2')
console.log(flag) // true

flag = ws.write('3')
console.log(flag) // false

// 如果 flag 为 false，并不意味当前数据不能被执行写入（flag 值仅代表上游产量问题）

// 1. 第一次调用 write 时，会把数据直接写入到文件中
// 2. 第二次调用 write，会把数据写入到缓存中
// 3. 生产速度和消费速度是不同的，一般情况下生产速度要比消费速度快很多
//    例如 highWaterMark 设置为 3 字节，假设生产者给出 5 个字节执行写入，那么在某个时间点就会超过水位线。
//    一旦超出水位线，write 结果就会返回 false 告知，仅代表警戒作用，不代表会溢出
// 4. 当 flag 之后，并不意味着当前次数据不能被写入，但是我们应该告知数据生产者，当前的消费速度已经跟不上生产速度，
//    所以这个时候，一般我们会将可读流的模式修改为暂停模式
// 5. 当数据生产者暂停之后，消费者会慢慢消费缓存中数据，直到可以再次执行写入操作
// 6. 当缓冲区可以继续写入数据时，应该如何告知生产者？ 使用 drain 事件

ws.on('drain', () => {
  console.log('drain trigger')
})
