interface IRoleSelectionProps {
    crew?: { [key:string]:CrewMember; };
    settingsClicked?: () => void;
}

class RoleSelection extends React.Component<IRoleSelectionProps, {}> {
    render() {

        let numCrew = 0;
        if (this.props.crew !== undefined)
            for (let crew in this.props.crew)
                numCrew++;

        return (
            <div className="screen" id="roleSelection">
                <h1>{language.screens.roleSelection.heading}</h1>
                <p className="prompt">{language.screens.roleSelection.prompt}</p>
                
                <p>Currently got {numCrew} crew member{numCrew == 1 ? '' : 's'}</p>

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