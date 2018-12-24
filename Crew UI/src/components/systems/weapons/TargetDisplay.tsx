import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { PushButton } from '~/components/general';
import { ButtonColor } from '~/components/general/buttons/Button';
import { TargetingSolution } from './store';
import { SolutionInfo } from './SolutionInfo';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    solution?: TargetingSolution;
    deselectTarget: () => void;
    deselectSolution?: () => void;
}

export class TargetDisplay extends React.PureComponent<IProps, {}> {
    public render() {
        const goBack = () => this.props.deselectTarget();
        
        const solution = this.props.solution === undefined
            ? undefined
            : <SolutionInfo text={this.props.text} solution={this.props.solution} />

        const clearSolution = this.props.deselectSolution === undefined
            ? undefined
            : <PushButton clicked={() => this.props.deselectSolution!()} text={this.props.text.common.cancel} color={ButtonColor.Quandry} />

        return <div className="weapons__targetDisplay">
            TODO: implement

            Target info: TODO.

            {solution}
            
            {clearSolution}
            <PushButton clicked={goBack} text={this.props.text.common.goBack} color={ButtonColor.Quaternary} />
        </div>
    }
}