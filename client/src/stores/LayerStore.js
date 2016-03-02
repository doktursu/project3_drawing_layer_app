var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _currentIndex = null;
var _layers = [];
var _layersMap = [];

var _layersOrder = ['l_0', 'l_1', 'l_2'];

var LayerStore = assign({}, EventEmitter.prototype, {

    init: function(rawObjects) {
        // rawObjects.forEach(function(object) {
        //     var layerID = object.layerID;
        //     var layer = _layers[layerID];
        //     if (layer) {
        //         layer.objects.push(object);
        //         return;
        //     }
        //     _layers[layerID] = {
        //         id: layerID,
        //         objects: [object]
        //     };
        // });

        var layers = rawObjects.reduce(function(layers, object) {
            var id = object.layerID;
            if (layers[id]) {
                layers[id].objects.push(object);
            } else {
                layers[id] = {
                    id: id,
                    objects: [object]
                };
            }
            return layers;
        }, {});

        _layersOrder.forEach(function(id) {
            _layers.push(layers[id]);
        });

        // for (var id in _layers) {
        //     var index = _layersOrder.indexOf(id)
        //     _layersMap[index] = _layers[id].objects.length;
        // };

        console.log('layers', _layers);
        // console.log('layersMap', _layersMap);

        if (!_currentIndex) {
            _currentIndex = _layers.length - 1;
            _currentID = _layers[_currentIndex].id;
        }

        console.log('cur index', _currentIndex);
        console.log('cur ID', _currentID);
    },

    emitChange: function() {
        console.log('----------LAYER STORE----------')
        console.log('layers', _layers);
        console.log('currentIndex', _currentIndex);
        console.log('currentID', _currentID);
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAllOrdered: function() {
        var orderedLayers = [];
        for (var id in _layers) {
            var layer = _layers[id];
            orderedLayers.push(layer);
        }
        orderedLayers.sort(function(a, b) {
            return a.index + b.index;
        });
        return orderedLayers;
    },

    getIDforIndex: function(index) {
        var layer = _layers[index];
        if (layer) {
            return layer.id;
        }
        return null;
    },

    getIndexForID: function(layerID) {
        var index;
        for (index = 0; index < _layers.length; index++) {
            if (_layers[index].id === layerID) {
                return index;
            }
        }
        return null;
    },

    getCurrentID: function() {
        return _currentID;
    },

    getCurrentIndex: function() {
        return _currentIndex;
    },

    getCurrentInsertionIndex: function() {
        var layerCount = 0;
        for (var i = 0; i <= _currentIndex; i++) {
            layerCount += _layers[i].objects.length;
        }
        console.log('inserting at', layerCount);
        return layerCount;
    }

});

LayerStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CREATE_LAYER:
            var newIndex = _layers.length;
            _layers[newIndex] = {
                id: 'l_' + Date.now(),
                objects: []
            };
            _currentIndex = newIndex;
            _currentID = LayerStore.getIDforIndex(_currentIndex);
            LayerStore.emitChange();
            break;

        case ActionTypes.DELETE_LAYER:
            var id = action.layerID;
            _layers = _layers.filter(function(layer) {
                return layer.id !== id;
            });

            if (_currentIndex > 0 && _layers[_currentIndex] !== null) {
                _currentIndex--;
            }

            _currentID = LayerStore.getIDforIndex(_currentIndex);

            console.log('layers', _layers);
            console.log('cur index', _currentIndex);
            console.log('cur ID', _currentID);
            LayerStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_CREATED_OBJECT:
            var object = action.object;
            console.log('received', object);
            var index = LayerStore.getIndexForID(object.layerID);
            _layers[index].objects.push(object);
            LayerStore.emitChange();
            break;

        case ActionTypes.CLICK_LAYER:
            _currentID = action.layerID;
            _layers.forEach(function(layer, index) {
                if (layer.id === _currentID) {
                    _currentIndex = index;
                }
            });
            LayerStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_OBJECTS:
            LayerStore.init(action.rawObjects);
            LayerStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = LayerStore;


























