import Reflux from 'reflux';
import TestActions from './test-actions';

const TestStore = Reflux.createStore({
    init() {
        this.message = 'hello';

        this.listenTo(TestActions.test, this.onTest);
    },
    onTest(message) {
        this.message = message;
        this.trigger(this.message);
    }
});

export default TestStore;