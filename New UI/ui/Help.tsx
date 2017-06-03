interface IHelpProps {
    title: string,
    content: string,
    closed?: () => void,
}

class Help extends React.Component<IHelpProps, {}> {
    render() {
        let closeButton = this.props.closed === undefined ? undefined
            : <IconButton clicked={this.props.closed} icon="close" />; // hotkey="esc"

        return (
        <div className="helpView">
            <h1>{language.common.help}: {this.props.title}</h1>
            <div className="content" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            <Menu>
                {closeButton}
            </Menu>
        </div>
        );
    }
}