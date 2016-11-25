#React Native Doc

##Get Started

安装需要：

1. node `brew install node`
2. wachman `brew install watchman`
3. native cli `npm install -g react-native-cli`
4. ios xcode

###Tutorial

- rn和react类似，只是natvie components替代了web components

- AppRegistry通知rn哪个component是根component

###Props
同react

###State
同react

###Style

- 用js建立一个style对象，所有核心component接受一个名为style的props用来接收style对象

  ```js
  const styles = StyleSheet.create({
    blue: {
      color: 'blue'
    }
  })
  ```
###Height and Width

- rn所有尺寸都是无单位的，表示密度无关像素

- **flex**:根据可用空间动态而定的动态尺寸，`flex:1`表示一个component填满所有可用空间，与所有兄弟组件平均分配空间，`flex:n`比率变为1的n倍；采用此种布局的component的父元素必须占有确定的宽高或者flex，否则子元素的尺寸为0

###Layout with Flexbox

- **flex**布局的目的是为了在不同尺寸的屏幕上提供一致的布局

- rn的flex和css中采用的flex的**区别**：
  
  1. flexDirecion默认column
  
  2. alignItems默认stretch

  3. flex属性的参数只能是数字

- **flexDirection**: 主轴，row／column

- **justifyContent**: 主轴上的分布, flex-start/center/flex-end/space-between/space-around

- **alignItems**: 副轴上的分布，flext-start/center/flex-end/stretch，默认strech拉伸，如果在副轴方向有长度，什么都不做

###Handling Text Input

- **Text Component**: enter text, props **onChangeText** will be called on textChange, **onSubmitEditing** called on text is submitted

###Using a ScrollView

- **ScrollView**提供了一个滚动框，可竖直可水平

- 会渲染出所有信息，不管有没有在可见滚动框中展示出来，所以不适合展示太多数据

###Using a ListView

- **ListView**提供了一个竖直滚动框，比较适合展示数量随时间改变的、大量的、结构相似的数据

- 只会渲染展示在屏幕中的数据

- two props:

  1. **dataSource**: list的内容

  2. **renderRow**: 每条数据的格式

-  **rowHasChanged**创建row的时候要用到，表示之前的row和之后的row不一致即表明row变了
  
  ```js
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // ?
  state = {
    dataSource: ds.cloneDataWithRows(['1', '2']) // ?
  }
  render () {
    return <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
  }
  ```

###Networking

###Navigator

- 用于不同屏幕的跳转

- **场景**：一个页面（或者说屏幕）的内容(component)