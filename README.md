# javascriptReview
复习，js高级程序设计(第三版)，主要是记一下自己之前没记住的，温故知新；既然都看es5了，顺带看看es6

###一、js简介
1. js起源：一开始网页是静态的，但得有交互啊，为了提交表单，弄了个js
2. js包括三部分：
  (1) emcascript，当年netscape与ie搞了俩js，为了统一，就找ecma弄了个js标准，规定了最基本的语法、类型、语句、操作符等
  (2) dom与（3）bom均为语言的扩展，即负责语言核心（ecmascript）与运行环境（通常为浏览器）的交互。dom为针对html的应用程序接口，即操控页面html的，但是后来又进行了扩展dom1级2级3级，除了对节点进行操作还能对dom样式、事件、验证、保存等进行一系列扩展操作等。dom一开始也是因为NI大战由w3c规划的，其它语言也有自己的dom标准如svg
  (3) bom，browser object model，控制浏览器显示页面以外的部分，习惯上把所有针对浏览器的js扩展都算作bom，如弹出新窗口，获取窗口信息，获取分辨率信息等，直到h5的出现，bom无标准的混乱状况才得到解决

###二、在html中使用js
1. script标签为同步加载，不放head里因为加载js慢的话html加载不进来，导致页面空着，所以一般放最后，该标签还有个defer和async属性可选

###三、基本概念
1. 严格模式：在js文件顶活着函数内部开始处加个 "use strict"; 这是一个非常厉害的编译指示，用于告诉js引擎切换到严格模式，ie10以上才支持
2. 变量 省略操作符直接定义变量 message = 10将直接创建一个全局变量
3. 基本数据类型：object, null, undefined, string, number, boolean
  typeof对应的值: 'object', 'object', 'undefined', 'string', 'number', 'boolean', 另外function为'function'
  undefined的意思是未初始化，使用未声明的变量会报错，typeof未声明变量为'undefined'
4. 为什么有了undefined还要有个null，null表示一个空对象指针，即当你想建一个对象时，可以使用null初始化，undefined派生自null，null == undefined但是null !== undefined
5. 想用八进制0开头且后面每位数都得小于8,十六进制0x开头
6. 不要测试某个特定的浮点数值，0.1+0.2 !== 0.3，特大或者特小的数1e2 === 100
7. js数值取值范围5e-324~1.8e308大了Infinity小了-Infinity，Number.NEGATIVE_INFINITY Number.POSITIVE_INFINITY分别保存极大值与极小值 isFinite()判断某个数是否超出范围
8. isNaN（）函数，判定转换完之后的数值（如果是对象先判断valueOf方法，不等则再调用toString（）方法）是否不是数，NaN与任何值都相等，包括其自身
9. parseInt（） es5已经不自动识别八进制了，可以指定第二个参数，转换时使用的基数
10. 字符串中转义序列为反斜杠\如\n\t
11. emcascript中字符串可不改变，一旦创建，不可更改
12. 六种基本类型除了null、undefiend之外都有toString()方法，如果值可能为null或者undefined，可以采用String（）函数，其规则：1有toString（）方法调用这个，如果为null或者undefined返回‘null’，‘undefined’
13. es中对象就是一组数据与功能的集合（属性与方法）,Object类型是所有js实例的基础
14. Object所具有的方法.valueOf()返回对象的字符串、数值或者布尔值表示，通常与toString()方法的返回值相同
15. ECMA中的对象（即js内置对象）的属性和方法不一定适用于其它对象（浏览器环境中的对象bom、dom中的对象（宿主对象）以及自定义对象）
16. 递增递减操作符，前置优先级与执行语句优先级相同，后知优先级较低，即1++ + 2为3，＋＋1 ＋ 2 为4，此操作符可以用于字符串对象等的计算，还是那套转换规则
17. 一元加减操作符业可以用于非数值，转换规则同Number（）方法，可以用于转换字符串＋‘－1’为－1
18. 乘性操作符＊／％操作数为非数值自动类型转换Number（）
19. +有任一个操作数为字符串，则另外的调用String()方法
20. 关系操作符（大小等于）如果都为字符串，比较的是首字母的字符编码值；如果一个是数字，另一个往数字转
21. 相等和不相等：先转换再比较，nullundefined不会被转换；全等不全等：直接比较，不转换
22. 逗号可以用于赋值，总会返回最后一项var a = (1, 2, 3, 4)注意括号，a为4
23. ecmascript对象属性没有顺序
24. label语句，在代码中加标签，以便将来适用 label:statement；常见的应用场合，与break continue配合使用,如label:for(){for(){if() break label;}}触发break直接终止内外两层循环
25. with语句with(obj){statement；}将代码作用域设置到特定的对象中，缺点：性能差，调试麻烦，不建议用
26. switch语句中，case的值可以为变量或表达式；switch在比较的时候不会发生类型转换
27. js中传参为按值传递，严格模式下不能修改arguments的值
28. 重载：为一个函数编写多个定义，在js中可以用检查arguments长度来变相实现

