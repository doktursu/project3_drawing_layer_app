var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _frames = {};


var FrameStore = assign({}, EventEmitter.prototype, {

    init: function(rawObjects) {
        rawObjects.forEach(function(object) {
            var frameIndex = object.frameIndex;
            var frame = _frames[frameIndex];
            if (frame) {
                frame.objects.push(object);
                return;
            }
            _frames[frameIndex] = {
                id: frameIndex,
                index: frameIndex,
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

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAll: function() {
        return _frames;
    },

    getAllOrdered: function() {
        var orderedFrames = [];
        for (var id in _frames) {
            var frame = _frames[id];
            orderedFrames.push(frame);
        }
        orderedFrames.sort(function(a, b) {
            return a.id - b.id;
        })
        return orderedFrames;
    },

    getCurrentID: function() {
        return _currentID;
    }

});

FrameStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_RAW_OBJECTS:
            FrameStore.init(action.rawObjects);
            FrameStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = FrameStore;