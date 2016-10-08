# react-webpack72
react-webpack 学习笔记
## react入门
### 核心思想
- 响应式UI
- 单向数据流（数据如何向上传递？）
- 组件化
### 预备知识
- ES6:class、arrow function、object-shorthand
- Babel:preset-es2015-ie、preset-react
  https://github.com/Daniel15/babel-standalone
- nowa:webpack、dev server、gulp
### 技术要点
- JSX语法： 命名、标签闭合、属性写法、特殊属性、行内样式
- 组件渲染：ReactDom.render()
- 组件定义：extends React.Component,constructor(),render()
- 事件绑定：constructor bind,arrow function
- State和Props
- 获取真实DOM节点：ref
- 组件的生命周期
  componentDidMount
  componentWillReceiveProps
  shouldComponentUpdate
  http://groups.alidemo.cn/uxcore/doc/react/lifecircle.html
### Ajax请求
- 时机
  - 初始化 componentDidMount
  - 用户操作：event callback
- Natty-Fetch or jQuery
- 请求回调：setState

### 注意点
- 不要在constructor 里面使用this.props引用
- require 注意大小写（和目录大小以一致），否则云构建失败
- 如果state在初始化时，有数据来自props，则需要注意定义componentWillReceiveProps方法
- 在render方法中尽量减少代码逻辑
- shouldComponentUpdate 
  组件在决定重新渲染（虚拟dom比对完毕生成最终的dom后）之前会调用该函数
  该函数将是否重新渲染的权限交给了开发者，该函数默认直接返回true，表示默认直接出发dom更新：
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  }  
### 学习框架
- UXCore 
  http://uxco.re
  http://groups.alidemo.cn/uxcore/doc/
- nowa
  http://nowa-webpack.github.io/docs/
- Tingle/SaltUI
  http://alinw.alicdn.com/platform/tingle-ui/1.0.3/docs/docs.html


### jsx语法：
- 标签闭合，渲染HTML标签，声明变量采用 首字母小写
```js
var myDivElement = <div className="foo" />;
React.render(myDivElement, document.body);
```
- 渲染React组件，声明变量采用 首字母大写
```js
var MyComponent = React.createClass({/*...*/});
var myElement = <MyComponent someProperty={true} />;
React.render(myElement, document.body);
```
不过需要注意的是 class 和 for 这两个属性，JSX语法最终是要被转换为纯Javascript的，
所以要和在Javascript DOM中一样，用 className 和 htmlFor 。

如果一定要添加自定义属性，那么需要在这些自定义属性之前添加 data- 前缀。
```js
<div data-custom-attribute="foo" />
```
#### Javascript表达式
在JSX语法中写Javascript表达式只需要用 {} 即可，除了字符串title=“TTT”，其他变量都用{}包裹.
属性表达式
```js
React.render(
    <div className={2 > 1 ? 'class-a' : 'class-b'}>content</div>,
    document.body
);
```
子表达式
```js
var Nav = React.createClass({
  render: function () {
    return <div>nav</div>
  }
});
React.render(
  <div>
    {2 > 1 ? <Nav/> : <div>div</div>}
  </div>,
  document.body
);
```
不过要注意的是，JSX语法只是语法糖，它的背后是调用 ReactElement 的构造方法 React.createElement 的，所以类似这样的写法是不可以的：
``` js
// This JSX:
<div id={if (condition) { 'msg' }}>Hello World!</div>

// Is transformed to this JS:
React.createElement("div", {id: if (condition) { 'msg' }}, "Hello World!");
```
可以从转化后的Javascript代码中看出明显的语法错误，所以要不用三目运算符，要不就这样写：
``` js
if (condition) <div id='msg'>Hello World!</div>
else <div>Hello World!</div>
```
有些属性可能是后续添加的，我们没办法一开始就确定，我们可能会写出下面不好的代码：
``` js
var component = <Component />;
component.props.foo = x; // bad
component.props.bar = y; // also bad
``` 
#### 延伸属性
``` js 
var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;
//或者
var props = { foo: x, bar: y };
var component = <Component { ...props } />;
```
这样就相当于：
``` js
var component = <Component foo={x} bar={y} />
```
当需要拓展我们的属性的时候，定义个一个属性对象，并通过 {…props} 的方式引入，在JSX中，可以使用 ... 运算符，表示将一个对象的键值对与 ReactElement 的 props 属性合并，这个 ... 运算符的实现类似于ES6 Array中的 ... 运算符的特性。，React会帮我们拷贝到组件的props属性中。重要的是—这个过程是由React操控的，不是手动添赋值的属性。

