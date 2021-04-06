# 安全 | CSRF

- Cross-site request forgery，跨站请求伪造；
- one click attack / session riding --> CSRF / XSRF；
- 伪造用户请求；

## 防御 CSRF 之道

1. 尽量使用 POST
2. 加入验证码
3. 验证 Referer
4. **Anti CSRF Token**（随机、存储于服务端）
  - 放在 head/form 里面
5. 加入自定义 Header

---

1. 什么是网络攻击？
2. 什么是CSRF？危害有哪些？
3. 浏览器如何访问服务器？服务器是如何进行用户认证的？（session & cookie）
4. CSRF 的攻击原理
5. CSRF 的预防
6. SCRF 与 XSS 的区别
7. CSRF 攻击模拟
8. 其他网络攻击方式介绍

[浏览器专题系列 - Web安全](https://juejin.cn/post/6926726800793927693?utm_source=gold_browser_extension)