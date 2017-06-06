interface ISystemHeaderProps {
    activeSystem: ShipSystem;
    allSystems: ShipSystem;
    switchSystem: (system: ShipSystem) => void;
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
        let systemList = this.props.activeSystem == this.props.allSystems ? undefined 
            : ShipSystem.getArray(this.props.allSystems);

        let prev, next, allSystemIcons, separator;
        if (systemList === undefined) {
            prev = next = allSystemIcons = separator = undefined;
        }
        else {
            prev = this.renderNavIcon(this.getPreviousSystem(systemList), undefined, 'prev', false);
            next = this.renderNavIcon(this.getNextSystem(systemList), undefined, 'next', false);
            let that = this;
            allSystemIcons = systemList.map(function(system, id) {
                return that.renderNavIcon(system, id, undefined, true);
            });
            separator = <div className="separator"></div>;
        }

        return <div className="systemHeader">
            <h1 className="name">{name}</h1>
            {help}
            {prev}
            {next}
            {allSystemIcons}
            {separator}
            <IconButton title={language.common.help} clicked={this.showHelp.bind(this, true)} icon="help" />
            <IconButton title={language.screens.active.pause} icon="pause" />
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
    private renderNavIcon(system: ShipSystem, id: number | undefined, icon?: Icon, showOnLarge: boolean = true) {
        if (icon === undefined) {
            icon = ShipSystem.getIcon(system);
            if (icon === undefined)
                icon = 'help';
        }
        
        let name = system == 0 ? undefined : ShipSystem.getNames(system);
        let classes = system == 0 || system == this.props.activeSystem ? 'disabled' : '';
        classes += showOnLarge ? ' showLargeUp' : ' showMediumDown';
        let clicked = system == 0 ? undefined : this.switchSystem.bind(this, system);

        return <IconButton icon={icon} title={name} className={classes} clicked={clicked} key={id} />
    }
    private switchSystem(system: ShipSystem) {
        this.props.switchSystem(system);
    }
    private getPreviousSystem(systemList: ShipSystem[]) {
        let activeIndex = -1;
        for (let i=0; i<systemList.length; i++)
            if (systemList[i] == this.props.activeSystem) {
                activeIndex = i;
                break;
            }

        if (activeIndex <= 0)
            return 0;

        return systemList[activeIndex - 1];
    }
    private getNextSystem(systemList: ShipSystem[]) {
        let activeIndex = -1;
        for (let i=0; i<systemList.length; i++)
            if (systemList[i] == this.props.activeSystem) {
                activeIndex = i;
                break;
            }

        if (activeIndex == -1 || activeIndex >= systemList.length - 1)
            return 0;

        return systemList[activeIndex + 1];
    }
}