interface IViewscreenState {
    pitchAngle?: number;
    yawAngle?: number;
    zoomFactor?: number;
    chaseDistance?: number;
    showViewList?: boolean;
    targetID?: string;
    chaseMode?: boolean;
    commsMode?: boolean;
    selectingTarget?: boolean;
}

class Viewscreen extends React.Component<ISystemProps, IViewscreenState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { pitchAngle: 0, yawAngle: 0, zoomFactor: 1, chaseDistance: 100, showViewList: false, targetID: null, selectingTarget: false };
    }
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this.receiveMessage.bind(this));
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    render() {
        let self = this;
        let zoomOrDistance = this.state.chaseMode ? 'Distance: ' + this.state.chaseDistance + 'm' : 'Magnification: ' + this.state.zoomFactor + 'x';
    
        let targetOptions: JSX.Element[] = [
            "Something",
            "Something else",
            "And another thing"
        ].map(function(name, index) {
            return <Button type={ButtonType.Toggle} key={index} onActivated={function() { self.targetSelected(name) }} description={"Localized description of target location"}>{name}</Button>
        });

        return (
            <system id="viewscreen" style={{display: this.props.visible ? null : 'none'}}>
                <section id="viewscreenAiming" className="large" style={{ display: this.state.selectingTarget ? 'none' : null }}>
                    <ButtonGroup inline={true} color="3">
                        <row>
                            <spacer></spacer>
                            <Button type={ButtonType.Held} hotkey="W" startAction="viewup"> { String.fromCharCode(8679) }</Button>
                            <spacer></spacer>
                        </row>
                        <row className="rounded">
                            <Button type={ButtonType.Held} hotkey="A" startAction="viewleft">{String.fromCharCode(8678)}</Button>
                            <spacer>{language.viewscreenPan}</spacer>
                            <Button type={ButtonType.Held} hotkey="D" startAction="viewright">{String.fromCharCode(8680)}</Button>
                        </row>
                        <row>
                            <spacer></spacer>
                            <Button type={ButtonType.Held} hotkey="S" startAction="viewdown">{String.fromCharCode(8681)}</Button>
                            <spacer></spacer>
                        </row>
                    </ButtonGroup>
                    
                    <ButtonGroup inline={true} color="5">
                        <row>
                            <Button type={ButtonType.Held} hotkey="R" startAction="viewin">{String.fromCharCode(8679)}</Button>
                        </row>
                        <row>
                            <spacer>{language.viewscreenZoom}</spacer>
                        </row>
                        <row>
                            <Button type={ButtonType.Held} hotkey="T" startAction="viewout">{String.fromCharCode(8681)}</Button>
                        </row>
                    </ButtonGroup>

                    <output className="settings">
                        <row>Pitch: {this.state.pitchAngle}°</row>
                        <row>Yaw: {this.state.yawAngle}°</row>
                        <row>{zoomOrDistance}</row>
                    </output>
                </section>
                
                <section id="viewscreenOptions" className="small" style={{ display: this.state.selectingTarget ? 'none' : null }}>
                    <spacer className="adaptiveVerticalMinWidth" data-width="14em">
                        <Choice inline={true} color="2" class="smDropdown" dropdown={{label: language.viewscreenDirection, popUpwards: true}} disabled={this.state.targetID != null}>
                            <row>
                                <Button type={ButtonType.Toggle} hotkey="F" startAction="viewdir 0 0">{language.viewscreenDirectionForward}</Button>
                                <Button type={ButtonType.Toggle} hotkey="G" startAction="viewdir 270 0">{language.viewscreenDirectionLeft}</Button>
                                <Button type={ButtonType.Toggle} hotkey="H" startAction="viewdir 90 0">{language.viewscreenDirectionRight}</Button>
                            </row>
                            <row>
                                <Button type={ButtonType.Toggle} hotkey="C" startAction="viewdir 180 0">{language.viewscreenDirectionBackward}</Button>
                                <Button type={ButtonType.Toggle} hotkey="V" startAction="viewdir 0 90">{language.viewscreenDirectionUp}</Button>
                                <Button type={ButtonType.Toggle} hotkey="B" startAction="viewdir 0 -90">{language.viewscreenDirectionDown}</Button>
                            </row>
                        </Choice>
                    </spacer>

                    <Button type={ButtonType.Toggle} color="4" hotkey="N" startAction="+viewchase" stopAction="-viewchase" disabled={this.state.targetID != null}>{language.viewscreenChaseMode}</Button>
                    <Button type={ButtonType.Toggle} color="8" hotkey="M" startAction="+viewcomms" stopAction="-viewcomms">{language.viewscreenCommsChannel}</Button>

                    <ButtonGroup inline={true} color="1">
                        <Button type={ButtonType.Push} hotkey="X" onClicked={function () { self.setState({selectingTarget: true})} }>{language.viewscreenTarget}</Button>
                        <Button type={ButtonType.Toggle} forceActive={self.state.targetID != null} disabled={self.state.targetID == null} onDeactivated={function () { self.targetSelected(null); }}>{self.state.targetID == null ? language.viewscreenNoTarget : self.state.targetID}</Button>
                    </ButtonGroup>
                </section>

                <section id="viewscreenTargets" className="full" style={{display: this.state.selectingTarget ? null : 'none'}}>
                    <Choice class="forceVertical" color="5" allowUnselected={true}>
                        {targetOptions}
                    </Choice>
                </section>
            </system>
        );
    }
    receiveMessage(msg, data) {
        switch(msg) {
            case 'view':
                var values = data.split(' ');
                if (values.length != 2) {
                    console.error(language.errorParameterNumber.replace('@num@', '2'));
                    return false;
                }
                var yaw = parseFloat(values[0]), pitch = parseFloat(values[1]);
                if (isNaN(yaw) || isNaN(pitch)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                this.setState({ yawAngle: yaw, pitchAngle: pitch });
                return true;
            case 'zoom':
                var zoom = parseFloat(data);
                if (isNaN(zoom)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                this.setState({ zoomFactor: zoom });
                return true;
            case 'dist':
                var dist = parseFloat(data);
                if (isNaN(dist)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                this.setState({ chaseDistance: dist });
                return true;
            case 'chase':
                this.setState({ chaseMode: data == "on" });
                return true;
            case 'comms':
                this.setState({ commsMode: data == "on" });
                return true;
            default:
                return false;
        }
    }
    targetSelected(targetID) {
        console.log('targetSelected', targetID);
        let state:IViewscreenState = {targetID: targetID, selectingTarget: false};
        if (targetID == null) {
            state.pitchAngle = 0;
            state.yawAngle = 0;
            state.zoomFactor = 1;
        }
        this.setState(state);
        if (gameClient !== undefined)
            gameClient.server.send(targetID == null ? 'viewdir 0 0' : 'viewtarget ' + targetID);
    }
}