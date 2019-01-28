import * as React from 'react';
import { SensorTarget, TextLocalisation, OrientationCube, Vector3, Rotator } from '~/functionality';
import { PushButton, FlexibleCanvas, ButtonColor } from '~/components/general';
import { TargetingFace } from './store';
import { TargetInfo } from '../sensors/TargetInfo';
import { RadarView } from '~/components/general/RadarView';
import './TargetDisplay.scss';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    currentlyFacing: TargetingFace;
    deselectTarget: () => void;
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

        // TODO: show this.props.currentlyFacing somewhere

        const cubeRadius = 100; // TODO: could this be calculated?

        return <div className="weapons__targetDisplay targetDisplay">
            {target}
            
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
                <PushButton clicked={goBack} text={this.props.text.systems.weapons.changeTarget} color={ButtonColor.Quaternary} />
            </div>
        </div>
    }
}