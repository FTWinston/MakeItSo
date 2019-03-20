import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { TargetingSolutionType, TargetingFace, TargetingDifficulty } from './store';

interface IProps {
    text: TextLocalisation;
    solutionType?: TargetingSolutionType;
    className?: string;
    baseDifficulty: TargetingDifficulty;
    currentlyFacing: TargetingFace;
    bestFacing?: TargetingFace;
}

export class SolutionInfo extends React.PureComponent<IProps> {
    public render() {
        const text = this.getSolutionNameAndDesc();

        let classes = 'solutionInfo';
        if (this.isVulnerability()) {
            classes += ' solutionInfo--vulnerability';
        }
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        const name = text === null
            ? undefined
            : <div className="solutionInfo__name">{text.name}</div>

        const desc = text === null
            ? <div className="solutionInfo__prompt">{this.props.text.systems.weapons.solutionPrompt}</div>
            : <div className="solutionInfo__desc">{text.desc}</div>

        let facingClasses = 'solutionInfo__value soluionInfo__facingVal';
        if (this.props.bestFacing === this.props.currentlyFacing) {
            facingClasses += ' soluionInfo__facingVal--best';
        }
        else if (this.props.bestFacing === -this.props.currentlyFacing) {
            facingClasses += ' soluionInfo__facingVal--worst';
        }

        const bestFacing = this.props.bestFacing === undefined
            ? undefined
            : <div className="solutionInfo__bestFacing">
                <span className="solutionInfo__label">{this.props.text.systems.weapons.facingPrefix}</span> <span className={facingClasses}>{this.getFacingName(this.props.bestFacing)}</span>
            </div>
            
        // TODO: render this.state.displayPolygon as a background thing if it isn't undefined. If it is.

        return <div className={classes}>
            {name}
            {desc}
            {bestFacing}
        </div>
    }

    private getSolutionNameAndDesc() {
        if (this.props.solutionType === undefined) {
            return null;
        }

        const solutions = this.props.text.systems.weapons.solutions;
        switch (this.props.solutionType) {
            case TargetingSolutionType.Misc:
                return solutions.misc;
            case TargetingSolutionType.Engines:
                return solutions.engines;
            case TargetingSolutionType.Warp:
                return solutions.warp;
            case TargetingSolutionType.Weapons:
                return solutions.weapons;
            case TargetingSolutionType.Sensors:
                return solutions.sensors;
            case TargetingSolutionType.PowerManagement:
                return solutions.power;
            case TargetingSolutionType.DamageControl:
                return solutions.damage;
            case TargetingSolutionType.Communications:
                return solutions.comms;
            case TargetingSolutionType.MiscVulnerability:
                return solutions.miscVulnerability;
            case TargetingSolutionType.EngineVulnerability:
                return solutions.engineVulnerability;
            case TargetingSolutionType.WarpVulnerability:
                return solutions.warpVulnerability;
            case TargetingSolutionType.WeaponVulnerability:
                return solutions.weaponsVulnerability;
            case TargetingSolutionType.SensorVulnerability:
                return solutions.sensorsVulnerability;
            case TargetingSolutionType.PowerVulnerability:
                return solutions.powerVulnerability;
            case TargetingSolutionType.DamageControlVulnerability:
                return solutions.damageVulnerability;
            case TargetingSolutionType.CommunicationVulnerability:
                return solutions.commsVulnerability;
            default:
                return solutions.misc;
        }
    }
    
    private getModifiedDifficulty(props: IProps) {
        if (props.bestFacing === props.currentlyFacing) {
            return Math.max(TargetingDifficulty.VeryEasy, props.baseDifficulty - 2);
        }
        else if (this.props.bestFacing === -this.props.currentlyFacing) {
            return Math.min(TargetingDifficulty.Impossible, props.baseDifficulty + 2);
        }
        else {
            return props.baseDifficulty;
        }
    }

    private getFacingName(face: TargetingFace) {
        switch (face) {
            case TargetingFace.Front:
                return this.props.text.systems.weapons.face.front;
            case TargetingFace.Rear:
                return this.props.text.systems.weapons.face.rear;
            case TargetingFace.Left:
                return this.props.text.systems.weapons.face.left;
            case TargetingFace.Right:
                return this.props.text.systems.weapons.face.right;
            case TargetingFace.Top:
                return this.props.text.systems.weapons.face.top;
            case TargetingFace.Bottom:
                return this.props.text.systems.weapons.face.bottom;
            default:
                return this.props.text.systems.weapons.face.any;
        }
    }

    private isVulnerability() {
        switch (this.props.solutionType) {
            case TargetingSolutionType.EngineVulnerability:
            case TargetingSolutionType.WarpVulnerability:
            case TargetingSolutionType.WeaponVulnerability:
            case TargetingSolutionType.SensorVulnerability:
            case TargetingSolutionType.PowerVulnerability:
            case TargetingSolutionType.DamageControlVulnerability:
            case TargetingSolutionType.CommunicationVulnerability:
            case TargetingSolutionType.MiscVulnerability:
                return true;
            default:
                return false;
        }
    }
}