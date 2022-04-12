const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/') {
    const data = fs.readFileSync('./index.html');
    res.end(data);
    return;
  }

  if (pathname === '/images/01.jpg') {
    const data = fs.readFileSync('./images/01.jpg');
    res.writeHead(200, {
      Expires: new Date(Date.now() + 1000 * 60).toUTCString()
    })
    res.end(data);
  }
  
  res.statusCode = 404; 
  res.end();
}).listen(3000, () => {
  console.log('listening 3000');
});