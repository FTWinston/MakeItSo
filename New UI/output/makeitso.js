var language = {
    systemNames: ['Helm', 'Viewscreen', 'Comms', 'Sensors', 'Weapons', 'Shields', 'Damage Control', 'Power', 'Deflector'],
    errorConnectionLost: 'The connection to your ship has been lost.\nIf the game is still running, check your network connection.',
    errorShipFull: 'This ship is full: there is no room for you to join.',
    errorGameStarted: 'This game has already started: wait for the crew to pause or end the game, then try again.',
    errorUnrecognisedCommand: 'Unrecognised command from server: ',
    errorWrongSystem: 'Received command for system #@num@, which was not selected by this client: ',
    errorSystemDidntHandleMessage: '@system@ failed to handle "@cmd@" command from server, with data @data@',
    errorNoWebsockets: 'Your web browser doesn\'t support Web Sockets. Make It So uses these to communicate with the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.',
    errorNoCanvas: 'Your web browser doesn\'t support Canvas. Make It So uses this to draw various elements of the game.<br/>See <a href="http://caniuse.com/#feat=canvas,websockets">here</a> for a list of browsers that support Make It So\'s required features.',
    errorParameterNotNumeric: 'Parameter was not numeric',
    errorParameterNumber: 'Expected @num@ parameters',
    messageConnecting: 'Connecting...',
    messageWait: 'Please wait...',
    messageConfirmLeave: 'The game is still active.',
    messageGameEnded: 'The game has ended.',
    messageGameEndedUser: 'User @name@ ended the game.',
    messageRefreshPage: 'Refresh the page to continue.',
    menuGoBack: 'go back',
    all: 'all',
    none: 'none',
    systemListPrompt: 'Select systems to control:',
    systemListSetupGame: 'setup game',
    systemListResumeGame: 'resume game',
    systemListEndGame: 'end game',
    systemListInputMode: 'helm input mode:',
    userSettingsIntro: 'Set up how you will interact with the game, and enter your name.',
    inputModePrompt: 'Select how you wish to interact with the game. Ship systems will display differently depending on the input mode you select.',
    inputModeKeyboard: 'Keyboard',
    inputModeTouchscreen: 'Touchscreen',
    inputModeGamepad: 'Gamepad',
    inputModeDescriptionKeyboard: 'On-screen buttons with keyboard shortcuts',
    inputModeDescriptionTouchscreen: 'Use Multi-touch controls',
    inputModeDescriptionGamepad: 'Use an attached game controller',
    userNameDescription: 'Enter the name you wish to be referred to as by your crewmates',
    gameSetupIntro: 'This screen should let you set up your ship and start a new game, browse servers, etc',
    gameSetupServerType: 'Do you wish to play with just your own crew, or with others?',
    gameSetupServerTypeLocal: 'Play a solo-crew game',
    gameSetupServerTypeLocalDescription: 'Play against the computer, with no other human crews.',
    gameSetupServerTypeRemote: 'Join a multi-crew game',
    gameSetupServerTypeRemoteDescription: 'Join a game being hosted remotely.',
    gameSetupServerTypeHost: 'Host a multi-crew game',
    gameSetupServerTypeHostDescription: 'Host a game which other human crews can connect to.',
    gameSetupGameMode: 'Select the game mode you wish to play:',
    gameSetupGameModeExploration: 'Exploration',
    gameSetupGameModeExplorationDescription: 'Carry out missions, explore the galaxy, and boldly go where no one has gone before.',
    gameSetupGameModeEndurance: 'Endurance',
    gameSetupGameModeEnduranceDescription: 'Survive for as long as possible against endless waves of computer-controlled ships.',
    gameSetupGameModeArena: 'Arena',
    gameSetupGameModeArenaDescription: 'Human-crewed ships battle for supremacy in a single star system.',
    gameSetupStartGame: 'start game',
    systemContainerPause: 'pause',
    directionForward: 'forward',
    directionLeft: 'port',
    directionRight: 'starboard',
    directionBackward: 'aft',
    directionUp: 'dorsal',
    directionDown: 'ventral',
    viewscreenPan: 'Pan',
    viewscreenZoom: 'Zoom',
    viewscreenDirection: 'direction',
    viewscreenChaseMode: 'chase mode',
    viewscreenCommsChannel: 'comms channel',
    viewscreenTarget: 'target',
    helmRotation: 'rotation',
    helmRotateUp: 'up',
    helmRotateDown: 'down',
    helmRotateLeft: 'left',
    helmRotateRight: 'right',
    helmRotateStop: 'stop',
    helmSpeedForward: 'forward',
    helmSpeedBackward: 'backward',
    helmSpeedStop: 'stop',
    helmTranslation: 'translation',
    helmTranslateUp: 'up',
    helmTranslateDown: 'down',
    helmTranslateLeft: 'left',
    helmTranslateRight: 'right',
    helmWarpFactor: 'warp factor',
    helmWarpIncrease: 'increase',
    helmWarpDecrease: 'decrease',
    helmWarpStop: 'stop',
    helmForwardSpeedOutput: 'Forward speed:',
    helmSidewaysSpeedOutput: 'Lateral speed:',
    helmVerticalSpeedOutput: 'Vertical speed:',
    helmWarpFactorOutput: 'Warp factor:',
    helmPitchOutput: 'Pitch:',
    helmYawOutput: 'Yaw:',
    helmRollOutput: 'Roll:',
    shieldsToggleOn: 'Enable shields',
    shieldsToggleOff: 'Disable shields',
    shieldsEnabled: 'Shields are enabled',
    shieldsDisabled: 'Shields are disabled',
    shieldsRegenFocus: 'Regeneration focus:',
    shieldsCharge: 'Charge',
    powerLevels: 'System power levels:',
    powerAux: 'AUX power',
    powerCardSelect: 'Select a card to add to your library:',
    powerCardWait: 'Please wait for new cards to become available.',
    powerConfirmChoose: 'Add to library',
    powerConfirmUse: 'Activate card',
    powerCards: [
        { name: 'Card 1', desc: 'Does some stuff', rarity: 1, cost: 1 },
        { name: 'Card 2', desc: 'Does more stuff', rarity: 1, cost: 1 },
        { name: 'Card 3', desc: 'Does even more stuff', rarity: 2, cost: 1 },
        { name: 'Card 4', desc: 'Does some things', rarity: 1, cost: 2 },
        { name: 'Card 5', desc: 'Does more things', rarity: 2, cost: 2 },
        { name: 'Card 6', desc: 'Does even more things', rarity: 3, cost: 3 },
        { name: 'Card 7', desc: 'Doesn\'t do very much', rarity: 1, cost: 4 },
    ],
    powerSystems: ['Engines', 'Sensors', 'Weapons', 'Shields', 'Repairs', 'Deflector'],
    weaponRoll: 'Roll',
    weaponReroll: 'Re-roll',
    weaponDiscardRoll: 'Discard',
    weaponFire: 'Fire',
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
            game.showError(language.errorNoWebsockets);
            return false;
        }
        if (!this.Canvas) {
            game.showError(language.errorNoCanvas);
            return false;
        }
        return true;
    }
};
var Connection = (function () {
    function Connection(game, url) {
        this.game = game;
        this.socket = new WebSocket(url);
        this.socket.onerror = this.socket.onclose = function () { this.game.showError(language.errorConnectionLost, true); }.bind(this);
        this.socket.onmessage = this.messageReceived.bind(this);
        this.socket.onopen = this.connected.bind(this);
        this.close = this.socket.close.bind(this.socket);
        this.queue = [];
    }
    Connection.prototype.send = function (cmd) {
        if (this.socket.readyState == 1)
            this.socket.send(cmd);
        else
            this.queue.push(cmd);
    };
    Connection.prototype.connected = function () {
        // once connection is established, send any queued messages
        var cmd = this.queue.pop();
        while (cmd !== undefined) {
            this.socket.send(cmd);
            cmd = this.queue.pop();
        }
    };
    Connection.prototype.messageReceived = function (ev) {
        var data = (ev.data || '');
        var pos = data.indexOf(' ');
        var cmd = pos == -1 ? data : data.substr(0, pos);
        data = pos == -1 ? '' : data.substr(pos + 1);
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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        var classes = this.props.className;
        if (this.props.color !== undefined) {
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
        return (React.createElement("button", { className: classes, disabled: this.props.disabled || this.props.groupDisabled, onMouseDown: this.props.disabled ? undefined : this.props.mouseDown, onMouseUp: this.props.disabled ? undefined : this.props.mouseUp, onMouseLeave: this.props.disabled ? undefined : this.props.mouseLeave, onClick: this.props.disabled ? undefined : this.props.mouseClick, "data-hotkey": this.props.hotkey, type: this.props.buttonType }, this.props.children));
    };
    return Button;
}(React.Component));
Button.defaultProps = {
    buttonType: "button"
};
var PushButton = (function (_super) {
    __extends(PushButton, _super);
    function PushButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushButton.prototype.render = function () {
        var classList = 'push';
        return (React.createElement(Button, { className: classList, hotkey: this.props.hotkey, mouseClick: this.clicked.bind(this), color: this.props.color, disabled: this.props.disabled }, this.props.children));
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
        return (React.createElement(Button, { className: classList, hotkey: this.props.hotkey, mouseClick: this.clicked.bind(this), color: this.props.color, disabled: this.props.disabled, buttonType: "submit" }, this.props.children));
    };
    ConfirmButton.prototype.clicked = function (e) {
        if (this.state.primed) {
            if (this.autoCancel !== undefined) {
                clearTimeout(this.autoCancel);
                this.autoCancel = undefined;
            }
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
        return (React.createElement(Button, { className: classList, hotkey: this.props.hotkey, mouseClick: this.clicked.bind(this), color: this.props.color, disabled: this.props.disabled }, this.props.children));
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
        return (React.createElement(Button, { className: classList, hotkey: this.props.hotkey, mouseDown: this.mouseDown.bind(this), mouseUp: this.mouseUp.bind(this), color: this.props.color, disabled: this.props.disabled }, this.props.children));
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
                    color: _this.props.color,
                });
            return child;
        });
        return (React.createElement("div", { className: classes },
            this.props.prompt == null ? null : React.createElement("div", { className: "prompt" }, this.props.prompt),
            childrenWithProps));
    };
    return ButtonSet;
}(React.Component));
ButtonSet.defaultProps = {
    vertical: false,
    allowUnselected: true,
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
        return (React.createElement(ButtonSet, { className: classes, vertical: this.props.vertical, prompt: this.props.prompt, disabled: this.props.disabled, color: this.props.color, allowUnselected: this.props.allowUnselected, childActivated: this.childActivated.bind(this) },
            this.props.children,
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
        var cancelButton = this.props.canCancel ? React.createElement(PushButton, { color: 4 /* Quandry */, clicked: this.cancel.bind(this) }, "Cancel") : null;
        var canSave = this.state.inputMode !== undefined && this.state.userName != null && this.state.userName.trim().length > 0;
        return (React.createElement("div", { className: "screen", id: "settings" },
            React.createElement("form", null,
                React.createElement("h1", null, language.userSettingsIntro),
                React.createElement("div", { role: "group" },
                    React.createElement("label", null, "Input mode"),
                    React.createElement(Choice, { prompt: language.inputModePrompt, color: 0 /* Primary */ },
                        React.createElement(ToggleButton, { startActive: this.state.inputMode == 0 /* ButtonsAndKeyboard */, activated: this.setInputMode.bind(this, 0 /* ButtonsAndKeyboard */), description: language.inputModeDescriptionKeyboard }, language.inputModeKeyboard),
                        React.createElement(ToggleButton, { startActive: this.state.inputMode == 1 /* Touchscreen */, activated: this.setInputMode.bind(this, 1 /* Touchscreen */), description: language.inputModeDescriptionTouchscreen }, language.inputModeTouchscreen),
                        React.createElement(ToggleButton, { startActive: this.state.inputMode == 2 /* GamePad */, disabled: true, activated: this.setInputMode.bind(this, 2 /* GamePad */), description: language.inputModeDescriptionGamepad }, language.inputModeGamepad))),
                React.createElement("div", { role: "group" },
                    React.createElement("label", { htmlFor: "txtUserName" }, "User name"),
                    React.createElement("div", null,
                        React.createElement("input", { id: "txtUserName", className: "value secondary", type: "text", value: this.state.userName, onChange: this.nameChanged.bind(this), placeholder: "enter your name..." }),
                        React.createElement("div", { className: "description" }, language.userNameDescription))),
                React.createElement("div", { role: "group", className: "actions" },
                    React.createElement(ConfirmButton, { color: 2 /* Tertiary */, disabled: !canSave, clicked: this.save.bind(this) }, "Save"),
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
var WaitingScreen = (function (_super) {
    __extends(WaitingScreen, _super);
    function WaitingScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaitingScreen.prototype.render = function () {
        return (React.createElement("div", { className: "screen", id: "waiting" }, "Waiting for other users..."));
    };
    return WaitingScreen;
}(React.Component));
var GameClient = (function (_super) {
    __extends(GameClient, _super);
    function GameClient(props) {
        var _this = _super.call(this, props) || this;
        var settings = ClientSettings.load();
        _this.state = {
            vibration: FeatureDetection.Vibration ? 2 /* Enabled */ : 0 /* Unavailable */,
            settings: settings,
            activeScreen: settings === undefined ? 1 /* Settings */ : 2 /* WaitingForPlayers */,
            returnScreen: 2 /* WaitingForPlayers */,
            errorMessage: undefined,
        };
        return _this;
    }
    GameClient.prototype.componentDidMount = function () {
        if (FeatureDetection.CheckRequirements(this)) {
            //this.server = new Connection(this, 'ws://' + location.host + '/ws');
        }
    };
    GameClient.prototype.render = function () {
        return (React.createElement("div", { className: this.state.showHotkeys ? 'showKeys' : undefined }, this.renderActiveScreen()));
    };
    GameClient.prototype.renderActiveScreen = function () {
        switch (this.state.activeScreen) {
            case 1 /* Settings */:
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
            case 2 /* WaitingForPlayers */:
                return React.createElement(WaitingScreen, null);
            case 3 /* RoleSelection */:
            case 4 /* GameSetup */:
            case 5 /* Game */:
            default:
                return React.createElement(ErrorScreen, { message: this.state.errorMessage });
        }
    };
    GameClient.prototype.show = function (screen, setReturn) {
        if (setReturn === void 0) { setReturn = false; }
        var newState = { activeScreen: screen };
        if (setReturn || !this.state.gameActive && screen == 5 /* Game */)
            newState.returnScreen = screen;
        if (screen != 0 /* Error */)
            newState.errorMessage = undefined;
        this.setState(newState);
    };
    GameClient.prototype.showReturn = function () {
        if (this.state.returnScreen !== undefined)
            this.show(this.state.returnScreen);
    };
    GameClient.prototype.changeSettings = function (settings) {
        this.setState({ settings: settings });
        this.showReturn();
    };
    GameClient.prototype.componentDidUpdate = function (prevProps, prevState) {
        // block accidental unloading only when in the game screen
        if (prevState.activeScreen == this.state.activeScreen)
            return;
        if (this.state.activeScreen == 5 /* Game */)
            window.addEventListener('beforeunload', this.unloadEvent);
        else
            window.removeEventListener('beforeunload', this.unloadEvent);
    };
    GameClient.prototype.unloadEvent = function (e) {
        var confirmationMessage = language.messageConfirmLeave;
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
    };
    GameClient.prototype.showError = function (message, fatal) {
        if (fatal === void 0) { fatal = true; }
        var state = { activeScreen: 0 /* Error */ };
        if (fatal) {
            this.server.close();
            state.errorMessage = message + '\n\n' + language.messageRefreshPage;
            state.returnScreen = 0 /* Error */;
        }
        else
            state.errorMessage = message;
        this.setState(state);
    };
    return GameClient;
}(React.Component));
;
var gameClient = ReactDOM.render(React.createElement(GameClient, null), document.getElementById('gameRoot'));
//# sourceMappingURL=makeitso.js.map