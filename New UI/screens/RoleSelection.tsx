interface IRoleSelectionProps {
    crewSize: number;
    otherCrewsSystems: ShipSystem;
    settingsClicked: () => void;
    setupClicked: () => void;
    gameActive: boolean;
    setupInUse: boolean;
    forceShowSystems: boolean;
}

class RoleSelection extends React.Component<IRoleSelectionProps, {}> {
    constructor(props: IRoleSelectionProps) {
        super(props);
    }
    render() {
        let showSystemSelection: boolean;
        let roles: CrewRole[];
        if (this.props.forceShowSystems) {
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

        let words = language.screens.roleSelection;
        return (
            <div className="screen" id="roleSelection">
                <div>
                    <h1>{showSystemSelection ? words.systemHeading : words.roleHeading}</h1>
                    <p className="prompt">{showSystemSelection ? words.systemPrompt : words.rolePrompt}</p>
                </div>
                <div className="content">
                    {roleOrSystemSelection}
                    {this.renderActionButtons()}
                </div>
                <Menu>
                    <PushButton color={ButtonColor.Quandry} clicked={this.settingsClicked.bind(this)} text="&#9881;" className="icon" title={language.common.settings} />
                </Menu>
            </div>
        );
    }
    private renderSelectionTypeSwitch() {
        if (this.props.crewSize >= ShipSystem.count)
            return undefined;

        let words = language.screens.roleSelection;
        if (this.props.forceShowSystems)
            return <ConfirmButton color={ButtonColor.Tertiary} command="-selectsys" text={words.showRoles} subtext={words.affectsAllCrew} />;
        else
            return <ConfirmButton color={ButtonColor.Secondary} command="+selectsys" text={words.showSystems} subtext={words.affectsAllCrew} />;
    }
    private renderSystemSelection() {
        let that = this;
        return <div className="systems imitateChoice">
            <ButtonSet color={ButtonColor.Secondary} vertical={true} separate={true}>
            {ShipSystem.allSystems.map(function(system, id) {
                let inUse = (system & that.props.otherCrewsSystems) == system;
                let name = ShipSystem.getNames(system);
                let help = ShipSystem.getHelpText(system);
                let tooltip = inUse ? language.screens.roleSelection.systemInUse : undefined;
                let classes = inUse ? 'inUse' : undefined;

                return <ToggleButton key={id} help={help} activateCommand={"sys+ " + system}
                        deactivateCommand={"sys- " + system} className={classes} title={tooltip} text={name}
                        ref={ref => {that.selectionButtons[id] = ref}} />;
            })}
            </ButtonSet>
        </div>;
    }
    
    selectionButtons: { [key:number]:ToggleButton; } = {};
    private renderRoleSelection(roles: CrewRole[]) {
        let that = this;
        return <Choice color={ButtonColor.Tertiary} vertical={true} separate={true} allowUnselected={true}>
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

                let systemList: string | undefined = ShipSystem.getNames(role.systemFlags);
                if (systemList == role.name)
                    systemList = undefined; // don't show subtext if its the same as the main text

                let help = ShipSystem.getHelpText(role.systemFlags);
                return <ToggleButton key={id} text={role.name} subtext={systemList} title={tooltip} help={help} 
                        activateCommand={"sys " + role.systemFlags} deactivateCommand="sys 0"disabled={disabled} className="bold"
                        ref={ref => {that.selectionButtons[id] = ref}} />;
            })}
        </Choice>;
    }
    private renderActionButtons() {
        let resumeButton, quitButton, setupButton;

        if (this.props.gameActive) {
            resumeButton = <PushButton className="bold" color={ButtonColor.Primary} command="resume" text={language.screens.roleSelection.resume} />
            quitButton = <ConfirmButton color={ButtonColor.Tertiary} command="quit" text={language.screens.roleSelection.quit} />
        }
        else {
            let disabled: boolean;
            let tooltip: string | undefined;
            if (this.props.setupInUse) {
                disabled = true;
                tooltip = language.screens.roleSelection.setupInUse;
            }
            else {
                disabled = false;
                tooltip = undefined;
            }

            setupButton = <PushButton className="bold" color={ButtonColor.Primary} text={language.screens.roleSelection.setup}
                                disabled={disabled} command="+setup" clicked={this.props.setupClicked} title={tooltip}/>
        }

        return <ButtonSet className="actions" separate={true}>
            {this.renderSelectionTypeSwitch()}
            {resumeButton}
            {quitButton}
            {setupButton}
        </ButtonSet>
    }
    private settingsClicked() {
        if (this.props.settingsClicked !== undefined)
            this.props.settingsClicked();
    }
    clearSelection() {
        for (let id in this.selectionButtons) {
            let button = this.selectionButtons[id];
            if (button != null)
                button.select(false);
        }
    }
}