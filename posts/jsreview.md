# javascriptReview
复习，js高级程序设计(第三版)，主要是记一下自己之前没记住的，温故知新；既然都看es5了，顺带看看es6

## 一、js简介
1. js起源：一开始网页是静态的，但得有交互啊，为了提交表单，弄了个js
2. js包括三部分：
  (1) emcascript，当年netscape与ie搞了俩js，为了统一，就找**ecma**弄了个js标准，规定了最基本的语法、类型、语句、操作符等
  (2) **dom**与（3）**bom**均为语言的扩展，即负责语言核心（ecmascript）与运行环境（通常为浏览器）的交互。dom为针对html的应用程序接口，即操控页面html的，但是后来又进行了扩展dom1级2级3级，除了对节点进行操作还能对dom样式、事件、验证、保存等进行一系列扩展操作等。dom一开始也是因为NI大战由w3c规划的，其它语言也有自己的dom标准如svg
  (3) **bom，browser object model**，控制浏览器显示页面以外的部分，习惯上把所有针对浏览器的js扩展都算作bom，如弹出新窗口，获取窗口信息，获取分辨率信息等，直到h5的出现，bom无标准的混乱状况才得到解决

## 二、在html中使用js
1. script标签为同步加载，不放head里因为加载js慢的话html加载不进来，导致页面空着，所以一般放最后，该标签还有个defer和async属性可选
2. script标签的defer, async属性
[](../imgs/113455688.png)

## 三、基本概念

- 语法
- 数据类型
- 流控制语句
- 函数

1. 严格模式：在js文件开始处或者函数内部开始处加个 "use strict"; 这是一个非常厉害的编译指示，用于告诉js引擎切换到严格模式，ie10以上才支持
2. 如果省略操作符var直接定义变量将直接创建一个全局变量
3. 基本数据类型：object, null, undefined, string, number, boolean
  typeof对应的值: 'object', 'object', 'undefined', 'string', 'number', 'boolean', 另外function为'function'
  undefined的意思是未初始化，使用未声明的变量会报错，typeof未声明变量为'undefined'
4. 为什么有了undefined还要有个null，null表示一个空对象指针，即当你想建一个对象时，可以使用null初始化，undefined派生自null，null == undefined但是null !== undefined
5. 想用八进制0开头且后面每位数都得小于8,十六进制0x开头
6. 不要测试某个特定的浮点数值，0.1+0.2 !== 0.3，特大或者特小的数1e2 === 100
7. js数值取值范围5e-324~1.8e308大了Infinity小了-Infinity，Number.NEGATIVE_INFINITY Number.POSITIVE_INFINITY分别保存极大值与极小值 isFinite()判断某个数是否超出范围
8. isNaN（）函数，判定转换完之后的数值（如果是对象先判断valueOf方法，不等则再调用toString（）方法）是否不是数，NaN与任何值都不相等，包括其自身
9. parseInt（） es5已经不自动识别八进制了，可以指定第二个参数，转换时使用的基数。二进制的相互转换：parseInt(num, 2)与num.toString(2)
10. 字符串中转义序列为反斜杠\如\n\t
11. emcascript中字符串可不改变，一旦创建，不可更改
12. 六种基本类型除了null、undefiend之外都有toString()方法，如果值可能为null或者undefined，可以采用String（）函数，其规则：1有toString（）方法调用这个，如果为null或者undefined返回‘null’，‘undefined’
13. es中对象就是一组数据与功能的集合（属性与方法）,Object类型是所有js实例的基础
14. Object所具有的方法.valueOf()返回对象的字符串、数值或者布尔值表示，通常与toString()方法的返回值相同
15. ECMA中的对象（即js内置对象）的属性和方法不一定适用于其它对象（浏览器环境中的对象bom、dom中的对象（宿主对象）以及自定义对象），即不一定继承自Object对象
16. 递增递减操作符，前置优先级与执行语句优先级相同，后知优先级较低，即1++ + 2为3，＋＋1 ＋ 2 为4，此操作符可以用于字符串对象等的计算，还是那套转换规则
17. 一元加减操作符业可以用于非数值，转换规则同Number（）方法，可以用于转换字符串＋‘－1’为－1
18. 乘性操作符＊／％操作数为非数值自动类型转换Number（）
19. +有任一个操作数为字符串，则另外的调用String()方法
20. 关系操作符（大小等于）如果都为字符串，比较的是首字母的字符编码值；如果一个是数字，另一个往数字转
21. 相等和不相等：先转换再比较，null, undefined不会被转换；全等不全等：直接比较，不转换
22. 逗号总会返回最后一项var a = (1, 2, 3, 4)注意括号，a为4
23. ecmascript对象属性没有顺序
24. label语句，在代码中加标签，以便将来适用 label:statement；常见的应用场合，与break continue配合使用,如label:for(){for(){if() break label;}}触发break直接终止内外两层循环
25. with语句with(obj){statement；}将代码作用域设置到特定的对象中，缺点：性能差，调试麻烦，不建议用
26. switch语句中，case的值可以为变量或表达式；switch在比较的时候不会发生类型转换
27. js中传参为按值传递，严格模式下不能修改arguments的值
28. 重载：为一个函数编写多个定义，在js中可以用检查arguments长度来变相实现
20. 非严格模式下，才可以修改arguments的值，与参数同步

