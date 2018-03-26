import * as React from 'react';
import { Icon, Panel } from '~/components/general';
import { TextLocalisation } from '~/functionality';
import { JumpPath } from '~/functionality/sensors';

interface JumpCountdownProps {
    text: TextLocalisation;
    path?: JumpPath;
    endTime?: Date;
}

interface JumpCountdownState {
    secondsLeft: number;
}

export class JumpCountdown extends React.PureComponent<JumpCountdownProps, JumpCountdownState> {
    private timer: number;
    constructor(props: JumpCountdownProps) {
        super(props);

        this.state = {
            secondsLeft: this.determineSecondsLeft(),
        }
    }
    componentWillMount() {
        this.timer = setInterval(() => this.updateTimer(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        let words = this.props.text.systems.warp;

        return <Panel className="warp__jumpCountdown">
            {words.eta} <span className="countdown__number">{this.state.secondsLeft}</span> {words.seconds}
        </Panel>;
    }
    private updateTimer() {
        this.setState({
            secondsLeft: this.determineSecondsLeft(),
        });
    }
    private determineSecondsLeft() {
        let seconds: number;
        if (this.props.endTime === undefined) {
            return 0;
        }

        let ms = this.props.endTime.getTime() - new Date().getTime();
        return Math.round(ms / 1000);
    }
}