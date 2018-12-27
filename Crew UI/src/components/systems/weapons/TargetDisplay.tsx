import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { PushButton } from '~/components/general';
import { ButtonColor } from '~/components/general/buttons/Button';
import { TargetingSolution, TargetingFace } from './store';
import { SolutionInfo } from './SolutionInfo';
import { TargetInfo } from '../sensors/TargetInfo';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    solution?: TargetingSolution;
    currentlyFacing: TargetingFace;
    deselectTarget: () => void;
    deselectSolution?: () => void;
}

export class TargetDisplay extends React.PureComponent<IProps, {}> {
    public render() {
        const goBack = () => this.props.deselectTarget();
        
        const target = <TargetInfo
            target={this.props.target}
            text={this.props.text}
        />

        const solution = this.props.solution === undefined
            ? <div className="weapons__solutionPrompt">{this.props.text.systems.weapons.solutionPrompt}</div>
            : <SolutionInfo
                text={this.props.text}
                solutionType={this.props.solution.type}
                bestFacing={this.props.solution.bestFacing}
                baseDifficulty={this.props.solution.difficulty}
                className="weapons__solutionDisplay"
                currentlyFacing={this.props.currentlyFacing}
                showCurrentlyFacing={true}
            />

        const clearSolution = this.props.deselectSolution === undefined
            ? undefined
            : <PushButton clicked={() => this.props.deselectSolution!()} text={this.props.text.systems.weapons.changeSolution} color={ButtonColor.Quandry} />

        return <div className="weapons__targetDisplay">
            {target}

            {solution}
            
            {clearSolution}
            <PushButton clicked={goBack} text={this.props.text.systems.weapons.changeTarget} color={ButtonColor.Quaternary} />
        </div>
    }
}