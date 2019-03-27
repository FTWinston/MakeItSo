import * as React from 'react';
import { SensorTarget, TextLocalisation, OrientationCube } from '~/functionality';
import { PushButton, FlexibleCanvas, ButtonColor } from '~/components/general';
import { TargetingFace } from './store';
import './TargetOverview.scss';
import { TargetDisplay } from '../sensors/TargetDisplay';
import { SolutionInfo } from './SolutionInfo';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    currentlyFacing: TargetingFace;
    backClicked: () => void;
    relPitch?: number;
    relYaw?: number;
    relRoll?: number;
}

export class TargetOverview extends React.PureComponent<IProps, {}> {
    private cube: OrientationCube = new OrientationCube();

    public render() {
        const goBack = () => this.props.backClicked();
        
        const target = this.props.target;
        const type = TargetDisplay.getTypeName(target.type, this.props.text);

        const facingName = SolutionInfo.getFaceName(this.props.currentlyFacing, this.props.text);
        
        const cubeRadius = 100; // TODO: could this be calculated?

        const orientation = this.props.relPitch !== undefined && this.props.relYaw !== undefined && this.props.relRoll !== undefined
            ? <div className="targetOverview__graphics">
                <FlexibleCanvas
                    draw={(ctx, w, h) => this.cube.draw(ctx, cubeRadius, this.props.relPitch!, this.props.relYaw!, this.props.relRoll!)}
                    className="targetOverview__orientation"
                />
            </div>
            : undefined;

        return <div className="weapons__targetDisplay targetOverview">
            <div className="targetOverview__field">
                <span className="targetOverview__label">{type}</span>: <span className="targetOverview__id targetOverview__value">{target.id}</span>
            </div>

            <div className="targetOverview__field">
                <span className="targetOverview__label">{this.props.text.systems.weapons.currentlyFacingPrefix}</span> <span className="targetOverview__value">{facingName}</span>
            </div>

            {orientation}

            <div className="targetOverview__actions">
                <PushButton clicked={goBack} text={this.props.text.systems.weapons.changeTarget} color={ButtonColor.Quandry} />
            </div>
        </div>
    }
}