## 四、变量、作用域和内存问题
1. js不允许直接访问内存中的位置，通过引用访问对象，这个引用实际上是指针
2. 检查基本类型可以用typeof，null返回object，检测具体对象可以用instanceof，检测是否为某个类型对象的实例
3. 执行环境(execution context)决定了变量或函数有权访问的其它数据，每个执行环境有个一个变量对象(vairable object)，环境中定义的所有变量和函数都保存在这个对象中
4. 全局环境为最外围的执行环境，宿主环境不同，执行环境的对象也不同，web浏览器中全局环境被认为是window对象
5. 某个环境中的所有代码执行完毕后，该环境被销毁，每个函数都有自己的执行环境，执行流进入一个函数，函数的环境被推入一个环境栈中，执行完弹出
6. 作用域链（scope chain）由变量对象组成，其前端指向当前的执行环境的变量对象，上一级为包含环境的变量对象，直至全局环境的变量对象，保证了对有权访问的所有变量和函数的有序访问

  ```js
  var a = 'a'
  function funcB() {console.log(a)}
  function funcD(funcE) {
    var a = 'aa'
    funcE()
  }
  funcD(funcB) // 结果为‘a’, 作用域链所包含的变量对象（更正，之前错误的想法为作用域链在定义时被决定），在函数定义的时候就已经被决定了，但变量对象的值除非运行到赋值代码或者存在函数声明的变量提升否则是undefined

  var a = 'a'
  function funcB() {console.log(b)}
  var b = 'b'
  function funcD(funcE) {
    var a = 'aa'
    var b = 'bb'
    funcE()
  }
  funcD(funcB) // 'b'
  ```
7. es5执行环境的类型有两种：全局与函数，但有其他办法延长作用域链with与catch
8. 搜索标识符顺着作用域链走，如果找到了就停了
9. 垃圾收集的两种策略：
  （1）标记清除（mark-and-sweep）进入环境标记为进入环境，离开环境标记为离开环境，标记为没用的变量定期清理一次，不同浏览器清理周期不同，可以主动调用垃圾收集方法，一般不推荐
  （2）引用计数（refrence counting），一个对象变量赋值给另外一个变量，引用次数＋1，包含这个值的变量取得了另外的值，则该值的引用次数－1，会由于循环引用导致内存泄露，ie9之前的dom bom对象采用引用计数策略，可能导致内存泄露
10. js优化内存的方法：解除全局对象的引用，局部对象在局部环境弹出的时候会被回收，然而全局对象不会，可以在不用的时候手动解除（赋null）
11. 分配给web浏览器的内存比分配给桌面程序的少，防止网页耗尽内存导致系统崩溃

