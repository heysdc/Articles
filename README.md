# javascriptReview
复习，js高级程序设计(第三版)，主要是记一下之前自己感觉新鲜的，温故知新

一、js简介
1、js起源：一开始网页是静态的，但得有交互啊，为了提交表单，弄了个js
2、js包括三部分：
  （1）emcascript，当年netscape与ie搞了俩js，为了统一，就找ecma弄了个js标准，规定了最基本的语法、类型、语句、操作符等
  （2）dom与（3）bom均为语言的扩展，即负责语言核心（ecmascript）与运行环境（通常为浏览器）的交互。dom为针对html的应用程序接口，即操控页面html的，但是后来又进行了扩展dom1级2级3级，除了对节点进行操作还能对dom样式、事件、验证、保存等进行一系列扩展操作 等
    dom一开始也是因为NI大战由w3c规划的，其它语言也有自己的dom标准如svg
  （3）bom，browser object model，控制浏览器显示页面以外的部分，习惯上把所有针对浏览器的js扩展都算作bom，如弹出新窗口，获取窗口信息，获取分辨率信息等，直到h5的出现，bom无标准的混乱状况才得到解决
  
二、在html中使用js
3、<script>为同步加载，不放head里因为加载js慢的话html加载不进来，导致页面空着，所以一般放最后，该标签还有个defer和async属性可选

三、基本概念
4、严格模式：在js文件顶活着函数内部开始处加个 "use strict"; 这是一个非常厉害的编译指示，用于告诉js引擎切换到严格模式，ie10以上才支持
5、变量 省略操作符直接定义变量 message = 10将直接创建一个全局变量
6、基本数据类型：object, null, undefined, string, number, boolean
  typeof对应的值: 'object', 'object', 'undefined', 'string', 'number', 'boolean', 另外function为'function'
  undefined的意思是未初始化，使用未声明的变量会报错，typeof未声明变量为'undefined'
7、为什么有了undefined还要有个null，null表示一个空对象指针，即当你想建一个对象时，可以使用null初始化，undefined派生自null，null == undefined但是null !== undefined
8、想用八进制0开头且后面每位数都得小于8,十六进制0x开头
9、不要测试某个特定的浮点数值，0.1+0.2 !== 0.3，特大或者特小的数1e2 === 100
10、js数值取值范围5e-324~1.8e308大了Infinity小了-Infinity，Number.NEGATIVE_INFINITY Number.POSITIVE_INFINITY分别保存极大值与极小值 isFinite()判断某个数是否超出范围
11、isNaN（）函数，判定转换完之后的数值（如果是对象先判断valueOf方法，不等则再调用toString（）方法）是否不是数，NaN与任何值都相等，包括其自身
12、parseInt（） es5已经不自动识别八进制了，可以指定第二个参数，转换时使用的基数
13、字符串中转义序列为反斜杠\如\n\t
14、emcascript中字符串可不改变，一旦创建，不可更改
15、六种基本类型除了null、undefiend之外都有toString()方法，如果值可能为null或者undefined，可以采用String（）函数，其规则：1有toString（）方法调用这个，如果为null或者undefined返回‘null’，‘undefined’
16、es中对象就是一组数据与功能的集合（属性与方法）,Object类型是所有js实例的基础
17、Object所具有的方法.valueOf()返回对象的字符串、数值或者布尔值表示，通常与toString()方法的返回值相同
18、ECMA中的对象（即js内置对象）的属性和方法不一定适用于其它对象（浏览器环境中的对象bom、dom中的对象（宿主对象）以及自定义对象）
19、递增递减操作符，前置优先级与执行语句优先级相同，后知优先级较低，即1++ + 2为3，＋＋1 ＋ 2 为4，此操作符可以用于字符串对象等的计算，还是那套转换规则
20、一元加减操作符业可以用于非数值，转换规则同Number（）方法，可以用于转换字符串＋‘－1’为－1
21