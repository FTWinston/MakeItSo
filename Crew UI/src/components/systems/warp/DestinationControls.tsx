import * as React from 'react';
import { Vector3, TextLocalisation } from '~/functionality';
import { Coordinate, PushButton, ButtonSet, HeldButton, ButtonColor } from '~/components/general';

interface IProps {
    shipPosition: Vector3;
    targetPosition: Vector3;
    text: TextLocalisation;
    pan: (dx: number, dy: number, dz: number) => void;
    plotJump: () => void;
}

export class DestinationControls extends React.PureComponent<IProps, {}> {
    public render() {
        const words = this.props.text.systems.warp;

        return <div className="warp__toolbar">
            <p>
                {words.plotJumpFrom} <Coordinate className="warp__fromCoords" pos={this.props.shipPosition} /> {words.to} <Coordinate className="warp__toCoords" pos={this.props.targetPosition} />.
            </p>

            <div className="warp__destinationButtons">
                <PushButton text={words.startJump} className="warp__prepareJump" color={ButtonColor.Secondary} clicked={() => this.props.plotJump()} />

                <ButtonSet color={ButtonColor.Quaternary}>
                    <HeldButton text={words.panUp} pressed={() => this.props.pan(0, 0, 1)} tick={interval => this.props.pan(0, 0, 10 * interval)} />
                    <HeldButton text={words.panDown} pressed={() => this.props.pan(0, 0, -1)} tick={interval => this.props.pan(0, 0, -10 * interval)} />
                </ButtonSet>
            </div>
        </div>
    }
}