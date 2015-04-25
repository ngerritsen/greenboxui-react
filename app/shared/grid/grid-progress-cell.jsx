import React from 'react';
import classnames from 'classnames';

export default React.createClass({
    propTypes: {
        value: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired
    },
    _getCalculatedWidthPercentage() {
        const {value, total} = this.props;
        const widthPercentage = value / total * 100;
        if(widthPercentage > 100) {
            return 100
        }
        return widthPercentage;
    },
    render() {
        const widthPercentage = this._getCalculatedWidthPercentage();
        return (
            <span>
                <div className="progress round">
                    <span className="meter" style={{width: `${widthPercentage}%`}}></span>
                </div>
            </span>
        );

    }
});