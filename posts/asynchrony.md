#js异步编程学习

##从线程讲起
- **js是单线程的**
  - 主线程：js引擎中负责解释和执行js代码的线程只有一个（一个页面一个），也可以叫主线程
  - 工作线程：如：处理ajax请求的线程，处理dom事件的线程，定时器线程，读写文件的线程，这些线程可能在js引擎内，也可能在引擎外（如浏览器中）

- **无形的异步**：异步即一段代码分两段执行，执行－等待结果－继续执行，如果按照正常的程序运行过程（同步），由于执行js代码的线程只有一个，整个js的执行就停滞了，在页面进行任何涉及js的操作都没反应，这肯定不行的，所以设计到异步操作（setTimeout）都是自动做了异步处理了，即回调：

  ```js
  setTimeout(() => {
    console.log('ah~')
  }, 2000)
  ```
  setTimeout(callback,  milliseconds)，这就是一个异步过程，js规定了它的写法，这种写法本身就是按照异步来的

- **异步原理**
  按照`执行－等待结果-继续执行`的过程分析上面的代码就是：
  - 执行setTimeout(callback , 2000)，告诉js我要执行一个2秒后运行的一个任务（不管这个任务是干嘛的），同步执行，瞬间完成
  - 等待2秒
  - 执行callback

  从线程上分析：

  - 主线程执行setTimeout(callback, 2000)，setTimeout内置了异步请求，使主线程向工作线程发起了一个异步请求，相应的工作线程接收请求并告知主线程收到请求，主线程可以继续执行后面的代码
  - 工作线程执行计时2秒的任务
  - 主线程收到通知后，调用回调函数，`callback()`
  所以说异步函数一般要接受一个回调函数，具有如下形式`A(...args, callback)`，发起函数A，回调函数callback，也有其它如分离的形式：

  ```js
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = xxx; // 添加回调函数
  xhr.open('GET', url);
  xhr.send(); // 发起函数
  ```
- **消息队列和事件循环**
  **消息队列**:一个存放消息的队列
  **事件循环**:主线程不断从消息队列中重复取消息，执行消息，执行了完了之后再取下一个消息
  异步过程的回调函数，一定不在当前这一轮事件循环中执行。
  **事件**：消息队列中每条消息都对应着一个事件，事件机制实际上就是异步过程的通知机制，工作线程执行完通知主线程就形成了一个`事件`
  工作线程是生产者，主线程是唯一的消费者，工作线程执行异步任务，完成后把对应的回调函数封装成一条消息放到消息队列中，主线程不断从消息队列中取消息执行。

##Promise
- **promise基本用法**: 对异步过程的一种封装，特点：不受外界影响以及一旦状态更改无法改变，特点不重要，关键理解如何封装异步。
  如下代码，上面的代码和下面代码的区别为，下面代码把回调函数定义在了then方法的第一个参数
  promise有三种装pending,resolved,rejected从正在进行分别变为完成失败，执行了resolve就完成了前者，执行reject就完成了后者，状态一旦更改无法改变
  promise的串联，即传给resolve的参数为一个promiseB,如果这个promiseB的resoleve执行了，则将其参数传过来，如果没有，就等着，必须promiseB状态变了后面才能执行

  ```js

  setTimeout(() => {
    console.log('a')
  }, 2000)

  var timeout = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }
  timeout(2000).then(() => {
    console.log('a')
  })


  // 串联
  var a = (time) => {
    var tmp = new Promise((resolve) => {
      setTimeout(resolve, 5000, 'sss')
    })
    return new Promise((resolve) => {
      setTimeout(resolve, time, tmp)
    })
  }
  a(1000).then((value) => {
    console.log('sb', value) // sss
  })
  
  ```

####参考
[JavaScript：彻底理解同步、异步和事件循环(Event Loop)](https://segmentfault.com/a/1190000004322358)