// // Promise
// function PromiseEs5 (doFunc) {
//     console.log('creaPromise');
//     const that = this;
//     that.status = 'pending'; // fullfilled, rejected
//     that.data = undefined;
//     that.onResolvedCallback = [];
//     that.onRejectedCallback = [];


//     function resolve (resolveVal) {
//         that.status = 'fullfilled';
//         that.data = resolveVal;
//         for(var i = 0; i < that.onResolvedCallback.length; i++) {
//             that.onResolvedCallback[i](that.data)
//         }
//     }
//     function reject (rejectVal) {
//         that.status = 'rejected';
//         that.data = rejectVal;
//         for(var i = 0; i < that.onRejectedCallback.length; i++) {
//             that.onRejectedCallback[i](that.data)
//         }
//     }

//     try {
//         doFunc(resolve, reject);
//     } catch (e) {
//         reject(e);
//     }
// }

// PromiseEs5.prototype.then = function (onResolved, onRejected) {
//     var that = this, promise2;

//     // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
//     onResolved = typeof onResolved === 'function' ? onResolved : function(v) {}
//     onRejected = typeof onRejected === 'function' ? onRejected : function(r) {}

//     switch (that.status) {
//         case 'fullfilled':
//             return promise2 = new PromiseEs5(function(resolve, reject) {
//               try {
//                 var x = onResolved(that.data)
//                 if (x instanceof PromiseEs5) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
//                   x.then(resolve, reject)
//                 } else {
//                     resolve(x) // 否则，以它的返回值做为promise2的结果
//                 }
//               } catch (e) {
//                 reject(e) // 如果出错，以捕获到的错误做为promise2的结果
//               }
//             })
//         case 'rejected':
//             return promise2 = new PromiseEs5(function(resolve, reject) {
//               try {
//                 var x = onRejected(that.data)
//                 if (x instanceof PromiseEs5) {
//                   x.then(resolve, reject)
//                 }
//               } catch (e) {
//                 reject(e)
//               }
//             })
//         case 'pending':
//             return promise2 = new PromiseEs5(function(resolve, reject) {
//               that.onResolvedCallback.push(function(value) {
//                 try {
//                   var x = onResolved(that.data)
//                   if (x instanceof PromiseEs5) {
//                     x.then(resolve, reject)
//                   } else {
//                     resolve(x);
//                   }
//                 } catch (e) {
//                   reject(e)
//                 }
//               })

//               that.onRejectedCallback.push(function(reason) {
//                 try {
//                   var x = onRejected(that.data)
//                   if (x instanceof PromiseEs5) {
//                     x.then(resolve, reject)
//                   }
//                 } catch (e) {
//                   reject(e)
//                 }
//               })
//             })
//     }
// }

// new PromiseEs5((resolve, reject) => {
//     setTimeout(() => {
//         resolve(111);
//     }, 2000);
// }).then(val => {
//     console.log(val);
//     return new PromiseEs5((resolve) => {
//         setTimeout(() => {
//             resolve(333);
//         }, 1000);
//     });
// }).then(val => {
//     console.log('val2', val);
// })

// // new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //         resolve(111);
// //     }, 2000);
// // }).then(val => {
// //     console.log(val);
// //     return new Promise((resolve) => {
// //         setTimeout(() => {
// //             resolve(333);
// //         }, 1000);
// //     });
// // }).then(val => {
// //     console.log('val2', val);
// // })

// 2. bind函数实现
// Function.prototype.bind = bind1 || Function.prototype.bind;
// function bind1 (newThis, ...others) {
//   const rawFunc = this;
//   return function () {
//     rawFunc.apply(newThis, [...others, ...arguments]);
//   }
// }

// var a = function () {
//   console.log(this.b);
// }
// var c = {b: 1};
// var b = a.bind(c);
// b();

// 3. js模拟指针移动
var s = [];
var arr = s;
for (var i = 0; i < 3; i++) {
    var pusher = {
        value: 'item' + i
    }, tmp;
    if (i !== 2) {
        tmp = [];
        pusher.children = tmp;
    }
    arr.push(pusher);
    arr = tmp;
}
console.log(s[0]);