var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _assets = [];
var _currentID = null;

function _addAsset(asset) {
    _assets.push(asset);
}

function _destroyAsset(assetID) {
    _assets = _assets.filter(function(asset) {
        return asset.id !== assetID;
    });
}

var AssetStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        console.log('----------ASSET STORE----------');
        console.log('current assetID', _currentID);
        console.log('assets', _assets);
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAll: function() {
        return _assets;
    },

    getCurrentAsset: function() {
        var current = _assets.filter(function(asset) {
            return asset.id === _currentID;
        })[0];
        return current;
    }

});

AssetStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.SAVE_ASSET:
            _addAsset(action.asset);
            console.log('SAVING ASSET', _assets);
            AssetStore.emitChange();
            break;

        case ActionTypes.CLICK_ASSET:
            console.log('ClICKED ASSET', action.assetID);
            _currentID = action.assetID;
            AssetStore.emitChange();
            break;

        case ActionTypes.DESTROY_ASSET:
            _destroyAsset(action.assetID);
            AssetStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = AssetStore;