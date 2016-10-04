/// <reference path="GameClient.tsx" />
/// <reference path="UI.tsx" />
/// <reference path="Screens.tsx" />
const Helm = React.createClass({
    getDefaultProps: function () {
        return { touchMode: FeatureState.Disabled, registerCallback: null };
	},
	getInitialState: function () {
		return { forwardSpeed: 0, lateralSpeed: 0, verticalSpeed: 0, pitchAngle: 0, yawAngle: 0, rollAngle: 0, warpFactor: 0 };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
            <system style={{ display: this.props.visible ? null : 'none' }}>
                <ButtonGroup inline={true} color="1" visible={this.props.touchMode != FeatureState.Enabled} caption="rotation">
					<row>
						<spacer></spacer>
						<HeldButton hotkey="W" startAction="+down" stopAction="-down">down</HeldButton>
						<spacer></spacer>
					</row>
					<row className="rounded">
						<HeldButton hotkey="A" startAction="+left" stopAction="-left">left</HeldButton>
						<ToggleButton startAction="stoprotate">stop</ToggleButton>
						<HeldButton hotkey="D" startAction="+right" stopAction="-right">right</HeldButton>
					</row>
					<row>
						<spacer></spacer>
						<HeldButton hotkey="S" startAction="+up" stopAction="-up">up</HeldButton>
						<spacer></spacer>
					</row>
				</ButtonGroup>
				
				<AxisInput visible={this.props.touchMode} direction="both" caption="rotation" color="1" scale={0.02} movementCallback={this.touchRotation} />
				
                <ButtonGroup inline={true} color="2" visible={this.props.touchMode != FeatureState.Enabled}>
					<row>
						<HeldButton hotkey="R" startAction="+forward" stopAction="-forward">forward</HeldButton>
					</row>
					<row>
						<ToggleButton hotkey="F">stop</ToggleButton>
					</row>
					<row>
						<HeldButton hotkey="V" startAction="+backward" stopAction="-backward">backward</HeldButton>
					</row>
				</ButtonGroup>
				
				<AxisInput visible={this.props.touchMode} direction="vertical" color="2" scale={0.02} movementCallback={this.touchForwardBack} />
				
                <ButtonGroup inline={true} color="3" visible={this.props.touchMode != FeatureState.Enabled} caption="translation">
					<row>
						<spacer></spacer>
						<HeldButton hotkey="I" startAction="+moveup" stopAction="-moveup">up</HeldButton>
						<spacer></spacer>
					</row>
					<row className="rounded">
						<HeldButton hotkey="J" startAction="+moveleft" stopAction="-moveleft">left</HeldButton>
						<ToggleButton startAction="stoptranslate">stop</ToggleButton>
						<HeldButton hotkey="L" startAction="+moveright" stopAction="-moveright">right</HeldButton>
					</row>
					<row>
						<spacer></spacer>
						<HeldButton hotkey="K" startAction="+movedown" stopAction="-movedown">down</HeldButton>
						<spacer></spacer>
					</row>
				</ButtonGroup>
				
				<AxisInput visible={this.props.touchMode} direction="both" caption="translation" scale={0.02} color="3" movementCallback={this.touchTranslation} />
				
				<ButtonGroup inline={true} color="4" caption="warp factor">
					<row>
						<PushButton hotkey="T" action="warpup">increase</PushButton>
					</row>
					<row>
						<PushButton hotkey="G" action="warpdown">decrease</PushButton>
					</row>
					<row>
						<ToggleButton hotkey="B" startAction="warpstop">stop</ToggleButton>
					</row>
				</ButtonGroup>
				
				<div className="text">
					Forward speed: {this.state.forwardSpeed} m/s{'\n'}
					Lateral speed: {this.state.lateralSpeed} m/s{'\n'}
					Vertical speed: {this.state.verticalSpeed} m/s{'\n\n'}
					
					Warp factor: {this.state.warpFactor}{'\n\n'}
					
					Pitch: {this.state.pitchAngle}°{'\n'}
					Yaw: {this.state.yawAngle}°{'\n'}
					Roll: {this.state.rollAngle}°
				</div>
			</system>
		);
	},
	touchRotation: function (dx, dy) {
		gameClient.socket.send('yaw ' + dx);
		gameClient.socket.send('pitch ' + dx);
	},
	touchForwardBack: function (dx, dy) {
		// ideally, this should control "joystick" input directly, instead of messing with the "key" input
		if (dy < 0)
			gameClient.socket.send('+forward ' + (-dy));
		else if (dy == 0) {
			gameClient.socket.send('-forward');
			gameClient.socket.send('-backward');
		}
		else
			gameClient.socket.send('+backward ' + dy);
	},
	touchTranslation: function (dx, dy) {
		// ideally, this should control "joystick" input directly, instead of messing with the "key" input
		if (dx < 0)
			gameClient.socket.send('+moveleft ' + (-dx));
		else if (dx == 0) {
			gameClient.socket.send('-moveleft');
			gameClient.socket.send('-moveright');
		}
		else
			gameClient.socket.send('+moveright ' + dx);
		
		if (dy < 0)
			gameClient.socket.send('+moveup ' + (-dy));
		else if (dy == 0) {
			gameClient.socket.send('-moveup');
			gameClient.socket.send('-movedown');
		}
		else
			gameClient.socket.send('+movedown ' + dy);
	}
});