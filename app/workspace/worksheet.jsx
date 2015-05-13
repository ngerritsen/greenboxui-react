import React from 'react';

import Section from '../shared/section';
import WorkspaceSelector from './worksheet-selector';

export default React.createClass({
    propTypes: {
        view: React.PropTypes.element
    },
    render() {
        const View = this.props.view;
        const ViewToRender = View ? View : WorkspaceSelector;
        console.log(ViewToRender);
        return (
            <Section columns={6}>
                <div className="slab worksheet clearfix">
                    <ViewToRender/>
                </div>
            </Section>
        );
    }
});