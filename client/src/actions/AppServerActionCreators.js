var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    receiveAllFrames: function(rawFrames) {
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
    },

    receiveAllObjects: function(rawObjects) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_OBJECTS,
            rawObjects: rawObjects
        });
    },

    receiveRawAnimation: function(rawAnimation) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_ANIMATION,
            rawAnimation: rawAnimation
        });
    },

    receiveCreatedObject: function(createdObject) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_CREATED_OBJECT,
            object: createdObject
        })
    }

};