## 五、引用类型
#### 对象
###### es5
1.  什么是引用类型？*ecmscript中，引用类型是一种数据结构，将数据和功能组织在一起，常被称为类*。引用类型也被称为**对象定义**，因为它们描述的是一类对象所具有的属性和方法。常见的引用类型如Object, Boolean, Array等等。对象是某个特定引用类型的实例。比如`var a = new Array()`可以理解为通过引用类型Array创建了一个数组实例，Array引用类为新对象定义了默认的属性和方法。
2.  `var a = {}`这里的｛表示表达式上下文的开始。*ecmascript中**表达式上下文（expression context）**指的是能返回一个值*，赋值后面要跟一个值，所以是表达式上下文。**语句上下文(statement context)**表示一个语句块的开始。如`if (expression context) {statement context}`
3.  `function func(args) { if (typeof args.name === 'string') {return} }`遇到需要传入大量可选参数的函数，最好用对象字面量封装多个可选参数


##### es6
1. 属性简洁表示法：`var a = {a, b () {}}`等同于`var a = {a: a, b: function(){}}`
2. Object.is(a, b)相当于a === b，不同的是NaN等于自身，正负0不相等。
3. Object.assign(targetObj, sourceObj...)将不同对象的属性浅赋值到对象对象中
4. es5三个忽略enumerable为false的属性(1)for in操作,遍历自身的和继承的可枚举属性(2)Object.keys()对象自身的可枚举属性键名，推荐用其替代for in(3)JSON.stringify();es6新增两个Object.assign,Reflect.enumerate()返回for in循环会遍历的属性
5. Object.getOwnPropertyDescriptor(obj, propertyName)获取属性的描述对象
6. es6提供了接口Object.setPrototypeOf(obj, prototype), Object.getPrototypeOf(obj)获得prototype对象，是es6正式推荐读写对象构造函数的prototype属性
7. **Rest参数**: `let {a, ...b} = {a: 1, b: 2, c: 3, d: 4}`从一个对象取值，将将所有可遍历但尚未读取的属性分配到指定的对象上；**扩展运算符**: 取出参数对象的所有可遍历属性复制到对象中，相当于assign，`let test = {x: 1, ..y} = Object.assign({x: 1}, y)`
*身体不舒服，待续*

#### 数组
1. length属性不是只读的，通过给它赋值可以增减数组长度
2. 一个页面多个框架，每个框架都有自己的全局执行环境，不同执行环境的构造函数Array构造函数不同
3. 判断数组方法，a instanceof Array, 更保险的Array.isArray()(ie9+)
4. push, unshift可以用来传多个值，返回数组长度，shift, pop返回从数组中删除的一项
5. sort((val1, val2) => val2 > val1)可以传入函数实现特定排序，reverse()相反排序
6. concat方法返回一个数组副本，参数为数组则将每一项分别添加
7. slice(起始项，最后一项的后一项)splice(起始项， 删除的项数，添加的项目)返回从数组中删除的项
8. indexOf,lastIndexOf,reduce,reduceRight(均为ie9+)后两者为归并方法，reduce((pre, cur, index, arr) => nextPre, firstPre)如果firstPre不指定则默认为第一项

##### es6
1. Array.from(arrLike, (val, key) => {this}, this),将类数组对象（即存在length属性）与内置iterator接口的数据结构变成数组,第二参数与map类似，如果里面用到this还可以用第三参数绑定this
2. Array.of()弥补Array()传入参数不同生成数组不同的尴尬
3. copyWithin(targetPos, start = 0, end = this.length)会修改当前数组
4. find()findIndex()参数为回调函数，查找符合条件的单位
5. fill(val, from, to)用指定的值填充起始位置，起始位置可选
6. values(),keys(),entries()返回一个遍历器对象，可用for of循环遍历
7. includes()是否包含指定值，主要对NaN支持较好另外语义明显点
8. 数组的空位，标示数组某一个位置没有任何值，也没有undefined，Array(3),es5对空位处理不一致（一般跳出join,toString按undefined处理），es6统一按undefined处理

#### Date
1. Date.parse()接受一个因地区而异的表示日期的字符串做参数，返回毫秒数；Date.UTC(year, monthFrom0, day, hourFrom0, minute, sec, millisec),也返回毫秒数。直接用构造函数会默认调用这两函数，只要传的参数对，不过若构造函数默认调用Date.UTC,则创造的时间是UTC时间。
2. 继承的与自带的日期格式化方法都没什么卵用，valueOf方法返回一个毫秒数；有用的方法有：

  ```js
  getFullYear()
  setFullYear() //参数四位数字
  getMonth() //start with 0
  setMonth()
  getDate() //月份的天数
  setDate()
  getDay() //weekday start with 0
  setDay()
  getHour() //hour start with 0
  setHour() //依次类推
  ```

