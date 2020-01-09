const fs = require('fs'); // 文件操作

// 
fs.writeFile('1.txt', 'babababa', function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('success');
})