interface ISystemInfo {
    name: string;
    index: number;
    selected: boolean;
    usedByOther: boolean;
    receiveMessage?: MessageFunc;
}

interface IGameClientState {
    activeScreen?: string;
    errorMessage?: string;
    gameActive?: boolean;
    setupInProgress?: boolean;
    showHotkeys?: boolean;
    playerID?: any;
	systems?: ISystemInfo[];
	vibration?: FeatureState;
	touchInterface?: FeatureState;
}

class GameClient extends React.Component<{}, IGameClientState> {
    constructor(props) {
        super(props);
        this.state = {
		    activeScreen: 'error', errorMessage: 'Connecting...', gameActive: false, setupInProgress: false, showHotkeys: false, playerID: null,
		    systems: [
			    {name: "Helm", index: 0, selected: false, usedByOther: false},
			    {name: "Viewscreen", index: 1, selected: false, usedByOther: false},
			    {name: "Sensors", index: 2, selected: false, usedByOther: false},
			    {name: "Weapons", index: 3, selected: false, usedByOther: false},
			    {name: "Shields", index: 4, selected: false, usedByOther: false},
			    {name: "Damage Control", index: 5, selected: false, usedByOther: false},
			    {name: "Power", index: 6, selected: false, usedByOther: false},
			    {name: "Deflector", index: 7, selected: false, usedByOther: false}
		    ],
		    vibration: FeatureDetection.Vibration ? FeatureState.Enabled : FeatureState.Unavailable,
		    touchInterface: FeatureDetection.Touch ? FeatureState.Disabled : FeatureState.Unavailable
		};
    }
	componentDidMount () {
        if (FeatureDetection.CheckRequirements(this))
		    this.server = new Connection(this, 'ws://' + location.host + '/ws');
	}
	server: Connection;
	render() {
		return (
			<div className={this.state.showHotkeys ? 'showKeys' : null}>
                <SystemSelect show={this.state.activeScreen == 'systems'} gameActive={this.state.gameActive} setupInProgress={this.state.setupInProgress} playerID={this.state.playerID} systems={this.state.systems} selectionChanged={this.systemSelectionChanged.bind(this) } touchMode={this.state.touchInterface} touchModeChanged={this.touchModeChanged.bind(this) } />
                <GameSetup show={this.state.activeScreen == 'setup'} />
                <SystemContainer ref="game" show={this.state.activeScreen == 'game'} registerSystem={this.registerSystem.bind(this) } systems={this.state.systems} touchMode={this.state.touchInterface} />
                <ErrorDisplay show={this.state.activeScreen == 'error'} message={this.state.errorMessage} />
			</div>
		);
	}
    registerSystem(id: number, receiveMessage: MessageFunc) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id].receiveMessage = receiveMessage;
			return {systems: systems};
		});
    }
    systemSelectionChanged(id: string, state: boolean) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id].selected = state;
			return {systems: systems};
		});
	}
	markSystemInUse(id: string, state: boolean) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id].usedByOther = state;
			return {systems: systems};
		});
	}
	setActiveScreen(screen: string) {
		var newState: IGameClientState = {activeScreen: screen};
		if (!this.state.gameActive && screen == 'game')
			newState.gameActive = true;
		
		if (screen != 'error')
			newState.errorMessage = null;
		
		this.setState(newState);
		
		if (screen == 'game')
        {
            let game: SystemContainer = this.refs['game'] as SystemContainer;
            // when switching to the game, ensure a selected system is the "current" one
            if (!this.state.systems[game.state.currentSystem].selected) {
				for (var i=0; i<this.state.systems.length; i++)
					if (this.state.systems[i].selected) {
						game.setState({currentSystem: i});
						break;
					}
			}
			
			window.addEventListener('beforeunload', this.unloadEvent);
		}
		else
			window.removeEventListener('beforeunload', this.unloadEvent);
	}
	unloadEvent (e) {	
		var confirmationMessage = 'The game is still active.';

		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
		return confirmationMessage; //Webkit, Safari, Chrome etc.
	}
	showError(message: string, fatal = true) {
		var state;
		if (fatal) {
			this.server.close();
			state = {errorMessage: message + '\n\nRefresh the page to continue.', gameActive: false};
		}
		else
			state = {errorMessage: message};
		
		this.setState(state);
		this.setActiveScreen('error');
	}
	setPlayerID(val) {
		this.setState({ playerID: val });
	}
	setupScreenInUse(val) {
		this.setState({ setupInProgress: val });
	}
	gameAlreadyStarted() {
		this.setState({ gameActive: true });
	}
	touchModeChanged(val) {
		this.setState({touchInterface: val});
	}
	showHotkeys(val) {
		this.setState({showHotkeys: val});
	}
};

let gameClient = ReactDOM.render(
	<GameClient />,
	document.getElementById('gameRoot')
) as GameClient;