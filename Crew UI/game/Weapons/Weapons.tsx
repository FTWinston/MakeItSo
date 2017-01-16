interface IWeaponState {
    target?: WeaponTarget;
    rollNumber?: number;
}

class Weapons extends React.Component<ISystemProps, IWeaponState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { target: null, rollNumber: 1 };
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
        return (
            <system id="weapons" style={{ display: this.props.visible ? null : 'none' }}>
                <section className="select">
                    <WeaponTargetSelect ref="select" visible={this.props.visible} targetSelected={this.targetSelected.bind(this) } />
                </section>
                <section className="target noGrow">
                    <section className="dice noGrow">
                        <WeaponDice ref="d1" value={1} />
                        <WeaponDice ref="d2" value={5} />
                        <WeaponDice ref="d3" value={3} />
                        <WeaponDice ref="d4" value={6} />
                        <WeaponDice ref="d5" value={2} />
                    </section>
                    <section className="btns noGrow">
                        <ButtonGroup inline={true}>
                            <Button color="2" type={ButtonType.Push} action="wpnroll">{this.state.rollNumber == 1 ? language.weaponRoll : language.weaponReroll}</Button>
                            <Button color="1" type={ButtonType.Push} action="wpnfire">{language.weaponFire}</Button>
                        </ButtonGroup>
                    </section>
                    <WeaponTargetInfo ref="target" visible={this.props.visible} target={this.state.target} />
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