var React = require('react');

var AssetListItem = require('./AssetListItem.jsx');

var AssetStore = require('../stores/AssetStore');

function getStateFromStore() {
    return {
        assets: AssetStore.getAll()
    };
}

var assetCanvas;

var ThumbMakerCanvas = React.createClass({

    getInitialState: function() {
        return getStateFromStore();
    },

    _initializeFabricCanvas: function() {
        assetCanvas = new fabric.StaticCanvas("thumbCanvas");
        // assetCanvas.isDrawingMode = true;
        // assetCanvas.selectable = true;

        // var json = {};
        // json["objects"] = this.state.objects;
        // json["background"] = "rgba(0, 0, 0, 0)";
        // var json = JSON.stringify(json);

        this.state.assets.forEach(function(asset){
            assetCanvas.add(asset);
        });
        assetCanvas.renderAll();

        // canvas.loadFromJSON(this.state.canvasJSON);

        // canvas.on('object:added', function() {
        //     var objects = canvas.getObjects();
        //     var object = objects[objects.length - 1];
        //     this._onCreate(object);
        // }.bind(this));

        console.log('canvas', JSON.stringify(assetCanvas));
        // this._sendCanvas(canvas);
        // this.setState({canvas: canvas});
    },

    componentDidMount: function() {
        this._initializeFabricCanvas();
        AssetStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AssetStore.removeChangeListener(this._onChange);
    },

    componentDidUpdate: function() {
        var allObjects = [];
        console.log('this.state.assets', this.state.assets)
        this.state.assets.forEach(function(asset) {
            console.log('this asset objects', asset.objects);
            allObjects = allObjects.concat(asset.objects);
        });
        console.log('ALL OBJECTs', allObjects);
        assetCanvas._objects = allObjects;
        assetCanvas.renderAll();
    },

    render: function() {

        var assetListItems = this.state.assets.map(function(asset, index) {
            // assetCanvas = assetCanvas.cloneWithoutData();
            assetCanvas.clear();
            asset.objects.forEach(function(object) {
                assetCanvas.add(object);
            });
            var img = assetCanvas.toDataURLWithMultiplier('png', 0.25);
            // var img = '';
            return (
                <AssetListItem
                    key={asset.id}
                    assetID={asset.id}
                    img={img}
                />
            );
        }.bind(this));

        return (
            <div>
                Assets.
                <canvas
                    id="assetCanvas"
                    width={300}
                    height={300}>
                </canvas>
                <ul>
                    {assetListItems}
                </ul>
            </div>
        );
    },

    _onChange: function() {
        console.log('CHANGING');
        this.setState(getStateFromStore);
    }

});

module.exports = ThumbMakerCanvas;