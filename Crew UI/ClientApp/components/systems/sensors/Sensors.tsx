import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { TextLocalisation } from '~/functionality';
import './Sensors.scss';

interface SensorsProps {
    text: TextLocalisation;
}

class Sensors extends React.Component<SensorsProps, {}> {
    public render() {
        return <div className="system">
            This is the sensors system. TODO: implement this!
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SensorsProps = (state) => {
    return {
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Sensors);