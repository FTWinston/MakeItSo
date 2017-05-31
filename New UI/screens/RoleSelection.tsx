interface IRoleSelectionProps {
    crewSize: number;
    otherCrewsSystems: ShipSystem;
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
        let showSystemSelection: boolean;
        let roles: CrewRole[];
        if (this.state.forceShowSystems) {
            showSystemSelection = true;
            roles = [];
        }
        else {
            roles = ShipSystem.getRoles(this.props.crewSize);
            showSystemSelection = roles.length == 0;
        }

        let roleOrSystemSelection = showSystemSelection
            ? this.renderSystemSelection()
            : this.renderRoleSelection(roles);

        return (
            <div className="screen" id="roleSelection">
                <div>
                    <h1>{language.screens.roleSelection.heading}</h1>
                    <p className="prompt">{language.screens.roleSelection.prompt}</p>
                </div>
                {roleOrSystemSelection}
                <Menu>
                    {this.renderSelectionTypeSwitch(roles)}
                    <PushButton color={ButtonColor.Secondary} clicked={this.settingsClicked.bind(this)} text={language.common.settings} />
                </Menu>
            </div>
        );
    }
    private renderSelectionTypeSwitch(roles: CrewRole[]) {
        if (roles.length == 0)
            return undefined;
        else if (this.state.forceShowSystems)
            return <PushButton color={ButtonColor.Tertiary} clicked={this.showSystemSelection.bind(this)} text={language.screens.roleSelection.showRoles} />;
        else
            return <PushButton color={ButtonColor.Tertiary} clicked={this.showRoleSelection.bind(this)} text={language.screens.roleSelection.showSystems} />;
    }
    private renderSystemSelection() {
        return <div></div>;
        // TODO: render system list
    }
    private renderRoleSelection(roles: CrewRole[]) {
        let that = this;
        return <Choice color={ButtonColor.Tertiary} vertical={true} separate={true} allowUnselected={true} className="roleList">
            {roles.map(function(role, id) {
                let disabled: boolean;
                let tooltip: string | undefined;

                if ((role.systemFlags & that.props.otherCrewsSystems) == role.systemFlags) {
                    disabled = true;
                    tooltip = 'Selected by another crew member';
                }
                else {
                    disabled = false;
                    tooltip = undefined;
                }

                return <ToggleButton key={id} help={role.getHelpText()} activateCommand={"sys " + role.systemFlags}
                    deactivateCommand="sys 0" disabled={disabled} text={role.name} title={tooltip} />;
            })}
        </Choice>
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