window.Helm = React.createClass({
	getDefaultProps: function() {
		return { touchMode: false, registerCallback: null, name: "Helm" };
	},
	mixins: [ShipSystemMixin],
	render: function() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<ButtonGroup inline={true} color="1" visible={!this.props.touchMode} caption="rotation">
					<row>
						<spacer></spacer>
						<HeldButton hotkey="W" startAction="+down" stopAction="-down">down</HeldButton>
						<spacer></spacer>
					</row>
					<row className="rounded">
						<HeldButton hotkey="A" startAction="+left" stopAction="-left">left</HeldButton>
						<PushButton action="stoprotate">stop</PushButton>
						<HeldButton hotkey="D" startAction="+right" stopAction="-right">right</HeldButton>
					</row>
					<row>
						<spacer></spacer>
						<HeldButton hotkey="S" startAction="+up" stopAction="-up">up</HeldButton>
						<spacer></spacer>
					</row>
				</ButtonGroup>
				
				<AxisInput visible={this.props.touchMode} direction="both" caption="rotation" color="1" scale={0.02} movementCallback={this.touchRotation} />
				
				<ButtonGroup inline={true} color="2" visible={!this.props.touchMode}>
					<row>
						<HeldButton hotkey="R" startAction="+forward" stopAction="-forward">accelerate</HeldButton>
					</row>
					<row>
						<ToggleButton hotkey="F" startAction="+backward" stopAction="-backward">brake</ToggleButton>
					</row>
				</ButtonGroup>
				
				<AxisInput visible={this.props.touchMode} direction="vertical" color="2" scale={0.02} movementCallback={this.touchForwardBack} />
				
				<ButtonGroup inline={true} color="3" visible={!this.props.touchMode} caption="translation">
					<row>
						<spacer></spacer>
						<HeldButton hotkey="I" startAction="+moveup" stopAction="-moveup">up</HeldButton>
						<spacer></spacer>
					</row>
					<row className="rounded">
						<HeldButton hotkey="J" startAction="+moveleft" stopAction="-moveleft">left</HeldButton>
						<PushButton action="stoptranslate">stop</PushButton>
						<HeldButton hotkey="L" startAction="+moveright" stopAction="-moveright">right</HeldButton>
					</row>
					<row>
						<spacer></spacer>
						<HeldButton hotkey="K" startAction="+movedown" stopAction="-movedown">down</HeldButton>
						<spacer></spacer>
					</row>
				</ButtonGroup>
				
				<AxisInput visible={this.props.touchMode} direction="both" caption="translation" scale={0.02} color="3" movementCallback={this.touchTranslation} />
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