#### RegExp
1. 正则表达式由pattern与flags部分组成

  ```js
  var expression = /pattern/flags
  var pattern2 = new RegExp("pattern", "flags")
  ```
  flags有g、i、m，i不区分大小写，m-mutiline多行模式，pattern所有元字符（正则中可能会用到的符号）要转义,构造函数采用字符串所以可能要双重转义
2. 方法, test（）参数为数组，判断匹配不匹配
3. 复习一下简单的正则吧

  ```js
  // 元字符们
  .除换行符以外的任意字符
  \w字符下划线数字汉字
  \s任意空白符
  \d数字
  ^字符串开始
  $字符串结束
  \b单词开始或者结束
  // 次数，放在后面，表示之前重复多少次
  *任意次
  +一次或更多次
  {a, b}不少于a，不大于b
  ？0或者1次
  // 字符类
  ［1-9］［aeiou］［0-9a－z］满足括号内条件
  ｜表示满足任一条件即可
  // 反义
  \W不是字母数字下划线汉字
  \S不是空白符
  \D不是数字
  \B不是单词开头或者结束
  [^0-9]不是数字的内容
  ```

#### Function
1. 函数实际上是对象，函数名只是指向函数对象的指针

  ```js
  var fun = new Function('param1', 'param2', 'return param1 + param2')
  ```
2. 变量提升：函数声明与表达式的区别在于声明存在变量提升，而表达式没有，定义变量均不存在变量提升

  ```js
  console.log(a(), b()) // wrong
  var a = function () {
  }
  var b = 1
  console.log(a.a()) //right
  var a = {
    a: function() {
      console.log(this.b())
    },
    b: function() {
      console.log('1')
    }
  }
  ```
3. arguments.callee指向arguments的函数
4. this：函数据以执行的环境对象, 所谓环境对象的概念与之前提到的执行环境（execution context），执行环境中的定义的变量函数的集合－变量对象（vairable object）以及代码执行过程中变量对象所串起来的的作用域链(scope chain)没多大关系，指的是‘函数作为某一对象的方法被调用’中的‘某一对象’,
5. 函数属性caller，保存调用当前函数的引用，全局作用域中其值为null，严格模式下，访问caller与callee会报错
6. 严格模式下，未指定对象直接调用函数，this不会指向widnow，为undefined
7. call,apply可以改变this指向，即改变‘函数作为某一对象的方法被调用’中的‘某一对象’，最大的好处是解除对象与方法之间的耦合关系
8. bind(ie9+)方法同apply，返回一个apply实例而已，需要把改变this这一行为固化下来，可以使用

  ```js
  var a = funcb.bind(objc) // objc里是不会多一个funcb方法的
  ```

#### 基本包装类型
1. 为了便于操作**基本类型值**, ecma提供了三个特殊的**引用类型**, *Boolean, Number, String*, 它们具有与各自基本类型相对应的特殊行为。为了便于操作，每当读取一个基本类型值，后台都会创建一个对应的**基本包装类型**对象，从而能够操作基本类型数据。
2. 基本包装类型的生存期为一行代码的执行瞬间，生成实例，进行操作，然后立即销毁，所以不能给为*基本类型值*添加属性和方法。
3. 使用new调用基本包装类型的构造函数，直接调用为调用转型函数。
4. 基本包装类型的方法，主要有以下三种类型：
  （1）只能作用于基本类型变量，目测Number的部分方法是这样

  ```js
  var variable = 10
  variable.isFixed(2) // '10.00'
  10.isFixed(2) // Error
  ```
  （2）可以直接作用于基本类型，目测Array的方法是这样的

  ```js
  'sb'.slice(0) // 'sb'
  ```
  （3）依附于构造函数对象作为函数调用，目测Number的部分方法是这样

  ```js
  Number.isFinite(5) // true
  ```

