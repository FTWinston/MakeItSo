import * as React from 'react';
import { Field, NumericTextbox, Panel, PushButton, Icon, ButtonColor } from '~/components/general';
import { TextLocalisation, Vector3 } from '~/functionality';
import { JumpPath } from '~/functionality/sensors';
import { WarpScreenStatus } from '~/store/Warp';

interface JumpEditorProps {
    text: TextLocalisation;
    editPath?: JumpPath;
    startCalculating: (from: Vector3, yaw: number, pitch: number, power: number) => void;
    cancelCalculation: () => void;
    close: () => void;
    rejectPath: () => void;
    status: WarpScreenStatus;
    getShipPos: () => Vector3;
}

interface JumpEditorState {
    startPosX: number | undefined;
    startPosY: number | undefined;
    startPosZ: number | undefined;
    projectionYaw: number | undefined;
    projectionPitch: number | undefined;
    projectionPower: number | undefined;
}

export class JumpEditor extends React.PureComponent<JumpEditorProps, JumpEditorState> {
    constructor(props: JumpEditorProps) {
        super(props);

        let shipPos = props.getShipPos();

        this.state = {
            startPosX: shipPos.x,
            startPosY: shipPos.y,
            startPosZ: shipPos.z,
            projectionYaw: 0,
            projectionPitch: 0,
            projectionPower: 50,
        };
    }

    render() {
        let words = this.props.text.systems.warp;

        let footerButtons;
        
        switch (this.props.status) {
            case WarpScreenStatus.Plotting:
                footerButtons = this.renderPlottingButtons();
                break;
            case WarpScreenStatus.Calculating:
                footerButtons = this.renderCalculatingButtons();
                break;
            case WarpScreenStatus.CalculationConfirm:
                footerButtons = this.renderConfirmButtons();
                break;
            case WarpScreenStatus.CalculationFailed:
                footerButtons = this.renderFailedButtons();
                break;
        }

        return <Panel className="warp__jumpEditor" footer={footerButtons}>
            <Field labelText={words.startPos}>
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPosX}
                    numberChanged={v => this.setState({ startPosX: v })}
                    disabled={this.props.status !== WarpScreenStatus.Plotting}
                />
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPosY}
                    numberChanged={v => this.setState({ startPosY: v })}
                    disabled={this.props.status !== WarpScreenStatus.Plotting}
                />
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPosZ}
                    numberChanged={v => this.setState({ startPosZ: v })}
                    disabled={this.props.status !== WarpScreenStatus.Plotting}
                />
                <div className="description">{words.startPosDescription}</div>
            </Field>
            <Field labelText={words.projectionYaw} labelBehaviour={true}>
                <NumericTextbox
                    color={ButtonColor.Secondary}
                    number={this.state.projectionYaw}
                    numberChanged={v => this.setState({ projectionYaw: v })}
                    disabled={this.props.status !== WarpScreenStatus.Plotting}
                />
                <div className="description">{words.projectionYawDescription}</div>
            </Field>
            <Field labelText={words.projectionPitch} labelBehaviour={true}>
                <NumericTextbox
                    color={ButtonColor.Secondary}
                    number={this.state.projectionPitch}
                    numberChanged={v => this.setState({ projectionPitch: v })}
                    disabled={this.props.status !== WarpScreenStatus.Plotting}
                />
                <div className="description">{words.projectionPitchDescription}</div>
            </Field>
            <Field labelText={words.power} labelBehaviour={true}>
                <NumericTextbox
                    color={ButtonColor.Tertiary}
                    number={this.state.projectionPower}
                    numberChanged={v => this.setState({ projectionPower: v })}
                    disabled={this.props.status !== WarpScreenStatus.Plotting}
                />
                <div className="description">{words.powerDescription}</div>
            </Field>
        </Panel>;
    }

    private renderPlottingButtons() {
        return (
            <Field centered={true} displayAsRow={true}>
                <PushButton
                    color={ButtonColor.Quandry}
                    text={this.props.text.common.cancel}
                    clicked={() => this.props.close()}
                />
                <PushButton
                    color={ButtonColor.Quaternary}
                    text={this.props.text.systems.warp.calculate}
                    disabled={this.shouldBlockCalculation()}
                    clicked={() => this.startCalculation()}
                />
            </Field>
        )
    }

    private renderCalculatingButtons() {
        return (
            <Field centered={true} displayAsRow={true}>
                <PushButton
                    color={ButtonColor.Quandry}
                    text={this.props.text.systems.warp.stopCalculating}
                    clicked={() => this.props.cancelCalculation()}
                />
                <PushButton
                    color={ButtonColor.Quaternary}
                    text={this.props.text.systems.warp.calculating}
                    disabled={true}
                />
            </Field>
        )
    }

    private renderConfirmButtons() {
        return (
            <Field centered={true} displayAsRow={true}>
                <PushButton
                    color={ButtonColor.Quandry}
                    text={this.props.text.systems.warp.editPath}
                    clicked={() => this.props.rejectPath()}
                />
                <PushButton
                    color={ButtonColor.Quaternary}
                    text={this.props.text.systems.warp.keepPath}
                    clicked={() => this.props.close()}
                />
            </Field>
        )
    }

    private renderFailedButtons() {
        return (
            <Field centered={true} displayAsRow={true}>
                <PushButton
                    color={ButtonColor.Quandry}
                    text={this.props.text.systems.warp.editPath}
                    clicked={() => this.props.rejectPath()}
                />
                <PushButton
                    color={ButtonColor.Quaternary}
                    text={this.props.text.systems.warp.calculationFailed}
                    disabled={true}
                />
            </Field>
        )
    }

    private shouldBlockCalculation() {
        return this.state.projectionYaw === undefined || this.state.projectionPitch === undefined
            || this.state.projectionPower === undefined || this.state.startPosX === undefined
            || this.state.startPosY === undefined || this.state.startPosZ === undefined;
    }

    private startCalculation() {
        if (this.shouldBlockCalculation()) {
            return;
        }

        let startPos = new Vector3(this.state.startPosX as number, this.state.startPosY as number, this.state.startPosZ as number);
        this.props.startCalculating(startPos, this.state.projectionYaw as number, this.state.projectionPitch as number, this.state.projectionPower as number);
    }
}