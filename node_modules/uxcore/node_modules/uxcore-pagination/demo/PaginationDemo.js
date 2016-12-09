import React from 'react';
import Pagination from '../src/index';

export default class Demo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			index: 1
		}
	}

	handleChange(page) {
		console.log(page);
		this.setState({
			index: page
		})
	}

	render(){
		let me = this;
		return (
			<div>
				<p>基础分页:</p>
				<Pagination showSizeChanger={true} onChange={onChange} total={50} pageSize={8} locale='en' />
				<p>更多分页:</p>
				<Pagination onChange={onChange} total={500} />
				<p>快速跳转到某一页:</p>
				<Pagination showQuickJumper={true} onChange={onChange} total={500}/>
				<p>迷你版本:</p>
				<Pagination className="mini" current={this.state.index} showTotal={true} showQuickJumper={true} onChange={me.handleChange.bind(me)} total={50} sizeOptions={[5, 10, 20]} pageSize={5} showSizeChanger={true} />
				<p>简单地翻页:</p>
				<Pagination simple onChange={me.handleChange.bind(me)} total={50} pageSize={1} />
			</div>
		);
	}
}

function onChange(key){
	console.log(key);
}
