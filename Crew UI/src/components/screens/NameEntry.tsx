import * as React from 'react';
import { connect } from 'react-redux';
import { connection } from '~/index';
import { ApplicationState } from '~/store';
import * as UserStore from '~/store/User';
import * as ScreenStore from '~/store/Screen';
import { Localisation, TextLocalisation } from '~/functionality';
import { PushButton, ButtonColor, Screen, Field, Textbox } from '~/components/general';

interface SettingsDataProps {
    userName: string;
    localisation: Localisation;
    text: TextLocalisation;
    
    gameInProgress: boolean;
}

type SettingsProps =
    SettingsDataProps
    & typeof UserStore.actionCreators
    & typeof ScreenStore.actionCreators;

class NameEntry extends React.Component<SettingsProps, {}> {
    public render() {
        let words = this.props.text.screens.nameEntry;
        let hasUserName = this.props.userName.trim().length > 0;

        return <Screen heading={words.intro} centered={true}>
            <Field labelBehaviour={true} centered={true} description={words.userNameDescription}>
                <Textbox
                    color={ButtonColor.Primary}
                    text={this.props.userName}
                    textChanged={t => this.nameChanged(t)}
                    placeholder={words.userNamePlaceholder}
                />
            </Field>
            
            <Field centered={true} displayAsRow={true}>
                <PushButton color={ButtonColor.Secondary} disabled={!hasUserName} clicked={() => this.close(true)} text={words.joinFullScreen} />
                <PushButton color={ButtonColor.Tertiary} disabled={!hasUserName} clicked={() => this.close(false)} text={words.joinWindowed} />
            </Field>
        </Screen>;
    }

    private nameChanged(name: string) {
        this.props.setUserName(name);
    }

    private close(startFullscreen: boolean) {
        connection.send(`name ${this.props.userName.trim()}`);

        if (startFullscreen && !(document as any).fullscreenElement) {
            document.documentElement!.requestFullscreen();
        }
        
        if (this.props.gameInProgress) {
            this.props.showGameActive();
        } else {
            this.props.showWaitingForPlayers();
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SettingsDataProps = (state) => {
    return {
        userName: state.user.userName,
        localisation: state.user.localisation,
        text: state.user.text,

        gameInProgress: state.screen.gameState === ScreenStore.GameState.Active
                     || state.screen.gameState === ScreenStore.GameState.Finished,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {...UserStore.actionCreators, ...ScreenStore.actionCreators}
)(NameEntry);