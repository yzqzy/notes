function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1
}

// interface Options {
//   width: number
// }

// function configure(x: Options | 'auto') {
//   // ...
// }

// configure({ width: 100 })
// configure('auto')
// configure('automatic') // 类型“"automatic"”的参数不能赋给类型“Options | "auto"”的参数。

// --------------------

function handleRequest(url: string, method: 'GET' | 'POST') {
  // do ...
}

// const req = { url: 'https://example.com', method: 'GET' }
// handleRequest(req.url, req.method) // 类型“string”的参数不能赋给类型“"GET" | "POST"”的参数。

// const req = { url: 'https://example.com', method: 'GET' as 'GET' }
// handleRequest(req.url, req.method)

// const req = { url: 'https://example.com', method: 'GET' }
// handleRequest(req.url, req.method as 'GET')

const req = { url: 'https://example.com', method: 'GET' } as const
handleRequest(req.url, req.method)
