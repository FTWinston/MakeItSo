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
                color={this.props.color} disabled={this.props.disabled} title={this.props.title} buttonType="submit">
                {this.props.children}
            </Button>
        );
    }
    autoCancel?: number;
    private clicked(e: React.MouseEvent) {
        if (this.state.primed) {
            this.clearAutoCancel();

            if (this.props.clicked != undefined)
                this.props.clicked();
            
            if (this.props.command !== undefined)
                gameClient.server.send(this.props.command);
        }
        else {
            this.autoCancel = setTimeout(this.cancelPrime.bind(this), 10000);
        }

        this.setState({primed: !this.state.primed});
        e.preventDefault();
    }
    private cancelPrime() {
        if (this.state.primed)
            this.setState({primed: false});
        this.autoCancel = undefined;
    }
    private clearAutoCancel() {
        if (this.autoCancel !== undefined) {
            clearTimeout(this.autoCancel);
            this.autoCancel = undefined;
        }
    }
    componentWillUnmount() {
        this.clearAutoCancel();
    }
}
