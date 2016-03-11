jest.dontMock('../AnimationStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');

describe('Animation Store', function() {
    var AppDispatcher;
    var AnimationStore;
    var callback;

    var AppConstants = require('../../constants/AppConstants.js');
    var ActionTypes = AppConstants.ActionTypes;

    var TestAnimationData = {
    
    animationID: 1,
    frameOrder: ['f_1', 'f_2'],
    frameInterval: 100,
    layerOrder: ['l_0', 'l_1'],
    layerInfo: {
        'l_0':{
            name:'Rectangles'
        },
        'l_1':{
            name:'Circles'
        },
        'l_2':{
            name:'Empty'
        }
    },
    canvasJSON: {"objects":[{"type":"rect","originX":"left","originY":"top","left":70,"top":50,"width":20,"height":20,"fill":"blue","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","id":"f_3","animationID":1,"layerID":0,"frameID":"f_1","layerLock":false,"layerVisible":true,"rx":0,"ry":0},{"type":"circle","originX":"left","originY":"top","left":100,"top":100,"width":100,"height":100,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","id":"f_2","animationID":1,"layerID":1,"frameID":"f_1","layerLock":false,"layerVisible":true,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"rect","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":20,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","id":"f_1","animationID":1,"layerID":0,"frameID":"f_2","layerLock":false,"layerVisible":true,"rx":0,"ry":0},{"type":"circle","originX":"left","originY":"top","left":100,"top":100,"width":100,"height":100,"fill":"yellow","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","id":"f_4","animationID":1,"layerID":2,"frameID":"f_2","layerLock":false,"layerVisible":true,"radius":50,"startAngle":0,"endAngle":6.283185307179586}],"background":""}

};

    var actionReceiveRawAnimation = {
         type: ActionTypes.RECEIVE_RAW_ANIMATION,   
        rawAnimation: TestAnimationData
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
        expect(json).toEqual(TestAnimationData.canvasJSON);
    });

});















