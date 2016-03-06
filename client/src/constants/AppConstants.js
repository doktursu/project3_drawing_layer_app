var keyMirror = require('keymirror');

module.exports = {

    ActionTypes: keyMirror({
        RECEIVE_RAW_CREATED_FRAME: null,
        RECEIVE_RAW_FRAMES: null,
        RECEIVE_RAW_OBJECTS: null,
        RECEIVE_RAW_CREATED_OBJECT: null,


        RECEIVE_RAW_ANIMATION: null,
        RECEIVE_CANVAS: null,

        ClICK_FRAME: null,
        CLICK_LAYER: null,

        TOGGLE_VISIBILITY: null,

        MOVE_UP_LAYER: null,
        MOVE_DOWN_LAYER: null,
        DESTROY_LAYER: null,

        CREATE_OBJECT: null,
        CREATE_LAYER: null,
        RECEIVE_CANVAS: null
    })

};