var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var AppObjectUtils = require('../utils/AppObjectUtils');

var AnimationStore = require('./AnimationStore');
var FrameStore = require('./FrameStore');
var LayerStore = require('./LayerStore');
var AssetStore = require('./AssetStore');



var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _objects = {};

function _addObjects(rawObjects) {
    rawObjects.forEach(function(object) {
        if (!_objects[object.id]) {
            _objects[object.id] = object;
        }
    });
}

function _markOnlyAllInLayerSelectable(layerID) {
    for (var id in _objects) {
        var object = _objects[id];
        console.log(object.layerID, 'equals?',  layerID, object.layerID === layerID);
        if (object.layerID === layerID) {
            object.selectable = true;
            object.evented = true;
            object.opacity = 1;
        } else {
            object.selectable = false;
            object.evented = false;
            object.opacity = 0.5;
        }
    }
}

function _toggleAllInLayerVisibility(layerID) {
    for (var id in _objects) {
        var object = _objects[id];
        if (object.layerID === layerID) {
            object.visible = !object.visible;
        }
    }
}

function _destroyAllInLayer(layerID) {
    for (var id in _objects) {
        if (_objects[id].layerID === layerID) {
            delete _objects[id];
        }
    }
    // var orderedObjects = [];
    // for (var id in _objects) {
    //     orderedObjects.push(_objects[id]);
    // }
}

var ObjectStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        console.log('----------OBJECT STORE----------');
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

    getAllArray: function() {
        var all = [];
        for (var id in _objects) {
            all.push(_objects[id]);
        }
        return all;
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
    },

    getAllForFrame: function(frameID) {
        var frameObjects = [];
        for (var id in _objects) {
            var object = _objects[id];
            if (object.frameID === frameID) {
                frameObjects.push(object);
            }
        }

        var orderedObjects = [];
        var order = LayerStore.getOrder();

        order.forEach(function(layerID) {
            frameObjects.forEach(function(object) {
                if (object.layerID === layerID) {
                    orderedObjects.push(object);
                }
            });
        });

        return orderedObjects;
    },

    getAllForCurrentFrame: function() {
        return this.getAllForFrame(FrameStore.getCurrentID());
    },

    getAllForLayerAndFrame: function(layerID, frameID) {
        var filteredObjects = [];
        for (var id in _objects) {
            var object = _objects[id];
            if (object.frameID === frameID && object.layerID === layerID) {
                filteredObjects.push(object);
            }
        }
        return filteredObjects;
    }

});

ObjectStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_CANVAS:
            var canvas = action.canvas;
            var objects = canvas._objects;

            // var objs = canvas._objects;
            // var copy = [];
            // for (var i = 0, len = objs.length; i < len; i++) {
            //     var obj = objs[i];
            //     var objcopy = {};
            //     for (var attr in obj) {
            //         if (obj.hasOwnProperty(attr)) objcopy[attr] = obj[attr];
            //     }
            //     copy[i] = objcopy;
            // }
            // var objects = copy;

            _addObjects(objects);
            _markOnlyAllInLayerSelectable(LayerStore.getCurrentID());
            ObjectStore.emitChange();
            break;

        case ActionTypes.CLICK_LAYER:
            AppDispatcher.waitFor([LayerStore.dispatchToken]);
            _markOnlyAllInLayerSelectable(LayerStore.getCurrentID());
            ObjectStore.emitChange();
            break;

        case ActionTypes.CLICK_FRAME:
        case ActionTypes.CLICK_NEXT_FRAME:
        case ActionTypes.CLICK_PREVIOUS_FRAME:
        case ActionTypes.CLICK_NEXT_FRAME_ALT:
            AppDispatcher.waitFor([FrameStore.dispatchToken]);
            ObjectStore.emitChange();
            break;

        case ActionTypes.TOGGLE_VISIBILITY:
            _toggleAllInLayerVisibility(action.layerID);
            ObjectStore.emitChange();
            break;

        case ActionTypes.MOVE_UP_LAYER:
        case ActionTypes.MOVE_DOWN_LAYER:
            AppDispatcher.waitFor([LayerStore.dispatchToken]);
            ObjectStore.emitChange();
            break;



        case ActionTypes.RECEIVE_CREATED_OBJECT:
            var object = action.object;
            _objects[object.id] = object;
            console.log('----------OBJECT CREATED----------');
            console.log('created object', object);
            ObjectStore.emitChange();
            break;

        case ActionTypes.DESTROY_OBJECT:
            delete _objects[action.objectID];
            ObjectStore.emitChange();
            break;

        case ActionTypes.DESTROY_LAYER:
            AppDispatcher.waitFor([LayerStore.dispatchToken]);
            _destroyAllInLayer(action.layerID);
            ObjectStore.emitChange();
            break;

        case ActionTypes.CREATE_FRAME:
            AppDispatcher.waitFor([FrameStore.dispatchToken]);
            ObjectStore.emitChange();
            break;


        case ActionTypes.RECEIVE_RAW_OBJECTS:
            _addObjects(action.rawObjects);
            ObjectStore.emitChange();
            break;

        case ActionTypes.CLICK_ASSET:
            AppDispatcher.waitFor([AssetStore.dispatchToken]);
            var rawObjects = AssetStore.getCurrentAsset().objects;
            console.log('rawObjects', rawObjects);
            var objects = rawObjects.map(function(object) {
                var clone = fabric.util.object.clone(object);
                return AppObjectUtils.getCreatedObjectData(clone, AnimationStore.getCurrentID(), LayerStore.getCurrentID(), FrameStore.getCurrentID());
            });
            console.log('mapped objects', objects);

            objects.forEach(function(object) {
                _objects[object.id] = object;
            });
            ObjectStore.emitChange();

        default:
            // do nothing
    }

});

module.exports = ObjectStore;