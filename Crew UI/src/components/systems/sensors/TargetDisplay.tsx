import * as React from 'react';
import { SensorTarget, TextLocalisation } from '~/functionality';
import { SensorSystemType } from './store';
import './TargetDisplay.scss';
import { PushButton, ButtonColor } from '~/components/general';
import { SensorTargetType } from '~/functionality/sensors/SensorTarget';

interface IProps {
    text: TextLocalisation;
    target: SensorTarget;
    systems: SensorSystemType[];
    systemLevels: number[];
    systemSizes: number[];
    selectableSystems: SensorSystemType[];
    goBack: () => void;
    selectSystem: (system: SensorSystemType) => void;
}

export class TargetDisplay extends React.PureComponent<IProps, {}> {
    public render() {
        const target = this.props.target;
        const type = TargetDisplay.getTypeName(target.type, this.props.text);
        const systems = this.props.systems.map((s, i) => this.renderSystemItem(s, i));

        return <div className="sensors__targetDisplay sensorTargetDisplay">
            <div className="sensorTargetDisplay__heading">
                <span className="sensorTargetDisplay__type">{type}</span>: <span className="sensorTargetDisplay__id">{target.id}</span>
            </div>

            <div className="sensorTargetDisplay__systemList">
                {systems}
            </div>

            <PushButton color={ButtonColor.Secondary} clicked={this.props.goBack} text={this.props.text.common.goBack} />
        </div>
    }

    private renderSystemItem(system: SensorSystemType, index: number) {
        const level = this.props.systemLevels[index];
        let size = this.props.systemSizes[index];
        const canSelect = this.props.selectableSystems.indexOf(system) !== -1;

        let classes = 'sensorTargetSystem';
        let clicked: (() => void) | undefined;
        let sizeDisplay;

        if (canSelect) {
            classes += ' sensorTargetSystem--selectable';
            clicked = () => this.props.selectSystem(system);
            size = 0;
        }
        else if (size === 0) {
            classes += ' sensorTargetSystem--maxLevel';
        }

        if (size > 0) {
            sizeDisplay = (
                <div className="sensorTargetSystem__size">
                    <span className="sensorTargetSystem__label">length</span>
                    <span className="sensorTargetSystem__value">{size}</span>
                </div>
            );
        }

        return <div className={classes} key={index} onClick={clicked}>
            <div className="sensorTargetSystem__name">{TargetDisplay.getSystemName(system, this.props.text)}</div>
            {sizeDisplay}
            <div className="sensorTargetSystem__level">
                <span className="sensorTargetSystem__label">info level</span>
                <span className="sensorTargetSystem__value">{level}</span>
            </div>
        </div>

        // TODO: indicate scan level, system health and system power, if known (and relevant)
    }

    static getTypeName(type: SensorTargetType, text: TextLocalisation): string {
        switch (type) {
            case SensorTargetType.Star:
                return text.systems.sensors.targetTypes.star;
            case SensorTargetType.Planet:
                return text.systems.sensors.targetTypes.planet;
            case SensorTargetType.Station:
                return text.systems.sensors.targetTypes.station;
            case SensorTargetType.Ship:
                return text.systems.sensors.targetTypes.ship;
            case SensorTargetType.Misc:
            default:
                return text.systems.sensors.targetTypes.misc;
        }
    }

    static getSystemName(system: SensorSystemType, text: TextLocalisation): string {
        switch (system) {
            case SensorSystemType.Power:
                return text.systemNames.power;
            case SensorSystemType.Helm:
                return text.systemNames.helm;
            case SensorSystemType.Warp:
                return text.systemNames.warp;
            case SensorSystemType.Weapons:
                return text.systemNames.weapons;
            case SensorSystemType.Sensors:
                return text.systemNames.sensors;
            case SensorSystemType.Shields:
                return text.systemNames.shields;
            case SensorSystemType.DamageControl:
                return text.systemNames.damage;
            case SensorSystemType.Comms:
                return text.systemNames.comms;
            default:
                return text.systems.sensors.targetTypes.misc;
        }
    }
}