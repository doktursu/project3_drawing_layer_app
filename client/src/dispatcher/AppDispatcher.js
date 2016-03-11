var Dispatcher = require('flux').Dispatcher;
var LogActions = require('../actions/LogActions');
var assign = require('object-assign');

// var AppDispatcher = assign(new Dispatcher(), {
//     dispatch: function(action) {
//         Dispatcher.dispatch(action);
//         LogActions.log(action);
//     }
// });

module.exports = new Dispatcher();