##### Number
1. 基本包装类型与基本类型不同，前者对象，后者基本类型
2. toFixed(a)按照指定小数位返回数值字符串，toExpotential(a)指数标志法a为小数位数，toPrecision(a)根据a（所有数字位数）自动判断用前两种方法

###### es6

```js
Number.isFinite(10) //true
Number.isNaN('NaN') //false 逐步减少全局函数，使语言模块化，与全局函数区别，不作自动类型转换
Number.parseInt('1.2') // 1
Number.parseFloat('1.2#') // 1.2
Number.isInteger(25.0) // true js里整数浮点数同样的存储方法，所以看作整数
Number.EPSILON // 为浮点数运算设置一个误差范围，误差常量
Number.isSafeInteger(2**53) //false **为es7的指数运算符，超过这个范围无法精确表示
```

##### String
1. charAt()与[]（ie8+）作用一样，charCodeAt()返回字符编码
2. subString(st, end);subStr(st, len);slice(st, end)不会修改字符串，负数情况下：第一个参数subString()转为0；第二个参数，subString,subStr均转为0;有点乱，建议用slice，subStr
3. indexOf,lastIndexOf接受第二个参数，从哪开始搜索
4. search(RegExp)返回索引
5. replace(RegExp/str, str/function(match, pos, origianlText){return replaceValue})第一个参数为字符串则只替换第一个
6. split(str/RegExp, arrayMaxLength)也可传正则，老浏览器用正则实现可能有差异
7. localeCompare（b）排在b前，返回负数，0相同
8. fromCharCode()接受一个或多个字符编码,返回一个字符串

###### es6
1. js内，字符以utf-16格式存储，每个字符固定为两个字节，四个字符es5就不一定能正确处理了，可以借助es6的字符串方法来处理codePointAt()(代替charCodeAt),at()(es7中的代替charAt)String.fromCodePoint(UTF-16字符)
2. 为了表示语调和重音符号，unicode提供两种方案：直接提供字符以及合成符号，js无法识别，normalize（）方法提供unicode正规化的统一方案
3.

  ```js
  includes(str, startPos)
  startsWith(str, startPos)
  endsWith(str, startPos)从startPos向前搜
  'sb'.repeat(3) // 'sbsbsb'
  ```
4. 字符串补全长度

  ```js
  'a'.padStart(5, 'ab') // 'ababa'
  's'.padEnd(5) // 's    '
  ```
5. 模版字符串中可以调用函数
6. **标签模版部分有待研究**

#### 单体内置对象
1. **单体内置对象**为ecmascript提供的不依赖于宿主环境的对象
2. **global**对象，所有全局函数与变量都是global对象的属性和方法
3. 用utf-8编码替换所有字符

  ```js
  encodeURI() // 只替换空格
  encodeURIComponent() // 替换所有非字母数字字符
  decodeURI()
  decodeURIComponent()
  ```
4. eval() 执行传入字符串js代码，不存在变量提升，代码在eval()执行的时候被创建
5. global对象的所有属性undefined, NaN, Infinity, Object, Array, Function, Boolean, String, Number, Date, RegExp, Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
6. 浏览器环境下一般将global对象的属性及方法作为window对象的一部分实现
7. Math对象提供的方法比自己写类似的快的多，常用的方法有

  ```js
  Math.random() // 返回一个0-1的随机数
  Math.max(a,b,c) // 返回最大值Max.max.apply(Math, array),类似的还有min
  Math.floor() // 向下取整
  Math.ceil() // 向上取整
  Math.round() // 四舍五入
  ```

## 六、面向对象的程序设计

#### 理解对象
1. 每个对象都是基于一个引用类型创建的，这个引用类型可以是原生或者自定义的
2. 对象的属性在创建时都带有一些特征值，js通过这些特征值来定义其行为
3. js属性分为两种,数据属性与访问器属性
4. 数据属性包含了一个数据值的位置，可读写值，其特性有（1）[[configurable]]能否删除属性、修改属性的特性、改变属性类型（2）[[enumerable]]是否可通过for in遍历（3）[[writable]]是否可修改（4）[[value]]数据值
5. 定义一个属性Object.defineProperty(对象，属性名，特性对象)，特性对象如不指定，均默认false，ie9+
6. 访问器属性，不包含数据值，即其特性没有[[value]]以及相关的[[writable]]，包含一对get与set函数，常见用法为设置一个属性的值导致其它属性值变化,ie9+
7. 详细定义多个属性Object.defineProperties()

  ```js
  Object.defineProperties(a, {
    va1: {
      value: 'val',
      enumerable: true,
      writable: true,
      configurable: true
    },
    va2: {
      get: function() {
        return this.va1
      },
      set: function(val) {
        this.va1 += val
      }
    }
  })
  ```
