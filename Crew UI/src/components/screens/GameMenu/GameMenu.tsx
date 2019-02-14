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

interface ISystemStatus {
    system: ShipSystem;
    playerName?: string;
    health?: number;
    power?: number;
}

interface IProps {
    systems: ISystemStatus[];
    text: TextLocalisation;
    showSystemHelp: () => void;
}

class GameMenu extends React.PureComponent<IProps> {
    render() {
        const systems = this.props.systems.map((info, index) =>
            <SystemMenuItem
                key={index}
                system={info.system}
                text={this.props.text}
                occupiedBy={info.playerName}
                health={info.health}
                power={info.power}
            />
        );

        return <Screen className="gameMenu">
            <div className="gameMenu__systems">
                {systems}
            </div>
            <div className="gameMenu__separator" />
            <div className="gameMenu__buttons">
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
}

const menuSystems = [
    ShipSystem.Helm,
    ShipSystem.Warp,
    ShipSystem.Sensors,
    ShipSystem.Weapons,
    ShipSystem.PowerManagement,
    ShipSystem.DamageControl,
    ShipSystem.Communications,
    ShipSystem.ViewScreen,
];

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IProps = (state) => {
    const systems = menuSystems.map((system, index) => {
        const player = state.crew.playersBySystem[system];
        const displayName = player === undefined || player.id === state.crew.localPlayerID
            ? undefined
            : player.name;

        return {
           system,
           playerName: displayName,
           health: getSystemHealth(system, state),
           power: getSystemPower(system, state),
        };
    });

    return {
        text: state.user.text,
        systems,
        showSystemHelp: actionCreators.showSystemHelp,
    };
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators
)(GameMenu);