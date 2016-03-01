var React = require('react');

var FrameSelector = React.createClass({

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