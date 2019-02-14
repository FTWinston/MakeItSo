import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import * as ScreenStore from '~/store/Screen';
import { TextLocalisation } from '~/functionality';
import { PushButton, ButtonColor, Field, Screen } from '~/components/general';
import './Lobby.scss';

interface IDataProps {
    playerNames: string[];
    localPlayerIndex: number;
    setupPlayerIndex?: number;
    gameInProgress: boolean;
    text: TextLocalisation;
}

type IProps = IDataProps
    & typeof ScreenStore.actionCreators;

class Lobby extends React.Component<IProps, {}> {
    public render() {
        let words = this.props.text.screens.lobby;

        let actionButton = this.props.gameInProgress
            ? <PushButton
                color={ButtonColor.Secondary}
                text={words.resumeGame}
                command="resume"
            />
            : <PushButton
                color={ButtonColor.Secondary}
                text={words.setupGame}
                command="+setup"
                disabled={this.props.setupPlayerIndex !== undefined}
            />

        const players = this.props.playerNames.map((name, index) => {
            const classes = index === this.props.localPlayerIndex
                ? 'playerList__item playerList__item--self'
                : 'playerList__item';
            return <li className={classes} key={index}>{name}</li>
        });

        const prompt = this.props.gameInProgress
            ? words.gameInProgress
            : this.props.setupPlayerIndex === undefined
                ? words.waitThenSetup
                : words.setupInProgress.replace('{PLAYER}', this.props.playerNames[this.props.setupPlayerIndex])

        return <Screen heading={words.intro} pageLayout={true} centered={true}>
            <p>{prompt}</p>
            <Field centered={true}>
                <ol className="playerList">
                    {players}
                </ol>
            </Field>
            <Field centered={true} displayAsRow={true}>
                {actionButton}
            </Field>
        </Screen>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IDataProps = (state) => {
    return {
        playerNames: state.crew.players.map(p => p.name),
        localPlayerIndex: state.crew.players.findIndex(p => p.id === state.crew.localPlayerID),
        setupPlayerIndex: state.crew.playerInSetup !== undefined && state.crew.playerInSetup !== state.crew.localPlayerID
            ? state.crew.players.findIndex(p => p.id === state.crew.playerInSetup)
            : undefined,
        text: state.user.text,
        gameInProgress: state.screen.gameState === ScreenStore.GameState.Paused,
    };
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    ScreenStore.actionCreators
)(Lobby);