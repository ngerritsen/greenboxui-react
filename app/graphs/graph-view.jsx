import React from 'react';
import Slab from '../shared/slab';
import Section from '../shared/section';
import Chart from '../shared/chart/chart';
import Content from '../shared/content';
import TestStore from '../test-store';
import TestActions from '../test-actions';

export default React.createClass({
    getInitialState() {
        return {message: TestStore.message}
    },
    componentDidMount() {
        this.unsubscribe =
            TestStore.listen(this._onTestStoreChange);
    },
    componentWillUnmount() {
        this.unsubscribe();
    },
    _onTestStoreChange(message) {
        this.setState({message: message});
    },
    _handleClick() {
        TestActions.test('hello world');
    },
    render() {
        return (
            <Content>
                <Section>
                    <Slab>
                    {this.state.message}
                        <button onClick={this._handleClick}>Test</button>
                        <Chart />
                    </Slab>
                </Section>
            </Content>

        );
    }
});