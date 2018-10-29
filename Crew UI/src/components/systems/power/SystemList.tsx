import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { PowerSystem, PowerSystemType, PowerTargetingMode } from './store';
import './SystemList.scss';

interface SystemListProps {
    text: TextLocalisation;
    systems: PowerSystem[];
    targetingMode?: PowerTargetingMode;
    systemSelected: (systemPos: number) => void;
}

export class SystemList extends React.PureComponent<SystemListProps, {}> {
    public render() {
        let classes = 'powerSystemList';
        switch (this.props.targetingMode) {
            case PowerTargetingMode.TargetSingleSystem:
                classes += ' powerSystemList--targetSingle'; break;
        }
        // TODO: use this targeting mode info to determine which systems to highlight when hovering etc

        return (
        <div className={classes}>
            {this.props.systems.map((system, index) => this.renderSystem(system, index))}
        </div>
        );
    }

    private renderSystem(system: PowerSystem, index: number) {
        return (
        <div
            className="powerSystem"
            key={index}
            onClick={() => this.props.systemSelected(index)}
        >
            <div className="powerSystem__name">{this.getSystemName(system.type)}</div>
            <div className="powerSystem__power">{system.power}</div>
        </div>
        );
    }

    private getSystemName(system: PowerSystemType) {
        switch (system) {
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