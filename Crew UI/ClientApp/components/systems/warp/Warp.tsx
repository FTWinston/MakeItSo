import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../../../store';
import { WarpState as WarpBaseProps, WarpScreenStatus, JumpPath } from '../../../store/Warp';
import { SensorView } from '../../../components/general/SensorView';
import { SensorTarget, TextLocalisation, Vector3 } from '../../../functionality';
import { JumpCountdown } from './JumpCountdown';
import { JumpEditor } from './JumpEditor';
import { PathList } from './PathList';
import './Warp.scss';

interface WarpProps extends WarpBaseProps {
    text: TextLocalisation;
    sensorTargets: SensorTarget[];
}

class Warp extends React.Component<WarpProps, {}> {
    public render() {
        return <div className="system warp">
            {this.renderControls()}
            <SensorView className="warp__sensorMap" targets={this.props.sensorTargets} />
        </div>;
    }

    private renderControls() {
        switch (this.props.status) {
            case WarpScreenStatus.Viewing:
                return <PathList text={this.props.text} paths={this.props.paths} pathSelected={p => this.pathSelected(p)} newSelected={() => this.showEdit()} />;
            case WarpScreenStatus.Jumping:
                return <JumpCountdown text={this.props.text} path={this.props.activePath} endTime={this.props.jumpEndTime} />;
            default:
                return <JumpEditor text={this.props.text} editPath={this.props.activePath} startPlotting={(from, yaw, pitch, power) => this.plotPath(from, yaw, pitch, power)} cancel={() => this.cancelEdit()} />;
        }
    }

    private pathSelected(path: JumpPath) {
        this.setState({
            activePath: path, // TODO: argh, no. this is in store not component state. Should it go into component state instead? It almost wants split in two bits, yuck
        });
    }

    private showEdit(path?: JumpPath) {
        this.setState({
            activePath: path,
            status: WarpScreenStatus.Plotting,
        });
    }

    private cancelEdit() {
        this.setState({
            activePath: undefined,
            status: WarpScreenStatus.Plotting,
        });
    }
    
    private plotPath(from: Vector3, yaw: number, pitch: number, power: number) {
        // TODO: tell the server, let it update state to plotting
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => WarpProps = (state) => {
    return {
        ...state.warp,
        sensorTargets: state.sensors.targets,
        text: state.user.text,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    {}
)(Warp);