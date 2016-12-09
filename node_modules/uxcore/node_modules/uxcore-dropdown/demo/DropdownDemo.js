import React from 'react';
import Dropdown from '../src/index';
import Menu from 'uxcore-menu';

var menu1 = <Menu>
  <Menu.Item>
    <a target="_blank" href="http://www.alipay.com/">第一个菜单项</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.taobao.com/">第二个菜单项</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.tmall.com/">第三个菜单项</a>
  </Menu.Item>
</Menu>;

var onClick = function ({key}){
  alert('选中了菜单' + key);
};

var menu2 = <Menu onClick={onClick}>
  <Menu.Item key="1">第一个菜单项</Menu.Item>
  <Menu.Item key="2">第二个菜单项</Menu.Item>
  <Menu.Item key="3">第三个菜单项</Menu.Item>
</Menu>;

var menu3 = <Menu>
  <Menu.Item key="0">
    <a target="_blank" href="http://www.alipay.com/">第一个菜单项</a>
  </Menu.Item>
  <Menu.Divider />
  <Menu.Item key="1">
    <a target="_blank" href="http://www.taobao.com/">第二个菜单项</a>
  </Menu.Item>
  <Menu.Item key="3" disabled>第三个菜单项（不可用）</Menu.Item>
</Menu>;

export default class Demo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false
      };
    }
    render(){
        let inlineDropdownCls = 'kuma-dropdown-inline-wrap';
        if (this.state.open) {
          inlineDropdownCls += ' kuma-dropdown-inline-wrap-open';
        }
        return (
            <div style={{paddingLeft: 20}}>
        		<h1>点击触发:</h1>
        		<Dropdown overlay={menu1} trigger={["click"]}>
        			<button className="kuma-button kuma-button-primary">点击触发</button>
        		</Dropdown>
        		<h1>hover触发:</h1>
        		<Dropdown overlay={menu1}>
        			<button className="kuma-button kuma-button-primary">hover触发</button>
        		</Dropdown>
        		<h1>触发事件:</h1>
        		<Dropdown overlay={menu2}>
        			<button className="kuma-button kuma-button-primary">触发事件</button>
        		</Dropdown>
        		<h1>分割线和不可用菜单项:</h1>
        		<Dropdown overlay={menu3} trigger={["click"]}>
        			<button className="kuma-button kuma-button-primary">分割线和不可用菜单项</button>
        		</Dropdown>
            <h1>inline</h1>
              <Dropdown overlay={menu1} overlayClassName="kuma-dropdown-inline" onVisibleChange={function(open){this.setState({open: open})}.bind(this)}>
                <div className={inlineDropdownCls}>
                  <i className="kuma-icon kuma-icon-set"></i>
                </div>
              </Dropdown>
        	</div>
        );
    }
}
