jest.dontMock('../AnimationStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');

describe('Animation Store', function() {
    var AppDispatcher;
    var AnimationStore;
    var callback;

    var AppConstants = require('../../constants/AppConstants.js');
    var ActionTypes = AppConstants.ActionTypes;

    var RawAnimationData = require('../../RawAnimationData');

    var actionReceiveRawAnimation = {
        actionType: ActionTypes.RECEIVE_RAW_ANIMATION,
        rawAnimation: RawAnimationData.init()
    }

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        AnimationStore = require('../AnimationStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('initialises with no canvasJSON', function() {
        var json = AnimationStore.getCanvasJSON();
        expect(json).toBeNull();
    });

    it('adds canvasJSON data on receiving animation', function() {
        callback(actionReceiveRawAnimation);
        var json = AnimationStore.getCanvasJSON();
        expect(json).toEqual(RawAnimationData.canvasJSON);
    });

});















