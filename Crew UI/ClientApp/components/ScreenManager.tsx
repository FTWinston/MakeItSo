import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { ClientScreen } from '../store/Screen';
import * as UserStore from '../store/User';
import * as Screen from './screens'

interface ScreenManagerDataProps {
    screen: ClientScreen;
    errorMessage?: string;
    showHotkeys: boolean;
}

type ScreenManagerProps = ScreenManagerDataProps
    & typeof UserStore.actionCreators;

class ScreenManager extends React.Component<ScreenManagerProps, {}> {
    componentWillMount() {
        this.updateDimensions();
        window.addEventListener('resize', () => this.updateDimensions());
    }

    render() {
        let classes = 'client';
        if (this.props.showHotkeys) {
            classes += ' client--showHotkeys';
        }
        
        return <div className={classes}>{this.renderScreen()}</div>;
    }

    private renderScreen() {
        switch (this.props.screen) {
            case ClientScreen.Connecting:
                return <Screen.Connecting />;
            case ClientScreen.UserSettings:
                return <Screen.Settings />;
            case ClientScreen.WaitingForPlayers:
                return <Screen.WaitingForPlayers />;
            default:
                return <h1 className="screen__heading">Unable to render required screen: {this.props.screen}</h1>;
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
        showHotkeys: state.user.showHotkeys,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    UserStore.actionCreators,
)(ScreenManager);