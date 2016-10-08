import React from 'react';
import TodoList from './component/TodoList.jsx';
let RepeatArr = require('./component/repeatArr.jsx');
let RepeatLi = require('./component/repeatLi.jsx');
let FocusText = require('./component/FocusText.jsx');
let StateUse = require('./component/StateUse.jsx');
let AsyncText = require('./component/AsyncText.jsx');
let OpacityWord = require('./component/OpacityWord.jsx');
let UserGist = require('./component/UserGist.jsx');

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
               <TodoList name="小红"></TodoList>
            </div>
        );
    }
}
export default App;

