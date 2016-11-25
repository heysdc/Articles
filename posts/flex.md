#Flex

##简介

- **w3c**在09年提出的一种**布局**方案，现已得到所有浏览器支持

- **任何容器**都可指定为flex布局`display: flex`，webkit内核`diplay: -webkit-flex;`

- **容器(flex container)**采用flex布局的元素

- **项目(flex item)**: 采用flex布局元素的子元素自动成为容器成员－项目

- **容器**有两根轴：主轴(main axis)与垂直的交叉轴(cross axis)

##容器属性

1. **flex-direction**: 主轴方向

  - row(default)

  - row-reverse

  - column(rn default)

  - column-reverse

2. **flex-wrap**: 主轴方向项目排不下如何折行，折行了就是多条轴线了，其交叉轴对齐方式由**align-content**控制

  - wrap

  - wrap-reverse: 第二行在上方

  - no-wrap(default): 不换行，项目会被挤扁(如果项目flex-shrink属性为默认1)

3. **flex-flow**: flex-direction + flex-wrap

4. **justify-content**: 主轴对齐方式

  - flex-start(default)

  - flex-end

  - center

  - space-between: 两端对齐

  - space-around：项目两端间隔相等，所以项目间隔比项目两端空白大一倍

5. **align-items**: 交叉轴的对齐方式，只适用于一条轴线（即没触发wrap或者wrap-reverse）的情况

  - flex-start

  - flex-end

  - center

  - stretch(default): 沿交叉轴方向没尺寸则拉伸

  - baseline: 文字第一行对齐

6. **align-content**: 只适用于多条轴线的情况，与**align-items**互补
  
  - flex-start

  - flex-end

  - center

  - space-between

  - space-around

  - stretch(默认)

##项目属性

1. **order**: 值为数字，定义项目排列顺序，数越小，位置越靠前

2. **flex-grow**: 主轴上有剩余空间，拉伸，默认为0，项目长度 ＝ 剩余空间／flex-grow总值 ＊ 项目flex-grow值

3. **flex-shrink**: 剩余空间为负，压缩，默认为1

4. **flex-basis**: 与width差不多，默认主轴方向的尺寸，优先级比width高，默认auto

5. **flex**: **flex-grow** + **flex-shrink** + **flex-basis**: 默认(0, 1, auto)，快捷值auto(1, 1, auto)与none(0, 0, auto)

6. **align-self**: 交叉轴的对齐方式，用来覆盖容器的配置，默认auto，即与容器设定相同


###参考

- [Flex 布局教程－阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

- [深入理解css3中的flex-grow、flex-shrink、flex-basis](http://zhoon.github.io/css3/2014/08/23/flex.html)