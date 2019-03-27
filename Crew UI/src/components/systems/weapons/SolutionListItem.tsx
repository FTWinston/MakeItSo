import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { TargetingSolutionType, TargetingFace, TargetingDifficulty } from './store';
import './SolutionListItem.scss';
import { Polygon } from './Polygon';
import { SolutionInfo } from './SolutionInfo';

interface IProps {
    text: TextLocalisation;
    solutionType: TargetingSolutionType;
    className?: string;
    baseDifficulty: TargetingDifficulty;
    currentlyFacing: TargetingFace;
    bestFacing?: TargetingFace;
    polygonsByFace: { [key: number]: Polygon };
    selected: () => void;
}

interface IState {
    displayPolygon?: Polygon;
}

export class SolutionListItem extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            displayPolygon: props.polygonsByFace[props.currentlyFacing]
        }
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (this.props.currentlyFacing !== nextProps.currentlyFacing
            || this.props.polygonsByFace !== nextProps.polygonsByFace
        ) {
           this.setState({
                displayPolygon: nextProps.polygonsByFace[nextProps.currentlyFacing]
           });
        }
    }

    public render() {
        const text = this.getSolutionNameAndDesc();

        const selected = () => this.props.selected();
        
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

        return <div className={classes} onClick={selected}>
            <div className="solutionInfo__name">{text.name}</div>
            <div className="solutionInfo__desc">{text.desc}</div>
            {bestFacing}
        </div>
    }

    private getSolutionNameAndDesc() {
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