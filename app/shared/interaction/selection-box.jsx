import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default React.createClass({
    propTypes: {
        options: ImmutablePropTypes.listOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object])
        })).isRequired,
        defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.bool]),
        handler: React.PropTypes.func,
        ref: React.PropTypes.string
    },
    getInitialState() {
        return { selectedValue: null }
    },
    _getRef() {
        const propRef = this.props.ref;
        const defaultRef = 'selectedOption';
        return propRef ? propRef : defaultRef;
    },
    _handleSelectionChange(event) {
        event.preventDefault();

        const selectedValue = React.findDOMNode(this.refs[this._getRef()]).value;
        if(this.props.handler) {
            this.props.handler(selectedValue);
        }
        else {
            this.setState({ selectedValue: selectedValue })
        }
    },
    _getSelectedValue() {
        const {defaultValue, options} = this.props;
        if(defaultValue) {
            return defaultValue;
        }
        else if(this.state.selectedValue) {
            return this.state.selectedValue;
        }
        else if(options.count() > 0) {
            return options.get(0).value;
        }
        else {
            return '';
        }

    },
    render() {
        const options = this.props.options.map((option) => {
            return <option value={option.value} key={`${option.value}${option.label}`}>{option.label}</option>;
        });
        return (
            <select ref={this._getRef()} value={this._getSelectedValue()} onChange={this._handleSelectionChange}>
                {options}
            </select>
        )
    }
});