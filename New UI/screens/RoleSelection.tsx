interface IRoleSelectionProps {
    crew: { [key:string]:CrewMember; };
    settingsClicked: () => void;
}

interface IRoleSelectionState {
    forceShowSystems: boolean;
}

class RoleSelection extends React.Component<IRoleSelectionProps, IRoleSelectionState> {
    constructor(props: IRoleSelectionProps) {
        super(props);
        this.state = {
            forceShowSystems: false,
        };
    }
    render() {
        let crew: CrewMember[] = [];
        for (let id in this.props.crew)
            crew.push(this.props.crew[id]);

        let showSystemSelection: boolean;
        let roles: CrewRole[];
        if (this.state.forceShowSystems) {
            showSystemSelection = true;
            roles = [];
        }
        else {
            roles = ShipSystem.getRoles(crew.length);
            showSystemSelection = roles.length == 0;
        }

        let roleOrSystemSelection = showSystemSelection
            ? this.renderSystemSelection(crew)
            : this.renderRoleSelection(crew, roles);

        let unallocatedCrew = this.renderUnallocatedCrew(crew);

        return (
            <div className="screen" id="roleSelection">
                <div>
                    <h1>{language.screens.roleSelection.heading}</h1>
                    <p className="prompt">{language.screens.roleSelection.prompt}</p>
                </div>
                <div>
                    {roleOrSystemSelection}
                    {unallocatedCrew}
                </div>
                <Menu>
                    {this.renderSelectionTypeSwitch(roles)}
                    <PushButton color={ButtonColor.Secondary} clicked={this.settingsClicked.bind(this)}>{language.common.settings}</PushButton>
                </Menu>
            </div>
        );
    }
    private renderSelectionTypeSwitch(roles: CrewRole[]) {
        if (roles.length == 0)
            return undefined;
        else if (this.state.forceShowSystems)
            return <PushButton color={ButtonColor.Tertiary} clicked={this.showSystemSelection.bind(this)}>{language.screens.roleSelection.showRoles}</PushButton>;
        else
            return <PushButton color={ButtonColor.Tertiary} clicked={this.showRoleSelection.bind(this)}>{language.screens.roleSelection.showSystems}</PushButton>;
    }
    private renderSystemSelection(crew: CrewMember[]) {
        return <div></div>;
        // TODO: render system list
    }
    private renderRoleSelection(crew: CrewMember[], roles: CrewRole[]) {
        let that = this;
        return <ol className="roleList">
            {roles.map(function(role, id) {
                let crewMember = undefined;
                for (let i=0; i<crew.length; i++)
                    if (crew[i].systemFlags == role.systemFlags) {
                        crewMember = crew.splice(i)[0];
                        break;
                    }
                return <RoleListItem key={id} name={role.name} systemFlags={role.systemFlags} allocated={crewMember}
                            selected={that.roleSelected.bind(that)} unselected={that.roleUnselected.bind(that)} />;
            })}
        </ol>
    }
    private renderUnallocatedCrew(unallocated: CrewMember[]) {
        if (unallocated.length == 0)
            return undefined;

        return <ul className="unallocated">{unallocated.map(function(member, id) {
            return <li key={id}>{member.name}</li>;
        })}</ul>;
    }
    private roleSelected(flags: ShipSystem) {
        
    }
    private roleUnselected(flags: ShipSystem) {
        
    }
    private showSystemSelection() {
        
    }
    private showRoleSelection() {
        
    }
    private settingsClicked() {
        if (this.props.settingsClicked !== undefined)
            this.props.settingsClicked();
    }
}