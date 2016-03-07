var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    clickFrame: function(frameID) {
        AppDispatcher.dispatch({
            type: ActionTypes.CLICK_FRAME,
            frameID: frameID
        });
    },

    createFrame: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.CREATE_FRAME
        });
    }

};