const enum InputMode {
    ButtonsAndKeyboard,
    TouchscreenOnly,
    GamePad,
}

interface IGameClientState {
    activeScreen?: GameScreen;
    gameActive?: boolean;
    errorMessage?: string;
    showHotkeys?: boolean;

    inputMode?: InputMode;
    vibration?: FeatureState;
}

const enum GameScreen {
    Error,
    Settings,
    WaitingForPlayers,
    RoleSelection,
    GameSetup,
    Game,
}

class GameClient extends React.Component<{}, IGameClientState> {
    constructor(props) {
        super(props);

        this.state = {
            gameActive: false,
            vibration: FeatureDetection.Vibration ? FeatureState.Enabled : FeatureState.Unavailable,
            inputMode: InputMode.ButtonsAndKeyboard,
            errorMessage: null,
        };
    }
    componentDidMount () {
        if (FeatureDetection.CheckRequirements(this)) {
            this.server = new Connection(this, 'ws://' + location.host + '/ws');
        }
    }
    server: Connection;
    render() {
        let activeScreen: any;
        switch(this.state.activeScreen) {
            case GameScreen.Settings:
            case GameScreen.WaitingForPlayers:
            case GameScreen.RoleSelection:
            case GameScreen.GameSetup:
            case GameScreen.Game:
            default:
                activeScreen = <ErrorDisplay message={this.state.errorMessage} />
        }        

        return (
            <div className={this.state.showHotkeys ? 'showKeys' : null}>
                {activeScreen}
            </div>
        );
    }
    show(screen: GameScreen) {
        let newState: IGameClientState = {activeScreen: screen};
        if (!this.state.gameActive && screen == GameScreen.Game)
            newState.gameActive = true;
        
        if (screen != GameScreen.Error)
            newState.errorMessage = null;
        
        this.setState(newState);
    }
    componentDidUpdate(prevProps, prevState: IGameClientState) {
        // block accidental unloading only when in the game screen
        if (prevState.activeScreen == this.state.activeScreen)
            return;

        if (this.state.activeScreen == GameScreen.Game)
            window.addEventListener('beforeunload', this.unloadEvent);
        else
            window.removeEventListener('beforeunload', this.unloadEvent);
    }
    unloadEvent(e) {    
        let confirmationMessage = language.messageConfirmLeave;

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
    }
    showError(message: string, fatal = true) {
        let state: IGameClientState = { activeScreen: GameScreen.Error };
        if (fatal) {
            this.server.close();
            state.errorMessage = message + '\n\n' + language.messageRefreshPage;
            state.gameActive = false;
        }
        else
            state.errorMessage = message;
        
        this.setState(state);
    }
};

let gameClient = ReactDOM.render(
    <GameClient />,
    document.getElementById('gameRoot')
) as GameClient;