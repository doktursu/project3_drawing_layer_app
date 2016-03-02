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

    checkVisible: function(layerID) {
        AppDispatcher.dispatch({
            type: ActionTypes.CHECK_VISIBLE,
            layerID: layerID
        });
    },

    createLayer: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.CREATE_LAYER
        });
    },

    deleteLayer: function(layerID) {
        AppDispatcher.dispatch({
            type: ActionTypes.DELETE_LAYER,
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

};