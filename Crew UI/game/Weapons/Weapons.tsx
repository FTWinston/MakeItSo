interface IWeaponState {
    target?: WeaponTarget;
    dice?: number[];
    lockedDice?: boolean[];
    rollNumber?: number;
}

class Weapons extends React.Component<ISystemProps, IWeaponState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = {
            target: null, rollNumber: 0,
            dice: [0, 0, 0, 0, 0],
            lockedDice: [false, false, false, false, false],
        };
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
                        <WeaponDice ref="d1" value={this.state.dice[0]} locked={this.state.lockedDice[0]} toggle={function() {this.toggleDiceLock(0); }.bind(this)} />
                        <WeaponDice ref="d2" value={this.state.dice[1]} locked={this.state.lockedDice[1]} toggle={function() {this.toggleDiceLock(1); }.bind(this)} />
                        <WeaponDice ref="d3" value={this.state.dice[2]} locked={this.state.lockedDice[2]} toggle={function() {this.toggleDiceLock(2); }.bind(this)} />
                        <WeaponDice ref="d4" value={this.state.dice[3]} locked={this.state.lockedDice[3]} toggle={function() {this.toggleDiceLock(3); }.bind(this)} />
                        <WeaponDice ref="d5" value={this.state.dice[4]} locked={this.state.lockedDice[4]} toggle={function() {this.toggleDiceLock(4); }.bind(this)} />
                    </section>
                    <section className="btns noGrow">
                        <ButtonGroup class="spread" inline={true}>
                            <Button color="2" type={ButtonType.Push} onPressed={this.rollDice.bind(this)}>{this.state.rollNumber == 0 ? language.weaponRoll : language.weaponReroll}</Button>
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
        else if (msg == 'dice') {
            let rolls = parseInt(data.charAt(0));
            let dice = [0, 0, 0, 0, 0];
            let locked = [false, false, false, false, false];

            for (let i=0; i<5; i++) {
                dice[i] = parseInt(data.charAt(i + 1));
                locked[i] = data.charAt(i + 6) == '1';
            }
            console.log('updating dice: ', data);
            console.log('updated dice: ', dice);
            this.setState({
                rollNumber: rolls,
                dice: dice,
                lockedDice: locked,
            });
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
    private toggleDiceLock(diceNum) {
        let locked = this.state.lockedDice.slice();
        let locking = !locked[diceNum];

        if (locking && this.state.dice[diceNum] == 0)
            return; // don't lock a "blank" dice

        locked[diceNum] = locking;
        this.setState({ lockedDice: locked });
    }
    private rollDice() {
        let msg = 'wpnroll ';
        for (let i=0; i<5; i++)
            msg += this.state.lockedDice[i] ? '1' : '0';
        gameClient.server.send(msg);
    }
}