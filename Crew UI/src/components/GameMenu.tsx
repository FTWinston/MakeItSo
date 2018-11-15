import * as React from 'react';
import { connect } from 'react-redux';
import { ShipSystem, getSystemName, TextLocalisation } from '~/functionality';
import { ApplicationState } from '~/store';
import { connection } from '..';
import { PushButton, Icon, ButtonColor } from './general';
import './GameMenu.scss';

interface IProps {
    activeSystem?: ShipSystem;
    selectableSystems: ShipSystem;
    text: TextLocalisation;
}

class GameMenu extends React.PureComponent<IProps> {
    render() {
        return <div className="gameMenu">
            <div className="gameMenu__systemList">
                {this.renderSystemIcons()}
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
        return <div>
            <PushButton key={system} text={getSystemName(system, this.props.text)} noBorder={true} icon={icon} disabled={disabled} color={color} clicked={clicked} />
        </div>
    }
}


// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IProps = (state) => {
    let player = state.crew.players.find(p => p.id === state.crew.localPlayerID)!;
    
    let inUse: ShipSystem = 0;
    for (let other of state.crew.players) {
        if (other.id !== state.crew.localPlayerID && other.activeSystem !== undefined) {
            inUse |= other.activeSystem;
        }
    }

    const activeSystem = player.activeSystem;
    const selectableSystems = player.selectedSystems & ~inUse;
    
    return {
        text: state.user.text,
        activeSystem,
        selectableSystems,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(GameMenu);