它也可以和普通的XML属性混合使用，需要同名属性，后者将覆盖前者：
``` js 
var props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'
``` 
### JSX 陷阱
#### style属性
在React中写行内样式时，要这样写，不能采用引号的书写方式
``` js 
React.render(
    <div style={{color:'red'}}>
        xxxxx
    </div>,
    document.body
);
```
#### HTML转义
比如我们有一些内容是用户输入的富文本，从后台取到数据后展示在页面上，希望展示相应的样式
``` js 
var content='<strong>content</strong>';

React.render(
    <div>{content}</div>,
    document.body
);
```
结果页面直接输出内容了：
``` js 
<strong>content</strong>
```
React默认会进行HTML的转义，避免XSS攻击，如果要不转义，可以这么写：
``` js 
var content='<strong>content</strong>';    

React.render(
    <div dangerouslySetInnerHTML={{__html: content}}></div>,
    document.body
);
```
### 选取 DOM 元素
在 React 中，我们可以使用 ref 来更有针对性的获取元素。
``` js 
import React from 'react';
class Demo extends React.Compoent {

    getDomNode() {
        return this.refs.root; // 获取 Dom Node
    }
    render() {
        return (
            <div ref="root">just a demo</div>
        );
    }
}
```
上面介绍了简单的ref写法，如果用 React 推荐的写法，我们可以这样写
``` js 
import React from 'react';
import ReactDOM from 'react-dom';
class Sub extends React.Compoent {
    getDomNode() {
        return this.rootNode;
    }
    render() {
        return (
            <div ref={(c) => this.rootNode = c}>a sub component</div>
        );
    }
}
class Demo extends React.Compoent {

    getDomNode() {
        return this.rootNode; // 获取 Dom Node
    }
    
    getSubNode() {
        return this.sub.getDomNode(); // 获取子组件根节点
    }
    render() {
        return (
            <div ref={(c) => this.rootNode = c}>
                <Sub ref={(c) => this.sub = c} />
            </div>
        );
    }
}
```
### DOM 操作
- React 通过数据驱动的思想，通过改变 view 对应的数据，轻松实现 DOM 的增删操作。
``` js 
class Demo extends React.Compoent {
    constructor(props) {
        super(props);
        this.state = {
            list: [1, 2, 3],
        }；
        this.addItemFromBottom = this.addItemFromBottom.bind(this);
        this.addItemFromTop = this.addItemFromTop.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    addItemFromBottom() {
        this.setState({
            list: this.state.list.concat([4]),
        });
    }
    
    addItemFromTop() {
        this.setState({
            list: [0].concat(this.state.list),
        });
    }
    
    deleteItem() {
        const newList = [...this.state.list];
        newList.pop();
        this.setState({
            list: newList,
        });
    }
    
    render() {
        return (
            <div>
                {this.state.list.map((item) => <div>{item}</div>)}
                <button onClick={this.addItemFromBottom}>尾部插入 Dom 元素</button>
                <button onClick={this.addItemFromTop}>头部插入 Dom 元素</button>
                <button onClick={this.deleteItem}>删除 Dom 元素</button>
            </div>
        );
    }
}
```
### 事件的监听
- React 通过根节点代理的方式，实现了一套很优雅的事件监听方案，在组件 unmount 时也不需要自己去处理内存回收相关的问题，非常的方便。
``` js 
import React from 'react';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        alert('我是弹窗')；
    }
    render() {
        return (
            <div onClick={this.handleClick}>点击我弹出弹框</div>
        );
    }
}
```
这里有一个小细节就是 bind 的时机，bind 是为了保持相应函数的上下文，虽然也可以在 onClick 那里 bind，但这里选择在 constructor 里 bind 是因为前者会在每次 render 的时候都进行一次 bind，返回一个新函数，是比较消耗性能的做法。

