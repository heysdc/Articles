#同源策略

浏览器的安全基石是同源策略(same-origin policy)

同源是指，协议、域名、端口相同

最初的用途是防止cookie共享，后来越来越严格，共有三种行为受到限制：

- cookie、LocalStorage和IndexDB无法获取

- DOM无法获得，两个网页不同源，无法拿到对方的DOM

- AJAX请求不能发送

##同源策略的含义

同源策略关注的是加载js所在的域，而不是js文件存放所在的域，比如你可以从别的地方引用一个jquery库，并不会受到同源策略的限制

浏览器在执行一个js脚本时，需要对这个脚本进行同源检测，如果加载这个脚本的页面和当前页面不同源，浏览器就会拒绝执行此脚本

通常允许跨域写操作(比如提交表单)，写的内容编程时确定，通常安全


但有时候有跨域的需求，可以采用如下方法:

##cookie跨域

可以通过设置document.domain共享一级域名相同的两个页面，比如a.example.com与b.example.com，都设置为example.com，则两个页面的cookie就能共享，但仅限cookie

服务器也可以在设置cookie的时候指定cookie所属域名为一级域名`set-cookie: domain=example.com`

##iframe

如果两个网页不同源，就无法拿到对方的dom，典型的例子是iframe窗口与window.open方法打开的窗口，父子窗口相互获取对方的dom就会报错

如果两窗口一级域名相同，二级不同，设置document.domain就可以拿到dom

对于不同源的网站，目前有三种方法，可以解决跨域窗口通信的问题

###片段识别符（fragment identifier)

片段识别符(fragment identifier)指的是URL#号后面的部分，如果只改变片段标识符，页面不会重新刷新

父窗口可以把信息写入子窗口的片段标识符

```js
// 父
var src = originURL + '#' + data
document.getElementById('frame').src = src
// 子
window.onhashchange = () => {
  var message = window.location.hash
}
// 子窗口也可以改变父窗口的
parent.location.hash = target + '#' + hash
```

###window.name

浏览器窗口有个window.name属性，无论是否同源，只要在同一个窗口(比如frame)，前一个网页设置了这个属性，后一个网页依然可以访问。

比如域a的页面，保存window.name，跳转域b的页面，可读取window.name属性

所以可作如下的iframe跨域传输：

1. 域a主页面嵌套域b的子页面

2. 域b子页面保存信息至子页面的window.name

3. 域b子页面跳转至域a子页面

4. 这样父子页面是同域的，父窗口就可以读取子窗口的window.name了。`var data = document.getElementById('myFrame').contentWindow.name;`

###window.postMessage

HTML5引入了全新的官方API，window.postMessage, 跨文档通信API(cross-document messaging)，允许跨窗口通信，不论两个窗口是否同源

```js
// 发
var popUp = window.open('http://a.com', 'title')
popUp.postMessage(info, 'http://a.com')
// 收
window.addEventListener('message', (e) => {
  console.log(e.data)
})
```

postMessage的第一个参数是具体的内容，第二个参数是接受消息的源，父子窗口都可以通过message事件，监听对方的消息。

message事件的事件对象event的属性：

- event.source: 发送消息的窗口

- event.origin: 消息发向的网址

- event.data: 消息内容

##LocalStorage

可以借助postMessage以及window.name等完成LocalStorage的传递

##AJAX

参见AJAX跨域资源共享

##参考

1. [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)