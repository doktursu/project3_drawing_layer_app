var React = require('react');
var FrameStore = require('../stores/FrameStore.js');

function getStateFromStore() {
    return {
        frames: FrameStore.getAllOrdered(),
        currentFrameID: FrameStore.getCurrentID()
    };
}

var FrameSelector = React.createClass({

    getInitialState: function() {
        return getStateFromStore();
    },

    render: function() {

        var radioButtons = this.props.frames.map(function(frame) {
            return <input type="radio" name="frame" value={frame.id} />
        });

        return (
            <form>
                {radioButtons}
            </form>
        );
    }

});

module.exports = FrameSelector;