var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    clickLayer: function(layerID) {
        AppDispatcher.dispatch({
            type: ActionTypes.CLICK_LAYER,
            layerID: layerID
        });
    },

    toggleVisibility: function(layerID) {
        AppDispatcher.dispatch({
            type: ActionTypes.TOGGLE_VISIBILITY,
            layerID: layerID
        });
    },

    createLayer: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.CREATE_LAYER
        });
    },

    destroyLayer: function(layerID) {
        AppDispatcher.dispatch({
            type: ActionTypes.DESTROY_LAYER,
            layerID: layerID
        });
    },

    moveUpLayer: function(layerID) {
        AppDispatcher.dispatch({
            type: ActionTypes.MOVE_UP_LAYER,
            layerID: layerID
        });
    },

    moveDownLayer: function(layerID) {
        AppDispatcher.dispatch({
            type: ActionTypes.MOVE_DOWN_LAYER,
            layerID: layerID
        });
    },

    renameLayer: function(layerID, layerName) {
        AppDispatcher.dispatch({
            type: ActionTypes.RENAME_LAYER,
            layerID: layerID,
            layerName: layerName
        });
    }

};