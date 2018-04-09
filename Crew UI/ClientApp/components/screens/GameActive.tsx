import * as React from 'react';
import { connect } from 'react-redux';
import { store, connection } from '~/Client';
import { ApplicationState } from '~/Store';
import * as CrewStore from '~/store/User';
import { TextLocalisation, ShipSystem, allSystems, getSystemName } from '~/functionality';
import { Icon, PushButton, ButtonColor, Screen } from '~/components/general';
import * as Systems from '~/components/systems';
import './GameActive.scss';

interface GameActiveProps {
    activeSystem?: ShipSystem;
    displaySystems: ShipSystem;
    disableSystems: ShipSystem;
    text: TextLocalisation;
}

interface GameActiveState {
    showingOptions: boolean;
    showingHelp: boolean;
}

class GameActive extends React.Component<GameActiveProps, GameActiveState> {
    system: Systems.BaseSystemComponent | null;

    constructor(props: GameActiveProps) {    
        super(props);

        this.system = null;
        this.state = {
            showingOptions: false,
            showingHelp: false,
        };
    }

    public render() {
        let activeSystemName = this.props.activeSystem === undefined ? undefined : getSystemName(this.props.activeSystem, this.props.text);

        let prev;
        let next;

        let help, options;
        let system = this.renderSystem(this.props.activeSystem);

        if (this.system !== null) {
            if (this.state.showingOptions) {
                options = this.system.renderOptions();
            }

            if (this.state.showingHelp) {
                help = this.system.renderHelp()
            }
        }

        return (
        <Screen>
            <div className="systemHeader">
                <h1 className="systemHeader__name">{activeSystemName}</h1>
                <div className="systemHeader__systemIcons systemHeader__systemIcons--fullWidth">
                    {this.renderSystemIcons()}
                </div>
                <div className="systemHeader__systemIcons systemHeader__systemIcons--truncated">
                    {prev}
                    {next}
                </div>
                <div className="systemHeader__separator" />
                <div className="systemHeader__commonIcons">
                    <PushButton title={this.props.text.common.help} noBorder={true} icon={Icon.Help} clicked={() => this.toggleHelp()} />
                    <PushButton
                        title={this.props.text.common.settings}
                        noBorder={true}
                        icon={Icon.Settings}
                        clicked={() => this.toggleOptions()}
                    />
                    <PushButton title={this.props.text.screens.active.pause} noBorder={true} icon={Icon.Pause} command="pause" />
                </div>
            </div>

            {options}
            {help}
            {system}
        </Screen>
        );
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
        let clicked = this.props.activeSystem === system
            ? () => this.setState({ showingHelp: false, showingOptions: false })
            : () => { this.setState({ showingHelp: false, showingOptions: false }); connection.send(`viewsys ${system}`); };

        return <PushButton key={system} title={getSystemName(system, this.props.text)} noBorder={true} icon={icon} disabled={disabled} color={color} clicked={clicked} />;
    }

    private renderSystem(system?: ShipSystem) {
        switch (system) {
            case ShipSystem.Helm:
                return <Systems.Helm ref={s => { if (s === null) { this.system = null; } else { this.system = (s as any).getWrappedInstance(); }}} />;
            case ShipSystem.Warp:
                return <Systems.Warp ref={s => { if (s === null) { this.system = null; } else { this.system = (s as any).getWrappedInstance(); }}} />;
            case ShipSystem.Weapons:
                return <Systems.Weapons ref={s => { if (s === null) { this.system = null; } else { this.system = (s as any).getWrappedInstance(); }}} />;
            case ShipSystem.Sensors:
                return <Systems.Sensors ref={s => { if (s === null) { this.system = null; } else { this.system = (s as any).getWrappedInstance(); }}} />;
            case ShipSystem.PowerManagement:
                return <Systems.PowerManagement ref={s => { if (s === null) { this.system = null; } else { this.system = (s as any).getWrappedInstance(); }}} />;
            case ShipSystem.DamageControl:
                return <Systems.DamageControl ref={s => { if (s === null) { this.system = null; } else { this.system = (s as any).getWrappedInstance(); }}} />;
            case ShipSystem.Communications:
                return <Systems.Communications ref={s => { if (s === null) { this.system = null; } else { this.system = (s as any).getWrappedInstance(); }}} />;
            case ShipSystem.ViewScreen:
                return <Systems.ViewScreen ref={s => { if (s === null) { this.system = null; } else { this.system = (s as any).getWrappedInstance(); }}} />;
        }
    }

    private toggleOptions() {
        this.setState({
            showingOptions: !this.state.showingOptions,
            showingHelp: false,
        })
    }

    private toggleHelp() {
        this.setState({
            showingHelp: !this.state.showingHelp,
            showingOptions: false,
        })
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