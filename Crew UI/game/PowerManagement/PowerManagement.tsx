class PowerManagement extends React.Component<ISystemProps, {}> implements ISystem {
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this);
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    render() {
        let portrait = this.props.width < this.props.height, distribSize: number, cardWidth: number, cardHeight: number;
        if (portrait) {
            distribSize = Math.min(this.props.width, this.props.height * 0.85);
            
            cardWidth = this.props.width;
            cardHeight = this.props.height - distribSize;
        }
        else {
            distribSize = Math.min(this.props.width * 0.8, this.props.height);

            cardWidth = this.props.width - distribSize;
            cardHeight = this.props.height;
        }

        return (
            <system id="power" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="large">
                    <PowerDistribution ref="distribution" width={distribSize} height={distribSize} visible={this.props.visible} />
                </section>
                <section className="small">
                    <PowerCards ref="cards" width={cardWidth} height={cardHeight} visible={this.props.visible} />
                </section>
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
    clearAllData() {

    }
}