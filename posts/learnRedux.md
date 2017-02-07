#Redux学习
先照着文档来吧

##简介
1. redux就是一个state集中管理的工具
2. redux遵循三个基本原则：（1）只有一个store即一个state树
（2）state是只读得，不能直接修改，只能提交action修改
（3）state用纯函数（reducers）修改
3. 可用immutable存储数据

##Actions
1. 向store发送的更改请求，一个对象
2. 结构，除了一个字符串type表明类型，其它随意
3. Action Creators, 只是为了生成标准action的函数，过滤外部垃圾数据获得有用的数据作为action传给reducer
  
  ```js
  // Actions
  {
    type: ADD_TODO,
    text: 'hello world'
  }
  // Action Creators
  function addToDo(text) {
    return {
      type: ADD_TODO,
      text
    }
  }
  ```

##Reducers
1. 函数，接受actions与原始state，返回一个新state(previousState, action) => newState
2. store为一个对象，其设计原则，将数据state与ui state分开,store结构复杂建议采用normalizr's类似的数据结构保存
3. reducer必须为纯函数式的：不改参数，无sideEffect，不调用非纯函数如Date.now()
4. 建议使用过程中state中每个属性有专门的reducer负责

  ```js
  // state
  static state = {
    a: 'a',
    b: {}
  }
  // reducer, from reducer.js
  const doA = (state='', action) {
    switch (action.type) {
      case 'bigA':
        return 'A'
      default:
        return state
    }
  }
  const doB = (state={}, action) {
    switch (action.type) {
      case 'bigA':
        return {
          type: 'bigA'
        }
      default:
        return state
    }
  }
  const reducer = combineReducers({
    a: doA,
    b: doB
  })
  // reducer相当于以下函数
  // function reducer (state = {}, action) {
  //  return {
  //     a: doA(state.a, action),
  //     b: doB(state.b, action)
  //   }
  // }
  ```

##Store
1. 作用（1）保存state（2）通过getState()获得state（3）通过dispatch(action)更新state（4）通过subscribe（listener)注册监听事件（5）(4)返回一个函数undispatch用来取消注册的监听事件
2. 建立store, createStore(reducers)
3. 修改sotre: (1)建立监听事件var unsub = store.subscribe(callback) (2)store.dispatch(action)修改 （3）可以用unsub()取消事件监听

##Data Flow
1. 单向数据流
2. 数据流向
（1）store.dispatch(action)
（2）store将数据传给reducer(state, action)
（3）root reducer把数据分发给各子reducer分别更改数据
（4）store保存root reducer返回的完整state tree,let store = createStore(todoApp), 通过store.getState()获得的state即获得更新

##Usage with React
1. 在react中采用redux，需[把ui部分(presentational)和数据(container)分开](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.b3399zs0v)，只有数据部分与store相连
2. 数据部分建议采用react-redux提供的connect()函数，提供了很多优化
3. ui部分如果没有state可以采用函数式：

  ```js
  // Ui.js
  const ui = ({value}) => (
    <span>{value}</span>
  )
  export default ui
  // import ui
  import ui from './Ui.js'

  render(<ui value:='ss' />, document.getElementById('root'))
  ```
4. connect()需要两个特殊函数,这两个特殊函数都可以接受第二个参数ownProps为ui部分的属性
(1)mapStateToProps: 确定要把store里的什么内容传给ui部分，参数为state，返回ui部分需要的属性
(2)mapDispatchToProps:dispatch action，将dispatch传给ui部分，参数为dispatch，返回值为参数需要的属性

  ```js
  // container.js
  import { connect } from 'react-redux'
  import TodoList from './TodoList'
  const VisibleTodoList = connect(
    mapStateToProps, mapDispatchToProps
  ) (TodoList)

  export default VisibleTodoList
  ```
5. connect()解决了subscribe的问题，接受store依靠react-redux提供的<Provider>,其子元素自动接收store，如果子元素为container则自动有

  ```js
  let store = createStore(reducers)
  render(
    <Provider store={store}>
      <AllContainers />
    </Provider>
  )
  ```

##Async Actions

1. 观摩一下接口数据存储，可以用normalizr转一下

  ```js
  {
    selectedSubreddit: 'frontend',
    postsBySubreddit: {
      frontend: {
        isFetching: true,
        didInvalidate: false,
        items: []
      },
      reactjs: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 1439478405547,
        items: [
          {
            id: 42,
            title: 'Confusion about Flux and Relay'
          },
          {
            id: 500,
            title: 'Creating a Simple Application Using React JS and Flux Architecture'
          }
        ]
      }
    }
  }
  ```
2. 试着自己表述一下，面对异步问题，首先调用异步行为可以在两个地方：
  （1）推荐的action creater，首先正常情况下action creater就不应该是异步的，因为action creater进行异步操作没有返回值，如下所示，会导致很多问题。

  ```js
  // return undefined，expect action
  const actionCreater = () => {
    setTimeout(() => {
      console.log('sb')
    }, 2000)
  }
  const thunk = (text) => {
    return (dispatch, getState) {
      const state = getState() // get state, use careful! recommend as judgement
      dispatch(otherActionCreater(text))
    }
  }
  ```
  （2）不把action creater当正常的用，那就得一级一级传dispatch了，把store当一个单例引调用store.dispatch也会导致很多问题
  所以稍微正轨复杂点的项目推荐中间件redux-thunk，可以接受一个非正常的action creater

