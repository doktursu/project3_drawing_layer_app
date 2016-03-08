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

    clickNextFrame: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.CLICK_NEXT_FRAME
        });
    },

    clickNextFrameAlt: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.CLICK_NEXT_FRAME_ALT
        });
    },

    clickPreviousFrame: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.CLICK_PREVIOUS_FRAME
        });
    },

    createFrame: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.CREATE_FRAME
        });
    },

    setFrameInterval: function(frameInterval) {
        AppDispatcher.dispatch({
            type: ActionTypes.SET_FRAME_INTERVAL,
            frameInterval: frameInterval
        });
    }

};