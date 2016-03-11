var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppObjectUtils = require('../utils/AppObjectUtils.js');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _layerOrder = [];
var _layerInfo = {};
var _layerNameCount = 0;

function move(old_index, new_index) {
    if (new_index >= _layerOrder.length) {
        var k = new_index - _layerOrder.length;
        while ((k--) + 1) {
            _layerOrder.push(undefined);
        }
    }
    _layerOrder.splice(new_index, 0, _layerOrder.splice(old_index, 1)[0]);
};

function _moveUpLayer(layerID) {
    var index = _layerOrder.indexOf(layerID);
    if (index === _layerOrder.length - 1) {
        return;
    }
    move(index, index + 1);
}

function _moveDownLayer(layerID) {
    var index = _layerOrder.indexOf(layerID);
    if (index === 0) {
        return;
    }
    move(index, index - 1);
}

function _createLayerName() {
    return 'Layer ' + _layerNameCount++;
}

var LayerStore = assign({}, EventEmitter.prototype, {

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

    getInfo: function() {
        return _layerInfo;
    },

    getNameCount: function() {
        return _layerNameCount;
    },

    getNameForLayer: function(layerID) {
        var layer = _layerInfo[layerID];
        if (layer) return layer.name;
        return layer;
    }

});

LayerStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_CREATED_RAW_ANIMATION:
            _layerOrder = action.rawAnimation.layerOrder;
            _layerInfo = action.rawAnimation.layerInfo;
            _layerNameCount = action.rawAnimation.layerNameCount;
            _currentID = action.rawAnimation.currentLayerID;
            LayerStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_ANIMATION:
            _layerOrder = action.rawAnimation.layerOrder;
            _layerInfo = action.rawAnimation.layerInfo;
            _layerNameCount = action.rawAnimation.layerNameCount;
            
            // to prevent tests from altering rawAnimation data

            // var obj = action.rawAnimation.layerOrder;
            // var copy = [];
            // for (var i = 0, len = obj.length; i < len; i++) {
            //     copy[i] = obj[i];
            // }
            // _layerOrder = copy;

            // var objs = action.rawAnimation.layerInfo;
            // var copy = {};
            // for (var layedID in objs) {
            //     if (objs.hasOwnProperty(layedID)) {
            //         var obj = objs[layedID];
            //         var objcopy = {}
            //         for (var attr in obj) {
            //             if (obj.hasOwnProperty(attr)) {
            //                 objcopy[attr] = obj[attr];
            //             }
            //         }
            //         copy[layedID] = objcopy;
            //     }
            // }
            // _layerInfo = copy;

            _currentID = _layerOrder[_layerOrder.length - 1];
            LayerStore.emitChange();
            break;

        case ActionTypes.CLICK_LAYER:
            _currentID = action.layerID;
            LayerStore.emitChange();
            break;

        case ActionTypes.MOVE_UP_LAYER:
            _moveUpLayer(action.layerID);
            LayerStore.emitChange();
            break;

        case ActionTypes.MOVE_DOWN_LAYER:
            _moveDownLayer(action.layerID);
            LayerStore.emitChange();
            break;

        case ActionTypes.CREATE_LAYER:
            var newID = 'l_' + AppObjectUtils.newID();
            var currentIndex = _layerOrder.indexOf(_currentID);
            var newIndex = currentIndex + 1;

            _layerOrder.splice(newIndex, 0, newID);

            _layerInfo[newID] = {
                name: _createLayerName()
            };

            _currentID = newID;
            LayerStore.emitChange();
            break;


        case ActionTypes.DESTROY_LAYER:
            var layerID = action.layerID;
            var currentIndex = _layerOrder.indexOf(_currentID);

            var layerIndex = _layerOrder.indexOf(layerID);
            _layerOrder.splice(layerIndex, 1);

            delete _layerInfo[layerID]

            if (currentIndex > 0 && !_layerOrder[currentIndex]) {
                currentIndex--;
            }
            _currentID = _layerOrder[currentIndex];

            LayerStore.emitChange();
            break;

        case ActionTypes.RENAME_LAYER:
            var id = action.layerID;
            var name = action.layerName;
            _layerInfo[action.layerID].name = name;
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


























