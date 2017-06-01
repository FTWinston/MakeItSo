interface IToggleButtonProps extends IButtonProps {
    startActive?: boolean;
    activated?: () => void;
    deactivated?: () => void;
    activateCommand?: string;
    deactivateCommand?: string;

    allowUserDeactivate?: boolean;
    choiceOptionActivated?: (activated: ToggleButton) => void;
    description?: string;
}

interface IToggleButtonState {
    active: boolean;
}

class ToggleButton extends React.Component<IToggleButtonProps, IToggleButtonState> {
    static defaultProps = {
        inChoice: false,
        startActive: false,
        allowUserDeactivate: true,
    };
    constructor(props: IToggleButtonProps) {
        super(props);
        this.state = { active: props.startActive === true };
    }
    componentWillMount() {
        if (this.props.startActive === true && this.props.choiceOptionActivated !== undefined)
            this.props.choiceOptionActivated(this);
    }
    render() {
        let classList = this.state.active ? 'toggle active' : 'toggle';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        
        return <Button className={classList} hotkey={this.props.hotkey} mouseClick={this.clicked.bind(this)} color={this.props.color}
                disabled={this.props.disabled} text={this.props.text} subtext={this.props.subtext} title={this.props.title} help={this.props.help} />;
    }
    private clicked(e: React.MouseEvent) {
        if (this.state.active) {
            if (this.props.allowUserDeactivate === false)
                return; // in a choice, don't deactivate a button by clicking on it

            if (this.props.deactivated != undefined)
               this.props.deactivated();

            if (this.props.deactivateCommand !== undefined)
                gameClient.server.send(this.props.deactivateCommand);
        }
        else {
            if (this.props.choiceOptionActivated !== undefined)
                this.props.choiceOptionActivated(this);

            if (this.props.activated != undefined)
                this.props.activated();
                
            if (this.props.activateCommand !== undefined)
                gameClient.server.send(this.props.activateCommand);
        }
        
        this.setState({active: !this.state.active});
    }
}