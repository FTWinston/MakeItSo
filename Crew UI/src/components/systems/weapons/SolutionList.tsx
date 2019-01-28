import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { ITargetingSolution, TargetingFace } from './store';
import { SolutionInfo } from './SolutionInfo';

interface IProps {
    text: TextLocalisation;
    solutions: ITargetingSolution[];
    currentlyFacing: TargetingFace;
    select: (solutionIndex: number) => void;
}

export class SolutionList extends React.PureComponent<IProps, {}> {
    public render() {
        const items = this.props.solutions.map((item, index) => {
            const select = () => this.props.select(index);
            return <SolutionInfo
                text={this.props.text}
                solutionType={item.type}
                bestFacing={item.bestFacing}
                baseDifficulty={item.difficulty}
                select={select}
                key={index}
                currentlyFacing={this.props.currentlyFacing}
                showCurrentlyFacing={false}
                className="weapons__solutionListItem"
            />
        });

        return <div className="weapons__solutionList">
            {items}
        </div>
    }
}