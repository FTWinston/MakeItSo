interface IGameActiveProps {
    selectedSystems: ShipSystem;
}

interface IGameActiveState {
    activeSystem: ShipSystem;
}

class GameActive extends React.Component<IGameActiveProps, IGameActiveState> {   
    constructor(props: IGameActiveProps) {
        super(props);
        this.setInitialScreen();
    }
    componentDidUpdate(prevProps: IGameActiveProps) {
        if (prevProps.selectedSystems != this.props.selectedSystems)
            this.setInitialScreen();
    }
    setInitialScreen() {
        this.setState({activeSystem: ShipSystem.getSingle(this.props.selectedSystems)});
    }
    render() {
        return <div className="screen" id="active">
            <SystemHeader activeSystem={this.state.activeSystem} allSystems={this.props.selectedSystems} />
            {this.renderActiveSystem()}
        </div>;
    }
    private renderActiveSystem() {
        switch (this.state.activeSystem) {
            case ShipSystem.Helm:
                return <HelmSystem />;
            case ShipSystem.Warp:
                return <WarpSystem />;
            case ShipSystem.Weapons:
                return <WeaponsSystem />;
            case ShipSystem.Sensors:
                return <SensorsSystem />;
            case ShipSystem.PowerManagement:
                return <PowerSystem />;
            case ShipSystem.DamageControl:
                return <DamageControlSystem />;
            case ShipSystem.ViewScreen:
                return <ViewScreenSystem />;
            case ShipSystem.Communications:
                return <CommunicationsSystem />;
            default:
                 return undefined;
        }
    }
}