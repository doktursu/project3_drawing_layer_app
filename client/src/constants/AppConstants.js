var keyMirror = require('keymirror');

module.exports = {

    ActionTypes: keyMirror({
        RECEIVE_RAW_CREATED_FRAME: null,
        RECEIVE_RAW_FRAMES: null,
        RECEIVE_RAW_OBJECTS: null,


        RECEIVE_RAW_ANIMATION: null,
        RECEIVE_CANVAS: null,

        ClICK_FRAME: null,
        CLICK_NEXT_FRAME: null,
        CLICK_PREVIOUS_FRAME: null,
        CLICK_NEXT_FRAME_ALT: null,
        CLICK_LAYER: null,

        TOGGLE_VISIBILITY: null,

        MOVE_UP_LAYER: null,
        MOVE_DOWN_LAYER: null,
        DESTROY_LAYER: null,
        CREATE_LAYER: null,
        RENAME_LAYER: null,

        RECEIVE_CREATED_OBJECT: null,
        DESTROY_OBJECT: null,

        CREATE_FRAME: null,

        SET_FRAME_INTERVAL: null,

        CREATE_OBJECT: null,

        RECEIVE_CANVAS: null,

        SAVE_ASSET: null,
        CLICK_ASSET: null,
        DESTROY_ASSET: null,

        RECEIVE_RAW_ASSETS: null,
        RECEIVE_CREATED_RAW_ASSET: null

    })

};