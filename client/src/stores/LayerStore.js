var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppObjectUtils = require('../utils/AppObjectUtils.js');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _currentIndex = null;
var _layers = [];
var _layersMap = [];

var _layerOrder = [];

var _layersOptions = {
    'l_0': 
    {
        visible: true,
        selectable: true
    },
    'l_1':
    {
        visible: true,
        selectable: true
    }
};

function move(old_index, new_index) {
    console.log('from', old_index, 'to', new_index);
    if (new_index >= _layerOrder.length) {
        var k = new_index - _layerOrder.length;
        while ((k--) + 1) {
            _layerOrder.push(undefined);
        }
    }
    _layerOrder.splice(new_index, 0, _layerOrder.splice(old_index, 1)[0]);
    console.log('moved?', _layerOrder); // for testing purposes
};

function moveUpLayer(layerID) {
    var index = _layerOrder.indexOf(layerID);
    if (index === _layerOrder.length - 1) {
        return;
    }
    move(index, index + 1);
}

function moveDownLayer(layerID) {
    var index = _layerOrder.indexOf(layerID);
    if (index === 0) {
        return;
    }
    move(index, index - 1);
}

function getIDforIndex(index) {
    var layer = _layers[index];
    if (layer) {
        return layer.id;
    }
    return null;
}

function getIndexForID(layerID) {
    var index;
    for (index = 0; index < _layers.length; index++) {
        if (_layers[index].id === layerID) {
            return index;
        }
    }
    return null;
}

var LayerStore = assign({}, EventEmitter.prototype, {

    init: function(rawObjects) {
        var layers = rawObjects.reduce(function(layers, object) {
            var id = object.layerID;
            var object = AppObjectUtils.convertRawObject(object);
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

        _layerOrder.forEach(function(id) {
            _layers.push(layers[id]);
        });

        if (!_currentIndex) {
            _currentIndex = _layers.length - 1;
            _currentID = _layers[_currentIndex].id;
        }
    },

    emitChange: function() {
        console.log('----------LAYER STORE----------')
        console.log('layers', _layerOrder);
        console.log('currentID', _currentID);
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },





    getOrder: function() {
        return _layerOrder;
    },

    getCurrentID: function() {
        return _currentID;
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

    getAllLayers: function() {
        return _layers;
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

        case ActionTypes.RECEIVE_RAW_ANIMATION:
            // _layerOrder = action.rawAnimation.layerOrder
            // to prevent tests from altering rawAnimation data
            // _layerOrder = AppObjectUtils.clone(action.rawAnimation.layerOrder);

            var obj = action.rawAnimation.layerOrder;
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = obj[i];
            }
            _layerOrder = copy;
            
            _currentID = _layerOrder[_layerOrder.length - 1];
            LayerStore.emitChange();
            break;

        case ActionTypes.CLICK_LAYER:
            _currentID = action.layerID;
            // _layers.forEach(function(layer, index) {
            //     if (layer.id === _currentID) {
            //         _currentIndex = index;
            //     }
            // });
            LayerStore.emitChange();
            break;

        case ActionTypes.MOVE_UP_LAYER:
            moveUpLayer(action.layerID);
            LayerStore.emitChange();
            break;

        case ActionTypes.MOVE_DOWN_LAYER:
            moveDownLayer(action.layerID);
            LayerStore.emitChange();
            break;






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


        case ActionTypes.DESTROY_LAYER:
            var id = action.layerID;
            _layerOrder = _layerOrder.filter(function(layerID) {
                return layerID !== id;
            });

            if (_currentIndex > 0 && _layerOrder.indexOf(_currentIndex) !== null) {
                _currentIndex--;
            }

            // _currentID = LayerStore.getIDforIndex(_currentIndex);

            LayerStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_CREATED_OBJECT:
            var object = action.object;
            console.log('received', object);
            var index = LayerStore.getIndexForID(object.layerID);
            _layers[index].objects.push(object);
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


























