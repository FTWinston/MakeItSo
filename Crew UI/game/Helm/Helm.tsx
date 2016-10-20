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
                <ButtonGroup inline={true} color="1" visible={this.props.inputMode == InputMode.ButtonsWithKeyboardShortcuts} caption={language.helmRotation}>
                    <row>
                        <spacer></spacer>
                        <Button type={ButtonType.Held} hotkey="W" startAction="+down" stopAction="-down">{language.helmRotateDown}</Button>
                        <spacer></spacer>
                    </row>
                    <row className="rounded">
                        <Button type={ButtonType.Held} hotkey="A" startAction="+left" stopAction="-left">{language.helmRotateLeft}</Button>
                        <Button type={ButtonType.Toggle} startAction="stoprotate">{language.helmRotateStop}</Button>
                        <Button type={ButtonType.Held} hotkey="D" startAction="+right" stopAction="-right">{language.helmRotateRight}</Button>
                    </row>
                    <row>
                        <spacer></spacer>
                        <Button type={ButtonType.Held} hotkey="S" startAction="+up" stopAction="-up">{language.helmRotateUp}</Button>
                        <spacer></spacer>
                    </row>
                </ButtonGroup>
                
                <AxisInput visible={this.props.inputMode == InputMode.TouchscreenOnly} direction="both" caption={language.helmRotation} color="1" scale={0.02} movementCallback={this.touchRotation} />
                
                <ButtonGroup inline={true} color="2" visible={this.props.inputMode == InputMode.ButtonsWithKeyboardShortcuts}>
                    <row>
                        <Button type={ButtonType.Held} hotkey="R" startAction="+forward" stopAction="-forward">{language.helmSpeedForward}</Button>
                    </row>
                    <row>
                        <Button type={ButtonType.Toggle} hotkey="F">{language.helmSpeedStop}</Button>
                    </row>
                    <row>
                        <Button type={ButtonType.Held} hotkey="V" startAction="+backward" stopAction="-backward">{language.helmSpeedBackward}</Button>
                    </row>
                </ButtonGroup>
                
                <AxisInput visible={this.props.inputMode == InputMode.TouchscreenOnly} direction="vertical" color="2" scale={0.02} movementCallback={this.touchForwardBack} />
                
                <ButtonGroup inline={true} color="3" visible={this.props.inputMode == InputMode.ButtonsWithKeyboardShortcuts} caption={language.helmTranslation}>
                    <row>
                        <spacer></spacer>
                        <Button type={ButtonType.Held} hotkey="I" startAction="+moveup" stopAction="-moveup">{language.helmTranslateUp}</Button>
                        <spacer></spacer>
                    </row>
                    <row className="rounded">
                        <Button type={ButtonType.Held} hotkey="J" startAction="+moveleft" stopAction="-moveleft">{language.helmTranslateLeft}</Button>
                        <Button type={ButtonType.Toggle} startAction="stoptranslate">{language.helmSpeedStop}</Button>
                        <Button type={ButtonType.Held} hotkey="L" startAction="+moveright" stopAction="-moveright">{language.helmTranslateRight}</Button>
                    </row>
                    <row>
                        <spacer></spacer>
                        <Button type={ButtonType.Held} hotkey="K" startAction="+movedown" stopAction="-movedown">{language.helmTranslateDown}</Button>
                        <spacer></spacer>
                    </row>
                </ButtonGroup>
                
                <AxisInput visible={this.props.inputMode == InputMode.TouchscreenOnly} direction="both" caption={language.helmTranslation} scale={0.02} color="3" movementCallback={this.touchTranslation} />
                
                <ButtonGroup inline={true} color="4" caption={language.helmWarpFactor}>
                    <row>
                        <Button type={ButtonType.Push} hotkey="T" action="warpup">{language.helmWarpIncrease}</Button>
                    </row>
                    <row>
                        <Button type={ButtonType.Push} hotkey="G" action="warpdown">{language.helmWarpDecrease}</Button>
                    </row>
                    <row>
                        <Button type={ButtonType.Toggle} hotkey="B" startAction="warpstop">{language.helmWarpStop}</Button>
                    </row>
                </ButtonGroup>
                
                <output>
                    {language.helmForwardSpeedOutput} {this.state.forwardSpeed} m/s{'\n'}
                    {language.helmSidewaysSpeedOutput} {this.state.lateralSpeed} m/s{'\n'}
                    {language.helmVerticalSpeedOutput} {this.state.verticalSpeed} m/s{'\n\n'}
                    
                    {language.helmWarpFactorOutput} {this.state.warpFactor}{'\n\n'}
                    
                    {language.helmPitchOutput} {this.state.pitchAngle}°{'\n'}
                    {language.helmYawOutput} {this.state.yawAngle}°{'\n'}
                    {language.helmRollOutput} {this.state.rollAngle}°
                </output>
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