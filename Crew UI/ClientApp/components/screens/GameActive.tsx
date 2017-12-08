import * as React from 'react';
import { connect } from 'react-redux';
import { store, connection }  from '../../Client';
import { ApplicationState }  from '../../store';
import * as CrewStore from '../../store/User';
import { TextLocalisation, ShipSystem, allSystems, getSystemName } from '../../functionality';
import { IconButton, Icon, ButtonColor, Screen } from '../general';
import * as Systems from '../systems';
import './GameActive.scss';

interface GameActiveProps {
    activeSystem?: ShipSystem;
    displaySystems: ShipSystem;
    disableSystems: ShipSystem;
    text: TextLocalisation;
}

class GameActive extends React.Component<GameActiveProps, {}> {
    public render() {
        let activeSystemName = this.props.activeSystem === undefined ? undefined : getSystemName(this.props.activeSystem, this.props.text);

        let prev;
        let next;

        return <Screen>
            <div className="systemHeader">
                <div className="systemHeader__nameWrapper">
                    <h1 className="systemHeader__name">{activeSystemName}</h1>
                </div>
                <div className="systemHeader__separator" />
                <div className="systemHeader__systemIcons systemHeader__systemIcons--fullWidth">
                    {this.renderSystemIcons()}
                </div>
                <div className="systemHeader__systemIcons systemHeader__systemIcons--truncated">
                    {prev}
                    {next}
                </div>
                <div className="systemHeader__separator" />
                <div className="systemHeader__commonIcons">
                    <IconButton title={this.props.text.common.help} icon={Icon.Help} />
                    <IconButton title={this.props.text.screens.active.pause} icon={Icon.Pause} command="pause" />
                </div>
            </div>

            {this.renderSystem(this.props.activeSystem)}
        </Screen>;
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
        if ((this.props.displaySystems & system) === 0)
            return undefined;

        let color = this.props.activeSystem === system ? ButtonColor.Quandry : undefined;
        let disabled = (this.props.disableSystems & system) !== 0;
        let clicked = this.props.activeSystem === system ? undefined : () => connection.send(`viewsys ${system}`);

        return <IconButton key={system} title={getSystemName(system, this.props.text)} icon={icon} disabled={disabled} color={color} clicked={clicked} />;
    }

    private renderSystem(system?: ShipSystem) {
        switch (system) {
            case ShipSystem.Helm:
                return <Systems.Helm />;
            case ShipSystem.Warp:
                return <Systems.Warp />;
            case ShipSystem.Weapons:
                return <Systems.Weapons />;
            case ShipSystem.Sensors:
                return <Systems.Sensors />;
            case ShipSystem.PowerManagement:
                return <Systems.PowerManagement />;
            case ShipSystem.DamageControl:
                return <Systems.DamageControl />;
            case ShipSystem.Communications:
                return <Systems.Communications />;
            case ShipSystem.ViewScreen:
                return <Systems.ViewScreen />;
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => GameActiveProps = (state) => {
    let player = state.crew.players.filter(p => p.id === state.crew.localPlayerID);
    
    let disabled: ShipSystem = 0;
    for (let other of state.crew.players) {
        if (other.id !== state.crew.localPlayerID && other.activeSystem !== undefined) {
            disabled |= other.activeSystem;
        }
    }

    let activeSystem = player[0].activeSystem;
    let activeName = activeSystem === undefined ? undefined : getSystemName(activeSystem, state.user.text);

    return {
        text: state.user.text,
        activeSystem: activeSystem,
        activeSystemName: activeName,
        displaySystems: player[0].selectedSystems,
        disableSystems: disabled,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(GameActive);