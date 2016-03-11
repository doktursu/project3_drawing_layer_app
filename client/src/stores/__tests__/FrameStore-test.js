jest.dontMock('../FrameStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');
require('../../../build/fabric');

describe('Frame Store', function() {
    var AppDispatcher;
    var LayerStore;
    var callback;

    var AppConstants = require('../../constants/AppConstants');
    var ActionTypes = AppConstants.ActionTypes;

    var initData = function() {
        TestAnimationData = {
                    
            animationID: 1,
            frameOrder: ['f_1', 'f_2'],
            frameInterval: 100,
            layerOrder: ['l_0', 'l_1', 'l_2'],
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
            timerInterval: 500,
            canvasJSON: {"objects": [
                {
                    "type":"rect","originX":"left","originY":"top","left":70,"top":50,"width":20,"height":20,"fill":"blue","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","id":"f_3","animationID":1,"layerID":"l_0","frameID":"f_1","layerLock":false,"layerVisible":true,"rx":0,"ry":0
                },
                {
                    "type":"circle","originX":"left","originY":"top","left":100,"top":100,"width":100,"height":100,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","id":"f_2","animationID":1,"layerID":"l_1","frameID":"f_1","layerLock":false,"layerVisible":true,"radius":50,"startAngle":0,"endAngle":6.283185307179586
                },
                {
                    "type":"rect","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":20,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","id":"f_1","animationID":1,"layerID":"l_0","frameID":"f_2","layerLock":false,"layerVisible":true,"rx":0,"ry":0
                },
                {
                    "type":"circle","originX":"left","originY":"top","left":100,"top":100,"width":100,"height":100,"fill":"yellow","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","id":"f_4","animationID":1,"layerID":"l_1","frameID":"f_2","layerLock":false,"layerVisible":true,"radius":50,"startAngle":0,"endAngle":6.283185307179586
                }],
                "background":""
            }

        };

        var objects = TestAnimationData.canvasJSON.objects;
        // var rect1 = new fabric.Rect(objects[0]);
        // var circle1 = new fabric.Circle(objects[1]);
        // var rect2 = new fabric.Rect(objects[2]);
        // var circle2 = new fabric.Circle(objects[3]);
        var rect1 = objects[0];
        var circle1 = objects[1];
        var rect2 = objects[2];
        var circle2 = objects[3];
        var canvasObjects = [rect1, circle1, rect2, circle2];

        var canvas = {
            _objects: canvasObjects
        };

        actionReceiveRawAnimation = {
            type: ActionTypes.RECEIVE_RAW_ANIMATION,
            rawAnimation: TestAnimationData
        };

        actionReceiveCanvas = {
            type: ActionTypes.RECEIVE_CANVAS,
            canvas: canvas
        };
    };

    var actionClickFrame = {
        type: ActionTypes.CLICK_FRAME,
        frameID: 'f_2'
    };

    var actionCreateFrame = {
        type: ActionTypes.CREATE_FRAME
    };

    var actionClickNextFrame = {
        type: ActionTypes.CLICK_NEXT_FRAME
    };

    var actionClickPreviousFrame = {
        type: ActionTypes.CLICK_PREVIOUS_FRAME
    };

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        FrameStore = require('../FrameStore');
        callback = AppDispatcher.register.mock.calls[0][0];
        initData();
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('initializes with no frame order', function() {
        var frameOrder = FrameStore.getOrder();
        expect(frameOrder).toEqual([]);
    });

    it('gets frame order from Animation', function() {
        callback(actionReceiveRawAnimation);
        expect(FrameStore.getOrder()).toEqual(['f_1', 'f_2']);
    });

    it('sets currentID to first in frame order', function() {
        callback(actionReceiveRawAnimation);
        expect(FrameStore.getCurrentID()).toEqual('f_1');
    });

    it('sets current frame ID on frame click', function() {
        callback(actionReceiveRawAnimation);
        callback(actionClickFrame);
        expect(FrameStore.getCurrentID()).toEqual('f_2');
    });

    it('creates a new frameID and adds it to the frame order', function() {
        callback(actionReceiveRawAnimation);
        expect(FrameStore.getCurrentID()).toEqual('f_1');
        var AppObjectUtils = require('../../utils/AppObjectUtils');
        AppObjectUtils.newID.mockReturnValueOnce(3);
        callback(actionCreateFrame);
        var frameOrder = FrameStore.getOrder();
        expect(frameOrder.length).toBe(3);
        expect(frameOrder[0]).toEqual('f_1');
        expect(frameOrder[1]).toEqual('f_3');
        expect(frameOrder[2]).toEqual('f_2');
    });

    it('clicks the next frame', function() {
        callback(actionReceiveRawAnimation);
        expect(FrameStore.getCurrentID()).toEqual('f_1');
        callback(actionClickNextFrame);
        expect(FrameStore.getCurrentID()).toEqual('f_2');
    });

    it('clicks the next frame and return to 0 if current frame is last', function() {
        callback(actionReceiveRawAnimation);
        expect(FrameStore.getCurrentID()).toEqual('f_1');
        callback(actionClickNextFrame);
        expect(FrameStore.getCurrentID()).toEqual('f_2');
        callback(actionClickNextFrame);
        expect(FrameStore.getCurrentID()).toEqual('f_1');
    });

    it('clicks the previous frame and goes to last if current frame is first', function() {
        callback(actionReceiveRawAnimation);
        expect(FrameStore.getCurrentID()).toEqual('f_1');
        callback(actionClickPreviousFrame);
        expect(FrameStore.getCurrentID()).toEqual('f_2');
    });



});