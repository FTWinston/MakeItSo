import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState, exhaustiveActionCheck } from '~/store';
import { actionCreators, WarpState, WarpJumpStatus } from './store';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { SensorView } from '~/components/general/SensorView';
import { SensorTarget, TextLocalisation, Vector3 } from '~/functionality';
import { connection } from '~/index';
import './Warp.scss';
import { ConfirmButton, ButtonColor, PushButton } from '~/components/general';
import { KenKenPuzzle } from './KenKenPuzzle';

interface WarpProps extends WarpState {
    text: TextLocalisation;
    sensorTargets: SensorTarget[];
    setPuzzleValue: (cellIndex: number, value: number) => void;
}

class Warp extends ShipSystemComponent<WarpProps, {}> implements React.Component<WarpProps> {
    private sensorsView: SensorView | null = null;

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
            : (cellIndex: number, value: number) => this.props.setPuzzleValue(cellIndex, value);

        const puzzle = <KenKenPuzzle
            className="warp__puzzle"
            size={this.props.puzzleSize}
            values={this.props.puzzleValues}
            cellGroups={this.props.puzzleCellGroups}
            groupTargets={this.props.puzzleGroupTargets}
            groupOperators={this.props.puzzleGroupOperators}
            groupValidity={this.props.puzzleGroupValidity}
            cellClicked={cellClicked}
        />

        switch (this.props.status) {
            case WarpJumpStatus.Charging:
                return <div className="system warp warp--puzzle">
                    {this.renderChargeProgress()}
                    {puzzle}
                </div>;
                
            case WarpJumpStatus.Ready:
                return <div className="system warp warp--puzzle warp--ready">
                    {this.renderJumpButton()}
                    {puzzle}
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

    private renderDestinationControls() {
        return <div className="warp__toolbar">
            <PushButton text={this.props.text.systems.warp.startJump} color={ButtonColor.Tertiary} clicked={() => this.plotJump(this.sensorsView!.state.center)} />
            TODO: pan controls, current pos, current target pos
        </div>
    }
    
    private renderChargeProgress() {
        return <div className="warp__toolbar">
            <ConfirmButton text={this.props.text.common.cancel} color={ButtonColor.Secondary} clicked={() => this.cancelJump()} />
            TODO: charge progress, start pos, target pos
        </div>
    }
    
    private renderJumpButton() {
        return <div className="warp__toolbar">
            <ConfirmButton text={this.props.text.systems.warp.jump} color={ButtonColor.Primary} clicked={() => this.performJump(this.props.puzzleValues)} />
            <ConfirmButton text={this.props.text.common.cancel} color={ButtonColor.Secondary} clicked={() => this.cancelJump()} />
            TODO: possibly disable jump button, start pos, target pos
        </div>
    }
    
    private renderJumpResults() {
        return <div className="warp__toolbar">
            TODO: success / mis-jump indicator
        </div>
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