8. Object.getOwnPropertyDescriptor(obj, prop),取得给定属性的特性对象，ie9+

#### 创建对象
1. 读写操作中写是一个复合操作，首先要读（找到写入的位置）才能写，如a.b = 1，首先是读到a.b后再执行了写入操作
2. constructor属性定义在prototype上，指向prototype属性所在的构造函数

  ```js
  prototypeA.isPrototypeOf(obj) // 判断某个prototype是否为某个对象的__proto__属性
  Object.getPrototypeOf(obj) // 代替__proto__属性，es5定义，ie9+
  obj1.getOwnProperty('propertyName') // 检查是否有该名字的实例属性
  delete obj1.prop1 // 只会删除实例属性
  ```
3. 通过构造函数建完对象之后，对象通过prototype与构造函数保持联系，`obj.__proto__.constructor`指向构造函数，prototype为每个函数都有的一个属性，用处就是放点公用的东西
4. Object.keys(obj)返回对象所有可枚举实例属性数组，ie9+
5. 构造函数在不返回值的情况下，默认返回新对象实例，如果有返回值，可以重写调用构造函数时返回的值, 返回数组构造数组，返回对象构造对象
6. 稳妥构造函数，不用this,不用new，用于安全环境，基本上就是不用this的工厂模式

#### 继承
1. 原型链的基本思想，对象a的__proto__指向prototype，如果将prototype指向对象b,原型检索会在这断掉吗？不会，对象b也有自己的__proto__属性，最次也指向指向Object再指向Object的原型null即原型链的终点
2. ``原型链继承``：通过原型链继承，缺点，继承是将父级的变成自己的，而下面代码则不是，继承过来的对象是所有子级所公用的，改了b1的一个属性（继承而来），b2也变了

  ```js
  var A = function () {
    this.a = [1, 2]
  }
  A.prototype.getA = function () {
    return this.a
  }
  var B = function () {
    this.b = 'b'
  }
  B.prototype = new A() // 原型继承
  var b1 = new B()
  b1.getA() // [1,2]
  b2.a.push(3) // [1,2,3]
  var b2 = new B()
  b2.getA() // [1,2,3]
  ```

3. ``借用构造函数``: 通过在构造函数内调用构造函数达到继承父级构造函数的目的，缺点：如果采用这种方法定义，公用方法都要写在父级的构造函数内，无法实现基于原型链的链式继承

  ```js
  var A = function (a) { this.a = a }
  A.prototype.aa = 'aa'
  var B = function (b) {
    A.apply(this, b)
  }
  var b = new B('b')
  b.aa // undefined
  ```

4. ``组合继承``:

  ```js
  var A = function (a) {
    this.a = a
  }
  A.prototype.getA = function () {return a}
  var B = function (a) {
    A.apply(this, a) // 继承原型链的实例属性为自己的实例属性
  }
  B.prototype = new A() // 继承原型链，B.prototype里的a为undefined，被构造函数B里的a所覆盖
  var C = function (c) {
    B.apply(this, c) // 继续搞
  }
  C.prototype = new B()
  var c = new C('sb') // 'sb'
  ```
4. `原型式继承`：浅复制了目标对象的内容，与原型模式相同的是引用类型的属性与父级共享相同的值，与原型模式不同的是原型式继承也继承了目标对象原型的值

  ```js
  var object = function (o) {
    var newObj = function() {}
    newObj.prototype = o
    return new newObj()
  }
  ```
  Object.create(obj, {}), 只传一个参数，与object相同作用，第二个参数作用，与definedProperties()方法作用相同，ie9+

