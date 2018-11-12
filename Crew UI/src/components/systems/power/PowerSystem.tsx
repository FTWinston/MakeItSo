import * as React from 'react';
import { PowerSystemType } from './store';
import './PowerSystem.scss';
import { TextLocalisation } from '~/functionality';

interface IProps {
    text: TextLocalisation;
    system: PowerSystemType;
    power: number;
    onSelected?: () => void;
    selecting: boolean;
    canSelect: boolean;
    numEffects: number;
}

export class PowerSystem extends React.PureComponent<IProps, {}> {
    public render() {
        let classes = 'powerSystem';
        if (this.props.selecting) {
            classes += this.props.canSelect
                ? ' powerSystem--selecting'
                : ' powerSystem--unselectable';
        }

        let selected;

        if (this.props.power === 0) {
            classes += ' powerSystem--disabled';
        }

        if (this.props.onSelected !== undefined) {
            selected = () => this.props.onSelected!();
            classes += ' powerSystem--selectable';
        }

        return (
        <div className={classes} onClick={selected}>
            <div className="powerSystem__name">{this.getSystemName()}</div>
            <div className="powerSystem__power">{this.props.power}</div>
            <div className="powerSystem__effects">{this.renderEffects()}</div>
        </div>
        );
    }

    private getSystemName() {
        switch (this.props.system) {
            case PowerSystemType.Helm:
                return this.props.text.systemNames.helm;
            case PowerSystemType.Warp:
                return this.props.text.systemNames.warp;
            case PowerSystemType.Weapons:
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

    private renderEffects() {
        const effects = [];
        
        for (let i = this.props.numEffects; i > 0; i--) {
            effects.push(<div className="powerSystem__effect" key={i} />);
        }

        return effects;
    }
}