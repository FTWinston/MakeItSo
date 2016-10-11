interface IHelmState {
    forwardSpeed?: number;
    lateralSpeed?: number;
    verticalSpeed?: number;
    pitchAngle?: number;
    yawAngle?: number;
    rollAngle?: number;
    warpFactor?: number;
}

class Helm extends React.Component<ISystemProps, IHelmState> implements ISystem {
    static defaultProps = {
        touchMode: FeatureState.Disabled, registerCallback: null
    }
    constructor(props) {
        super(props);
        this.state = { forwardSpeed: 0, lateralSpeed: 0, verticalSpeed: 0, pitchAngle: 0, yawAngle: 0, rollAngle: 0, warpFactor: 0 };
    }
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this.receiveMessage);
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    render() {
        return (
            <system style={{ display: this.props.visible ? null : 'none' }}>
                <ButtonGroup inline={true} color="1" visible={this.props.touchMode != FeatureState.Enabled} caption="rotation">
                    <row>
                        <spacer></spacer>
                        <Button type={ButtonType.Held} hotkey="W" startAction="+down" stopAction="-down">down</Button>
                        <spacer></spacer>
                    </row>
                    <row className="rounded">
                        <Button type={ButtonType.Held} hotkey="A" startAction="+left" stopAction="-left">left</Button>
                        <Button type={ButtonType.Toggle} startAction="stoprotate">stop</Button>
                        <Button type={ButtonType.Held} hotkey="D" startAction="+right" stopAction="-right">right</Button>
                    </row>
                    <row>
                        <spacer></spacer>
                        <Button type={ButtonType.Held} hotkey="S" startAction="+up" stopAction="-up">up</Button>
                        <spacer></spacer>
                    </row>
                </ButtonGroup>
                
                <AxisInput visible={this.props.touchMode == FeatureState.Enabled} direction="both" caption="rotation" color="1" scale={0.02} movementCallback={this.touchRotation} />
                
                <ButtonGroup inline={true} color="2" visible={this.props.touchMode != FeatureState.Enabled}>
                    <row>
                        <Button type={ButtonType.Held} hotkey="R" startAction="+forward" stopAction="-forward">forward</Button>
                    </row>
                    <row>
                        <Button type={ButtonType.Toggle} hotkey="F">stop</Button>
                    </row>
                    <row>
                        <Button type={ButtonType.Held} hotkey="V" startAction="+backward" stopAction="-backward">backward</Button>
                    </row>
                </ButtonGroup>
                
                <AxisInput visible={this.props.touchMode == FeatureState.Enabled} direction="vertical" color="2" scale={0.02} movementCallback={this.touchForwardBack} />
                
                <ButtonGroup inline={true} color="3" visible={this.props.touchMode != FeatureState.Enabled} caption="translation">
                    <row>
                        <spacer></spacer>
                        <Button type={ButtonType.Held} hotkey="I" startAction="+moveup" stopAction="-moveup">up</Button>
                        <spacer></spacer>
                    </row>
                    <row className="rounded">
                        <Button type={ButtonType.Held} hotkey="J" startAction="+moveleft" stopAction="-moveleft">left</Button>
                        <Button type={ButtonType.Toggle} startAction="stoptranslate">stop</Button>
                        <Button type={ButtonType.Held} hotkey="L" startAction="+moveright" stopAction="-moveright">right</Button>
                    </row>
                    <row>
                        <spacer></spacer>
                        <Button type={ButtonType.Held} hotkey="K" startAction="+movedown" stopAction="-movedown">down</Button>
                        <spacer></spacer>
                    </row>
                </ButtonGroup>
                
                <AxisInput visible={this.props.touchMode == FeatureState.Enabled} direction="both" caption="translation" scale={0.02} color="3" movementCallback={this.touchTranslation} />
                
                <ButtonGroup inline={true} color="4" caption="warp factor">
                    <row>
                        <Button type={ButtonType.Push} hotkey="T" action="warpup">increase</Button>
                    </row>
                    <row>
                        <Button type={ButtonType.Push} hotkey="G" action="warpdown">decrease</Button>
                    </row>
                    <row>
                        <Button type={ButtonType.Toggle} hotkey="B" startAction="warpstop">stop</Button>
                    </row>
                </ButtonGroup>
                
                <div className="text">
                    Forward speed: {this.state.forwardSpeed} m/s{'\n'}
                    Lateral speed: {this.state.lateralSpeed} m/s{'\n'}
                    Vertical speed: {this.state.verticalSpeed} m/s{'\n\n'}
                    
                    Warp factor: {this.state.warpFactor}{'\n\n'}
                    
                    Pitch: {this.state.pitchAngle}°{'\n'}
                    Yaw: {this.state.yawAngle}°{'\n'}
                    Roll: {this.state.rollAngle}°
                </div>
            </system>
        );
    }
    receiveMessage(msg, data) {
        return false;
    }
    touchRotation(dx, dy) {
        gameClient.server.send('yaw ' + dx);
        gameClient.server.send('pitch ' + dx);
    }
    touchForwardBack(dx, dy) {
        // ideally, this should control "joystick" input directly, instead of messing with the "key" input
        if (dy < 0)
            gameClient.server.send('+forward ' + (-dy));
        else if (dy == 0) {
            gameClient.server.send('-forward');
            gameClient.server.send('-backward');
        }
        else
            gameClient.server.send('+backward ' + dy);
    }
    touchTranslation(dx, dy) {
        // ideally, this should control "joystick" input directly, instead of messing with the "key" input
        if (dx < 0)
            gameClient.server.send('+moveleft ' + (-dx));
        else if (dx == 0) {
            gameClient.server.send('-moveleft');
            gameClient.server.send('-moveright');
        }
        else
            gameClient.server.send('+moveright ' + dx);
        
        if (dy < 0)
            gameClient.server.send('+moveup ' + (-dy));
        else if (dy == 0) {
            gameClient.server.send('-moveup');
            gameClient.server.send('-movedown');
        }
        else
            gameClient.server.send('+movedown ' + dy);
    }
}