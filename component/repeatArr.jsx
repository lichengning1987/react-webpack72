import React from 'react';

class RepeatArr extends React.Component {
    constructor() {
        super();
    }

    render() {
        var arr1 = [
            <h1 key="h1">hello world!</h1>,
            <h2 key="h2">React is awesome</h2>
        ];
        var names = ['Alice', 'jonh', 'Kate','Kate2'];
        return (
            <div>
                {arr1}
                {
                    names.map((name,index) =>{ return <div key={index}>hello,{name}!</div>})
                }
            </div>
        )
    }
}

module.exports = RepeatArr;
//export default ReapeatArr;