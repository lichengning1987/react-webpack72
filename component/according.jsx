import React from 'react';
import './arrcord.css';
import classNames from 'classnames'

class according  extends React.Component {
    constructor() {
        super();
        this.state ={
            visible:true,
            value1:"向上"
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({visible:!this.state.visible});
        this.setState({
            value1: this.state.value1 == "向上" ? "向下" : "向上"
        })
    }

    render() {
        var text = this.state.value;
        let btnclass = classNames({
            'btnup':this.state.visible,
            "btndown":!this.state.visible,
        });
        let prefixCls ="ks-fixcls";
        let contentCls = classNames({
            'showBox':this.state.visible,
            "hideBox":!this.state.visible,
        });;
        let isActive = "active";

        return (
            <div>
                <button onClick={this.handleChange} className={btnclass}>{this.state.value1}</button>
                <div className={contentCls}
                     data-active={isActive}
                     role="tabpanel">
                    <div className={`${prefixCls}-content-box`}>{2344}</div>
                </div>
            </div>
        )
    }
}

module.exports = according ;
//export default ReapeatArr;