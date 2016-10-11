import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './component/TodoList.jsx';
import RepeatArr from './component/repeatArr.jsx';
let RepeatLi = require('./component/repeatLi.jsx');
let FocusText = require('./component/FocusText.jsx');
let StateUse = require('./component/StateUse.jsx');
let AsyncText = require('./component/AsyncText.jsx');
let OpacityWord = require('./component/OpacityWord.jsx');
let UserGist = require('./component/UserGist.jsx');
import LoadingShows from './component/loadingBtn.jsx';
import Domremove from './component/reactDOMremoveNode.jsx';
import Tabs from './component/tab.jsx';
import Loading from './component/loading.jsx';

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
            Loading:true,
        }
    }

    componentDidMount(){

        setTimeout(()=>{
            this.setState({
                Loading:false
            })
        },3000)
    }

    render() {
        var props = {
            name:"xiaohong"
        }
        return (
           <div>
               <Loading Loading={this.state.Loading} />
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
            </div>
        );
    }
}

//ReactDOM.render( <Domremove /> , document.getElementById('loadWrap'))

export default App;

