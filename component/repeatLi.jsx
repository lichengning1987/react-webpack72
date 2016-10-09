import React from 'react';

class RepeatLi extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ol>
                {
                    //this.props.children.map((child,index)=>{return <li key={index}>{child} { child.props.name }</li>})
                    React.Children.map(this.props.children, function (child) {
                        return <li>{child}3 { child.props.name }</li>;
                     })
                }
            </ol>
        )
    }
}

module.exports = RepeatLi;
//export default ReapeatArr;