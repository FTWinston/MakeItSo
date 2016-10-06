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
				
				<Button type={ButtonType.Toggle} color="7" visible={this.props.touchMode != FeatureState.Unavailable} forceActive={this.props.touchMode == FeatureState.Enabled} onActivated={function() {self.props.touchModeChanged(FeatureState.Enabled)}} onDeactivated={function() {self.props.touchModeChanged(FeatureState.Disabled)}}>touch interface</Button>
				
				<Button type={ButtonType.Push} action="+setup" color="4" visible={!this.props.gameActive} disabled={this.props.setupInProgress}>setup game</Button>
				<Button type={ButtonType.Push} action="resume" color="4" visible={this.props.gameActive}>resume game</Button>
				
				<Button type={ButtonType.Confirm} action="quit" color="3" visible={this.props.gameActive}>end game</Button>
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
					<Button type={ButtonType.Toggle} onActivated={this.hideArena.bind(this)} showGameMode hideArena description="Play against the computer, with no other human crews.">Play a solo-crew game</Button>
                    <Button type={ButtonType.Toggle} onActivated={this.hideGameMode.bind(this)} description="Join a game being hosted by another human crew.">Join a multi-crew game</Button>
                    <Button type={ButtonType.Toggle} onActivated={this.showGameMode.bind(this)} description="Host a game which other human crews can connect to.">Host a multi-crew game</Button>
				</Choice>
				
				<Choice color="2" disabled={this.disableGameMode} prompt="Select the game mode you wish to play:">
                    <Button type={ButtonType.Toggle} forceActive={this.disableArena && (this.refs['arena'] as Button).state.active} description="Carry out missions, explore the galaxy, and boldly go where no one has gone before.">Exploration</Button>
                    <Button type={ButtonType.Toggle} description="Survive for as long as possible against endless waves of computer-controlled ships.">Endurance</Button>
                    <Button type={ButtonType.Toggle} ref="arena" disabled={this.disableArena} description="Human-crewed ships compete to death in a single star system.">Arena</Button>
				</Choice>
				
				<ButtonGroup>
					<Button type={ButtonType.Push} action="-setup" onClicked={function () {gameClient.setActiveScreen('systems')}} color="3">go back</Button>
					<Button type={ButtonType.Confirm} action="startGame" color="4">start game</Button>
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
			return <Button type={ButtonType.Toggle} key={system.index} forceActive={system.selected && system.index == self.state.currentSystem} visible={system.selected} onActivated={function() {self.setState({currentSystem: system.index})}}>{system.name}</Button>
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
					<Button type={ButtonType.Push} action="pause" color="8">pause</Button>
				</div>
				{screens}
			</screen>
		);
	}
}