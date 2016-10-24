import React from 'react';


class HelloMessage extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <h1>gggg {this.props.name}</h1>
    }
}


module.exports = HelloMessage ;
//export default ReapeatArr;