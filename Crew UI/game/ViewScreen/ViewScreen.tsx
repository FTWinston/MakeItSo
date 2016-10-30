interface IViewscreenState {
    zoomOrDistance?: number;
    pitchAngle?: number;
    yawAngle?: number;
    showViewList?: boolean;
    targetID?: string;
    selectingTarget?: boolean;
}

class Viewscreen extends React.Component<ISystemProps, IViewscreenState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { zoomOrDistance: 1, pitchAngle: 0, yawAngle: 0, showViewList: false, targetID: null, selectingTarget: false };
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
        let self = this;
        let zoomOrDistance = this.state.zoomOrDistance > 0 ? 'Magnification: ' + this.state.zoomOrDistance + 'x' : 'Distance: ' + this.state.zoomOrDistance + 'm';

        return (
            <system id="viewscreen" style={{display: this.props.visible ? null : 'none'}}>
                <section id="viewscreenAiming" className="large">
                    <ButtonGroup inline={true} color="3">
                        <row>
                            <spacer></spacer>
                            <Button type={ButtonType.Held} hotkey="W" startAction="+viewup" stopAction="-viewup">{String.fromCharCode(8679)}</Button>
                            <spacer></spacer>
                        </row>
                        <row className="rounded">
                            <Button type={ButtonType.Held} hotkey="A" startAction="+viewleft" stopAction="-viewleft">{String.fromCharCode(8678)}</Button>
                            <spacer>{language.viewscreenPan}</spacer>
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
                            <Button type={ButtonType.Held} hotkey="R" startAction="+viewin" stopAction="-viewin">{String.fromCharCode(8679)}</Button>
                        </row>
                        <row>
                            <spacer>{language.viewscreenZoom}</spacer>
                        </row>
                        <row>
                            <Button type={ButtonType.Held} hotkey="T" startAction="+viewout" stopAction="-viewout">{String.fromCharCode(8681)}</Button>
                        </row>
                    </ButtonGroup>

                    <output className="settings">
                        <row>Pitch: {this.state.pitchAngle}°</row>
                        <row>Yaw: {this.state.yawAngle}°</row>
                        <row>{zoomOrDistance}</row>
                    </output>
                </section>
                
                <section id="viewscreenOptions" className="small" style={{display: this.state.selectingTarget ? 'none' : null}}>
                    <spacer className="adaptiveVerticalMinWidth" data-width="14em">
                        <Choice inline={true} color="2" class="smDropdown" dropdown={{label: language.viewscreenDirection, popUpwards: true}}>
                            <row>
                                <Button type={ButtonType.Toggle} hotkey="F" startAction="viewdir 0 0">{language.viewscreenDirectionForward}</Button>
                                <Button type={ButtonType.Toggle} hotkey="G" startAction="viewdir 270 0">{language.viewscreenDirectionLeft}</Button>
                                <Button type={ButtonType.Toggle} hotkey="H" startAction="viewdir 90 0">{language.viewscreenDirectionRight}</Button>
                            </row>
                            <row>
                                <Button type={ButtonType.Toggle} hotkey="C" startAction="viewdir 180 0">{language.viewscreenDirectionBackward}</Button>
                                <Button type={ButtonType.Toggle} hotkey="V" startAction="viewdir 0 90">{language.viewscreenDirectionUp}</Button>
                                <Button type={ButtonType.Toggle} hotkey="B" startAction="viewdir 0 270">{language.viewscreenDirectionDown}</Button>
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
                <section id="viewscreenTargets" className="small" style={{display: this.state.selectingTarget ? null : 'none'}}>
                    <List options={["Something", "Something else", "And another thing"]} onSelectionChanged={this.targetSelected.bind(this)} />
                </section>
            </system>
        );
    }
    receiveMessage(msg, data) {
        switch(msg) {
            case 'view':
                var values = data.split(' ');
                if (values.length != 3) {
                    console.error(language.errorParameterNumber.replace('@num@', '3'));
                    return false;
                }
                var yaw = parseFloat(values[0]), pitch = parseFloat(values[1]), zoom = parseFloat(values[2]);
                if (isNaN(yaw) || isNaN(pitch) || isNaN(zoom)) {
                    console.error(language.errorParameterNotNumeric);
                    return false;
                }
                this.setState({ yawAngle: yaw, pitchAngle: pitch, zoomOrDistance: zoom});
                return true;
            default:
                return false;
        }
    }
    targetSelected(targetID) {
        let state:IViewscreenState = {targetID: targetID, selectingTarget: false};
        if (targetID == null) {
            state.pitchAngle = 0;
            state.yawAngle = 0;
            state.zoomOrDistance = 1;
        }
        this.setState(state);
        gameClient.server.send(targetID == null ? 'viewdir 0 0' : 'viewtarget ' + targetID);
    }
}