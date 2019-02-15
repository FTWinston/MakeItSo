import * as React from 'react';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';
import { connection } from '../../..';
import './SystemMenuItem.scss';
import { Icon, renderIcon } from '~/components/general/Icons';

interface IProps {
    system: ShipSystem;
    occupiedBy?: string;
    power?: number;
    health?: number;
    text: TextLocalisation;
}

export class SystemMenuItem extends React.PureComponent<IProps> {
    render() {
        let classes = 'systemMenuItem';
        
        if (this.props.occupiedBy !== undefined) {
            classes += ' systemMenuItem--occupied';
        }

        const name = <div className="systemMenuItem__name">
            {getSystemName(this.props.system, this.props.text)}
        </div>

        const player = this.props.occupiedBy === undefined
            ? undefined
            : <div className="systemMenuItem__player">{renderIcon(Icon.User, 16)} {this.props.occupiedBy}</div>

        const icon = renderIcon(this.determineIcon(this.props.system), 28, 'systemMenuItem__icon');

        const health = this.props.health === undefined
            ? undefined
            : <div className={this.getHealthClasses(this.props.health)}>
                {renderIcon(Icon.SystemHealth, 16)}
                {this.props.health}
            </div>

        const power = this.props.power === undefined
            ? undefined
            : <div className={this.getPowerClasses(this.props.power)}>
                {renderIcon(Icon.SystemPower, 16)}
                {this.props.power}
            </div>

        const clicked = this.props.occupiedBy === undefined
            ? () => connection.send(`viewsys ${this.props.system}`)
            : undefined;

        return <div className={classes} onClick={clicked}>
            {icon}
            {name}
            {player}
            {health}
            {power}
        </div>
    }

    private getHealthClasses(value: number) {
        let classes = 'systemMenuItem__health';

        if (value <= 0) {
            classes += ' systemMenuItem__health--empty';
        }
        else if (value <= 25) {
            classes += ' systemMenuItem__health--veryLow';
        }
        else if (value <= 50) {
            classes += ' systemMenuItem__health--low';
        }
        else if (value <= 75) {
            classes += ' systemMenuItem__health--moderate';
        }

        return classes;
    }

    private getPowerClasses(value: number) {
        let classes = 'systemMenuItem__power';

        if (value <= 0) {
            classes += ' systemMenuItem__power--empty';
        }
        else if (value <= 50) {
            classes += ' systemMenuItem__power--low';
        }
        else if (value <= 100) {
            classes += ' systemMenuItem__power--normal';
        }
        else if (value <= 150) {
            classes += ' systemMenuItem__power--high';
        }
        else {
            classes += ' systemMenuItem__power--veryHigh';
        }

        return classes;
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