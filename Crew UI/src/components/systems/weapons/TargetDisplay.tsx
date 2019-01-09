import * as React from 'react';
import { SensorTarget, TextLocalisation, OrientationCube, Vector3, Rotator } from '~/functionality';
import { PushButton, FlexibleCanvas } from '~/components/general';
import { ButtonColor } from '~/components/general/buttons/Button';
import { TargetingSolution, TargetingFace } from './store';
import { SolutionInfo } from './SolutionInfo';
import { TargetInfo } from '../sensors/TargetInfo';
import { RadarView } from '~/components/general/RadarView';
import './TargetDisplay.scss';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    solution?: TargetingSolution;
    currentlyFacing: TargetingFace;
    deselectTarget: () => void;
    deselectSolution?: () => void;
    relPitch: number;
    relYaw: number;
    relRoll: number;
    shipPosition: Vector3;
    shipOrientation: Rotator;
}

export class TargetDisplay extends React.PureComponent<IProps, {}> {
    private cube: OrientationCube = new OrientationCube();

    public render() {
        const goBack = () => this.props.deselectTarget();
        
        const target = <TargetInfo
            target={this.props.target}
            text={this.props.text}
            className="targetDisplay__info"
        />

        const solution = this.props.solution === undefined
            ? <SolutionInfo
                text={this.props.text}
                className="targetDisplay__solution"
                currentlyFacing={this.props.currentlyFacing}
                showCurrentlyFacing={true}
            />
            : <SolutionInfo
                text={this.props.text}
                solutionType={this.props.solution.type}
                bestFacing={this.props.solution.bestFacing}
                baseDifficulty={this.props.solution.difficulty}
                className="targetDisplay__solution"
                currentlyFacing={this.props.currentlyFacing}
                showCurrentlyFacing={true}
            />

        const clearSolution = this.props.deselectSolution === undefined
            ? undefined
            : <PushButton clicked={() => this.props.deselectSolution!()} text={this.props.text.systems.weapons.changeSolution} color={ButtonColor.Quandry} />

        const cubeRadius = 100; // TODO: could this be calculated?

        return <div className="weapons__targetDisplay targetDisplay">
            {target}

            {solution}
            
            <div className="targetDisplay__graphics">
                <FlexibleCanvas
                    draw={(ctx, w, h) => this.cube.draw(ctx, cubeRadius, this.props.relPitch, this.props.relYaw, this.props.relRoll)}
                    className="targetDisplay__orientation"
                />

                <RadarView
                    maxTargetingAngleRadians={2}
                    shipOrientation={this.props.shipOrientation}
                    shipPosition={this.props.shipPosition}
                    targets={[this.props.target]}
                    className="targetDisplay__position"
                />
            </div>
            
            <div className="targetDisplay__actions">
                {clearSolution}
                <PushButton clicked={goBack} text={this.props.text.systems.weapons.changeTarget} color={ButtonColor.Quaternary} />
            </div>
        </div>
    }
}