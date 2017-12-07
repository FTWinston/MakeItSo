import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../store';
import { TextLocalisation } from '../../functionality';
import { Screen } from '../general';
import './Error.scss';

interface ErrorProps {
    text: TextLocalisation;
    message: string;
}

class Error extends React.Component<ErrorProps, {}> {
    public render() {
        return <Screen centered={true} heading={this.props.text.screens.error.heading}>
            <div className="errorMessage">{this.props.message}</div>
        </Screen>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => ErrorProps = (state) => {
    return {
        text: state.user.text,
        message: state.screen.errorMessage === undefined ? state.user.text.errors.unknown : state.screen.errorMessage,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Error);