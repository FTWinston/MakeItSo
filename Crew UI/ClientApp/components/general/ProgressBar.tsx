import * as React from 'react';
import './ProgressBar.scss';

interface IProgressBarProps {
    value: number;
    maxValue: number;
}

export class ProgressBar extends React.PureComponent<IProgressBarProps, {}> {
    render() {
        let percent = Math.round(100 * this.props.value / this.props.maxValue);
        let percentStyle = {width: percent + '%'};
        return (
            <div className="progressBar">
                <div className="progressBar__indicator" style={percentStyle}>{percent}%</div>
            </div>
        )
    }
}