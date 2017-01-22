#AJAX跨源资源共享

处于安全考虑，XHR对象实现的ajax，只能访问与包含它的页面处于同一域的资源，但有很多需求要求跨域

##浏览器的同源策略

同源策略限限制从一个源加载的文档或者脚本如何与来自另一个源的资源进行交互

IE是有例外的，比如不同端口也是同源

document.domain可以更改源，但如果非默认端口要带上端口号，且只能设置为当前域或者其父域

可能嵌入跨域资源的例子：

- script标签

- link标签，跨域要指定content-type

- img标签

- video标签

- object, embed, applet标签的插件

- 字体

- frame及iframe载入的资源，站点可食用X-Frame-Options的消息头阻止这种信息的交互

##CORS

CORS(cross-origin resource sharing, 跨域资源共享)是w3c的一个草案，定义了必须访问跨域资源时，浏览器和服务器应该如何沟通。

过程：

- 浏览器向服务器发送一个请求，加一个额外的Origin头信息，内容为请求页面的源（协议，域名和端口）

- 服务器根据这个头信息决定是否响应，如果认可，在Access-Control-Allow-Origin头部中发回相同的源信息

- 浏览器收到请求，有这个头部并且匹配，就会正常处理请求

##IE对CORS的实现

IE8中引入XDR类型，与XHR类似，但部分实现了W3C的CORS规范

##其他浏览器对CORS的实现

其他浏览器都通过XHR(XMLHttpRequest)对象实现了对XORS的原生支持，直接请求，可自动触发。

但出于安全考虑，有如下限制：

- 不能使用setRequestHeader设置头部

- 不能发送和接收cookie

- 调用getAllResponseHeaders()总会返回空字符串

##Preflighted Requests

CORS通过Prefligted Requests的服务器验证机制允许开发人员使用，自定义的头部、get或post以外的方法。就是先发个OPTIONS请求跟服务器商量商量，通过了再发正式的请求

过程：

- 浏览器发送请求，使用OPTIONS方法，发送以下头部：

  Origin：与简单请求相同

  Access-Control-Request-Methos: 请求使用的方法

  Access-Control-Request-Headers: 自定义的头信息，多个头信息用逗号分隔

- 服务器决定是否要使用这种类型的，决定就返回：

  Origin：与简单请求相同

  Access-Control-Request-Methos: 允许使用的方法

  Access-Control-Request-Headers: 允许使用的头信息，多个头信息用逗号分隔

  Access-Control-Max-Age：应该将这个Preflight请求缓存多长时间，单位秒

IE10及之前的都不支持

##带凭据的请求

默认情况下，跨域请求都是不带凭据的(cookie, HTTP认证及客户端SSL证明等)，可以通过设置XHR属性带上凭据

过程：

- 浏览器向服务器发送请求，通过将XHR对象的withCredentials属性设置为true，可以指定某个请求应该发送凭据

- 服务器如果接受带凭据的请求，返回的HTTP头为Access-Control-Allow-Credentials: true

- 浏览器检查服务器响应中是否包含该头部，没有则调用onerror事件处理机制

服务器也可以在Preflight请求的响应中加入该凭据。同样IE10不支持。

##其他跨域技术

CORS出现以前，也要实现跨域ajax通信。开发人员想出了一些办法，利用DOM能够跨域的原理，在不依赖XHR对象的情况下也能发送请求。

现在也仍在用，因为不需要服务器配合。

###图像Ping

img标签引用一个src地址，实质上是一个get请求，可以利用img可跨域的特点向服务器发送单向的请求。

通过监听load与error事件，虽然得到任何实质性的数据，但可以知道响应什么时候收到。

###JSONP

json with padding的简写，jsonp与json类似，只不过被包含在函数调用中

jsonp包含两部分：回调函数和数据

原理及过程：

- 创建一个script标签利用src请求一段js代码，src带个参数callback=，后面接回调函数的名字，本地把该回调函数准备好

  ```js
  function foo (data) {
    console.log('data!', data)
  }

  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = 'http://example.com/ip?callback=foo';
  document.body.appendChild(script);
  ```

- 服务器配合，返回一段jsonp代码，就是回调函数+参数

  ```js
  foo({
    a: 'a'
  })
  ```

- 浏览器端，由于是用script标签直接请求，所以请求到的js代码直接运行，就成功实现了处理回参

缺点：要保证请求数据的安全，确认是否失败不太容易，一般用作超时处理
