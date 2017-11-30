import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import { ClientScreen } from '../store/Screen';
import { Connecting, Settings } from './screens'
import { Screen } from './general/Screen';

interface ScreenSelectorProps {
    screen: ClientScreen;
    errorMessage?: string;
}

class ScreenSelector extends React.Component<ScreenSelectorProps, {}> {
    render() {
        switch (this.props.screen) {
            case ClientScreen.Connecting:
                return <Connecting />;
            case ClientScreen.UserSettings:
                return <Settings />;
            default:
                return <Screen centered={true}>
                    <h1 className="screen__heading">Unable to render required screen: {this.props.screen}</h1>
                </Screen>
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => ScreenSelectorProps = (state) => {
    return {
        screen: state.screen.display,
        errorMessage: state.screen.errorMessage,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(ScreenSelector);