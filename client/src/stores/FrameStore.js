var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppObjectUtils = require('../utils/AppObjectUtils.js');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _frameOrder = [];
var _frames = {};


var FrameStore = assign({}, EventEmitter.prototype, {

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
        console.log('----------FRAME STORE----------')
        console.log('frames', _frameOrder);
        console.log('currentID', _currentID);
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

    getOrder: function() {
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

        // case ActionTypes.RECEIVE_RAW_OBJECTS:
        //     FrameStore.addObjects(action.rawObjects);
        //     FrameStore.emitChange();
        //     break;

        case ActionTypes.RECEIVE_RAW_ANIMATION:
            _frameOrder = action.rawAnimation.frameOrder;
            // to prevent tests from mutating rawAnimation data

            // var obj = action.rawAnimation.frameOrder;
            // var copy = [];
            // for (var i = 0, len = obj.length; i < len; i++) {
            //     copy[i] = obj[i];
            // }
            // _frameOrder = copy;
            

            _currentID = _frameOrder[0];
            FrameStore.emitChange();
            break;

        case ActionTypes.RECEIVE_CANVAS:
            var objects = action.canvas._objects;
            FrameStore.addObjects(objects);
            break;

        case ActionTypes.CLICK_FRAME:
            _currentID = action.frameID;
            console.log('CURRENT FRAME IS', _currentID);
            FrameStore.emitChange();
            break;

        case ActionTypes.CLICK_NEXT_FRAME:
            var currentIndex = _frameOrder.indexOf(_currentID);
            var nextIndex = currentIndex + 1;
            if (nextIndex >= _frameOrder.length) nextIndex = 0;
            _currentID = _frameOrder[nextIndex];
            console.log('NEXT FRAME IS', _currentID);
            FrameStore.emitChange();
            break;

        case ActionTypes.CREATE_FRAME:
            var newID = 'f_' + AppObjectUtils.newID();
            var currentIndex = _frameOrder.indexOf(_currentID);
            var newIndex = currentIndex + 1;
            _frameOrder.splice(newIndex, 0, newID);
            _currentID = newID;
            FrameStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = FrameStore;