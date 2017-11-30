import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../store';
import * as UserStore from '../../store/User';
import { Localisation, Localisations, TextLocalisation } from '../../functionality/Localisation';
import { Screen } from '../general/Screen';

interface ConnectingDataProps {
    text: TextLocalisation;
}

type ConnectingProps =
    ConnectingDataProps
    & typeof UserStore.actionCreators;


class Connecting extends React.Component<ConnectingProps, {}> {
    public render() {
        return <Screen centered={true} heading={this.props.text.screens.connecting.connecting} />;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => ConnectingDataProps = (state) => {
    return {
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    UserStore.actionCreators
)(Connecting);