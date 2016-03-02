var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AppObjectUtils = require('../utils/AppObjectUtils.js');
var AppWebAPIUtils = require('../utils/AppWebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    createObject: function(object, currentLayerID, currentFrameID) {
        var object = AppObjectUtils.getCreatedObjectData(object, currentLayerID);
        AppWebAPIUtils.createObject(object);
    },

    sendCanvas: function(canvas) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_CANVAS,
            canvas: canvas
        })
    }

};