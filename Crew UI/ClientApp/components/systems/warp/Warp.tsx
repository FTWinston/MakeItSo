import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/Store';
import { actionCreators, WarpState, WarpScreenStatus } from '~/store/Warp';
import { SensorView } from '~/components/general/SensorView';
import { JumpPath, SensorTarget, TextLocalisation, Vector3 } from '~/functionality';
import { JumpCountdown } from './JumpCountdown';
import { JumpEditor } from './JumpEditor';
import { PathList } from './PathList';
import { connection } from '~/Client';
import './Warp.scss';

interface WarpDataProps extends WarpState {
    text: TextLocalisation;
    sensorTargets: SensorTarget[];
}

type WarpProps = WarpDataProps
    & typeof actionCreators;

class Warp extends React.PureComponent<WarpProps, {}> {
    public render() {
        return <div className="system warp">
            {this.renderControlPanel()}
            <SensorView className="warp__sensorMap" targets={[...this.props.sensorTargets, ...this.props.paths]} />
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
                    cancel={() => this.cancelEdit()}
                    calculating={this.props.status === WarpScreenStatus.Calculating}
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

    private cancelEdit() {
        if (this.props.status === WarpScreenStatus.Calculating) {
            connection.send('warp_plot_cancel');
        }

        this.props.selectPath(undefined);
        this.props.setScreenStatus(WarpScreenStatus.Viewing);
    }
    
    private calculatePath(from: Vector3, yaw: number, pitch: number, power: number) {
        this.props.setScreenStatus(WarpScreenStatus.Calculating);
        connection.send(`warp_plot ${from.x} ${from.y} ${from.z} ${yaw} ${pitch} ${power}`);
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WarpDataProps = (state) => {
    return {
        ...state.warp,
        sensorTargets: state.sensors.targets,
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
)(Warp);