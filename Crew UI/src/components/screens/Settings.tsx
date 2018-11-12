import * as React from 'react';
import { connect } from 'react-redux';
import { connection } from '~/index';
import { ApplicationState } from '~/store';
import * as UserStore from '~/store/User';
import * as ScreenStore from '~/store/Screen';
import { InputMode, Localisation, TextLocalisation } from '~/functionality';
import { ToggleButton, PushButton, ButtonColor, Screen, Field, Choice, Textbox } from '~/components/general';

interface SettingsDataProps {
    userName: string;
    inputMode: InputMode;
    localisation: Localisation;
    text: TextLocalisation;
    screenWidth: number;
    screenHeight: number;
    
    hasSelectedSystems: boolean;
    gameInProgress: boolean;
}

type SettingsProps =
    SettingsDataProps
    & typeof UserStore.actionCreators
    & typeof ScreenStore.actionCreators;

class Settings extends React.Component<SettingsProps, {}> {
    public render() {
        let words = this.props.text.screens.settings;
        let hasUserName = this.props.userName.trim().length > 0;
        let inputModeVertical = this.props.screenWidth < 330;

        return <Screen heading={words.intro} pageLayout={true}>
            <Field labelText={words.userName} labelBehaviour={true}>
                <Textbox
                    color={ButtonColor.Primary}
                    text={this.props.userName}
                    textChanged={t => this.nameChanged(t)}
                    placeholder={words.userNamePlaceholder}
                />
                <div className="description">{words.userNameDescription}</div>
            </Field>

            <Field labelText={words.inputMode}>
                <Choice prompt={words.inputModePrompt} color={ButtonColor.Secondary} vertical={inputModeVertical}>
                    <ToggleButton startActive={this.props.inputMode === InputMode.KeyboardAndMouse} activated={() => this.inputModeChanged(InputMode.KeyboardAndMouse)} description={words.inputModeDescriptionKeyboard} text={words.inputModeKeyboard} />
                    <ToggleButton startActive={this.props.inputMode === InputMode.Touchscreen} activated={() => this.inputModeChanged(InputMode.Touchscreen)} description={words.inputModeDescriptionTouch} text={words.inputModeTouch} />
                    <ToggleButton startActive={this.props.inputMode === InputMode.Gamepad} disabled={true} activated={() => this.inputModeChanged(InputMode.Gamepad)} description={words.inputModeDescriptionGamepad} text={words.inputModeGamepad} />
                </Choice>
            </Field>
            
            <Field centered={true}>
                <PushButton color={ButtonColor.Tertiary} disabled={!hasUserName} clicked={() => this.close()} text={this.props.text.common.save} />
            </Field>
            Screen size is {this.props.screenWidth}x{this.props.screenHeight}
        </Screen>;
    }

    private nameChanged(name: string) {
        this.props.setUserName(name);
    }

    private inputModeChanged(mode: InputMode) {
        this.props.setInputMode(mode);
    }

    private close() {
        connection.send(`name ${this.props.userName.trim()}`);

        if (this.props.gameInProgress) {
            if (this.props.hasSelectedSystems) {
                this.props.showGame();
            } else {
                this.props.showWaitingForGame();
            }
        } else {
            this.props.showSystemSelection();
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SettingsDataProps = (state) => {
    let localPlayer = state.crew.players.find(p => p.id === state.crew.localPlayerID);

    return {
        userName: state.user.userName,
        inputMode: state.user.inputMode,
        localisation: state.user.localisation,
        text: state.user.text,
        screenWidth: state.user.screenWidth,
        screenHeight: state.user.screenHeight,

        gameInProgress: state.screen.gameState === ScreenStore.GameState.Active
                     || state.screen.gameState === ScreenStore.GameState.Finished,
        hasSelectedSystems: localPlayer !== undefined && localPlayer.selectedSystems !== 0,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {...UserStore.actionCreators, ...ScreenStore.actionCreators}
)(Settings);