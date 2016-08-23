import React from 'react';

class AsyncText  extends React.Component {
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
                <input type="text" value={text} onChange={this.handleChange.bind(this)}/>
                <p>
                    {text}
                </p>
            </div>
        )
    }
}

module.exports = AsyncText ;
//export default ReapeatArr;