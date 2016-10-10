interface IConnectionSendFunc {
    (msg: string): void
}

interface IConnectionCloseFunc {
    (): void
}

class Connection {
    game: GameClient;
    socket: WebSocket;
    send: IConnectionSendFunc;
    close: IConnectionCloseFunc;
    
    constructor(game: GameClient, url: string) {
        this.game = game;
        this.socket = new WebSocket(url);
		this.socket.onerror = this.socket.onclose = function (e) { this.game.showError("The connection to your ship has been lost.\nIf the game is still running, check your network connection.", true); }.bind(this);
		this.socket.onmessage = this.messageReceived.bind(this);
        this.send = this.socket.send.bind(this.socket);
        this.close = this.socket.close.bind(this.socket);
    }

	messageReceived(ev) {
        let data:string = (ev.data || ''), pos:number = data.indexOf(' ');
		let cmd:string = pos == -1 ? data : data.substr(0, pos);
		data = pos == -1 ? null : data.substr(pos + 1);
		
		if (cmd == 'id') {
			this.game.setPlayerID(data);
			this.game.setActiveScreen('systems');
		}
		else if (cmd == 'sys+') {
            this.game.markSystemInUse(data, false);
		}
		else if (cmd == 'sys-') {
            this.game.markSystemInUse(data, true);
		}
		else if (cmd == 'setup+') {
			this.game.setupScreenInUse(false);
		}
		else if (cmd == 'setup-') {
			this.game.setupScreenInUse(true);
		}
		else if (cmd == 'setup') {
			this.game.setActiveScreen('setup');
		}
		else if (cmd == 'full') {
			this.game.showError('This ship is full: there is no room for you to join.', true);
		}
		else if (cmd == 'started') {
			this.game.gameAlreadyStarted();
			this.game.showError('This game has already started: wait for the crew to pause or end the game, then try again.', false);
		}
		else if (cmd == 'paused') {
			this.game.gameAlreadyStarted();
			this.game.setActiveScreen('systems');
		}
		else if (cmd == 'game+') {
			this.game.setActiveScreen('game');
		}
		else if (cmd == 'game-') {
			var blame = data != null ? 'User \'' + data + '\' ended the game.' : 'The game has ended.';
			this.game.showError(blame + ' Please wait...', false);

			setTimeout(function() { this.game.setActiveScreen('systems'); }.bind(this), 3000);
		}
		else if (cmd == 'pause+') {
			this.game.setActiveScreen('systems');
		}
		else if (cmd == 'pause-') {
			this.game.setActiveScreen('game');
		}
		else {
			var sysNum = cmd.length > 1 ? parseInt(cmd.substr(0,1)) : NaN;
			if (isNaN(sysNum) || sysNum < 0 || sysNum > this.game.state.systems.length)
				console.error('Unrecognised command from server: ' + cmd);
			else {
				cmd = cmd.substr(1);
				var system = this.game.state.systems[sysNum];
				if (system === undefined)
					console.error('Received command for system #' + sysNum + ', which was not selected by this client: ' + cmd);
				else if (!system.receiveMessage(cmd, data))
					console.error(system.name + ' failed to handle "' + cmd + '" command from server, with data ' + data);
			}
		}
	}
}