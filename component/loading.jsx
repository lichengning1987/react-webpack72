import React from 'react';

class Loading  extends React.Component {
    constructor() {
        super();
        this.state ={
            value:'正在加载中......'
        }
    }
    render() {
        var text = this.state.value;
        if(this.props.Loading){
            return (
                <div className="LoadBox">
                    {text}
                </div>
            ) 
        }
        return null;

    }
}

export default Loading;