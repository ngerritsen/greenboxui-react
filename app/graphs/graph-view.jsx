import React from 'react';

import Chart from '../shared/chart/chart';
import Content from '../shared/content';
import Slab from '../shared/slab';
import Section from '../shared/section';

export default React.createClass({
    render() {
        return (
            <Content>
                <Section>
                    <Slab>
                        <Chart />
                    </Slab>
                </Section>
            </Content>

        );
    }
});