##middleware
1. middleware原理解析过程，以文档的logger为例

  ```js
  // 将改变前后的store打印出来
  console.log(store.getState())
  store.dispatch(action)
  console.log(store.getState())

  // 1.每个dispatch都要写一遍，直接把dispatch重写得了
  store.dispatch = (store, action) => {
    console.log(store.getState())
    store.dispatch(action)
    console.log(store.getState())
  }
  // 2.封装一下
  const initialLogger = (store, action) => {
    const next = store.dispatch
    store.dispatch = function () {
      console.log(store.getState())
      next(action)
      console.log(store.getState())
    }
  }
  // 3.如果有多个需求呢，比如还有一个检查dispatch过程是否出错的
  const initialLogger = (store) => {
    const next = store.dispatch
    store.dispatch = function (action) {
      console.log(store.getState())
      next(action)
      console.log(store.getState())
    }
  }
  const initialTest = (store) => {
    const next = store.dispatch
    store.dispatch = function (action) {
      try {
        next(action)
      } catch (e) {
        console.error(e)
      }
    }
  }
  // 4.在3的基础上写个东西处理下
  const handleMiddleware = (store, middlewares) {
    middlewares = middlewares.slice(0)
    middlewares.forEach((mid) => {
      store.dispatch = mid(store, action)
    })
  }
  // 5.然而采用直接覆盖dispatch的方法毫无意义，后面会覆盖前面，不如在原来dispatch的基础上不断更改，可以将3, 4修改为
  const initialLogger = (store, next) => {
    return (action) => {
      console.log(store.getState())
      next(action)
      console.log(store.getState())
    }
  }
  const initialTest = (store, next) => (action) => {
    try {
      next(action)
    } catch (e) {
      console.error(e)
    }
  }
  const handleMiddleware = (store, middlewares) {
    middlewares = middlewares.slice(0)
    const next = store.dispatch
    middlewares.forEach((mid) => {
      next = mid(store, next)
    })
    return Object.assign({}, store, { dispatch })
  }
  ```

##引入redux-immutable
1. redux的immutable化原则上是：store部分为immutable，即reducer生成immutable数据，initialStore的初始化数据为immutable,action为正常对象，在container从store拿到immutable的数据之后要立马转成plain object，这是combineReducers的本体：

  ```js
  function todoApp(state = {}, action) {
    return {
      visibilityFilter: visibilityFilter(state.visibilityFilter, action),
      todos: todos(state.todos, action)
    }
  }
  ```
  可以看到直接从state属性里拿东西，所以如果state整个都是immutable的话,需要转换，还想用combineReducers的话可以借助redux-immutable库提供的同名方法，但如果只把属性值转为immutable显然更为契合官方的思路，也不需要引入redux-immutable库了

  ```js
  // 需要redux-immutable的combineReducers，引入的第三方库里的reducer(如react-router-redux）必须也得兼容immutable
  store: fromJS({
    a: {},
    b: {}
  })

  // 不需要redux-immutable，可以直接用redux的combineReducers,第三方库的reducer可以直接用
  store: {
    a: fromJS({}),
    b: fromJS({}),
    route: route
  }
  ```

