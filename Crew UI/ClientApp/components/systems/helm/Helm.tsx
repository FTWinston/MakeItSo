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

        return <div className="system helm helm--buttonInput">
            <FeedbackGroup
                label={words.rotation}
                x={this.props.yawRate / this.props.yawRateMax}
                y={this.props.pitchRate / this.props.pitchRateMax}
            >
                <HeldButton className="feedbackGroup__topMid" icon={Icon.ArrowUp} title={words.rotateUp} color={ButtonColor.Secondary} hotkey="W" pressCommand="+pitchUp" releaseCommand="-pitchUp" />
                <HeldButton className="feedbackGroup__botMid" icon={Icon.ArrowDown} title={words.rotateDown} color={ButtonColor.Secondary} hotkey="S" pressCommand="+pitchDown" releaseCommand="-pitchDown" />
                <HeldButton className="feedbackGroup__midLeft" icon={Icon.ArrowLeft} title={words.rotateLeft} color={ButtonColor.Secondary} hotkey="A" pressCommand="+yawLeft" releaseCommand="-yawLeft" />
                <HeldButton className="feedbackGroup__midRight" icon={Icon.ArrowRight} title={words.rotateRight} color={ButtonColor.Secondary} hotkey="D" pressCommand="+yawRight" releaseCommand="-yawRight" />
                <HeldButton className="feedbackGroup__center" icon={Icon.X} title={words.rotateStop} color={ButtonColor.Primary} hotkey="X" pressCommand="+rotStop" releaseCommand="-rotStop" />
            </FeedbackGroup>
            
            <FeedbackGroup
                label={words.translation}
                x={this.props.translationRateX / this.props.translationRateXMax}
                y={this.props.translationRateY / this.props.translationRateYMax}
            >
                <HeldButton className="feedbackGroup__topMid" text={words.up} color={ButtonColor.Quaternary} hotkey="I" pressCommand="+strafeUp" releaseCommand="-strafeUp" />
                <HeldButton className="feedbackGroup__botMid" text={words.down} color={ButtonColor.Quaternary} hotkey="K" pressCommand="+strafeDown" releaseCommand="-strafeDown" />
                <HeldButton className="feedbackGroup__midLeft" text={words.left} color={ButtonColor.Quaternary} hotkey="J" pressCommand="+strafeLeft" releaseCommand="-strafeLeft" />
                <HeldButton className="feedbackGroup__midRight" text={words.right} color={ButtonColor.Quaternary} hotkey="L" pressCommand="+strafeRight" releaseCommand="-strafeRight" />
                <HeldButton className="feedbackGroup__center" text={words.stop} color={ButtonColor.Primary} hotkey="M" pressCommand="+strafeStop" releaseCommand="-strafeStop" />
            </FeedbackGroup>

            <fieldset className="helm--buttonInput__speed">
                <legend>{words.speed}</legend>
                <Choice color={ButtonColor.Tertiary} allowUnselected={true}>
                    <ToggleButton text={words.speedBackHalf} hotkey="1" activateCommand="speed -2" />
                    <ToggleButton text={words.speedBackQuarter} hotkey="2" activateCommand="speed -1" />
                    <ToggleButton text={words.stop} hotkey="3" color={ButtonColor.Primary} activateCommand="speed 0" />
                    <ToggleButton text={words.speedQuarter} hotkey="4" activateCommand="speed 1" />
                    <ToggleButton text={words.speedHalf} hotkey="5" activateCommand="speed 2" />
                    <ToggleButton text={words.speedThreeQuarter} hotkey="6" activateCommand="speed 3" />
                    <ToggleButton text={words.speedFull} hotkey="7" activateCommand="speed 4" />
                </Choice>
            </fieldset>
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