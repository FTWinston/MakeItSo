import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState, exhaustiveActionCheck } from '~/store';
import { actionCreators, WarpState, WarpJumpStatus } from './store';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { SensorView } from '~/components/general/SensorView';
import { SensorTarget, TextLocalisation, Vector3 } from '~/functionality';
import { connection } from '~/index';
import './Warp.scss';
import { ConfirmButton, ButtonColor, PushButton, ButtonSet, HeldButton, ProgressBar, Coordinate } from '~/components/general';
import { KenKenPuzzle } from './KenKenPuzzle';
import { Numbers } from './Numbers';

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
            return <div className="system warp warp--idle">
                {this.renderDestinationControls()}
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
                    {this.renderJumpResults()}
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

    private renderDestinationControls() {
        const shipPos = this.props.shipPosition;
        const targetPos = this.sensorsView === null ? new Vector3(0, 0, 0) : this.sensorsView.state.center;
        const words = this.props.text.systems.warp;

        return <div className="warp__toolbar">
            <p>
                {words.plotJumpFrom} <Coordinate className="warp__fromCoords" pos={shipPos} /> {words.to} <Coordinate className="warp__toCoords" pos={targetPos} />.
            </p>

            <PushButton text={words.startJump} className="warp__prepareJump" color={ButtonColor.Secondary} clicked={() => this.plotJump(targetPos)} />

            <ButtonSet color={ButtonColor.Quaternary}>
                <HeldButton text={words.panUp} pressed={() => this.pan(0, 0, 1)} tick={interval => this.pan(0, 0, 10 * interval)} />
                <HeldButton text={words.panDown} pressed={() => this.pan(0, 0, -1)} tick={interval => this.pan(0, 0, -10 * interval)} />
            </ButtonSet>
        </div>
    }

    private renderPuzzleControls() {
        const words = this.props.text.systems.warp;

        const startPos = this.props.jumpStartPosition === undefined
            ? new Vector3(0,0,0) : this.props.jumpStartPosition;

        const targetPos = this.props.jumpTargetPosition === undefined
            ? new Vector3(0,0,0) : this.props.jumpTargetPosition;

        const shipPos = this.props.shipPosition;
        
        const inRange = Vector3.distanceSq(shipPos, startPos) <= this.props.jumpStartEntranceRange * this.props.jumpStartEntranceRange;

        const rangeMessage = inRange
            ? <span className="warp__rangeMsg--in">{words.inRange}</span>
            : <span className="warp__rangeMsg--out">{words.outOfRange}</span>

        const shipPosClassName = inRange
            ? 'warp__shipCoords--inRange' : 'warp__shipCoords--outRange';

        let disableJump: boolean;

        if (this.props.status !== WarpJumpStatus.Ready || !inRange || this.kenkenPuzzle === null) {
            disableJump = true;
        }
        else {
            // check puzzle is completed, and has no dodgy rows/cols
            disableJump = !this.kenkenPuzzle.isCompleted();
        }

        return <div className="warp__toolbar">
            <p>
                {words.plottingJumpFrom} <Coordinate className="warp__fromCoords" pos={startPos} /> {words.to} <Coordinate className="warp__toCoords" pos={targetPos} />.
            </p>
            <p>
                {words.shipPosition}: <Coordinate className={shipPosClassName} pos={this.props.shipPosition} />.
                <br/>{rangeMessage}
            </p>

            <div>
                <ConfirmButton text={this.props.text.systems.warp.jump} color={ButtonColor.Primary} disabled={disableJump} clicked={() => this.performJump(this.props.puzzleValues)} />
                <ConfirmButton text={this.props.text.common.cancel} color={ButtonColor.Secondary} clicked={() => this.cancelJump()} />
            </div>

            <div className="warp__charge">
                {words.charging}: 
                <ProgressBar className="warp__chargeValue" maxValue={100} value={this.props.chargeCompletion} showNumber={true} />
            </div>
        </div>
    }
    
    private renderJumpResults() {
        return <div className="warp__toolbar">
            TODO: success / mis-jump indicator
        </div>
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