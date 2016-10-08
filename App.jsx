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
import LoadingShows from './component/loading.jsx';
import Domremove from './component/reactDOMremoveNode.jsx';
import Tabcore from './component/tab.jsx';

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
    }
    render() {
        var props = {
            name:"xiaohong"
        }
        return (
           <div>
               <RepeatArr/>
               <HelloMessage name="Jonh" />
               <RepeatLi>
                   <span>li1</span>
                   <span>li2</span>
               </RepeatLi>
               <FocusText/>
               <StateUse/>
               <AsyncText/>
               <OpacityWord  name="wblcn"/>
               <UserGist source="https://api.github.com/users/octocat/gists" />
               <TodoList  {...props} name="小红"></TodoList>
               <LoadingShows />
               <Tabcore />
            </div>
        );
    }
}

ReactDOM.render( <Domremove /> , document.getElementById('loadWrap'))

export default App;

