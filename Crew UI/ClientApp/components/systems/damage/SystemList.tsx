import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { DamageSystem, DamageSystemType } from "~/store/Damage";
import './SystemList.scss';

interface SystemListProps {
    text: TextLocalisation;
    systems: DamageSystem[];
    systemSelected: (system: DamageSystem) => void;
}

export class SystemList extends React.Component<SystemListProps, {}> {
    public render() {
        return <div className="damageSystemList">
            {this.props.systems.map((system, index) => this.renderSystem(system, index))}
        </div>
    }

    private renderSystem(system: DamageSystem, index: number) {
        return (
        <div
            className="damageSystem"
            key={index}
            onClick={() => this.props.systemSelected(system)}
        >
            <div className="damageSystem__name">{this.getSystemName(system.type)}</div>
            <div className="damageSystem__damage">{system.damage}</div>
        </div>
        );
    }

    private getSystemName(system: DamageSystemType) {
        switch (system) {
            case DamageSystemType.Power:
                return this.props.text.systemNames.power;
            case DamageSystemType.Helm:
                return this.props.text.systemNames.helm;
            case DamageSystemType.Warp:
                return this.props.text.systemNames.warp;
            case DamageSystemType.BeamWeapons:
                return this.props.text.systemNames.weapons + ' 1';
            case DamageSystemType.Torpedoes:
                return this.props.text.systemNames.weapons + ' 2';
            case DamageSystemType.Sensors:
                return this.props.text.systemNames.sensors;
            case DamageSystemType.Shields:
                return this.props.text.systemNames.shields;
            case DamageSystemType.Comms:
                return this.props.text.systemNames.comms;
            default:
                return '';
        }
    }
}