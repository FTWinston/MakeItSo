import * as React from 'react';
import { ButtonColor, Field, Icon, Panel, ProgressBar, PushButton } from '~/components/general';
import { TextLocalisation } from '~/functionality';
import { JumpPath } from '~/functionality/sensors';

interface JumpCountdownProps {
    text: TextLocalisation;
    path?: JumpPath;
    endTime?: Date;
    jumping: boolean;
    completion: number;
    jump: () => void;
    cancel: () => void;
}

interface JumpCountdownState {
    secondsLeft: number;
}

export class JumpCountdown extends React.PureComponent<JumpCountdownProps, JumpCountdownState> {
    private timer: number;
    constructor(props: JumpCountdownProps) {
        super(props);

        this.timer = 0;
        if (props.jumping) {
            this.state = {
                secondsLeft: this.determineSecondsLeft(props),
            }
        }
        else {
            this.state = {
                secondsLeft: this.determineSecondsLeft(props),
            }
        }
    }

    componentWillMount() {
        if (this.props.jumping || this.props.completion !== 100) {
            this.timer = setInterval(() => this.updateTimer(), 1000);
        }
    }

    componentWillUpdate(nextProps: JumpCountdownProps, nextState: {}) {
        if (nextProps.jumping || this.props.completion !== 100) {
            this.setState({
                secondsLeft: this.determineSecondsLeft(nextProps),
            });
            if (this.timer === 0) {
                this.timer = setInterval(() => this.updateTimer(), 1000);
            }
        }
        else if (this.timer !== 0) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    componentWillUnmount() {
        if (this.timer !== 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        if (this.props.jumping) {
            return this.renderJumping();
        }
        else if (this.props.completion === 100) {
            return this.renderCharged();
        }
        else {
            return this.renderCharging();
        }
    }

    private renderCharging() {
        let words = this.props.text.systems.warp;

        let footerButtons = (
            <Field centered={true} displayAsRow={true}>
                <PushButton
                    color={ButtonColor.Quandry}
                    text={this.props.text.common.cancel}
                    clicked={() => this.props.cancel()}
                />
                <PushButton
                    color={ButtonColor.Quaternary}
                    text={words.jump}
                    disabled={true}
                />
            </Field>
        );

        return <Panel className="warp__jumpCountdown warp__jumpCountdown--charging" footer={footerButtons} headerText={words.charging}>
            <div>{words.readyTime} <span className="countdown__number">{this.state.secondsLeft}</span> {words.seconds}</div>
            <ProgressBar value={this.props.completion} maxValue={100} />
        </Panel>;
    }

    private renderCharged() {
        let words = this.props.text.systems.warp;
        
        let footerButtons = (
            <Field centered={true} displayAsRow={true}>
                <PushButton
                    color={ButtonColor.Quandry}
                    text={this.props.text.common.cancel}
                    clicked={() => this.props.cancel()}
                />
                <PushButton
                    color={ButtonColor.Quaternary}
                    text={words.jump}
                    clicked={() => this.props.jump()}
                />
            </Field>
        );

        return <Panel className="warp__jumpCountdown warp__jumpCountdown--charged" footer={footerButtons}>
            {words.readyToJump}
        </Panel>;
    }

    private renderJumping() {
        let words = this.props.text.systems.warp;

        return <Panel className="warp__jumpCountdown warp__jumpCountdown--jumping" headerText={words.jumpInProgress}>
            <div>{words.eta} <span className="countdown__number">{this.state.secondsLeft}</span> {words.seconds}</div>
        </Panel>;
    }

    private updateTimer() {
        this.setState({
            secondsLeft: this.determineSecondsLeft(this.props),
        });
    }

    private determineSecondsLeft(props: JumpCountdownProps) {
        let seconds: number;
        if (props.endTime === undefined) {
            return 0;
        }

        let ms = props.endTime.getTime() - new Date().getTime();
        return Math.round(ms / 1000);
    }
}