import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { ITargetingSolution, TargetingFace, ITargetingSymbol } from './store';
import { SolutionInfo } from './SolutionInfo';

interface IProps {
    className?: string;
    text: TextLocalisation;
    solutions: ITargetingSolution[];
    selectedSymbols: ITargetingSymbol[];
    currentlyFacing: TargetingFace;
}

export class SolutionList extends React.PureComponent<IProps, {}> {
    public render() {
        const items = this.props.solutions.map((sol, index) => {
            const numSelectedElements = 0; // TODO: calculate this based on selectedSymbols and sol.sequence

            return <SolutionInfo
                text={this.props.text}
                solutionType={sol.type}
                bestFacing={sol.bestFacing}
                baseDifficulty={sol.difficulty}
                fullSequence={sol.sequence}
                currentlyFacing={this.props.currentlyFacing}
                selectedElements={numSelectedElements}
                key={index}
                className="weapons__solutionListItem"
            />
        });

        const classes = this.props.className === undefined
            ? "weapons__solutionList"
            : "weapons__solutionList " + this.props.className;

        return <div className={classes}>
            {items}
        </div>
    }
}