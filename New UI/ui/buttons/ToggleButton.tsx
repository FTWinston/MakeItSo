interface IToggleButtonProps extends IButtonProps {
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
        inChoice: false
    };
    constructor(props: IToggleButtonProps) {
        super(props);
        this.state = { active: false };
    }
    render() {
        let classList = this.state.active ? 'toggle active' : 'toggle';
        return (
            <Button className={classList} hotkey={this.props.hotkey} mouseClick={this.clicked.bind(this)}
                color={this.props.color} disabled={this.props.disabled}>
                {this.props.children}
            </Button>
        );
    }
    private clicked(e: React.MouseEvent) {
        if (this.state.active) {
            if (this.props.allowUserDeactivate !== true)
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