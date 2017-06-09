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

type SystemMap = { [key: number]:JSX.Element; };

class GameActive extends React.Component<IGameActiveProps, IGameActiveState> {   
    componentWillMount() {
        this.updateSystems(this.props);
    }
    componentWillReceiveProps(nextProps: IGameActiveProps) {
        if (nextProps.selectedSystems != this.props.selectedSystems)
            this.updateSystems(nextProps);
    }

    private systems: SystemMap = {};
    private updateSystems(newProps: IGameActiveProps) {
        this.setState({activeSystem: ShipSystem.getSingle(this.props.selectedSystems)});

        let newSystems: SystemMap = {};

        let systemList = ShipSystem.getArray(newProps.selectedSystems);
        for (let system of systemList) {
            let systemInstance: JSX.Element | undefined = this.systems[system];
            if (systemInstance === undefined) {
                systemInstance = this.renderSystem(system);
                if (systemInstance === undefined)
                    continue;
            }
            newSystems[system] = systemInstance;
        }

        this.systems = newSystems;
    }
    getSystem(system: ShipSystem) {
        return this.systems[system];
    }

    render() {
        return <div className="screen" id="game">
            <SystemHeader activeSystem={this.state.activeSystem} allSystems={this.props.selectedSystems} switchSystem={this.switchSystem.bind(this)} />
            {this.systems[this.state.activeSystem]}
        </div>;
    }
    private renderSystem(system: ShipSystem) {
        switch (system) {
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