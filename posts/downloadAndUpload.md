#浏览器的上传下载相关知识梳理

##js创建和下载文件

很多场景，比如在线编辑，有js创建文件后下载的需求

h5给**a标签**提供了download属性，有了这个属性，点击链接会下载链接指向的文件内容，比如download='a.jpg'，就会下载指向的图片。

如果是js生成文件呢？可以借助**URL.createObjectURL()**，传入的参数为File对象或者Blob对象，创建资源的DataURI提供给a的href属性即可。

##Data URI

上文提到了data URI, data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D, 这就是一个data URI, 就是将一个小文件编码后直接嵌入到文档里，省的再发网络请求了，比如这个base64,SGVsb...部分就表示用base64编码后的数据，还有些小坑可以看参考2

##File对象与Blob对象

历史上js无法处理二进制数据，如果非要处理，要将文字编码与二进制数据一点点转换，或者将二进制数据转位base64编码



##参考

1. [浏览器端用js创建和下载文件](http://www.alloyteam.com/2014/01/use-js-file-download/)

2. [MDN, data URIs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)

3. [文件和二进制数据的操作](http://javascript.ruanyifeng.com/htmlapi/file.html)