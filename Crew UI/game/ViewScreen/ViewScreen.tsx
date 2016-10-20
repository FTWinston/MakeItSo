interface IViewscreenState {
    zoomFactor: number;
    pitchAngle: number;
    yawAngle: number;
}

class Viewscreen extends React.Component<ISystemProps, IViewscreenState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { zoomFactor: 1, pitchAngle: 0, yawAngle: 0 };
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
            <system style={{display: this.props.visible ? null : 'none'}}>
                <section id="viewscreenAiming">
                    <ButtonGroup inline={true} color="3">
                        <row>
                            <spacer></spacer>
                            <Button type={ButtonType.Held} hotkey="W" startAction="+viewup" stopAction="-viewup">{String.fromCharCode(8679)}</Button>
                            <spacer></spacer>
                        </row>
                        <row className="rounded">
                            <Button type={ButtonType.Held} hotkey="A" startAction="+viewleft" stopAction="-viewleft">{String.fromCharCode(8678)}</Button>
                            <spacer>Pan</spacer>
                            <Button type={ButtonType.Held} hotkey="D" startAction="+viewright" stopAction="-viewright">{String.fromCharCode(8680)}</Button>
                        </row>
                        <row>
                            <spacer></spacer>
                            <Button type={ButtonType.Held} hotkey="S" startAction="+viewdown" stopAction="-viewdown">{String.fromCharCode(8681)}</Button>
                            <spacer></spacer>
                        </row>
                    </ButtonGroup>
                    
                    <ButtonGroup inline={true} color="5">
                        <row>
                            <Button type={ButtonType.Held} hotkey="R" startAction="+zoomin" stopAction="-zoomin">{String.fromCharCode(8679)}</Button>
                        </row>
                        <row>
                            <spacer>Zoom</spacer>
                        </row>
                        <row>
                            <Button type={ButtonType.Held} hotkey="T" startAction="+zoomout" stopAction="-zoomout">{String.fromCharCode(8681)}</Button>
                        </row>
                    </ButtonGroup>

                    <output className="settings">
                        <row>Pitch: {this.state.pitchAngle}°</row>
                        <row>Yaw: {this.state.yawAngle}°</row>
                        <row>Magnification: {this.state.zoomFactor}x</row>
                    </output>
                </section>
                
                <section>
                    <Button type={ButtonType.Push} color="3" hotkey="N" >{language.viewscreenTarget}</Button>
                    <Button type={ButtonType.Toggle} color="8" hotkey="M" startAction="+viewcomms" stopAction="-viewcomms">{language.viewscreenCommsChannel}</Button>

                    <Choice inline={true} color="2" class="smDropdown">
                        <Button type={ButtonType.Push} class="expand" onPressed={function() { }}>Direction</Button>
                        <row>
                            <Button type={ButtonType.Toggle} hotkey="F" startAction="view forward">{language.viewscreenDirectionForward}</Button>
                            <Button type={ButtonType.Toggle} hotkey="G" startAction="view port">{language.viewscreenDirectionLeft}</Button>
                            <Button type={ButtonType.Toggle} hotkey="H" startAction="view starboard">{language.viewscreenDirectionRight}</Button>
                        </row>
                        <row>
                            <Button type={ButtonType.Toggle} hotkey="C" startAction="view starboard">{language.viewscreenDirectionBackward}</Button>
                            <Button type={ButtonType.Toggle} hotkey="V" startAction="view starboard">{language.viewscreenDirectionUp}</Button>
                            <Button type={ButtonType.Toggle} hotkey="B" startAction="view starboard">{language.viewscreenDirectionDown}</Button>
                        </row>
                    </Choice>
                    <Button type={ButtonType.Toggle} color="4" hotkey="N" startAction="+chase" stopAction="-chase">{language.viewscreenChaseMode}</Button>
                </section>
            </system>
        );
        // <List options={["Something", "Something else", "And another thing"]} onSelectionChanged={this.targetSelected.bind(this)} />
    }
    receiveMessage(msg, data) {
        return false;
    }
    targetSelected(targetID) {
        console.log('You selected ' + targetID);
    }
}