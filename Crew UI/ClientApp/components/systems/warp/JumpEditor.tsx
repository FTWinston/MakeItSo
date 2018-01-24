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
    startPos: Vector3;
    projectionYaw: number;
    projectionPitch: number;
    projectionPower: number;
}

export class JumpEditor extends React.PureComponent<JumpEditorProps, JumpEditorState> {
    render() {
        let words = this.props.text.systems.warp;

        return <div className="warp__jumpEditor">
            <Field labelText={words.startPos}>
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPos.x}
                    numberChanged={v => this.setState(state => { return { startPos: new Vector3(v, state.startPos.y, state.startPos.z) };})}
                    disabled={this.props.calculating}
                />
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPos.y}
                    numberChanged={v => this.setState(state => { return { startPos: new Vector3(state.startPos.x, v, state.startPos.z) };})}
                    disabled={this.props.calculating}
                />
                <NumericTextbox
                    color={ButtonColor.Primary}
                    number={this.state.startPos.z}
                    numberChanged={(v: number) => this.setState(state => { return { startPos: new Vector3(state.startPos.x, state.startPos.y, v) };})}
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
                    disabled={this.props.calculating}
                    clicked={() => this.props.startCalculating(this.state.startPos, this.state.projectionYaw, this.state.projectionPitch, this.state.projectionPower)}
                />;
            </Field>
        </div>;
    }
}