###四、变量、作用域和内存问题
1. js不允许直接访问内存中的位置，通过引用访问对象，这个引用实际上是指针
2. 检查基本类型可以用typeof，null返回object，检测具体对象可以用instanceof，检测是否为某个类型对象的实例
3. 执行环境(execution context)决定了变量或函数有权访问的其它数据，每个执行环境有个一个变量对象(vairable object)，环境中定义的所有变量和函数都保存在这个对象中
4. 全局环境为最外围的执行环境，宿主环境不同，执行环境的对象也不同，web浏览器中全局环境呗认为是window对象
5. 某个环境中的所有代码执行完毕后，该环境被销毁，每个函数都有自己的执行环境，执行流进入一个函数，函数的环境被推入一个环境栈中，执行完弹出
6. 作用域链（scope chain）由变量对象组成，其前端指向当前的执行环境的变量对象，上一级为包含环境的变量对象，直至全局环境的变量对象，保证了对有权访问的所有变量和函数的有序访问
7. es5执行环境的类型有两种：全局与函数，但有其他办法延长作用域链with与catch
8. 搜索标识符顺着作用域链走，如果找到了就停了
9. 垃圾收集的两种策略：
	（1）标记清除（mark-and-sweep）进入环境标记为进入环境，离开环境标记为离开环境，标记为没用的变量定期清理一次，不同浏览器清理周期不同，可以主动调用垃圾收集方法，一般不推荐
	（2）引用计数（refrence counting），一个对象变量赋值给另外一个变量，引用次数＋1，包含这个值的变量取得了另外的值，则该值的引用次数－1，会由于循环引用导致内存泄露，ie9之前的dom bom对象采用引用计数策略，可能导致内存泄露，针对方法受冻断开js与dom的链接
10. js的手动管理内存的方法：解除全局对象的引用，局部对象在局部环境弹出的时候会被回收，然而全局对象不会，可以在不用的时候手动解除（赋空值）
11. 分配给web浏览器的内存比分配给桌面程序的少，防止网页耗尽内存导致系统崩溃

###五、引用类型
####对象
######es5
1.  什么是引用类型？*ecmscript中，引用类型是一种数据结构，将数据和功能组织在一起，常被称为类*。引用类型也被称为**对象定义**，因为它们描述的是一类对象所具有的属性和方法。常见的引用类型如Object, Boolean, Array等等。对象是某个特定引用类型的实例。比如`var a = new Array()`可以理解为通过引用类型Array创建了一个数组实例，Array引用类为新对象定义了默认的属性和方法。
2.  `var a = {}`这里的｛表示表达式上下文的开始。*ecmascript中**表达式上下文（expression context）**指的是能返回一个值*，赋值后面要跟一个值，所以是表达式上下文。**语句上下文(statement context)**表示一个语句块的开始。如`if (expression context) {statement context}`
3.  `function func(args) { if (typeof args.name === 'string') {return} }`遇到需要传入大量可选参数的函数，最好用对象字面量封装多个可选参数


#####es6
1. 属性简洁表示法：`var a = {a, b () {}}`等同于`var a = {a: a, b: function(){}}`
2. Object.is(a, b)相当于a === b，不同的是NaN等于自身，正负0不相等。
3. Object.assign(targetObj, sourceObj...)将不同对象的属性浅赋值到对象对象中
4. es5三个忽略enumerable为false的属性(1)for in操作,遍历自身的和继承的可枚举属性(2)Object.keys()对象自身的可枚举属性键名，推荐用其替代for in(3)JSON.stringify();es6新增两个Object.assign,Reflect.enumerate()返回for in循环会遍历的属性
5. Object.getOwnPropertyDescriptor(obj, propertyName)获取属性的描述对象
6. es6提供了接口Object.setPrototypeOf(obj, prototype), Object.getPrototypeOf(obj)获得prototype对象，是es6正式推荐读写对象构造函数的prototype属性
7. **Rest参数**: `let {a, ...b} = {a: 1, b: 2, c: 3, d: 4}`从一个对象取值，将将所有可遍历但尚未读取的属性分配到指定的对象上；**扩展运算符**: 取出参数对象的所有可遍历属性复制到对象中，相当于assign，`let test = {x: 1, ..y} = Object.assign({x: 1}, y)`
*身体不舒服，待续*

####数组
1. length属性不是只读的，通过给它赋值可以增减数组长度
2. 一个页面多个框架，每个框架都有自己的全局执行环境，不同执行环境的构造函数Array构造函数不同
3. 判断数组方法，a instanceof Array, 更保险的Array.isArray()(ie9+)
4. push, unshift可以用来传多个值，返回数组长度，shift, pop返回从数组中删除的一项
5. sort((val1, val2) => val2 > val1)可以传入函数实现特定排序，reverse()相反排序
6. concat方法返回一个数组副本，参数为数组则将每一项分别添加
7. slice(起始项，最后一项的后一项)splice(起始项， 删除的项数，添加的项目)返回从数组中删除的项
8. indexOf,lastIndexOf,reduce,reduceRight(均为ie9+)后两者为归并方法，reduce((pre, cur, index, arr) => nextPre, firstPre)如果firstPre不指定则默认为第一项

####Date
