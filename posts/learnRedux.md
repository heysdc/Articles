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
```javascript
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
```javascript
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
```javascript
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
```javascript
// container.js
import { connect } from 'react-redux'
import TodoList from './TodoList'
const VisibleTodoList = connect(
  mapStateToProps, mapDispatchToProps
) (TodoList)

export default VisibleTodoList
```
5. connect()解决了subscribe的问题，接受store依靠react-redux提供的<Provider>,其子元素自动接收store，如果子元素为container则自动有
```javascript
let store = createStore(reducers)
render(
  <Provider store={store}>
    <AllContainers />
  </Provider>
)
```

##Async Actions

1. 观摩一下接口数据存储，可以用normalizr转一下
```javascript
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
```javascript
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