import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { RotaryInput, RotaryInputMode } from './RotaryInput';
import { LinearInput } from './LinearInput';

interface DirectionInputProps {
    className?: string;
    text: TextLocalisation;
    readonly: boolean;
    yaw: number;
    pitch: number;
    roll?: number;
    magnitude?: number;
    magnitudeMax?: number;
    magnitudeLabel?: string;
    magnitudeUnit?: string
}

export class DirectionInput extends React.PureComponent<DirectionInputProps, {}> {
    render() {
        let classes = 'direction';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        let roll = this.props.roll == undefined
            ? undefined
            : <RotaryInput value={this.props.roll} label={this.props.text.systems.helm.roll} mode={RotaryInputMode.TopSemi}
                valueChanged={this.props.readonly ? undefined : v => this.rollChanged(v)} valueUnit="°" />;

        let distance = this.props.magnitude === undefined || this.props.magnitudeMax === undefined || this.props.magnitudeLabel === undefined
            ? undefined
            : <LinearInput value={this.props.magnitude} minValue={0} maxValue={this.props.magnitudeMax} label={this.props.magnitudeLabel}
                valueChanged={this.props.readonly ? undefined : v => this.distanceChanged(v)} valueUnit={this.props.magnitudeUnit} />;

        return <div className={classes}>
            <RotaryInput value={this.props.yaw} label={this.props.text.systems.helm.heading} mode={RotaryInputMode.FullCircle}
                valueChanged={this.props.readonly ? undefined : v => this.headingChanged(v)} valueUnit="°" />
            <RotaryInput value={this.props.pitch} label={this.props.text.systems.helm.elevation} mode={RotaryInputMode.RightSemi}
                valueChanged={this.props.readonly ? undefined : v => this.pitchChanged(v)} valueUnit="°" />
            {roll}
            {distance}
        </div>;
    }

    private headingChanged(newVal: number) {

    }

    private pitchChanged(newVal: number) {

    }

    private rollChanged(newVal: number) {

    }

    private distanceChanged(newVal: number) {

    }
}