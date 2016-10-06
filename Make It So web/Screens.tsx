/// <reference path="systems/DamageControl.tsx" />
/// <reference path="systems/Deflector.tsx" />
/// <reference path="systems/Helm.tsx" />
/// <reference path="systems/PowerManagement/PowerManagement.tsx" />
/// <reference path="systems/Sensors.tsx" />
/// <reference path="systems/Shields/Shields.tsx" />
/// <reference path="systems/ViewScreen.tsx" />
/// <reference path="systems/Weapons/Weapons.tsx" />
/// <reference path="ui/Buttons.tsx" />


interface IErrorDisplayProps {
    show?: boolean;
    message?: string;
}

class ErrorDisplay extends React.Component<IErrorDisplayProps, {}> {
	render() {
		return (
			<screen id="error" style={{display: this.props.show ? null : 'none'}}>
				{this.props.message}
			</screen>
		);
	}
}

interface ISystemSelectProps {
    show?: boolean;
    playerID?: number;
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
				
				<ToggleButton color="7" visible={this.props.touchMode != FeatureState.Unavailable} forceEnable={this.props.touchMode == FeatureState.Enabled} onSelected={function() {self.props.touchModeChanged(FeatureState.Enabled)}} onDeselected={function() {self.props.touchModeChanged(FeatureState.Disabled)}}>touch interface</ToggleButton>
				
				<PushButton action="+setup" color="4" visible={!this.props.gameActive} disabled={this.props.setupInProgress}>setup game</PushButton>
				<PushButton action="resume" color="4" visible={this.props.gameActive}>resume game</PushButton>
				
				<ConfirmButton action="quit" color="3" visible={this.props.gameActive}>end game</ConfirmButton>
			</screen>
		);
	}
}

interface ISystemPickerProps {
    system?: ISystemInfo;
    selectionChanged?: (systemIndex: number, nowSelected: boolean) => void;
}

class SystemPicker extends React.Component<ISystemPickerProps, {}> {
	render() {
		var classes = "option";
		if (this.props.system.selected)
			classes += " selected";
		if (this.props.system.usedByOther)
			classes += " taken";
		
		return (
            <li className={classes} onClick={this.clicked.bind(this)}>{this.props.system.name}</li>
		);
	}
	clicked() {
		var nowSelected = !this.props.system.selected;
		gameClient.socket.send((nowSelected ? '+sys ' : '-sys ') + this.props.system.index);
		this.props.selectionChanged(this.props.system.index, nowSelected);
	}
}

interface IGameSetupProps {
    show?: boolean;
}

class GameSetup extends React.Component<IGameSetupProps, {}> {
	render() {
		return (
			<screen style={{display: this.props.show ? null : 'none', overflow: 'auto'}}>
				<p>This screen should let you set up your ship and start a new game, browse servers, etc</p>
				
				<Choice color="1" prompt="Do you wish to play with just your own crew, or with others?">
					<ToggleButton onSelected={this.hideArena.bind(this)} showGameMode hideArena description="Play against the computer, with no other human crews.">Play a solo-crew game</ToggleButton>
                    <ToggleButton onSelected={this.hideGameMode.bind(this)} description="Join a game being hosted by another human crew.">Join a multi-crew game</ToggleButton>
                    <ToggleButton onSelected={this.showGameMode.bind(this)} description="Host a game which other human crews can connect to.">Host a multi-crew game</ToggleButton>
				</Choice>
				
				<Choice color="2" disabled={this.disableGameMode} prompt="Select the game mode you wish to play:">
					<ToggleButton forceEnable={this.disableArena && (this.refs['arena'] as ToggleButton).state.active} description="Carry out missions, explore the galaxy, and boldly go where no one has gone before.">Exploration</ToggleButton>
					<ToggleButton description="Survive for as long as possible against endless waves of computer-controlled ships.">Endurance</ToggleButton>
					<ToggleButton ref="arena" disabled={this.disableArena} description="Human-crewed ships compete to death in a single star system.">Arena</ToggleButton>
				</Choice>
				
				<ButtonGroup>
					<PushButton action="-setup" onClicked={function () {gameClient.setActiveScreen('systems')}} color="3">go back</PushButton>
					<ConfirmButton action="startGame" color="4">start game</ConfirmButton>
				</ButtonGroup>
			</screen>
		);
	}
    disableGameMode: boolean;
    disableArena: boolean;
	showGameMode() {
		this.disableGameMode = false;
		this.disableArena = false;
		this.forceUpdate();
	}
	hideGameMode() {
		this.disableGameMode = true;
		this.disableArena = false;
		this.forceUpdate();
	}
	hideArena() {
		this.disableGameMode = false;
		this.disableArena = true;
		this.forceUpdate();
	}
}

interface IGameRootProps {
    show?: boolean;
    systems?: ISystemInfo[];
    registerSystem?: (state: FeatureState) => void;
    touchMode?: FeatureState;
}

interface IGameRootState {
    currentSystem?: number;
    width?: number;
    height?: number;
}

class GameRoot extends React.Component<IGameRootProps, IGameRootState> {
    constructor(props) {
        super(props);
        this.state = { currentSystem: -1, width: window.innerWidth, height: window.innerHeight };
    }
	componentDidMount() {
		window.addEventListener('resize', this.handleResize.bind(this, false));
		this.handleResize();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
	handleResize(value?: any, e?: any) {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}
	render() {
		var self = this;
		var index = -1;
		var switchers = this.props.systems.map(function(system) {
			index++;
			return <ToggleButton key={system.index} forceEnable={system.selected && system.index == self.state.currentSystem} visible={system.selected} onSelected={function() {self.setState({currentSystem: system.index})}}>{system.name}</ToggleButton>
		});

        var switcher = this.refs['switcher'] as HTMLElement;
		var systemWidth = this.state.width, systemHeight = this.state.height - (switcher === undefined ? 0 : switcher.offsetHeight);
		
		var elements = [
			<Helm registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 0} index={0} key={0} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
			<Viewscreen registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 1} index={1} key={1} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
			<Sensors registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 2} index={2} key={2} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
			<Weapons registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 3} index={3} key={3} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
			<Shields registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 4} index={4} key={4} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
			<DamageControl registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 5} index={5} key={5} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
			<PowerManagement registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 6} index={6} key={6} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />,
			<Deflector registerCallback={this.props.registerSystem} visible={this.state.currentSystem == 7} index={7} key={7} touchMode={this.props.touchMode} width={systemWidth} height={systemHeight} />
		];
		
		var screens = [];
		for (var i=0; i<this.props.systems.length; i++) {
			var system = this.props.systems[i];
			if (system.selected)
				screens.push(elements[i]);
		}
		
		return (
			<screen id="gameActive" style={{display: this.props.show ? null : 'none'}}>
				<div id="systemSwitcher" ref="switcher">
					<Choice inline={true} color="5">
						{switchers}
					</Choice>
					<PushButton action="pause" color="8">pause</PushButton>
				</div>
				{screens}
			</screen>
		);
	}
}