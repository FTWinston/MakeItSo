import * as React from 'react';
import './SelectionIndicator.scss';
import { TextLocalisation } from '~/functionality';
import { PushButton, ButtonColor } from '~/components/general';

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

        return <div className={classes}>
            <div className="powerSelectionIndicator__queueSize">{this.props.queueSize}</div>
            <PushButton
                className="powerSelectionIndicator__label"
                text={this.props.text.systems.power.pickCards}
                clicked={selected}
                color={ButtonColor.Primary}
            />
        </div>
    }
}