var AppServerActionCreators = require('../actions/AppServerActionCreators');
var AppAssetActionCreators = require('../actions/AppAssetActionCreators');
var AppUtils = require('./AppUtils');

var FrameStore = require('../stores/FrameStore');
var LayerStore = require('../stores/LayerStore');
var AnimationStore = require('../stores/AnimationStore');

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
        var url = "http://localhost:3000/api/assets";
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function() {
            if (request.status === 200) {
                var rawAssets = JSON.parse(request.responseText);
                AppServerActionCreators.receiveRawAssets(rawAssets);
            }
        };
        request.send(null);
    },

    createAsset: function(objects) {

        var asset = {
            asset: {
                name: objects[0].type, 
                objects: JSON.stringify(objects)
            }
        };

        var url = 'http://localhost:3000/api/assets';
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function() {
            if (request.status === 200) {
                var rawAsset = JSON.parse(request.responseText);
                AppServerActionCreators.receiveCreatedRawAsset(rawAsset);
            }
        };
        request.send(JSON.stringify(asset));
    },

    updateAsset: function(assetID, assetName) {

        var asset = {
            asset: {
                name: assetName
            }
        }

        var url = 'http://localhost:3000/api/assets' + '/' + assetID;
        var request = new XMLHttpRequest();
        request.open('PUT', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function() {
            if (request.status === 200) {
                var rawAsset = JSON.parse(request.responseText);
                AppAssetActionCreators.renameAsset(assetID, assetName);
            }
        };
        request.send(JSON.stringify(asset));
    },

    destroyAsset: function(assetID) {
        var url = 'http://localhost:3000/api/assets' + '/' + assetID;
        var request = new XMLHttpRequest();
        request.open('DELETE', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function() {
            if (request.status === 200) {
                AppAssetActionCreators.destroyAsset(assetID);
            }
        };
        request.send(null);
    },

    //////////////////////////////////////////

    createAnimation: function() {
        var frameID = AppUtils.newFrameID();
        var layerID = AppUtils.newLayerID();
        var animation = {
            animation: {
                frameOrder: JSON.stringify([frameID]),
                frameInterval: 100,
                currentFrameID: frameID,
                layerOrder: JSON.stringify([layerID]),
                layerInfo: {},
                currentLayerID: layerID,
                layerNameCount: 1,
                canvasJSON: ''
            }
        }
        animation.animation.layerInfo[layerID] = {name: 'Background'};
        animation.animation.layerInfo = JSON.stringify(animation.animation.layerInfo);
        console.log('animation to save', animation);


        var url = 'http://localhost:3000/api/animations';
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function() {
            if (request.status === 200) {
                var rawAnimation = JSON.parse(request.responseText);
                AppServerActionCreators.receiveCreatedRawAnimation(rawAnimation);
            }
        };
        request.send(JSON.stringify(animation));
    },

    updateAnimation: function(canvasJSON) {
        var animation = {
            animation: {
                frameOrder: JSON.stringify(FrameStore.getOrder()),
                frameInterval: FrameStore.getInterval(),
                currentFrameID: FrameStore.getCurrentID(),
                layerOrder: JSON.stringify(LayerStore.getOrder()),
                layerInfo: JSON.stringify(LayerStore.getInfo()),
                currentLayerID: LayerStore.getCurrentID(),
                layerNameCount: LayerStore.getNameCount(),
                canvasJSON: canvasJSON
            }
        }
        console.log('animation to save', animation);

        var url = 'http://localhost:3000/api/animations' + '/' + AnimationStore.getCurrentID();
        var request = new XMLHttpRequest();
        request.open('PUT', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function() {
            if (request.status === 200) {
                var rawAnimation = JSON.parse(request.responseText);
                AppServerActionCreators.receiveCreatedRawAnimation(rawAnimation);
            }
        };
        request.send(JSON.stringify(animation));
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