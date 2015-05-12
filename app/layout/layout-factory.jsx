import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import TopBar from './top-bar';
import MainMenu from './main-menu';
import SettingsStore from '../settings/settings-store';

let RouteHandler = Router.RouteHandler;

export default function layoutFactory(routes) {
    return React.createClass({
        mixins: [Reflux.ListenerMixin],
        getInitialState() {
            return { product: SettingsStore.settings.get('product') }
        },
        componentDidMount() {
            this.listenTo(SettingsStore, this._onSettingsChange);
        },
        _onSettingsChange() {
            this.setState({ product: SettingsStore.settings.get('product') });
        },
        render() {
            return (
                <div className={`container ${this.state.product}-theme`}>
                    <TopBar/>
                    <div className="off-canvas-wrap" data-offcanvas>
                        <div className="inner-wrap">
                            <MainMenu navItems={routes} />
                            <RouteHandler/>
                            <a className="exit-off-canvas"></a>
                        </div>
                    </div>
                </div>
            );
        }
    });
}
