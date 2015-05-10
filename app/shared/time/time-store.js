import Reflux from 'reflux';

export default Reflux.createStore({
    init() {
        this.time = new Date();

        setInterval(() => {
            const newTime = new Date();
            this.time = new Date();
            this.trigger(this.time)
        }, 1000);
    }
});
