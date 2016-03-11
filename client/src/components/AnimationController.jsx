var LayerSection = require('./LayerSection.jsx');
var FrameSelector = require('./FrameSelector.jsx');
var ObjectController = require('./ObjectController.jsx');
var AssetSection = require('./AssetSection.jsx');

var AnimationStore = require('../stores/AnimationStore');

var React = require('react');

// function getStateFromStore() {
//     return {canvasJSON: AnimationStore.getCanvasJSON()};
// }

var AnimationController = React.createClass({

    // getInitialState: function() {
    //     return getStateFromStore();
    // },

    // componentDidMount: function() {
    //     AnimationStore.addChangeListener(this._onChange);
    // },

    // componentWillUnmount: function() {
    //     AnimationStore.removeChangeListener(this._onChange);
    // },

    render: function() {

        // var canvas;
        // console.log('this.state.json', this.state.canvasJSON)
        // if (this.state.canvasJSON) {
        //     console.log('rendering object controller');
        //     canvas = <ObjectController />;
        // }

        return (
            <div>
                <AssetSection />
                <ObjectController />
                <FrameSelector />
                <LayerSection />
            </div>
        );
    },

    // _onChange: function() {
    //     this.setState(getStateFromStore());
    // }

});

module.exports = AnimationController;