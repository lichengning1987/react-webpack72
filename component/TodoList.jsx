import React from 'react';



/*
React提倡所有的数据都是由父组件来管理，通过props的形式传递给子组件来处理——先记住，接下来再解释这句话。

上文提到，做一个todolist页面需要一个父组件，两个子组件。父组件当然就是todolist的『总指挥』，两个子组件分别用来add和show、delete。
用通俗的方式讲来，父组件就是领导，两个子组件就是协助领导开展工作的，一切的资源和调动资源的权利，都在领导层级，子组件配合领导工作，
需要资源或者调动资源，只能申请领导的批准。

这么说来就明白了吧。数据完全由父组件来管理和控制，子组件用来显示、操作数据，得经过父组件的批准，即——父组件通过props的形式将数据传递给子组件，
子组件拿到父组件传递过来的数据，再进行展示。

另外，根据React开发的规范，组件内部的数据由state控制，外部对内部传递数据时使用 props 。这么看来，针对父组件来说，
要存储todolist的数据，那就是内部信息（本身就是自己可控的资源，而不是『领导』控制的资源），用state来存储即可。
而父组件要将todolist数据传递给子组件，对子组件来说，那就是传递进来的外部信息（是『领导』的资源，交付给你来处理），需要使用props。


 子组件得到数据后，就需要将新数据添加到todolist的数据中。而todolist的数据是由父组件来管理的，子组件不能说改就改呀，得申请父组件的允许和同意呀。
 因此，我们需要让父组件开放一个可以修改数据的接口，然后将这个接口作为props传递给子组件，让其能修改数据。

 另外，子组件调用父组件的接口对todolist数据进行修改了之后，相当于修改了React对象的state数据，
 此时就会触发React的自动更新（就是通过virtual-dom对比，然后更新真实的dom那一套），React会将UI实时随着数据更新，
 就不用我们操心了，这也是React比较强大的地方之一。

 删除数据和新增数据，逻辑上是一样的，都是需要父组件提供一个修改数据的接口，通过props形式传递给子组件，然后让子组件来调用。就不再赘述
*/







// 该组件用于将『新增』和『列表』两个组件集成起来
class TodoList  extends React.Component {

    constructor() {
        super();
        this.state = {
            todoList:[],
            age:1
        }
    }
    // 接收一个传入的数据，并将它实时更新到组件的 state 中，以便组件根据数据重新render
    // 只要改变了 state ，react自动执行 reader 计算
    handleChange(rows){
        this.setState({
            todoList:rows
        })
    }

    componentDidMount(){
        setInterval(() => {
            this.setState({
                age: this.state.age + 1,
            })
        }, 1000);
    }
    
    render() {
        return (
            <div>
                <div>name: {this.props.name}, age: {this.state.age}</div>
                <TypeNew onAdd={this.handleChange.bind(this)} todo={this.state.todoList}  />

                <ListTodo onDel={this.handleChange.bind(this)} todo={this.state.todoList} />
            </div>
        )
    }
}


// TypeNew 组件用于新增数据，它需要 todo 和 onAdd 两个属性，上文已经提到过
// 基本逻辑是：当从 input 中获取数据时，将新数据 push 到todo中，
// 然后使用 onAdd 调用 TodoList 的 handleChange 来更新state，然后react自动render
class TypeNew   extends React.Component {
    constructor() {
        super();
    }
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
            <form onSubmit={this.handleAdd.bind(this)}>
                <input type="text" ref="inputnew" id="toto-new" placeholder="typing a newthing todo" autoComplete="off" />
                <button>提交</button>
            </form>
        )
    }
}
// ListTodo 组件用于展示列表，并可以删除某一项内容，它有 noDel todo 两个属性，上文已经提到过
// 它的基本逻辑是：遍历 todo 的内容，生成数据列表和删除按钮
// 对某一项执行删除时，想将 todo 中的数据删除，
// 然后通过 onDel 事件调用 TodoList 的 handleChange 来更新state，然后react自动render
class ListTodo  extends React.Component {
    constructor() {
        super();
    }
    handleDel(e){
       var delIndex = e.target.getAttribute('data-key');
        // 更新数据，并使用 onDel 更新到 TodoList 的 state 中，以便 React自动render
        this.props.todo.splice(delIndex,1);
        this.props.onDel(this.props.todo)

    }
    render() {
        let propsObj = {
            className: 'logo',
            href: 'https://www.taobao1.com',
        };
        let a = <a {...propsObj} href="//www.baidu.com">淘宝网</a>;
        let b = <a href="//www.baidu.com" {...propsObj} >淘宝网</a>;
        return (
            <div>
                {a} || {b}
                <ul id="todo-list">
                    {
                        this.props.todo.map(function(item,i){
                            return(
                                <li>
                                    <label>{item}</label>
                                    <button className="destroy" onClick={this.handleDel.bind(this)} data-key={i}>delete</button>
                                </li>
                            )
                        }.bind(this))   // {/* 绑定函数的执行this - 以便 this.handleDel */}
                    }
                </ul>
            </div>
        )
    }
}

module.exports = TodoList ;
//export default ReapeatArr;