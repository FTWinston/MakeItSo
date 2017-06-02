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
            affectsAllCrew: 'This affects all crew members',
        },
        setup: {
            intro: 'Create or join a game',
            gameType: 'Game type',
            gameTypePrompt: 'Do you wish to play with just your own crew, or with others?',
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
            this.game.setSystemUsage(systemFlags);
        }
        else if (cmd == 'setup+') {
            this.game.setupScreenInUse(false);
        }
        else if (cmd == 'setup-') {
            this.game.setupScreenInUse(true);
        }
        else if (cmd == 'started') {
            this.game.setGameActive(true);
            this.game.showError(language.errors.gameStarted, false);
        }
        else if (cmd == 'paused') {
            this.game.setGameActive(true);
            this.game.show(3 /* RoleSelection */);
        }
        else if (cmd == 'game+') {
            this.game.show(5 /* Game */);
        }
        else if (cmd == 'game-') {
            this.game.setGameActive(false);
            var blame = data != null ? language.messages.gameEndedUser.replace('@name@', data) : language.messages.gameEnded;
            this.game.showError(blame + ' ' + language.messages.wait, false);
            setTimeout(function () { this.game.setActiveScreen('systems'); }.bind(this), 3000);
        }
        else if (cmd == 'pause+') {
            this.game.show(3 /* RoleSelection */);
            //this.game.clearAllData();
        }
        else if (cmd == 'pause-') {
            this.game.show(5 /* Game */);
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
            : React.createElement(PushButton, { className: "icon", text: "X", clicked: this.props.closed, hotkey: "esc" });
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
            React.createElement("button", { className: "icon push", type: "button", title: language.common.help, onClick: this.showHelp.bind(this, true) }, "?"),
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
        var description, descStyle;
        if (this.state.activeChild !== undefined && this.state.activeChild.props.description !== undefined) {
            description = this.state.activeChild.props.description;
            descStyle = undefined;
        }
        else {
            description = '.';
            descStyle = { 'visibility': 'hidden' };
        }
        return (React.createElement("div", { className: classes },
            this.props.prompt == null ? null : React.createElement("div", { className: "prompt" }, this.props.prompt),
            React.createElement(ButtonSet, { vertical: this.props.vertical, separate: this.props.separate, disabled: this.props.disabled, color: this.props.color, allowUnselected: this.props.allowUnselected, childActivated: this.childActivated.bind(this) }, this.props.children),
            React.createElement("div", { className: "description", style: descStyle }, description)));
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
        return (React.createElement("div", { className: "screen", id: "settings" },
            React.createElement("form", null,
                React.createElement("h1", null, words.intro),
                React.createElement("div", { role: "group" },
                    React.createElement("label", null, words.inputMode),
                    React.createElement(Choice, { prompt: words.inputModePrompt, color: 0 /* Primary */ },
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
                React.createElement(PushButton, { color: 4 /* Quandry */, clicked: this.settingsClicked.bind(this), text: "\u2699", className: "icon", title: language.common.settings }))));
    };
    RoleSelection.prototype.renderSelectionTypeSwitch = function () {
        if (this.props.crewSize >= ShipSystem.count)
            return undefined;
        var words = language.screens.roleSelection;
        if (this.props.forceShowSystems)
            return React.createElement(ConfirmButton, { color: 2 /* Tertiary */, command: "-selectsys", text: words.showRoles, subtext: words.affectsAllCrew });
        else
            return React.createElement(ConfirmButton, { color: 1 /* Secondary */, command: "+selectsys", text: words.showSystems, subtext: words.affectsAllCrew });
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
var GameType;
(function (GameType) {
    GameType[GameType["Local"] = 0] = "Local";
    GameType[GameType["Join"] = 1] = "Join";
    GameType[GameType["Host"] = 2] = "Host";
})(GameType || (GameType = {}));
var GameMode;
(function (GameMode) {
    GameMode[GameMode["Arena"] = 0] = "Arena";
    GameMode[GameMode["Survival"] = 1] = "Survival";
    GameMode[GameMode["Exploration"] = 2] = "Exploration";
})(GameMode || (GameMode = {}));
(function (GameMode) {
    function usesDifficulty(mode) {
        switch (mode) {
            case GameMode.Survival:
            case GameMode.Exploration:
                return true;
            default:
                return false;
        }
    }
    GameMode.usesDifficulty = usesDifficulty;
})(GameMode || (GameMode = {}));
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
                    React.createElement(ConfirmButton, { color: 2 /* Tertiary */, disabled: !canStart, clicked: this.save.bind(this), text: this.getContinueText() }),
                    React.createElement(PushButton, { color: 3 /* Quaternary */, clicked: this.cancel.bind(this), text: language.common.cancel }))));
    };
    GameSetup.prototype.renderShipName = function () {
        var words = language.screens.setup;
        return React.createElement("div", { role: "group" },
            React.createElement("label", { htmlFor: "txtShipName" }, words.shipName),
            React.createElement("div", null,
                React.createElement(ButtonSet, { separate: true },
                    React.createElement("input", { id: "txtShipName", className: "value tertiary", type: "text", value: this.state.shipName, onChange: this.shipNameChanged.bind(this) }),
                    React.createElement("button", { className: "push icon", type: "button", onClick: this.randomizeName.bind(this) }, "\u21BA")),
                React.createElement("div", { className: "description" }, words.shipNameDescription)));
    };
    GameSetup.prototype.renderGameType = function () {
        var words = language.screens.setup;
        return React.createElement("div", { role: "group" },
            React.createElement("label", null, words.gameType),
            React.createElement(Choice, { prompt: words.gameTypePrompt, color: 0 /* Primary */ },
                React.createElement(ToggleButton, { activated: this.setGameType.bind(this, GameType.Local), description: words.gameTypeLocalDescription, text: words.gameTypeLocal }),
                React.createElement(ToggleButton, { activated: this.setGameType.bind(this, GameType.Join), description: words.gameTypeJoinDescription, text: words.gameTypeJoin }),
                React.createElement(ToggleButton, { activated: this.setGameType.bind(this, GameType.Host), description: words.gameTypeHostDescription, text: words.gameTypeHost })));
    };
    GameSetup.prototype.renderJoinGameOptions = function () {
        if (this.state.gameType != GameType.Join)
            return undefined;
        var words = language.screens.setup;
        return React.createElement("div", { role: "group" },
            React.createElement("label", { htmlFor: "txtJoinAddress" }, words.joinAddress),
            React.createElement("div", null,
                React.createElement("input", { id: "txtJoinAddress", className: "value tertiary", type: "text", value: this.state.joinAddress, onChange: this.joinAddressChanged.bind(this) }),
                React.createElement("div", { className: "description" }, words.joinAddressDescription)));
    };
    GameSetup.prototype.renderGameMode = function () {
        if (this.state.gameType === undefined || this.state.gameType == GameType.Join)
            return undefined;
        var words = language.screens.setup;
        return React.createElement("div", { role: "group" },
            React.createElement("label", null, words.gameMode),
            React.createElement(Choice, { prompt: words.gameModePrompt, color: 1 /* Secondary */ },
                React.createElement(ToggleButton, { activated: this.setGameMode.bind(this, GameMode.Exploration), description: words.gameModeExplorationDescription, text: words.gameModeExploration }),
                React.createElement(ToggleButton, { activated: this.setGameMode.bind(this, GameMode.Survival), description: words.gameModeSurvivalDescription, text: words.gameModeSurvival }),
                React.createElement(ToggleButton, { activated: this.setGameMode.bind(this, GameMode.Arena), description: words.gameModeArenaDescription, text: words.gameModeArena, disabled: this.state.gameType == GameType.Local })));
    };
    GameSetup.prototype.renderDifficulty = function () {
        if (this.state.gameType == GameType.Join || this.state.gameMode === undefined || !GameMode.usesDifficulty(this.state.gameMode))
            return undefined;
        var words = language.screens.setup;
        var levels = [];
        for (var i = 1; i <= 10; i++)
            levels.push(React.createElement(ToggleButton, { key: i, activated: this.setDifficulty.bind(this, i), text: i.toString() }));
        return React.createElement("div", { role: "group" },
            React.createElement("label", null, words.difficulty),
            React.createElement(Choice, { prompt: words.difficultyPrompt, color: 2 /* Tertiary */ }, levels));
    };
    GameSetup.prototype.renderHostGameOptions = function () {
        if (this.state.gameType != GameType.Host)
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
        if (this.state.gameType == GameType.Join) {
            if (this.state.joinAddress === undefined || this.state.joinAddress.trim().length == 0)
                return false;
        }
        if (this.state.gameType == GameType.Local || this.state.gameType == GameType.Host) {
            if (this.state.gameMode === undefined)
                return false;
            if (GameMode.usesDifficulty(this.state.gameMode) && this.state.difficulty === undefined)
                return false;
        }
        if (this.state.gameType == GameType.Host) {
            if (this.state.serverName === undefined || this.state.serverName.trim().length == 0)
                return false;
        }
        return true;
    };
    GameSetup.prototype.getContinueText = function () {
        return this.state.gameType == GameType.Join
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
    GameSetup.prototype.save = function () {
        if (this.props.saved !== undefined)
            this.props.saved(this.state);
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameActive.prototype.render = function () {
        return React.createElement("div", { className: "game" });
    };
    return GameActive;
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
            otherCrewsSystems: 0,
            selectSystemsDirectly: false,
        };
        return _this;
    }
    GameClient.prototype.componentDidMount = function () {
        if (FeatureDetection.CheckRequirements(this)) {
            this.server = new Connection(this, 'ws://' + location.host + '/ws');
        }
    };
    GameClient.prototype.render = function () {
        return (React.createElement("div", { className: this.state.showHotkeys ? 'showKeys' : undefined }, this.renderVisibleScreen()));
    };
    GameClient.prototype.renderVisibleScreen = function () {
        var _this = this;
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
                return React.createElement(SettingsScreen, { inputMode: mode, userName: name_1, canCancel: canCancel, saved: this.changeSettings.bind(this), cancelled: this.showReturn.bind(this) });
            case 1 /* Connecting */:
                return React.createElement(ErrorScreen, { message: language.messages.connecting });
            case 3 /* RoleSelection */:
                var crewSize = this.state.crewSize === undefined ? 0 : this.state.crewSize;
                var otherSystems = this.state.otherCrewsSystems === undefined ? 0 : this.state.otherCrewsSystems;
                var gameActive = this.state.gameActive === undefined ? false : this.state.gameActive;
                var setupInUse = this.state.setupInUse === undefined ? false : this.state.setupInUse;
                var systemSelection = this.state.selectSystemsDirectly == undefined ? false : this.state.selectSystemsDirectly;
                return React.createElement(RoleSelection, { ref: function (ref) { _this.roleSelection = ref; }, crewSize: crewSize, otherCrewsSystems: otherSystems, settingsClicked: this.show.bind(this, 2 /* Settings */), forceShowSystems: systemSelection, gameActive: gameActive, setupInUse: setupInUse, setupClicked: this.show.bind(this, 4 /* GameSetup */) });
            case 4 /* GameSetup */:
                return React.createElement(GameSetup, { cancelled: this.showReturn.bind(this), saved: this.startGame.bind(this) });
            case 5 /* Game */:
                return React.createElement(GameActive, null);
            default:
                return React.createElement(ErrorScreen, { message: this.state.errorMessage });
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
        if (this.roleSelection !== null)
            this.roleSelection.clearSelection();
    };
    GameClient.prototype.setSystemUsage = function (systemFlags) {
        this.setState({ otherCrewsSystems: systemFlags });
    };
    GameClient.prototype.setGameActive = function (active) {
        this.setState({ gameActive: active });
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
        // TODO: actually start game
    };
    return GameClient;
}(React.Component));
;
var gameClient = ReactDOM.render(React.createElement(GameClient, null), document.getElementById('gameRoot'));
//# sourceMappingURL=makeitso.js.map