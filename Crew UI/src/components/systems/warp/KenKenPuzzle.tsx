
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

            let operator: Operator | undefined;
            let target: number | undefined;

            // write the target in the "first" cell of the group
            if (renderedGroups.indexOf(groupNum) === -1) {
                operator = this.props.groupOperators[groupNum];
                target = this.props.groupTargets[groupNum];
                renderedGroups.push(groupNum);
            }

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

            return <KenKenCell
                value={val}
                group={groupNum}
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