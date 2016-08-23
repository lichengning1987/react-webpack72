import React from 'react';
// 该组件用于将『新增』和『列表』两个组件集成起来
class TodoList  extends React.Component {
    constructor() {
        super();
        this.state = {
            todoList:[]
        }
    }
    render() {
        return (
            <div>
                <TypeNew  />
                <ListTodo todo={this.state.todoList} />
            </div>
        )
    }
}

// TypeNew 组件用于新增数据，
class TypeNew   extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <form>
                <input type="text" placeholder="typing a newthing todo" autoComplete="off" />
            </form>
        )
    }
}
// ListTodo 组件用于展示列表，并可以删除某一项内容，
class ListTodo  extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <ul id="todo-list">
                {
                    this.props.todo.map(function(item,i){
                        return(
                            <li>
                                <label>{item}</label>
                                <button>delete</button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

module.exports = TodoList ;
//export default ReapeatArr;