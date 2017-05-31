interface IHelpProps {
    title: string,
    closed?: () => void,
}

class Help extends React.Component<IHelpProps, {}> {
    render() {
        let closeButton = this.props.closed === undefined ? undefined
            : <PushButton text="X" clicked={this.props.closed} hotkey="esc" />;

        return (
        <div className="helpView">
            <h1>{this.props.title}</h1>
            {this.props.children}
            <Menu>
                {closeButton}
            </Menu>
        </div>
        );
    }
}