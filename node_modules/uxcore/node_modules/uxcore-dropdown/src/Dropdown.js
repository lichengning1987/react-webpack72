import RcDropdown from 'rc-dropdown';
import assign from 'object-assign';

class Dropdown extends RcDropdown {
	constructor(props){
		super(props);
	}
}

Dropdown.displayName = 'uxcore-dropdown';
Dropdown.propTypes = RcDropdown.propTypes;
Dropdown.defaultProps = assign({}, RcDropdown.defaultProps, {
	prefixCls: 'kuma-dropdown',
	overlayClassName: 'uxcore',
    transitionName: 'slideUp'
});

export default Dropdown;
