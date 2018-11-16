import * as React from 'react';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';
import { connection } from '../../..';
import './SystemMenuItem.scss';
import { SystemHealth, SystemPower, Icon, renderIcon } from '~/components/general/Icons';

interface IProps {
    system: ShipSystem;
    icon: Icon;
    isActiveSystem: boolean;
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
        if (this.props.isActiveSystem) {
            classes += ' systemMenuItem--active';
        }

        const name = getSystemName(this.props.system, this.props.text);

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
            {renderIcon(this.props.icon)}
            <div className="systemMenuItem__name">
                {name}
            </div>
            {health}
            {power}
        </div>
    }
    /*
    private renderSystemIcon(system: ShipSystem, icon: Icon) {
        let color = this.props.activeSystem === system ? ButtonColor.Quandry : undefined;
        let disabled = (this.props.selectableSystems & system) === 0;
        let clicked = this.props.activeSystem === system
            ? () => this.setState({ showingHelp: false, showingOptions: false })
            : () => { this.setState({ showingHelp: false, showingOptions: false }); connection.send(`viewsys ${system}`); };

        // TODO: render health, power
        return <div key={system}>
            <PushButton text={getSystemName(system, this.props.text)} noBorder={true} icon={icon} disabled={disabled} color={color} clicked={clicked} />
        </div>
    }
    */
}