2. 与redux-logger的兼容，来自[redux-logger文档](https://github.com/evgenyrodionov/redux-logger#transform-immutable-with-combinereducers)

  ```js
  const logger = createLogger({
    stateTransformer: (state) => { // 这里把state当作一个内部属性值为immutable的正常对象，如果将整个state转化为immutalbe，`state = state.toJS()`
      let newState = {};

      for (var i of Object.keys(state)) {
        if (Immutable.Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS();
        } else {
          newState[i] = state[i];
        }
      };

      return newState;
    }
  });
  ```

#redux复习

##1.1动机

随着单页应用的复杂化，state多且与ui相互作用

##1.2核心概念

state，如下，但其它的代码不能随意修改它，想更新它的数据，必须发起一个action

```js
state = {
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```
  
action就是一个描述要改变什么的对象

```js
action = {
  type: 'ADD_AN_ARTICLE',
  name: 'hello world'
}
```

reducer将action与state连接起来，reducer就是一个接收state和action的函数，然后返回一个新的state

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  } else {
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
  case 'ADD_TODO':
    return state.concat([{ text: action.text, completed: false }]);
  case 'TOGGLE_TODO':
    return state.map((todo, index) =>
      action.index === index ?
        { text: todo.text, completed: !todo.completed } :
        todo
   )
  default:
    return state;
  }
}
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
}
```

##1.3三大原则

1. 单一数据源，整个state被存储在一棵树中，这棵树只存在于唯一store中

  好处，便于同构，便于调试，便于实现“撤销／重做”

2. state只读，唯一改变state的方法是触发action

  修改通过提交action集中处理state的修改，防止race condition

3. 使用纯函数执行修改

##1.4 先前技术

redux不在意如何存储state，因此可以放心采用immutable库

##2.1 action

一般调用action creators函数创建一个action，然后将action传给dispatch函数`dispatch(action)`

##2.2 reducer

(preState, action) => newState，reducer是纯函数，不要在其中做以下操作：

- 修改传入参数

- 执行有副作用操作，如api请求与路由跳转

- 调用非纯函数

```js
function todoApp(state=initialState, action) {
  switch (action.type) {
    case 'add':
      return Object.assign({}, state, {lists: [...action.lists, ...state.lists]})
    default:
      return state
  }
}
```

拆分合并reducer

```js
function listsFilter(state=[], action) {
  switch (action.type) {
    default:
      return state
  }
}
function todoApp(state={}, action) {
  return {
    listsFilter: listsFilter(state.listsFilter, action),
    todos: getTodos(state.todos, action)
  }
}
// todoApp可以简写为
import { combineReducers } from 'redux'
var todoApp = combineReducers({
  listsFilter,
  todos: getTodos
})
```

小tips，可以将所有顶级reducer放在一个文件中，然后通过`import * as reducers from './reducers.js';combineReducers(reducers)`

##2.3 store

action描述“发生了什么”，reducer根据action更新state的用法，store将它们联系到一起。store有以下职责：

- 维持应用的state

- 获取state，getState()方法

- 更新state, dispatch(action)方法

- 注册监听器, subscribe(listener)

- 注销监听器，调用subscribe返回的函数

redux单一store，当需要拆分逻辑，应该使用reducer组合而非创建多个store

根据已有的reducer创建store非常容易，直接用createStore方法，第二个参数可选的，用于设置state初始状态，同构时非常有用，使客户端接受服务端state用于本地数据初始化

```js
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```

```js
let unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})
```

store的简单实现

```js
let createStore = function(reducer, initialStore) {
  let storeInfo = reducer(initialStore, {})
  let scribe = () => {}
  return {
    dispatch: function(action) {
      scribe()
      storeInfo = reducer(storeInfo, action)
    },
    subscribe: function(func){
      scribe = func
      return () => {
        scribe = () => {}
      }
    },
    getState: () => storeInfo
  }
}
```

##2.4 数据流

严格的单项数据流是redux的核心，优势：数据遵循相同的生命周期，让应用变得更加可预测且容易理解

dispatch(action) => reducer(state, action) => 分到各个子reducer最终合成一个父state => 最终将生成的新state保存在store中

##2.5 搭配react

redux与react间没有关系，但搭配较好，因为react允许以state的形式描述界面

redux的react绑定库基于容器组件和展示组件相分离的开发思想。

展示组件：描述如何展现（骨架、样式）       不使用redux 数据来源props    数据修改从props调用回调函数

容器组件：描述如何运行（数据获取、状态更新）  使用redux 来源redux的state 数据修改通过redux提交action

展示组件例子:

```js
import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
```

容器组件组件的职责是把展示组件和store连接起来

容器组件分为两部分：

- 订阅store，变化的时候及时拿到最新信息

- 更改store，传个action给redux

```js
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
```

自己实现一下：

```js
class Provider extends Component {
  getChildContext = () => {
    return {store: this.props.store}
  }
  render () {
    return React.Children.only(this.props.children)
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}

let connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
  class NewComp extends components {
    state = {
      store: this.context.store.getState()
    }
    componentDidMount () {
      this.context.store.subscribe = () => {
        this.setState({
          store: this.context.store.getState()
        })
      }
    }
    render () {
      return <Component
        {
          ...mapStateToProps(this.state.store)
        }
        {
          ...mapDispatchToProps(this.context.store.dispatch)
        }
      />
    }
  }
  NewComp.contextTypes = {
    store: React.PropTypes.object
  }
  return NewComp
}
```

##3.3 Middleware

发生在action被发起

思路：

```js
// 1. 手动记录
console.log('dispatching', action)
store.dispatch(action)
console.log('new state', store.getState())

// 2. 封装dispatch
store.dispatch = (store, action) => {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('new state', store.getState())
}
// 3. monkeypatching dispatch
var next = store.dispatch
store.dispatch = (store, action) => {
  console.log('dispatching', action)
  next()
  console.log('new state', store.getState())
}
// 4. 不直接替换，而是返回新的dispatch
var logger => store => action => {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('new state', store.getState())
}
var applyMiddleware = (store, middlewares) => {
  middlewares.forEach(middleware => {
    store.dispatch = middleware(store)
  })
}
// 5. 非monkey patch
var logger = store => next => action => {
  console.log('dispatching', action)
  next(action)
  console.log('new state', store.getState())
}
var applyMiddleware = (store, middlewares) => {
  var dispatch = store.dispatch
  middlewares.forEach((middleware) => {
    dispatch = middleware(store)(dispatch)
  })
  return Object.assign({}, store, { dispatch })
}
```

