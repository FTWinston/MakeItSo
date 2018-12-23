import * as React from 'react';
import { Vector3, TextLocalisation } from '~/functionality';
import { Coordinate, ButtonColor, ConfirmButton, ProgressBar } from '~/components/general';

interface IProps {
    shipPosition: Vector3;
    jumpStartPosition: Vector3;
    jumpTargetPosition: Vector3;
    jumpStartEntranceRange: number;
    chargeCompletion: number;
    text: TextLocalisation;
    disableJump: boolean;
    cancelJump: () => void;
    performJump: () => void;
}

export class PlottingControls extends React.PureComponent<IProps, {}> {
    public render() {
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

        return <div className="warp__toolbar">
            <p>
                {words.plottingJumpFrom} <Coordinate className="warp__fromCoords" pos={startPos} /> {words.to} <Coordinate className="warp__toCoords" pos={targetPos} />.
            </p>
            <p>
                {words.shipPosition}: <Coordinate className={shipPosClassName} pos={this.props.shipPosition} />.
                <br/>{rangeMessage}
            </p>

            <div className="warp__jumpButtons">
                <ConfirmButton text={this.props.text.systems.warp.jump} color={ButtonColor.Primary} disabled={this.props.disableJump || !inRange} clicked={() => this.props.performJump()} />
                <ConfirmButton text={this.props.text.common.cancel} color={ButtonColor.Secondary} clicked={() => this.props.cancelJump()} />
            </div>

            <div className="warp__charge">
                {words.charging}: 
                <ProgressBar className="warp__chargeValue" maxValue={100} value={this.props.chargeCompletion} showNumber={true} />
            </div>
        </div>
    }
}