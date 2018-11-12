import * as React from 'react';
import { SystemHealth, SystemPower } from './general/Icons';
import './SystemHeader.scss';

interface IProps {
    name?: string;
    power?: number;
    health?: number;
    onClick?: () => void;
}

export class SystemHeader extends React.PureComponent<IProps> {
    render() {
        const power = this.props.power === undefined
            ? undefined
            : <div className="systemHeader__power">
                <SystemPower width="20" height="20" />
                {this.props.power}
            </div>

        const health = this.props.health === undefined
            ? undefined
            : <div className="systemHeader__health">
                <SystemHealth width="20" height="20" />
                {this.props.health}
            </div>

        return <div className="systemHeader" onClick={this.props.onClick}>
            <h1 className="systemHeader__name">{this.props.name}</h1>
            {health}
            {power}
        </div>
        /*
            <div className="systemHeader__systemIcons systemHeader__systemIcons--fullWidth">
                {this.renderSystemIcons()}
            </div>
            <div className="systemHeader__separator" />
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
        if ((this.props.displaySystems & system) === 0)
            return undefined;

        let color = this.props.activeSystem === system ? ButtonColor.Quandry : undefined;
        let disabled = (this.props.disableSystems & system) !== 0;
        let clicked = this.props.activeSystem === system
            ? () => this.setState({ showingHelp: false, showingOptions: false })
            : () => { this.setState({ showingHelp: false, showingOptions: false }); connection.send(`viewsys ${system}`); };

        return <PushButton key={system} title={getSystemName(system, this.props.text)} noBorder={true} icon={icon} disabled={disabled} color={color} clicked={clicked} />;
    }
*/
}

