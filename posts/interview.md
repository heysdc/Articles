# web面试知识点

## 强缓存

命中则返回200，从from memory或from disk

### Cache-Control:max-age=10

这个请求发送后10毫秒内再发送，命中强缓存

### Expires:Date()

过期时间，指定日期内再次加载资源，强缓存

### 区别

前者1.1，后者1.0，前者优先级高

## 协商缓存

命中返回304，不命中返回200

### Etag和If-None-Match

服务器返回资源的Etag，表示资源唯一标识，下次请求会放到If-None-Match上

### Last-Modified和If-Modified-Since

服务器返回资源上次修改时间，下次请求放到If-Modified-Since询问服务器从那以后是否有修改

### 区别

Etag优先级高，性能差，精度高

## 不缓存

### Cache-Control:no-store

## 强制协商缓存

### Cache-Control:max-age=0或者Cache-Control:no-cache

# Event Loop

实现异步的一种方式

## macro tasks

Macrotasks包含生成dom对象、解析HTML、执行主线程js代码、更改当前URL还有其他的一些事件如页面加载、输入、网络事件和定时器事件。从浏览器的角度来看，macrotask代表一些离散的独立的工作。当执行完一个task后，浏览器可以继续其他的工作如页面重渲染和垃圾回收。

- setTimeout

- setInterval

- event cb

- 执行js主线程代码

## micro tasks

Microtasks则是完成一些更新应用程序状态的较小任务，如处理promise的回调和DOM的修改，这些任务在浏览器重渲染前执行。Microtask应该以异步的方式尽快执行，其开销比执行一个新的macrotask要小。Microtasks使得我们可以在UI重渲染之前执行某些任务，从而避免了不必要的UI渲染，这些渲染可能导致显示的应用程序状态不一致。

## requestAnimationFrame处于页面渲染阶段
