import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation, SensorTarget } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './Sensors.scss';
import { SensorState, actionCreators } from './store';
import { SensorView } from '~/components/general/SensorView';
import { TargetList } from './TargetList';
import { connection } from '~/index';

interface SensorsProps extends SensorState {
    text: TextLocalisation;
    allTargets: SensorTarget[];
}

class Sensors extends ShipSystemComponent<SensorsProps, {}> {
    name() { return 'sensors'; }

    protected getOptionLabels() {
        return this.props.text.systems.sensors;
    }

    public render() {
        if (this.props.selectedTarget === null) {
            const selectTarget = (target: SensorTarget) => connection.send(`sensors_target ${target.id}`);

            return <div className="system sensors">
                <SensorView className="sensors__targetSelect" targets={this.props.allTargets} selected={selectTarget} />
                <TargetList text={this.props.text} targets={this.props.allTargets} selected={selectTarget} />
            </div>
        }
        else if (this.props.openSystem === null) {
            // const selectSystem = (system: SensorSystemType) => connection.send(`sensors_system ${system}`);
            // const back = () => connection.send(`sensors_target 0`);

            return <div className="system sensors">target display</div>
        }
        else {
            // const revealCell = (cellIndex: number) => connection.send(`sensors_reveal ${cellIndex}`);
            // const back = () => connection.send(`sensors_system 0`);

            return <div className="system sensors">system scan display</div>
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => SensorsProps = (state) => {
    return {
        text: state.user.text,
        allTargets: state.environment.targets,
        ...state.sensors,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
    null,
    { withRef: true },
)(Sensors);