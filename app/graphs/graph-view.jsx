import React from 'react';
import Slab from '../shared/slab';
import Section from '../shared/section';
import Chart from '../shared/chart/chart';
import Content from '../shared/content';

export default React.createClass({
    render() {
        return (
            <Content>
                <Section>
                    <Slab>
                        <Chart/>
                    </Slab>
                </Section>
            </Content>

        );
    }
});