# uxcore-pagination

---

## TL;DR

pagination ui component for react

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-pagination
$ cd uxcore-pagination
$ npm install
$ gulp server
```

## Usage

```js
var Pagination = require('uxcore-pagination');
React.render(
	<Pagination onChange={onChange} total={50} />, document.getElementById('target'));
```

### demo
http://uxcore.github.io/uxcore/components/pagination/

## API

## Props

|参数|说明|类型|默认值|
|---|----|---|------|
|locale|语言(zh-cn/en-us)|string|zh-cn|
|current|当前页数|number|1|
|total|数据总数|number/jsx|0|
|pageSize|每页条数|number|10|
|onChange|页码改变的回调，参数是改变后的页码|function|noop|
|showTotal|是否显示共多少条|boolean|false|
|showQuickJump|是否可以快速跳转至某页|bool|false|
|showSizeChanger|是否可以改变 pageSize|bool|false|
|sizeOptions|sizeChanger 显示的可选 pageSize|array|[10, 20, 30, 40]|
|onShowSizeChange|pageSize 变化的回调|function|noop|
|className|当为「mini」时，是小尺寸分页|string||
|simple|当添加该属性时，显示为简单分页|object|无|
