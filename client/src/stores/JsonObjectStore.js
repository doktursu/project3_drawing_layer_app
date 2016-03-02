var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AppObjectUtils = require('../utils/AppObjectUtils.js');
var LayerStore = require('./LayerStore.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _objects = [];

var JsonObjectStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        console.log('----------JSON OBJECT STORE----------');
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
        return _objects;
    }

});

JsonObjectStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_RAW_OBJECTS:
            _objects = action.rawObjects;
            JsonObjectStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = JsonObjectStore;