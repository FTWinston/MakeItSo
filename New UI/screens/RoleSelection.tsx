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

        return (
            <div className="screen" id="roleSelection">
                <h1>{language.screens.roleSelection.heading}</h1>
                <p className="prompt">{language.screens.roleSelection.prompt}</p>
                
                <ol className="crewList">
                    {crew.map(function(member, id) {
                        return <li key={id}>{member.name}</li>;
                    })}
                </ol>

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