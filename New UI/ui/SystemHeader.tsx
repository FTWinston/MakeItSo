interface ISystemHeaderProps {
    activeSystem: ShipSystem;
    allSystems: ShipSystem;
}

interface ISystemHeaderState {
    showHelp: boolean;
}

class SystemHeader extends React.Component<ISystemHeaderProps, ISystemHeaderState> {
    constructor(props: ISystemHeaderProps) {
        super(props);
        this.state = {
            showHelp: false,
        };
    }
    render() {
        let name = ShipSystem.getNames(this.props.activeSystem);
        let help = this.renderHelp(name);
        let otherSystems = ShipSystem.getNames(this.props.allSystems &~ this.props.activeSystem);

        return <div className="systemHeader">
            <h1 className="name">{name}</h1>
            {help}
            <ButtonSet separate={true}>
                <IconButton clicked={this.showHelp.bind(this, true)} icon="help" />
                <IconButton icon="pause" />
            </ButtonSet>
        </div>;
    }
    private renderHelp(name: string) {
        if (!this.state.showHelp || this.props.activeSystem == 0)
            return undefined;

        let help = ShipSystem.getHelpText(this.props.activeSystem);
        return <Help title={name} content={help} closed={this.showHelp.bind(this, false)} />
    }
    private showHelp(show: boolean) {
        this.setState({
            showHelp: show
        });
    }
}