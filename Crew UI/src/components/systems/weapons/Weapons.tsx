import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { SensorTarget, TextLocalisation, Vector3, Rotator } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './Weapons.scss';
import { SensorView } from '~/components/general/SensorView';
import { TargetList } from '../sensors/TargetList';
import { WeaponState } from './store';
import { connection } from '~/index';
import { TargetDisplay } from './TargetDisplay';
import { SolutionList } from './SolutionList';
import { FillPuzzle } from './FillPuzzle';

interface IProps extends WeaponState {
    text: TextLocalisation;
    allTargets: SensorTarget[];
    shipPosition: Vector3;
    shipOrientation: Rotator;
}

interface IState {
    selectedTarget?: SensorTarget;
}

class Weapons extends ShipSystemComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        
        this.state = {
        }
    }

    componentWillReceiveProps(newProps: IProps) {
        if (newProps.selectedTargetID !== this.props.selectedTargetID) {
            const target = this.props.allTargets.find(t => t.id === newProps.selectedTargetID);

            this.setState({
                selectedTarget: target,
            });
        }
    }

    name() { return 'weapons'; }

    protected getOptionLabels() {
        return this.props.text.systems.warp;
    }

    public render() {
        if (this.state.selectedTarget === undefined) {        
            const selectTarget = (target: SensorTarget) => connection.send(`wpn_target ${target.id}`);

            return <div className="system weapons weapons--targetSelection">
                <SensorView
                    className="weapons__targetSelect"
                    targets={this.props.allTargets}
                />
                <TargetList
                    text={this.props.text}
                    targets={this.props.allTargets}
                    selected={selectTarget}
                    className="weapons__targetList"
                />
            </div>
        }
        else if (this.props.selectedTargetingSolution === undefined)
        {
            const selectSolution = (solutionIndex: number) => connection.send(`wpn_solution ${solutionIndex}`);
            const clearTarget = () => connection.send(`wpn_target 0`);

            return <div className="system weapons weapons--solutionSelection">
                <TargetDisplay
                    text={this.props.text}
                    target={this.state.selectedTarget}
                    deselectTarget={clearTarget}
                    currentlyFacing={this.props.currentlyFacing}
                    relPitch={this.props.targetPitch}
                    relYaw={this.props.targetYaw}
                    relRoll={this.props.targetRoll}
                    shipPosition={this.props.shipPosition}
                    shipOrientation={this.props.shipOrientation}
                />
                <SolutionList
                    text={this.props.text}
                    solutions={this.props.targetingSolutions}
                    select={selectSolution}
                    currentlyFacing={this.props.currentlyFacing}
                />
            </div>
        }
        else 
        {
            const clearTarget = () => connection.send(`wpn_target 0`);
            const clearSolution = () => connection.send(`wpn_solution -1`);
            const sendFire = (indices: number[]) => connection.send(`wpn_fire ${indices.join(' ')}`);

            return <div className="system weapons weapons--targeting">
                <TargetDisplay
                    text={this.props.text}
                    target={this.state.selectedTarget}
                    deselectTarget={clearTarget}
                    solution={this.props.selectedTargetingSolution}
                    deselectSolution={clearSolution}
                    currentlyFacing={this.props.currentlyFacing}
                    relPitch={this.props.targetPitch}
                    relYaw={this.props.targetYaw}
                    relRoll={this.props.targetRoll}
                    shipPosition={this.props.shipPosition}
                    shipOrientation={this.props.shipOrientation}
                />
                <FillPuzzle
                    text={this.props.text}
                    width={this.props.puzzleWidth}
                    height={this.props.puzzleHeight}
                    startCell={this.props.puzzleStartCell}
                    cells={this.props.puzzleCells}
                    onCompleted={sendFire}
                />
            </div>
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IProps = (state) => {
    return {
        ...state.weapons,
        text: state.user.text,
        allTargets: state.environment.targets,
        shipPosition: state.environment.shipPos,
        shipOrientation: state.environment.shipRotation,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {},
    null,
    { withRef: true },
)(Weapons);