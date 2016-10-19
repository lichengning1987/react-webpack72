# react-webpack  
react中文翻译文档 http://www.css88.com/react/docs/top-level-api.html 
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

### React v0.14 
- React 「一分为二」
原本的 react package 被拆分为 react 及 react-dom 两个 package。其中 react package 中包含 React.createElement、 .createClass、 .Component， .PropTypes， .Children 这些 API,
而 react-dom package 中包含 ReactDOM.render、 ReactDOM.unmountComponentAtNode、 ReactDOM.findDOMNode。
原本在服务端渲染用的两个 API .renderToString 和 .renderToStaticMarkup 被放在了 react-dom/server 中。
### react-dom
- findDOMNode
- render
- unmountComponentAtNode 删除dom节点
在 v0.14 版中 refs 指向的就是 DOM 节点，同时也会保留 .getDOMNode() 方法（带 warning），最终在 v0.15 版中去除该方法。
``` js
var Zoo = React.createClass({  
  render: function() {
    return <div>Giraffe name: <input ref="giraffe" /></div>;
  },
  showName: function() {
    // 之前：
    // var input = this.refs.giraffe.getDOMNode();
    //
    // v0.14 版：
    var input = this.refs.giraffe;
    alert(input.value);
  }
});
```

### todolist组件
一个todolist页面需要一个父组件，两个子组件。父组件当然就是todolist的『总指挥』，两个子组件分别用来add和show、delete。
用通俗的方式讲来，父组件就是领导，两个子组件就是协助领导开展工作的，一切的资源和调动资源的权利，都在领导层级，子组件配合领导工作，
需要资源或者调动资源，只能申请领导的批准。

数据完全由父组件来管理和控制，子组件用来显示、操作数据，得经过父组件的批准，即——父组件通过props的形式将数据传递给子组件，
子组件拿到父组件传递过来的数据，再进行展示。

组件内部的数据由state控制，外部对内部传递数据时使用 props.
针对父组件来说，要存储todolist的数据，那就是内部信息（本身就是自己可控的资源，而不是『领导』控制的资源），用state来存储即可。
而父组件要将todolist数据传递给子组件，对子组件来说，那就是传递进来的外部信息（是『领导』的资源，交付给你来处理），需要使用props。

父组件：有 state = {todoList:[]} 存储数据，还有一个handleChange方法
``` js
handleChange(rows){
    this.setState({
        todoList:rows
    })
}
``` 
接收一个传入的数据，并将它实时更新到组件的 state 中，以便组件根据数据重新render
只要改变了 state ，react自动执行 reader 计算
``` js
<TypeNew onAdd={this.handleChange} todo={this.state.todoList}  />
<ListTodo onDel={this.handleChange} todo={this.state.todoList} />
``` 
TypeNew子组件添加数据，先使用todo获取todoList数据，然后使用onAdd方法通过修改todoList来添加todoList数据
ListTodo子组件添加数据，先使用todo获取todoList数据，然后使用onDel方法通过修改todoList来删除todoList数据
#### TypeNew子组件
``` js
handleAdd(e){
    e.preventDefault();
    // 通过 refs 获取dom元素，然后获取输入的内容
    var inputDOM = this.refs.inputnew;
    var newthing = inputDOM.value.trim();
    // 获取传入的todolist数据
    var rows = this.props.todo;
    if(newthing !== ""){
        // 更新数据，并使用 onAdd 更新到 TodoList 组件的 state 中
        rows.push(newthing);
        this.props.onAdd(rows);
    }
    inputDOM.value = '';
}
render() {
    return (
        // form submit 时，触发 handleAdd 事件
        <form onSubmit={this.handleAdd}>
            <input type="text" ref="inputnew" id="toto-new" placeholder="typing a newthing todo" autoComplete="off" />
            <button>提交</button>
        </form>
    )
}
```
handleAdd方法主要处理提交表单时的验证处理，先获取传入的todolist数据，然后通过onAdd方法修改todolist数据来添加数据。

