interface IGameClientState {
    activeScreen?: GameScreen;
    gameActive?: boolean;
    errorMessage?: string;
    showHotkeys?: boolean;

    settings?: ClientSettings;
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
    constructor(props: any) {
        super(props);

        let settings = ClientSettings.load();

        this.state = {
            gameActive: false,
            vibration: FeatureDetection.Vibration ? FeatureState.Enabled : FeatureState.Unavailable,
            settings: settings,
            activeScreen: settings === undefined ? GameScreen.Settings : GameScreen.WaitingForPlayers,
            errorMessage: undefined,
        };
    }
    componentDidMount () {
        if (FeatureDetection.CheckRequirements(this)) {
            //this.server = new Connection(this, 'ws://' + location.host + '/ws');
        }
    }
    server: Connection;
    render() {
        let activeScreen: any;
        switch(this.state.activeScreen) {
            case GameScreen.Settings:
                let mode, name;
                if (this.state.settings === undefined) {
                    mode = InputMode.ButtonsAndKeyboard;
                    name = '';
                }
                else {
                    mode = this.state.settings.inputMode
                    name = this.state.settings.userName
                }
                activeScreen = <SettingsScreen inputMode={mode} userName={name} />; break;
            case GameScreen.WaitingForPlayers:
                activeScreen = <WaitingScreen />; break;
            case GameScreen.RoleSelection:
            case GameScreen.GameSetup:
            case GameScreen.Game:
            default:
                activeScreen = <ErrorScreen message={this.state.errorMessage} />; break;
        }        

        return (
            <div className={this.state.showHotkeys ? 'showKeys' : undefined}>
                {activeScreen}
            </div>
        );
    }
    show(screen: GameScreen) {
        let newState: IGameClientState = {activeScreen: screen};
        if (!this.state.gameActive && screen == GameScreen.Game)
            newState.gameActive = true;
        
        if (screen != GameScreen.Error)
            newState.errorMessage = undefined;
        
        this.setState(newState);
    }
    componentDidUpdate(prevProps: any, prevState: IGameClientState) {
        // block accidental unloading only when in the game screen
        if (prevState.activeScreen == this.state.activeScreen)
            return;

        if (this.state.activeScreen == GameScreen.Game)
            window.addEventListener('beforeunload', this.unloadEvent);
        else
            window.removeEventListener('beforeunload', this.unloadEvent);
    }
    unloadEvent(e: BeforeUnloadEvent) {    
        let confirmationMessage = language.messageConfirmLeave;

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
    }
    showError(message: string, fatal: boolean = true) {
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
    document.getElementById('gameRoot') as Element
) as GameClient;