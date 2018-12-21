
import * as React from 'react';
import './KenKenCell.scss';
import { Operator } from './store';

interface IProps {
    value: number;
    thickLeftBorder: boolean;
    thickTopBorder: boolean;

    rowValid: boolean;
    colValid: boolean;
    groupValid: boolean;

    clicked?: () => void;

    operator?: Operator;
    target?: number;
}

export class KenKenCell extends React.PureComponent<IProps, {}> {
    public render() {
        const classes = this.determineClasses();

        const display = this.props.value === 0 ? undefined : this.props.value;

        const target = this.props.target === undefined
            ? undefined
            : <div className="kenkenCell__target">
                {this.writeOperator(this.props.operator)}
                {this.props.target}
            </div>;

        return <div className={classes} onClick={this.props.clicked}>
            {display}
            {target}
        </div>
    }

    private determineClasses() {
        let classes = 'kenkenCell';

        if (!this.props.rowValid) {
            classes += ' kenkenCell--invalidRow';
        }
        if (!this.props.colValid) {
            classes += ' kenkenCell--invalidCol';
        }
        if (!this.props.groupValid) {
            classes += ' kenkenCell--invalidGroup';
        }

        classes += this.props.thickLeftBorder
            ? ' kenkenCell--thickLeft'
            : ' kenkenCell--thinLeft';

        classes += this.props.thickTopBorder
            ? ' kenkenCell--thickTop'
            : ' kenkenCell--thinTop';

        return classes;
    }

    private writeOperator(operator: Operator | undefined) {
        switch (operator) {
            case Operator.Add:
                return '+';
            case Operator.Subtract:
                return '-';
            case Operator.Multiply:
                return '×';
            case Operator.Divide:
                return '÷';
            default:
                return undefined;
        }
    }
}