// require - 引入模块
const http = require('http');
const server = http.createServer((req, res) => {
  res.write('hello c');
  res.end();
})
server.listen(3000);