var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    clickLayer: function(layerID) {
        AppDispatcher.dispatch({
            type: ActionTypes.CLICK_LAYER,
            layerID: layerID
        });
    }

};