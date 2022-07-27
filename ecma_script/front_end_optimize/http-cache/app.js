const http = require('http');
const fs = require('fs');
const url = require('url');
const etag = require('etag');

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/') {
    const data = fs.readFileSync('./index.html');
    res.end(data);
    return;
  }

  console.log(pathname);

  // 强制缓存
  if (pathname === '/images/01.jpg') {
    const data = fs.readFileSync('./images/01.jpg');
    res.writeHead(200, {
      Expires: new Date(Date.now() + 1000 * 60).toUTCString()
    })
    res.end(data);
    return;
  }
  if (pathname === '/images/02.jpg') {
    const data = fs.readFileSync('./images/02.jpg');
    res.writeHead(200, {
      'Cache-Control': 'max-age=60'
    })
    res.end(data);
    return;
  }

  // 协商缓存
  if (pathname === '/images/03.jpg') {
    const { mtime } = fs.statSync('./images/03.jpg'); // 文件修改时间
    const ifModifiedSince = req.headers['if-modified-since'];

    // 如果存在 ifModifiedSince 存在，并且 ifModifiedSince 等于 mtime，说明缓存生效
    if (ifModifiedSince && ifModifiedSince === mtime.toUTCString()) {
      res.statusCode = 304;
      res.end();
      return;
    }

    const data = fs.readFileSync('./images/03.jpg');

    res.setHeader('last-modified', mtime.toUTCString());
    res.setHeader('Cache-Control', 'no-cache');
    res.end(data);
    return;
  }
  if (pathname === '/images/04.jpg') {
    const data = fs.readFileSync('./images/04.jpg');
    const etagContent = etag(data);

    const ifNoneMatch = req.headers['if-none-match'];
    
    if (ifNoneMatch && ifNoneMatch === etagContent) {
      res.statusCode = 304;
      res.end();
      return;
    }

    res.setHeader('etag', etagContent); // 根据文件内容生成指纹信息
    res.setHeader('Cache-Control', 'no-cache');
    res.end(data);
    return;
  }
  
  res.statusCode = 404; 
  res.end();
}).listen(3000, () => {
  console.log('listening 3000');
});