class Connection {
    private game: GameClient;
    private socket: WebSocket;
    close: () => void;
    private queue: string[];
    
    constructor(game: GameClient, url: string) {
        this.game = game;
        this.socket = new WebSocket(url);
        this.socket.onerror = this.socket.onclose = function () { this.game.showError(language.errors.connectionLost, true); }.bind(this);
        this.socket.onmessage = this.messageReceived.bind(this);
        this.socket.onopen = this.connected.bind(this);
        this.close = this.socket.close.bind(this.socket);
        this.queue = [];
    }
    send(cmd: string) {
        if (this.socket.readyState == 1)
            this.sendImmediately(cmd);    
        else
            this.queue.push(cmd);
    }
    private sendImmediately(cmd: string) {
        //console.log('sent', cmd);
        this.socket.send(cmd);
    }
    private connected() {
        // once connection is established, send any queued messages
        let cmd = this.queue.pop();
        while (cmd !== undefined) {
            this.sendImmediately(cmd);
            cmd = this.queue.pop();
        }
    }
    private messageReceived(ev: MessageEvent) {
        let data:string = (ev.data || '');
        //console.log('received', data);
        let pos:number = data.indexOf(' ');
        let cmd:string = pos == -1 ? data : data.substr(0, pos);
        data = pos == -1 ? '' : data.substr(pos + 1);

        if (cmd == 'id') {
            this.game.setPlayerID(data);

            if (this.game.state.settings !== undefined)
                this.send('name ' + this.game.state.settings.userName);
            
            this.game.show(GameScreen.RoleSelection, true);
        }
        else if (cmd == 'crew') {
            let count = parseInt(data);
            this.game.setCrewSize(count);
        }
        else if (cmd == 'sys') {
            let systemFlags = parseInt(data) as ShipSystem;
            this.game.setCrewmateSystemUsage(systemFlags);
        }
        else if (cmd == 'setup+') {
            this.game.setupScreenInUse(false);
        }
        else if (cmd == 'setup-') {
            this.game.setupScreenInUse(true);
        }
/*
        else if (cmd == 'full') {
            this.game.showError(language.errorShipFull, true);
        }
*/
        else if (cmd == 'pause') {
            this.game.setGameActive(true);
            this.game.show(GameScreen.RoleSelection, true);
        }
        else if (cmd == 'game+') {
            let systemFlags = parseInt(data) as ShipSystem;
            this.game.setSystemUsage(systemFlags);
            this.game.setGameActive(true);
        }
        else if (cmd == 'game-') {
            this.game.setGameActive(false);
            let blame = data != null ? language.messages.gameEndedUser.replace('@name@', data) : language.messages.gameEnded;
            this.game.showError(blame + ' ' + language.messages.wait, false);

            setTimeout(function() { this.game.show(GameScreen.RoleSelection, true); }.bind(this), 3000);
        }
        else if (cmd == 'selectsys+') {
            this.game.setDirectSystemSelection(true);
        }
        else if (cmd == 'selectsys-') {
            this.game.setDirectSystemSelection(false);
        }
        /*
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