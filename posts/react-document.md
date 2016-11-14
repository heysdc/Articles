#Learn Something New From React Document

##Introducing JSX

- **jsx**是js的语法扩展，编译之后jsx为js对象，所以可以把它当作变量来用

  **jsx** is a syntax extension to js, it bacomes regular js objects after compiling, so you can use it as variable

- **babel**把jsx转成调用React.createElement()

  **babel** compiles jsx down to React.createElement() calls

##Rendering Elements

- **react element**是不可变的,改变ui的唯一方法就是创建一个新的element

  **react element** is immutable, the only way to change update the ui is to create a new element

- **ReactDom**会将新老虚拟dom进行对比，只在dom中改虚拟dom改变了的部分

  **ReactDom** will compare the element and its children to the previous one, only update the changing parts of element to the dom

##Components and Props

- **components**将ui拆分成独立可复用的模块

  **components**split ui into independent, reusable pieces

- react将自定义component的属性包装成一个单独的对象，**props**

  react pass all attributes to the user-defined components as a single object which is called **props**

- **components**必须为纯函数，即它的输入不能被更改，即**props**不能被更改

  **components** must be pure, its inputs-props mustn't be changed