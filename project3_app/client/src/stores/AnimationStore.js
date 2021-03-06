var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _canvasJSON = null;

var AnimationStore = assign({}, EventEmitter.prototype, {

    init: function(rawAnimation) {
        _canvasJSON = rawAnimation.canvasJSON;
        _currentID = rawAnimation.id;
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

AnimationStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_CREATED_RAW_ANIMATION:
            console.log('RAW ANIMATION LOADING', action.rawAnimation);
            AnimationStore.init(action.rawAnimation);
            AnimationStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_ANIMATION:
            AnimationStore.init(action.rawAnimation);
            AnimationStore.emitChange();
            break;

        case ActionTypes.RECEIVE_CANVAS:
            AnimationStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = AnimationStore;