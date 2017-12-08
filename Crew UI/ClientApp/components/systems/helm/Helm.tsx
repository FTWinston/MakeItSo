import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation } from '../../../functionality';
import './Helm.scss';

interface HelmProps {
    text: TextLocalisation;
}

class Helm extends React.Component<HelmProps, {}> {
    public render() {
        return <div className="system">
            This is the helm system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => HelmProps = (state) => {
    return {
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Helm);