5.  组合继承里`B.prototype = new A()`这一步操作里的构造函数里的属性是被覆盖的，不好，需要继承的只是A的原型,即A的公共部分，这就是`寄生组合式继承`

  ```js
  var inheritFunc = function (sub, sup) {
    sub.prototype = Object.create(sup.prototype)
    sub.prototype.constructor = sub
  }
  ```

#### es6 Class
1. class为es5的syntactic sugar,其实是es5的构造函数与原型，但不能当普通函数调用

  ```js
  // es6
  class Point {
    constructor(x, y) { // 构造函数
      this.x = x
      this.y = y
    }

    getArr () { // 原型方法，不可枚举
      return [this.x, this.y]
    }
  }
  var newClass= new Class Me {} () // Me在class内部调用的时候用，用不着可省略，最后的括号立即调用

  // es5
  function Point (x, y) {
    this.x = x
    this.y = y
  }
  Point.prototype.getArr = function () { // 定义的方法可枚举
    return [this,x, this.y]
  }
  ```

2. es6私有方法的常见情况：

  ```
  // 1. 加下划线标示
  class Point () {
    _getValue () {}
  }
  // 2. 移到class外
  class Point () {
    getValue (sb) {
      getValues.apply(this, sb)
    }
  }
  function getValues (sb) {
    return this.snaff = sb
  }
  // 3. 利用symbol的唯一性，使第三方无法伪造属性值获取到私有方法
  const bar = Symbol('bar')
  const snaf = Symbol('snaf')
  class Point () {
    foo(baz) {
      this[baz](baz)
    }
    [baz](baz) {
      return this[snaf] = baz
    }
  }
  ```
3. this指向问题

  ```js
  class Point {
    constructor () {
      this.getValue = this.getValue.bind(this) // 1.new的时候即绑定this为Point
    }

    getValue () {
      this.test()
    }

    <!-- 2.也可以换成箭头函数，需要es7的支持好像，箭头函数的由于没有自己的this，所以在定义的时候就已经确定下来了
    getValue = () => {
      this.test()
    } -->

    test () {
      console.log('ss')
    }
  }

  var p = new Point()
  var d = p.getValue()
  d() // ss
  ```

4. es6继承,通过extends继承，super指代父级的this，子集没有自己的this，是在父级的this之上修饰得到的,所以子集必须先调用super才能调用this

  ```js
  class Point {
    constructor(x, y) { // 构造函数
      this.x = x
      this.y = y
    }

    getArr () { // 原型方法，不可枚举
      return [this.x, this.y]
    }
  }
  class ChildPoint extends Point {
    constructor(x, y, color) {
      super(x, y)
      this.color = 'red'
    }
  }
  ChildPoint.__proto__ === Point
  ```

5. es6可以通过extends继承内置构造函数如Array, Number等来创建自定义构造函数
6. es6的getter,setter

  ```js
  class Myclass {
    getter prop() {
      return 'prop'
    }
    setter prot (val) {
      console.log('i get a' + val)
    }
  }
  ```

7. 静态方法：加上static关键字的方法，只能直接通过类调用，不会被实例继承，但可以被子类继承
  
  ```js
  class Methos {
    static get() {
      console.log('static')
    }
  }
  Methos.get() //static
  var test = new Methos()
  test.get() // err
  class C extends Methos{
    constructor () {
      super()
      super.get() //static，可以通过super调用
    }
  }
  C.get() //static
  ```

8. es6中只有静态方法，没有静态属性，es7提案支持静态属性

9. new.target属性，构造函数中返回new命令作用的构造函数，class内部调用new.target，返回当前class

  ```js
  class Point {
    constructor (){
      if (new.target === Point) {
        throw new Error('本类不能实例化')
      }
    }
  }
  ```

## 七、函数表达式

