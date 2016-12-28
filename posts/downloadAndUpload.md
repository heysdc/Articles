#浏览器的上传下载相关知识梳理

##js创建和下载文件

很多场景，比如在线编辑，有js创建文件后下载的需求

h5给**a标签**提供了download属性，有了这个属性，点击链接会下载链接指向的文件内容，比如download='a.jpg'，就会下载指向的图片。

如果是js生成文件呢？可以借助**URL.createObjectURL()**，传入的参数为File对象或者Blob对象，创建资源的DataURI提供给a的href属性即可。

##Data URI

上文提到了data URI, data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D, 这就是一个data URI, 就是将一个小文件编码后直接嵌入到文档里，省的再发网络请求了，比如这个base64,SGVsb...部分就表示用base64编码后的数据，还有些小坑可以看参考2

###MIME

Data URI中的text/plain是一种MIME类型，简单了解一下

MIME的全称multipurpose internet mail extensions, 指的一系列的电子邮件技术规范，主要rfc2045,rfc2046等等，是现在电子邮件实际上的标准

使用上需要在信件头部添加几条语句：

MIME-Version: 1.0，告诉这封信使用MIME规范

Content-Type: text/plain; charset="utf-8", 表明信息类型和采用的编码，缺省值为text/plain，包含主要类型/次要类型，主要类型有9种：application, audio, example, image, message, model, multipart, text, video,如果主要类型是text，还要提供编码类型charset，缺省值是ASCII，每一种主要类型下有许多次要类型, 常见的有：

	- text/plain纯文本，文件扩展名.text；

	- text/html，html文本，文件扩展名.htm, .html

	- image/jpeg, jpeg图片，扩展名.jpg

	- image/gif

	- audio/x-wave, .wav

	- audio/mpeg, .mp3

	- video/mpeg, .mpg

	- application/zip: .zip压缩文件

现在Content-Type也被移植到了HTTP协议中

电子邮件传统规范rfc822只支持ASCII编码，所以MIME规定了第三条语句Content-transfer-encoding: base64，规定了编码转换的方式，五种:7bit, 8bit, binary, quoted-printable, base64

最常用的就是quoted-printable, base64，前者主要用于ASCII文本中夹杂少量非ASCII码的情况，不适用于转换纯二进制文件，base64将二进制转换为传说中的64个字符

##File对象与Blob对象

###Blob对象

js历史上js无法处理二进制数据，如果非要处理，要用charCodeAt把字符编码转为二进制数据，或者将二进制数据用base64编码后再处理

所以es5引入Blod对象允许直接操作二进制数据，它是一个代表二进制的基本对象，在其基础上又衍生了一系列api用来操作文件。

- file对象，负责处理以文件形式存在的二进制数据，即操作本地文件

- fileList对象，针对表单的file控件

- FileReader对象：将二进制数据读入内存

- URL对象，将二进制数据生成URL

Blob(binary large object)对象代表了一段二进制数据，其他处理二进制数据的对象继承了它的属性和方法。

生成Blob对象的方法：使用Blob构造函数，对现有的Blob对象使用slice方法切出一部分

Blob构造函数接受两个参数，一是包含实际数据的数组，二是数据的类型

.slice(startByte, endByte)上传数据，参数为起始字节与终止字节，返回一新的Blob对象

Blob对象有两个只读属性，.size表示数据大小，.type为数据的MIME类型，小写，类型未知为空

```js
// 对象
var myBlob = new Blob(htmlParts, { "type" : "text\/xml" });
```

###FileList对象

针对表单的file控件, 用户通过以下file控件选取文件后，这个对象的files属性值就是FileList对象。通过拖放方式也可以得到FileList对象。结构上类似于数组。

```
<input type="file" id="input" onchange="console.log(this.files.length)" multiple />
```

###File对象

是FileList对象的成员，包含文件的信息如name, size, type, lastModified等等，具体可查查caniuse与w3c文档，还不是很稳定。

###FileReader API

用于读取文件，参数是File 对象或者Blob对象,对于不同类型的文件，FileReader提供了不同的方法读取文件

- readAsText()，读取文本文件，第一个参数是File或者Blob对象，第二个参数是前一个参数的编码方法，默认utf-8。为异步方法，一般监听onload事件，确定文件是否加载结束, 对象的result属性为读取后的text值

```js
var reader = new FileReader()
reader.onload = (e) => {
	var text = reader.result
}
reader.readAsText(file)
```

- readAsDataURL,作用就是读取一个文件转为一个通过base64编码的dataURI

```js
var reader = new FileReader();
reader.onload = function (e) {
	var dataURL = reader.result;
}
reader.readAsDataURL(file);
```

- readAsBinaryString, 读取任意类型文件，返回二进制数据，可与XMLHttpRequest.sendAsBinary方法结合使用上传文件到服务器

```js
var reader = new FileReader();
reader.onload = function(e) {
  var rawData = reader.result;
}
reader.readAsBinaryString(file);
```

- readAsArrayBuffer方法读取文件，返回一个类型化数组(ArrayBuffer)

FileReader还有一个abort方法，用于终止文件上传

FileReader对象采用异步方式读取文件，可以指定一系列事件回调函数。

```js
var reader = new FileReader()
reader.onabort = () => {
	// 终止触发
}
reader.onerror = () => {
	// 出错触发
}
reader.onload = () => {
	// 读取成功后触发
}
reader.onloadstart = () => {
	// 读取开始时触发
}
reader.onloadend = () => {
	// 读取完成后触发，不管是否成功
}
reader.onprogress = () => {
	// 周期性触发
}
```

##URL对象

