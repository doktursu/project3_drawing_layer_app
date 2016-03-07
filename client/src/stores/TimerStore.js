var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _layers = {};
var _canvasJSON = null;

var TimerStore = assign({}, EventEmitter.prototype, {

    init: function(rawAnimation) {
        _canvasJSON = rawAnimation.canvasJSON;
        _currentID = rawAnimation.animationID;
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

    getCanvasJSON: function() {
        return _canvasJSON;
    },

    getCurrentID: function() {
        return _currentID;
    }

});

TimerStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_RAW_ANIMATION:
            TimerStore.init(action.rawAnimation);
            TimerStore.emitChange();
            break;

        case ActionTypes.START_ANIMATION:
            TimerStore.getNextFrame();

        default:
            // do nothing
    }

});

module.exports = TimerStore;