interface IRoleListItemProps {
    name: string;
    systemFlags: ShipSystem;
    allocated?: CrewMember;
    selected: (flags: ShipSystem) => void;
    unselected: (flags: ShipSystem) => void;
}

interface IRoleListItemState {
    selected: boolean;
}

class RoleListItem extends React.Component<IRoleListItemProps, IRoleListItemState> {
    constructor(props: IRoleListItemProps) {
        super(props);

        this.state = {
            selected: false
        };
    }
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
            <li onClick={this.clicked.bind(this)}>
                <span className="name">{this.props.name}</span>
                <span className="spacer"></span>
                {allocation}
                {breakdownSpacer}
                {systemBreakdown}
            </li>
        );
    }
    private clicked() {
        if (this.state.selected)
            this.props.selected(this.props.systemFlags);
        else
            this.props.unselected(this.props.systemFlags);
    }
}