interface ISystemInfo {
    name: string;
    index: number;
    selected: boolean;
    usedByOther: boolean;
    receiveMessage?: MessageFunc;
}

const enum InputMode {
    ButtonsWithKeyboardShortcuts,
    TouchscreenOnly,
    TouchscreenAndAccelerometer,
    GamePad,
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
    inputMode?: InputMode;
}

class GameClient extends React.Component<{}, IGameClientState> {
    constructor(props) {
        super(props);

        this.state = {
            activeScreen: 'error', errorMessage: language.messageConnecting, gameActive: false, setupInProgress: false, showHotkeys: false, playerID: null,
            systems: language.systemNames.map(function(name, index) {
                return {name: name, index: index, selected: sessionStorage.getItem('selectedSystem' + index) == '1', usedByOther: false};
            }),
            vibration: FeatureDetection.Vibration ? FeatureState.Enabled : FeatureState.Unavailable,
            inputMode: this.determineDefaultInputMode(),
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
                <SystemSelect show={this.state.activeScreen == 'systems'} gameActive={this.state.gameActive} setupInProgress={this.state.setupInProgress} playerID={this.state.playerID} systems={this.state.systems} selectionChanged={this.systemSelectionChanged.bind(this)} inputMode={this.state.inputMode} inputModeChanged={this.inputModeChanged.bind(this)} />
                <GameSetup show={this.state.activeScreen == 'setup'} />
                <SystemContainer ref="game" show={this.state.activeScreen == 'game'} registerSystem={this.registerSystem.bind(this)} systems={this.state.systems} inputMode={this.state.inputMode} />
                <ErrorDisplay show={this.state.activeScreen == 'error'} message={this.state.errorMessage} />
            </div>
        );
    }
    determineDefaultInputMode() {
        let strMode = localStorage.getItem('inputMode');
        if (strMode != null)
            return parseInt(strMode);

        if (FeatureDetection.Touch)
            return InputMode.TouchscreenOnly;
        return InputMode.ButtonsWithKeyboardShortcuts;
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
        sessionStorage.setItem('selectedSystem' + id, state ? '1' : '0');
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
            let game = this.refs['game'] as SystemContainer;

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
        var confirmationMessage = language.messageConfirmLeave;

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
    }
    showError(message: string, fatal = true) {
        var state;
        if (fatal) {
            this.server.close();
            state = {errorMessage: message + '\n\n' + language.messageRefreshPage, gameActive: false};
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
    inputModeChanged(val) {
        this.setState({inputMode: val});
        localStorage.setItem('inputMode', val.toString())
        console.log('input mode changed to ' + val);
    }
    showHotkeys(val) {
        this.setState({showHotkeys: val});
    }
};

let gameClient = ReactDOM.render(
    <GameClient />,
    document.getElementById('gameRoot')
) as GameClient;