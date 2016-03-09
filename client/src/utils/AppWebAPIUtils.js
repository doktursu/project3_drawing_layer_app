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
        AppServerActionCreators.receiveAllFrames(rawFrames);
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
    },

    getAllObjects: function() {
        // simulate retrieving data from a database
        var rawObjects = JSON.parse(localStorage.getItem('objects'));
        // simulate success callback
        AppServerActionCreators.receiveAllObjects(rawObjects);
    },

    //////////////////////////////////////////

    getAllAssets: function() {
        var url = "http://localhost:3000/project/assets";
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.setRequestHeader('Content-Type', 'application/json');
        // res.setHeader('Access-Control-Allow-Origin', '*'); // Or can specify 'http://localhost:3000'
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        console.log("DATA FROM RAILS!!!!");
        request.onload = function() {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log("DATA FROM RAILS!!!!", data);
            }
        }.bind(this);
        request.send(null);
    },

    createAsset: function(objects) {

        var asset = {
            asset: {
                name: objects[0].type, 
                objects: JSON.stringify(objects)
            }
        };

        var url = 'http://localhost:3000/project/assets';
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = function() {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                console.log('DATA FROM RAILS', data);
                AppServerActionCreators.receiveCreatedRawAsset(data);
            }
        }.bind(this);
        request.send(JSON.stringify(asset));
    },



    //////////////////////////////////////////

    getRawAnimation: function() {
        var rawAnimation = JSON.parse(localStorage.getItem('animation'));
        AppServerActionCreators.receiveRawAnimation(rawAnimation);
    },

    createObject: function(object) {
        // simulate writing to a database
        // var rawObjects = JSON.parse(localStorage.getItem('animation'));

        var createdObject = object;

        // var customProperties = 'id animationId layerID layerIndex frameIndex layerLock layerVisible'.split(' ');
        

        // console.log('createdOjbect', JSON.stringify(createdObject));
        // rawObjects.push(createdObject);
        // localStorage.setItem('objects', JSON.stringify(rawObjects));

        // simulate success callback
        setTimeout(function() {
          AppServerActionCreators.receiveCreatedObject(createdObject);
        }, 0);
    }

    // createObject: function(object, layer) {
    //     // simulate writing to a database
    //     var rawObjects = JSON.parse(localStorage.getItem('objects'));
    //     var timestamp = Date.now();
    //     var id = 'f_' + timestamp;
    //     var layerID = frame.layerID || ('l_' + Date.now());
    //     var createdObject = {
    //         id: id,
    //         layerID: layerID,
    //         data: '',
    //         timestamp: timestamp
    //     };
    //     rawObjects.push(createdFrame);
    //     localStorage.setItem('objects', JSON.stringify(rawObjects));

    //     //simulate success callback
    //     setTime(function() {
    //         AppServerActionCreators.receiveCreatedObjects(createdObjects);
    //     }, 0);
    // }

};