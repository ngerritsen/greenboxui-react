import React from 'react';
import Time from '../shared/time/time'
import ListenerMixin from 'alt/mixins/ListenerMixin';
import SettingsStore from '../settings/settings-store';

export default React.createClass({
    mixins: [ListenerMixin],
    getInitialState() {
        return { product: 'isii' }
    },
    componentDidMount() {
        this.listenTo(SettingsStore, this._onSettingsChange);
        this._onSettingsChange();
    },
    _onSettingsChange() {
        const product = SettingsStore.getState().settings.get('product');
        this.setState({ product: product });
    },
    render() {
        return (
            <div className="fixed">
                <nav className="top-bar" data-topbar role="navigation">
                    <ul className="title-area">
                        <li className="menu-button-container">
                            <i className="fa fa-bars fa-lg clickable left-off-canvas-toggle"></i>
                        </li>
                        <li className="logo-container">
                            <img src={`assets/images/${this.state.product}-logo.png`} className="logo"/>
                        </li>
                    </ul>
                    <section className="top-bar-section">
                        <ul className="right info-area">
                            <li className="info-item">
                                <span><i className="fa fa-globe"></i></span>
                            </li>
                            <li className="info-item">
                                <span><i className="fa fa-bell"></i></span>
                            </li>
                            <li className="info-item">
                                <span><i className="fa fa-clock-o"></i><Time/></span>
                            </li>
                        </ul>
                    </section>
                </nav>
            </div>
        );
    }
});