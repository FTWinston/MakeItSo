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
    visible: boolean;
}

type SystemMap = { [key: number]:IShipSystem | null; };

class GameActive extends React.Component<IGameActiveProps, IGameActiveState> {   
    constructor(props: IGameActiveProps) {
        super(props);
        this.state = {
            activeSystem: 0,
        };
    }

    private systemRefs: SystemMap = {};
    private selectedSystems: ShipSystem[];
    
    componentWillMount() {
        this.updateSystems(this.props.selectedSystems);
    }
    componentWillReceiveProps(nextProps: IGameActiveProps) {
        if (nextProps.selectedSystems != this.props.selectedSystems)
            this.updateSystems(nextProps.selectedSystems);
    }

    private updateSystems(systemFlags: ShipSystem) {
        this.selectedSystems = ShipSystem.getArray(systemFlags);

        if ((systemFlags & this.state.activeSystem) == 0)
            this.setState({ activeSystem: ShipSystem.getSingle(systemFlags) });
    }

    getSystem(system: ShipSystem) {
        return this.systemRefs[system];
    }

    private registerSystem(system: ShipSystem, ref: IShipSystem | null) {
        this.systemRefs[system] = ref;
    }

    private switchSystem(system: ShipSystem) {
        this.setState({
            activeSystem: system,
        });
    }

    render() {
        return <div className="screen" id="game">
            <SystemHeader activeSystem={this.state.activeSystem} allSystems={this.props.selectedSystems} switchSystem={this.switchSystem.bind(this)} />
            {this.selectedSystems.map(this.renderSystem.bind(this))}
        </div>;
    }
    private renderSystem(system: ShipSystem, id: number) {
        let that = this;
        let sharedProps = {
            inputMode: this.props.inputMode,
            width: this.props.width,
            height: this.props.height,
            ref: (c: IShipSystem | null) => that.registerSystem(system, c),
            visible: this.state.activeSystem == system,
            key: id
        };

        switch (system) {
            case ShipSystem.Helm:
                return <HelmSystem {...sharedProps} />;
            case ShipSystem.Warp:
                return <WarpSystem {...sharedProps} />;
            case ShipSystem.Weapons:
                return <WeaponsSystem {...sharedProps} />;
            case ShipSystem.Sensors:
                return <SensorsSystem {...sharedProps} />;
            case ShipSystem.PowerManagement:
                return <PowerSystem {...sharedProps} />;
            case ShipSystem.DamageControl:
                return <DamageControlSystem {...sharedProps} />;
            case ShipSystem.ViewScreen:
                return <ViewScreenSystem {...sharedProps} />;
            case ShipSystem.Communications:
                return <CommunicationsSystem {...sharedProps} />;
            default:
                 return undefined;
        }
    }
}