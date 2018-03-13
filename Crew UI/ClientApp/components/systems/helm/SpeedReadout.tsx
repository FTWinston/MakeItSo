import * as React from 'react';
import { Helm } from './Helm';
import { TextLocalisation } from '~/functionality';

interface SpeedProps {
    text: TextLocalisation;
    forwardSpeed: number;
    horizontalSideSpeed: number;
    verticalSideSpeed: number;
}

export class SpeedReadout extends React.PureComponent<SpeedProps, {}> {
    render() {
        let words = this.props.text.systems.helm;
        let overallSpeed = Helm.magnitude(this.props.horizontalSideSpeed, this.props.verticalSideSpeed, this.props.forwardSpeed);

        return <div className="readout">
            <div className="readout--label">{words.speed}</div>
            <span className="readout--value">{overallSpeed}</span> {words.metresPerSecond}
        </div>;
    }
}