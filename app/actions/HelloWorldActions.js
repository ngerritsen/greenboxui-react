import AppDispatcher from '../dispatcher/AppDispatcher';
import {HelloWorldConstants} from '../constants/HelloWorldConstants';

export const HelloWorldActions = {
    submitMessage: function(message) {
        AppDispatcher.handleViewAction({
            actionType: HelloWorldConstants.SUBMIT_MESSAGE,
            message: message
        })
    }
};