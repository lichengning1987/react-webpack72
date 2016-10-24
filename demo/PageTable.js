require('./PageTable.less');
import React from 'react';
import ReactDOM from 'react-dom';
const reactMixin = require('react-mixin');

const Actions = require('./actions.js');
const Store = require('./store.js');

const Reflux = require('reflux');

const { Table } = require('uxcore');
class PageTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            content: {},
            error: false,
            name: 'react'
        };
    }

    componentDidMount() {
        Actions.fetch({}, function(data) {
            console.log(data,"33fff");
        });
    }

    render() {
        let columns = [
            // 开启内置排序功能
            { dataKey: 'title', title: '标题', width: 200, ordered: true},
            { dataKey: 'money', title: '金额', width: 200, type: 'money', delimiter: ","},
            // 通过 render 方法来自定义 Cell 的渲染
            { dataKey: 'agent', title: "金融机构", width: 200, render: function(cellData, rowData) {
                return <span>{`${cellData}(${rowData.money})`}</span>
            }},
            { dataKey: 'person', title: "申请人", width: 150},
            { dataKey: 'date',title: "日期", width: 150}
        ];


        let renderCell = (bs, rowData) => {
            return <span>{bs}</span>
        };

        console.log(this.state.content.list,111222233333)
        
        let tableProps = {
            width: 600,
            jsxdata: {
                data: this.state.content.list
            },
            jsxcolumns: [
                {dataKey: 'workNo', title: '工号', width: 300, render: renderCell},
                {dataKey: 'name', title: '姓名', width: 300, render: renderCell},
                {dataKey: 'nickName', title: '昵称', width: 300, render: renderCell}
            ]
        };

      /*  let tableProps = {
            jsxcolumns: columns,
            pageSize: 5,
            showSearch: true,
            fetchUrl: "http://eternalsky.me:8122/file/getDemo.jsonp"
        }*/
        return (
            <div className="table">
                <h1>Table Demo</h1>
                <Table {...tableProps} />
            </div>
        );
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

reactMixin.onClass(PageTable, Reflux.connect(Store));

module.exports = PageTable;
