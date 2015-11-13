window.DamageControl = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Damage Control" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});