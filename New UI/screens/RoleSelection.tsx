interface IRoleSelectionProps {
    crew: { [key:string]:CrewMember; };
    settingsClicked: () => void;
}

class RoleSelection extends React.Component<IRoleSelectionProps, {}> {
    render() {
        let crew: CrewMember[] = [];
        for (let id in this.props.crew) {
            crew.push(this.props.crew[id]);
        }

        let roles = ShipSystem.getRoles(crew.length);

        let showSystemSelection = roles.length == 0; // or mode has been toggled on

        let roleOrSystemSelection;
        if (showSystemSelection) {
            roleOrSystemSelection = <div></div>;
        }
        else {
            roleOrSystemSelection = <ol className="roleList">
                {roles.map(function(role, id) {
                    let crewMember = undefined;
                    for (let i=0; i<crew.length; i++)
                        if (crew[i].systemFlags == role.systemFlags) {
                            crewMember = crew.splice(i)[0];
                            break;
                        }
                    return <RoleListItem key={id} name={role.name} systemFlags={role.systemFlags} allocated={crewMember} />;
                })}
            </ol>
        }

        let unallocatedCrew;
        if (crew.length > 0)
            unallocatedCrew = <ul className="unallocated">{crew.map(function(member, id) {
                return <li key={id}>{member.name}</li>;
            })}</ul>;

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
                    <PushButton color={ButtonColor.Secondary} clicked={this.settingsClicked.bind(this)} title={language.common.settings}>&#9881;</PushButton>
                </Menu>
            </div>
        );
    }
    private settingsClicked() {
        if (this.props.settingsClicked !== undefined)
            this.props.settingsClicked();
    }
}