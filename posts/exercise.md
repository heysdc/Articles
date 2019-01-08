# 习题

## 1

```js
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

## 2

```js
var a = {n:1};
var b = a;
a.x = a = {n:2}; // 其实是一个符号结合顺序的问题
console.log(a.x);
console.log(b.x);
console.log(a, b);
```

## 3

```js
this.a = 20;
var test = {
    a: 40,
    init: () => {
        console.log(this.a);
        function go () {
            // this.a = 60;
            console.log(this.a);
        }
        go.prototype.a = 50;
        return go;
    }
};
// var p = test.init();
// p();
new(test.init())(); // new里this的指向
```

## 4 两种办法正确执行

```js
var arr = [];
for (var i = 0; i < 5; i++) {
    arr[i] = function () {
        console.log(i);
    }
}
arr[3]();
```

## 5

```js
function test (m) {
    m = {
        v: 5
    }
}
var m = {
    k: 30;
}
test(m);
console.log(m.v);
```

## 6 继承及es6实现

## 7 es5实现promise

## 测试结果
2. 忽略了符号结合
3. new里this指向，忽略去掉注释的代码对全局window的影响
4. 对for循环理解有误，相当于var i = 0; white (i < 5) {***; i++};
5. 对指针复制理解不够深入，画个图就明白了
6. 从类创建到类继承，需要重新看一遍
7. 写不出来，需要看看
8. promise的流程
    - 构建promise对象
        - 指定status，三种状态，pending，fullfilled，rejected
        - 指定promise的值
        - 指定回调队列
        - 包装resolve及reject，外面包一层，改变状态，挨个调用回调队列
        - 执行promise的回调函数，参数传入包装的resolve及reject
    - then函数，由于promise为约定，所以其真实回调写在了承诺即then函数里
        - 判断当前promise状态
            - fullfilled：返回一个新的promise，首先调用then的回调，返回值为promise，直接调用then接手；否则直接调用resolve
            - rejected:返回一个新的promise，调用then的回调，返回值如果为promise，继续调用then，否则结束
            - pending:返回一个新的promise，把上面俩的过程依次塞到promise的回调队列中
