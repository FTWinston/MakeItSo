interface IRoleSelectionProps {
    numCrew?: number;
    settingsClicked?: () => void;
}

class RoleSelection extends React.Component<IRoleSelectionProps, {}> {
    render() {
        return (
            <div className="screen" id="roleSelection">
                <h1>{language.screens.roleSelection.heading}</h1>
                <p className="prompt">{language.screens.roleSelection.prompt}</p>
                
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