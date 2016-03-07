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
        return {
            frames: FrameStore.getOrder(),
            currentFrameID: FrameStore.getCurrentID(),
            playMode: false
        };
    },

    componentDidMount: function() {
        FrameStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FrameStore.removeChangeListener(this._onChange);
    },

    render: function() {

        var radioButtons = this.state.frames.map(function(frameID) {
            return <input
                type="radio"
                key={frameID}
                name="frame"
                value={frameID}
                onChange={this._onRadioChange}
                checked={frameID === this.state.currentFrameID} />
        }, this);

        return (
            <div>
                <form>
                    {radioButtons}
                </form>
                <button onClick={this._onClick}>Add Frame</button>
                <button onClick={this._playAnimation}>Play</button>
            </div>
        );
    },

    componentDidUpdate: function() {
        console.log('COMPONENT DID UPDATE');
        if (this.state.playMode) {
            console.log('PLAYMODE TRUE');
            setTimeout(function() {
              AppFrameActionCreators.clickNextFrame();
              console.log('NEXT FRAME');
            }, 100)
        }
    },

    _onChange: function() {
        this.setState(getStateFromStore());
    },

    _onRadioChange: function(e) {
        console.log('radio button', e.target.value);
        var frameID = e.target.value;
        AppFrameActionCreators.clickFrame(frameID);
        this.setState(getStateFromStore());
    },

    _onClick: function() {
        AppFrameActionCreators.createFrame();
        this.setState(getStateFromStore());
    },

    _playAnimation: function() {
        // AppFrameActionCreators.togglePlayMode();
        // this.setState(getStateFromStore());
        var nextPlayMode = !this.state.playMode;
        this.setState({playMode: nextPlayMode});
    }

    // _playAnimation: function() {
    //     // this.state.playMode = !this.state.playMode;

    //     var frameOrder = this.state.frames;
    //     // while (this.state.playMode) {
    //         for (var i = 0; i <= frameOrder.length; i++) {
    //             // if (i === frameOrder.length) i = 0;
    //             console.log('FRAME', i)
    //             var frameID = frameOrder[i];
    //             this._createTimeOut(frameID);
    //             setTimeout(function() {

    //             })
    //         }
    //     // }
        
    // },

    // _createTimeOut: function(frameID) {
    //     setTimeout(function() {
    //         // console.log('FRAME ORDER', frameOrder);
    //         if (this.state.playMode && this.state.)
    //         console.log('FRAME ID', frameID);
    //       AppFrameActionCreators.clickNextFrame();

    //       this.setState(getStateFromStore());
    //     }.bind(this), 500);
    // }
});

module.exports = FrameSelector;