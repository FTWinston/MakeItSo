import * as React from 'react';
import * as Hammer from 'hammerjs';
import { connection } from '../../../Client';
import { FlexibleCanvas, TouchArea } from '../../general';
import { Helm, TypedHelmProps } from './Helm';
import { FeedbackGroup } from './FeedbackGroup';
import { FieldGroup } from './FieldGroup';
import { HeadingReadout } from './HeadingReadout';
import { SpeedReadout } from './SpeedReadout';

export class TouchHelm extends React.PureComponent<TypedHelmProps, {}> {
    render() {
        let words = this.props.text.systems.helm;
        return <div className="system helm helm--touchInput">
            <FieldGroup
                className="helm--touchInput__info fieldGroup--1x3 fieldGroup--unpadded"
            >
                <HeadingReadout text={this.props.text} pitch={this.props.pitch} yaw={this.props.yaw} roll={this.props.roll} />
                <FlexibleCanvas draw={(ctx, w, h) => this.props.drawOrientation(ctx, w, h)} />
                <SpeedReadout
                    text={this.props.text}
                    forwardSpeed={this.props.translationRateForward}
                    horizontalSideSpeed={this.props.translationRateForward}
                    verticalSideSpeed={this.props.translationRateForward}
                />
            </FieldGroup>
            <FeedbackGroup /* This needs feedback showing current touch position/range */
                label={words.rotation}
                x={this.props.yawRate / this.props.yawRateMax}
                y={this.props.pitchRate / this.props.pitchRateMax}
                x2={this.props.translationRateHorizontal / this.props.translationRateHorizontalMax}
                y2={this.props.translationRateVertical / this.props.translationRateVerticalMax}
                className="helm--touchInput__rotation fieldGroup--1x1"
            >
                <TouchArea setupTouch={(h, r) => this.setupRotation(h, r)} />
            </FeedbackGroup>
            <FeedbackGroup
                label={words.forwardBackward}
                x={this.props.translationRateForward / this.props.translationRateForwardMax}
                xMin={-this.props.translationRateReverseMax / this.props.translationRateForwardMax}
                className="helm--touchInput__speed fieldGroup--1x1"
            >
                <TouchArea setupTouch={(h, r) => this.setupSpeed(h, r)} />
            </FeedbackGroup>
        </div>;
    }
    
    private setupRotation(hammer: Hammer.Manager, element: HTMLDivElement) {
        let yaw = TouchArea.createPan(hammer, element, 'yaw', 1, Hammer.DIRECTION_HORIZONTAL, val => connection.send(`yawRight ${val}`), 2);
        let pitch = TouchArea.createPan(hammer, element, 'pitch', 1, Hammer.DIRECTION_VERTICAL, val => connection.send(`pitchUp ${-val}`), 2);
        let roll = TouchArea.createPan(hammer, element, 'roll', 2, Hammer.DIRECTION_HORIZONTAL, val => connection.send(`rollRight ${val}`), 2.25, 20 );
        let lateral = TouchArea.createPan(hammer, element, 'lateral', 3, Hammer.DIRECTION_HORIZONTAL, val => connection.send(`strafeRight ${val}`), 5.5);
        let vertical = TouchArea.createPan(hammer, element, 'vertical', 3, Hammer.DIRECTION_VERTICAL, val => connection.send(`strafeUp ${-val}`), -3);
        
        yaw.recognizeWith(pitch);
        lateral.recognizeWith(vertical);

        let rotStop = new Hammer.Press({ event: 'allStop', time: 500 });
        hammer.add(rotStop);
        
        hammer.on('allStop',  () => {
            connection.send('+rotStop');
            connection.send('+strafeStop');
        });

        hammer.on('allStopup', () => {
            connection.send('-rotStop');
            connection.send('-strafeStop');
        });
    }

    private setupSpeed(hammer: Hammer.Manager, element: HTMLDivElement) {
        let forward = TouchArea.createPan(hammer, element, 'forward', 1, Hammer.DIRECTION_VERTICAL, val => connection.send(`moveForward ${-val}`), 2);

        let stop = new Hammer.Press({ event: 'allStop', time: 500 });
        hammer.add(stop);

        hammer.on('allStop', function () {
            connection.send('+forwardBackStop');
        });

        hammer.on('allStopup', function () {
            connection.send('-forwardBackStop');
        });
    }
}