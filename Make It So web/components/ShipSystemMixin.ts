const ShipSystemMixin = {
	componentDidMount: function () {
		if (this.props.registerCallback != null)
			this.props.registerCallback(this.props.index, this.receiveMessage);
	},
	componentWillUnmount: function() {
		if (this.props.registerCallback != null)
			this.props.registerCallback(this.props.index, undefined);
	}
};