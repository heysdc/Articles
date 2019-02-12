// 有意思的题
// var foo = (function(){
//     var o = {
//        a: 1,
//        b: 2,
//        /**更多属性**/
//     };
//     return function(key) {
//         return o[key];
//     }
// })();

// const key = Symbol('key');

// Object.defineProperty(Object.prototype, key, {
//     get () {
//         return this;
//     }
// })

// console.log(foo(key));

// 1. 数据变化进行监听
// 1.1 方法1
// function observe (obj) {
//     if (!obj  || typeof obj !== 'object') {
//         return;
//     }
//     Object.keys(obj).forEach(val => {
//         observe(obj[val]);
//         {
//             let indexKey = obj[val]; // 用闭包解决get，set需要设置设置新代理值的问题
//             Object.defineProperty(obj, val, {
//                 enumerable: true,
//                 configurable: true,
//                 get: function () {
//                     console.log('get', obj, val);
//                     return indexKey;
//                 },
//                 set: function (newVal) {
//                     console.log('set', obj, val);
//                     indexKey = newVal;
//                 }
//             });
//         }
        
//     })
// }

// 1.2 方法2
// function observe(obj) {
//   // 判断类型
//   if (!obj || typeof obj !== 'object') {
//     return
//   }
//   Object.keys(obj).forEach(key => {
//     defineReactive(obj, key, obj[key]) // 通过新建函数的形式创建闭包
//   })
// }

// function defineReactive(obj, key, val) {
//   // 递归子属性
//   observe(val)
//   Object.defineProperty(obj, key, {
//     enumerable: true,
//     configurable: true,
//     get: function reactiveGetter() {
//       console.log('get value')
//       return val
//     },
//     set: function reactiveSetter(newVal) {
//       console.log('change value')
//       val = newVal
//     }
//   })
// }

// 1.3 测试代码
// const a = {
//     a: 1,
//     b:[],
//     c: {
//         d: 2
//     }
// }

// observe(a);

// a.a = 2;
// a.b.push(2); // push方法无法触发getter，setter
// a.b[0] = 3;
// a.c.d = 3;
// console.log(a);

// 2. 遇到<div>{{name}}</div>对数据变化进行监听

// class Dep {
//     constructor () {
//         this.subs = [];
//     }
//     add (sub) {
//         this.subs.push(sub);
//     }
//     notify () {
//         this.subs.forEach(sub => {
//             sub.update();
//         });
//     }
// }

// class Watch {
//     constructor (obj, key, cb) {
//         Dep.target = this;
//         this.obj = obj;
//         this.key = key;
//         this.cb = cb;
//         this.value = obj[key];
//         Dep.target = null;
//     }
//     update () {
//         this.value = this.obj[this.key];
//         this.cb(this.value);
//     }
// }

// function observe (obj) {
//     if (!obj  || typeof obj !== 'object') {
//         return;
//     }
//     Object.keys(obj).forEach(val => {
//         observe(obj[val]);
//         const dp = new Dep();
//         {
//             let indexKey = obj[val]; // 用闭包解决get，set需要设置设置新代理值的问题
//             Object.defineProperty(obj, val, {
//                 enumerable: true,
//                 configurable: true,
//                 get: function () {
//                     console.log('get', obj, val);
//                     if (Dep.target) {
//                         dp.add(Dep.target);
//                     }
//                     return indexKey;
//                 },
//                 set: function (newVal) {
//                     console.log('set', obj, val);
//                     indexKey = newVal;
//                     dp.notify();
//                 }
//             });
//         }
        
//     })
// }

// const obj = {name: 1};

// observe(obj);

// function update(val) {
//     document.body.innerText = val;
// }

// new Watch(obj, 'name', update);

// obj.name = 333;

// 2.2 proxy实现
// 2.2.1 proxy用法
// var obj = new Proxy({a: 1}, {
//     get (target, key, receiver) {
//         console.log('get', target, key);
//         return Reflect.get(...arguments);
//     },
//     set (target, key, value, receiver) {
//         console.log('set', target, key, value);
//         return Reflect.set(...arguments);
//     }
// });

// console.log(obj, obj.a);

// obj[0] = 1;

// 2.2.2 完整实现一个基于数组的proxy双向绑定

class Dep {
    constructor () {
        this.subs = [];
    }
    add (sub) {
        this.subs.push(sub);
    }
    notify () {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}

class Watch {
    constructor (obj, key, cb) {
        Dep.target = this;
        this.obj = obj;
        this.key = key;
        this.cb = cb;
        this.value = obj[key];
        Dep.target = null;
    }
    update () {
        this.value = this.obj[this.key];
        this.cb(this.value);
    }
}

function observe (obj) {
    if (!obj  || typeof obj !== 'object') {
        return obj;
    }
    Object.keys(obj).forEach(val => {
        obj[val] = observe(obj[val]);
    });
    const dp = new Dep();
    return new Proxy(obj, {
        get (target, key, receiver) {
            console.log('get', target, key);
            if (Dep.target) {
                dp.add(Dep.target);
            }
            return Reflect.get(...arguments);
        },
        set (target, key, value, receiver) {
            console.log('set', target, key, value);
            setTimeout(() => {
                dp.notify();
            });
            return Reflect.set(...arguments);
        }
    });
}

let obj = [1];

obj = observe(obj);

console.log('obj', obj[0]);
document.getElementById('target').addEventListener('input', (e) => {
    console.log('val', e.target.value);
    obj[0] = e.target.value;
})
function update(val) {
    document.getElementById('target').value = val;
}

new Watch(obj, '0', update);

setInterval(() => {
    obj[0] = 444;
}, 2000);
