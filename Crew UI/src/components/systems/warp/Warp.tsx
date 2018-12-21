import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState, exhaustiveActionCheck } from '~/store';
import { actionCreators, WarpState, WarpJumpStatus } from './store';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { SensorView } from '~/components/general/SensorView';
import { SensorTarget, TextLocalisation, Vector3 } from '~/functionality';
import { connection } from '~/index';
import './Warp.scss';
import { KenKenPuzzle } from './KenKenPuzzle';
import { Numbers } from './Numbers';
import { DestinationControls } from './DestinationControls';
import { PlottingControls } from './PlottingControls';
import { JumpResults } from './JumpResults';

interface WarpProps extends WarpState {
    text: TextLocalisation;
    sensorTargets: SensorTarget[];
    setPuzzleValue: (cellIndex: number, value: number) => void;
}

interface IState {
    selectedValue: number;
}

class Warp extends ShipSystemComponent<WarpProps, IState> implements React.Component<WarpProps, IState> {
    constructor(props: WarpProps) {
        super(props);
        
        this.state = {
            selectedValue: 0,
        };
    }

    private sensorsView: SensorView | null = null;
    private kenkenPuzzle: KenKenPuzzle | null = null;

    name() { return 'warp'; }

    protected getHelpText() {
        return this.props.text.systemHelp.warp;
    }

    protected getOptionLabels() {
        return this.props.text.systems.warp;
    }

    public render() {
        if (this.props.status === WarpJumpStatus.Idle) {
            const targetPos = this.sensorsView === null ? new Vector3(0, 0, 0) : this.sensorsView.state.center;

            return <div className="system warp warp--idle">
                <DestinationControls
                    shipPosition={this.props.shipPosition}
                    targetPosition={targetPos}
                    plotJump={() => this.plotJump(targetPos)}
                    text={this.props.text}
                    pan={(dx, dy, dz) => this.pan(dx, dy, dz)}
                />
                <SensorView
                    ref={v => this.sensorsView = v}
                    className="warp__sensorMap"
                    targets={[...this.props.sensorTargets/*, this.props.jumpStartPosition, this.props.jumpEndPosition*/]}
                />
            </div>;
        }

        const cellClicked = this.props.status === WarpJumpStatus.Jumping
            ? undefined
            : (cellIndex: number) => this.props.setPuzzleValue(cellIndex, this.state.selectedValue);

        const puzzle = <KenKenPuzzle
            className="warp__puzzle"
            size={this.props.puzzleSize}
            values={this.props.puzzleValues}
            cellGroups={this.props.puzzleCellGroups}
            groupTargets={this.props.puzzleGroupTargets}
            groupOperators={this.props.puzzleGroupOperators}
            rowValidity={this.props.puzzleRowValidity}
            colValidity={this.props.puzzleColValidity}
            groupValidity={this.props.puzzleGroupValidity}
            cellClicked={cellClicked}
            ref={p => this.kenkenPuzzle = p}
        />

        switch (this.props.status) {
            case WarpJumpStatus.Charging:
                return <div className="system warp warp--puzzle">
                    {this.renderPuzzleControls()}
                    {puzzle}
                    {<Numbers max={this.props.puzzleSize} selected={this.state.selectedValue} clicked={val => this.numberSelected(val)} />}
                </div>;
                
            case WarpJumpStatus.Ready:
                return <div className="system warp warp--puzzle warp--ready">
                    {this.renderPuzzleControls()}
                    {puzzle}
                    {<Numbers max={this.props.puzzleSize} selected={this.state.selectedValue} clicked={val => this.numberSelected(val)} />}
                </div>;
            case WarpJumpStatus.Jumping:
                return <div className="system warp warp--puzzle warp--jumping">
                    <JumpResults
                        eta={this.props.jumpEndTime}
                        text={this.props.text}
                        targetPosition={this.props.jumpTargetPosition === undefined ? new Vector3(0,0,0) : this.props.jumpTargetPosition}
                        puzzleRowValidity={this.props.puzzleRowValidity === undefined ? [false] : this.props.puzzleRowValidity}
                        puzzleColValidity={this.props.puzzleColValidity === undefined ? [false] : this.props.puzzleColValidity}
                        puzzleGroupValidity={this.props.puzzleGroupValidity === undefined ? [false] : this.props.puzzleGroupValidity}
                    />
                    {puzzle}
                </div>;
            default:
                exhaustiveActionCheck(this.props.status);
                break;
        }

        return <div />;
    }
    
    private pan(dx: number, dy: number, dz: number) {
        const scale = 2;
        this.sensorsView!.pan(dx * scale, dy * scale, dz * scale);
    }

    private renderPuzzleControls() {
        const startPos = this.props.jumpStartPosition === undefined
            ? new Vector3(0,0,0) : this.props.jumpStartPosition;

        const targetPos = this.props.jumpTargetPosition === undefined
            ? new Vector3(0,0,0) : this.props.jumpTargetPosition;

        let disableJump: boolean;

        if (this.props.status !== WarpJumpStatus.Ready || this.kenkenPuzzle === null) {
            disableJump = true;
        }
        else {
            // TODO: should we also check if the puzzle has no dodgy rows/columns?
            disableJump = !this.kenkenPuzzle.isCompleted();
        }

        return <PlottingControls
            jumpStartPosition={startPos}
            jumpTargetPosition={targetPos}
            shipPosition={this.props.shipPosition}
            disableJump={disableJump}
            chargeCompletion={this.props.chargeCompletion}
            jumpStartEntranceRange={this.props.jumpStartEntranceRange}
            cancelJump={() => this.cancelJump()}
            performJump={() => this.performJump(this.props.puzzleValues)}
            text={this.props.text}
        />
    }

    private numberSelected(val: number) {
        this.setState({ selectedValue: val === this.state.selectedValue ? 0 : val });
    }

    private performJump(puzzleValues: number[]) {
        connection.send(`warp_jump ${puzzleValues.join(' ')}`);
    }

    private cancelJump() {
        connection.send('warp_cancel');
    }

    private plotJump(target: Vector3) {
        connection.send(`warp_plot ${target.x} ${target.y} ${target.z}`);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WarpProps = (state) => {
    return {
        ...state.warp,
        sensorTargets: state.environment.targets,
        text: state.user.text,
        setPuzzleValue: actionCreators.setPuzzleValue,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
    null,
    { withRef: true },
)(Warp);