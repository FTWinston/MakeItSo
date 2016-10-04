/// <reference path="UI.tsx" />
/// <reference path="Screens.tsx" />

interface MessageFunc {
    (cmd: string, data: string): void;
}

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
		    vibration: ('vibrate' in navigator) ? FeatureState.Enabled : FeatureState.Unavailable,
		    touchInterface: ('ontouchstart' in window || navigator.msMaxTouchPoints) ? FeatureState.Disabled : FeatureState.Unavailable
		};
    }
	socket: any;
	createConnection() {
		this.socket = new WebSocket('ws://' + location.host + '/ws');
		this.socket.onerror = this.socket.onclose = function (e) { gameClient.showError("The connection to your ship has been lost.\nIf the game is still running, check your network connection.", true); }
		this.socket.onmessage = this.messageReceived.bind(this);
	}
	messageReceived(ev) {
        let data:string = (ev.data || ''), pos:number = data.indexOf(' ');
		let cmd:string = pos == -1 ? data : data.substr(0, pos);
		data = pos == -1 ? null : data.substr(pos + 1);
		
		if (cmd == 'id') {
			this.setPlayerID(data);
			this.setActiveScreen('systems');
		}
		else if (cmd == 'sys+') {
            this.markSystemInUse(data, false);
		}
		else if (cmd == 'sys-') {
            this.markSystemInUse(data, true);
		}
		else if (cmd == 'setup+') {
			this.setupScreenInUse(false);
		}
		else if (cmd == 'setup-') {
			this.setupScreenInUse(true);
		}
		else if (cmd == 'setup') {
			this.setActiveScreen('setup');
		}
		else if (cmd == 'full') {
			this.showError('This ship is full: there is no room for you to join.', true);
		}
		else if (cmd == 'started') {
			this.gameAlreadyStarted();
			this.showError('This game has already started: wait for the crew to pause or end the game, then try again.', false);
		}
		else if (cmd == 'paused') {
			this.gameAlreadyStarted();
			this.setActiveScreen('systems');
		}
		else if (cmd == 'game+') {
			this.setActiveScreen('game');
		}
		else if (cmd == 'game-') {
			var blame = data != null ? 'User \'' + data + '\' ended the game.' : 'The game has ended.';
			this.showError(blame + ' Please wait...', false);

			setTimeout(function() { gameClient.setActiveScreen('systems'); }, 3000);
		}
		else if (cmd == 'pause+') {
			this.setActiveScreen('systems');
		}
		else if (cmd == 'pause-') {
			this.setActiveScreen('game');
		}
		else {
			var sysNum = cmd.length > 1 ? parseInt(cmd.substr(0,1)) : NaN;
			if (isNaN(sysNum) || sysNum < 0 || sysNum > this.state.systems.length)
				console.error('Unrecognised command from server: ' + cmd);
			else {
				cmd = cmd.substr(1);
				var system = this.state.systems[sysNum];
				if (system === undefined)
					console.error('Received command for system #' + sysNum + ', which was not selected by this client: ' + cmd);
				else if (!system.receiveMessage(cmd, data))
					console.error(system.name + ' failed to handle "' + cmd + '" command from server, with data ' + data);
			}
		}
	}
	render() {
		return (
			<div className={this.state.showHotkeys ? 'showKeys' : null}>
				<SystemSelect show={this.state.activeScreen == 'systems'} gameActive={this.state.gameActive} setupInProgress={this.state.setupInProgress} playerID={this.state.playerID} systems={this.state.systems} selectionChanged={this.systemSelectionChanged.bind(this)} touchMode={this.state.touchInterface} touchModeChanged={this.touchModeChanged.bind(this)} />
				<GameSetup show={this.state.activeScreen == 'setup'} />
				<GameRoot ref="game" show={this.state.activeScreen == 'game'} registerSystem={this.registerSystem.bind(this)} systems={this.state.systems} touchMode={this.state.touchInterface} />
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
    systemSelectionChanged(id: number, state: boolean) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id].selected = state;
			return {systems: systems};
		});
	}
	markSystemInUse(id: number, state: boolean) {
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
            let game: GameRoot = this.refs["game"] as GameRoot;
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
			this.socket.close();
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
	componentDidMount () {
		this.createConnection();
		Hotkeys.initialize();
	}
};

const gameClient : GameClient = ReactDOM.render(
	<GameClient />,
	document.getElementById('gameRoot')
) as GameClient;