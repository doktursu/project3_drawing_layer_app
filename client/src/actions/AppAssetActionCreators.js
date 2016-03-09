var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AppObjectUtils = require('../utils/AppObjectUtils.js');
var AppWebAPIUtils = require('../utils/AppWebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    receiveRawAsset: function(rawAsset) {
        AppDispatcher.dispatch({
            type: ActionTypes.SAVE_ASSET,
            rawAsset: rawAsset
        });
    },

    saveAsset: function(asset) {
        AppDispatcher.dispatch({
            type: ActionTypes.SAVE_ASSET,
            asset: {
                id: AppObjectUtils.newID(),
                objects: asset
            }
        });
    },

    createAsset: function(objects) {
        AppWebAPIUtils.createAsset(objects);
    },

    clickAsset: function(assetID) {
        AppDispatcher.dispatch({
            type: ActionTypes.CLICK_ASSET,
            assetID: assetID
        });
    },

    destroyAsset: function(assetID) {
        AppDispatcher.dispatch({
            type: ActionTypes.DESTROY_ASSET,
            assetID: assetID
        });
    }

};