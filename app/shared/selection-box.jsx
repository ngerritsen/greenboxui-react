import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default React.createClass({
    propTypes: {
        options: ImmutablePropTypes.listOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number)
        })).isRequired,
        defaultValue: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number),
        handler: React.PropTypes.func,
        ref: React.PropTypes.string
    },
    _getRef() {
        const propRef = this.props.ref;
        const defaultRef = 'selectedOption';
        return propRef ? propRef : defaultRef;
    },
    _handleSelectionChange(event) {
        event.preventDefault();

        const selectedValue = React.findDOMNode(this.refs[this._getRef()]).value;
        this.props.handler(selectedValue);
    },
    _getDefaultValue() {
        const {defaultValue, options} = this.props;
        if(defaultValue) {
            return defaultValue
        } else {
            if(options.count() > 0) {
                return options.get(0).value;
            }
        }
    },
    render() {
        const options = this.props.options.map((option) => {
            return  <option value={option.value} key={`${option.value}${option.label}`}>{option.label}</option>;
        });
        return (
            <select
                ref={this._getRef()}
                defaultValue={this._getDefaultValue()}
                onChange={this._handleSelectionChange}
            >
                    {options}
            </select>
        )
    }
});