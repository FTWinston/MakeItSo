window.Shields = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Shields" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});