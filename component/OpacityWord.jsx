import React from 'react';

class OpacityWord extends React.Component {
    constructor() {
        super();
        this.state ={
            opacity:1.0
        }
    }

    componentDidMount(){
        this.time = setInterval(()=>{
            let opacity = this.state.opacity;
            opacity -= 0.5;
            if (opacity<0.1) {
                opacity=1.0;
            }
            this.setState({opacity:opacity});
        },100);
    }

    componentWillMount(){
        clearInterval(this.time)
    }

    render() {
        return (
            <div style={{ opacity:this.state.opacity }}>
                Hello, {this.props.name}!
            </div>
        )
    }
}

module.exports = OpacityWord ;
//export default ReapeatArr;