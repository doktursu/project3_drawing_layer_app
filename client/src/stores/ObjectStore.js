var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AppObjectUtils = require('../utils/AppObjectUtils.js');
var LayerStore = require('./LayerStore.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _objects = {};
var _canvas = null;

function _addObjects(rawObjects) {
    rawObjects.forEach(function(object) {
        if (!_objects[object.id]) {
            _objects[object.id] = AppObjectUtils.convertRawObject(object);
        }
    });
}

function _markOnlyAllInLayerSelectable(layerID) {
    for (var id in _objects) {
        var object = _objects[id];
        if (object.layerID === layerID) {
            object.selectable = true;
            object.evented = true;
            object.opacity = 1
        } else {
            object.selectable = false;
            object.evented = false;
            object.opacity = 0.5;
        }
    }

    // _canvas._objects.forEach(function(object) {
    //     if (object.layerID === layerID) {
    //         object.selectable = true;
    //         object.evented = true;
    //         object.opacity = 1
    //     } else {
    //         object.selectable = false;
    //         object.evented = false;
    //         object.opacity = 0.8;
    //     }
    // });
}

function _toggleAllInLayerVisibility(layerID) {
    for (var id in _objects) {
        if (_objects[id].layerID === layerID) {
            _objects[id].visible = !_objects[id].visible;
        }
    }

    // _canvas._objects.forEach(function(object) {
    //     if (object.layerID === layerID) {
    //         object.visible = !object.visible
    //     }
    // });
}

function _destroyAllInLayer(layerID) {
    for (var id in _objects) {
        if (_objects[id].layerID === layerID) {
            _canvas.remove(_objects[id]);
            delete _objects[id];
        }
    }
    var orderedObjects = [];
    for (var id in _objects) {
        orderedObjects.push(_objects[id]);
    }
}

var ObjectStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        console.log('----------OBJECT STORE----------');
        console.log('object store canvas', _canvas);
        console.log('objects', _objects);
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
        // var orderedObjects = [];
        // for (var id in _objects) {
        //     orderedObjects.push(_objects[id]);
        // }
        // orderedObjects.sort(function(a, b) {
        //     return LayerStore.getIndexForID(a.layerID) - LayerStore.getIndexForID(b.layerID);
        // });
        // return orderedObjects;

        var layers = LayerStore.getAllLayers();
        var orderedObjects = layers.reduce(function(orderedObjects, layer) {
            layer.objects.forEach(function(object) {
                orderedObjects.push(object);
            });
            return orderedObjects;
        }, []);

        return orderedObjects;
    }

});

ObjectStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_RAW_CREATED_OBJECT:
            var object = action.object;
            _objects[object.id] = object;
            console.log('----------OBJECT CREATED----------');
            console.log('created object', object);
            ObjectStore.emitChange();
            break;

        case ActionTypes.DELETE_LAYER:
            // _destroyAllInLayer(action.layerID);
            ObjectStore.emitChange();
            break;

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

        case ActionTypes.RECEIVE_CANVAS:
            _canvas = action.canvas;
            ObjectStore.emitChange();
            break;

        case ActionTypes.MOVE_UP_LAYER:
            AppDispatcher.waitFor([LayerStore.dispatchToken]);
            ObjectStore.emitChange();
            break;

        case ActionTypes.MOVE_DOWN_LAYER:
            AppDispatcher.waitFor([LayerStore.dispatchToken]);
            ObjectStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = ObjectStore;