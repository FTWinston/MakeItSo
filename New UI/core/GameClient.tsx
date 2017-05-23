interface IGameClientState {
    activeScreen?: GameScreen;
    returnScreen?: GameScreen;
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
            vibration: FeatureDetection.Vibration ? FeatureState.Enabled : FeatureState.Unavailable,
            settings: settings,
            activeScreen: settings === undefined ? GameScreen.Settings : GameScreen.WaitingForPlayers,
            returnScreen: GameScreen.WaitingForPlayers,
            errorMessage: undefined,
        };
    }
    private componentDidMount () {
        if (FeatureDetection.CheckRequirements(this)) {
            //this.server = new Connection(this, 'ws://' + location.host + '/ws');
        }
    }
    server: Connection;
    render() {
        return (
            <div className={this.state.showHotkeys ? 'showKeys' : undefined}>
                {this.renderActiveScreen()}
            </div>
        );
    }
    private renderActiveScreen() {
        switch(this.state.activeScreen) {
            case GameScreen.Settings:
                let mode, name, canCancel;
                if (this.state.settings === undefined) {
                    mode = InputMode.ButtonsAndKeyboard;
                    name = '';
                    canCancel = false;
                }
                else {
                    mode = this.state.settings.inputMode;
                    name = this.state.settings.userName;
                    canCancel = true;
                }
                return <SettingsScreen inputMode={mode} userName={name} canCancel={canCancel} saved={this.changeSettings.bind(this)} cancelled={this.showReturn.bind(this)} />;
            case GameScreen.WaitingForPlayers:
                return <WaitingScreen settingsClicked={this.show.bind(this, GameScreen.Settings)} />;
            case GameScreen.RoleSelection:
            case GameScreen.GameSetup:
            case GameScreen.Game:
            default:
                return <ErrorScreen message={this.state.errorMessage} />;
        }
    }
    show(screen: GameScreen, setReturn: boolean = false) {
        let newState: IGameClientState = {activeScreen: screen};
        if (setReturn)
            newState.returnScreen = screen;
            
        if (!this.state.gameActive && screen == GameScreen.Game)
            newState.gameActive = true;
        
        if (screen != GameScreen.Error)
            newState.errorMessage = undefined;
        
        this.setState(newState);
    }
    showReturn() {
        if (this.state.returnScreen !== undefined)
            this.show(this.state.returnScreen);
    }
    private changeSettings(settings: ClientSettings) {
        this.setState({settings: settings});
        this.showReturn();
    }
    private componentDidUpdate(prevProps: any, prevState: IGameClientState) {
        // block accidental unloading only when in the game screen
        if (prevState.activeScreen == this.state.activeScreen)
            return;

        if (this.state.activeScreen == GameScreen.Game)
            window.addEventListener('beforeunload', this.unloadEvent);
        else
            window.removeEventListener('beforeunload', this.unloadEvent);
    }
    private unloadEvent(e: BeforeUnloadEvent) {
        let confirmationMessage = language.messages.confirmLeave;

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
    }
    showError(message: string, fatal: boolean = true) {
        let state: IGameClientState = { activeScreen: GameScreen.Error };
        if (fatal) {
            this.server.close();
            state.errorMessage = message + '\n\n' + language.messages.refreshPage;
            state.returnScreen = GameScreen.Error;
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