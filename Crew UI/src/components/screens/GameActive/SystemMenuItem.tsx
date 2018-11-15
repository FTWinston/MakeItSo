import * as React from 'react';
import { ShipSystem } from '~/functionality';
import { connection } from '../../..';
import './SystemMenuItem.scss';

interface IProps {
    name: string;
    isActiveSystem: boolean;
    system: ShipSystem;
    power?: number;
    health?: number;
}

export class SystemMenuItem extends React.PureComponent<IProps> {
    render() {
        const clicked = this.props.isActiveSystem
            ? undefined
            : () => connection.send(`viewsys ${this.props.system}`);

        return <div className="systemMenuItem" onClick={clicked}>
            <div className="systemMenuItem__name">
                {this.props.name}
            </div>
        </div>
        /*
            <div className="systemHeader__commonIcons">
                <PushButton
                    title={this.props.text.common.help}
                    noBorder={true}
                    icon={Icon.Help}
                    color={this.state.showingHelp ? ButtonColor.Quandry : undefined}
                    clicked={() => this.toggleHelp()}
                />
                <PushButton
                    title={this.props.text.common.settings}
                    noBorder={true}
                    icon={Icon.Settings}
                    color={this.state.showingOptions ? ButtonColor.Quandry : undefined}
                    clicked={() => this.toggleOptions()}
                />
                <PushButton title={this.props.text.screens.active.pause} noBorder={true} icon={Icon.Pause} command="pause" />
            </div>
        */
    }
    /*
    private renderSystemIcons() {
        return [
            this.renderSystemIcon(ShipSystem.Helm, Icon.Helm),
            this.renderSystemIcon(ShipSystem.Warp, Icon.Warp),
            this.renderSystemIcon(ShipSystem.Weapons, Icon.Weapons),
            this.renderSystemIcon(ShipSystem.Sensors, Icon.Sensors),
            this.renderSystemIcon(ShipSystem.PowerManagement, Icon.PowerManagement),
            this.renderSystemIcon(ShipSystem.DamageControl, Icon.DamageControl),
            this.renderSystemIcon(ShipSystem.Communications, Icon.Communications),
            this.renderSystemIcon(ShipSystem.ViewScreen, Icon.ViewScreen),
        ];
    }

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