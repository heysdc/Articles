# javascript执行环境详解

## 一、什么是执行环境(excutable context)?

js为单线程，执行ECMAScript代码时，就会进入执行环境。

执行环境分三种：全局执行环境(只有一个)，局部执行环境(es5就是function执行环境)，eval执行环境(与function执行环境类似，因为eval也是调用函数)

执行环境可以抽象为以下对象：

```js
executionContextObj = {
  作用域链: {}, // 变量对象串起来
  变量对象: {}, // 函数参数，内部变量与函数声明
  this: {}
}

```

## 二、环境栈(excutable context stack)

当载入.js文件或者html执行到script元素中，ecs = [global context]；

执行函数ecs.push(function context)，执行完毕就弹出；

执行eval，ecs.push({context: evalContext, callingContext: functionContext})，同样执行完毕就弹出。

## 三、函数调用

函数调用分两个阶段：

1. 创建阶段（函数被调用后，函数内代码执行前）：

  - 创建作用域链，每个函数都有自己的作用域链（根据**函数声明的位置**创建的作用域链，而**不是函数调用处**）

  - 创建参数、函数声明、局部变量组成的变量对象(variable object)，会扫描整个函数作用域

  - 确定this值

  ```js
  fooExecutionContext = {
      scopeChain: { ... },
      variableObject: {
          arguments: {
              0: 22,
              length: 1
          },
          i: 22,
          c: pointer to function c()
          a: undefined,
          b: undefined
      },
      this: { ... }
  }
  ```

2. 代码执行阶段，变量在这个阶段被赋值

再总结一下，解释器执行函数的过程：

1. 运行到函数调用的代码

2. 执行函数代码前，创建执行环境

3. 进入创建阶段：

  - 初始化作用域链（根据**函数声明的位置**创建的作用域链，而**不是函数调用处**）

  - 创建变量对象，依次执行这三步：

    - 创建arguments object, 复制一份参数值

    - 扫描函数声明，添加到变量对象中，名字为函数名，值为指向函数的指针，如果名字已经存在，覆盖

    - 扫描变量声明，添加到变量对象中，名字为变量名，值为undefined，如果名字已经存在，跳过

  - 确定this的值

4. 执行环境中的函数代码，给变量对象中的变量赋值

## 四、变量提升hoisting

```js
(function() {

    console.log(typeof foo); // function pointer
    console.log(typeof bar); // undefined

    var foo = 'hello',
        bar = function() {
            return 'world';
        };

    function foo() {
        return 'hello';
    }

}());​

+function () {
  alert(a);
  a();
  var a = function () {
    console.log(1);
  }
  function a () { // 变量提升后，执行的时候不再重新赋值
    console.log(2);
  }
  alert(a);
  a();
  var c = d =a;
}();
alert(d);
alert(c);
```

结合之前的就明白了变量提升是怎么回事了

- 读取变量的值是从作用域链中读取的

- 作用域链前端为当前环境变量的变量对象

- 函数运行执行代码前完成函数执行的第一阶段，参考上面的

创建阶段时，foo首先作为函数名为赋值为指向函数的指针，后面又作为变量被发现，跳过，结果还是函数；bar被赋值为匿名函数，所以只在扫描变量的时候被赋值为undefined

## 五、作用域链

每个局部作用域都有一个包含该作用域内所有变量、函数声明、参数的变量对象，**作用域链**就是将该作用域链的变量对象与其所有父级的变量对象串起来

## 扩展

```js
var a = {n:1};
var b = a;
a.x = a = {n:2}; // 其实是一个符号结合顺序的问题
console.log(a.x);
console.log(b.x);
console.log(a, b);
```

## 参考
- 《js高级程序设计第三版》

- [What is the Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)

- [ECMA-262-3 in detail. Chapter 1. Execution Contexts.](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)

- [Understanding Scope and Context in JavaScript](http://ryanmorr.com/understanding-scope-and-context-in-javascript/) 

- [Identifier Resolution and Closures in the JavaScript Scope Chain](http://davidshariff.com/blog/javascript-scope-chain-and-closures/)
