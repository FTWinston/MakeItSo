import * as React from 'react';
import { SensorTarget, TextLocalisation, OrientationCube } from '~/functionality';
import { PushButton, FlexibleCanvas, ButtonColor } from '~/components/general';
import { TargetingFace, ITargetingSolution, ITargetingSymbol } from './store';
import { TargetInfo } from '../sensors/TargetInfo';
import './TargetDisplay.scss';
import { SolutionList } from './SolutionList';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    currentlyFacing: TargetingFace;
    solutions: ITargetingSolution[];
    selectedSymbols: ITargetingSymbol[];
    deselectTarget: () => void;
    relPitch: number;
    relYaw: number;
    relRoll: number;
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

        // TODO: show this.props.currentlyFacing somewhere
        
        // TODO: show targeting solution list!

        const cubeRadius = 100; // TODO: could this be calculated?

        return <div className="weapons__targetDisplay targetDisplay">
            {target}
            
            <div className="targetDisplay__graphics">
                <FlexibleCanvas
                    draw={(ctx, w, h) => this.cube.draw(ctx, cubeRadius, this.props.relPitch, this.props.relYaw, this.props.relRoll)}
                    className="targetDisplay__orientation"
                />
            </div>

            <SolutionList
                className="targetDisplay__solutions"
                currentlyFacing={this.props.currentlyFacing}
                solutions={this.props.solutions}
                selectedSymbols={this.props.selectedSymbols}
                text={this.props.text}
            />
            
            <div className="targetDisplay__actions">
                <PushButton clicked={goBack} text={this.props.text.systems.weapons.changeTarget} color={ButtonColor.Quaternary} />
            </div>
        </div>
    }
}