module.exports = {

    init: function() {
        localStorage.clear();
        localStorage.setItem('objects', JSON.stringify([
            {
                "id":"f_1",
                "animationId":1,
                "layerIndex":0,
                "layerID":'l_2',
                "frameIndex":1,
                "layerLock":false,
                "layerVisible":true,
                "type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0
            },
            {
                "id":"f_2",
                "animationId":1,
                "layerIndex":1,
                "layerID":'l_1',
                "frameIndex":1,
                "layerLock":false,
                "layerVisible":true,
                "type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50
            },
            {
                "id":"f_3",
                "animationId":2,
                "layerIndex":0,
                "layerID":'l_0',
                "frameIndex":1,
                "layerLock":false,
                "layerVisible":true,
                "type":"rect","left":70,"top":50,"width":20,"height":20,"fill":"blue","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0
            },
            {
                "id":"f_4",
                "animationId":2,
                "layerIndex":2,
                "layerID":'l_2',
                "frameIndex":1,
                "layerLock":false,
                "layerVisible":true,
                "type":"circle","left":100,"top":100,"width":50,"height":100,"fill":"yellow","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50
            }
        ]));
    }

};