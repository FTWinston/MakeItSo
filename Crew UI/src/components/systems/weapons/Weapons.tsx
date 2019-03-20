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
                {this.renderTargetOverview(clearTarget)}
                
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

            return <div className="system weapons weapons--firingSolution">
                {this.renderTargetOverview(deselectSolution)}

                <Targeting
                    text={this.props.text}
                    solution={this.props.selectedSolution}
                    fire={fire}
                />
            </div>
        }
    }

    private renderTargetOverview(backClicked: () => void) {
        return <TargetOverview
            text={this.props.text}
            target={this.state.selectedTarget}
            solutions={this.props.targetingSolutions}
            selectedSymbols={this.props.selectedSymbols}
            currentlyFacing={this.props.currentlyFacing}
            lastFireTime={this.props.lastFireTime}
            lastUsedSolution={this.props.lastUsedSolution}
            relPitch={this.props.targetPitch}
            relYaw={this.props.targetYaw}
            relRoll={this.props.targetRoll}
            backClicked={backClicked}
        />
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