var AppServerActionCreators = require('../actions/AppServerActionCreators');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {
    getAllFrames: function() {
        // simulate retrieving data from a database
        var rawFrames = JSON.parse(localStorage.getItem('frames'));
        // simulate success callback
        ChatServerActionCreators.receiveAll(rawFrames);
    },

    createFrame: function(frame, layer) {
        // simulate writing to a database
        var rawFrames = JSON.parse(localStorage.getItem('frames'));
        var timestamp = Date.now();
        var id = 'f_' + timestamp;
        var layerID = frame.layerID || ('l_' + Date.now());
        var createdFrame = {
            id: id,
            layerID: layerID,
            data: '',
            timestamp: timestamp
        };
        rawFrames.push(createdFrame);
        localStorage.setItem('frames', JSON.stringify(rawFrames));

        //simulate success callback
        setTime(function() {
            AppServerActionCreators.receiveCreatedFrames(createdFrames);
        }, 0);
    }

};