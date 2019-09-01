// AMD sea.js  |  CMD require.js
console.log('我是 index.js');
// require('./demo');

/**
 * 用一个对象来接收
 */
let demo = require('./demo');
console.log(demo);
console.log(demo.name);
let dc = new demo.Dancer();
dc.interested();