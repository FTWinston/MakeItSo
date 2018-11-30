import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation, SensorTarget } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './Sensors.scss';
import { SensorState, actionCreators, SensorSystemType } from './store';
import { SensorView } from '~/components/general/SensorView';
import { TargetList } from './TargetList';
import { connection } from '~/index';
import { TargetDisplay } from './TargetDisplay';
import { SensorSystemInfo } from './SensorSystemInfo';
import { SensorSystemTargeting } from './SensorSystemTargeting';

interface SensorsProps extends SensorState {
    text: TextLocalisation;
    allTargets: SensorTarget[];
}

class Sensors extends ShipSystemComponent<SensorsProps, {}> {
    name() { return 'sensors'; }

    protected getOptionLabels() {
        return this.props.text.systems.helm;
    }

    public render() {
        const selectTarget = (target: SensorTarget) => connection.send(`sensors_target ${target.id}`);

        if (this.props.selectedTarget === null) {
            return <div className="system sensors sensors--noTarget">
                <SensorView className="sensors__targetSelect" targets={this.props.allTargets} />
                <TargetList text={this.props.text} targets={this.props.allTargets} selected={selectTarget} />
            </div>
        }
        else if (this.props.openSystem === null) {
            const selectSystem = (system: SensorSystemType) => connection.send(`sensors_system ${system}`);
            const back = () => connection.send(`sensors_target 0`);
            
            return <div className="system sensors sensors--target">
                <TargetDisplay
                    target={this.props.selectedTarget}
                    systems={this.props.targetSystems}
                    text={this.props.text}
                    goBack={back}
                    selectSystem={selectSystem}
                />
                <TargetList text={this.props.text} targets={this.props.allTargets} selected={selectTarget} />
            </div>
        }
        else {
            const revealCell = (cellIndex: number) => connection.send(`sensors_reveal ${cellIndex}`);
            const back = () => connection.send(`sensors_system 0`);

            return <div className="system sensors sensors--targetSystem">
                <SensorSystemInfo
                    target={this.props.selectedTarget}
                    system={this.props.openSystem}
                    text={this.props.text}
                    goBack={back}
                />
                <SensorSystemTargeting
                    cells={this.props.targetSystemCells}
                    text={this.props.text}
                    revealCell={revealCell}
                />
            </div>
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