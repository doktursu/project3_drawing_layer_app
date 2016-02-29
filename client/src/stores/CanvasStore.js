var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _canvas = {
    id: 'cat'
};

var CanvasStore = assign({}, EventEmitter.prototype, {

    get: function() {
        return _canvas;
    }
});

module.exports = CanvasStore;