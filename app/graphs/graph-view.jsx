import React from 'react';

import Chart from '../shared/chart/chart';
import Content from '../shared/layout/content';
import Slab from '../shared/layout/slab';
import Section from '../shared/layout/section';

export default React.createClass({
    render() {
        return (
            <Slab>
                <Chart/>
            </Slab>
        );
    }
});