import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { TargetingSolution } from './store';
import './SolutionInfo.scss';

interface IProps {
    text: TextLocalisation;
    solution: TargetingSolution;
    select?: () => void;
    className?: string;
    currentlyFacing?: string;
}

export class SolutionInfo extends React.PureComponent<IProps, {}> {
    public render() {
        const text = this.getSolutionNameAndDesc();
        const select = this.props.select === undefined
            ? undefined : () => this.props.select!();

        let classes = 'solutionInfo';
        if (this.isVulnerability()) {
            classes += ' solutionInfo--vulnerability';
        }
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        const currentlyFacing = this.props.currentlyFacing === undefined
            ? undefined
            : <div className="solutionInfo__currentlyFacing">
                <span className="solutionInfo__label">{this.props.text.systems.weapons.currentlyFacingPrefix}</span> <span className="solutionInfo__value">{this.getCurrentlyFacing()}</span>
            </div>

        return <div className={classes} onClick={select}>
            <div className="solutionInfo__name">{text.name}</div>
            <div className="solutionInfo__desc">{text.desc}</div>
            <div className="solutionInfo__difficulty"><span className="solutionInfo__label">{this.props.text.systems.weapons.difficultyPrefix}</span> <span className="solutionInfo__value">{this.getDifficulty()}</span></div>
            <div className="solutionInfo__bestFacing"><span className="solutionInfo__label">{this.props.text.systems.weapons.facingPrefix}</span> <span className="solutionInfo__value">{this.getBestFacing()}</span></div>
            {currentlyFacing}
        </div>
    }

    private getSolutionNameAndDesc() {
        const solutions = this.props.text.systems.weapons.solutions;
        switch (this.props.solution) {
            case TargetingSolution.Misc:
                return solutions.misc;
            case TargetingSolution.Engines:
                return solutions.engines;
            case TargetingSolution.Warp:
                return solutions.warp;
            case TargetingSolution.Weapons:
                return solutions.weapons;
            case TargetingSolution.Sensors:
                return solutions.sensors;
            case TargetingSolution.PowerManagement:
                return solutions.power;
            case TargetingSolution.DamageControl:
                return solutions.damage;
            case TargetingSolution.Communications:
                return solutions.comms;
            case TargetingSolution.MiscVulnerability:
                return solutions.miscVulnerability;
            case TargetingSolution.EngineVulnerability:
                return solutions.engineVulnerability;
            case TargetingSolution.WarpVulnerability:
                return solutions.warpVulnerability;
            case TargetingSolution.WeaponVulnerability:
                return solutions.weaponsVulnerability;
            case TargetingSolution.SensorVulnerability:
                return solutions.sensorsVulnerability;
            case TargetingSolution.PowerVulnerability:
                return solutions.powerVulnerability;
            case TargetingSolution.DamageControlVulnerability:
                return solutions.damageVulnerability;
            default:
                return solutions.misc;
        }
    }

    // TODO: difficulty and ideal facing should be determined by the server.
    // TODO: indicate weather facing ideal (or its opposite)
    private getDifficulty() {
        const difficulty = this.props.text.systems.weapons.difficulty;

        switch (this.props.solution) {
            case TargetingSolution.Misc:
                return difficulty.easy;
            case TargetingSolution.Engines:
            case TargetingSolution.Warp:
            case TargetingSolution.Weapons:
            case TargetingSolution.Sensors:
            case TargetingSolution.PowerManagement:
            case TargetingSolution.DamageControl:
            case TargetingSolution.Communications:
            case TargetingSolution.MiscVulnerability:
                return difficulty.medium;
            case TargetingSolution.EngineVulnerability:
            case TargetingSolution.WarpVulnerability:
            case TargetingSolution.WeaponVulnerability:
            case TargetingSolution.SensorVulnerability:
            case TargetingSolution.PowerVulnerability:
            case TargetingSolution.DamageControlVulnerability:
            default:
                return difficulty.hard;
        }
    }

    private getBestFacing() {
        const facing = this.props.text.systems.weapons.face;

        switch (this.props.solution) {
            case TargetingSolution.Engines:
            case TargetingSolution.EngineVulnerability:
                return facing.rear;

            case TargetingSolution.Warp:
            case TargetingSolution.WarpVulnerability:
                return facing.bottom;

            case TargetingSolution.Weapons:
            case TargetingSolution.WeaponVulnerability:
                return facing.front;

            case TargetingSolution.Sensors:
            case TargetingSolution.SensorVulnerability:
                return facing.left;

            case TargetingSolution.PowerManagement:
            case TargetingSolution.PowerVulnerability:
                return facing.top;

            case TargetingSolution.DamageControl:
            case TargetingSolution.DamageControlVulnerability:
                return facing.right;

            case TargetingSolution.Communications:
                return facing.right;
            
            case TargetingSolution.Misc:
            case TargetingSolution.MiscVulnerability:
            default:
                return facing.none;
        }
    }

    private getCurrentlyFacing() {
        return this.props.currentlyFacing!;
    }

    private isVulnerability() {
        switch (this.props.solution) {
            case TargetingSolution.EngineVulnerability:
            case TargetingSolution.WarpVulnerability:
            case TargetingSolution.WeaponVulnerability:
            case TargetingSolution.SensorVulnerability:
            case TargetingSolution.PowerVulnerability:
            case TargetingSolution.DamageControlVulnerability:
            case TargetingSolution.MiscVulnerability:
                return true;
            default:
                return false;
        }
    }
}