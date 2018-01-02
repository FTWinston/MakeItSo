import * as React from 'react';
import { Choice, ButtonSet, FlexibleCanvas, HeldButton, Icon, ButtonColor } from '../../../general';
import { FieldGroup } from '../FieldGroup';
import { FeedbackGroup } from '../FeedbackGroup';
import { HeadingReadout } from './HeadingReadout';
import { SpeedReadout } from './SpeedReadout';

import { Helm, TypedHelmProps } from '../Helm';

export class ButtonHelm extends React.PureComponent<TypedHelmProps, {}> {
    render() {
        let words = this.props.text.systems.helm;
        let iconSize = "1.5em";

        return <div className="system helm helm--buttonInput">
            <FieldGroup
                className="fieldGroup--buttons fieldGroup--3x1 fieldGroup--unpadded"
            >
                <HeadingReadout text={this.props.text} pitch={this.props.pitch} yaw={this.props.yaw} roll={this.props.roll} />
                <FlexibleCanvas draw={(ctx, w, h) => this.props.drawOrientation(ctx, w, h)} />
                <SpeedReadout
                    text={this.props.text}
                    forwardSpeed={this.props.translationRateForward}
                    horizontalSideSpeed={this.props.translationRateForward}
                    verticalSideSpeed={this.props.translationRateForward}
                />
            </FieldGroup>

            <FeedbackGroup
                label={words.forwardBackward}
                x={this.props.translationRateForward / this.props.translationRateForwardMax}
                xMin={-this.props.translationRateReverseMax / this.props.translationRateForwardMax}
                className="fieldGroup--buttons fieldGroup--3x1"
            >
                <HeldButton text={words.moveBackward} color={ButtonColor.Quaternary} hotkey="control" pressCommand="moveBackward 1" releaseCommand="moveBackward 0" />
                <HeldButton text={words.speedStop} color={ButtonColor.Primary} hotkey="shift" pressCommand="+forwardBackStop" releaseCommand="-forwardBackStop" />
                <HeldButton text={words.moveForward} color={ButtonColor.Quaternary} hotkey="space" pressCommand="moveForward 1" releaseCommand="moveForward 0" />
            </FeedbackGroup>

            <FeedbackGroup
                label={words.rotation}
                x={this.props.yawRate / this.props.yawRateMax}
                y={this.props.pitchRate / this.props.pitchRateMax}
                className="fieldGroup--buttons fieldGroup--3x3"
            >
                <HeldButton className="fieldGroup--3x3__topMid" icon={Icon.ArrowUp} iconSize={iconSize} title={words.rotateUp} color={ButtonColor.Secondary} hotkey="W" pressCommand="pitchUp 1" releaseCommand="pitchUp 0" />
                <HeldButton className="fieldGroup--3x3__botMid" icon={Icon.ArrowDown} iconSize={iconSize} title={words.rotateDown} color={ButtonColor.Secondary} hotkey="X" pressCommand="pitchDown 1" releaseCommand="pitchDown 0" />
                <HeldButton className="fieldGroup--3x3__midLeft" icon={Icon.ArrowLeft} iconSize={iconSize} title={words.rotateLeft} color={ButtonColor.Secondary} hotkey="A" pressCommand="yawLeft 1" releaseCommand="yawLeft 0" />
                <HeldButton className="fieldGroup--3x3__midRight" icon={Icon.ArrowRight} iconSize={iconSize} title={words.rotateRight} color={ButtonColor.Secondary} hotkey="D" pressCommand="yawRight 1" releaseCommand="yawRight 0" />
                <HeldButton className="fieldGroup--3x3__topLeft" noBorder={true} icon={Icon.RotateCCW} iconSize={iconSize} title={words.rotateLeft} color={ButtonColor.Secondary} hotkey="Q" pressCommand="rollLeft 1" releaseCommand="rollLeft 0" />
                <HeldButton className="fieldGroup--3x3__topRight" noBorder={true} icon={Icon.RotateCW} iconSize={iconSize} title={words.rotateRight} color={ButtonColor.Secondary} hotkey="E" pressCommand="rollRight 1" releaseCommand="rollRight 0" />
                <HeldButton className="fieldGroup--3x3__center" icon={Icon.X} iconSize={iconSize} title={words.rotateStop} color={ButtonColor.Primary} hotkey="S" pressCommand="+rotStop" releaseCommand="-rotStop" />
            </FeedbackGroup>
            
            <FeedbackGroup
                label={words.strafe}
                x={this.props.translationRateHorizontal / this.props.translationRateHorizontalMax}
                y={this.props.translationRateVertical / this.props.translationRateVerticalMax}
                className="fieldGroup--buttons fieldGroup--3x3"
            >
                <HeldButton className="fieldGroup--3x3__topMid" icon={Icon.ArrowUp} iconSize={iconSize} title={words.strafeUp} color={ButtonColor.Tertiary} hotkey="I" pressCommand="strafeUp 1" releaseCommand="strafeUp 0" />
                <HeldButton className="fieldGroup--3x3__botMid" icon={Icon.ArrowDown} iconSize={iconSize} title={words.strafeDown} color={ButtonColor.Tertiary} hotkey="," pressCommand="strafeDown 1" releaseCommand="strafeDown 0" />
                <HeldButton className="fieldGroup--3x3__midLeft" icon={Icon.ArrowLeft} iconSize={iconSize} title={words.strafeLeft} color={ButtonColor.Tertiary} hotkey="J" pressCommand="strafeLeft 1" releaseCommand="strafeLeft 0" />
                <HeldButton className="fieldGroup--3x3__midRight" icon={Icon.ArrowRight} iconSize={iconSize} title={words.strafeRight} color={ButtonColor.Tertiary} hotkey="L" pressCommand="strafeRight 1" releaseCommand="strafeRight 0" />
                <HeldButton className="fieldGroup--3x3__center" icon={Icon.X} iconSize={iconSize} title={words.strafeStop} color={ButtonColor.Primary} hotkey="K" pressCommand="+strafeStop" releaseCommand="-strafeStop" />
            </FeedbackGroup>
        </div>;
    }
}