import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { TargetingSolutionType, TargetingFace, TargetingDifficulty, ITargetingSymbol } from './store';
import './SolutionInfo.scss';
import { TargetingElement, Status as ElementStatus } from './TargetingElement';

interface IProps {
    text: TextLocalisation;
    solutionType?: TargetingSolutionType;
    className?: string;
    baseDifficulty: TargetingDifficulty;
    currentlyFacing: TargetingFace;
    bestFacing?: TargetingFace;
    fullSequence: ITargetingSymbol[];
    selectedElements: number;
}

interface IState {
    sequence: ITargetingSymbol[];
}

export class SolutionInfo extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            sequence: this.calculateDisplaySequence(props),
        }
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (this.props.currentlyFacing !== nextProps.currentlyFacing
            || this.props.bestFacing !== nextProps.bestFacing
            || this.props.fullSequence !== nextProps.fullSequence
            || this.props.baseDifficulty !== nextProps.baseDifficulty
        ) {
           this.setState({
                sequence: this.calculateDisplaySequence(nextProps),
           });
        }
    }

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

        const difficulty = this.getDifficultyName();
        const difficultyDisplay = difficulty === null
            ? undefined
            : <div className="solutionInfo__difficulty">
                <span className="solutionInfo__label">{this.props.text.systems.weapons.difficultyPrefix}</span> <span className="solutionInfo__value">{difficulty}</span>
            </div>

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

        const symbols = this.state.sequence.map((s, i) => <TargetingElement
            key={i}
            color={s.color}
            shape={s.shape}
            status={i < this.props.selectedElements ? ElementStatus.Selected : ElementStatus.Clickable}
        />);

        return <div className={classes}>
            {name}
            {desc}
            {difficultyDisplay}
            {bestFacing}
            <div className="solutionInfo__sequence">
                {symbols}
            </div>
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
    
    private calculateDisplaySequence(props: IProps): ITargetingSymbol[] {
        const difficulty = this.getModifiedDifficulty(props);

        if (difficulty === TargetingDifficulty.Impossible) {
            return [];
        }

        const length = Math.min(difficulty, props.fullSequence.length);

        return props.fullSequence.slice(0, length);
    }
    
    private getDifficultyName() {
        if (this.props.baseDifficulty === undefined) {
            return null;
        }

        const difficultyText = this.props.text.systems.weapons.difficulty;

        const actualDifficulty = this.getModifiedDifficulty(this.props);

        switch (actualDifficulty) {
            case TargetingDifficulty.VeryEasy:
            case TargetingDifficulty.Easy:
                return difficultyText.easy;
            case TargetingDifficulty.Medium:
                return difficultyText.medium;
            case TargetingDifficulty.Hard:
            case TargetingDifficulty.VeryHard:
                return difficultyText.hard;
            case TargetingDifficulty.Impossible:
            default:
                return difficultyText.impossible;
        }
    }

    private getModifiedDifficulty(props: IProps) {
        if (props.bestFacing === props.currentlyFacing) {
            return Math.max(TargetingDifficulty.VeryEasy, props.baseDifficulty - 1);
        }
        else if (this.props.bestFacing === -this.props.currentlyFacing) {
            return Math.min(TargetingDifficulty.Impossible, props.baseDifficulty + 1);
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