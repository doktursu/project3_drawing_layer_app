var LayerSection = require('./LayerSection.jsx');
var FrameSelector = require('./FrameSelector.jsx');
var ObjectController = require('./ObjectController.jsx');

var React = require('react');

var AnimationController = React.createClass({

    render: function() {
        return (
            <div>
                <LayerSection />
                <ObjectController />
                <FrameSelector />
            </div>
        );
    },

});

module.exports = AnimationController;