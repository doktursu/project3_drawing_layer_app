var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    receiveAll: function(rawFrames) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_FRAMES,
            rawFrames: rawFrames
        });
    },

    receiveCreatedFrame: function(createdFrame) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
            rawFrame: createdFrame
        });
    }

};