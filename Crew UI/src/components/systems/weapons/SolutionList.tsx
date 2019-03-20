import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { ITargetingSolution, TargetingFace } from './store';
import { SolutionListItem } from './SolutionListItem';

interface IProps {
    className?: string;
    text: TextLocalisation;
    solutions: ITargetingSolution[];
    currentlyFacing: TargetingFace;
    solutionSelected: (solution: ITargetingSolution) => void;
}

export class SolutionList extends React.PureComponent<IProps, {}> {
    public render() {
        const items = this.props.solutions.map((sol, index) => {
            const selected = () => this.props.solutionSelected(sol);

            return <SolutionListItem
                text={this.props.text}
                solutionType={sol.type}
                bestFacing={sol.bestFacing}
                baseDifficulty={sol.difficulty}
                currentlyFacing={this.props.currentlyFacing}
                polygonsByFace={sol.polygonsByFace}
                key={index}
                selected={selected}
                className="weapons__solutionListItem"
            />
        });

        const classes = this.props.className === undefined
            ? 'weapons__solutionList'
            : 'weapons__solutionList ' + this.props.className;

        return <div className={classes}>
            {items}
        </div>
    }
}