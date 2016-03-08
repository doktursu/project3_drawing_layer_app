var LayerSection = require('./LayerSection.jsx');
var FrameSelector = require('./FrameSelector.jsx');
var ObjectController = require('./ObjectController.jsx');
var AssetSection = require('./AssetSection.jsx');

var React = require('react');

var AnimationController = React.createClass({

    render: function() {
        return (
            <div>
                <AssetSection />
                <ObjectController />
                <FrameSelector />
                <LayerSection />
            </div>
        );
    },

});

module.exports = AnimationController;