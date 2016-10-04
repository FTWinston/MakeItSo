/// <reference path="Screens.tsx" />
window.Deflector = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
					
			</system>
		);
	}
});