var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _canvas = null;

var ThumbMakerStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    createLayerThumbs: function(objects) {
        var thumbs = {};
        
    }

});

ThumbMakerStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_THUMB_MAKER_CANVAS:
            _canvas = action.canvas;
            ThumbMakerStore.emitChange();
            break;

        case ActionTypes.START_ANIMATION:
            ThumbMakerStore.getNextFrame();

        default:
            // do nothing
    }

});

module.exports = ThumbMakerStore;