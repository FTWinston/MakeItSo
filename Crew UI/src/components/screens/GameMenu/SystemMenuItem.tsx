import * as React from 'react';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';
import { connection } from '../../..';
import './SystemMenuItem.scss';
import { SystemHealth, SystemPower, Icon, renderIcon } from '~/components/general/Icons';

interface IProps {
    system: ShipSystem;
    canSelect: boolean;
    power?: number;
    health?: number;
    text: TextLocalisation;
}

export class SystemMenuItem extends React.PureComponent<IProps> {
    render() {
        let classes = 'systemMenuItem';
        if (this.props.canSelect) {
            classes += ' systemMenuItem--selectable';
        }

        const name = getSystemName(this.props.system, this.props.text);

        const icon = renderIcon(this.determineIcon(this.props.system));

        const health = this.props.health === undefined
            ? undefined
            : <div className="systemMenuItem__health">
                <SystemHealth width="20" height="20" />
                {this.props.health}
            </div>

        const power = this.props.power === undefined
            ? undefined
            : <div className="systemMenuItem__power">
                <SystemPower width="20" height="20" />
                {this.props.power}
            </div>

        const clicked = this.props.canSelect
            ? () => connection.send(`viewsys ${this.props.system}`)
            : undefined;

        return <div className={classes} onClick={clicked}>
            {icon}
            <div className="systemMenuItem__name">
                {name}
            </div>
            {health}
            {power}
        </div>
    }

    private determineIcon(system: ShipSystem) {
        switch (system) {
            case ShipSystem.Helm:
                return Icon.Helm;
            case ShipSystem.Warp:
                return Icon.Warp;
            case ShipSystem.Sensors:
                return Icon.Sensors;
            case ShipSystem.Weapons:
                return Icon.Weapons;
            case ShipSystem.PowerManagement:
                return Icon.PowerManagement;
            case ShipSystem.DamageControl:
                return Icon.DamageControl;
            case ShipSystem.Communications:
                return Icon.Communications;
            case ShipSystem.ViewScreen:
                return Icon.ViewScreen;
            default:
                return Icon.X;
        }
    }
}