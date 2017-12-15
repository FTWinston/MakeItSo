import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation, InputMode } from '../../../functionality';
import { Canvas, Choice, ButtonSet, HeldButton, Icon, ToggleButton, PushButton, ButtonColor }  from '../../general';
import { HelmState as HelmBaseProps } from '../../../store/Helm';
import { FieldGroup } from './FieldGroup';
import { FeedbackGroup } from './FeedbackGroup';
import { OrientationCube } from './Orientation';
import './Helm.scss';

interface HelmProps extends HelmBaseProps {
    text: TextLocalisation;
    inputMode: InputMode;
}

const orientation = new OrientationCube();

class Helm extends React.Component<HelmProps, {}> {
    public render() {
        switch (this.props.inputMode) {
            case InputMode.KeyboardAndMouse:
                return this.renderButtons();
            case InputMode.Touchscreen:
                return this.renderTouch();
            case InputMode.Gamepad:
                return this.renderGamepad();
        }
    }

    private renderButtons() {
        let words = this.props.text.systems.helm;
        let iconSize = "1.5em";
        let overallSpeed = this.magnitude(this.props.translationRateX, this.props.translationRateY, this.props.translationRateForward);

        return <div className="system helm helm--buttonInput">
            <FieldGroup
                label={words.info}
                className="fieldGroup--3x1 fieldGroup--unpadded"
            >
                <div className="readout">
                    <div className="readout--label">{words.heading}</div>
                    <span className="readout--value">{this.radToDeg(this.props.yaw)}</span>&nbsp;{words.mark}&nbsp;<span className="readout--value">{this.radToDeg(this.props.pitch)}</span>
                    <div className="readout__smaller">{words.roll}&nbsp;<span className="readout--value">{this.radToDeg(this.props.roll)}</span>&deg;</div>
                </div>

                <Canvas className="readout" draw={ctx => this.drawOrientation(ctx, 90, 90)} width={90} height={90} />

                <div className="readout">
                    <div className="readout--label">{words.speed}</div>
                    <span className="readout--value">{overallSpeed}</span> {words.metresPerSecond}
                </div>
            </FieldGroup>

            <FeedbackGroup
                label={words.forwardBackward}
                x={this.props.translationRateForward / this.props.translationRateForwardMax}
                xMin={-this.props.translationRateReverseMax / this.props.translationRateForwardMax}
                className="fieldGroup--3x1"
            >
                <HeldButton text={words.moveBackward} color={ButtonColor.Quaternary} hotkey="control" pressCommand="+moveBackward" releaseCommand="-moveBackward" />
                <HeldButton text={words.speedStop} color={ButtonColor.Primary} hotkey="shift" pressCommand="+forwardBackStop" releaseCommand="-forwardBackStop" />
                <HeldButton text={words.moveForward} color={ButtonColor.Quaternary} hotkey="space" pressCommand="+moveForward" releaseCommand="-moveForward" />
            </FeedbackGroup>

            <FeedbackGroup
                label={words.rotation}
                x={this.props.yawRate / this.props.yawRateMax}
                y={this.props.pitchRate / this.props.pitchRateMax}
                className="fieldGroup--3x3"
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
                className="fieldGroup--3x3"
            >
                <HeldButton className="fieldGroup--3x3__topMid" icon={Icon.ArrowUp} iconSize={iconSize} title={words.strafeUp} color={ButtonColor.Tertiary} hotkey="I" pressCommand="+strafeUp" releaseCommand="-strafeUp" />
                <HeldButton className="fieldGroup--3x3__botMid" icon={Icon.ArrowDown} iconSize={iconSize} title={words.strafeDown} color={ButtonColor.Tertiary} hotkey="," pressCommand="+strafeDown" releaseCommand="-strafeDown" />
                <HeldButton className="fieldGroup--3x3__midLeft" icon={Icon.ArrowLeft} iconSize={iconSize} title={words.strafeLeft} color={ButtonColor.Tertiary} hotkey="J" pressCommand="+strafeLeft" releaseCommand="-strafeLeft" />
                <HeldButton className="fieldGroup--3x3__midRight" icon={Icon.ArrowRight} iconSize={iconSize} title={words.strafeRight} color={ButtonColor.Tertiary} hotkey="L" pressCommand="+strafeRight" releaseCommand="-strafeRight" />
                <HeldButton className="fieldGroup--3x3__center" icon={Icon.X} iconSize={iconSize} title={words.strafeStop} color={ButtonColor.Primary} hotkey="K" pressCommand="+strafeStop" releaseCommand="-strafeStop" />
            </FeedbackGroup>
        </div>;
    }
    
    private renderTouch() {
        let words = this.props.text.systems.helm;
        
        return <div className="system helm helm--touchInput">
            This is the helm system. TODO: implement this!
        </div>;
    }

    private renderGamepad() {
        let words = this.props.text.systems.helm;
        
        return <div className="system helm helm--gamepadInput">
            This is the helm system. TODO: implement this!
        </div>;
    }

    private drawOrientation(ctx: CanvasRenderingContext2D, width: number, height: number) {
        let halfWidth = width / 2, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.translate(halfWidth, halfHeight);
        ctx.fillStyle = '#0c0';
        orientation.draw(ctx, halfHeight * 0.6, this.props.pitch, this.props.yaw, -this.props.roll);
        ctx.translate(-halfWidth, -halfHeight);
    }

    private radToDeg(val: number) {
        val = Math.round((val + Math.PI) * 180 / Math.PI);
        if (val >= 360) {
            val -= 360;
        }
        return val;
    }

    private magnitude(x: number, y: number, z: number) {
        return Math.round(Math.sqrt(x * x + y * y + z * z));
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => HelmProps = (state) => {
    return {
        ...state.helm,
        text: state.user.text,
        inputMode: state.user.inputMode,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Helm);