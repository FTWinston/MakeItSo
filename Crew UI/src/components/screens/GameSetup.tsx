import * as React from 'react';
import { connect } from 'react-redux';
import { connection } from '~/index';
import { ApplicationState } from '~/store';
import * as ScreenStore from '~/store/Screen';
import { TextLocalisation } from '~/functionality';
import { ToggleButton, PushButton, ConfirmButton, Icon, ButtonColor, Screen, Field, Choice, Textbox } from '~/components/general';

const enum GameType {
    Local,
    Join,
    Host,
}

const enum GameMode {
    Arena,
    Survival,
    Exploration,
}

type Difficulty = 1|2|3|4|5|6|7|8|9|10;

interface IGameSetupDataProps {
    text: TextLocalisation;
    screenWidth: number;
    screenHeight: number;
}

type GameSetupProps =
    IGameSetupDataProps
    & typeof ScreenStore.actionCreators;

interface IGameSetupState {
    shipName?: string;
    joinAddress?: string;
    serverName?: string;
    gameType?: GameType;
    gameMode?: GameMode;
    difficulty?: Difficulty;
}

class GameSetup extends React.Component<GameSetupProps, IGameSetupState> {
    constructor(props: GameSetupProps) {
        super(props);

        // TODO: load these from localStorage
        this.state = {
            shipName: this.getRandomName(),
            joinAddress: '',
            serverName: '',
        };
    }

    public render() {
        let words = this.props.text.screens.gameSetup;
        let choicesVertical = this.props.screenWidth < 300;

        let joinAddress: JSX.Element | undefined;
        let gameMode: JSX.Element | undefined;
        let difficulty: JSX.Element | undefined;
        let hostName: JSX.Element | undefined;

        if (this.state.gameType === GameType.Join) {
            joinAddress = (
            <Field labelText={words.joinAddress} labelBehaviour={true}>
                <Textbox color={ButtonColor.Tertiary} text={this.state.joinAddress} placeholder={words.joinAddressPlaceholder} textChanged={address => this.setState({ joinAddress: address })} />
                <div className="description">{words.joinAddressDescription}</div>
            </Field>
            );
        }
        else {
            if (this.state.gameType !== undefined) {
                gameMode = (
                <Field labelText={words.gameMode}>
                    <Choice prompt={words.gameModePrompt} color={ButtonColor.Primary} vertical={choicesVertical}>
                        <ToggleButton activated={() => this.setState({ gameMode: GameMode.Exploration })} description={words.gameModeExplorationDescription} text={words.gameModeExploration} />
                        <ToggleButton activated={() => this.setState({ gameMode: GameMode.Survival })} description={words.gameModeSurvivalDescription} text={words.gameModeSurvival} />
                        <ToggleButton activated={() => this.setState({ gameMode: GameMode.Arena })} description={words.gameModeArenaDescription} text={words.gameModeArena} disabled={this.state.gameType === GameType.Local} />
                    </Choice>
                </Field>
                );

                if (this.usesDifficulty()) {        
                    let levels = [];
                    for (let i = 1; i <= 10; i++) {
                        levels.push(<ToggleButton key={i} activated={() => this.setState({ difficulty: i as Difficulty })} text={i.toString()} />);
                    }
                    
                    difficulty = (
                    <Field labelText={words.difficulty}>
                        <Choice prompt={words.difficultyPrompt} color={ButtonColor.Tertiary} vertical={this.props.screenWidth < 400}>
                            {levels}
                        </Choice>
                    </Field>
                    );
                }

                if (this.state.gameType === GameType.Host) {
                    hostName = (
                    <Field labelText={words.serverName} labelBehaviour={true}>
                        <Textbox color={ButtonColor.Tertiary} text={this.state.serverName} placeholder={words.serverNamePlaceholder} textChanged={name => this.setState({ serverName: name })} />
                        <div className="description">{words.serverNameDescription}</div>
                    </Field>
                    );
                }
            }
        }

        return <Screen heading={words.intro} pageLayout={true}>
            <Field labelText={words.shipName} labelBehaviour={true}>
                <div className="field__contentRow">
                    <Textbox color={ButtonColor.Tertiary} text={this.state.shipName} textChanged={name => this.setState({ shipName: name })} />
                    <PushButton color={ButtonColor.Tertiary} noBorder={true} icon={Icon.Refresh} clicked={() => this.randomizeName()} title={words.shipNameRandom} />
                </div>
                <div className="description">{words.shipNameDescription}</div>
            </Field>
            
            <Field labelText={words.gameType}>
                <Choice prompt={words.gameTypePrompt} color={ButtonColor.Primary} vertical={choicesVertical}>
                    <ToggleButton activated={() => this.setState({ gameType: GameType.Local })} description={words.gameTypeLocalDescription} text={words.gameTypeLocal} />
                    <ToggleButton activated={() => this.setState({ gameType: GameType.Join })} description={words.gameTypeJoinDescription} text={words.gameTypeJoin} />
                    <ToggleButton activated={() => this.setState({ gameType: GameType.Host })} description={words.gameTypeHostDescription} text={words.gameTypeHost} />
                </Choice>
            </Field>

            {joinAddress}
            {gameMode}
            {difficulty}
            {hostName}

            <Field centered={true} displayAsRow={true}>
                <ConfirmButton color={ButtonColor.Quandry} clicked={() => this.startGame()} text={words.startGame} disabled={!this.decideCanStart()} />
                <PushButton color={ButtonColor.Quaternary} clicked={() => this.cancel()} text={this.props.text.common.cancel} command="-setup" />
            </Field>
        </Screen>;
    }
    
