import React from 'react';
import Reflux from 'reflux';
import {Link} from 'react-router';

import AlarmStore from '../alarms/alarm-store';
import Icon from '../shared/icon';
import IconTypes from '../shared/icon-types';
import SettingsStore from '../settings/settings-store';
import Time from '../shared/time/time'

export default React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState() {
        return {
            product: SettingsStore.settings.get('product'),
            alarmCount: AlarmStore.alarms.count()
        }
    },
    componentDidMount() {
        this.listenTo(SettingsStore, this._onSettingsChange);
        this.listenTo(AlarmStore, this._onAlarmsChange);
    },
    _onSettingsChange() {
        this.setState({ product: SettingsStore.settings.get('product') });
    },
    _onAlarmsChange() {
        this.setState({ alarmCount: AlarmStore.alarms.count() });
    },
    render() {
        const {product, alarmCount} = this.state;
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
                            <img src={`assets/images/${product}-logo.png`} className="logo"/>
                        </li>
                    </ul>
                    <section className="top-bar-section">
                        <ul className="right info-area">
                            <li className="info-item">
                                <Icon type={IconTypes.network}/>
                            </li>
                            <li className="info-item">
                                <Link to="alarms">
                                    <Icon type={IconTypes.alarm} notifications={alarmCount} clickable={true}/>
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