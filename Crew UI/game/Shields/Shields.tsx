class Shields extends React.Component<ISystemProps, {}> implements ISystem {
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this);
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    render() {
        let portrait = this.props.width >= this.props.height;
        let shieldWidth = portrait ? Math.round(this.props.width * 0.8) : this.props.width;
        let shieldHeight = portrait ? this.props.height : Math.round(this.props.height * 0.85);

        return (
            <system id="shields" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="xlarge">
                    <ShieldDisplay ref="shield" width={shieldWidth} height={shieldHeight} visible={this.props.visible} />
                </section>
                <section className="xsmall">
                    Toggle shields on/off.
                    Hints and tips?
                </section>
            </system>
        );
    }
    receiveMessage(msg, data) {
        switch(msg) {
            case 'set':
                var values = data.split(' ');
                if (values.length != 3) {
                    console.error(language.errorParameterNumber.replace('@num@', '3'));
                    return false;
                }
                var index = parseInt(values[0]), type = parseInt(values[1]), color = parseInt(values[2]);
                if (isNaN(index) || isNaN(type) || isNaN(color)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                (this.refs['shield'] as ShieldDisplay).setBlock(index, type, color);
                return true;
            default:
                return false;
        }
    }
    clearAllData() {

    }
}