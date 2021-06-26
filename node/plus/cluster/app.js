const fs = require('fs');
const http = require('http');
const path = require('path');

http.createServer((req, res) => {
  res.writeHead(200, { 
    'content-type': 'text/html'
  });
  res.end(
    fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
  )
}).listen(3000, () => {
  console.log(`listening 3000`);
});