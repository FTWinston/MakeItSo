interface IPushButtonProps extends IButtonProps {
    clicked?: () => void;
    command?: string;
}

class PushButton extends React.Component<IPushButtonProps, {}> {
    render() {
        let classList = 'push';
        return <Button className={classList} hotkey={this.props.hotkey} mouseClick={this.clicked.bind(this)} color={this.props.color}
                disabled={this.props.disabled} title={this.props.title} text={this.props.text} help={this.props.help} />;
    }
    private clicked(e: React.MouseEvent) {
        if (this.props.clicked !== undefined)
            this.props.clicked();
        
        if (this.props.command !== undefined)
            gameClient.server.send(this.props.command);
    }
}