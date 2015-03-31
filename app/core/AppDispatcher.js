import Flux from 'flux';
import {CoreConstants} from './CoreConstants';

class AppDispatcher extends Flux.Dispatcher {
    handleViewAction(action) {
        this.dispatch({
            source: CoreConstants.VIEW_ACTION,
            action: action
        })
    }
}

export default new AppDispatcher();