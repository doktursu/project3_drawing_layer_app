var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentIndex = null;
var _layers = {};
var _layersMap = [];

var LayerStore = assign({}, EventEmitter.prototype, {

    init: function(rawObjects) {
        rawObjects.forEach(function(object) {
            var layerIndex = object.layerIndex;
            var layer = _layers[layerIndex];
            if (layer) {
                layer.objects.push(object);
                return;
            }
            _layers[layerIndex] = {
                id: layerIndex,
                index: layerIndex,
                objects: [object]
            };
        }, this);

        for (var index in _layers) {
            _layersMap[index] = _layers[index].objects.length;
        };

        console.log('layersMap', _layersMap);

        if (!_currentIndex) {
          var allOrdered = this.getAllOrdered();
          _currentIndex = allOrdered[allOrdered.length - 1].id;
        }
    },

    emitChange: function() {
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

    getCurrentIndex: function() {
        return _currentIndex;
    },

    getCurrentInsertionIndex: function() {
        var layerCount = 0;
        for (var i = 0; i <= _currentIndex; i++) {
            layerCount += _layersMap[i];
        }
        console.log('inserting at', layerCount);
        return layerCount;
    }

});

LayerStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CREATE_LAYER:
            var newIndex = _layersMap.length;
            _layers[newIndex] = {
                id: newIndex,
                index: newIndex,
                objects: []
            };
            _layersMap[newIndex] = 0;
            _currentIndex = newIndex;
            console.log('layers', _layers);
            console.log('currentindex', _currentIndex);
            LayerStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_CREATED_OBJECT:
            for (var i = action.object.layerIndex; i < _layersMap.length; i++) {
                _layersMap[i]++;
            }
            console.log('update layersMap', _layersMap);
            break;

        case ActionTypes.CLICK_LAYER:
            _currentIndex = action.layerIndex;
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


























