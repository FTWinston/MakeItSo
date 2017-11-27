interface IPushButtonProps extends IButtonProps {
    clicked?: () => void;
    command?: string;
}

interface IPushButtonState {
    held: boolean;
}

class PushButton extends React.Component<IPushButtonProps, IPushButtonState> {
    constructor(props: IHeldButtonProps) {
        super(props);
        this.state = { held: false };
    }
    render() {
        let classList = this.state.held ? 'push active' : 'push';
        if (this.props.className !== undefined)
            classList += ' ' + this.props.className;
        
        return <Button className={classList} hotkey={this.props.hotkey} mouseClick={this.clicked.bind(this)} color={this.props.color} disabled={this.props.disabled} fullBorder={this.props.fullBorder}
                mouseDown={this.mouseDown.bind(this)} mouseUp={this.mouseUp.bind(this)} title={this.props.title} text={this.props.text} subtext={this.props.subtext} help={this.props.help} />;
    }
    private clicked(e: React.MouseEvent) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        
        if (this.props.command !== undefined)
            gameClient.server.send(this.props.command);
    }
    private mouseDown(e: React.MouseEvent) {
        this.setState({held: true});
    }
    private mouseUp(e: React.MouseEvent) {
        this.setState({held: false});
    }
}