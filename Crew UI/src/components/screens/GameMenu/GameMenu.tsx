import * as React from 'react';
import { connect } from 'react-redux';
import { Screen } from '~/components/general';
import { ShipSystem, TextLocalisation } from '~/functionality';
import { ApplicationState } from '~/store';
import { actionCreators } from '~/store/Screen';
import { PushButton, Icon } from '../../general';
import './GameMenu.scss';
import { SystemMenuItem } from './SystemMenuItem';
import { getSystemHealth } from '~/components/systems/damage/store';
import { getSystemPower } from '~/components/systems/power/store';

interface IProps {
    activeSystem?: ShipSystem;
    selectableSystems: ShipSystem;
    text: TextLocalisation;
    showSystemHelp: () => void;
    getSystemHealth: (system?: ShipSystem) => number | undefined;
    getSystemPower: (system?: ShipSystem) => number | undefined;
}

class GameMenu extends React.PureComponent<IProps> {
    render() {
        return <Screen centered={true} pageLayout={true}>
            <div className="gameMenu">
                {this.renderSystem(ShipSystem.Helm, Icon.Helm)}
                {this.renderSystem(ShipSystem.Warp, Icon.Warp)}
                {this.renderSystem(ShipSystem.Weapons, Icon.Weapons)}
                {this.renderSystem(ShipSystem.Sensors, Icon.Sensors)}
                {this.renderSystem(ShipSystem.PowerManagement, Icon.PowerManagement)}
                {this.renderSystem(ShipSystem.DamageControl, Icon.DamageControl)}
                {this.renderSystem(ShipSystem.Communications, Icon.Communications)}
                {this.renderSystem(ShipSystem.ViewScreen, Icon.ViewScreen)}
                <div className="gameMenu__separator" />
                <PushButton
                    text={this.props.text.common.help}
                    noBorder={true}
                    icon={Icon.Help}
                    clicked={() => this.props.showSystemHelp()}
                />
                <PushButton
                    text={this.props.text.screens.active.pause}
                    noBorder={true}
                    icon={Icon.Pause}
                    command="pause"
                />
            </div>
        </Screen>;
    }

    private renderSystem(system: ShipSystem, icon: Icon) {
        return <SystemMenuItem
            system={system}
            icon={icon}
            text={this.props.text}
            isActiveSystem={system === this.props.activeSystem}
            canSelect={(this.props.selectableSystems & system) !== 0}
            health={this.props.getSystemHealth(system)}
            power={this.props.getSystemPower(system)}
        />
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
        showSystemHelp: actionCreators.showSystemHelp,
        getSystemHealth: (system?: ShipSystem) => getSystemHealth(system, state),
        getSystemPower: (system?: ShipSystem) => getSystemPower(system, state),
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators
)(GameMenu);