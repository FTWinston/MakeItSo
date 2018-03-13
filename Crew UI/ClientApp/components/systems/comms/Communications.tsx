import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import './Communications.scss';

interface CommunicationsProps {
    text: TextLocalisation;
}

class Communications extends React.Component<CommunicationsProps, {}> {
    public render() {
        return <div className="system">
            This is the communications system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => CommunicationsProps = (state) => {
    return {
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Communications);