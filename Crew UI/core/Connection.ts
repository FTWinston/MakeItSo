interface IConnectionSendFunc {
    (msg: string): void
}

interface IConnectionCloseFunc {
    (): void
}

class Connection {
    game: GameClient;
    socket: WebSocket;
    close: IConnectionCloseFunc;
    queue: string[];
    
    constructor(game: GameClient, url: string) {
        this.game = game;
        this.socket = new WebSocket(url);
        this.socket.onerror = this.socket.onclose = function (e) { this.game.showError(language.errorConnectionLost, true); }.bind(this);
        this.socket.onmessage = this.messageReceived.bind(this);
        this.socket.onopen = this.connected.bind(this);
        this.close = this.socket.close.bind(this.socket);
        this.queue = [];
    }
    send(cmd: string) {
        if (this.socket.readyState == 1)
            this.socket.send(cmd);
        else
            this.queue.push(cmd);
    }
    connected(ev) {
        // once connection is established, send any queued messages
        let cmd = this.queue.pop();
        while (cmd !== undefined) {
            this.socket.send(cmd);
            cmd = this.queue.pop();
        }
    }
    messageReceived(ev) {
        let data:string = (ev.data || '');
        let pos:number = data.indexOf(' ');
        let cmd:string = pos == -1 ? data : data.substr(0, pos);
        data = pos == -1 ? null : data.substr(pos + 1);
/*
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
            this.game.showError(language.errorShipFull, true);
        }
        else if (cmd == 'started') {
            this.game.gameAlreadyStarted();
            this.game.showError(language.errorGameStarted, false);
        }
        else if (cmd == 'paused') {
            this.game.gameAlreadyStarted();
            this.game.setActiveScreen('systems');
        }
        else if (cmd == 'game+') {
            this.game.setActiveScreen('game');
        }
        else if (cmd == 'game-') {
            let blame = data != null ? language.messageGameEndedUser.replace('@name@', data) : language.messageGameEnded;
            this.game.showError(blame + ' ' + language.messageWait, false);

            setTimeout(function() { this.game.setActiveScreen('systems'); }.bind(this), 3000);
        }
        else if (cmd == 'pause+') {
            this.game.setActiveScreen('systems');
            this.game.clearAllData();
        }
        else if (cmd == 'pause-') {
            this.game.setActiveScreen('game');
        }
        else {
            let sysNum = cmd.length > 1 ? parseInt(cmd.substr(0,1)) : NaN;
            if (isNaN(sysNum) || sysNum < 0 || sysNum > this.game.state.systems.length)
                console.error(language.errorUnrecognisedCommand + cmd);
            else {
                cmd = cmd.substr(1);
                let sysInfo = this.game.state.systems[sysNum];
                if (sysInfo === undefined)
                    console.error(language.errorWrongSystem.replace('@num@', sysNum.toString()) + cmd);
                else if (!sysInfo.system.receiveMessage(cmd, data))
                    console.error(language.errorSystemDidntHandleMessage.replace('@system@', sysInfo.name).replace('@cmd@', cmd).replace('@data@', data));
            }
        }
*/
    }
}