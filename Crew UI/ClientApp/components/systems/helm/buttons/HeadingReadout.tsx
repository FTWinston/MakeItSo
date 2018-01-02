import * as React from 'react';
import { Helm } from '../Helm';
import { TextLocalisation } from '../../../../functionality';

interface HeadingProps {
    text: TextLocalisation;
    pitch: number;
    yaw: number;
    roll: number;
}

export class HeadingReadout extends React.PureComponent<HeadingProps, {}> {
    render() {
        let words = this.props.text.systems.helm;

        return <div className="readout">
            <div className="readout--label">{words.heading}</div>
            <span className="readout--value">{Helm.clamp(this.props.yaw)}</span>&nbsp;{words.mark}&nbsp;<span className="readout--value">{Helm.clamp(this.props.pitch)}</span>
            <div className="readout__smaller">{words.roll}&nbsp;<span className="readout--value">{Helm.clamp(this.props.roll)}</span>&deg;</div>
        </div>;
    }
}