#### ListTodo子组件
``` js
handleDel(e){
     var delIndex = e.target.getAttribute('data-key');
      // 更新数据，并使用 onDel 更新到 TodoList 的 state 中，以便 React自动render
      this.props.todo.splice(delIndex,1);
      this.props.onDel(this.props.todo)
  }
render() {  
 return (
            <div>
                <ul id="todo-list">
                    {
                        this.props.todo.map((item,i)=>{
                            return(
                                <li key={i}>
                                    <label>{item}</label>
                                    <button className="destroy" onClick={this.handleDel} data-key={i}>delete</button>
                                </li>
                            )
                        })   // {/* 绑定函数的执行this - 以便 this.handleDel */}
                    }
                </ul>
            </div>
        )
    } 
```
handleDel方法根据e.target.getAttribute('data-key')和数组的splice()方法，来删除todo数组数据，最后通过onDel方法修改todo状态数据。

### Loading组件
``` js
constructor() {
        super();
        this.state ={
            Loading:false
        }
        this.handle = this.handle.bind(this);
    }

    handle(e){
        this.setState({Loading:true});
        let time  =  setTimeout(()=>{
                       console.log(11222333444);
                       this.setState({Loading:false});
                     },3000);
    }

    loading(){
        if (this.state.Loading) {
              return <Loading />
        }
        return null;
    }

    render() {
        var text = this.state.value;
        return (
            <div>
                    <button onClick={this.handle} style={{color:'red',background:'blue'}}>弹出loading</button>
                    {this.loading()}
            </div>
        )
    }
```    
初始一个state：Loading,设置state{Loading:false},设置loading方法通过改变state：loading来判断返回<loading>子组件还是返回null，
通过button，this.handle方法，来改变state值来判断是否显示<loading>子组件。

#### Loading子组件
``` js
class Loading  extends React.Component {
    constructor() {
        super();
        this.state ={
            value:'正在加载中......'
        }
    }
    handleChange(e){
        this.setState({value:e.target.value});
    }

    render() {
        var text = this.state.value;
        return (
            <div className="LoadBox">
                    {text}
            </div>
        )
    }
}
```    
### Tab组件
``` js
<Tabs>
     <div name="first">
         我是第一帧
     </div>
     <div name="second">
         我是第二帧
     </div>
     <div name="third">
         我是第三帧
     </div>
 </Tabs>
```
tab组件里面使用嵌套方式来使用，div中name为导航内容，里面的内容为对应显示内容。
``` js
class Tabs extends React.Component{

    constructor(){
        super();
        this.state={
            currentIndex : 0
        };
    }

    check_tittle_index(index){
        return index===this.state.currentIndex ? "Tab_tittle active" : "Tab_tittle";
    }

    check_item_index(index){
        return index===this.state.currentIndex ? "Tab_item show" : "Tab_item";
    }

    render(){
        let _this=this;
        return(
            <div>
                {/*动态生成Tab导航*/}
                <div className="Tab_tittle_wrap">
                    { React.Children.map( this.props.children , (element,index) => {
                        return(
                            /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
                            <div onClick={ () => { this.setState({currentIndex : index}) } } className={ this.check_tittle_index(index) }>{ element.props.name }</div>
                        );
                    }) }
                </div>
                {/*Tab内容区域*/}
                <div className="Tab_item_wrap">
                    {React.Children.map(this.props.children,(element,index)=>{
                        return(
                            <div className={ this.check_item_index(index) }>{ element }</div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
```
React.Children.map来获取Tabs组件中的children:div,通过 element.props.name 来获取导航内容，通过element来获取内容区域显示。
this.state={ currentIndex : 0 }来判断tab切换时显示的索引值，当点击导航区是改变currentIndex状态值。
设置一个方法来判断当前点击时显示的className名称为current,通过判断当前点击的索引值index等于currentIndex时，切换className
















