import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { SensorTarget, TextLocalisation } from '../../../functionality';
import { SensorView } from '../../../components/general/SensorView';
import './Weapons.scss';

interface WeaponsProps {
    text: TextLocalisation;
    allTargets: SensorTarget[];
}

class Weapons extends React.Component<WeaponsProps, {}> {
    public render() {
        return <div className="system weapons">
            <SensorView className="weapons__targetSelect" targets={this.props.allTargets} />
        </div>;
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WeaponsProps = (state) => {
    return {
        text: state.user.text,
        allTargets: state.sensors.targets,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Weapons);