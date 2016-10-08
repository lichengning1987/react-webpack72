import React from 'react';

class FocusText extends React.Component {
    constructor() {
        super();
        this.state = {
            enable:true
        }
    }
    handleClick(){
        //React.findDOMNode(this.refs.myText).focus(); 13.x.x
        this.refs.myText.focus(); //15.x.x
        this.setState({enable:!this.state.enable})
    }

    render() {
        return (
            <div>
                <input type="text" ref="myText" disabled={this.state.enable}/>
                <input type="button" value="focus the text input"  onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }
}

module.exports = FocusText;
//export default ReapeatArr;