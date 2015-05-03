import React from 'react';
import {Link} from 'react-router';
import Time from '../shared/time/time'
import AutoListenerMixin from '../shared/auto-listener-mixin';
import SettingsStore from '../settings/settings-store';
import AlarmStore from '../alarms/alarm-store';
import Icon from '../shared/icon';
import IconTypes from '../shared/icon-types';

export default React.createClass({
    mixins: [AutoListenerMixin],
    getInitialState() {
        return { product: 'isii' }
    },
    componentDidMount() {
        this.listenToAuto(SettingsStore, this._onSettingsChange);
        this.listenToAuto(AlarmStore);
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
                            <span className="clickable left-off-canvas-toggle">
                                <Icon type={IconTypes.menu} large={true} clickable={true}/>
                            </span>
                        </li>
                        <li className="logo-container">
                            <img src={`assets/images/${this.state.product}-logo.png`} className="logo"/>
                        </li>
                    </ul>
                    <section className="top-bar-section">
                        <ul className="right info-area">
                            <li className="info-item">
                                <Icon type={IconTypes.network}/>
                            </li>
                            <li className="info-item">
                                <Link to="alarms">
                                    <Icon type={IconTypes.alarm}/>
                                </Link>
                            </li>
                            <li className="info-item">
                                <Icon type={IconTypes.time}/><Time/>
                            </li>
                        </ul>
                    </section>
                </nav>
            </div>
        );
    }
});