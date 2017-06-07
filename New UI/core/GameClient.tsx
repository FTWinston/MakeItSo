interface IGameClientState {
    visibleScreen?: GameScreen;
    currentScreen?: GameScreen;
    gameActive?: boolean;
    errorMessage?: string;
    showHotkeys?: boolean;

    crewSize?: number;
    crewID?: string;
    selectedSystems?: ShipSystem;
    otherCrewsSystems?: ShipSystem;
    selectSystemsDirectly?: boolean;
    setupInUse?: boolean;

    settings?: ClientSettings;
    vibration?: FeatureState;

    screenWidth?: number;
    screenHeight?: number;
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
            gameActive: false,
            errorMessage: undefined,
            crewID: undefined,
            crewSize: 0,
            selectedSystems: 0,
            otherCrewsSystems: 0,
            selectSystemsDirectly: false,
        };
    }
    
    private updateDimensions() {
        this.setState({screenWidth: window.innerWidth, screenHeight: window.innerHeight});
    }
    private componentWillMount() {
        this.updateDimensions();
    }
    private componentDidMount () {
        window.addEventListener('resize', this.updateDimensions.bind(this));

        if (FeatureDetection.CheckRequirements(this)) {
            this.server = new Connection(this, 'ws://' + location.host + '/ws');
        }
    }

    server: Connection;
    roleSelection?: RoleSelection;
    render() {
        return (
            <div className={this.state.showHotkeys ? 'showKeys' : undefined}>
                {this.renderVisibleScreen()}
            </div>
        );
    }
    private renderVisibleScreen() {
        let width = this.state.screenWidth === undefined ? 0 : this.state.screenWidth;
        let height = this.state.screenHeight === undefined ? 0 : this.state.screenHeight;

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
                return <SettingsScreen width={width} height={height} inputMode={mode} userName={name} canCancel={canCancel} saved={this.changeSettings.bind(this)} cancelled={this.showReturn.bind(this)} />;

            case GameScreen.Connecting:
                return <ErrorScreen width={width} height={height} message={language.messages.connecting} />;

            case GameScreen.RoleSelection:
                let crewSize = this.state.crewSize === undefined ? 0 : this.state.crewSize;
                let otherSystems = this.state.otherCrewsSystems === undefined ? 0 : this.state.otherCrewsSystems;
                let gameActive = this.state.gameActive === undefined ? false : this.state.gameActive;
                let setupInUse = this.state.setupInUse === undefined ? false : this.state.setupInUse;
                let systemSelection = this.state.selectSystemsDirectly == undefined ? false : this.state.selectSystemsDirectly;
                return <RoleSelection width={width} height={height} ref={ref => {this.roleSelection = ref;}} crewSize={crewSize} otherCrewsSystems={otherSystems} settingsClicked={this.show.bind(this, GameScreen.Settings)}
                        forceShowSystems={systemSelection} gameActive={gameActive} setupInUse={setupInUse} setupClicked={this.show.bind(this, GameScreen.GameSetup)} />;
                
            case GameScreen.GameSetup:
                return <GameSetup width={width} height={height} cancelled={this.showReturn.bind(this)} started={this.startGame.bind(this)} />

            case GameScreen.Game:
                let systems = this.state.selectedSystems === undefined ? 0 : this.state.selectedSystems;
                let inputMode = this.state.settings === undefined ? InputMode.ButtonsAndKeyboard : this.state.settings.inputMode;
                return <GameActive width={width} height={height} selectedSystems={systems} inputMode={inputMode} />;

            default:
                return <ErrorScreen width={width} height={height} message={this.state.errorMessage} />;
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

        if (this.roleSelection !== undefined)
            this.roleSelection.clearSelection();
    }
    setSystemUsage(systemFlags: ShipSystem) {
        this.setState({selectedSystems: systemFlags});
    }
    setCrewmateSystemUsage(systemFlags: ShipSystem) {
        this.setState({otherCrewsSystems: systemFlags});
    }
    setGameActive(active: boolean) {
        this.setState({gameActive: active});
        if (!active)
            return;

        if (this.state.selectedSystems == 0)
            this.showError(language.errors.gameStarted, false);
        else
            this.show(GameScreen.Game, true);
    }
    setDirectSystemSelection(value: boolean) {
        this.setState({selectSystemsDirectly: value});
    }
    setupScreenInUse(inUse: boolean) {
        this.setState({setupInUse: inUse});
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
    private startGame(settings: IGameSetupState) {
        // TODO: actually start game of specified type, using specified options
        this.server.send('startGame');
    }
};

interface IScreenProps {
    width: number;
    height: number;
}

let gameClient = ReactDOM.render(
    <GameClient />,
    document.getElementById('gameRoot') as Element
) as GameClient;