    private getRandomName() {
        let randomNames = this.props.text.screens.gameSetup.shipNames;
        let index = Math.floor(Math.random() * randomNames.length);
        return randomNames[index];
    }

    private randomizeName() {
        let name: string;
        do {
            name = this.getRandomName();
        } while (name === this.state.shipName);

        this.setState({ shipName: name });
    }
    
    private usesDifficulty() {
        switch (this.state.gameMode) {
            case GameMode.Survival:
            case GameMode.Exploration:
                return true;
            default:
                return false;
        }
    }

    private decideCanStart() {
        if (this.state.gameType === undefined)
            return false;

        if (this.state.shipName === undefined || this.state.shipName.trim().length === 0)
            return false;

        if (this.state.gameType === GameType.Join) {
            if (this.state.joinAddress === undefined || this.state.joinAddress.trim().length === 0)
                return false;
        }

        if (this.state.gameType === GameType.Local || this.state.gameType === GameType.Host) {
            if (this.state.gameMode === undefined)
                return false;

            if (this.usesDifficulty() && this.state.difficulty === undefined)
                return false;
        }

        if (this.state.gameType === GameType.Host) {
             if (this.state.serverName === undefined || this.state.serverName.trim().length === 0)
                return false;
        }
        else if (this.state.gameType === GameType.Local) {
            if (this.state.gameMode === GameMode.Arena)
                return false; // invalid combo
        }

        return true;
    }

    private cancel() {
        this.props.showWaitingForPlayers();
    }

    private startGame() {
        connection.send(`shipName ${this.state.shipName}`);
        
        let command = 'startGame';

        if (this.state.gameType === GameType.Join) {
            command += ` join ${this.state.joinAddress}`;
        }
        else {
            switch (this.state.gameType) {
                case GameType.Host:
                    command += ' host'; break;
                case GameType.Local:
                    command += ' local'; break;
                default:
                    return;
            }

            switch (this.state.gameMode) {
                case GameMode.Exploration:
                    command += ` exploration ${this.state.difficulty}`; break;
                case GameMode.Survival:
                    command += ` survival ${this.state.difficulty}`; break;
                case GameMode.Arena:
                    command += ' arena'; break;
            }
        }

        connection.send(command);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IGameSetupDataProps = (state) => {
    return {
        text: state.user.text,
        screenWidth: state.user.screenWidth,
        screenHeight: state.user.screenHeight,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {...ScreenStore.actionCreators}
)(GameSetup);