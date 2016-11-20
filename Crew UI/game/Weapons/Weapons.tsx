interface IWeaponState {
    target?: WeaponTarget;
}

class Weapons extends React.Component<ISystemProps, IWeaponState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { target: null };
    }
    componentDidMount () {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this);
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    render() {
        var selectWidth = this.props.width * 0.6;
        var infoWidth = this.props.width - selectWidth;
        
        return (
            <system id="weapons" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="large">
                    <WeaponTargetSelect ref="select" width={selectWidth} height={this.props.height} visible={this.props.visible} targetSelected={this.targetSelected.bind(this) } />
                </section>
                <section className="small">
                    <WeaponTargetInfo ref="target" width={infoWidth} height={this.props.height} visible={this.props.visible} target={this.state.target} />
                </section>
            </system>
        );
    }
    receiveMessage(msg, data) {
        if (msg == 'clr') {
            (this.refs['select'] as WeaponTargetSelect).clearAllTargets();
            this.setState({target: null});
            return true;
        }
        
        var params = data.split(' ');
        switch (msg) {
            case 'add':
                var size = parseInt(params[1]), status = parseInt(params[2]);
                var angle = parseInt(params[3]), dist = parseInt(params[4]);
                if (isNaN(size) || isNaN(status) || isNaN(angle) || isNaN(dist)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                return (this.refs['select'] as WeaponTargetSelect).addTarget(params[0], size, status, angle, dist);
            case 'rem':
                return (this.refs['select'] as WeaponTargetSelect).removeTarget(params[0]);
            case 'mov':
                var angle = parseInt(params[1]), dist = parseInt(params[2]);
                if (isNaN(angle) || isNaN(dist)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                return (this.refs['select'] as WeaponTargetSelect).moveTarget(params[0], angle, dist);
            case 'upd':
                var status = parseInt(params[1]);
                if (isNaN(status)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                return (this.refs['select'] as WeaponTargetSelect).changeTarget(params[0], status);
            default:
                return false;
        }
    }
    clearAllData() {

    }
    targetSelected(target) {
        this.setState({target: target});
    }
}