interface IRoleListItemProps {
    name: string;
    systemFlags: ShipSystem;
    allocated?: CrewMember;
}

class RoleListItem extends React.Component<IRoleListItemProps, {}> {
    render() {
        let allocation;
        if (this.props.allocated === undefined)
            allocation = <span className="allocated none"></span>;
        else
            allocation = <span className="allocated">{this.props.allocated.name}</span>;

        let systemList = ShipSystem.list(this.props.systemFlags);
        let systemBreakdown, breakdownSpacer;

        if (systemList == '' || systemList == this.props.name) {
            systemBreakdown = '';
            breakdownSpacer = '';
        }
        else {
            systemBreakdown = <div className="systems">{systemList}</div>;
            breakdownSpacer = <span className="spacer"></span>;
        }

        return (
            <li>
                <span className="name">{this.props.name}</span>
                <span className="spacer"></span>
                {allocation}
                {breakdownSpacer}
                {systemBreakdown}
            </li>
        );
    }
}