用于生成指向File对象或者Blob对象的URL

即时同样的二进制数据每次使用`URL.createObjectURL(blob)`都会生成一个不一样的URL

URL的存在时间与网页的存在时间相同，网页刷新或者加载，URL就失效，URL.revokeObjectURL(objectURL)可以使之手动失效

##二进制数组

前面提到了ArrayBuffer对象，ArrayBuffer对象和TypedArray对象、DataView对象是Javascript操作二进制数据的一个接口。

###ArrayBuffer对象

代表内存中的一段**固定长度**的二进制数据，不能读写，只能通过**视图**（TypedArray视图和DataView视图）读写，**视图**的作用是以指定的格式解读二进制数据。

构造函数，参数为分配的内存大小，单位字节数

```js
var buf = new ArrayBuffer(10)
var dataView = new DataView(buf)
dataView.getUint8(0)
```

ArrayBuffer.prototype.byteLength, byteLength属性返回所分配内存的字节数。

ArrayBuffer.prototype.slice, 允许将内存区域的一部分，拷贝生成新的ArrayBuffer对象。

ArrayBuffer.prototype.isView(), 返回boll，表示是否为ArrayBuffer的视图实例。

###TypedArray对象

ArrayBuffer作为内存区域，可以存放多种类型的数据，同一段内存有不同的解读方式，这就是**视图**。

ArrayBuffer与正常数组类似，直接操作内存，速度更快，所有数组方法，在类型化数据上都能使用，区别：

- TypedArray数组的所有成员，都是同一种类型和格式。

- TypedArray数组的成员是连续的，不会有空位。

- 数据成员默认值0

- TypedArray数组只是一层视图，本身不存储数据，它的数据存储在底层的ArrayBuffer对象中

x86体系的计算机都采用小端字节序（即0x1234在32位计算机的内存中的存储为0x3412，大端相反），所以TypedArray也采用了大端字节序。但很多网络设备采用了大端字节序，js引入了DataView对象可设定字节序。

TypedArray对象一共九种类型的视图，9个构造函数。这些构造函数有多种用法。

####TypedArray(buffer, byteOffset=0, length)

```js
new Int8Array(buffer, startByte, byteLength) // 参数分别为ArrayBuffer实例，开始字节，字节长度（后两个参数要与建立的数据类型对应）
Uint8Array
Uint8ClampedArray // 无符号整数，长度1字节，溢出处理不同
Int16Array
Uint16Array
Int32Array
Uint32Array
Float32Array
Float64Array
```

####TypedArray(arrayLength)

直接分配内存生成。

####TypedArray(typedArray)

通过另一个视图生成。首先开辟一段新内存，然后将参数的内容复制过去，所以是两段不同的内容。`new TypedArray(typedArray.buffer)`可以基于同一段内存构造不同的视图。

####TypedArray(arrayLikeObject)

通过普通数组创造，也会重新开辟内存。也可以从TypedArray转回普通数组`Array.prototype.slice.call(typedArray)`

####TypedArray的属性与方法

TypedArray.prototype.buffer, 返回对应的ArrayBuffer对象

TypedArray.prototype.byteLength, 返回数组所占据的内存长度，单位为字节

TypedArray.prototype.byteOffset, 从ArrayBuffer的哪个字节开始

TypedArray.prototype.set(), 将一段内容完全复制到另一段内存

```js
var a = new Uint16Array(8);
var b = new Uint16Array(10);

b.set(a, 2) // 从b的第三个单位开始复制a
```

TypedArray.prototype.subarray(), 将TypedArray数组的一部分，再建立一个新的视图

TypedArray.prototype.from(loop, x => x*2), 接受一个可遍历的数据结构作为参数，返回一个基于这个结构的TypedArray实例，第二个参数类似于map方法

###ArrayBuffer与字符串的相互转换

```js
function buf2str(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf))
}
function str2buf(str) {
	var buf = new ArrayBuffer(str.length * 2)
	var arrayBuf = new UintArray(buf)
	for (var i = 0; i < str.length; i++) {
		buf[i] = str.charCodeAt(i)
	}
	return buf
}
```

###复合视图

由于视图可指定起始存储位置和长度，可对同一段ArrayBuffer存储不同类型的数据

###DataView视图

new DateView(ArrayBuffer, startPosition, byteLength), 获得视图，跟TypedArray类似

提供8 * 2个方法读写内存:

```js
var buffer = new ArrayBuffer(24);
var dv = new DataView(buffer);
var v1 = dv.getUint8(0) // 采用大端字节序从第一个字节开始读取一个8位无符号整数
var v1 = dv.setUint8(0, 25, true) // 采用小端字节序从第一个字节开始存储一个值位25的8位无符号整数
```

###溢出

不同的视图类型容纳的数值范围确定，超出范围出现溢出。TypedArray的溢出规则为去掉溢出的位，剩下的按照溢出规则解释。简单的转换规则：

- 正向溢出：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加余值，减1

- 负向溢出：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减余值，加1

Unit8ClampedArray视图的溢出规则，与上面的规则不同。规定，正向溢出，值一律等于当前数据类型最大值。负向溢出，最小值。

##参考

1. [浏览器端用js创建和下载文件](http://www.alloyteam.com/2014/01/use-js-file-download/)

2. [MDN, data URIs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)

3. [文件和二进制数据的操作](http://javascript.ruanyifeng.com/htmlapi/file.html)

4. [MIME笔记](http://www.ruanyifeng.com/blog/2008/06/mime.html)

5. [二进制数组](http://javascript.ruanyifeng.com/stdlib/arraybuffer.html)