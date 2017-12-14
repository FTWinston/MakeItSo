import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation, InputMode } from '../../../functionality';
import { Choice, ButtonSet, HeldButton, Icon, ToggleButton, PushButton, ButtonColor }  from '../../general';
import { HelmState as HelmBaseProps } from '../../../store/Helm';
import { FeedbackGroup } from './FeedbackGroup';
import './Helm.scss';

interface HelmProps extends HelmBaseProps {
    text: TextLocalisation;
    inputMode: InputMode;
}

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

        return <div className="system helm helm--buttonInput">
            <FeedbackGroup
                label={words.rotation}
                x={this.props.yawRate / this.props.yawRateMax}
                y={this.props.pitchRate / this.props.pitchRateMax}
                threeByThree={true}
            >
                <HeldButton className="feedbackGroup--3x3__topMid" icon={Icon.ArrowUp} iconSize={iconSize} title={words.rotateUp} color={ButtonColor.Secondary} hotkey="W" pressCommand="+pitchUp" releaseCommand="-pitchUp" />
                <HeldButton className="feedbackGroup--3x3__botMid" icon={Icon.ArrowDown} iconSize={iconSize} title={words.rotateDown} color={ButtonColor.Secondary} hotkey="X" pressCommand="+pitchDown" releaseCommand="-pitchDown" />
                <HeldButton className="feedbackGroup--3x3__midLeft" icon={Icon.ArrowLeft} iconSize={iconSize} title={words.rotateLeft} color={ButtonColor.Secondary} hotkey="A" pressCommand="+yawLeft" releaseCommand="-yawLeft" />
                <HeldButton className="feedbackGroup--3x3__midRight" icon={Icon.ArrowRight} iconSize={iconSize} title={words.rotateRight} color={ButtonColor.Secondary} hotkey="D" pressCommand="+yawRight" releaseCommand="-yawRight" />
                <HeldButton className="feedbackGroup--3x3__topLeft" noBorder={true} icon={Icon.RotateCCW} iconSize={iconSize} title={words.rotateLeft} color={ButtonColor.Secondary} hotkey="Q" pressCommand="+rollLeft" releaseCommand="-rollLeft" />
                <HeldButton className="feedbackGroup--3x3__topRight" noBorder={true} icon={Icon.RotateCW} iconSize={iconSize} title={words.rotateRight} color={ButtonColor.Secondary} hotkey="E" pressCommand="+rollRight" releaseCommand="-rollRight" />
                <HeldButton className="feedbackGroup--3x3__center" icon={Icon.X} iconSize={iconSize} title={words.rotateStop} color={ButtonColor.Primary} hotkey="S" pressCommand="+rotStop" releaseCommand="-rotStop" />
            </FeedbackGroup>
            
            <FeedbackGroup
                label={words.strafe}
                x={this.props.translationRateX / this.props.translationRateXMax}
                y={this.props.translationRateY / this.props.translationRateYMax}
                threeByThree={true}
            >
                <HeldButton className="feedbackGroup--3x3__topMid" icon={Icon.ArrowUp} iconSize={iconSize} title={words.strafeUp} color={ButtonColor.Tertiary} hotkey="I" pressCommand="+strafeUp" releaseCommand="-strafeUp" />
                <HeldButton className="feedbackGroup--3x3__botMid" icon={Icon.ArrowDown} iconSize={iconSize} title={words.strafeDown} color={ButtonColor.Tertiary} hotkey="," pressCommand="+strafeDown" releaseCommand="-strafeDown" />
                <HeldButton className="feedbackGroup--3x3__midLeft" icon={Icon.ArrowLeft} iconSize={iconSize} title={words.strafeLeft} color={ButtonColor.Tertiary} hotkey="J" pressCommand="+strafeLeft" releaseCommand="-strafeLeft" />
                <HeldButton className="feedbackGroup--3x3__midRight" icon={Icon.ArrowRight} iconSize={iconSize} title={words.strafeRight} color={ButtonColor.Tertiary} hotkey="L" pressCommand="+strafeRight" releaseCommand="-strafeRight" />
                <HeldButton className="feedbackGroup--3x3__center" icon={Icon.X} iconSize={iconSize} title={words.strafeStop} color={ButtonColor.Primary} hotkey="K" pressCommand="+strafeStop" releaseCommand="-strafeStop" />
            </FeedbackGroup>

            <FeedbackGroup
                label={words.speed}
                x={this.props.translationRateForward / this.props.translationRateForwardMax}
                xMin={-this.props.translationRateReverseMax / this.props.translationRateForwardMax}
                threeByOne={true}
            >
                <HeldButton className="feedbackGroup--3x1__left" text={words.moveBackward} color={ButtonColor.Quaternary} hotkey="control" pressCommand="+moveBackward" releaseCommand="-moveBackward" />
                <HeldButton className="feedbackGroup--3x1__mid" text={words.speedStop} color={ButtonColor.Primary} hotkey="shift" pressCommand="+forwardBackStop" releaseCommand="-forwardBackStop" />
                <HeldButton className="feedbackGroup--3x1__right" text={words.moveForward} color={ButtonColor.Quaternary} hotkey="space" pressCommand="+moveForward" releaseCommand="-moveForward" />
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