import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation, ShipSystem, getSystemName } from '~/functionality';
import { Screen } from '~/components/general';
import * as Systems from '~/components/systems';
import './GameActive.scss';
import { SystemHeader } from '../SystemHeader';
import { getSystemHealth } from '../systems/damage/store';
import { getSystemPower } from '../systems/power/store';

interface GameActiveProps {
    activeSystem?: ShipSystem;
    displaySystems: ShipSystem;
    disableSystems: ShipSystem;
    text: TextLocalisation;
    systemPower?: number;
    systemHealth?: number;
}

const enum ScreenComponent {
    System,
    Menu,
    Help,
    Options
}

interface GameActiveState {
    showing: ScreenComponent,
}

class GameActive extends React.Component<GameActiveProps, GameActiveState> {
    system: Systems.BaseSystemComponent | null;

    constructor(props: GameActiveProps) {    
        super(props);

        this.system = null;
        this.state = {
            showing: ScreenComponent.System,
        };
    }

    public render() {
        let activeSystemName = this.props.activeSystem === undefined ? undefined : getSystemName(this.props.activeSystem, this.props.text);

        let system = this.renderSystem(this.props.activeSystem);

        let additional;

        switch (this.state.showing) {
            case ScreenComponent.Menu:
                additional = this.renderMenu();
                break;
            case ScreenComponent.Help:
                additional = this.system == null
                    ? undefined
                    : this.system.renderHelp();
                break;
            case ScreenComponent.Options:
                additional = this.system == null
                    ? undefined
                    : this.system.renderOptions();
                break;
        }

        let wrapperClasses = this.state.showing === ScreenComponent.System
            ? 'systemWrapper'
            : 'systemWrapper systemWrapper--hidden';

        return <Screen>
            <SystemHeader
                name={activeSystemName}
                health={this.props.systemHealth}
                power={this.props.systemPower}
                onClick={() => this.headerClicked()}
            />
            {additional}
            <div className={wrapperClasses}>{system}</div>
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

    private renderMenu() {
        return <div>
            menu
        </div>
    }

    private headerClicked() {
        this.setState({
            showing: this.state.showing === ScreenComponent.System
                ? ScreenComponent.Menu
                : ScreenComponent.System,
        });
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => GameActiveProps = (state) => {
    let player = state.crew.players.find(p => p.id === state.crew.localPlayerID)!;
    
    let disabled: ShipSystem = 0;
    for (let other of state.crew.players) {
        if (other.id !== state.crew.localPlayerID && other.activeSystem !== undefined) {
            disabled |= other.activeSystem;
        }
    }

    let activeSystem = player.activeSystem;
    let activeName = activeSystem === undefined ? undefined : getSystemName(activeSystem, state.user.text);

    return {
        text: state.user.text,
        activeSystem: activeSystem,
        activeSystemName: activeName,
        displaySystems: player.selectedSystems,
        disableSystems: disabled,
        systemHealth: getSystemHealth(activeSystem, state),
        systemPower: getSystemPower(activeSystem, state),
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(GameActive);