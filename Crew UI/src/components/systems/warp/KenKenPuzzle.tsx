
import * as React from 'react';
import './KenKenPuzzle.scss';
import { Operator } from './store';
import { KenKenCell } from './KenKenCell';

interface IProps {
    className?: string;
    size: number;
    values: number[];
    cellGroups: number[];
    groupTargets: number[];
    groupOperators: Operator[];
    groupValidity?: boolean[];
    cellClicked?: (cellIndex: number, value: number) => void;
}

export class KenKenPuzzle extends React.PureComponent<IProps, {}> {
    public render() {
        const classes = this.determineClasses();

        const renderedGroups: number[] = [];

        const cells = this.props.values.map((val, index) => {
            const groupNum = this.props.cellGroups[index];

            let thickTop, thickLeft;
            
            if (index < this.props.size) {
                thickTop = true;
            }
            else {
                const upGroupNum = this.props.cellGroups[index - this.props.size];
                thickTop = upGroupNum !== groupNum;
            }

            if (index % this.props.size === 0) {
                thickLeft = true;
            }
            else {
                const leftGroupNum = this.props.cellGroups[index - 1];
                thickLeft = leftGroupNum !== groupNum;
            }

            let operator: Operator | undefined;
            let target: number | undefined;

            // write the target in the "first" cell of the group
            if (renderedGroups.indexOf(groupNum) === -1) {
                // for a single-cell group, hide the operator
                const actualOperator = this.props.groupOperators[groupNum];
                const isSingleGroup = actualOperator === Operator.Add && thickLeft && thickTop && this.props.cellGroups.filter(g => g === groupNum).length <= 1;

                if (!isSingleGroup) {
                    operator = actualOperator;
                }

                target = this.props.groupTargets[groupNum];
                renderedGroups.push(groupNum);
            }

            return <KenKenCell
                value={val}
                key={index}
                operator={operator}
                target={target}
                thickTopBorder={thickTop}
                thickLeftBorder={thickLeft}
            />
        });

        return <div className={classes}>
            {cells}
        </div>
    }

    private determineClasses() {
        let classes = 'kenken';

        classes += ` kenken--size${this.props.size}`;

        if (this.props.cellClicked !== undefined) {
            classes += ' kenken--editable';
        }

        if (this.props.groupValidity !== undefined) {
            classes += ' kenken--results';
        }

        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        return classes;
    }
}