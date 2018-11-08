import * as React from 'react';
import './ProgressBar.scss';

interface IProgressBarProps {
    className?: string;
    value: number;
    maxValue: number;
    showNumber: boolean;
}

export class ProgressBar extends React.PureComponent<IProgressBarProps, {}> {
    render() {
        let classes = 'progressBar';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        const percentNumber = Math.round(100 * this.props.value / this.props.maxValue);

        let text;
        if (this.props.showNumber) {
            classes += ' progressBar--text';
            text = `${percentNumber}%`;
        }

        const percentStyle = {width: percentNumber + '%'};
        const indicator = this.props.showNumber || this.props.value > 0
            ? <div className="progressBar__indicator" style={percentStyle}>{text}</div>
            : undefined;

        return (
            <div className={classes}>
                {indicator}
                <div className="progressBar__remainder" />
            </div>
        )
    }
}