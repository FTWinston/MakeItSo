import * as React from 'react';
import { PowerSystemType } from './store';
import './SystemList.scss';
import { TextLocalisation } from '~/functionality';

interface IProps {
    text: TextLocalisation;
    system: PowerSystemType;
    power: number;
    selected?: () => void;
}

export class PowerSystem extends React.PureComponent<IProps, {}> {
    public render() {
        let classes = 'powerSystem';
        let selected;

        if (this.props.selected !== undefined) {
            selected = () => this.props.selected!();
            classes += ' powerSystem--selectable';
        }

        return (
        <div className={classes} onClick={selected}>
            <div className="powerSystem__name">{this.getSystemName()}</div>
            <div className="powerSystem__power">{this.props.power}</div>
        </div>
        );
    }

    private getSystemName() {
        switch (this.props.system) {
            case PowerSystemType.Helm:
                return this.props.text.systemNames.helm;
            case PowerSystemType.Warp:
                return this.props.text.systemNames.warp;
            case PowerSystemType.BeamWeapons:
                return this.props.text.systemNames.weapons;
            case PowerSystemType.Sensors:
                return this.props.text.systemNames.sensors;
            case PowerSystemType.Shields:
                return this.props.text.systemNames.shields;
            case PowerSystemType.DamageControl:
                return this.props.text.systemNames.damage;
            case PowerSystemType.Comms:
                return this.props.text.systemNames.comms;
            default:
                return '';
        }
    }
}