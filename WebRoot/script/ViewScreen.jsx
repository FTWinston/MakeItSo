window.Viewscreen = React.createClass({
	getDefaultProps: function() {
		return { registerCallback: null, name: "Viewscreen" };
	},
	getInitialState: function () {
		return { zoomFactor: 1, pitchAngle: 0, yawAngle: 0 };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<section>
					<ButtonGroup inline={true} color="3">
						<row>
							<spacer></spacer>
							<HeldButton hotkey="W" startAction="+viewup" stopAction="-viewup">&#8679;</HeldButton>
							<spacer></spacer>
						</row>
						<row className="rounded">
							<HeldButton hotkey="A" startAction="+viewleft" stopAction="-viewleft">&#8678;</HeldButton>
							<spacer>Pan</spacer>
							<HeldButton hotkey="D" startAction="+viewright" stopAction="-viewright">&#8680;</HeldButton>
						</row>
						<row>
							<spacer></spacer>
							<HeldButton hotkey="S" startAction="+viewdown" stopAction="-viewdown">&#8681;</HeldButton>
							<spacer></spacer>
						</row>
					</ButtonGroup>
					
					<ButtonGroup inline={true} color="5">
						<row>
							<HeldButton hotkey="R" startAction="+zoomin" stopAction="-zoomin">&#8679;</HeldButton>
						</row>
						<row>
							<spacer>Zoom</spacer>
						</row>
						<row>
							<HeldButton hotkey="T" startAction="+zoomout" stopAction="-zoomout">&#8681;</HeldButton>
						</row>
					</ButtonGroup>
				</section>
				<section>
					<Choice inline={true} color="2">
						<row>
							<ToggleButton hotkey="F" startAction="view forward">forward</ToggleButton>
							<ToggleButton hotkey="G" startAction="view port">port</ToggleButton>
							<ToggleButton hotkey="H" startAction="view starboard">starboard</ToggleButton>
						</row>
						<row>
							<ToggleButton hotkey="C" startAction="view starboard">aft</ToggleButton>
							<ToggleButton hotkey="V" startAction="view starboard">dorsal</ToggleButton>
							<ToggleButton hotkey="B" startAction="view starboard">ventral</ToggleButton>
						</row>
					</Choice>
					<ToggleButton color="4" hotkey="N" startAction="+chase" stopAction="-chase">chase mode</ToggleButton>
					<ToggleButton color="8" hotkey="M" startAction="+viewcomms" stopAction="-viewcomms">comms channel</ToggleButton>
				</section>
				
				
				<div className="text">
					Magnification: {this.state.zoomFactor}x{'\n'}
					Pitch: {this.state.pitchAngle}°{'\n'}
					Yaw: {this.state.yawAngle}°
				</div>
			</system>
		);
	}
});