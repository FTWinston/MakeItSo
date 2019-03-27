import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { PushButton, ButtonColor } from '~/components/general';
import { TargetingFace, TargetingSolutionType, TargetingDifficulty } from './store';
import './TargetOverview.scss';
import { TargetDisplay } from '../sensors/TargetDisplay';
import { SolutionInfo } from './SolutionInfo';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    currentlyFacing: TargetingFace;
    solutionType: TargetingSolutionType;
    baseDifficulty: TargetingDifficulty;
    bestFacing: TargetingFace;
    backClicked: () => void;
}

export class TargetFiringOverview extends React.PureComponent<IProps, {}> {
    public render() {
        const goBack = () => this.props.backClicked();
        
        const target = this.props.target;
        const type = TargetDisplay.getTypeName(target.type, this.props.text);

        const words = this.props.text.systems.weapons;

        const currentlyFacingName = SolutionInfo.getFaceName(this.props.currentlyFacing, this.props.text);
        const bestFacingName = SolutionInfo.getFaceName(this.props.bestFacing, this.props.text);
        const solutionName = SolutionInfo.getSolutionNameAndDesc(this.props.solutionType, this.props.text).name;
        

        let facingClasses = 'targetOverview__value targetOverview__facingVal';
        if (this.props.bestFacing === this.props.currentlyFacing) {
            facingClasses += ' targetOverview__facingVal--best';
        }
        else if (this.props.bestFacing === -this.props.currentlyFacing) {
            facingClasses += ' targetOverview__facingVal--worst';
        }

        return <div className="weapons__targetOverview targetOverview targetOverview--firing">
            <div className="targetOverview__field">
                <span className="targetOverview__label">{type}</span>: <span className="targetOverview__id targetOverview__value">{target.id}</span>
            </div>

            <div className="targetOverview__field">
                <span className="targetOverview__label">{words.solution}</span> <span className="targetOverview__id targetOverview__value">{solutionName}</span>
            </div>

            <div className="targetOverview__field">
                <span className="targetOverview__label">{words.facingPrefix}</span> <span className={facingClasses}>{bestFacingName}</span>
            </div>

            <div className="targetOverview__field">
                <span className="targetOverview__label">{words.currentlyFacingPrefix}</span> <span className="targetOverview__value">{currentlyFacingName}</span>
            </div>

            <div className="targetOverview__actions">
                <PushButton clicked={goBack} text={words.changeSolution} color={ButtonColor.Quaternary} />
            </div>
        </div>
    }
}