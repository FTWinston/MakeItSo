var language = {
    common: {
        save: 'Save',
        cancel: 'Cancel',
        ready: 'Ready',
        settings: 'Settings',
        help: 'Help',
    },
    errors: {
        connectionLost: 'The connection to your ship has been lost.\nIf the game is still running, check your network connection.',
        /*
        shipFull: 'This ship is full: there is no room for you to join.',
        */
        gameStarted: 'This game has already started: wait for the crew to pause or end the game.',
        /*
        unrecognisedCommand: 'Unrecognised command from server: ',
        wrongSystem: 'Received command for system #@num@, which was not selected by this client: ',
        systemDidntHandleMessage: '@system@ failed to handle "@cmd@" command from server, with data @data@',
        */
        noWebsockets: 'Your web browser doesn\'t support Web Sockets. Make It So uses these to communicate with the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.',
        noCanvas: 'Your web browser doesn\'t support Canvas. Make It So uses this to draw various elements of the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.',
    },
    screens: {
        settings: {
            intro: 'Set up how you will interact with the game, and enter your name.',
            inputMode: 'Input mode',
            inputModePrompt: 'Select how you wish to interact with the game. Ship systems will display differently depending on the input mode you select.',
            inputModeKeyboard: 'Keyboard',
            inputModeTouchscreen: 'Touchscreen',
            inputModeGamepad: 'Gamepad',
            inputModeDescriptionKeyboard: 'On-screen buttons with keyboard shortcuts',
            inputModeDescriptionTouchscreen: 'Use Multi-touch controls',
            inputModeDescriptionGamepad: 'Use an attached game controller',
            userName: 'User name',
            userNamePlaceholder: 'Enter your name...',
            userNameDescription: 'Enter the name you wish to display to your crewmates',
        },
        roleSelection: {
            roleHeading: 'Select your role',
            systemHeading: 'Select your systems',
            rolePrompt: 'Each crew member should select a different role.\nWait for everyone to join before choosing, as the roles change depending on the size of your crew.\nEach role consists of multiple systems. Experienced crews can switch to selecting systems directly.',
            systemPrompt: 'Multiple crew members can select the same system, but only one can view it at a time.\nEach system must be selected by at least one crew member.\nNovice crews can switch to selecting pre-set roles consisting of multiple systems.',
            showSystems: 'Select systems (advanced)',
            showRoles: 'Select roles (simple)',
            resume: 'Resume game',
            quit: 'Quit game',
            setup: 'Setup game',
            setupInUse: 'Another crew member is setting up the game',
            systemInUse: 'Another crew member has selected this system',
        },
        setup: {
            intro: 'Create or join a game',
            gameType: 'Game type',
            gameTypePrompt: 'Will you play with just your own crew, or with others?',
            gameTypeLocal: 'Single crew',
            gameTypeLocalDescription: 'Play against the computer, with only your crew',
            gameTypeJoin: 'Join game',
            gameTypeJoinDescription: 'Join a multi-crew game hosted elsewhere',
            gameTypeHost: 'Host game',
            gameTypeHostDescription: 'Host a multi-crew game that others can join',
            shipName: 'Ship name',
            shipNameDescription: 'The name of the ship your crew will operate',
            joinAddress: 'Server address',
            joinAddressDescription: 'IP address or URL of the game server to join',
            serverName: 'Server name',
            serverNameDescription: 'The name of the game to display to other crews',
            gameMode: 'Game mode',
            gameModePrompt: 'Select the kind of game you want to play:',
            gameModeExploration: 'Exploration',
            gameModeSurvival: 'Survival',
            gameModeArena: 'Arena',
            gameModeExplorationDescription: 'Carry out missions, explore the galaxy, and boldly go where no one has gone before.',
            gameModeSurvivalDescription: 'Survive for as long as possible against endless waves of computer-controlled ships.',
            gameModeArenaDescription: 'Human-crewed ships battle for supremacy in a single star system.',
            difficulty: 'Difficulty',
            difficultyPrompt: 'Higher values give more, tougher AI opponents.',
            start: 'Start game',
            shipNames: [
                'Excalibur',
                'Bosephorous',
                'Enigma',
                'Praetor',
            ],
        },
        active: {
            pause: 'Pause',
        },
    },
    messages: {
        confirmLeave: 'The game is still active.',
        connecting: 'Connecting...',
        wait: 'Please wait...',
        gameEnded: 'The game has ended.',
        gameEndedUser: '@name@ ended the game.',
        refreshPage: 'Refresh the page to continue.',
    },
    roles: {
        none: 'None selected',
        solo: 'Solo',
        pilot: 'Pilot',
        operations: 'Operations',
        tactical: 'Tactical',
        engineering: 'Engineer',
    },
    systems: {
        helm: {
            name: 'Helm',
            help: 'TO-DO: fill in this help text',
        },
        warp: {
            name: 'Warp',
            help: 'TO-DO: fill in this help text',
        },
        weapons: {
            name: 'Weapons',
            help: 'TO-DO: fill in this help text',
        },
        sensors: {
            name: 'Sensors',
            help: 'TO-DO: fill in this help text',
        },
        power: {
            name: 'Power',
            help: 'TO-DO: fill in this help text',
        },
        damage: {
            name: 'Damage Control',
            help: 'TO-DO: fill in this help text',
        },
        view: {
            name: 'Viewscreen',
            help: 'TO-DO: fill in this help text',
        },
        comms: {
            name: 'Communications',
            help: 'TO-DO: fill in this help text',
        },
    },
};
;
var FeatureDetection = {
    Accelerometer: ('deviceorientation' in window),
    Canvas: ('CanvasRenderingContext2D' in window),
    Gamepad: navigator.getGamepads !== undefined /* || navigator.webkitGetGamepads !== undefined*/,
    Touch: ('ontouchstart' in window || navigator.msMaxTouchPoints),
    Vibration: ('vibrate' in navigator),
    WebSockets: ('WebSocket' in window || 'MozWebSocket' in window),
    CheckRequirements: function (game) {
        if (!this.WebSockets) {
            game.showError(language.errors.noWebsockets);
            return false;
        }
        if (!this.Canvas) {
            game.showError(language.errors.noCanvas);
            return false;
        }
        return true;
    }
};
var Connection = (function () {
    function Connection(game, url) {
        this.game = game;
        this.socket = new WebSocket(url);
        this.socket.onerror = this.socket.onclose = function () { this.game.showError(language.errors.connectionLost, true); }.bind(this);
        this.socket.onmessage = this.messageReceived.bind(this);
        this.socket.onopen = this.connected.bind(this);
        this.close = this.socket.close.bind(this.socket);
        this.queue = [];
    }
    Connection.prototype.send = function (cmd) {
        if (this.socket.readyState == 1)
            this.sendImmediately(cmd);
        else
            this.queue.push(cmd);
    };
    Connection.prototype.sendImmediately = function (cmd) {
        //console.log('sent', cmd);
        this.socket.send(cmd);
    };
    Connection.prototype.connected = function () {
        // once connection is established, send any queued messages
        var cmd = this.queue.pop();
        while (cmd !== undefined) {
            this.sendImmediately(cmd);
            cmd = this.queue.pop();
        }
    };
    Connection.prototype.messageReceived = function (ev) {
        var data = (ev.data || '');
        //console.log('received', data);
        var pos = data.indexOf(' ');
        var cmd = pos == -1 ? data : data.substr(0, pos);
        data = pos == -1 ? '' : data.substr(pos + 1);
        if (cmd == 'id') {
            this.game.setPlayerID(data);
            if (this.game.state.settings !== undefined)
                this.send('name ' + this.game.state.settings.userName);
            this.game.show(3 /* RoleSelection */, true);
        }
        else if (cmd == 'crew') {
            var count = parseInt(data);
            this.game.setCrewSize(count);
        }
        else if (cmd == 'sys') {
            var systemFlags = parseInt(data);
            this.game.setCrewmateSystemUsage(systemFlags);
        }
        else if (cmd == 'setup+') {
            this.game.setupScreenInUse(false);
        }
        else if (cmd == 'setup-') {
            this.game.setupScreenInUse(true);
        }
        else if (cmd == 'pause') {
            this.game.setGameActive(true);
            this.game.show(3 /* RoleSelection */, true);
        }
        else if (cmd == 'game+') {
            var systemFlags = parseInt(data);
            this.game.setSystemUsage(systemFlags);
            this.game.setGameActive(true);
        }
        else if (cmd == 'game-') {
            this.game.setGameActive(false);
            var blame = data != null ? language.messages.gameEndedUser.replace('@name@', data) : language.messages.gameEnded;
            this.game.showError(blame + ' ' + language.messages.wait, false);
            setTimeout(function () { this.game.show(3 /* RoleSelection */, true); }.bind(this), 3000);
        }
        else if (cmd == 'selectsys+') {
            this.game.setDirectSystemSelection(true);
        }
        else if (cmd == 'selectsys-') {
            this.game.setDirectSystemSelection(false);
        }
        else {
            var sysNum = cmd.length > 1 ? parseInt(cmd.substr(0, 1)) : NaN;
            if (isNaN(sysNum))
                console.error(language.errorUnrecognisedCommand + cmd);
            else {
                cmd = cmd.substr(1); // TODO: now that system are bit flags, this won't just always be a single digit
                var system = this.game.getSystem(sysNum);
                if (system === undefined)
                    console.error(language.errorWrongSystem.replace('@num@', sysNum.toString()) + cmd);
                if (!system.receiveMessage(cmd, data))
                    console.error(language.errorSystemDidntHandleMessage.replace('@system@', system.name).replace('@cmd@', cmd).replace('@data@', data));
            }
        }
    };
    return Connection;
}());
var ClientSettings = (function () {
    function ClientSettings() {
    }
    ClientSettings.load = function () {
        var mode = localStorage.getItem('inputMode');
        var name = localStorage.getItem('userName');
        if (mode === null || name == null)
            return undefined;
        var settings = new ClientSettings();
        settings.inputMode = parseInt(mode);
        settings.userName = name;
        return settings;
    };
    ClientSettings.save = function (settings) {
        localStorage.setItem('inputMode', settings.inputMode.toString());
        localStorage.setItem('userName', settings.userName);
    };
    return ClientSettings;
}());
var ShipSystem;
(function (ShipSystem) {
    ShipSystem[ShipSystem["Helm"] = 1] = "Helm";
    ShipSystem[ShipSystem["Warp"] = 2] = "Warp";
    ShipSystem[ShipSystem["Weapons"] = 4] = "Weapons";
    ShipSystem[ShipSystem["Sensors"] = 8] = "Sensors";
    ShipSystem[ShipSystem["PowerManagement"] = 16] = "PowerManagement";
    ShipSystem[ShipSystem["DamageControl"] = 32] = "DamageControl";
    ShipSystem[ShipSystem["ViewScreen"] = 64] = "ViewScreen";
    ShipSystem[ShipSystem["Communications"] = 128] = "Communications";
})(ShipSystem || (ShipSystem = {}));
var CrewRole = (function () {
    function CrewRole(name, systemFlags) {
        this.name = name;
        this.systemFlags = systemFlags;
    }
    return CrewRole;
}());
(function (ShipSystem) {
    ShipSystem.allSystems = [
        ShipSystem.Helm,
        ShipSystem.Warp,
        ShipSystem.Weapons,
        ShipSystem.Sensors,
        ShipSystem.PowerManagement,
        ShipSystem.DamageControl,
        ShipSystem.Communications,
        ShipSystem.ViewScreen,
    ];
    ShipSystem.count = ShipSystem.allSystems.length;
    function getSingle(flags) {
        if (flags & ShipSystem.Helm)
            return ShipSystem.Helm;
        if (flags & ShipSystem.Warp)
            return ShipSystem.Warp;
        if (flags & ShipSystem.Weapons)
            return ShipSystem.Weapons;
        if (flags & ShipSystem.Sensors)
            return ShipSystem.Sensors;
        if (flags & ShipSystem.PowerManagement)
            return ShipSystem.PowerManagement;
        if (flags & ShipSystem.DamageControl)
            return ShipSystem.DamageControl;
        if (flags & ShipSystem.Communications)
            return ShipSystem.Communications;
        if (flags & ShipSystem.ViewScreen)
            return ShipSystem.ViewScreen;
        return 0;
    }
    ShipSystem.getSingle = getSingle;
    function getArray(flags) {
        var systems = [];
        if (flags & ShipSystem.Helm)
            systems.push(ShipSystem.Helm);
        if (flags & ShipSystem.Warp)
            systems.push(ShipSystem.Warp);
        if (flags & ShipSystem.Weapons)
            systems.push(ShipSystem.Weapons);
        if (flags & ShipSystem.Sensors)
            systems.push(ShipSystem.Sensors);
        if (flags & ShipSystem.PowerManagement)
            systems.push(ShipSystem.PowerManagement);
        if (flags & ShipSystem.DamageControl)
            systems.push(ShipSystem.DamageControl);
        if (flags & ShipSystem.Communications)
            systems.push(ShipSystem.Communications);
        if (flags & ShipSystem.ViewScreen)
            systems.push(ShipSystem.ViewScreen);
        return systems;
    }
    ShipSystem.getArray = getArray;
    function getInfoArray(flags) {
        var systems = [];
        if (flags & ShipSystem.Helm)
            systems.push(language.systems.helm);
        if (flags & ShipSystem.Warp)
            systems.push(language.systems.warp);
        if (flags & ShipSystem.Weapons)
            systems.push(language.systems.weapons);
        if (flags & ShipSystem.Sensors)
            systems.push(language.systems.sensors);
        if (flags & ShipSystem.PowerManagement)
            systems.push(language.systems.power);
        if (flags & ShipSystem.DamageControl)
            systems.push(language.systems.damage);
        if (flags & ShipSystem.Communications)
            systems.push(language.systems.comms);
        if (flags & ShipSystem.ViewScreen)
            systems.push(language.systems.view);
        return systems;
    }
    function getNames(flags) {
        var systems = getInfoArray(flags);
        if (systems.length == 1)
            return systems[0].name;
        var output = '';
        for (var _i = 0, systems_1 = systems; _i < systems_1.length; _i++) {
            var system = systems_1[_i];
            output += ', ' + system.name;
        }
        if (output == '')
            return '';
        else
            return output.substr(2);
    }
    ShipSystem.getNames = getNames;
    function getHelpText(systemFlags) {
        var systems = getInfoArray(systemFlags);
        if (systems.length == 1)
            return "<p>" + systems[0].help + "</p>";
        var output = '';
        for (var _i = 0, systems_2 = systems; _i < systems_2.length; _i++) {
            var system = systems_2[_i];
            output += "<h2>" + system.name + "</h2><p>" + system.help + "</p>";
        }
        return output;
    }
    ShipSystem.getHelpText = getHelpText;
    function getRoles(crewSize) {
        switch (crewSize) {
            case 1:
                return [
                    new CrewRole(language.roles.solo, ShipSystem.Helm | ShipSystem.Warp | ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen | ShipSystem.Communications),
                ];
            case 2:
                return [
                    new CrewRole(language.roles.pilot, ShipSystem.Helm | ShipSystem.Warp | ShipSystem.ViewScreen),
                    new CrewRole(language.roles.operations, ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen | ShipSystem.Communications),
                ];
            case 3:
                return [
                    new CrewRole(language.systems.helm.name, ShipSystem.Helm | ShipSystem.ViewScreen),
                    new CrewRole(language.roles.tactical, ShipSystem.Weapons | ShipSystem.Sensors | ShipSystem.ViewScreen | ShipSystem.Communications),
                    new CrewRole(language.roles.engineering, ShipSystem.Warp | ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen),
                ];
            case 4:
                return [
                    new CrewRole(language.systems.helm.name, ShipSystem.Helm | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.weapons.name, ShipSystem.Weapons | ShipSystem.ViewScreen),
                    new CrewRole(language.roles.engineering, ShipSystem.PowerManagement | ShipSystem.DamageControl | ShipSystem.ViewScreen),
                    new CrewRole(language.roles.operations, ShipSystem.Warp | ShipSystem.Sensors | ShipSystem.Communications | ShipSystem.ViewScreen),
                ];
            case 5:
                return [
                    new CrewRole(language.systems.helm.name, ShipSystem.Helm | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.weapons.name, ShipSystem.Weapons | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.power.name, ShipSystem.PowerManagement | ShipSystem.ViewScreen),
                    new CrewRole(language.roles.engineering, ShipSystem.Warp | ShipSystem.DamageControl | ShipSystem.ViewScreen),
                    new CrewRole(language.roles.operations, ShipSystem.Sensors | ShipSystem.Communications | ShipSystem.ViewScreen),
                ];
            case 6:
                return [
                    new CrewRole(language.systems.helm.name, ShipSystem.Helm | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.weapons.name, ShipSystem.Weapons | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.power.name, ShipSystem.PowerManagement | ShipSystem.ViewScreen),
                    new CrewRole(language.roles.operations, ShipSystem.Warp | ShipSystem.Communications | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.sensors.name, ShipSystem.Sensors | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.damage.name, ShipSystem.DamageControl | ShipSystem.ViewScreen),
                ];
            case 7:
                return [
                    new CrewRole(language.systems.helm.name, ShipSystem.Helm | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.weapons.name, ShipSystem.Weapons | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.power.name, ShipSystem.PowerManagement | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.warp.name, ShipSystem.Warp | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.comms.name, ShipSystem.Communications | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.sensors.name, ShipSystem.Sensors | ShipSystem.ViewScreen),
                    new CrewRole(language.systems.damage.name, ShipSystem.DamageControl | ShipSystem.ViewScreen),
                ];
            default:
                return [];
        }
    }
    ShipSystem.getRoles = getRoles;
    function getIcon(system) {
        switch (system) {
            case ShipSystem.Helm:
                return 'helm';
            case ShipSystem.Warp:
                return 'warp';
            case ShipSystem.Weapons:
                return 'weapons';
            case ShipSystem.Sensors:
                return 'sensors';
            case ShipSystem.PowerManagement:
                return 'power';
            case ShipSystem.DamageControl:
                return 'damage';
            case ShipSystem.ViewScreen:
                return 'view';
            case ShipSystem.Communications:
                return 'comms';
            default:
                return undefined;
        }
    }
    ShipSystem.getIcon = getIcon;
})(ShipSystem || (ShipSystem = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Help = (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Help.prototype.render = function () {
        var closeButton = this.props.closed === undefined ? undefined
            : React.createElement(IconButton, { clicked: this.props.closed, icon: "close" }); // hotkey="esc"
        return (React.createElement("div", { className: "helpView" },
            React.createElement("h1", null,
                language.common.help,
                ": ",
                this.props.title),
            React.createElement("div", { className: "content", dangerouslySetInnerHTML: { __html: this.props.content } }),
            React.createElement(Menu, null, closeButton)));
    };
    return Help;
}(React.Component));
var IconButton = (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconButton.prototype.render = function () {
        switch (this.props.icon) {
            case 'refresh':
                return this.renderRefresh();
            case 'settings':
                return this.renderSettings();
            case 'close':
                return this.renderClose();
            case 'help':
                return this.renderHelp();
            case 'pause':
                return this.renderPause();
            case 'next':
                return this.renderNext();
            case 'prev':
                return this.renderPrev();
            case 'helm':
                return this.renderHelm();
            case 'warp':
                return this.renderWarp();
            case 'weapons':
                return this.renderWeapons();
            case 'sensors':
                return this.renderSensors();
            case 'power':
                return this.renderPower();
            case 'damage':
                return this.renderDamage();
            case 'comms':
                return this.renderComms();
            case 'view':
                return this.renderViewscreen();
        }
    };
    IconButton.prototype.getClasses = function () {
        return this.props.className === undefined ? 'icon' : 'icon ' + this.props.className;
    };
    IconButton.prototype.renderRefresh = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("polyline", { points: "1 4 1 10 7 10" }),
            React.createElement("polyline", { points: "23 20 23 14 17 14" }),
            React.createElement("path", { d: "M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" }));
    };
    IconButton.prototype.renderSettings = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("circle", { cx: "12", cy: "12", r: "3" }),
            React.createElement("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z", strokeMiterlimit: "10" }));
    };
    IconButton.prototype.renderClose = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
            React.createElement("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
            React.createElement("line", { x1: "9", y1: "9", x2: "15", y2: "15" }));
    };
    IconButton.prototype.renderHelp = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
            React.createElement("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
            React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "8" }));
    };
    IconButton.prototype.renderPause = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("rect", { x: "6", y: "4", width: "4", height: "16" }),
            React.createElement("rect", { x: "14", y: "4", width: "4", height: "16" }));
    };
    IconButton.prototype.renderNext = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("polygon", { points: "5 4 15 12 5 20 5 4" }),
            React.createElement("line", { x1: "19", y1: "5", x2: "19", y2: "19" }));
    };
    IconButton.prototype.renderPrev = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("polygon", { points: "19 20 9 12 19 4 19 20" }),
            React.createElement("line", { x1: "5", y1: "19", x2: "5", y2: "5" }));
    };
    IconButton.prototype.renderHelm = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("polygon", { points: "3 11 22 2 13 21 11 13 3 11" }));
    };
    IconButton.prototype.renderWarp = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
            React.createElement("polygon", { points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" }));
    };
    IconButton.prototype.renderWeapons = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
            React.createElement("line", { x1: "22", y1: "12", x2: "18", y2: "12" }),
            React.createElement("line", { x1: "6", y1: "12", x2: "2", y2: "12" }),
            React.createElement("line", { x1: "12", y1: "6", x2: "12", y2: "2" }),
            React.createElement("line", { x1: "12", y1: "22", x2: "12", y2: "18" }));
    };
    IconButton.prototype.renderSensors = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }));
    };
    IconButton.prototype.renderPower = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("path", { d: "M18.36 6.64a9 9 0 1 1-12.73 0" }),
            React.createElement("line", { x1: "12", y1: "2", x2: "12", y2: "12" }));
    };
    IconButton.prototype.renderDamage = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
            React.createElement("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
            React.createElement("line", { x1: "12", y1: "17", x2: "12", y2: "17" }));
    };
    IconButton.prototype.renderComms = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("path", { d: "M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }));
    };
    IconButton.prototype.renderViewscreen = function () {
        return React.createElement("svg", { onClick: this.props.clicked, title: this.props.title, className: this.getClasses(), role: "button", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            React.createElement("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
            React.createElement("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
            React.createElement("line", { x1: "12", y1: "17", x2: "12", y2: "21" }));
    };
    return IconButton;
}(React.Component));
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showHelp: false,
        };
        return _this;
    }
    /*
        componentDidMount() {
            if (this.props.hotkey != null)
                Hotkeys.register(this.props.hotkey, this);
        }
        componentWillUnmount() {
            if (this.props.hotkey != null)
                Hotkeys.unregister(this.props.hotkey, this);
        }
    */
    Button.prototype.render = function () {
        if (this.props.help === undefined)
            return this.renderButton();
        return this.renderWithHelp();
    };
    Button.prototype.renderWithHelp = function () {
        var help = this.state.showHelp && this.props.help !== undefined ?
            React.createElement(Help, { title: this.props.text, content: this.props.help, closed: this.showHelp.bind(this, false) })
            : undefined;
        return React.createElement("div", { className: "buttons separate" },
            this.renderButton(),
            React.createElement(IconButton, { clicked: this.showHelp.bind(this, true), icon: "help" }),
            help);
    };
    Button.prototype.showHelp = function (show) {
        this.setState({
            showHelp: show
        });
    };
    Button.prototype.determineClasses = function () {
        var classes = this.props.className;
        var color = this.props.color === undefined ? this.props.groupColor : this.props.color;
        if (color !== undefined) {
            switch (this.props.color) {
                case 0 /* Primary */:
                    classes += ' primary';
                    break;
                case 1 /* Secondary */:
                    classes += ' secondary';
                    break;
                case 2 /* Tertiary */:
                    classes += ' tertiary';
                    break;
                case 3 /* Quaternary */:
                    classes += ' quaternary';
                    break;
                case 4 /* Quandry */:
                    classes += ' quandry';
                    break;
            }
        }
        return classes;
    };
    Button.prototype.renderButton = function () {
        var subtext = this.props.subtext === undefined ? undefined : React.createElement("div", { className: "subtext" }, this.props.subtext);
        return React.createElement("button", { className: this.determineClasses(), disabled: this.props.disabled || this.props.groupDisabled, onMouseDown: this.props.disabled ? undefined : this.props.mouseDown, onMouseUp: this.props.disabled ? undefined : this.props.mouseUp, onMouseLeave: this.props.disabled ? undefined : this.props.mouseLeave, onClick: this.props.disabled ? undefined : this.props.mouseClick, "data-hotkey": this.props.hotkey, type: this.props.buttonType, title: this.props.title },
            this.props.text,
            subtext);
    };
    return Button;
}(React.Component));
Button.defaultProps = {
    buttonType: 'button',
    text: '',
};
var PushButton = (function (_super) {
    __extends(PushButton, _super);
    function PushButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushButton.prototype.render = function () {
        var classList = 'push';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return React.createElement(Button, { className: classList, hotkey: this.props.hotkey, mouseClick: this.clicked.bind(this), color: this.props.color, disabled: this.props.disabled, title: this.props.title, text: this.props.text, subtext: this.props.subtext, help: this.props.help });
    };
    PushButton.prototype.clicked = function (e) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        if (this.props.command !== undefined)
            gameClient.server.send(this.props.command);
    };
    return PushButton;
}(React.Component));
var ConfirmButton = (function (_super) {
    __extends(ConfirmButton, _super);
    function ConfirmButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { primed: false };
        return _this;
    }
    ConfirmButton.prototype.render = function () {
        var classList = this.state.primed ? 'confirm active' : 'confirm';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return React.createElement(Button, { className: classList, hotkey: this.props.hotkey, mouseClick: this.clicked.bind(this), buttonType: "submit", color: this.props.color, disabled: this.props.disabled, text: this.props.text, subtext: this.props.subtext, title: this.props.title, help: this.props.help });
    };
    ConfirmButton.prototype.clicked = function (e) {
        if (this.state.primed) {
            this.clearAutoCancel();
            if (this.props.clicked != undefined)
                this.props.clicked();
            if (this.props.command !== undefined)
                gameClient.server.send(this.props.command);
        }
        else {
            this.autoCancel = setTimeout(this.cancelPrime.bind(this), 10000);
        }
        this.setState({ primed: !this.state.primed });
        e.preventDefault();
    };
    ConfirmButton.prototype.cancelPrime = function () {
        if (this.state.primed)
            this.setState({ primed: false });
        this.autoCancel = undefined;
    };
    ConfirmButton.prototype.clearAutoCancel = function () {
        if (this.autoCancel !== undefined) {
            clearTimeout(this.autoCancel);
            this.autoCancel = undefined;
        }
    };
    ConfirmButton.prototype.componentWillUnmount = function () {
        this.clearAutoCancel();
    };
    return ConfirmButton;
}(React.Component));
var ToggleButton = (function (_super) {
    __extends(ToggleButton, _super);
    function ToggleButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { active: props.startActive === true };
        return _this;
    }
    ToggleButton.prototype.componentWillMount = function () {
        if (this.props.startActive === true && this.props.choiceOptionActivated !== undefined)
            this.props.choiceOptionActivated(this);
    };
    ToggleButton.prototype.render = function () {
        var classList = this.state.active ? 'toggle active' : 'toggle';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return React.createElement(Button, { className: classList, hotkey: this.props.hotkey, mouseClick: this.clicked.bind(this), color: this.props.color, disabled: this.props.disabled, text: this.props.text, subtext: this.props.subtext, title: this.props.title, help: this.props.help });
    };
    ToggleButton.prototype.clicked = function (e) {
        if (this.state.active) {
            if (this.props.allowUserDeactivate === false)
                return; // in a choice, don't deactivate a button by clicking on it
            if (this.props.deactivated != undefined)
                this.props.deactivated();
            if (this.props.deactivateCommand !== undefined)
                gameClient.server.send(this.props.deactivateCommand);
        }
        else {
            if (this.props.choiceOptionActivated !== undefined)
                this.props.choiceOptionActivated(this);
            if (this.props.activated != undefined)
                this.props.activated();
            if (this.props.activateCommand !== undefined)
                gameClient.server.send(this.props.activateCommand);
        }
        this.setState({ active: !this.state.active });
    };
    ToggleButton.prototype.select = function (selected) {
        this.setState({ active: selected });
    };
    return ToggleButton;
}(React.Component));
ToggleButton.defaultProps = {
    inChoice: false,
    startActive: false,
    allowUserDeactivate: true,
};
var HeldButton = (function (_super) {
    __extends(HeldButton, _super);
    function HeldButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { held: false };
        return _this;
    }
    HeldButton.prototype.render = function () {
        var classList = this.state.held ? 'held active' : 'held';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        return React.createElement(Button, { className: classList, hotkey: this.props.hotkey, text: this.props.text, subtext: this.props.subtext, help: this.props.help, mouseDown: this.mouseDown.bind(this), mouseUp: this.mouseUp.bind(this), color: this.props.color, disabled: this.props.disabled, title: this.props.title });
    };
    HeldButton.prototype.mouseDown = function (e) {
        this.setState({ held: true });
        if (this.props.pressed != undefined)
            this.props.pressed();
        if (this.props.pressCommand !== undefined)
            gameClient.server.send(this.props.pressCommand);
    };
    HeldButton.prototype.mouseUp = function (e) {
        if (!this.state.held)
            return;
        this.setState({ held: false });
        if (this.props.released != undefined)
            this.props.released();
        if (this.props.pressCommand !== undefined)
            gameClient.server.send(this.props.pressCommand);
    };
    return HeldButton;
}(React.Component));
var ButtonSet = (function (_super) {
    __extends(ButtonSet, _super);
    function ButtonSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonSet.prototype.render = function () {
        var _this = this;
        var classes = 'buttons';
        if (this.props.vertical)
            classes += ' vertical';
        if (this.props.separate)
            classes += ' separate';
        if (this.props.className !== undefined)
            classes += ' ' + this.props.className;
        var childrenWithProps = React.Children.map(this.props.children, function (child) {
            if (child === null)
                return null;
            if (child.type === ToggleButton)
                return React.cloneElement(child, {
                    groupDisabled: _this.props.disabled,
                    color: _this.props.color,
                    allowUserDeactivate: _this.props.allowUnselected,
                    choiceOptionActivated: _this.props.childActivated,
                });
            if (child.type === PushButton || child.type === ConfirmButton || child.type === HeldButton)
                return React.cloneElement(child, {
                    groupDisabled: _this.props.disabled,
                    groupColor: _this.props.color,
                });
            return child;
        });
        return (React.createElement("div", { className: classes }, childrenWithProps));
    };
    return ButtonSet;
}(React.Component));
ButtonSet.defaultProps = {
    vertical: false,
    allowUnselected: true,
    separate: false,
};
var Choice = (function (_super) {
    __extends(Choice, _super);
    function Choice(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeChild: undefined
        };
        return _this;
    }
    Choice.prototype.render = function () {
        var classes = 'choice';
        if (this.props.className !== undefined)
            classes += ' ' + this.props.className;
        var description, descClass;
        if (this.state.activeChild !== undefined && this.state.activeChild.props.description !== undefined) {
            description = this.state.activeChild.props.description;
            descClass = 'description';
        }
        else {
            description = '.';
            descClass = 'description hidden';
        }
        return (React.createElement("div", { className: classes },
            this.props.prompt == null ? null : React.createElement("div", { className: "prompt" }, this.props.prompt),
            React.createElement(ButtonSet, { vertical: this.props.vertical, separate: this.props.separate, disabled: this.props.disabled, color: this.props.color, allowUnselected: this.props.allowUnselected, childActivated: this.childActivated.bind(this) }, this.props.children),
            React.createElement("div", { className: descClass }, description)));
    };
    Choice.prototype.childActivated = function (activated) {
        if (this.state.activeChild !== undefined)
            this.state.activeChild.setState({ active: false });
        this.setState({ activeChild: activated });
    };
    return Choice;
}(React.Component));
Choice.defaultProps = {
    vertical: false,
    allowUnselected: false,
};
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Menu.prototype.render = function () {
        return (React.createElement(ButtonSet, { className: "menu separate", color: 4 /* Quandry */ }, this.props.children));
    };
    return Menu;
}(React.Component));
var SystemHeader = (function (_super) {
    __extends(SystemHeader, _super);
    function SystemHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showHelp: false,
        };
        return _this;
    }
    SystemHeader.prototype.render = function () {
        var name = ShipSystem.getNames(this.props.activeSystem);
        var help = this.renderHelp(name);
        var systemList = this.props.activeSystem == this.props.allSystems ? undefined
            : ShipSystem.getArray(this.props.allSystems);
        var prev, next, allSystemIcons, separator;
        if (systemList === undefined) {
            prev = next = allSystemIcons = separator = undefined;
        }
        else {
            prev = this.renderNavIcon(this.getPreviousSystem(systemList), undefined, 'prev', false);
            next = this.renderNavIcon(this.getNextSystem(systemList), undefined, 'next', false);
            var that_1 = this;
            allSystemIcons = systemList.map(function (system, id) {
                return that_1.renderNavIcon(system, id, undefined, true);
            });
            separator = React.createElement("div", { className: "separator showLargeUp" });
        }
        return React.createElement("div", { className: "systemHeader" },
            React.createElement("div", { className: "nameWrapper" },
                prev,
                next,
                React.createElement("h1", { className: "name" }, name)),
            help,
            allSystemIcons,
            separator,
            React.createElement(IconButton, { title: language.common.help, clicked: this.showHelp.bind(this, true), icon: "help" }),
            React.createElement(IconButton, { title: language.screens.active.pause, icon: "pause" }));
    };
    SystemHeader.prototype.renderHelp = function (name) {
        if (!this.state.showHelp || this.props.activeSystem == 0)
            return undefined;
        var help = ShipSystem.getHelpText(this.props.activeSystem);
        return React.createElement(Help, { title: name, content: help, closed: this.showHelp.bind(this, false) });
    };
    SystemHeader.prototype.showHelp = function (show) {
        this.setState({
            showHelp: show
        });
    };
    SystemHeader.prototype.renderNavIcon = function (system, id, icon, showOnLarge) {
        if (showOnLarge === void 0) { showOnLarge = true; }
        if (icon === undefined) {
            icon = ShipSystem.getIcon(system);
            if (icon === undefined)
                icon = 'help';
        }
        var name = system == 0 ? undefined : ShipSystem.getNames(system);
        var classes = system == 0 || system == this.props.activeSystem ? 'disabled' : '';
        classes += showOnLarge ? ' showLargeUp' : ' showMediumDown';
        var clicked = system == 0 ? undefined : this.switchSystem.bind(this, system);
        return React.createElement(IconButton, { icon: icon, title: name, className: classes, clicked: clicked, key: id });
    };
    SystemHeader.prototype.switchSystem = function (system) {
        this.props.switchSystem(system);
    };
    SystemHeader.prototype.getPreviousSystem = function (systemList) {
        var activeIndex = -1;
        for (var i = 0; i < systemList.length; i++)
            if (systemList[i] == this.props.activeSystem) {
                activeIndex = i;
                break;
            }
        if (activeIndex <= 0)
            return 0;
        return systemList[activeIndex - 1];
    };
    SystemHeader.prototype.getNextSystem = function (systemList) {
        var activeIndex = -1;
        for (var i = 0; i < systemList.length; i++)
            if (systemList[i] == this.props.activeSystem) {
                activeIndex = i;
                break;
            }
        if (activeIndex == -1 || activeIndex >= systemList.length - 1)
            return 0;
        return systemList[activeIndex + 1];
    };
    return SystemHeader;
}(React.Component));
var ErrorScreen = (function (_super) {
    __extends(ErrorScreen, _super);
    function ErrorScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorScreen.prototype.render = function () {
        return (React.createElement("div", { className: "screen", id: "error" },
            React.createElement("p", null, this.props.message)));
    };
    return ErrorScreen;
}(React.Component));
var SettingsScreen = (function (_super) {
    __extends(SettingsScreen, _super);
    function SettingsScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            inputMode: props.inputMode,
            userName: props.userName,
        };
        return _this;
    }
    SettingsScreen.prototype.render = function () {
        var words = language.screens.settings;
        var cancelButton = this.props.canCancel ? React.createElement(PushButton, { color: 3 /* Quaternary */, clicked: this.cancel.bind(this), text: language.common.cancel }) : null;
        var canSave = this.state.inputMode !== undefined && this.state.userName != null && this.state.userName.trim().length > 0;
        var inputModeVertical = this.props.width < 330;
        return (React.createElement("div", { className: "screen", id: "settings" },
            React.createElement("form", null,
                React.createElement("h1", null, words.intro),
                React.createElement("div", { role: "group" },
                    React.createElement("label", null, words.inputMode),
                    React.createElement(Choice, { prompt: words.inputModePrompt, color: 0 /* Primary */, vertical: inputModeVertical },
                        React.createElement(ToggleButton, { startActive: this.props.inputMode == 0 /* ButtonsAndKeyboard */, activated: this.setInputMode.bind(this, 0 /* ButtonsAndKeyboard */), description: words.inputModeDescriptionKeyboard, text: words.inputModeKeyboard }),
                        React.createElement(ToggleButton, { startActive: this.props.inputMode == 1 /* Touchscreen */, activated: this.setInputMode.bind(this, 1 /* Touchscreen */), description: words.inputModeDescriptionTouchscreen, text: words.inputModeTouchscreen }),
                        React.createElement(ToggleButton, { startActive: this.props.inputMode == 2 /* GamePad */, disabled: true, activated: this.setInputMode.bind(this, 2 /* GamePad */), description: words.inputModeDescriptionGamepad, text: words.inputModeGamepad }))),
                React.createElement("div", { role: "group" },
                    React.createElement("label", { htmlFor: "txtUserName" }, words.userName),
                    React.createElement("div", null,
                        React.createElement("input", { id: "txtUserName", className: "value secondary", type: "text", value: this.state.userName, onChange: this.nameChanged.bind(this), placeholder: words.userNamePlaceholder }),
                        React.createElement("div", { className: "description" }, words.userNameDescription))),
                React.createElement(ButtonSet, { className: "actions", separate: true },
                    React.createElement(ConfirmButton, { color: 2 /* Tertiary */, disabled: !canSave, clicked: this.save.bind(this), text: language.common.save }),
                    cancelButton))));
    };
    SettingsScreen.prototype.setInputMode = function (mode) {
        this.setState({ inputMode: mode, userName: this.state.userName });
    };
    SettingsScreen.prototype.nameChanged = function (event) {
        this.setState({ userName: event.target.value });
    };
    SettingsScreen.prototype.save = function () {
        var settings = new ClientSettings();
        if (this.state.inputMode !== undefined)
            settings.inputMode = this.state.inputMode;
        if (this.state.userName !== undefined)
            settings.userName = this.state.userName.trim();
        ClientSettings.save(settings);
        if (this.props.saved !== undefined)
            this.props.saved(settings);
    };
    SettingsScreen.prototype.cancel = function () {
        if (this.props.cancelled !== undefined)
            this.props.cancelled();
    };
    return SettingsScreen;
}(React.Component));
SettingsScreen.defaultProps = {
    canCancel: true,
};
var RoleSelection = (function (_super) {
    __extends(RoleSelection, _super);
    function RoleSelection(props) {
        var _this = _super.call(this, props) || this;
        _this.selectionButtons = {};
        return _this;
    }
    RoleSelection.prototype.render = function () {
        var showSystemSelection;
        var roles;
        if (this.props.forceShowSystems) {
            showSystemSelection = true;
            roles = [];
        }
        else {
            roles = ShipSystem.getRoles(this.props.crewSize);
            showSystemSelection = roles.length == 0;
        }
        var roleOrSystemSelection = showSystemSelection
            ? this.renderSystemSelection()
            : this.renderRoleSelection(roles);
        var words = language.screens.roleSelection;
        return (React.createElement("div", { className: "screen", id: "roleSelection" },
            React.createElement("div", null,
                React.createElement("h1", null, showSystemSelection ? words.systemHeading : words.roleHeading),
                React.createElement("p", { className: "prompt" }, showSystemSelection ? words.systemPrompt : words.rolePrompt)),
            React.createElement("div", { className: "content" },
                roleOrSystemSelection,
                this.renderActionButtons()),
            React.createElement(Menu, null,
                React.createElement(IconButton, { clicked: this.settingsClicked.bind(this), icon: "settings", title: language.common.settings }))));
    };
    RoleSelection.prototype.renderSelectionTypeSwitch = function () {
        if (this.props.crewSize >= ShipSystem.count)
            return undefined;
        var words = language.screens.roleSelection;
        if (this.props.forceShowSystems)
            return React.createElement(ConfirmButton, { color: 2 /* Tertiary */, command: "-selectsys", text: words.showRoles });
        else
            return React.createElement(ConfirmButton, { color: 1 /* Secondary */, command: "+selectsys", text: words.showSystems });
    };
    RoleSelection.prototype.renderSystemSelection = function () {
        var that = this;
        return React.createElement("div", { className: "systems imitateChoice" },
            React.createElement(ButtonSet, { color: 1 /* Secondary */, vertical: true, separate: true }, ShipSystem.allSystems.map(function (system, id) {
                var inUse = (system & that.props.otherCrewsSystems) == system;
                var name = ShipSystem.getNames(system);
                var help = ShipSystem.getHelpText(system);
                var tooltip = inUse ? language.screens.roleSelection.systemInUse : undefined;
                var classes = inUse ? 'inUse' : undefined;
                return React.createElement(ToggleButton, { key: id, help: help, activateCommand: "sys+ " + system, deactivateCommand: "sys- " + system, className: classes, title: tooltip, text: name, ref: function (ref) { that.selectionButtons[id] = ref; } });
            })));
    };
    RoleSelection.prototype.renderRoleSelection = function (roles) {
        var that = this;
        return React.createElement(Choice, { color: 2 /* Tertiary */, vertical: true, separate: true, allowUnselected: true }, roles.map(function (role, id) {
            var disabled;
            var tooltip;
            if ((role.systemFlags & that.props.otherCrewsSystems) == role.systemFlags) {
                disabled = true;
                tooltip = 'Selected by another crew member';
            }
            else {
                disabled = false;
                tooltip = undefined;
            }
            var systemList = ShipSystem.getNames(role.systemFlags);
            if (systemList == role.name)
                systemList = undefined; // don't show subtext if its the same as the main text
            var help = ShipSystem.getHelpText(role.systemFlags);
            return React.createElement(ToggleButton, { key: id, text: role.name, subtext: systemList, title: tooltip, help: help, activateCommand: "sys " + role.systemFlags, deactivateCommand: "sys 0", disabled: disabled, className: "bold", ref: function (ref) { that.selectionButtons[id] = ref; } });
        }));
    };
    RoleSelection.prototype.renderActionButtons = function () {
        var resumeButton, quitButton, setupButton;
        if (this.props.gameActive) {
            resumeButton = React.createElement(PushButton, { className: "bold", color: 0 /* Primary */, command: "resume", text: language.screens.roleSelection.resume });
            quitButton = React.createElement(ConfirmButton, { color: 2 /* Tertiary */, command: "quit", text: language.screens.roleSelection.quit });
        }
        else {
            var disabled = void 0;
            var tooltip = void 0;
            if (this.props.setupInUse) {
                disabled = true;
                tooltip = language.screens.roleSelection.setupInUse;
            }
            else {
                disabled = false;
                tooltip = undefined;
            }
            setupButton = React.createElement(PushButton, { className: "bold", color: 0 /* Primary */, text: language.screens.roleSelection.setup, disabled: disabled, command: "+setup", clicked: this.props.setupClicked, title: tooltip });
        }
        return React.createElement(ButtonSet, { className: "actions", separate: true },
            this.renderSelectionTypeSwitch(),
            resumeButton,
            quitButton,
            setupButton);
    };
    RoleSelection.prototype.settingsClicked = function () {
        if (this.props.settingsClicked !== undefined)
            this.props.settingsClicked();
    };
    RoleSelection.prototype.clearSelection = function () {
        for (var id in this.selectionButtons) {
            var button = this.selectionButtons[id];
            if (button != null)
                button.select(false);
        }
    };
    return RoleSelection;
}(React.Component));
var GameSetup = (function (_super) {
    __extends(GameSetup, _super);
    function GameSetup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            shipName: _this.getRandomName(),
            joinAddress: '',
            serverName: '',
        };
        return _this;
    }
    GameSetup.prototype.getRandomName = function () {
        var randomNames = language.screens.setup.shipNames;
        var index = Math.floor(Math.random() * randomNames.length);
        return randomNames[index];
    };
    GameSetup.prototype.randomizeName = function () {
        var name;
        do {
            name = this.getRandomName();
        } while (name == this.state.shipName);
        this.setState({ shipName: name });
    };
    GameSetup.prototype.render = function () {
        var words = language.screens.setup;
        var canStart = this.decideCanStart();
        return React.createElement("div", { className: "screen", id: "setup" },
            React.createElement("form", null,
                React.createElement("h1", null, words.intro),
                this.renderShipName(),
                this.renderGameType(),
                this.renderJoinGameOptions(),
                this.renderGameMode(),
                this.renderDifficulty(),
                this.renderHostGameOptions(),
                React.createElement(ButtonSet, { className: "actions", separate: true },
                    React.createElement(ConfirmButton, { color: 2 /* Tertiary */, disabled: !canStart, clicked: this.start.bind(this), text: this.getContinueText() }),
                    React.createElement(PushButton, { color: 3 /* Quaternary */, clicked: this.cancel.bind(this), text: language.common.cancel }))));
    };
    GameSetup.prototype.renderShipName = function () {
        var words = language.screens.setup;
        return React.createElement("div", { role: "group" },
            React.createElement("label", { htmlFor: "txtShipName" }, words.shipName),
            React.createElement("div", null,
                React.createElement(ButtonSet, { separate: true },
                    React.createElement("input", { id: "txtShipName", className: "value tertiary", type: "text", value: this.state.shipName, onChange: this.shipNameChanged.bind(this) }),
                    React.createElement(IconButton, { icon: "refresh", clicked: this.randomizeName.bind(this) })),
                React.createElement("div", { className: "description" }, words.shipNameDescription)));
    };
    GameSetup.prototype.renderGameType = function () {
        var words = language.screens.setup;
        var vertical = this.props.width < 300;
        return React.createElement("div", { role: "group" },
            React.createElement("label", null, words.gameType),
            React.createElement(Choice, { prompt: words.gameTypePrompt, color: 0 /* Primary */, vertical: vertical },
                React.createElement(ToggleButton, { activated: this.setGameType.bind(this, 0 /* Local */), description: words.gameTypeLocalDescription, text: words.gameTypeLocal }),
                React.createElement(ToggleButton, { activated: this.setGameType.bind(this, 1 /* Join */), description: words.gameTypeJoinDescription, text: words.gameTypeJoin }),
                React.createElement(ToggleButton, { activated: this.setGameType.bind(this, 2 /* Host */), description: words.gameTypeHostDescription, text: words.gameTypeHost })));
    };
    GameSetup.prototype.renderJoinGameOptions = function () {
        if (this.state.gameType != 1 /* Join */)
            return undefined;
        var words = language.screens.setup;
        return React.createElement("div", { role: "group" },
            React.createElement("label", { htmlFor: "txtJoinAddress" }, words.joinAddress),
            React.createElement("div", null,
                React.createElement("input", { id: "txtJoinAddress", className: "value tertiary", type: "text", value: this.state.joinAddress, onChange: this.joinAddressChanged.bind(this) }),
                React.createElement("div", { className: "description" }, words.joinAddressDescription)));
    };
    GameSetup.prototype.renderGameMode = function () {
        if (this.state.gameType === undefined || this.state.gameType == 1 /* Join */)
            return undefined;
        var words = language.screens.setup;
        var vertical = this.props.width < 300;
        return React.createElement("div", { role: "group" },
            React.createElement("label", null, words.gameMode),
            React.createElement(Choice, { prompt: words.gameModePrompt, color: 1 /* Secondary */, vertical: vertical },
                React.createElement(ToggleButton, { activated: this.setGameMode.bind(this, 2 /* Exploration */), description: words.gameModeExplorationDescription, text: words.gameModeExploration }),
                React.createElement(ToggleButton, { activated: this.setGameMode.bind(this, 1 /* Survival */), description: words.gameModeSurvivalDescription, text: words.gameModeSurvival }),
                React.createElement(ToggleButton, { activated: this.setGameMode.bind(this, 0 /* Arena */), description: words.gameModeArenaDescription, text: words.gameModeArena, disabled: this.state.gameType == 0 /* Local */ })));
    };
    GameSetup.prototype.renderDifficulty = function () {
        if (this.state.gameType == 1 /* Join */ || this.state.gameMode === undefined || !this.usesDifficulty(this.state.gameMode))
            return undefined;
        var words = language.screens.setup;
        var vertical = this.props.width < 400;
        var levels = [];
        for (var i = 1; i <= 10; i++)
            levels.push(React.createElement(ToggleButton, { key: i, activated: this.setDifficulty.bind(this, i), text: i.toString() }));
        return React.createElement("div", { role: "group" },
            React.createElement("label", null, words.difficulty),
            React.createElement(Choice, { prompt: words.difficultyPrompt, color: 2 /* Tertiary */, vertical: vertical }, levels));
    };
    GameSetup.prototype.renderHostGameOptions = function () {
        if (this.state.gameType != 2 /* Host */)
            return undefined;
        var words = language.screens.setup;
        return React.createElement("div", { role: "group" },
            React.createElement("label", { htmlFor: "txtServerName" }, words.serverName),
            React.createElement("div", null,
                React.createElement("input", { id: "txtServerName", className: "value tertiary", type: "text", value: this.state.serverName, onChange: this.serverNameChanged.bind(this) }),
                React.createElement("div", { className: "description" }, words.serverNameDescription)));
    };
    GameSetup.prototype.decideCanStart = function () {
        if (this.state.gameType === undefined)
            return false;
        if (this.state.shipName === undefined || this.state.shipName.trim().length == 0)
            return false;
        if (this.state.gameType == 1 /* Join */) {
            if (this.state.joinAddress === undefined || this.state.joinAddress.trim().length == 0)
                return false;
        }
        if (this.state.gameType == 0 /* Local */ || this.state.gameType == 2 /* Host */) {
            if (this.state.gameMode === undefined)
                return false;
            if (this.usesDifficulty(this.state.gameMode) && this.state.difficulty === undefined)
                return false;
        }
        if (this.state.gameType == 2 /* Host */) {
            if (this.state.serverName === undefined || this.state.serverName.trim().length == 0)
                return false;
        }
        else if (this.state.gameType == 0 /* Local */) {
            if (this.state.gameMode == 0 /* Arena */)
                return false; // invalid combo
        }
        return true;
    };
    GameSetup.prototype.usesDifficulty = function (mode) {
        switch (mode) {
            case 1 /* Survival */:
            case 2 /* Exploration */:
                return true;
            default:
                return false;
        }
    };
    GameSetup.prototype.getContinueText = function () {
        return this.state.gameType == 1 /* Join */
            ? language.screens.setup.gameTypeJoin
            : language.screens.setup.start;
    };
    GameSetup.prototype.setGameType = function (type) {
        this.setState({ gameType: type });
    };
    GameSetup.prototype.setGameMode = function (mode) {
        this.setState({ gameMode: mode });
    };
    GameSetup.prototype.setDifficulty = function (level) {
        this.setState({ difficulty: level });
    };
    GameSetup.prototype.shipNameChanged = function (event) {
        this.setState({ shipName: event.target.value });
    };
    GameSetup.prototype.joinAddressChanged = function (event) {
        this.setState({ joinAddress: event.target.value });
    };
    GameSetup.prototype.serverNameChanged = function (event) {
        this.setState({ serverName: event.target.value });
    };
    GameSetup.prototype.start = function () {
        if (this.props.started !== undefined)
            this.props.started(this.state);
    };
    GameSetup.prototype.cancel = function () {
        if (this.props.cancelled !== undefined)
            this.props.cancelled();
    };
    return GameSetup;
}(React.Component));
var GameActive = (function (_super) {
    __extends(GameActive, _super);
    function GameActive() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.systems = {};
        return _this;
    }
    GameActive.prototype.componentWillMount = function () {
        this.updateSystems(this.props);
    };
    GameActive.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.selectedSystems != this.props.selectedSystems)
            this.updateSystems(nextProps);
    };
    GameActive.prototype.updateSystems = function (newProps) {
        this.setState({ activeSystem: ShipSystem.getSingle(this.props.selectedSystems) });
        var newSystems = {};
        var systemList = ShipSystem.getArray(newProps.selectedSystems);
        for (var _i = 0, systemList_1 = systemList; _i < systemList_1.length; _i++) {
            var system = systemList_1[_i];
            var systemInstance = this.systems[system];
            if (systemInstance === undefined) {
                systemInstance = this.renderSystem(system);
                if (systemInstance === undefined)
                    continue;
            }
            newSystems[system] = systemInstance;
        }
        this.systems = newSystems;
    };
    GameActive.prototype.getSystem = function (system) {
        return this.systems[system];
    };
    GameActive.prototype.render = function () {
        return React.createElement("div", { className: "screen", id: "game" },
            React.createElement(SystemHeader, { activeSystem: this.state.activeSystem, allSystems: this.props.selectedSystems, switchSystem: this.switchSystem.bind(this) }),
            this.systems[this.state.activeSystem]);
    };
    GameActive.prototype.renderSystem = function (system) {
        switch (system) {
            case ShipSystem.Helm:
                return React.createElement(HelmSystem, { inputMode: this.props.inputMode, width: this.props.width, height: this.props.height });
            case ShipSystem.Warp:
                return React.createElement(WarpSystem, { inputMode: this.props.inputMode, width: this.props.width, height: this.props.height });
            case ShipSystem.Weapons:
                return React.createElement(WeaponsSystem, { inputMode: this.props.inputMode, width: this.props.width, height: this.props.height });
            case ShipSystem.Sensors:
                return React.createElement(SensorsSystem, { inputMode: this.props.inputMode, width: this.props.width, height: this.props.height });
            case ShipSystem.PowerManagement:
                return React.createElement(PowerSystem, { inputMode: this.props.inputMode, width: this.props.width, height: this.props.height });
            case ShipSystem.DamageControl:
                return React.createElement(DamageControlSystem, { inputMode: this.props.inputMode, width: this.props.width, height: this.props.height });
            case ShipSystem.ViewScreen:
                return React.createElement(ViewScreenSystem, { inputMode: this.props.inputMode, width: this.props.width, height: this.props.height });
            case ShipSystem.Communications:
                return React.createElement(CommunicationsSystem, { inputMode: this.props.inputMode, width: this.props.width, height: this.props.height });
            default:
                return undefined;
        }
    };
    GameActive.prototype.switchSystem = function (system) {
        this.setState({
            activeSystem: system,
        });
    };
    return GameActive;
}(React.Component));
var CommunicationsSystem = (function (_super) {
    __extends(CommunicationsSystem, _super);
    function CommunicationsSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommunicationsSystem.prototype.render = function () {
        return React.createElement("div", null);
    };
    return CommunicationsSystem;
}(React.Component));
var DamageControlSystem = (function (_super) {
    __extends(DamageControlSystem, _super);
    function DamageControlSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DamageControlSystem.prototype.render = function () {
        return React.createElement("div", null);
    };
    return DamageControlSystem;
}(React.Component));
var HelmSystem = (function (_super) {
    __extends(HelmSystem, _super);
    function HelmSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelmSystem.prototype.render = function () {
        return React.createElement("div", null, "Helm");
    };
    return HelmSystem;
}(React.Component));
var PowerSystem = (function (_super) {
    __extends(PowerSystem, _super);
    function PowerSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PowerSystem.prototype.render = function () {
        return React.createElement("div", null, "Power");
    };
    return PowerSystem;
}(React.Component));
var SensorsSystem = (function (_super) {
    __extends(SensorsSystem, _super);
    function SensorsSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SensorsSystem.prototype.render = function () {
        return React.createElement("div", null);
    };
    return SensorsSystem;
}(React.Component));
var ViewScreenSystem = (function (_super) {
    __extends(ViewScreenSystem, _super);
    function ViewScreenSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewScreenSystem.prototype.render = function () {
        return React.createElement("div", null);
    };
    return ViewScreenSystem;
}(React.Component));
var WarpSystem = (function (_super) {
    __extends(WarpSystem, _super);
    function WarpSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WarpSystem.prototype.render = function () {
        return React.createElement("div", null);
    };
    return WarpSystem;
}(React.Component));
var WeaponsSystem = (function (_super) {
    __extends(WeaponsSystem, _super);
    function WeaponsSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeaponsSystem.prototype.render = function () {
        return React.createElement("div", null);
    };
    return WeaponsSystem;
}(React.Component));
var GameClient = (function (_super) {
    __extends(GameClient, _super);
    function GameClient(props) {
        var _this = _super.call(this, props) || this;
        var settings = ClientSettings.load();
        _this.state = {
            vibration: FeatureDetection.Vibration ? 2 /* Enabled */ : 0 /* Unavailable */,
            settings: settings,
            visibleScreen: settings === undefined ? 2 /* Settings */ : 1 /* Connecting */,
            currentScreen: 1 /* Connecting */,
            gameActive: false,
            errorMessage: undefined,
            crewID: undefined,
            crewSize: 0,
            selectedSystems: 0,
            otherCrewsSystems: 0,
            selectSystemsDirectly: false,
        };
        return _this;
    }
    GameClient.prototype.updateDimensions = function () {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight });
    };
    GameClient.prototype.componentWillMount = function () {
        this.updateDimensions();
    };
    GameClient.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.updateDimensions.bind(this));
        if (FeatureDetection.CheckRequirements(this)) {
            this.server = new Connection(this, 'ws://' + location.host + '/ws');
        }
    };
    GameClient.prototype.getSystem = function (system) {
        if (this.gameRoot === undefined)
            return undefined;
        return this.gameRoot.getSystem(system);
    };
    GameClient.prototype.render = function () {
        return (React.createElement("div", { className: this.state.showHotkeys ? 'showKeys' : undefined }, this.renderVisibleScreen()));
    };
    GameClient.prototype.renderVisibleScreen = function () {
        var _this = this;
        var width = this.state.screenWidth === undefined ? 0 : this.state.screenWidth;
        var height = this.state.screenHeight === undefined ? 0 : this.state.screenHeight;
        switch (this.state.visibleScreen) {
            case 2 /* Settings */:
                var mode = void 0, name_1, canCancel = void 0;
                if (this.state.settings === undefined) {
                    mode = 0 /* ButtonsAndKeyboard */;
                    name_1 = '';
                    canCancel = false;
                }
                else {
                    mode = this.state.settings.inputMode;
                    name_1 = this.state.settings.userName;
                    canCancel = true;
                }
                return React.createElement(SettingsScreen, { width: width, height: height, inputMode: mode, userName: name_1, canCancel: canCancel, saved: this.changeSettings.bind(this), cancelled: this.showReturn.bind(this) });
            case 1 /* Connecting */:
                return React.createElement(ErrorScreen, { width: width, height: height, message: language.messages.connecting });
            case 3 /* RoleSelection */:
                var crewSize = this.state.crewSize === undefined ? 0 : this.state.crewSize;
                var otherSystems = this.state.otherCrewsSystems === undefined ? 0 : this.state.otherCrewsSystems;
                var gameActive = this.state.gameActive === undefined ? false : this.state.gameActive;
                var setupInUse = this.state.setupInUse === undefined ? false : this.state.setupInUse;
                var systemSelection = this.state.selectSystemsDirectly == undefined ? false : this.state.selectSystemsDirectly;
                return React.createElement(RoleSelection, { width: width, height: height, ref: function (ref) { _this.roleSelection = ref; }, crewSize: crewSize, otherCrewsSystems: otherSystems, settingsClicked: this.show.bind(this, 2 /* Settings */), forceShowSystems: systemSelection, gameActive: gameActive, setupInUse: setupInUse, setupClicked: this.show.bind(this, 4 /* GameSetup */) });
            case 4 /* GameSetup */:
                return React.createElement(GameSetup, { width: width, height: height, cancelled: this.showReturn.bind(this), started: this.startGame.bind(this) });
            case 5 /* Game */:
                var systems = this.state.selectedSystems === undefined ? 0 : this.state.selectedSystems;
                var inputMode = this.state.settings === undefined ? 0 /* ButtonsAndKeyboard */ : this.state.settings.inputMode;
                return React.createElement(GameActive, { width: width, height: height, selectedSystems: systems, inputMode: inputMode, ref: function (c) { return _this.gameRoot = c; } });
            default:
                return React.createElement(ErrorScreen, { width: width, height: height, message: this.state.errorMessage });
        }
    };
    GameClient.prototype.show = function (screen, setReturn) {
        if (setReturn === void 0) { setReturn = false; }
        var newState = {};
        if (setReturn)
            newState.currentScreen = screen;
        if (!setReturn || this.state.visibleScreen != 2 /* Settings */)
            newState.visibleScreen = screen; // don't force user out of the settings screen
        if (!this.state.gameActive && screen == 5 /* Game */)
            newState.gameActive = true;
        if (screen != 0 /* Error */)
            newState.errorMessage = undefined;
        this.setState(newState);
    };
    GameClient.prototype.showReturn = function () {
        if (this.state.currentScreen !== undefined)
            this.show(this.state.currentScreen);
    };
    GameClient.prototype.changeSettings = function (settings) {
        if (this.state.settings === undefined)
            this.server.send('name ' + settings.userName);
        this.setState({ settings: settings });
        this.showReturn();
    };
    GameClient.prototype.setPlayerID = function (id) {
        this.setState({ crewID: id });
    };
    GameClient.prototype.setCrewSize = function (count) {
        this.setState({ crewSize: count });
        if (this.roleSelection !== undefined)
            this.roleSelection.clearSelection();
    };
    GameClient.prototype.setSystemUsage = function (systemFlags) {
        this.setState({ selectedSystems: systemFlags });
    };
    GameClient.prototype.setCrewmateSystemUsage = function (systemFlags) {
        this.setState({ otherCrewsSystems: systemFlags });
    };
    GameClient.prototype.setGameActive = function (active) {
        this.setState({ gameActive: active });
        if (!active)
            return;
        if (this.state.selectedSystems == 0)
            this.showError(language.errors.gameStarted, false);
        else
            this.show(5 /* Game */, true);
    };
    GameClient.prototype.setDirectSystemSelection = function (value) {
        this.setState({ selectSystemsDirectly: value });
    };
    GameClient.prototype.setupScreenInUse = function (inUse) {
        this.setState({ setupInUse: inUse });
    };
    GameClient.prototype.componentDidUpdate = function (prevProps, prevState) {
        // block accidental unloading only when in the game screen
        if (prevState.visibleScreen == this.state.visibleScreen)
            return;
        if (this.state.currentScreen == 5 /* Game */)
            window.addEventListener('beforeunload', this.unloadEvent);
        else if (prevState.visibleScreen == 5 /* Game */)
            window.removeEventListener('beforeunload', this.unloadEvent);
    };
    GameClient.prototype.unloadEvent = function (e) {
        var confirmationMessage = language.messages.confirmLeave;
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
    };
    GameClient.prototype.showError = function (message, fatal) {
        if (fatal === void 0) { fatal = true; }
        var state = { visibleScreen: 0 /* Error */ };
        if (fatal) {
            this.server.close();
            state.errorMessage = message + '\n\n' + language.messages.refreshPage;
            state.currentScreen = 0 /* Error */;
        }
        else
            state.errorMessage = message;
        this.setState(state);
    };
    GameClient.prototype.startGame = function (settings) {
        // TODO: actually start game of specified type, using specified options
        this.server.send('startGame');
    };
    return GameClient;
}(React.Component));
;
var gameClient = ReactDOM.render(React.createElement(GameClient, null), document.getElementById('gameRoot'));
//# sourceMappingURL=makeitso.js.map