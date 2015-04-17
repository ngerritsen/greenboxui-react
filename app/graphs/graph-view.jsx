import React from 'react';
import Slab from '../shared/slab';
import Chart from '../shared/chart/chart';
import Content from '../shared/content';

export default React.createClass({
    render() {
        return (
            <Content>
                <div className="small-12 columns content-section">
                    <Slab>
                        <Chart/>
                    </Slab>
                </div>
            </Content>

        );
    }
});