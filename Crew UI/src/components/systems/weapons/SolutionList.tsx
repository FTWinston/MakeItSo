import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { TargetingSolution } from './store';

interface IProps {
    text: TextLocalisation;
    solutions: TargetingSolution[];
    select: (solution: TargetingSolution) => void;
}

export class SolutionList extends React.PureComponent<IProps, {}> {
    public render() {
        return <div className="weapons__solutionList">
            TODO: targeting solution list
        </div>
    }
}