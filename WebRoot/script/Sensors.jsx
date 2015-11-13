window.Sensors = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Sensors" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});