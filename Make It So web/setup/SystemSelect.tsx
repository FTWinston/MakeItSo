interface ISystemSelectProps {
    show?: boolean;
    playerID?: string;
    setupInProgress?: boolean;
    gameActive?: boolean;
    systems?: any[];
    selectionChanged?: any;
    touchMode?: FeatureState;
    touchModeChanged?: (state: FeatureState) => void;
}

class SystemSelect extends React.Component<ISystemSelectProps, {}> {
    static defaultProps = {
        systems: [], selectionChanged: null
    };
	render() {
		var self = this;
		var systems = this.props.systems.map(function(system) {
			return <SystemPicker key={system.index} system={system} selectionChanged={self.props.selectionChanged} />
		});
		
		return (
			<screen style={{display: this.props.show ? null : 'none'}}>
				<div className="playerIdentifier">{this.props.playerID}</div>
				<ul id="systemList">
					<li className="prompt">Select systems to control:</li>
					{systems}
				</ul>
				
				<Button type={ButtonType.Toggle} color="7" visible={this.props.touchMode != FeatureState.Unavailable} forceActive={this.props.touchMode == FeatureState.Enabled} onActivated={function() {self.props.touchModeChanged(FeatureState.Enabled)}} onDeactivated={function() {self.props.touchModeChanged(FeatureState.Disabled)}}>touch interface</Button>
				
				<Button type={ButtonType.Push} action="+setup" color="4" visible={!this.props.gameActive} disabled={this.props.setupInProgress}>setup game</Button>
				<Button type={ButtonType.Push} action="resume" color="4" visible={this.props.gameActive}>resume game</Button>
				
				<Button type={ButtonType.Confirm} action="quit" color="3" visible={this.props.gameActive}>end game</Button>
			</screen>
		);
	}
}