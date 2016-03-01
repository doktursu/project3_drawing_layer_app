var expect = require('chai').expect;
var ObjectStore = require('../ObjectStore.js');

var _objects = [{
                "id":"f_1",
                "animationId":1,
                "layerIndex":1,
                "frameIndex":1,
                "type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0
            },
            {
                "id":"f_2",
                "animationId":1,
                "layerIndex":2,
                "frameIndex":1,
                "type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50
            },
            {
                "id":"f_3",
                "animationId":2,
                "layerIndex":1,
                "frameIndex":1,
                "type":"rect","left":70,"top":50,"width":20,"height":20,"fill":"blue","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0
            },
            {
                "id":"f_4",
                "animationId":2,
                "layerIndex":2,
                "frameIndex":1,
                "type":"circle","left":100,"top":100,"width":50,"height":100,"fill":"yellow","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50
            }];

describe('ObjectStore', function() {

    it('should filter objects by animation id', function() {
        console.log(_objects);
        var objects = ObjectStore.getAllOfAnimation(1);
        expect(objects.count).to.equal(2);
    });
});