import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../store';
import * as UserStore from '../../store/User';
import * as CrewStore from '../../store/Crew';
import * as ScreenStore from '../../store/Screen';
import { InputMode } from '../../functionality/InputMode';
import { Localisation, Localisations, TextLocalisation } from '../../functionality/Localisation';

interface SettingsDataProps {
    localPlayerID: number;
    inputMode: InputMode;
    localisation: Localisation;
    text: TextLocalisation;
    canCancel: boolean;
    userName?: string;
}

type SettingsProps =
    SettingsDataProps
    & typeof UserStore.actionCreators
    & typeof CrewStore.actionCreators
    & typeof ScreenStore.actionCreators
    & RouteComponentProps<{}>;

interface SettingsState {
    userName: string;
}

class Settings extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);

        this.state = {
            userName: props.userName === undefined ? '' : props.userName,
        };
    }
    
    public render() {
        let words = this.props.text.screens.settings;
        return <div>
            <h1>{words.intro}</h1>
            
            <div role="group">
                <label htmlFor="txtUserName">{words.userName}</label>
                <div>
                    <input
                        id="txtUserName"
                        className="value secondary"
                        type="text"
                        value={this.state.userName}
                        onChange={e => this.setState({ userName: e.target.value.trim() })}
                        placeholder={words.userNamePlaceholder}
                    />
                    <div className="description">{words.userNameDescription}</div>
                </div>
            </div>

            {this.props.canCancel ? 'You can cancel' : 'You cannot cancel'}
        </div>;
    }

    private sendChanges() {
        this.props.changePlayerName(this.props.localPlayerID, this.state.userName);
        this.props.setInputMode(InputMode.KeyboardAndMouse); // TODO: get from UI
        this.props.setLocalisation(Localisations[0]); // TODO: ok yeah should we just update these as you click them? To heck with cancelling...
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SettingsDataProps = (state) => {
    return {
        localPlayerID: state.crew.localPlayerID === undefined ? -1 : state.crew.localPlayerID,
        inputMode: state.user.inputMode,
        localisation: state.user.localisation,
        text: state.user.text,
        canCancel: state.screen.canCancelSettings,
        userName: state.crew.players.filter(p => p.id === state.crew.localPlayerID)[0].name,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {...UserStore.actionCreators, ...CrewStore.actionCreators, ...ScreenStore.actionCreators}
)(Settings) as typeof Settings;