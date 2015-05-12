import React from 'react';

import Icon from '../shared/icon';
import IconTypes from '../shared/icon-types';
import Section from '../shared/section';
import Translator from '../translation/translator';

export default React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        icon: React.PropTypes.string
    },
    render() {
        const {icon, title} = this.props;
        return (
            <Section>
                <h4>
                    <Icon type={icon}/>
                    <Translator id={title}/>
                </h4>
            </Section>
        );
    }
});