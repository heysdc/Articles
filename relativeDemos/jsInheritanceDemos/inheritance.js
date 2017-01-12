/* 一、原型链 */
{
  let GrandF = function () {}
  let Father = function () {}
  let Childs = function () {}

  Father.prototype = new GrandF()
  Childs.prototype = new Father()

  GrandF.prototype.g = 'g'
  Father.prototype.f = 'f'
  Childs.prototype.c = 'c'

  let newChild = new Childs()
  console.log(newChild.c, newChild.f, newChild.g) // 原型继承链，newChild=>Childs.prototype(Father实例)=>Father.prototype(GrandF实例)=>GrandF.prototype

  // 原型继承的问题
  let A = function () {
    this.name = []
  }
  let B = function () {}
  B.prototype = new A()
  let b1 = new B()
  let b2 = new B()
  b1.name.push('sdc')
  console.log(b2.name) // ['sdc'], 从A继承的实例属性被共享了，不能通过向超类型中传递参数的形式创建子类型
}

/* 二、借用构造函数 */
{
  let Father = function () {}
  let Childs = function () {
    Father.call(this) // 可以向父级传参，并且将父类实例属性继承过来，成为子类的私有实例属性
  }
  // 缺点就是没有原型的继承了，只能继承实例私有属性
}

/* 三、组合继承 */
{
  let GrandF = function () {}
  let Father = function (value) {
    this.name = value
  }
  // (1)继承了父类的实例私有属性，当作当前子类的私有实例属性
  let Childs = function (names) {
    Father.call(this, names) // 可以向父类型中传参，原本prototype中的公有属性被构造函数产生的实例属性所屏蔽
  }

  Father.prototype = new GrandF()
  Childs.prototype = new Father(['gg']) // (2)将子类的prototype指向父类的实例，可以将父类的原型引入子类的原型链，并且父子的原型相对独立不耦合

  let newChild1 = new Childs(['a', 'b'])
  let newChild2 = new Childs(['a', 'b', 'c'])
  console.log(newChild1.name, newChild2.name, Object.getPrototypeOf(newChild2).name)
  // “缺点也是构造函数模式创建对象的缺点，子类型的对象的生成变成了用构造函数生成对象，因为子类型prototype的内容完全被实例属性所遮蔽”，原来是这么以为的，后来发现这个问题很容易解决，如下:
  Childs.prototype.newFeature = function () {} // 因为是有原型的，所以原型继承完了直接在原型上加就是子类的公有属性了
  // 组合继承是js的面向函数式的标准继承，实例属性继承为实例属性，原型属性通过原型链继承
}

/* 四、原型式继承 */
{
  let object = function (o) {
    let Ans = function () {}
    Ans.prototype = o
    return new Ans()
  }
  // 与标准组合继承对比，标准组合继承同时继承(构造函数的)公有属性结构(prototype)与私有属性结构(构造函数中的)，原型式继承直接将实例作为公有属性

  // es5引入Object.create(a, b)作为原型式继承的实现，参数一同object，参数二同Object.defineProperties()，参数二定义的属性会覆盖参数一的
}

/* 五、寄生式继承 */
{
  // 寄生式继承是一种思路，与寄生式构造函数、工厂模式类似，创建一个函数，返回一个增强后的继承后的对象
  let parasiticInheritance = function (father) {
    let o = Object.create(father) // 继承，也可以用其它的继承方式
    o.strong = () => {} // 寄生增强，这里有与构造函数类似的缺点，每次调用都新建一个实例方法，这里完全可以做成公有的
    return o
  }
}

/* 六、寄生组合式继承 */
// 组合继承的缺点，重复调用，首先new Father(), 然后new Child()里的Father.call()，重复调用
{
  let Father = function (value) {
    this.name = value
  }
  let Childs = function (name, newName) {
    Father.call(this, name) // (1)继承了父类的实例私有属性，当作当前子类的私有实例属性
    this.newName = newName  // (3)非继承实例私有属性
  }
  // (2)将子类的prototype指向父类的实例，可以将父类的原型引入子类的原型链，并且父子的原型相对独立不耦合
  let inheritance = function (Father, Child) {
    let prototype = Object.create(Father.prototype)
    prototype.constructor = Child
    Child.prototype = prototype
  }
  inheritance(Father, Childs)
  Childs.prototype.getNewName = function () { return this.newName } // (4)非继承实例公有属性

  let ins = new Childs('aa', 'bb')
  console.log(ins.getNewName(), ins.name)
}
