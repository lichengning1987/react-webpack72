import React from 'react';
import ReactDOM from 'react-dom'

class removeReactDom  extends React.Component {
    constructor() {
        super();
        this.handle = this.handle.bind(this);
    }
    componentDidMount() {
        this.interval = setInterval(()=> {
            console.log('running');
        }, 1000);
    }
    handle(e){
        ReactDOM.unmountComponentAtNode(document.getElementById('loadWrap'));
    }
    
    componentWillUnmount(){
        console.log(22222);
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <button onClick={this.handle} style={{color:'red',background:'blue'}}>reactDOM删除remove节点</button>
            </div>
        )
    }
}

module.exports = removeReactDom ;
//export default removeReactDom;