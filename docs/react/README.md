---
sidebarDepth: 3
---

# 基础

![React项目初始界面](./imgs/react-hello.png)

## JSX

- 类似 `const element = <h1>Hello,world!</h1>;` 的奇怪标签语法；
- 既不是字符串也不是HTML；
- 一种JavaScript的语法扩展；
- 用来声明 React 当中的元素。

### 优点

- JSX **执行更快** --> 它在编译为JavaScript代码后进行了优化；
- 它是 **类型安全** 的 --> 在编译过程中就能发现错误；
- 使用JSX编写模板更加 **简单快速**；

### 语法

**a、只能有一个顶级父元素：**
```jsx
const App = (
  <div>
    <h1>SamyeChan</h1>
    <p>web前端高级工程师</p>
  </div>
  <div>第二个</div>  // 如果这里再有一个元素会出错。
);  

// 需注意：如果输出多行结构，可以使用一对小括号来包含整个结构
```

**b、可以使用 `{ ... }` 嵌入表达式：**
```jsx
let name = 'SamyeChan';
let title = 'web前端高级工程师';
const App = (
  <div>
    <h1>{name}</h1>
    <p>{title}</p>
  </div>
);

//注意：要分清楚语句和表达式的区别。像if、for、while这些都是语句，JSX不支持语句。
```

**c、JSX中的注释也与其他不同：**
```jsx
<div>
  {/*注释*/}
  {/*
    多行注释
  */}
</div>
```
**d、表达式也可以使用在属性上，但是使用的时候需要注意：**

- 当在属性中使用 {} 的时候，不需要使用引号包含。
```jsx
let id = 'kaikeba';

// 错误
const App = (
  <div id="{id}"></div>
);

// 正确
const App = (
  <div id={id}></div>
);
```

注意: 在JSX中 className 代替class,htmlFor 代替for 使用。

## 列表渲染

如果需要渲染一组数据，我们可以通过遍历（数组遍历、对象变量……）等操作，返回一组 JSX。

```js
// demo 数据
let zMouse = {
  name: '子鼠',
  gender: '男',
  skills: ['JavaScript', 'Node.js'],
  interests: ['音乐', '足球', '编程']
};
```
**a、数组:**

```jsx
function getSkills() {
  return (
    <ul>{zMouse.skills.map(skill => <li>{skill}</li>)}</ul>
  );
}
const App = (
  <div>{getSkills()}</div>
);
```

**b、对象:**

```jsx
function getKeys() {
  let arr = [];
  for (let k in zMouse) {
    arr.push(<li>{k}</li>);
  }
  return arr;
}

const App = (
  <div>
    <ul>{getKeys()}</ul>
  </div>
);
```

## 组件

**a、函数式组件：**

```jsx
function Kaikeba() {
  return (
    <div>
      <h2>开课吧!</h2>
    </div>
  );
}
ReactDOM.render(
  <Kaikeba />,
  document.getElementById('app')
);
```
- 函数的名称就是组件的名称，必须是首字母大写；
- 函数的返回值就是组件要渲染的内容；

**b.类组件：**

```jsx
class Miaov extends React.Component {
  render() {
    return (
      <div>
        <h2>妙味！</h2>
      </div>
    );
  }
}
```
- 组件类必须继承 React.Component；
- 组件类必须有 render方法；
- render 方法的返回值就是组件要渲染的内容；
- 类的名称（组件的名称），也必须是首字母大写；

### 组件传参

- 使用组件的时候通过 `标签属性 - property` 的方式传入数据；
- 在组件内部通过构造函数参数（如果是函数组件，则通过函数参数）来接收传入的数据；

```jsx
<组件名称 属性名称="值" />
// 使用表达式
<组件名称 属性名称={表达式} />
```
```jsx
ReactDOM.render(
    <FriendList datas={datas} />,
    document.getElementById('app')
);
```

### 接收参数
 
- 函数式组件：通过函数的第一个参数来接收；
- 类式组件：通过类的 prop 属性接收；
- 无论是函数式组件还是类式组件，都会把传入的参数组装成一个对象：

```jsx
<组件名称 属性名称1="值1" 属性名称二={表达式二} />
/**
 * 函数创建的组件是无状态组件，没有state，没有生命周期方法，它是一种只负责展示的纯组件
 */
// 函数式组件
function 组件名称(参数) {
  // 参数的结构为
  参数 = {
          属性名称1: "值1",
          属性名称二: 表达式二的值
        }
  return <div>组件结构</div>
}
// 类式组件
class 组件名称 extends React.Component {
  constructor(参数) {
    super(参数);
  
    this.props = {
      属性名称1: "值1"，
      属性名称2: 表达式二的值
    }
  }

  render() {
    return <div>组件结构</div>
  }
}
```
在类式组件中，需要注意：
- 当子类重写 constructor，则必须调用父类 super；
- 把接收到的参数传入父类构造函数，父类构造函数中会创建一个对象属性：props 类存储传入的参数数据；

### 组件状态

**组件状态是什么？**

状态被用来存储组件在某段时间内状态改变的信息。
用户事件或系统事件会导致一些典型的状态改变。
（比如，对用户输入的回应，服务器的请求， 生命周期函数）

**组件 state 工作是这样的：**

先给组件设置一个默认状态，再获取当前状态，最后更新这个状态

**修改State的正确姿势**

1. 不能直接修改State。

在React中，直接修改state并不会触发render函数，所以下面的写法是错误的。

```jsx
this.state.title = 'React';   // 错误
```
    
2. 组件的State只能通过setState()方式进行修改。例如：
```jsx
this.setState({title: 'React'});     // 正确
```