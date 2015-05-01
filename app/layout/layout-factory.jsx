import React from 'react';
import Router from 'react-router';
import TopBar from './top-bar';
import MainMenu from './main-menu';
import AutoListenerMixin from '../shared/auto-listener-mixin';
import SettingsStore from '../settings/settings-store';

let RouteHandler = Router.RouteHandler;

export default function layoutFactory(routes) {
    return React.createClass({
        mixins: [AutoListenerMixin],
        getInitialState() {
            return { product: 'isii' }
        },
        componentDidMount() {
            this.listenToAuto(SettingsStore, this._onSettingsChange);
        },
        _onSettingsChange() {
            const product = SettingsStore.getState().settings.get('product');
            this.setState({ product: product });
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
