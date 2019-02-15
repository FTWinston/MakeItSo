import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { ClientScreen } from '~/store/Screen';
import * as UserStore from '~/store/User';
import * as Screen from './screens'

interface ScreenManagerDataProps {
    screen: ClientScreen;
    errorMessage?: string;
    showingHotkeys: boolean;
}

type ScreenManagerProps = ScreenManagerDataProps
    & typeof UserStore.actionCreators;

class ScreenManager extends React.PureComponent<ScreenManagerProps, {}> {
    componentWillMount() {
        this.updateDimensions();
        window.addEventListener('resize', () => this.updateDimensions());
    }

    render() {
        let classes = 'client';
        if (this.props.showingHotkeys) {
            classes += ' client--showHotkeys';
        }
        
        return <div className={classes} onContextMenu={ev => ev.preventDefault()}>{this.renderScreen()}</div>;
    }

    private renderScreen() {
        switch (this.props.screen) {
            case ClientScreen.Connecting:
                return <Screen.Connecting />;
            case ClientScreen.NameEntry:
                return <Screen.NameEntry />;
            case ClientScreen.WaitingForPlayers:
                return <Screen.Lobby />;
            case ClientScreen.SetupGame:
                return <Screen.GameSetup />;
            case ClientScreen.SystemHelp:
                return <Screen.Help />;
            case ClientScreen.GameActive:
                return <Screen.GameActive />;
            case ClientScreen.Error:
                return <Screen.Error />;
            default:
                return <h1 className="screen__heading">Unable to render screen: {this.props.screen}</h1>;
        }
    }

    private updateDimensions() {
        this.props.setScreenSize(window.innerWidth, window.innerHeight);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => ScreenManagerDataProps = (state) => {
    return {
        screen: state.screen.display,
        errorMessage: state.screen.errorMessage,
        showingHotkeys: state.user.showingHotkeys,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    UserStore.actionCreators,
)(ScreenManager);