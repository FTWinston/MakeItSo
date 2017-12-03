import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../store';
import * as UserStore from '../../store/User';
import * as CrewStore from '../../store/Crew';
import * as ScreenStore from '../../store/Screen';
import { InputMode } from '../../functionality/InputMode';
import { Localisation, Localisations, TextLocalisation } from '../../functionality/Localisation';
import { ToggleButton, PushButton, ButtonColor, Screen, Field, Choice, Textbox } from '../general';

interface SettingsDataProps {
    localPlayerID: number;
    inputMode: InputMode;
    localisation: Localisation;
    text: TextLocalisation;
    userName?: string;
    screenWidth: number;
    screenHeight: number;
}

type SettingsProps =
    SettingsDataProps
    & typeof UserStore.actionCreators
    & typeof CrewStore.actionCreators
    & typeof ScreenStore.actionCreators;

class Settings extends React.Component<SettingsProps, {}> {
    public render() {
        let words = this.props.text.screens.settings;
        let hasUserName = this.props.userName !== undefined && this.props.userName.length !== 0;
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

            <Field labelText={words.inputMode} labelBehaviour={false}>
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
        name = name.trim();
        
        // TODO: save to localStorage
        // TODO: send to server
        this.props.changePlayerName(this.props.localPlayerID, name);
    }

    private inputModeChanged(mode: InputMode) {
        // TODO: save to localStorage
        this.props.setInputMode(mode);
    }

    private close() {
        // TODO: switch to waiting for players / role selection / pause screens, depending on ... something
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SettingsDataProps = (state) => {
    let player = state.crew.players.filter(p => p.id === state.crew.localPlayerID);
    return {
        localPlayerID: state.crew.localPlayerID === undefined ? -1 : state.crew.localPlayerID,
        inputMode: state.user.inputMode,
        localisation: state.user.localisation,
        text: state.user.text,
        userName: player.length > 0 ? player[0].name : undefined,
        screenWidth: state.user.screenWidth,
        screenHeight: state.user.screenHeight,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {...UserStore.actionCreators, ...CrewStore.actionCreators, ...ScreenStore.actionCreators}
)(Settings);