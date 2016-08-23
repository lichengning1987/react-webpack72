import React from 'react';

class StateUse  extends React.Component {
    constructor() {
        super();
        this.state ={
            like:true
        }
    }
    handleClick(){
        this.setState({like:!this.state.like});
    }

    render() {
        var text = this.state.like ? 'Like':'Unlike';
        return (
            <div>
                <p onClick={this.handleClick.bind(this)}>You {text} this.click the toggle</p>
            </div>
        )
    }
}

module.exports = StateUse;
//export default ReapeatArr;