class PowerManagement extends React.Component<ISystemProps, {}> implements ISystem {
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this.receiveMessage.bind(this));
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    render() {
        var distribSize = Math.min(this.props.width * 0.8, this.props.height);
        var cardWidth = this.props.width - distribSize;
        
        return (
            <system style={{display: this.props.visible ? null : 'none'}}>
                <PowerDistribution ref="distribution" width={distribSize} height={distribSize} visible={this.props.visible} />
                <PowerCards ref="cards" width={cardWidth} height={this.props.height} />
            </system>
        );
    }
    receiveMessage(msg, data) {
        switch(msg) {
            case 'break':
                var node = parseInt(data);
                if (isNaN(node)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                (this.refs['distribution'] as PowerDistribution).wireChanged(node, true);
                return true;
            case 'fix':
                var node = parseInt(data);
                if (isNaN(node)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                (this.refs['distribution'] as PowerDistribution).wireChanged(node, false);
                return true;
            default:
                return false;
        }
    }
}