但 React 的事件监听，毕竟只能监听至 root component，而我们在很多时候要去监听 window/document 上的事件，如果 resize、scroll，还有一些 React 处理不好的事件，比如 scroll，这些都需要我们自己来解决。事件监听为了屏蔽差异性需要做很多的工作，这里像大家推荐一个第三方库来完成这部分的工作， add-dom-event-listener ，用法和原生的稍有区别，是因为这个库并不旨在做 polyfill，但用法还是很简单。

``` js 
var addEventListener = require('add-dom-event-listener');
var handler = addEventListener(document.body, 'click', function(e){
  console.log(e.target); // works for ie
  console.log(e.nativeEvent); // native dom event
});
handler.remove(); // detach event listener
```
另一个选择是 [bean](https://github.com/fat/bean) ，达到了 IE6+ 级别的兼容性。

### document.ready
React 作为一个 view 层框架，通常情况下页面只有一个用于渲染 React 页面组件的根节点 div，因此 document.ready，只需把脚本放在这个 div 后面执行即可。而对于渲染完成后的回调，我们可以使用 React 提供的 componentDidMount 生命周期。
``` js 
import React from 'react';
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        doSomethingAfterRender(); // 在组件渲染完成后执行一些操作，如远程获取数据，检测 DOM 变化等。
    }
    render() {
        return (
            <div>just a demo</div>
        );
    }
}
```
### attr 方法
jQuery 使用 attr 方法，获取 Dom 元素的属性。在 React 中也可以配合 Ref 直接读取 DOM 元素的属性。
``` js 
import React from 'react';
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.rootNode.scrollLeft = 10; // 渲染后将外层的滚动调至 10px
    }
    render() {
        return (
            <div 
                ref={(c) => this.rootNode = c} 
                style={{ width: '100px', overflow: 'auto' }}
            > 
                <div style={{ width: '1000px' }}>just a demo</div>
            </div>
        );
    }
}
``` 
但是，在大部分的情况下，我们完全不需要做，因为 React 的单向数据流和数据驱动渲染，我们可以不通过 DOM，轻松拿到和修改大部分我们需要的 DOM 属性。
``` js 
import React from 'react';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '//www.taobao.com',
        };
        this.getLink = this.getLink.bind(this);
        this.editLink = this.editLink.bind(this);
    }
    
    getLink() {
        alert(this.state.link);
    }
    
    editLink() {
        this.setState({
            link: '//www.tmall.com',
        });
    }
    
    render() {
        return (
            <div>
                <a href={this.state.link}>跳转链接</a>
                <button onClick={this.getLink}>获取链接</button>
                <button onClick={this.editLink}>修改链接</button>
            </div>
        );
    }
    
}
```
### addClass/removeClass/toggleClass
在 React 中通过数据驱动和第三库 classnames 修改样式从未如此轻松。
``` js 
.fn-show {
    display: block;
}
.fn-hide {
    display: none;
}
```
``` js 
import React from 'react';
import classnames from 'classnames';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
        this.changeShow = this.changeShow.bind(this);
    }
    
    changeShow() {
        this.setState({
            show: !this.state.show, 
        });
    }
    
    render() {
        return (
            <div>
                <a 
                    href="//www.taobao.com" 
                    className={classnames({
                        'fn-show': this.state.show,
                        'fn-hide': !this.state.show,
                    })}
                >
                    跳转链接
                </a>
                <button onClick={this.changeShow}>改变现实状态</button>
            </div>
        );
    }
    
}
```
### css
在 React 中，我们可以直接设置 DOM 的 style 属性，如果想改变，和上面的 class 一样，用数据去驱动。
``` js 
import React from 'react';
class Demo extends React.Component {
    constructor() {
        super(props);
        this.state = {
            backgorund: 'white',
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState({
            background: 'black',
        });
    }
    
    render() {
        return (
            <div 
                style={{
                    background: this.state.background,
                }}
            >
                just a demo
                <button onClick={this.handleClick}>change Background Color</button>
            </div>
        );
    }
}
```
### 数据存储
react 反而是更擅长管理数据,利用 state 或者 内部变量(this.xxx) 来保存，在整个生命周期，我们都可以拿到这些数据进行比较和修改。

### Ajax
Ajax 确实是在处理兼容性问题上一块令人比较头疼的地方，要兼容各种形式的 Xhr 不说，还有 jsonp 这个不属于 ajax 的功能也要同时考虑，好在已经有了很好的第三方库帮我们解决了这个问题，这里向大家推荐 [natty-fetch](https://www.npmjs.com/package/natty-fetch) ，一个兼容 IE8 的fetch 库，在 API 设计上向 fetch 标准靠近，而又保留了和 jQuery 类似的接口，熟悉 $.ajax 应该可以很快的上手。

### 动画
React 在动画方面提供了一个插件 [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup) ，和它的低级版本 [ReactTransitionGroup](https://facebook.github.io/react/docs/animation.html#low-level-api-reacttransitiongroup) ，注意这里的低级并不是退化版本，而是更加基础的暴露更多 API 的版本。

这个插件的灵感来自于 Angular 的 ng-animate，在设计思路上也基本保持一致。通过指定 Transition 的类名，比如 example ，在元素进场和退场的时候分别加上对应的类名，以实现 CSS3 动画。例如本例中，进场会添加 example-enter 和 example-enter-active 到对应的元素 ，而在退场 example-leave 和 example-leave-active 类名。当然你也可以指定不同的进场退场类名。而对应入场，React 也区分了两种类型，一种是 ReactCSSTransitionGroup 第一次渲染时(appear)，而另一种是 ReactCSSTransitionGroup 已经渲染完成后，有新的元素插入进来(enter)，这两种进场可以使用 prop 进行单独配置，禁止或者修改超时时长。具体的例子，在上面给出的链接中有详细的例子和说明，因此本文不再赘述

但这个插件最多只提供了做动画的方案，如果我想在动画进行的过程中做一些其他事情呢？他就无能为力了，这时候就轮到 ReactTransitionGroup 出场了。ReactTransitionGroup 为他包裹的动画元素提供了六种新的生命周期： componentWillAppear(callback) , componentDidAppear() , componentWillEnter(callback) , componentDidEnter() , componentWillLeave(callback) , componentDidLeave() 。这些 hook 可以帮助我们完成一些随着动画进行需要做的其他事。

但官方提供的插件有一个不足点，动画只是在进场和出场时进行的，如果我的组件不是 mount/unmount，而只是隐藏和显示怎么办？这里推荐一个第三方库： rc-animate ，从 API 设计上他基本上是延续了 ReactCSSTransitionGroup 的思路，但是通过引入 showProp 这一属性，使他可以 handle 组件显示隐藏这一情况下的出入场动画（只要将组件关于 show/hide 的属性传给 showProp 即可），同时这个库也提供自己的 hook，来实现 appear/enter/leave 时的回调。

如果你说我并不满足只是进场和出场动画，我要实现类似鼠标拖动时的实时动画，我需要的是一个 js 动画库，这里向大家推荐一个第三方库： [react-motion](https://www.npmjs.com/package/react-motion) , react-motion 一个很大的特点是，有别以往使用贝塞尔曲线来定义动画节奏，引入了刚度和阻尼这些弹簧系数来定义动画，按照作者的说法，与其纠结动画时长和很难掌握的贝塞尔表示法，通过不断调整刚度和阻尼来调试出最想要的弹性效果才是最合理的。Readme 里提供了一系列的很炫的动画效果，比如这个 [draggable list](http://chenglou.github.io/react-motion/demos/demo8-draggable-list/) 。Motion 通过指定 defaultStyle、style，传回给子组件正在变化中的 style，从而实现 js 动画。

``` js 
<Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
  {interpolatingStyle => <div style={interpolatingStyle} />}
</Motion>
```
### 布尔属性、表达式与注释（JSX语法）
``` js
// 禁用样式的按钮
<input type="button" disabled />;
<input type="button" disabled={true} />;

// 正常使用的按钮
<input type="button" />;
<input type="button" disabled={false} />;

// 输入 (JSX):
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
// 三元运算符，window.isLoggedIn 存在输出<Nav />组件，否则输出<Login/>组件

// 输出 (JS):
var content = React.createElement(
  Container,
  null,
  window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
);


var content = (
  <Nav>
    {/* 子组件注释，加上 {} 花括号 */}
    <Person
      /* 组件
         属性
         注释
       */
      name={window.isLoggedIn ? window.name : ''} // end of line comment
    />
  </Nav>
);
```
### 属性传入组件的多种方式（JSX语法）
``` js
//变量放在{}中
var component = <Component foo={x} bar={y} />;


var component = <Component />;
component.props.foo = x; // 不推荐，最丑的做法
component.props.bar = y; // 不推荐，颜值低得人可以这么干

//传入对象的方式传入属性
var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;

//注意,后面会覆盖前面的
var props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 输出为'override'
```

### JSX 陷阱（JSX做了一些处理防止XSS攻击）
``` js
// 会显示 “First · Second” 
<div>{'First · Second'}</div>

// 它会显示 "First · Second"
<div>First · Second</div>

// 正确做法，帅的人都这么干
<div>{'First \u00b7 Second'}</div>
<div>{'First ' + String.fromCharCode(183) + ' Second'}</div>
// 同时你还可以这样玩，加上[]，以数组的形式。
<div>{['First ', <span>·</span>, ' Second']}</div>

//但是有的适合，我的项目中就需要这样干，就要原来的。
//给dangerouslySetInnerHTML传入一个对象，其中有一个__html属性，其中写了你的文本。
<div dangerouslySetInnerHTML={{__html: 'First · Second'}} />

//假如你想加上自定义属性，必须加上data-前缀
//以aria-开头的属性页可以被渲染出来
<div data-custom-attribute="foo" />
<div aria-hidden={true} />
```
### 组件生命周期（别纠结这是干什么，纠结你就输了，先看一看文字，不用去弄懂他们，跳过都行，细节后面在讲解）
``` js
初始化阶段
getDefaultPropos：只调用一次，实力之间共享引用
getInitialState：初始化每个实例特有的状态
componentWillMount：render之前最后一次修改状态的机会
render：只能访问this.props和this.state，只有一个顶层组件，不允许修改状态和DOM输出
componentDidMount：成功render并渲染完成真实DOM后触发，可以修改DOM
```

``` js
运行中阶段
componentWillReceiveProps:父组件修改属性触发，可以修改新属性，修改状态
shouldComponentUpdate:返回false会阻止render调用
componentWillUpeate:不能修改属性和状态
render:只能访问this.props和this.state，只有一个顶层组件，不允许修改状态和DOM输出
componentDidUpdate:可以修改DOM
```

``` js
销毁阶段：
componentWillUnMount:在删除组件之前进行清理操作，比如计时器和事件监听器。
``` 

### 什么时候使用状态state
你的大部分组件应该只需从props中取一些数据并渲染它。然而，
有时你需要对用户输入、服务器请求或时间的推移作出反应。为此您使用state状态。
尽可能保持尽可能多的组件成为可能的state状态。
通过这样做，您将分离到它最合乎逻辑的地方，并尽量减少冗余。
一个常见的模式是创建多个无状态的组件，只是提供props数据，
并有一个有state状态的组件上面，通过其state状态通过子组件的层次。
有状态组件封装了所有的交互逻辑，而无状态的组件专注呈现数据。
建设一个有状态的组件时，考虑其状态的最小可能性，
this.state应该只包含需要代表你的UI状态的最小数据量，不要包含计算数据、反应元件（基于基本的道具和状态建立他们）
- 影响到render方法（需要的更新图）
- 组件内部改变值
### 什么时候使用props
props是父组件传递到子组件上时使用

