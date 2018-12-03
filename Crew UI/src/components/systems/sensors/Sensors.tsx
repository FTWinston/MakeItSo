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

interface IState {
    selectedTarget?: SensorTarget;
}

class Sensors extends ShipSystemComponent<SensorsProps, IState> {
    constructor(props: SensorsProps) {
        super(props);

        this.state = {
        };
    }

    componentWillReceiveProps(newProps: SensorsProps) {
        if (newProps.selectedTargetID !== this.props.selectedTargetID) {
            const target = this.props.allTargets.find(t => t.id === newProps.selectedTargetID);

            this.setState({
                selectedTarget: target,
            });
        }
    }

    name() { return 'sensors'; }

    protected getOptionLabels() {
        return this.props.text.systems.helm;
    }

    public render() {
        const selectTarget = (target: SensorTarget) => connection.send(`sensors_target ${target.id}`);

        if (this.state.selectedTarget === undefined) {
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
                    target={this.state.selectedTarget}
                    systems={this.props.targetSystems}
                    systemLevels={this.props.targetSystemLevels}
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
            const systemLevel = this.props.targetSystemLevels[
                this.props.targetSystems.indexOf(this.props.openSystem)
            ];

            return <div className="system sensors sensors--targetSystem">
                <SensorSystemInfo
                    target={this.state.selectedTarget}
                    system={this.props.openSystem}
                    infoLevel={systemLevel}
                    text={this.props.text}
                    goBack={back}
                />
                <SensorSystemTargeting
                    gridSize={this.props.targetGridSize}
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