import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { TargetingSolutionType, TargetingFace, TargetingDifficulty } from './store';

interface IProps {
    text: TextLocalisation;
    solutionType: TargetingSolutionType;
    className?: string;
    baseDifficulty: TargetingDifficulty;
    currentlyFacing: TargetingFace;
    bestFacing?: TargetingFace;
}

interface IState {
    currentDifficulty: TargetingDifficulty;
}

export class SolutionInfo extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentDifficulty: this.getModifiedDifficulty(props),
        };
    }

    componentWillReceiveProps(newProps: IProps) {
        if (newProps.currentlyFacing !== this.props.currentlyFacing || newProps.baseDifficulty !== this.props.baseDifficulty) {
            this.setState({
                currentDifficulty: this.getModifiedDifficulty(newProps),
            });
        }
    }

    public render() {
        const text = SolutionInfo.getSolutionNameAndDesc(this.props.solutionType, this.props.text);

        let classes = 'solutionInfo';
        if (this.isVulnerability()) {
            classes += ' solutionInfo--vulnerability';
        }
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

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
                <span className="solutionInfo__label">{this.props.text.systems.weapons.facingPrefix}</span> <span className={facingClasses}>{SolutionInfo.getFaceName(this.props.bestFacing, this.props.text)}</span>
            </div>
            
        // TODO: render this.state.displayPolygon as a background thing if it isn't undefined. If it is.

        return <div className={classes}>
            <div className="solutionInfo__name">{text.name}</div>
            <div className="solutionInfo__desc">{text.desc}</div>
            <div className="solutionInfo__difficulty">{this.getDifficultyName(this.state.currentDifficulty)}</div>
            {bestFacing}
        </div>
    }

    public static getSolutionNameAndDesc(solutionType: TargetingSolutionType, text: TextLocalisation) {
        const solutions = text.systems.weapons.solutions;
        switch (solutionType) {
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
            const newDifficulty = props.baseDifficulty + 2;
            return newDifficulty > TargetingDifficulty.VeryHard
                ? TargetingDifficulty.Impossible
                : newDifficulty;
        }
        else {
            return props.baseDifficulty;
        }
    }

    public static getFaceName(face: TargetingFace, text: TextLocalisation) {
        switch (face) {
            case TargetingFace.Front:
                return text.systems.weapons.face.front;
            case TargetingFace.Rear:
                return text.systems.weapons.face.rear;
            case TargetingFace.Left:
                return text.systems.weapons.face.left;
            case TargetingFace.Right:
                return text.systems.weapons.face.right;
            case TargetingFace.Top:
                return text.systems.weapons.face.top;
            case TargetingFace.Bottom:
                return text.systems.weapons.face.bottom;
            default:
                return text.systems.weapons.face.any;
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

    private getDifficultyName(difficulty: TargetingDifficulty) {
        switch (difficulty) {
            case TargetingDifficulty.Impossible:
                return this.props.text.systems.weapons.difficulties.impossible;
            case TargetingDifficulty.VeryEasy:
                return this.props.text.systems.weapons.difficulties.veryEasy;
            case TargetingDifficulty.Easy:
                return this.props.text.systems.weapons.difficulties.easy;
            case TargetingDifficulty.Medium:
                return this.props.text.systems.weapons.difficulties.medium;
            case TargetingDifficulty.Hard:
                return this.props.text.systems.weapons.difficulties.hard;
            case TargetingDifficulty.VeryHard:
                return this.props.text.systems.weapons.difficulties.veryHard;
        }
    }
}