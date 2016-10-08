import React from 'react';

class RepeatLi extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ol>
                {
                    this.props.children.map((child,index)=>{return <li key={index}>{child}</li>})
                }
            </ol>
        )
    }
}

module.exports = RepeatLi;
//export default ReapeatArr;