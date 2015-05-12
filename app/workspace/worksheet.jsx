import React from 'react';

import Section from '../shared/section';
import WorkspaceSelector from './worksheet-selector';

export default React.createClass({
    propTypes: {
        view: React.PropTypes.element
    },
    render() {
        const View = this.props.view;
        const view = View ? View : WorkspaceSelector;

        return (
            <Section columns="6">
                {view}
            </Section>
        );
    }
});