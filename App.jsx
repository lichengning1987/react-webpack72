import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './component/TodoList.jsx';
import RepeatArr from './component/repeatArr.jsx';
let RepeatLi = require('./component/repeatLi.jsx');
import FocusText from './component/FocusText.jsx';
let StateUse = require('./component/StateUse.jsx');
let AsyncText = require('./component/AsyncText.jsx');
let OpacityWord = require('./component/OpacityWord.jsx');
let UserGist = require('./component/UserGist.jsx');
import LoadingShows from './component/loadingBtn.jsx';
import Domremove from './component/reactDOMremoveNode.jsx';
import Tabscon from './component/tab.jsx';
import Loading from './component/loading.jsx';
import Demo from './component/MenuDemo.jsx'

import Tabs from './component/tabs.jsx'
let {TabPane} = Tabs;

import According from './component/according.jsx';


class HelloMessage extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <h1>gggg {this.props.name}</h1>
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            loading:true,
        }
    }

    componentDidMount(){

        setTimeout(()=>{
            this.setState({
                loading:false
            })
        },3000)
    }

    render() {
        var props = {
            name:"xiaohong"
        }
        return (
           <div>
                 <According/>
                 <Loading loading={this.state.loading} />
                 <RepeatArr/>
                 <HelloMessage name="Jonh" />
                 <RepeatLi>
                 <span name="first">repeatli1</span>
                 <span name="second">repeatli2</span>
                 </RepeatLi>
                 <FocusText/>
                 <StateUse/>
                 <AsyncText/>
                 <OpacityWord  name="wblcn"/>
                 <UserGist source="https://api.github.com/users/octocat/gists" />
                 <TodoList  {...props} name="小红"></TodoList>
                 <LoadingShows/>
                 <Tabscon>
                 <div name="first">
                 我是第一帧
                 </div>
                 <div name="second">
                 我是第二帧
                 </div>
                 <div name="third">
                 我是第三帧
                 </div>
                 </Tabscon>
                 <Demo />
                 <Tabs defaultActiveKey="2">
                 <TabPane tab="tab 1" key="1">选项卡一</TabPane>
                 <TabPane tab="tab 2" key="2">选项卡二</TabPane>
                 <TabPane tab="tab 3" key="3">选项卡三</TabPane>
                 </Tabs>
               
            </div>
        );
    }
}

//ReactDOM.render( <Domremove /> , document.getElementById('loadWrap'))

export default App;

