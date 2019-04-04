import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { SensorTarget, TextLocalisation, Vector3, Rotator } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './Weapons.scss';
import { TargetList } from '../sensors/TargetList';
import { WeaponState, actionCreators, TargetingSolutionType, ITargetingSolution } from './store';
import { connection } from '~/index';
import { TargetOverview } from './TargetOverview';
import { RadarView } from '~/components/general/RadarView';
import { SolutionList } from './SolutionList';
import { Targeting } from './Targeting';
import { TargetFiringOverview } from './TargetFiringOverview';

interface IProps extends WeaponState {
    text: TextLocalisation;
    allTargets: SensorTarget[];
    shipPosition: Vector3;
    shipOrientation: Rotator;
    selectTargetingSolution: (solution: TargetingSolutionType) => void;
}

interface IState {
    selectedTarget?: SensorTarget;
}

class Weapons extends ShipSystemComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        
        const target = this.props.allTargets.find(t => t.id === props.selectedTargetID);
        
        this.state = {
            selectedTarget: target,
        }
    }

    componentWillReceiveProps(newProps: IProps) {
        if (newProps.selectedTargetID !== this.props.selectedTargetID) {
            const target = this.props.allTargets.find(t => t.id === newProps.selectedTargetID);

            this.setState({
                selectedTarget: target,
            });
        }

        // TODO: decide if we're no longer pointing sufficiently "at" the target and need to deselect it
    }

    name() { return 'weapons'; }

    protected getOptionLabels() {
        return this.props.text.systems.warp;
    }

    public render() {
        if (this.state.selectedTarget === undefined) {
            const selectTarget = (target: SensorTarget) => connection.send(`wpn_target ${target.id}`);

            return <div className="system weapons weapons--targetSelection">
                <RadarView
                    maxTargetingAngleRadians={2}
                    shipOrientation={this.props.shipOrientation}
                    shipPosition={this.props.shipPosition}
                    targets={this.props.allTargets}
                    className="weapons__targetSelect"
                />
                <TargetList
                    text={this.props.text}
                    targets={this.props.allTargets}
                    selected={selectTarget}
                    className="weapons__targetList"
                />
            </div>
        }
        else if (this.props.selectedSolution === undefined)
        {
            const clearTarget = () => connection.send(`wpn_target 0`);

            const selectSolution = (solution: ITargetingSolution) => this.props.selectTargetingSolution(solution.type);

            return <div className="system weapons weapons--solutionSelection">
                <TargetOverview
                    text={this.props.text}
                    target={this.state.selectedTarget!}
                    currentlyFacing={this.props.currentlyFacing}
                    relPitch={this.props.targetPitch}
                    relYaw={this.props.targetYaw}
                    relRoll={this.props.targetRoll}
                    backClicked={clearTarget}
                />
                
                <SolutionList
                    text={this.props.text}
                    solutions={this.props.targetingSolutions}
                    solutionSelected={selectSolution}
                    currentlyFacing={this.props.currentlyFacing}
                />
            </div>
        }
        else {
            const deselectSolution = () => this.props.selectTargetingSolution(TargetingSolutionType.None);
            const fire = (x1: number, y1: number, x2: number, y2: number) => connection.send(`wpn_fire ${x1} ${y1} ${x2} ${y2}`);

            const polygon = this.props.selectedSolution.polygonsByFace[this.props.currentlyFacing];

            return <div className="system weapons weapons--firingSolution">
                <TargetFiringOverview
                    text={this.props.text}
                    target={this.state.selectedTarget!}
                    currentlyFacing={this.props.currentlyFacing}
                    bestFacing={this.props.selectedSolution.bestFacing}
                    solutionType={this.props.selectedSolution.type}
                    baseDifficulty={this.props.selectedSolution.difficulty}
                    backClicked={deselectSolution}
                />

                <Targeting
                    className="weapons__targeting"
                    polygon={polygon}
                    fire={fire}
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
        selectTargetingSolution: actionCreators.selectTargetingSolution,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
    null,
    { withRef: true },
)(Weapons);