jest.dontMock('../ObjectStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');
require('../../../build/fabric');

describe('Object Store', function() {
    var AppDispatcher;
    var ObjectStore;
    var callback;

    var AppConstants = require('../../constants/AppConstants');
    var ActionTypes = AppConstants.ActionTypes;

    var TestAnimationData = {
    
    animationID: 1,
    frameOrder: ['f_1', 'f_2'],
    layerOrder: ['l_0', 'l_1', 'l_2'],
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
    // var rectf_3 = new fabric.Rect(objects[0]);
    // var circlef_2 = new fabric.Circle(objects[1]);
    // var rectf_1 = new fabric.Rect(objects[2]);
    // var circlef_4 = new fabric.Circle(objects[3]);
    var rectf_3 = objects[0];
    var circlef_2 = objects[1];
    var rectf_1 = objects[2];
    var circlef_4 = objects[3];
    var canvasObjects = [circlef_4, rectf_1, circlef_2, rectf_3];

    var canvas = {
        _objects: canvasObjects
    };

    // var actionAddObject = {
    //     type: ActionTypes.RECEIVE_RAW_OBJECTS,
    //     rawObjects: {}
    // };

    var actionReceiveCanvasObjects = {
        type: ActionTypes.RECEIVE_CANVAS,
        canvas: canvas
    };

    var actionClickLayer = {
        type: ActionTypes.CLICK_LAYER,
        layerID: 'l_1'
    };

    var actionToggleVisibility = {
        type: ActionTypes.TOGGLE_VISIBILITY,
        layerID: 'l_1'
    };

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        ObjectStore = require('../ObjectStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('initialises with no objects', function() {
        var all = ObjectStore.getAll();
        expect(all).toEqual({});
    });

    it('receives objects from canvas and sets selectable layer', function() {
        var LayerStore = require('../LayerStore');
        LayerStore.getCurrentID.mockReturnValue('l_1');
        callback(actionReceiveCanvasObjects);
        var objects = ObjectStore.getAll();
        var objects = ObjectStore.getAll();

        expect(objects['f_2'].type).toEqual(circlef_4.type);
        expect(objects['f_2'].selectable).toBeTruthy();
        expect(objects['f_2'].evented).toBeTruthy();
        expect(objects['f_2'].opacity).toBe(1);

        expect(objects['f_4'].type).toEqual(circlef_2.type);
        expect(objects['f_4'].selectable).toBeTruthy();
        expect(objects['f_4'].evented).toBeTruthy();
        expect(objects['f_4'].opacity).toBe(1);

        expect(objects['f_1'].type).toEqual(rectf_3.type);
        expect(objects['f_1'].selectable).toBeFalsy();
        expect(objects['f_1'].evented).toBeFalsy();

        expect(objects['f_3'].type).toEqual(rectf_1.type);
        expect(objects['f_3'].selectable).toBeFalsy();
        expect(objects['f_3'].evented).toBeFalsy();
    });

    it('gets all objects for frame, ordered by layer order', function() {
        callback(actionReceiveCanvasObjects);
        var LayerStore = require('../LayerStore');
        LayerStore.getOrder.mockReturnValue(['l_0', 'l_1', 'l_2']);
        var orderedObjects = ObjectStore.getAllForFrame('f_1');
        // expect(orderedObjects).toEqual([rectf_3, circlef_2]);
        expect(orderedObjects[0].type).toEqual(rectf_3.type);
        expect(orderedObjects[1].type).toEqual(circlef_2.type);
    });

    it('gets all objects for current frame, ordered by layer order', function() {
        callback(actionReceiveCanvasObjects);
        var FrameStore = require('../FrameStore');
        FrameStore.getCurrentID.mockReturnValue('f_2');
        var LayerStore = require('../LayerStore');
        LayerStore.getOrder.mockReturnValue(['l_0', 'l_1', 'l_2']);
        var orderedObjects = ObjectStore.getAllForCurrentFrame('f_1');
        // expect(orderedObjects).toEqual([rectf_1, circlef_4]);
        expect(orderedObjects[0].type).toEqual(rectf_1.type);
        expect(orderedObjects[1].type).toEqual(circlef_4.type);
    });

    it('marks only all in current layer as selectable on click', function() {
        callback(actionReceiveCanvasObjects);
        var LayerStore = require('../LayerStore');
        LayerStore.getCurrentID.mockReturnValue('l_1');
        callback(actionClickLayer);
        var objects = ObjectStore.getAll();

        expect(objects['f_2'].selectable).toBeTruthy();
        expect(objects['f_2'].evented).toBeTruthy();
        expect(objects['f_2'].opacity).toBe(1);

        expect(objects['f_4'].selectable).toBeTruthy();
        expect(objects['f_4'].evented).toBeTruthy();
        expect(objects['f_4'].opacity).toBe(1);

        expect(objects['f_1'].selectable).toBeFalsy();
        expect(objects['f_1'].evented).toBeFalsy();

        expect(objects['f_3'].selectable).toBeFalsy();
        expect(objects['f_3'].evented).toBeFalsy();
    });

    it('toggles visibility on all objects in layer', function() {
        callback(actionReceiveCanvasObjects);
        callback(actionToggleVisibility);
        var objects = ObjectStore.getAll();
        expect(objects['f_2'].visible).toBeFalsy();
        expect(objects['f_4'].visible).toBeFalsy();
        expect(objects['f_3'].visible).toBeTruthy();
        expect(objects['f_1'].visible).toBeTruthy();
    });

    it('toggles visibility on all objects in layer', function() {
        callback(actionReceiveCanvasObjects);
        callback(actionToggleVisibility);
        var objects = ObjectStore.getAll();
        expect(objects['f_2'].visible).toBeFalsy();
        expect(objects['f_4'].visible).toBeFalsy();
        expect(objects['f_3'].visible).toBeTruthy();
        expect(objects['f_1'].visible).toBeTruthy();
    });



});













