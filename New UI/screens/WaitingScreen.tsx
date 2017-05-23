interface IWaitingScreenProps {
    numCrew?: number;
    numUnready?: number;
    settingsClicked?: () => void;
}

class WaitingScreen extends React.Component<IWaitingScreenProps, {}> {
    render() {
        return (
            <div className="screen" id="waiting">
                <h1>{language.screens.waiting.heading}</h1>
                <p className="prompt">{language.screens.waiting.prompt}</p>
                <ToggleButton color={ButtonColor.Primary} activateCommand="+ready" deactivateCommand="-ready">{language.common.ready}</ToggleButton>
                <p>Waiting for {this.props.numUnready} of {this.props.numCrew} crew members</p>
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