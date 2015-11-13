window.GameClient = React.createClass({
	socket: null,
	createConnection: function() {
		this.socket = new WebSocket('ws://' + location.host + '/ws');
		this.socket.onerror = this.socket.onclose = function (e) { this.showError("The connection to your ship has been lost.\nIf the game is still running, check your network connection.", true); }
		this.socket.onmessage = this.messageReceived;
	},
	messageReceived: function (ev) {
		var m = (ev.data || '').split(' ', 2);
		var cmd = m[0];
		
		if (cmd == 'id') {
			this.setPlayerID(m[1]);
			this.setActiveScreen('systems');
		}
		else if (cmd == 'sys+') {
			this.markSystemInUse(m[1], false);
		}
		else if (cmd == 'sys-') {
			this.markSystemInUse(m[1], true);
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
			var blame = m.length > 1 ? 'User \'' + m[1] + '\' ended the game.' : 'The game has ended.';
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
			var system = parseInt(cmd);
			if (isNaN(system) || system < 0 || system > this.state.systems.length)
				console.error('Unrecognised command from server: ' + cmd);
			else
				this.state.systems[i].receiveMessage(m[1]);
		}
	},
	getInitialState: function() {
        return { activeScreen: 'error', errorMessage: 'Connecting...', gameActive: false, setupInProgress: false, showHotkeys: false, playerID: null, systems: [], vibration: ('vibrate' in navigator) ? FeatureState.Enabled : FeatureState.Unavailable,
		touchInterface: ('ontouchstart' in window || navigator.msMaxTouchPoints) ? FeatureState.Disabled : FeatureState.Unavailable };
    },
	render: function() {
		return (
			<div className={this.state.showHotkeys ? 'showKeys' : null}>
				<SystemSelect show={this.state.activeScreen == 'systems'} gameActive={this.state.gameActive} setupInProgress={this.state.setupInProgress} playerID={this.state.playerID} systems={this.state.systems} selectionChanged={this.systemSelectionChanged} touchMode={this.state.touchInterface} touchModeChanged={this.touchModeChanged} />
				<GameSetup show={this.state.activeScreen == 'setup'} />
				<GameRoot ref="game" show={this.state.activeScreen == 'game'} registerSystem={this.registerSystem} systems={this.state.systems} touchMode={this.state.touchInterface == FeatureState.Enabled} />
				<ErrorDisplay show={this.state.activeScreen == 'error'} message={this.state.errorMessage} />
			</div>
		);
	},
	registerSystem: function(name, id) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id] = {name: name, index: id, selected: false, usedByOther: false};
			return {systems: systems};
		});
	},
	systemSelectionChanged: function (id, state) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id].selected = state;
			return {systems: systems};
		});
	},
	markSystemInUse: function(id, state) {
		this.setState(function(previousState, currentProps) {
			var systems = previousState.systems;
			systems[id].usedByOther = state;
			return {systems: systems};
		});
	},
	setActiveScreen: function(screen) {
		var newState = {activeScreen: screen};
		if (!this.state.gameActive && screen == 'game')
			newState.gameActive = true;
		
		if (screen != 'error')
			newState.errorMessage = null;
		
		this.setState(newState);
		
		if (screen == 'game')
		{
			// when switching to the game, ensure a selected system is the "current" one
			if (!this.state.systems[this.refs.game.state.currentSystem].selected)
			{
				for (var i=0; i<this.state.systems.length; i++)
					if (this.state.systems[i].selected) {
						this.refs.game.setState({currentSystem: i});
						break;
					}
			}
			
			window.addEventListener('beforeunload', this.unloadEvent);
		}
		else
			window.removeEventListener('beforeunload', this.unloadEvent);
	},
	unloadEvent: function (e) {	
		var confirmationMessage = 'The game is still active.';

		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
		return confirmationMessage; //Webkit, Safari, Chrome etc.
	},
	showError: function(message, fatal) {
		fatal = typeof fatal !== 'undefined' ? fatal : true;
		
		if (fatal) {
			this.socket.close();
			message +='\n\nRefresh the page to continue.';
		}
		
		this.setState({ errorMessage: message, gameActive: false });
		this.setActiveScreen('error');
	},
	setPlayerID: function(val) {
		this.setState({ playerID: val });
	},
	setupScreenInUse: function(val) {
		this.setState({ setupInProgress: val });
	},
	gameAlreadyStarted: function() {
		this.setState({ gameActive: true });
	},
	touchModeChanged: function(val) {
		this.setState({touchMode: val});
	},
	showHotkeys: function(val) {
		this.setState({showHotkeys: val});
	},
	componentDidMount: function () {
		this.createConnection();
		Hotkeys.initialize();
	}
});

window.gameClient = ReactDOM.render(
	<GameClient />,
	document.getElementById('gameRoot')
);