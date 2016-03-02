var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    clickLayer: function(layerIndex) {
        AppDispatcher.dispatch({
            type: ActionTypes.CLICK_LAYER,
            layerIndex: layerIndex
        });
    },

    checkVisible: function(layerIndex) {
        AppDispatcher.dispatch({
            type: ActionTypes.CHECK_VISIBLE,
            layerIndex: layerIndex
        });
    },

    createLayer: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.CREATE_LAYER
        });
    }

};