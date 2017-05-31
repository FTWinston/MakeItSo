interface IGameClientState {
    visibleScreen?: GameScreen;
    currentScreen?: GameScreen;
    gameActive?: boolean;
    errorMessage?: string;
    showHotkeys?: boolean;

    crewSize?: number;
    crewID?: string;
    otherCrewsSystems?: ShipSystem;

    settings?: ClientSettings;
    vibration?: FeatureState;
}

const enum GameScreen {
    Error,
    Connecting,
    Settings,
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
            visibleScreen: settings === undefined ? GameScreen.Settings : GameScreen.Connecting,
            currentScreen: GameScreen.Connecting,
            errorMessage: undefined,
            crewID: undefined,
            crewSize: 0,
            otherCrewsSystems: 0,
        };
    }
    private componentDidMount () {
        if (FeatureDetection.CheckRequirements(this)) {
            this.server = new Connection(this, 'ws://' + location.host + '/ws');
        }
    }
    server: Connection;
    render() {
        return (
            <div className={this.state.showHotkeys ? 'showKeys' : undefined}>
                {this.renderVisibleScreen()}
            </div>
        );
    }
    private renderVisibleScreen() {
        switch(this.state.visibleScreen) {
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
            case GameScreen.Connecting:
                return <ErrorScreen message={language.messages.connecting} />;
            case GameScreen.RoleSelection:
                let crewSize = this.state.crewSize === undefined ? 0 : this.state.crewSize;
                let otherSystems = this.state.otherCrewsSystems === undefined ? 0 : this.state.otherCrewsSystems;
                return <RoleSelection crewSize={crewSize} otherCrewsSystems={otherSystems} settingsClicked={this.show.bind(this, GameScreen.Settings)} />;
            case GameScreen.GameSetup:
            case GameScreen.Game:
            default:
                return <ErrorScreen message={this.state.errorMessage} />;
        }
    }
    show(screen: GameScreen, setReturn: boolean = false) {
        let newState: IGameClientState = {};
        if (setReturn)
            newState.currentScreen = screen;

        if (!setReturn || this.state.visibleScreen != GameScreen.Settings)
            newState.visibleScreen = screen; // don't force user out of the settings screen

        if (!this.state.gameActive && screen == GameScreen.Game)
            newState.gameActive = true;
        
        if (screen != GameScreen.Error)
            newState.errorMessage = undefined;
        
        this.setState(newState);
    }
    showReturn() {
        if (this.state.currentScreen !== undefined)
            this.show(this.state.currentScreen);
    }
    private changeSettings(settings: ClientSettings) {
        if (this.state.settings === undefined)
            this.server.send('name ' + settings.userName);

        this.setState({settings: settings});
        this.showReturn();
    }
    setPlayerID(id: string) {
        this.setState({crewID: id});
    }
    setCrewSize(count: number) {
        this.setState({crewSize: count});
    }
    setSystemUsage(systemFlags: ShipSystem) {
        this.setState({otherCrewsSystems: systemFlags});
    }
    private componentDidUpdate(prevProps: any, prevState: IGameClientState) {
        // block accidental unloading only when in the game screen
        if (prevState.visibleScreen == this.state.visibleScreen)
            return;

        if (this.state.currentScreen == GameScreen.Game)
            window.addEventListener('beforeunload', this.unloadEvent);
        else if (prevState.visibleScreen == GameScreen.Game)
            window.removeEventListener('beforeunload', this.unloadEvent);
    }
    private unloadEvent(e: BeforeUnloadEvent) {
        let confirmationMessage = language.messages.confirmLeave;

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
    }
    showError(message: string, fatal: boolean = true) {
        let state: IGameClientState = { visibleScreen: GameScreen.Error };
        if (fatal) {
            this.server.close();
            state.errorMessage = message + '\n\n' + language.messages.refreshPage;
            state.currentScreen = GameScreen.Error;
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