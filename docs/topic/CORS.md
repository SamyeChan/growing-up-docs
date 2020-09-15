## options请求

[掘金 | http请求发生两次（原来是options请求）](https://juejin.im/post/5f0dd54df265da230c20a226)

---

#### 跨域请求

当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，此时会发起一个跨域HTTP请求。

#### CORS 跨域资源共享

- Cross-origin resource sharing，一个W3C标准，可克服同源策略的限制；
- 浏览器将 CORS 请求分为2类：
	1. 简单请求；
	2. 非简单请求； --> 浏览器必先使用 OPTIONS 方法发起一个预检请求（preflight request）- 获知服务器是否允许该跨域请求 --> 服务器确认允许 --> 发起实际的HTTP请求。
	
### OPTIONS 请求场景

#### 简单请求

//！FIXME
满足下列条件：

```
1. 使用下列方法之一：GET / HEAD / POST;
2. 允许人为设置的字段为 Fetch规范定义的对 CORS 安全的首部字段集合：
Accept / Accept-Language / Content-Language / Content-Type / DPR / Downlink / Save-Data / Viewport-Width / Width
3. Conent-Type 的值仅限于下列三者之一：
text/plain、multipart/form-data、application/x-www-form-urlencoded
4. 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器 --> XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问；
5. 请求中没有使用 ReadableStream 对象；
```

#### 非简单请求

不满足以上，即为非简单请求（--> 在正式通信前，浏览器会先向服务器发起一次OPTIONS请求，即预检请求 --> 晓得服务器是否允许该实际请求 --> 避免跨域请求对服务器产生未预期影响）；

Q：每次非简单请求都去进行 OPTIONS请求 --> 不合理叭
A：两张方式解决：
	1. 全部用简单请求 --> 太粗暴了叭；
	2. Access-Control-Max-Age --> 该响应头表示预请求的返回结果 --> 即：Access-Control-Allow-Methods / Access-Control-Allow-Headers 可以被缓存多久（单位：s）--> 服务端设置；



















