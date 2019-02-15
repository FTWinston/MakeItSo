import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation, ShipSystem, getSystemName } from '~/functionality';
import { Screen } from '~/components/general';
import * as Systems from '~/components/systems';
import './GameActive.scss';
import { SystemHeader } from './SystemHeader';
import { getSystemHealth } from '../../systems/damage/store';
import { getSystemPower } from '../../systems/power/store';
import { actionCreators } from '~/store/Crew';
import GameMenu from './GameMenu';
import { connection } from '~/index';

interface IProps {
    activeSystem: ShipSystem;
    text: TextLocalisation;
    systemPower?: number;
    systemHealth?: number;
    selectSystem: (system: ShipSystem) => void;
}

class GameActive extends React.Component<IProps> {
    system: Systems.BaseSystemComponent | null = null;

    public render() {
        if (this.props.activeSystem === ShipSystem.None) {
            return <GameMenu />
        }

        return <Screen>
            <SystemHeader
                name={getSystemName(this.props.activeSystem, this.props.text)}
                health={this.props.systemHealth}
                power={this.props.systemPower}
                onClick={() => { connection.send('viewsys 0'); this.props.selectSystem(ShipSystem.None) }}
            />
            <div className="systemWrapper">
                {this.renderSystem(this.props.activeSystem)}
            </div>
        </Screen>
    }

    private renderSystem(system?: ShipSystem) {
        const ref = (s: React.Component<{}>) => {
            if (s === null)
                this.system = null;
            else
                this.system = (s as any).getWrappedInstance();
        }

        switch (system) {
            case ShipSystem.Helm:
                return <Systems.Helm ref={ref} />;
            case ShipSystem.Warp:
                return <Systems.Warp ref={ref} />;
            case ShipSystem.Weapons:
                return <Systems.Weapons ref={ref} />;
            case ShipSystem.Sensors:
                return <Systems.Sensors ref={ref} />;
            case ShipSystem.PowerManagement:
                return <Systems.PowerManagement ref={ref} />;
            case ShipSystem.DamageControl:
                return <Systems.DamageControl ref={ref} />;
            case ShipSystem.Communications:
                return <Systems.Communications ref={ref} />;
            case ShipSystem.ViewScreen:
                return <Systems.ViewScreen ref={ref} />;
            default:
                return undefined;
        }
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IProps = (state) => {
    const player = state.crew.players.find(p => p.id === state.crew.localPlayerID)!;
    const activeSystem = player.activeSystem;

    return {
        text: state.user.text,
        activeSystem: activeSystem,
        systemHealth: getSystemHealth(activeSystem, state),
        systemPower: getSystemPower(activeSystem, state),
        selectSystem: actionCreators.setLocalPlayerSystem,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators
)(GameActive);