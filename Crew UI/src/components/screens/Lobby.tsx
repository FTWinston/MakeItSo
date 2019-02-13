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
    canEnterSetup: boolean;
    gameInProgress: boolean;
    text: TextLocalisation;
}

type IProps = IDataProps
    & typeof ScreenStore.actionCreators;

class Lobby extends React.Component<IProps, {}> {
    public render() {
        let words = this.props.text.screens.lobby;

        let setupButton: JSX.Element | undefined, resumeButton: JSX.Element | undefined;

        if (this.props.gameInProgress) {
            resumeButton = <PushButton
                color={ButtonColor.Secondary}
                text={words.resumeGame}
                command="resume"
            />;
        } else {
            setupButton = <PushButton
                color={ButtonColor.Secondary}
                text={words.setupGame}
                command="+setup"
                disabled={this.props.canEnterSetup}
            />;
        }

        const players = this.props.playerNames.map((name, index) => {
            const classes = index === this.props.localPlayerIndex
                ? 'playerList__item playerList__item--self'
                : 'playerList__item';
            return <div className={classes} key={index}>{name}</div>
        });

        return <Screen heading={words.intro} pageLayout={true}>
            <Field centered={true}>
                <p>{words.playerList}</p>
                <div className="playerList">
                    {players}
                </div>
            </Field>
            <Field centered={true} displayAsRow={true}>
                {setupButton}
                {resumeButton}
            </Field>
        </Screen>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IDataProps = (state) => {
    return {
        playerNames: state.crew.players.map(p => p.name),
        localPlayerIndex: state.crew.players.findIndex(p => p.id === state.crew.localPlayerID),
        text: state.user.text,
        canEnterSetup: state.crew.playerInSetup !== undefined && state.crew.playerInSetup !== state.crew.localPlayerID,
        gameInProgress: state.screen.gameState === ScreenStore.GameState.Paused,
    };
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    ScreenStore.actionCreators
)(Lobby);