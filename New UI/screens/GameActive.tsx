interface IGameActiveProps extends IScreenProps {
    selectedSystems: ShipSystem;
    inputMode: InputMode;
}

interface IGameActiveState {
    activeSystem: ShipSystem;
}

interface ISystemProps {
    width: number;
    height: number;
    inputMode: InputMode;
}

class GameActive extends React.Component<IGameActiveProps, IGameActiveState> {   
    constructor(props: IGameActiveProps) {
        super(props);
        this.state = {
            activeSystem: ShipSystem.getSingle(this.props.selectedSystems),
        };
    }
    componentDidUpdate(prevProps: IGameActiveProps) {
        if (prevProps.selectedSystems != this.props.selectedSystems)
            this.setState({activeSystem: ShipSystem.getSingle(this.props.selectedSystems)});
    }
    render() {
        return <div className="screen" id="game">
            <SystemHeader activeSystem={this.state.activeSystem} allSystems={this.props.selectedSystems} switchSystem={this.switchSystem.bind(this)} />
            {this.renderActiveSystem()}
        </div>;
    }
    private renderActiveSystem() {
        switch (this.state.activeSystem) {
            case ShipSystem.Helm:
                return <HelmSystem inputMode={this.props.inputMode} width={this.props.width} height={this.props.height} />;
            case ShipSystem.Warp:
                return <WarpSystem inputMode={this.props.inputMode} width={this.props.width} height={this.props.height} />;
            case ShipSystem.Weapons:
                return <WeaponsSystem inputMode={this.props.inputMode} width={this.props.width} height={this.props.height} />;
            case ShipSystem.Sensors:
                return <SensorsSystem inputMode={this.props.inputMode} width={this.props.width} height={this.props.height} />;
            case ShipSystem.PowerManagement:
                return <PowerSystem inputMode={this.props.inputMode} width={this.props.width} height={this.props.height} />;
            case ShipSystem.DamageControl:
                return <DamageControlSystem inputMode={this.props.inputMode} width={this.props.width} height={this.props.height} />;
            case ShipSystem.ViewScreen:
                return <ViewScreenSystem inputMode={this.props.inputMode} width={this.props.width} height={this.props.height} />;
            case ShipSystem.Communications:
                return <CommunicationsSystem inputMode={this.props.inputMode} width={this.props.width} height={this.props.height} />;
            default:
                 return undefined;
        }
    }
    private switchSystem(system: ShipSystem) {
        this.setState({
            activeSystem: system,
        });
    }
}