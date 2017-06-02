enum GameType {
    Local,
    Join,
    Host,
}

enum GameMode {
    Arena,
    Survival,
    Exploration,
}

type Difficulty = 1|2|3|4|5|6|7|8|9|10;

namespace GameMode {
    export function usesDifficulty(mode: GameMode) {
        switch (mode) {
            case GameMode.Survival:
            case GameMode.Exploration:
                return true;
            default:
                return false;
        }
    }
}

interface IGameSetupProps {
    saved?: (settings: IGameSetupState) => void;
    cancelled?: () => void;
}

interface IGameSetupState {
    shipName?: string;
    joinAddress?: string;
    serverName?: string;
    gameType?: GameType;
    gameMode?: GameMode;
    difficulty?: Difficulty;
}

class GameSetup extends React.Component<IGameSetupProps, IGameSetupState> {
    constructor(props: IGameSetupProps) {
        super(props);

        this.state = {
            shipName: this.getRandomName(),
            joinAddress: '',
            serverName: '',
        };
    }
    private getRandomName() {
        let randomNames = language.screens.setup.shipNames;
        let index = Math.floor(Math.random() * randomNames.length);
        return randomNames[index];
    }
    private randomizeName() {
        let name: string;
        do {
            name = this.getRandomName();
        } while (name == this.state.shipName);

        this.setState({ shipName: name });
    }
    render() {
        let words = language.screens.setup;
        let canStart = this.decideCanStart();

        return <div className="screen" id="setup">
            <form>
                <h1>{words.intro}</h1>
                {this.renderShipName()}
                {this.renderGameType()}
                {this.renderJoinGameOptions()}
                {this.renderGameMode()}
                {this.renderDifficulty()}
                {this.renderHostGameOptions()}
                <ButtonSet className="actions" separate={true}>
                    <ConfirmButton color={ButtonColor.Tertiary} disabled={!canStart} clicked={this.save.bind(this)} text={this.getContinueText()} />
                    <PushButton color={ButtonColor.Quaternary} clicked={this.cancel.bind(this)} text={language.common.cancel} />
                </ButtonSet>
            </form>
        </div>;
    }
    private renderShipName() {
        let words = language.screens.setup;

        return <div role="group">
            <label htmlFor="txtShipName">{words.shipName}</label>
            <div>
                <ButtonSet separate={true}>
                    <input id="txtShipName" className="value tertiary" type="text" value={this.state.shipName} onChange={this.shipNameChanged.bind(this)} />
                    <button className="push icon" type="button" onClick={this.randomizeName.bind(this)}>&#8634;</button>
                </ButtonSet>
                <div className="description">{words.shipNameDescription}</div>
            </div>
        </div>
    }
    private renderGameType() {
        let words = language.screens.setup;
        
        return <div role="group">
            <label>{words.gameType}</label>
            <Choice prompt={words.gameTypePrompt} color={ButtonColor.Primary}>
                <ToggleButton activated={this.setGameType.bind(this, GameType.Local)} description={words.gameTypeLocalDescription} text={words.gameTypeLocal} />
                <ToggleButton activated={this.setGameType.bind(this, GameType.Join)} description={words.gameTypeJoinDescription} text={words.gameTypeJoin} />
                <ToggleButton activated={this.setGameType.bind(this, GameType.Host)} description={words.gameTypeHostDescription} text={words.gameTypeHost} />
            </Choice>
        </div>
    }
    private renderJoinGameOptions() {
        if (this.state.gameType != GameType.Join)
            return undefined;

        let words = language.screens.setup;

        return <div role="group">
            <label htmlFor="txtJoinAddress">{words.joinAddress}</label>
            <div>
                <input id="txtJoinAddress" className="value tertiary" type="text" value={this.state.joinAddress} onChange={this.joinAddressChanged.bind(this)} />
                <div className="description">{words.joinAddressDescription}</div>
            </div>
        </div>
    }
    private renderGameMode() {
        if (this.state.gameType === undefined || this.state.gameType == GameType.Join)
            return undefined;

        let words = language.screens.setup;
        
        return <div role="group">
            <label>{words.gameMode}</label>
            <Choice prompt={words.gameModePrompt} color={ButtonColor.Secondary}>
                <ToggleButton activated={this.setGameMode.bind(this, GameMode.Exploration)} description={words.gameModeExplorationDescription} text={words.gameModeExploration} />
                <ToggleButton activated={this.setGameMode.bind(this, GameMode.Survival)} description={words.gameModeSurvivalDescription} text={words.gameModeSurvival} />
                <ToggleButton activated={this.setGameMode.bind(this, GameMode.Arena)} description={words.gameModeArenaDescription} text={words.gameModeArena} disabled={this.state.gameType == GameType.Local} />
            </Choice>
        </div>
    }
    private renderDifficulty() {
        if (this.state.gameType == GameType.Join || this.state.gameMode === undefined || !GameMode.usesDifficulty(this.state.gameMode))
            return undefined;

        let words = language.screens.setup;
        let levels = [];
        for (let i=1; i<=10; i++)
            levels.push(<ToggleButton key={i} activated={this.setDifficulty.bind(this, i)} text={i.toString()} />)
        
        return <div role="group">
            <label>{words.difficulty}</label>
            <Choice prompt={words.difficultyPrompt} color={ButtonColor.Tertiary}>
                {levels}
            </Choice>
        </div>
    }
    private renderHostGameOptions() {
        if (this.state.gameType != GameType.Host)
            return undefined;

        let words = language.screens.setup;

        return <div role="group">
            <label htmlFor="txtServerName">{words.serverName}</label>
            <div>
                <input id="txtServerName" className="value tertiary" type="text" value={this.state.serverName} onChange={this.serverNameChanged.bind(this)} />
                <div className="description">{words.serverNameDescription}</div>
            </div>
        </div>
    }
    private decideCanStart() {
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
    }
    private getContinueText() {
        return this.state.gameType == GameType.Join
            ? language.screens.setup.gameTypeJoin
            : language.screens.setup.start;
    }
    private setGameType(type: GameType) {
        this.setState({ gameType: type });
    }
    private setGameMode(mode: GameMode) {
        this.setState({ gameMode: mode });
    }
    private setDifficulty(level: Difficulty) {
        this.setState({ difficulty: level });
    }
    private shipNameChanged(event: any) {
        this.setState({ shipName: event.target.value });
    }
    private joinAddressChanged(event: any) {
        this.setState({ joinAddress: event.target.value });
    }
    private serverNameChanged(event: any) {
        this.setState({ serverName: event.target.value });
    }
    private save() {
        if (this.props.saved !== undefined)
            this.props.saved(this.state);
    }
    private cancel() {
        if (this.props.cancelled !== undefined)
            this.props.cancelled();
    }
}