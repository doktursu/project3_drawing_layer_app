var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppObjectUtils = require('../utils/AppObjectUtils.js');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _frameOrder = [];
var _frameInterval = 100;
var _direction = 'normal';

function _clickNextFrame() {
    var currentIndex = _frameOrder.indexOf(_currentID);
    var nextIndex = currentIndex + 1;
    if (nextIndex >= _frameOrder.length) nextIndex = 0;
    _currentID = _frameOrder[nextIndex];
}

function _clickPreviousFrame() {
    var currentIndex = _frameOrder.indexOf(_currentID);
    var nextIndex = currentIndex - 1;
    if (nextIndex < 0) nextIndex = _frameOrder.length - 1;
    _currentID = _frameOrder[nextIndex];
}


var FrameStore = assign({}, EventEmitter.prototype, {

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

    getOrder: function() {
        return _frameOrder;
    },

    getInterval: function() {
        return _frameInterval;
    },

    getAllByFrame: function(frameID) {
        return _frames[frameID];
    },

    getCurrentID: function() {
        return _currentID;
    }

});

FrameStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_CREATED_RAW_ANIMATION:
            _frameOrder = action.rawAnimation.frameOrder;
            _frameInterval = action.rawAnimation.frameInterval;
            _currentID = action.rawAnimation.currentFrameID;
            FrameStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_ANIMATION:
            _frameOrder = action.rawAnimation.frameOrder;
            _frameInterval = action.rawAnimation.frameInterval;
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

        case ActionTypes.CLICK_FRAME:
            _currentID = action.frameID;
            FrameStore.emitChange();
            break;

        case ActionTypes.CLICK_NEXT_FRAME:
            _clickNextFrame();
            FrameStore.emitChange();
            break;

        case ActionTypes.CLICK_PREVIOUS_FRAME:
            _clickPreviousFrame();
            FrameStore.emitChange();
            break;

        case ActionTypes.CLICK_NEXT_FRAME_ALT:
            var currentIndex = _frameOrder.indexOf(_currentID);
            if (currentIndex === 0) {
                _direction = 'normal';
            } else if (currentIndex === _frameOrder.length - 1) {
                _direction = 'reverse';
            }
            if (_direction === 'normal') {
                _clickNextFrame();
            } else {
                _clickPreviousFrame();
            }
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

        case ActionTypes.SET_FRAME_INTERVAL:
            _frameInterval = action.frameInterval;
            FrameStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = FrameStore;