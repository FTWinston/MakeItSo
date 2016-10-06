interface IViewscreenState {
    zoomFactor: number;
    pitchAngle: number;
    yawAngle: number;
}

class Viewscreen extends React.Component<ISystemProps, IViewscreenState> implements ISystem {
	constructor(props) {
        super(props);
        this.state = { zoomFactor: 1, pitchAngle: 0, yawAngle: 0 };
    }
	componentDidMount() {
		if (this.props.registerCallback != null)
			this.props.registerCallback(this.props.index, this.receiveMessage);
	}
	componentWillUnmount() {
		if (this.props.registerCallback != null)
			this.props.registerCallback(this.props.index, undefined);
	}
	render() {
		return (
			<system style={{display: this.props.visible ? null : 'none'}}>
				<section>
					<ButtonGroup inline={true} color="3">
						<row>
							<spacer></spacer>
							<Button type={ButtonType.Held} hotkey="W" startAction="+viewup" stopAction="-viewup">&#8679;</Button>
							<spacer></spacer>
						</row>
						<row className="rounded">
							<Button type={ButtonType.Held} hotkey="A" startAction="+viewleft" stopAction="-viewleft">&#8678;</Button>
							<spacer>Pan</spacer>
							<Button type={ButtonType.Held} hotkey="D" startAction="+viewright" stopAction="-viewright">&#8680;</Button>
						</row>
						<row>
							<spacer></spacer>
							<Button type={ButtonType.Held} hotkey="S" startAction="+viewdown" stopAction="-viewdown">&#8681;</Button>
							<spacer></spacer>
						</row>
					</ButtonGroup>
					
					<ButtonGroup inline={true} color="5">
						<row>
							<Button type={ButtonType.Held} hotkey="R" startAction="+zoomin" stopAction="-zoomin">&#8679;</Button>
						</row>
						<row>
							<spacer>Zoom</spacer>
						</row>
						<row>
							<Button type={ButtonType.Held} hotkey="T" startAction="+zoomout" stopAction="-zoomout">&#8681;</Button>
						</row>
					</ButtonGroup>
				</section>
				<section>
					<Choice inline={true} color="2">
						<row>
							<Button type={ButtonType.Held} hotkey="F" startAction="view forward">forward</Button>
							<Button type={ButtonType.Held} hotkey="G" startAction="view port">port</Button>
							<Button type={ButtonType.Held} hotkey="H" startAction="view starboard">starboard</Button>
						</row>
						<row>
							<Button type={ButtonType.Held} hotkey="C" startAction="view starboard">aft</Button>
							<Button type={ButtonType.Held} hotkey="V" startAction="view starboard">dorsal</Button>
							<Button type={ButtonType.Held} hotkey="B" startAction="view starboard">ventral</Button>
						</row>
					</Choice>
					<Button type={ButtonType.Held} color="4" hotkey="N" startAction="+chase" stopAction="-chase">chase mode</Button>
					<Button type={ButtonType.Held} color="8" hotkey="M" startAction="+viewcomms" stopAction="-viewcomms">comms channel</Button>
				</section>
				
				
				<div className="text">
					Magnification: {this.state.zoomFactor}x{'\n'}
					Pitch: {this.state.pitchAngle}°{'\n'}
					Yaw: {this.state.yawAngle}°
				</div>
			</system>
		);
	}
	receiveMessage(msg, data) {
        return false;
    }
}