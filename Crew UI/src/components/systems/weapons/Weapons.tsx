import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { SensorTarget, TextLocalisation, Vector3, Rotator } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './Weapons.scss';
import { TargetList } from '../sensors/TargetList';
import { WeaponState, ITargetingSymbol, actionCreators, TargetingSolutionType } from './store';
import { connection } from '~/index';
import { TargetDisplay } from './TargetDisplay';
import { Targeting } from './Targeting';
import { RadarView } from '~/components/general/RadarView';

interface IProps extends WeaponState {
    text: TextLocalisation;
    allTargets: SensorTarget[];
    shipPosition: Vector3;
    shipOrientation: Rotator;
    selectSymbol: (symbol: ITargetingSymbol) => void;
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
        else 
        {
            const clearTarget = () => connection.send(`wpn_target 0`);
            const selectSymbol = (symbol: ITargetingSymbol) => {
                this.props.selectSymbol(symbol);
                connection.send(`wpn_input ${this.props.targetingSymbols.indexOf(symbol)}`);
            };
            const lastFireSuccess = this.props.lastUsedSolution !== TargetingSolutionType.None;

            return <div className="system weapons weapons--targeting">
                <TargetDisplay
                    text={this.props.text}
                    target={this.state.selectedTarget}
                    deselectTarget={clearTarget}
                    solutions={this.props.targetingSolutions}
                    selectedSymbols={this.props.selectedSymbols}
                    currentlyFacing={this.props.currentlyFacing}
                    lastFireTime={this.props.lastFireTime}
                    lastUsedSolution={this.props.lastUsedSolution}
                    relPitch={this.props.targetPitch}
                    relYaw={this.props.targetYaw}
                    relRoll={this.props.targetRoll}
                />
                <Targeting
                    className="weapons__targeting"
                    symbols={this.props.targetingSymbols}
                    selectedSymbols={this.props.selectedSymbols}
                    symbolSelected={selectSymbol}
                    lastFireTime={this.props.lastFireTime}
                    lastFireWasSuccess={lastFireSuccess}
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
        selectSymbol: actionCreators.selectSymbol,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
    null,
    { withRef: true },
)(Weapons);