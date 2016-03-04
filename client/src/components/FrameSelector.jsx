var AppFrameActionCreators = require('../actions/AppFrameActionCreators');

var React = require('react');
var FrameStore = require('../stores/FrameStore.js');

function getStateFromStore() {
    return {
        frames: FrameStore.getOrder(),
        currentFrameID: FrameStore.getCurrentID()
    };
}

var FrameSelector = React.createClass({

    getInitialState: function() {
        return getStateFromStore();
    },

    render: function() {

        var radioButtons = this.state.frames.map(function(frameID) {
            return <input
                type="radio"
                key={frameID}
                name="frame"
                value={frameID}
                onChange={this._onChange} />
        }, this);

        return (
            <form>
                {radioButtons}
            </form>
        );
    },

    _onChange: function(e) {
        console.log('radio button', e.target.value);
        var frameID = e.target.value;
        AppFrameActionCreators.clickFrame(frameID);
    }

});

module.exports = FrameSelector;