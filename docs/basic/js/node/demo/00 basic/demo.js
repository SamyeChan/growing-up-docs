console.log('我是 demo.js');
let name = 'samyechan';
class Dancer {
  constructor () {
    this.name = 'samyechan';
  }
  interested () {
    console.log('LOCKING');
  }
}

/**
 * 将变量以对象形式导出
 */
module.exports = {
  name,
  Dancer
}

/**
 * exports 是 module.exports 的引用
 * module.exports = exports
 * 
 */
// exports.a = a;
// exports.Dancer = Dancer;