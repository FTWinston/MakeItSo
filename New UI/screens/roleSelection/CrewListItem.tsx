interface ICrewListItemProps {
    name: string;
    systemFlags: ShipSystem;
    crewSize: number;
}

class CrewListItem extends React.Component<ICrewListItemProps, {}> {
    render() {
        let systemList = ShipSystem.list(this.props.systemFlags);
        let systemBreakdown = systemList == '' ? '' : <div className="systems">{systemList}</div>;
        let roleName = ShipSystem.getRoleName(this.props.systemFlags, this.props.crewSize);

        return (
            <li><span className="name">{this.props.name}</span>: <span className="role">{roleName}</span>{systemBreakdown}</li>
        );
    }
}