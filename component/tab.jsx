import React from 'react';

class TabheadLi extends React.Component {
    constructor() {
        super();
    }
    render(){

        return (
            <div>
                <ol>
                    {
                        this.props.children.map((child,index)=>{return <li key={index}>{child}</li>})
                    }
                </ol>
            </div>
        )

    }
}

class Tabs  extends React.Component {
    constructor() {
        super();
        this.state ={
            value:'Hello'
        }
        //this.hancleChange = this.hancleChange.bind(this);
    }
    handleChange(index,e){
        //this.setState({value:e.target.value});
        console.log(index,e.target);
    }

    render() {
        var arrs = ["li1","li2","li3"];
        var that = this;
        return (
            <div>
                <h1><strong>Tab组件</strong></h1>
                <TabheadLi>
                    {
                        arrs.map((child,index)=>{return <span key={index} onClick={(e)=>{this.handleChange(index,e)}}>{child}</span>})
                    }
                </TabheadLi>
            </div>
        )
    }
}


export default Tabs;