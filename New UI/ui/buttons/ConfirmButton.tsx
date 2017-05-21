interface IConfirmButtonState {
    primed: boolean;
}

class ConfirmButton extends React.Component<IPushButtonProps, IConfirmButtonState> {
    constructor(props: IPushButtonProps) {
        super(props);
        this.state = { primed: false };
    }
    render() {
        let classList = this.state.primed ? 'confirm active' : 'confirm';
        return (
            <Button className={classList} hotkey={this.props.hotkey} mouseClick={this.clicked.bind(this)}
                color={this.props.color} disabled={this.props.disabled}>
                {this.props.children}
            </Button>
        );
    }
    private clicked(e: React.MouseEvent) {
        if (this.state.primed) {
            if (this.props.clicked != undefined)
                this.props.clicked();
            
            if (this.props.command !== undefined)
                gameClient.server.send(this.props.command);
        }
        
        this.setState({primed: !this.state.primed});
    }
}
