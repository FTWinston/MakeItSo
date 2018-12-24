import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { TargetingSolution } from './store';
import { SolutionInfo } from './SolutionInfo';

interface IProps {
    text: TextLocalisation;
    solutions: TargetingSolution[];
    select: (solution: TargetingSolution) => void;
}

export class SolutionList extends React.PureComponent<IProps, {}> {
    public render() {
        const items = this.props.solutions.map((item, index) => {
            const select = () => this.props.select(item);
            return <SolutionInfo
                text={this.props.text}
                solution={item}
                select={select}
                key={index}
                className="weapons__solutionListItem"
            />
        });

        return <div className="weapons__solutionList">
            {items}
        </div>
    }
}