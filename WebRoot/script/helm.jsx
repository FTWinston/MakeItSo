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
				<touchArea id="touchRotation" className="color1 inline" style={{display: this.props.touchMode ? null : "none"}} caption="rotation" direction="both" mode="continuous">
					This is a touch area. Honest
				</touchArea>
				
				<ButtonGroup inline={true} color="2" visible={!this.props.touchMode}>
					<row>
						<HeldButton hotkey="R" startAction="+forward" stopAction="-forward">accelerate</HeldButton>
					</row>
					<row>
						<ToggleButton hotkey="F" startAction="+backward" stopAction="-backward">brake</ToggleButton>
					</row>
				</ButtonGroup>
				<touchArea id="touchAcceleration" className="color2 inline" style={{display: this.props.touchMode ? null : "none"}} direction="vertical" mode="continuous">
					This too
				</touchArea>
				
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
				<touchArea id="touchTranslation" className="color3 inline" style={{display: this.props.touchMode ? null : "none"}} caption="translation" direction="both" mode="continuous">
					And also this
				</touchArea>
			</system>
		);
	}
});