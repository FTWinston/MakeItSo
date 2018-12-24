import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { TargetingSolution } from './store';
import { SolutionListItem } from './SolutionListItem';

interface IProps {
    text: TextLocalisation;
    solutions: TargetingSolution[];
    select: (solution: TargetingSolution) => void;
}

export class SolutionList extends React.PureComponent<IProps, {}> {
    public render() {
        const items = this.props.solutions.map((item, index) => {
            const select = () => this.props.select(item);
            return <SolutionListItem
                text={this.props.text}
                solution={item}
                select={select}
                key={index}
            />
        });

        return <div className="weapons__solutionList">
            {items}
        </div>
    }
}