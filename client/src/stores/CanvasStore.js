var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _canvases = {};

function _addCanvases(rawCanvases) {
    // rawCanvases.forEach(function(canvas) {
    //     if (!_canvases[canvas.id]) {
    //         _canvases[canvas.id] = canvas;
    //     }
    // });
    _canvases = rawCanvases;
}

var CanvasStore = assign({}, EventEmitter.prototype, {

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
        return _canvases;
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
    }

});

CanvasStore.dispatchToken = AppDispatcher.register(function(action) {

    switch(action.type) {

        case ActionTypes.RECEIVE_RAW_FRAMES:
            _addCanvases(action.rawCanvases);
            CanvasStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = CanvasStore;