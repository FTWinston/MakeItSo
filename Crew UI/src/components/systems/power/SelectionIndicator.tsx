import * as React from 'react';
import './SelectionIndicator.scss';
import { TextLocalisation } from '~/functionality';

interface IProps {
    className?: string;
    text: TextLocalisation;
    queueSize: number;
    selected?: () => void;
}

export class SelectionIndicator extends React.PureComponent<IProps, {}> {
    public render() {
        let classes = 'powerSelectionIndicator';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        const selected = this.props.selected !== undefined
            ? () => this.props.selected!()
            : undefined;

        return <div className={classes} onClick={selected}>
            <div className="powerSelectionIndicator__queueSize">{this.props.queueSize}</div>
            <div className="powerSelectionIndicator__label">{this.props.text.systems.power.pickCards}</div>
        </div>
    }
}