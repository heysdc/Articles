#数据存储

当web页面从普通展示页向web交互页面过度的时候，客户端存储数据的要求(比如登录信息)就出现了。

##Cookie

第一个本地存储方案为cookie，网景公司发明。HTTP请求中服务器在响应头中加入Set-Cookie，格式name=value;name2=value2，浏览器保存该信息。名值都为url编码。

之后浏览器向该服务器发送的同域名HTTP请求都会把cookie带上。

###限制

- 同域名

- 数量限制，保险20个；长度限制，保险4095b

###构成

- 名称：需url编码，不区分大小写

- 值：需url编码

- 域(domain)：cookie对于哪个域有效，所有向该域发送的请求中都会包含这个cookie，可设置子域，如果不设置默认为设置cookie的域

- 路径（path）：只向指定域的指定路径发送请求才会带上cookie信息

- 失效时间（expires）：设置浏览器删除cookie的时间，GMT格式，默认情况，浏览器会话结束删除cookie

- 安全标示（secure）：只有在使用SSL连接的时候才发送到服务器

域、路径、失效时间、secure标示都是服务器给浏览器的指示，不会发送给服务器，只有名值对才会被发送

###js的cookie

####写入

document.cookie=，内容与set-cookie一致，不会覆盖，除非与已有cookie同名

###子cookie

将名值对放到值里，名1=名11=值11&名12=值12，克服cookie数量限制

##Web Storage

克服cookie带来的一些限制，无须持续地将数据发回服务器。Web Storage的两个主要目标：

1. 提供一种在cookie之外存储数据的途径

2. 提供一种存储大量可跨会话存在的数据的机制

###Storage类型

Storage类型提供如下方法：

- clear（), 删除所有值，firefox没有实现

- getItem(), 获得指定item的值

- key(index)，获得index位置处的值的名字

- removeItem(name)，删除name指定的名值对

- setItem(name, value), 赋值

只能存储字符串，存非字符串的会在存储之前转为字符串

localStorage，sessionStorage都是Storage的实例，`localStorage.__proto__ === Storage.prototype`

###sessionStorage对象

存储特定于某个会话的数据，保持到浏览器关闭。

可以刷新，但不可以跨页面，即时同一个url也不行，只能由最初给对象存储数据的页面访问到。

###localStorage对象

访问规则，同一域名、同一协议、同一端口。持久保存客户端数据。

###storage事件

###限制

以源为单位，保险sessionStorage与localStorage都是2.5MB

