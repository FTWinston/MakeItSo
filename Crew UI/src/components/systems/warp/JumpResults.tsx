import * as React from 'react';
import { TextLocalisation, Vector3 } from '~/functionality';
import { Coordinate } from '~/components/general';

interface IProps {
    text: TextLocalisation;
    targetPosition: Vector3;
    eta: Date;
    puzzleRowValidity?: boolean[];
    puzzleColValidity?: boolean[];
    puzzleGroupValidity?: boolean[];
}

interface IState {
    secondsRemaining: number;
}

export class JumpResults extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            secondsRemaining: Math.round((props.eta.getTime() - new Date().getTime()) / 1000),
        }
    }

    private interval?: NodeJS.Timer;

    componentDidMount() {
        this.interval = setInterval(() => this.tickCountdown(), 1000);
    }

    componentWillUnmount() {
        if (this.interval !== undefined) {
            clearTimeout(this.interval);
            this.interval = undefined;
        }
    }

    private tickCountdown() {
        this.setState({
            secondsRemaining: Math.max(0, this.state.secondsRemaining - 1),
        });
    }

    public render() {
        const words = this.props.text.systems.warp;

        const valid = this.props.puzzleRowValidity !== undefined
        && this.props.puzzleRowValidity.every(v => v)
        && this.props.puzzleColValidity !== undefined
        && this.props.puzzleColValidity.every(v => v)
        && this.props.puzzleGroupValidity !== undefined
        && this.props.puzzleGroupValidity.every(v => v)

        return <div className="warp__toolbar">
            <p>
                {words.jumpingTo} <Coordinate className="warp__toCoords" pos={this.props.targetPosition} />.
            </p>

            <p className={valid ? 'warp__jumpResult warp__jumpResult--valid' : 'warp__jumpResult warp__jumpResult--invalid'}>
                {valid ? words.jumpValid : words.jumpInvalid}
            </p>
            
            <div>
                {words.eta}:
                <div className="warp__eta">
                    {this.state.secondsRemaining} {words.seconds}
                </div>
            </div>
        </div>
    }
}