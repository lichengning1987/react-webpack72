/**
 * Forked from project rc-pagination
 * @maintainer eternalsky
 */

const Select = require('uxcore-select2');
const Pager = require('./Pager');
const Options = require('./Options');
const KEYCODE = require('./KeyCode');
const React = require('react'); 
const ReactDOM = require('react-dom');
const i18n = require('./locale');

function noop() {
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
      _current: props.current,
      pageSize: props.pageSize,
    };

    [
      'render',
      '_handleChange',
      '_handleKeyUp',
      '_handleKeyDown',
      '_changePageSize',
      '_isValid',
      '_prev',
      '_next',
      '_hasPrev',
      '_hasNext',
      '_jumpPrev',
      '_jumpNext',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current != this.props.current) {
      this.setState({
        current: nextProps.current,
        _current: nextProps.current
      });
    }

    if (nextProps.pageSize != this.props.pageSize) {
      this.setState({
        pageSize: nextProps.pageSize,
      });
    }
  }

  renderTotal() {
    let prefix = this.props.locale == 'zh-cn' ? "共" : ""; 
    if (this.props.showTotal) {
      return <li className={this.props.prefixCls + "-total"}>{prefix + this.props.total + i18n[this.props.locale]['item']}</li>
    }
  }

  render() {
    const props = this.props;

    const prefixCls = props.prefixCls;
    const allPages = this._calcPage();
    const pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;

    if (props.simple) {
      return (
        <ul className={`${prefixCls} ${prefixCls}-simple ${props.className}`}>
          <div title={`Page ${this.state.current} of ${allPages}`} className={`${prefixCls}-simple-pager`}>
            <span className={`${prefixCls}-current`}>{this.state._current}</span>
            <span className={`${prefixCls}-slash`}>/</span>
            {allPages}
          </div>
          <li title="Previous Page" onClick={this._prev} className={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
            <a className="kuma-icon kuma-icon-triangle-left"></a>
          </li>
          <li title="Next Page" onClick={this._next} className={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
            <a className="kuma-icon kuma-icon-triangle-right"></a>
          </li>
        </ul>
      );
    }

    if (allPages <= 9) {
      for (let i = 1; i <= allPages; i++) {
        const active = this.state.current === i;
        pagerList.push(<Pager rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, i)} key={i} page={i} active={active} />);
      }
    } else {
      jumpPrev = (<li title="Previous 5 Page" key="prev" onClick={this._jumpPrev} className={`${prefixCls}-jump-prev`}>
        <a></a>
      </li>);
      jumpNext = (<li title="Next 5 Page" key="next" onClick={this._jumpNext} className={`${prefixCls}-jump-next`}>
        <a></a>
      </li>);
      lastPager = <Pager last={true} rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, allPages)} key={allPages} page={allPages} active={false} />;
      firstPager = <Pager rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, 1)} key={1} page={1} active={false} />;

      const current = this.state.current;

      let left = Math.max(1, current - 2);
      let right = Math.min(current + 2, allPages);

      if (current - 1 <= 2) {
        right = 1 + 4;
      }

      if (allPages - current <= 2) {
        left = allPages - 4;
      }

      for (let i = left; i <= right; i++) {
        const active = current === i;
        pagerList.push(<Pager rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, i)} key={i} page={i} active={active} />);
      }

      if (current - 1 >= 4) {
        pagerList.unshift(jumpPrev);
      }
      if (allPages - current >= 4) {
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }

    return (
      <ul className={`${prefixCls} ${props.className}`}
        unselectable="unselectable">
        <li title="Previous Page" onClick={this._prev} className={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
          <a className="kuma-icon kuma-icon-triangle-left"></a>
        </li>
        {pagerList}
        <li title="Next Page" onClick={this._next} className={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
          <a className="kuma-icon kuma-icon-triangle-right"></a>
        </li>
        {this.renderTotal()}
        <Options rootPrefixCls={prefixCls}
          locale={props.locale}
          selectComponentClass={props.selectComponentClass}
          selectPrefixCls={props.selectPrefixCls}
          changeSize={this.props.showSizeChanger ? this._changePageSize.bind(this) : null}
          current={this.state.current}
          pageSize={props.pageSize}
          sizeOptions={props.sizeOptions}
          quickGo={this.props.showQuickJumper ? this._handleChange.bind(this) : null} />
      </ul>
    );
  }

  // private methods

  _calcPage(p) {
    let pageSize = p;
    if (typeof pageSize === 'undefined') {
      pageSize = this.state.pageSize;
    }
    return Math.floor((this.props.total - 1) / pageSize) + 1;
  }

  _isValid(page) {
    return typeof page === 'number' && page >= 1 && page !== this.state.current;
  }

  _handleKeyDown(evt) {
    if (evt.keyCode === KEYCODE.ARROW_UP || evt.keyCode === KEYCODE.ARROW_DOWN) {
      evt.preventDefault();
    }
  }

  _handleKeyUp(evt) {
    const _val = evt.target.value;
    let val;

    if (_val === '') {
      val = _val;
    } else if (isNaN(Number(_val))) {
      val = this.state._current;
    } else {
      val = Number(_val);
    }

    this.setState({
      _current: val,
    });

    if (evt.keyCode === KEYCODE.ENTER) {
      this._handleChange(val);
    } else if (evt.keyCode === KEYCODE.ARROW_UP) {
      this._handleChange(val - 1);
    } else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
      this._handleChange(val + 1);
    }
  }

  _changePageSize(size) {
    if (typeof size === 'number') {
      let current = this.state.current;

      this.setState({
        pageSize: size,
      });

      if (this.state.current > this._calcPage(size)) {
        current = this._calcPage(size);
        this.setState({
          current: current,
          _current: current,
        });
      }

      this.props.onShowSizeChange(current, size);
    }
  }

  _handleChange(p) {
    let page = p;
    let me = this;
    if (this._isValid(page)) {
      if (page > this._calcPage()) {
        page = this._calcPage();
      }
      this.setState({
        current: page,
        _current: page,
      }, () => {
        me.props.onChange(page);
      });

      return page;
    }

    return this.state.current;
  }

  _prev() {
    if (this._hasPrev()) {
      this._handleChange(this.state.current - 1);
    }
  }

  _next() {
    if (this._hasNext()) {
      this._handleChange(this.state.current + 1);
    }
  }

  _jumpPrev() {
    this._handleChange(Math.max(1, this.state.current - 5));
  }

  _jumpNext() {
    this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
  }

  _hasPrev() {
    return this.state.current > 1;
  }

  _hasNext() {
    return this.state.current < this._calcPage();
  }
}

Pagination.propTypes = {
  current: React.PropTypes.number,
  total: React.PropTypes.number,
  locale: React.PropTypes.string,
  showTotal: React.PropTypes.bool,
  pageSize: React.PropTypes.number,
  sizeOptions: React.PropTypes.array,
  onChange: React.PropTypes.func,
  showSizeChanger: React.PropTypes.bool,
  onShowSizeChange: React.PropTypes.func,
  selectComponentClass: React.PropTypes.func,
  showQuickJumper: React.PropTypes.bool,
};

Pagination.defaultProps = {
  current: 1,
  total: 0,
  locale: 'zh-cn',
  showTotal: false,
  pageSize: 10,
  sizeOptions: [10, 20, 30, 40],
  onChange: noop,
  className: '',
  selectPrefixCls: 'kuma-select2',
  prefixCls: 'kuma-page',
  selectComponentClass: Select,
  showQuickJumper: false,
  showSizeChanger: false,
  onShowSizeChange: noop,
};

Pagination.displayName = 'Pagination';

module.exports = Pagination;