#### 闭包
1. 经典问题如下代码，关键点在于：
  - var与let的区别，前者的作用域为所在的函数作用域，后者为所在的块级作用域
  - 变量解析的过程：顺着作用域链向上走
  - 函数内的变量的值在运行时确定
  前者相当于直接把i定义在了作用域1中，作用域2因为用到了i，而2中没有，顺着作用域链向上找，找到了1中定义的i，而当时i都变成9了；后者的话每次遍历都会生成一个新的作用域，里面有i，新作用域里的值在作用域1中是访问不到的，又因为这个作用域中的i值被外界引用`arr[i]`形成闭包，内容得不到释放，所在在最后运行的时候依然能访问到每一个小作用域2中生成时保存的值

  ```js
  function test(){ // 作用域1
    var arr = [];
    for(var i = 0;i < 10;i++){
      arr[i] = function(){ // 作用域2
        return i;
      };
    }
    for(var a = 0;a < 10;a++){
      console.log(arr[a]()); // 9,9,9,9,9,9,9,9,9
    }
  }
  test();

  function test(){ // 作用域1
    var arr = [];
    for(let i = 0;i < 10;i++){ // 作用域2
      arr[i] = function(){ // 作用域3
        return i;
      };
    }
    for(var a = 0;a < 10;a++){
      console.log(arr[a]()); // 1,2,3,4,5,6,7,8,9
    }
  }
  test();
  ```
2. 看起来是个闭包，其实不是，匿名函数的执行环境具有全局性，所以指向window

  ```js
  var name = "The Window";

  var obj = {
    name: "My Object",

    getName: function(){
      return function(){
        return this.name;
      };
    }
  };

  console.log(obj.getName()());
  ```

3. 闭包的定义：js高级编程给的定义，有权访问另一个**函数作用域中**的变量的**函数**

  es6引入let const有了非函数作用域之后，就不一定是函数作用域了，可参考1中的例子（以下的函数作用域同理），但后面一定是**函数**，因为函数内引用的外部变量的值是运行时确定的

4. 匿名函数的用途之一，把函数当值使用的情况下都可以用匿名函数

5. 函数声明存在变量提升，前提是在同一{}内

  ```js
  console.log(ss()) // 报错，ss不会提升到这一层

  {
    console.log(ss())
    function ss () {
      console.log(111)
    }
  }
  ```

6. arguments.callee可以实现递归调用与函数名的解耦，但严格模式下禁用，可以采用命名函数表达式的方式`var a = function ss(){ss()}`

7. **函数调用时发生了什么？**

  可参考[javascript执行环境详解](https://github.com/heysdc/Articles/blob/master/posts/executionContext.md)

  首先明确一下名词:

  - 执行环境(execution context，有的也叫执行上下文之类的): 执行的时候才存在的环境，执行环境定义了变量或者函数有权访问的其它数据，被作用域分成了不同层级的执行环境，如当前函数作用域执行环境，全局执行环境等，一般说某函数的执行环境为该函数的函数作用域执行环境，而不是其能访问到的所有执行环境

  - 变量对象(variable object): 每个执行环境都有一个变量对象，环境中定义的所有变量和参数都保存在这个对象中

  - 环境栈(context stack)：代码运行肯定是在某个执行环境中，首先是在最外围的全局执行环境，当执行流进入一个新的执行环境，这个执行环境就会被推入环境栈中，执行完毕，将这个执行环境从环境栈中推出，将控制权返回给上一级执行环境

  - 活动对象(activation object)：一个执行环境中所有定义、声明、参数所组成的对象

  - 作用域(scope)：能访问到的变量、对象以及函数，个人认为可当作活动对象

  - 作用域链(scope chain)：本质上是一个指向变量对象的指针列表，本来以为是指向活动对象的指针列表，其实不是，具体解释参见[javascript执行环境详解](https://github.com/heysdc/Articles/blob/master/posts/executionContext.md)

    ```js
    window.a = 'a' // 执行到gg()时，在活动对象内

    function gg () {
      console.log(window.c, a) // undefined, a
    }

    gg()

    window.c = 'c' // 执行到gg()时，不在活动对象内
    ```

  全局作用域中创建一个函数时，创建包含**全局变量对象**的作用域链，这个作用域链被保存在内部的[[Scope]]属性中，当调用该函数，会创建一个函数执行环境，通过复制前面的[[Scope]]属性中的对象构建起执行环境的作用域链，随后活动对象被创建并推入执行环境作用域链的前端

  一般情况下，函数执行完毕后，变量对象及执行环境会被销毁，除了闭包



