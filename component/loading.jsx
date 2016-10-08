import React from 'react';

class LoadingShow  extends React.Component {
    constructor() {
        super();
        this.state ={
            Loading:false
        }
    }
    handle(e){
        this.setState({Loading:true});
        let time  =  setTimeout(function(){
                       console.log(11222333444);
                       this.setState({Loading:false});
                     }.bind(this),3000);
    }

    loading(){
        console.log(this.state.Loading);
        if (this.state.Loading) {
              return <Loading />
        }
        return null;
    }

    render() {
        var text = this.state.value;
        return (
            <div>
               <button onClick={this.handle.bind(this)}>弹出loading</button>
               {this.loading()}
            </div>
        )
    }
}

class Loading  extends React.Component {
    constructor() {
        super();
        this.state ={
            value:'Hello'
        }
    }
    handleChange(e){
        this.setState({value:e.target.value});
    }

    render() {
        var text = this.state.value;
        return (
            <div>
                正在加载中。。。。
            </div>
        )
    }
}

module.exports = LoadingShow ;
//export default ReapeatArr;