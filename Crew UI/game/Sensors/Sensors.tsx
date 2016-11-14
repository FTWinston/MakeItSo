class Sensors extends React.Component<ISystemProps, {}> implements ISystem {
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this.receiveMessage.bind(this));
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    render() {
        return (
            <system style={{display: this.props.visible ? null : 'none'}}>
                    
            </system>
        );
    }
    receiveMessage(msg, data) {
        return false;
    }
}