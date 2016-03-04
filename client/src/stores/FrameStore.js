var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _frameOrder = [];
var _frames = {};


var FrameStore = assign({}, EventEmitter.prototype, {

    init: function(frameOrder) {
        _frameOrder = frameOrder;
    },

    addObjects: function(objects) {
        objects.forEach(function(object) {
            var frameID = object.frameID;
            var frame = _frames[frameID];
            if (frame) {
                frame.objects.push(object);
                return;
            }
            _frames[frameID] = {
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

    getFrameOrder: function() {
        return _frameOrder;
    },

    getAllByFrame: function(frameID) {
        return _frames[frameID];
    },

    getAllOrdered: function() {
        // var orderedFrames = [];
        // for (var id in _frames) {
        //     var frame = _frames[id];
        //     orderedFrames.push(frame);
        // }
        // orderedFrames.sort(function(a, b) {
        //     return a.id - b.id;
        // })
        // return orderedFrames;

        return [1,2,3,4,5];
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

        case ActionTypes.RECEIVE_RAW_ANIMATION:
            var frameOrder = action.rawAnimation.frameOrder;
            FrameStore.init(frameOrder);
            break;

        case ActionTypes.RECEIVE_CANVAS:
            var objects = action.canvas._objects;
            FrameStore.addObjects(objects);
            break;

        case ActionTypes.CLICK_FRAME:
            _currentID = action.frameID;
            break;

        default:
            // do nothing
    }

});

module.exports = FrameStore;