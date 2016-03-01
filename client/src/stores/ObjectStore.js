var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AppObjectUtils = require('../utils/AppObjectUtils.js');
var LayerStore = require('./LayerStore.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _objects = {};

function _addObjects(rawObjects) {
    rawObjects.forEach(function(object) {
        if (!_objects[object.id]) {
            _objects[object.id] = AppObjectUtils.convertRawObject(object);
        }
    });
}

function _markOnlyAllInLayerSelectable(layerID) {
    for (var id in _objects) {
        if (_objects[id].layerIndex === layerID) {
            console.log(_objects[id], 'is selectable');
            _objects[id].selectable = true;
        } else {
            console.log(_objects[id], 'is not selectable');
            _objects[id].selectable = false;
        }
    }
}

function _toggleAllInLayerVisibility(layerID) {
    for (var id in _objects) {
        if (_objects[id].layerIndex === layerID) {
            _objects[id].visible = !_objects[id].visible
            console.log(_objects[id], 'set un/visible');
        }
    }
}

var ObjectStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAll: function() {
        return _objects;
    },

    getAllForAnimation: function(animationId) {
        var animationObjects = [];
        for (var id in _objects) {
            if (_objects[id].animationId === animationId) {
                animationObjects.push(_objects[id]);
            }
        }
        return animationObjects;
    },

    getAllOrdered: function() {
        var orderedObjects = [];
        for (var id in _objects) {
            var object = _objects[id];
            orderedObjects.push(object);
        }
        orderedObjects.sort(function(a, b) {
            return a.id - b.id;
        })
        return orderedObjects;
    }

});

ObjectStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CLICK_LAYER:
            AppDispatcher.waitFor([LayerStore.dispatchToken]);
            _markOnlyAllInLayerSelectable(LayerStore.getCurrentID());
            ObjectStore.emitChange();
            break;

        case ActionTypes.CHECK_VISIBLE:
            _toggleAllInLayerVisibility(action.layerID);
            ObjectStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_OBJECTS:
            _addObjects(action.rawObjects);
            ObjectStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = ObjectStore;