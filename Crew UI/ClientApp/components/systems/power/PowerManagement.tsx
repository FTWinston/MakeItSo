import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import './PowerManagement.scss';

interface PowerManagementProps {
    text: TextLocalisation;
}

class PowerManagement extends React.Component<PowerManagementProps, {}> {
    public render() {
        return <div className="system">
            This is the power management system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => PowerManagementProps = (state) => {
    return {
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(PowerManagement);