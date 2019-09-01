// let name = "I'm a.js";
// export default name;
export let age = 23;
export let age2 = 22;
export let age3 = 33;

console.log('这种console的逻辑还是会执行的，但上面那个就不行了噢');

/**
 * 1- export defalut xxx; --> 每个文件只能导出一个
 * 1- import xxx from './a.js'
 * 
 * 2- export let a = 35; --> 一个或多个
 *    export let b = 23;
 * 2- import { a, b } from './a.js';
 * 
 * 3- import * as obj from './a.js';
 * 
 * 4- export { a, b };
 */