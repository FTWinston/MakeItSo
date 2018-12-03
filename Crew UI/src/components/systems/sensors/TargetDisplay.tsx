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
    goBack: () => void;
    selectSystem: (system: SensorSystemType) => void;
}

export class TargetDisplay extends React.PureComponent<IProps, {}> {
    public render() {
        const target = this.props.target;
        const type = TargetDisplay.getTypeName(target.type, this.props.text);
        const systems = this.props.systems.map((s, i) => this.renderSystemItem(s, i));

        return <div className="sensors__targetDisplay targetDisplay">
            <div className="targetDisplay__heading">
                <span className="targetDisplay__type">{type}</span>: <span className="targetDisplay__id">{target.id}</span>
            </div>

            <div className="targetDisplay__systemList">
                {systems}
            </div>

            <PushButton color={ButtonColor.Secondary} clicked={this.props.goBack} text={this.props.text.common.goBack} />
        </div>
    }

    private renderSystemItem(system: SensorSystemType, index: number) {
        const level = this.props.systemLevels[index];

        return <div className="sensorSystemLink" key={index} onClick={() => this.props.selectSystem(system)}>
            <div className="sensorSystemLink__name">{TargetDisplay.getSystemName(system, this.props.text)}</div>
            <div className="sensorSystemLink__level">{level}</div>
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