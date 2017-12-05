import * as React from 'react';
import { connect } from 'react-redux';
import { store, connection }  from '../../Client';
import { ApplicationState }  from '../../store';
import * as UserStore from '../../store/User';
import * as ScreenStore from '../../store/Screen';
import * as CrewStore from '../../store/Crew';
import { InputMode } from '../../functionality/InputMode';
import { Localisation, Localisations, TextLocalisation } from '../../functionality/Localisation';
import { ToggleButton, PushButton, ConfirmButton, ButtonColor, Screen, Field, Choice, Textbox } from '../general';

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
    & typeof UserStore.actionCreators
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
        let inputModeVertical = this.props.screenWidth < 500;

        return <Screen heading={words.intro} pageLayout={true}>
            
            
            <Field centered={true} displayAsRow={true}>
                <ConfirmButton color={ButtonColor.Primary} clicked={() => this.startGame()} text={words.startGame} />
            </Field>
        </Screen>;
    }
    
    private getRandomName() {
        let randomNames = this.props.text.screens.gameSetup.shipNames;
        let index = Math.floor(Math.random() * randomNames.length);
        return randomNames[index];
    }

    private startGame() {
        // TODO: send all the values currently in state with the appropriate "start" command
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
    {...UserStore.actionCreators, ...ScreenStore.actionCreators}
)(GameSetup);