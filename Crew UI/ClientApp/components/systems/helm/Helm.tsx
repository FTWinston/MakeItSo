import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { TextLocalisation, InputMode } from '../../../functionality';
import { Choice, ButtonSet, HeldButton, ToggleButton, PushButton, ButtonColor }  from '../../general';
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
                <ButtonSet vertical={true}>
                    <ButtonSet color={ButtonColor.Secondary}>
                        <div className="spacer" />
                        <HeldButton text={words.up} hotkey="W" />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Secondary}>
                        <HeldButton text={words.left} hotkey="A" />
                        <HeldButton text={words.down} hotkey="S" />
                        <HeldButton text={words.right} hotkey="D" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Secondary}>
                        <div className="spacer" />
                        <PushButton text={words.stop} hotkey="X" color={ButtonColor.Primary} />
                        <div className="spacer" />
                    </ButtonSet>
                </ButtonSet>
            </FeedbackGroup>
            
            <FeedbackGroup
                label={words.translation}
                x={this.props.translationRateX / this.props.translationRateXMax}
                y={this.props.translationRateY / this.props.translationRateYMax}
            >
                <ButtonSet vertical={true}>
                    <ButtonSet color={ButtonColor.Quaternary}>
                        <div className="spacer" />
                        <HeldButton text={words.up} hotkey="I" />
                        <div className="spacer" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Quaternary}>
                        <HeldButton text={words.left} hotkey="J" />
                        <HeldButton text={words.down} hotkey="K" />
                        <HeldButton text={words.right} hotkey="L" />
                    </ButtonSet>
                    <ButtonSet color={ButtonColor.Quaternary}>
                        <div className="spacer" />
                        <PushButton text={words.stop} hotkey="M" color={ButtonColor.Primary} />
                        <div className="spacer" />
                    </ButtonSet>
                </ButtonSet>
            </FeedbackGroup>

            <fieldset className="helm--buttonInput__speed">
                <legend>{words.speed}</legend>
                <Choice color={ButtonColor.Tertiary} allowUnselected={true}>
                    <ToggleButton text={words.speedBackHalf} hotkey="1" />
                    <ToggleButton text={words.speedBackQuarter} hotkey="2" />
                    <ToggleButton text={words.stop} hotkey="3" color={ButtonColor.Primary} />
                    <ToggleButton text={words.speedQuarter} hotkey="4" />
                    <ToggleButton text={words.speedHalf} hotkey="5" />
                    <ToggleButton text={words.speedThreeQuarter} hotkey="6" />
                    <ToggleButton text={words.speedFull} hotkey="7" />
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