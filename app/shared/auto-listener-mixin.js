import ListenerMixin from 'alt/mixins/ListenerMixin';

export default {
    mixins: [ListenerMixin],
    listenToAuto(store, handler) {
        if(handler && typeof handler === 'function') {
            this.listenTo(store, handler);
            handler();
        } else {
            this.listenTo(store, () => {
                this.setState(store.getState());
            });
            this.setState(store.getState());
        }
    }
}