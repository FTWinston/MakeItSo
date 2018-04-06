import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { actionCreators, WarpState, WarpScreenStatus } from '~/store/Warp';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import { SensorView } from '~/components/general/SensorView';
import { JumpPath, SensorTarget, TextLocalisation, Vector3 } from '~/functionality';
import { JumpCountdown } from './JumpCountdown';
import { JumpEditor } from './JumpEditor';
import { PathList } from './PathList';
import { connection } from '~/Client';
import './Warp.scss';

interface WarpProps extends WarpState {
    text: TextLocalisation;
    sensorTargets: SensorTarget[];
    selectPath: (id: number | undefined) => void;
    setScreenStatus: (status: WarpScreenStatus) => void;
}

interface WarpOptions {
    autoRotate: boolean;
}

class Warp extends ShipSystemComponent<WarpProps, WarpOptions> implements React.Component<WarpProps> {
    constructor(props: WarpProps) {
        super(props);
        
        this.state = {
            autoRotate: true,
        };
    }

    name() { return 'warp'; }

    protected getHelpText() {
        return this.props.text.systemHelp.warp;
    }

    public render() {
        return <div className="system warp">
            {this.renderControlPanel()}
            <SensorView className="warp__sensorMap" autoRotate={this.state.autoRotate} targets={[...this.props.sensorTargets, ...this.props.paths]} />
        </div>;
    }

    private renderControlPanel() {
        switch (this.props.status) {
            case WarpScreenStatus.Viewing:
                return <PathList
                    text={this.props.text}
                    paths={this.props.paths}
                    selectedPath={this.props.activePath}
                    pathSelected={p => this.pathSelected(p)}
                    newSelected={() => this.showEdit()}
                    deletePath={p => this.deletePath(p)}
                    startJump={p => this.startJump(p)}
                />;
            case WarpScreenStatus.Charging:
            case WarpScreenStatus.Jumping:
                return <JumpCountdown
                    text={this.props.text}
                    path={this.props.activePath}
                    endTime={this.props.jumpEndTime}
                    completion={this.props.chargeCompletion}
                    jumping={this.props.status === WarpScreenStatus.Jumping}
                    cancel={() => this.cancelJump()}
                    jump={() => this.performJump()}
                />;
            default:
                return <JumpEditor
                    text={this.props.text}
                    editPath={this.props.activePath}
                    startCalculating={(from, yaw, pitch, power) => this.calculatePath(from, yaw, pitch, power)}
                    rejectPath={() => this.rejectPath()}
                    close={() => this.closeEdit()}
                    cancelCalculation={() => this.cancelCalculation()}
                    status={this.props.status}
                    getShipPos={() => this.props.shipPosition}
                />;
        }
    }

    private pathSelected(path: JumpPath) {
        this.props.selectPath(path === this.props.activePath ? undefined : path.id);
    }

    private showEdit(path?: JumpPath) {
        this.props.selectPath(path === undefined ? undefined : path.id);
        this.props.setScreenStatus(WarpScreenStatus.Plotting);
    }
    private deletePath(path: JumpPath) {
        connection.send(`warp_delete ${path.id}`);
    }

    private startJump(path: JumpPath) {
        connection.send(`warp_prepare_jump ${path.id}`);
    }

    private cancelJump() {
        connection.send('warp_jump_cancel');
    }

    private performJump() {
        connection.send('warp_jump');
    }

    private cancelCalculation() {
        this.props.setScreenStatus(WarpScreenStatus.Plotting);
        connection.send('warp_plot_cancel');
    }

    private closeEdit() {
        this.props.selectPath(undefined);
        this.props.setScreenStatus(WarpScreenStatus.Viewing);
    }
    
    private rejectPath() {
        connection.send('warp_plot_reject');
        this.props.setScreenStatus(WarpScreenStatus.Plotting);
    }

    private calculatePath(from: Vector3, yaw: number, pitch: number, power: number) {
        this.props.setScreenStatus(WarpScreenStatus.Calculating);
        connection.send(`warp_plot ${from.x} ${from.y} ${from.z} ${yaw} ${pitch} ${power}`);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WarpProps = (state) => {
    return {
        ...state.warp,
        sensorTargets: state.sensors.targets,
        text: state.user.text,
        selectPath: actionCreators.selectPath,
        setScreenStatus: actionCreators.setScreenStatus,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
    null,
    { withRef: true },
)(Warp);