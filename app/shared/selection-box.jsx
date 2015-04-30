import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default React.createClass({
    propTypes: {
        options: ImmutablePropTypes.listOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number)
        })).isRequired,
        defaultValue: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number),
        handler: React.PropTypes.func
    },
    _handleSelectionChange(event) {
        event.preventDefault();

        const selectedValue = React.findDOMNode(this.refs.selectedOption).value;
        this.props.handler(selectedValue);
    },
    _getDefaultValue() {
        const {defaultValue, options} = this.props
        if(defaultValue) {
            return defaultValue
        } else {
            return options.get(0).value;
        }
    },
    render() {
        const options = this.props.options.map((option) => {
            return  <option value={option.value} key={option.value}>{option.label}</option>;
        });
        return (
            <select
                ref="selectedOption"
                defaultValue={this._getDefaultValue()}
                onChange={this._handleSelectionChange}
            >
                    {options}
            </select>
        )
    }
});