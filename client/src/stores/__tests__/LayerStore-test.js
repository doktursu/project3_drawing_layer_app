jest.dontMock('../LayerStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');
require('../../../build/fabric');

describe('Layer Store', function() {
    var AppDispatcher;
    var LayerStore;
    var callback;

    var TestAnimationData;
    var actionReceiveRawAnimation;
    var actionReceiveCanvas;


    var AppConstants = require('../../constants/AppConstants');
    var ActionTypes = AppConstants.ActionTypes;


    var initData = function() {
        TestAnimationData = {
                    
            animationID: 1,
            frameOrder: ['f_1', 'f_2'],
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

    var actionClickLayer = {
        type: ActionTypes.CLICK_LAYER,
        layerID: 'l_1'
    };

    var actionMoveUpLayer = {
        type: ActionTypes.MOVE_UP_LAYER,
        layerID: 'l_1'
    };

    var actionMoveDownLayer = {
        type: ActionTypes.MOVE_DOWN_LAYER,
        layerID: 'l_1'
    };

    var actionDestroyLayer = {
        type: ActionTypes.DESTROY_LAYER,
        layerID: 'l_1'
    };

    var actionCreateLayer = {
        type: ActionTypes.CREATE_LAYER
    };

    var actionRenameLayer = {
        type: ActionTypes.RENAME_LAYER,
        layerID: 'l_1',
        layerName: 'New Layer Name!'
    }

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        LayerStore = require('../LayerStore');
        callback = AppDispatcher.register.mock.calls[0][0];
        initData();
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('initializes with no layer order', function() {
        var order = LayerStore.getOrder();
        expect(order).toEqual([]);
    });

    it('gets layer order from Animation', function() {
        callback(actionReceiveRawAnimation);
        expect(LayerStore.getOrder()).toEqual(['l_0', 'l_1', 'l_2']);
    });

    it('sets layer info and gets layername from Animation', function() {
        callback(actionReceiveRawAnimation);
        expect(LayerStore.getNameForLayer('l_0')).toEqual('Rectangles');
        expect(LayerStore.getNameForLayer('l_1')).toEqual('Circles');
        expect(LayerStore.getNameForLayer('l_2')).toEqual('Empty');
    });

    it('sets currentID as topmost', function() {
        callback(actionReceiveRawAnimation);
        expect(LayerStore.getCurrentID()).toEqual('l_2');
    });

    it('sets currentID on layer click', function() {
        callback(actionReceiveRawAnimation);
        callback(actionClickLayer);
        expect(LayerStore.getCurrentID()).toEqual('l_1');
    });

    it('moves layer up on click', function() {
        callback(actionReceiveRawAnimation);
        callback(actionMoveUpLayer);
        expect(LayerStore.getOrder()).toEqual(['l_0', 'l_2', 'l_1']);
    });

    it('moves layer down on click', function() {
        callback(actionReceiveRawAnimation);
        callback(actionMoveDownLayer);
        expect(LayerStore.getOrder()).toEqual(['l_1', 'l_0', 'l_2']);
    });

    it('deletes layerID from layer order', function() {
        callback(actionReceiveRawAnimation);
        callback(actionDestroyLayer);
        expect(LayerStore.getOrder()).toEqual(['l_0', 'l_2']);
    });

    it('deletes layer from layerInfo', function() {
        callback(actionReceiveRawAnimation);
        callback(actionDestroyLayer);
        expect(LayerStore.getNameForLayer('l_1')).toBeUndefined();
    });

    it('creates a new layerID and adds it above current layer', function() {
        callback(actionReceiveRawAnimation);
        callback(actionClickLayer);
        expect(LayerStore.getCurrentID()).toEqual('l_1');
        var AppObjectUtils = require('../../utils/AppObjectUtils');
        AppObjectUtils.newID.mockReturnValueOnce(4);
        callback(actionCreateLayer);
        var layerOrder = LayerStore.getOrder();
        expect(layerOrder.length).toBe(4);
        expect(layerOrder[1]).toEqual('l_1');
        expect(layerOrder[2]).toEqual('l_4');
        expect(layerOrder[3]).toEqual('l_2');
    });

    it('renames layer', function() {
        callback(actionReceiveRawAnimation);
        callback(actionRenameLayer);
        expect(LayerStore.getNameForLayer('l_1')).toEqual('New Layer Name!');
    })

    // it('adds objects from canvas', function() {
    //     callback(actionReceiveCanvas);
    //     var frames = LayerStore.getAll();
    //     expect(frames['f_1'].objects.length).toBe(2);
    //     expect(frames['f_2'].objects.length).toBe(2);
    // });

    // it('sets current frame ID on frame click', function() {
    //     callback(actionReceiveCanvas);
    //     callback(actionClickLayer);
    //     expect(LayerStore.getCurrentID()).toEqual('f_1');
    // });

    // it('gets frame by frameID', function() {
    //     callback(actionReceiveCanvas);
    //     var frames = LayerStore.getAllByLayer('f_1');
    //     expect(frames.objects.length).toBe(2);
    // });

    // it('gets frame by currentID', function() {
    //     callback(actionReceiveCanvas);
    //     callback(actionClickLayer);
    //     var frames = LayerStore.getAllByCurrentLayer('f_1');
    //     expect(frames.objects.length).toBe(2);


    // })



});