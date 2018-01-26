import * as React from 'react';
import { Field, NumericTextbox, PushButton, Icon, ButtonColor } from '../../general';
import { JumpPath } from '../../../store/Warp';
import { TextLocalisation, Vector3 } from '../../../functionality';

interface JumpEditorProps {
    text: TextLocalisation;
    editPath?: JumpPath;
    startCalculating: (from: Vector3, yaw: number, pitch: number, power: number) => void;
    cancel: () => void;
    calculating: boolean;
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

        this.state = {
            startPosX: 0,
            startPosY: 0,
            startPosZ: 0,
            projectionYaw: 0,
            projectionPitch: 0,
            projectionPower: 50,
        };
    }

    render() {
        let words = this.props.text.systems.warp;

        return <div className="warp__jumpEditor">
            <Field labelText={words.startPos}>
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPosX}
                    numberChanged={v => this.setState({ startPosX: v })}
                    disabled={this.props.calculating}
                />
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPosY}
                    numberChanged={v => this.setState({ startPosY: v })}
                    disabled={this.props.calculating}
                />
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPosZ}
                    numberChanged={v => this.setState({ startPosZ: v })}
                    disabled={this.props.calculating}
                />
                <div className="description">{words.startPosDescription}</div>
            </Field>
            <Field labelText={words.projectionYaw} labelBehaviour={true}>
                <NumericTextbox
                    color={ButtonColor.Secondary}
                    number={this.state.projectionYaw}
                    numberChanged={v => this.setState({ projectionYaw: v })}
                    disabled={this.props.calculating}
                />
                <div className="description">{words.projectionYawDescription}</div>
            </Field>
            <Field labelText={words.projectionPitch} labelBehaviour={true}>
                <NumericTextbox
                    color={ButtonColor.Secondary}
                    number={this.state.projectionPitch}
                    numberChanged={v => this.setState({ projectionPitch: v })}
                    disabled={this.props.calculating}
                />
                <div className="description">{words.projectionPitchDescription}</div>
            </Field>
            <Field labelText={words.power} labelBehaviour={true}>
                <NumericTextbox
                    color={ButtonColor.Tertiary}
                    number={this.state.projectionPower}
                    numberChanged={v => this.setState({ projectionPower: v })}
                    disabled={this.props.calculating}
                />
                <div className="description">{words.powerDescription}</div>
            </Field>
            <Field centered={true} displayAsRow={true}>
                <PushButton
                    color={ButtonColor.Quandry}
                    text={this.props.text.common.cancel}
                    clicked={() => this.props.cancel()}
                />
                <PushButton
                    color={ButtonColor.Quaternary}
                    text={words.calculate}
                    disabled={this.shouldBlockCalculation()}
                    clicked={() => this.startCalculation()}
                />
            </Field>
        </div>;
    }

    private shouldBlockCalculation() {
        return this.props.calculating || this.state.projectionYaw === undefined
            || this.state.projectionPitch === undefined || this.state.projectionPower === undefined
            || this.state.startPosX === undefined || this.state.startPosY === undefined || this.state.startPosZ === undefined;
    }

    private startCalculation() {
        if (this.shouldBlockCalculation()) {
            return;
        }

        let startPos = new Vector3(this.state.startPosX as number, this.state.startPosY as number, this.state.startPosZ as number);
        this.props.startCalculating(startPos, this.state.projectionYaw as number, this.state.projectionPitch as number, this.state.projectionPower as number);
    }
}