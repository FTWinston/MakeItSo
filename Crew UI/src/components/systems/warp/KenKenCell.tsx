
import * as React from 'react';
import './KenKenCell.scss';
import { Operator } from './store';

interface IProps {
    value: number;
    group: number;
    isValid?: boolean;
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

        return <div className={classes}>
            {display}
            {target}
        </div>
    }

    private determineClasses() {
        let classes = 'kenkenCell';

        classes += ` kenkenCell--group${this.props.group}`;

        if (this.props.isValid !== undefined) {
            classes += this.props.isValid
                ? ' kenkenCell--valid'
                : ' kenkenCell--invalid';
        }

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