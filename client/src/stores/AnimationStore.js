var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentID = null;
var _layers = {};

var AnimationStore = assign({}, EventEmitter.prototype, {

    init: function(rawObjects) {
        rawObjects.forEach(function(object) {
            var layerIndex = object.layerIndex;
            var layer = _layers[layerIndex];
            if (layer) {
                layer[objects].push(object);
                return;
            }
            _layers[layerIndex] = {
                id: layerIndex,
                index: layerIndex,
                objects: [objects]
            };
        }, this);

        if (!_currentID) {
          var allOrdered = this.getAllOrdered();
          _currentID = allOrdered[allOrdered.length - 1].id;
        }
    },

    getAllOrdered: function() {
        var orderedLayers = [];
        for (var id in _layers) {
            var layer = _layers[id];
            orderedLayers.push(layer);
        }
        orderLayers.sort(function(a, b) {
            return a.index - b.index;
        });
        return orderedLayers;
    }

});

AnimationStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.CLICK_LAYER:
            _currentID = action.layerID;
            LayerStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_ANIMATION:
            AnimationStore.init(action.rawAnimation);
            AnimationStore.emitChange();
            break;

        default:
            // do nothing
    }

});