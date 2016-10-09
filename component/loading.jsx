import React from 'react';
import ReactDOM from 'react-dom'
require("./styles.css")

class LoadingShow  extends React.Component {
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
}

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

module.exports = LoadingShow ;
//export default ReapeatArr;