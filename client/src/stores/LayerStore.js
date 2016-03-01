var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _layers = {};

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

        if (!_currentID) {
          var allOrdered = this.getAllOrdered();
          _currentID = allOrdered[allOrdered.length - 1].id;
        }
    },

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
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

    getCurrentID: function() {
        return _currentID;
    }

});

LayerStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CLICK_LAYER:
            _currentID = action.layerID;
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


























