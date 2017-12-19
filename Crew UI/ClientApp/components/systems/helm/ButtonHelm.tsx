import * as React from 'react';
import { Choice, ButtonSet, FlexibleCanvas, HeldButton, Icon, ButtonColor } from '../../general';
import { FieldGroup } from './FieldGroup';
import { FeedbackGroup } from './FeedbackGroup';

import { Helm, TypedHelmProps } from './Helm';

export class ButtonHelm extends React.Component<TypedHelmProps, {}> {
    render() {
        let words = this.props.text.systems.helm;
        let iconSize = "1.5em";
        let overallSpeed = Helm.magnitude(this.props.translationRateX, this.props.translationRateY, this.props.translationRateForward);

        return <div className="system helm helm--buttonInput">
            <FieldGroup
                className="fieldGroup--buttons fieldGroup--3x1 fieldGroup--unpadded"
            >
                <div className="readout">
                    <div className="readout--label">{words.heading}</div>
                    <span className="readout--value">{Helm.radToDeg(this.props.yaw)}</span>&nbsp;{words.mark}&nbsp;<span className="readout--value">{Helm.radToDeg(this.props.pitch)}</span>
                    <div className="readout__smaller">{words.roll}&nbsp;<span className="readout--value">{Helm.radToDeg(this.props.roll)}</span>&deg;</div>
                </div>

                <FlexibleCanvas draw={(ctx, w, h) => this.props.drawOrientation(ctx, w, h)} />

                <div className="readout">
                    <div className="readout--label">{words.speed}</div>
                    <span className="readout--value">{overallSpeed}</span> {words.metresPerSecond}
                </div>
            </FieldGroup>

            <FeedbackGroup
                label={words.forwardBackward}
                x={this.props.translationRateForward / this.props.translationRateForwardMax}
                xMin={-this.props.translationRateReverseMax / this.props.translationRateForwardMax}
                className="fieldGroup--buttons fieldGroup--3x1"
            >
                <HeldButton text={words.moveBackward} color={ButtonColor.Quaternary} hotkey="control" pressCommand="+moveBackward" releaseCommand="-moveBackward" />
                <HeldButton text={words.speedStop} color={ButtonColor.Primary} hotkey="shift" pressCommand="+forwardBackStop" releaseCommand="-forwardBackStop" />
                <HeldButton text={words.moveForward} color={ButtonColor.Quaternary} hotkey="space" pressCommand="+moveForward" releaseCommand="-moveForward" />
            </FeedbackGroup>

            <FeedbackGroup
                label={words.rotation}
                x={this.props.yawRate / this.props.yawRateMax}
                y={this.props.pitchRate / this.props.pitchRateMax}
                className="fieldGroup--buttons fieldGroup--3x3"
            >
                <HeldButton className="fieldGroup--3x3__topMid" icon={Icon.ArrowUp} iconSize={iconSize} title={words.rotateUp} color={ButtonColor.Secondary} hotkey="W" pressCommand="+pitchUp" releaseCommand="-pitchUp" />
                <HeldButton className="fieldGroup--3x3__botMid" icon={Icon.ArrowDown} iconSize={iconSize} title={words.rotateDown} color={ButtonColor.Secondary} hotkey="X" pressCommand="+pitchDown" releaseCommand="-pitchDown" />
                <HeldButton className="fieldGroup--3x3__midLeft" icon={Icon.ArrowLeft} iconSize={iconSize} title={words.rotateLeft} color={ButtonColor.Secondary} hotkey="A" pressCommand="+yawLeft" releaseCommand="-yawLeft" />
                <HeldButton className="fieldGroup--3x3__midRight" icon={Icon.ArrowRight} iconSize={iconSize} title={words.rotateRight} color={ButtonColor.Secondary} hotkey="D" pressCommand="+yawRight" releaseCommand="-yawRight" />
                <HeldButton className="fieldGroup--3x3__topLeft" noBorder={true} icon={Icon.RotateCCW} iconSize={iconSize} title={words.rotateLeft} color={ButtonColor.Secondary} hotkey="Q" pressCommand="+rollLeft" releaseCommand="-rollLeft" />
                <HeldButton className="fieldGroup--3x3__topRight" noBorder={true} icon={Icon.RotateCW} iconSize={iconSize} title={words.rotateRight} color={ButtonColor.Secondary} hotkey="E" pressCommand="+rollRight" releaseCommand="-rollRight" />
                <HeldButton className="fieldGroup--3x3__center" icon={Icon.X} iconSize={iconSize} title={words.rotateStop} color={ButtonColor.Primary} hotkey="S" pressCommand="+rotStop" releaseCommand="-rotStop" />
            </FeedbackGroup>
            
            <FeedbackGroup
                label={words.strafe}
                x={this.props.translationRateX / this.props.translationRateXMax}
                y={this.props.translationRateY / this.props.translationRateYMax}
                className="fieldGroup--buttons fieldGroup--3x3"
            >
                <HeldButton className="fieldGroup--3x3__topMid" icon={Icon.ArrowUp} iconSize={iconSize} title={words.strafeUp} color={ButtonColor.Tertiary} hotkey="I" pressCommand="+strafeUp" releaseCommand="-strafeUp" />
                <HeldButton className="fieldGroup--3x3__botMid" icon={Icon.ArrowDown} iconSize={iconSize} title={words.strafeDown} color={ButtonColor.Tertiary} hotkey="," pressCommand="+strafeDown" releaseCommand="-strafeDown" />
                <HeldButton className="fieldGroup--3x3__midLeft" icon={Icon.ArrowLeft} iconSize={iconSize} title={words.strafeLeft} color={ButtonColor.Tertiary} hotkey="J" pressCommand="+strafeLeft" releaseCommand="-strafeLeft" />
                <HeldButton className="fieldGroup--3x3__midRight" icon={Icon.ArrowRight} iconSize={iconSize} title={words.strafeRight} color={ButtonColor.Tertiary} hotkey="L" pressCommand="+strafeRight" releaseCommand="-strafeRight" />
                <HeldButton className="fieldGroup--3x3__center" icon={Icon.X} iconSize={iconSize} title={words.strafeStop} color={ButtonColor.Primary} hotkey="K" pressCommand="+strafeStop" releaseCommand="-strafeStop" />
            </FeedbackGroup>
        </div>;
    }
}