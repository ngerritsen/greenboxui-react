import AppDispatcher from '../core/AppDispatcher';
import {ControlInstanceConstants} from './ControlInstanceConstants';

export const ControlInstanceActions = {
    addControl: function(controlTypeId, name) {
        AppDispatcher.handleViewAction({
            actionType: ControlInstanceConstants.ADD_CONTROL,
            controlTypeId: controlTypeId,
            name: name
        })
    },

    renameControl: function(control, newName) {
        AppDispatcher.handleViewAction({
            actionType: ControlInstanceConstants.RENAME_CONTROL,
            controlInstanceId: control.instanceId,
            newName: newName
        })
    },

    removeControl: function(control) {
        AppDispatcher.handleViewAction({
            actionType: ControlInstanceConstants.REMOVE_CONTROL,
            controlInstanceId: control.instanceId
        })
    }
};
