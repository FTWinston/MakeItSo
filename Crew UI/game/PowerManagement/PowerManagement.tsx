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
        return (
            <system id="power" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="xsmall">
                    Aux Power System Select
                </section>
                <section className="med-small">
                    <PowerCardChoice ref="cards" visible={this.props.visible} />
                </section>
                <section className="med-small">
                    Card library
                </section>
            </system>
        );
    }
    receiveMessage(msg, data) {
        switch(msg) {
            default:
                return false;
        }
    }
    clearAllData() {

    }
}