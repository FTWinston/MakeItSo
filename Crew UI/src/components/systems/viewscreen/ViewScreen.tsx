import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '~/store';
import { TextLocalisation, SensorTarget } from '~/functionality';
import { ShipSystemComponent } from '~/components/systems/ShipSystemComponent';
import './ViewScreen.scss';
import { ViewscreenState, actionCreators } from './store';
import { ToggleButton, ButtonColor, PushButton, Icon } from '~/components/general';
import { FieldGroup } from '../helm/FieldGroup';
import { TargetList } from '../sensors/TargetList';
import { connection } from '../../..';

interface IProps extends ViewscreenState {
    text: TextLocalisation;
    setLockedTarget: (targetID: number) => void;
    allTargets: SensorTarget[];
}

interface IState {
    selectingTarget: boolean;
}

class ViewScreen extends ShipSystemComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        
        this.state = {
            selectingTarget: false,
        };
    }

    name() { return 'view'; }

    protected getHelpText() {
        return this.props.text.systemHelp.view;
    }

    protected getOptionLabels() {
        return this.props.text.systems.view;
    }

    public render() {
/*

ok so can we have buttons like:

                 up             zoom in         chase
          left reset right      
                down            zoom out        target

        relative to ship: 207 Mk 25        Magnification: 1000x
*/

        if (this.state.selectingTarget) {
            return this.renderTargetSelect();
        }

        const words = this.props.text.systems.view;

        const iconSize = "1.5em";

        const showTargetSelect = () => this.setState({ selectingTarget: true });

        const zoomOrDistance = this.props.chase
            ? <div className="viewSystem__distance">
                <PushButton icon={Icon.Maximize} iconSize={iconSize} title={words.zoomIn} color={ButtonColor.Quandry} hotkey="R" command="view_zoom 1" />
                <PushButton icon={Icon.Minimize} iconSize={iconSize} title={words.zoomOut} color={ButtonColor.Quandry} hotkey="F" command="view_zoom 0" />
            </div>
            : <div className="viewSystem__zoom">
                <PushButton icon={Icon.ZoomIn} iconSize={iconSize} title={words.zoomIn} color={ButtonColor.Secondary} hotkey="R" command="view_zoom 1" />
                <PushButton icon={Icon.ZoomOut} iconSize={iconSize} title={words.zoomOut} color={ButtonColor.Secondary} hotkey="F" command="view_zoom 0" />
            </div>

        const magnification = this.props.chase && this.props.lockedTargetID === undefined
            ? undefined
            : <div className="viewSystem__valueField">
                Magnification: <span className="viewSystem__value">{this.props.zoom}</span>x
            </div>

        const headingOrTarget = this.props.lockedTargetID === undefined
            ? <div className="viewSystem__valueField">
                Relative to ship: <span className="viewSystem__value">{this.props.yaw}</span> mk <span className="viewSystem__value">{this.props.pitch}</span>
            </div>
            : <div className="viewSystem__valueField">
                View locked on target: <span className="viewSystem__value">{this.props.lockedTargetID}</span>
            </div>

        return <div className="viewSystem">
            <div className="viewSystem__main">
                <div className="viewSystem__rotators">
                    <FieldGroup
                        label={words.rotate}
                        className="fieldGroup--buttons fieldGroup--3x3"
                    >
                        <PushButton className="fieldGroup--3x3__topMid" icon={Icon.ArrowUp} iconSize={iconSize} title={words.rotUp} color={ButtonColor.Tertiary} hotkey="W" command="view_rot u" />
                        <PushButton className="fieldGroup--3x3__botMid" icon={Icon.ArrowDown} iconSize={iconSize} title={words.rotDown} color={ButtonColor.Tertiary} hotkey="S" command="view_rot d" />
                        <PushButton className="fieldGroup--3x3__midLeft" icon={Icon.ArrowLeft} iconSize={iconSize} title={words.rotLeft} color={ButtonColor.Tertiary} hotkey="A" command="view_rot l" />
                        <PushButton className="fieldGroup--3x3__midRight" icon={Icon.ArrowRight} iconSize={iconSize} title={words.rotRight} color={ButtonColor.Tertiary} hotkey="D" command="view_rot r" />
                        <PushButton className="fieldGroup--3x3__center" iconSize={iconSize} text={words.reset} color={ButtonColor.Primary} hotkey="space" command="view_reset" />
                    </FieldGroup>
                </div>

                {zoomOrDistance}

                <div className="viewSystem__pushButtons">
                    <ToggleButton
                        className="viewSystem__chaseButton"
                        startActive={this.props.chase}
                        color={ButtonColor.Secondary}
                        text={words.chase}
                        deactivateCommand="view_chase 0"
                        activateCommand="view_chase 1"
                    />

                    <PushButton
                        className="viewSystem__targetSelectButton"
                        color={ButtonColor.Tertiary}
                        text={words.targetSelect}
                        clicked={showTargetSelect}
                    />
                </div>
            </div>

            <div className="viewSystem__values">
                {headingOrTarget}
                {magnification}
            </div>
        </div>
    }

    private renderTargetSelect() {
        const selectTarget = (target: SensorTarget) => {
            connection.send(`view_target ${target.id}`);
            this.props.setLockedTarget(target.id);
            this.setState({ selectingTarget: false })
        };
        
        return <TargetList
            text={this.props.text}
            targets={this.props.allTargets}
            selected={selectTarget}
            className="viewSystem viewSystem--targetSelect targetList--viewSystem"
        />
    }
}

// Selects which state properties are merged into the component's props
const mapStateToProps: (state: ApplicationState) => IProps = (state) => {
    return {
        text: state.user.text,
        allTargets: state.environment.targets,
        setLockedTarget: actionCreators.setLockedTarget,
        ...state.viewscreen,
    }
};

// Wire up the React component to the Redux store
export default connect(
    mapStateToProps,
    actionCreators,
    null,
    { withRef: true },
)(ViewScreen);