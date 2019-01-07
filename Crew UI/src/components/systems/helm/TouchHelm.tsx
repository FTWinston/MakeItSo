import * as React from 'react';
import * as Hammer from 'hammerjs';
import { connection } from '~/index';
import { FlexibleCanvas, TouchArea } from '~/components/general';
import { TypedHelmProps } from './Helm';
import { FeedbackGroup } from './FeedbackGroup';
import { FieldGroup } from './FieldGroup';
import { HeadingReadout } from './HeadingReadout';
import { SpeedReadout } from './SpeedReadout';

interface TouchFeedback {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
}

export class TouchHelm extends React.PureComponent<TypedHelmProps, {}> {
    render() {
        let words = this.props.text.systems.helm;

        const forwardSpeed = 5; // TODO: calculate this
        const lateralSpeed = 0; // TODO: calculate this
        const verticalSpeed = 0; // TODO: calculate this

        return <div className="system helm helm--touchInput">
            <FieldGroup
                className="helm--touchInput__info fieldGroup--1x3 fieldGroup--unpadded"
            >
                <HeadingReadout text={this.props.text} pitch={this.props.shipRot.pitch} yaw={this.props.shipRot.yaw} roll={this.props.shipRot.roll} />
                <FlexibleCanvas draw={(ctx, w, h) => this.props.drawOrientation(ctx, w, h)} />
                <SpeedReadout
                    text={this.props.text}
                    forwardSpeed={forwardSpeed}
                    horizontalSideSpeed={lateralSpeed}
                    verticalSideSpeed={verticalSpeed}
                />
            </FieldGroup>
            <FeedbackGroup
                ref={g => this.rotGroup = g}
                label={words.rotation}
                x={this.props.shipRotRate.yaw / this.props.yawRateMax}
                y={this.props.shipRotRate.pitch / this.props.pitchRateMax}
                x2={lateralSpeed / this.props.translationRateHorizontalMax}
                y2={verticalSpeed / this.props.translationRateVerticalMax}
                drawExtra={ctx => this.drawRotationFeedback(ctx)}
                className="helm--touchInput__rotation fieldGroup--1x1"
            >
                <TouchArea setupTouch={(a) => this.setupRotation(a)} />
            </FeedbackGroup>
            <FeedbackGroup
                ref={g => this.speedGroup = g}
                label={words.forwardBackward}
                x={forwardSpeed / this.props.translationRateForwardMax}
                xMin={-this.props.translationRateReverseMax / this.props.translationRateForwardMax}
                drawExtra={ctx => this.drawSpeedFeedback(ctx)}
                className="helm--touchInput__speed fieldGroup--1x1"
            >
                <TouchArea setupTouch={(a) => this.setupSpeed(a)} />
            </FeedbackGroup>
        </div>;
    }
    
    private setupRotation(area: TouchArea) {
        let stopping = false;

        let startStop = () => {
            stopping = true;
            navigator.vibrate(30);
            connection.send('+rotStop');
            connection.send('+strafeStop');
        };

        let finishStop = () => {
            if (!stopping) {
                return;
            }

            stopping = false;
            navigator.vibrate(30);
            connection.send('-rotStop');
            connection.send('-strafeStop');
        };

        let yaw = area.createPan('yaw', 1, Hammer.DIRECTION_HORIZONTAL, 2, true,
            val => connection.send(`yawRight ${val}`),
            (sx, sy, ex, ey) => this.feedbackRotation(sx, sy, ex, ey, '#0cf'),
            finishStop,
            () => this.clearRotationFeedback());

        let pitch = area.createPan('pitch', 1, Hammer.DIRECTION_VERTICAL, 2, true,
            val => connection.send(`pitchUp ${-val}`),
            (sx, sy, ex, ey) => this.feedbackRotation(sx, sy, ex, ey, '#0cf'),
            finishStop,
            () => this.clearRotationFeedback());
            
        area.createPan('roll', 2, Hammer.DIRECTION_HORIZONTAL, 2.25, true,
            val => connection.send(`rollRight ${val}`));

        let lateral = area.createPan('lateral', 3, Hammer.DIRECTION_HORIZONTAL, 5.5, true,
            val => connection.send(`strafeRight ${val}`),
            (sx, sy, ex, ey) => this.feedbackRotation(sx, sy, ex, ey, '#c0f'),
            finishStop,
            () => this.clearRotationFeedback());

        let vertical = area.createPan('vertical', 3, Hammer.DIRECTION_VERTICAL, -3, true,
            val => connection.send(`strafeUp ${-val}`),
            (sx, sy, ex, ey) => this.feedbackRotation(sx, sy, ex, ey, '#c0f'),
            finishStop,
            () => this.clearRotationFeedback());
        
        yaw.recognizeWith(pitch);
        lateral.recognizeWith(vertical);

        area.createPress('allStop', 500, startStop, finishStop);
    }

    private setupSpeed(area: TouchArea) {
        let stopping = false;

        let startStop = () => {
            stopping = true;
            navigator.vibrate(30);
            connection.send('+forwardBackStop');
        };

        let finishStop = () => {
            if (!stopping) {
                return;
            }

            stopping = false;
            navigator.vibrate(30);
            connection.send('-forwardBackStop');
        };

        area.createPan('forward', 1, Hammer.DIRECTION_VERTICAL, 2, true,
            val => connection.send(`moveForward ${-val}`),
            (sx, sy, ex, ey) => this.feedbackSpeed(sx, sy, ex, ey, '#0cf'),
            finishStop,
            () => this.clearSpeedFeedback());

        area.createPress('allStop', 500, startStop, finishStop);
    }

    private rotGroup: FeedbackGroup | null;
    private rotFeedback?: TouchFeedback;
    private speedGroup: FeedbackGroup | null;
    private speedFeedback?: TouchFeedback;

    private feedbackRotation(startX: number, startY: number, endX: number, endY: number, color: string) {
        this.rotFeedback = {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color: color,
        };

        if (this.rotGroup !== null) {
            this.rotGroup.redraw();
        }
    }

    private clearRotationFeedback() {
        this.rotFeedback = undefined;

        if (this.rotGroup !== null) {
            this.rotGroup.redraw();
        }
    }

    private drawRotationFeedback(ctx: CanvasRenderingContext2D) {
        if (this.rotFeedback !== undefined) {
            this.drawFeedback(ctx, this.rotFeedback);
        }
    }

    private feedbackSpeed(startX: number, startY: number, endX: number, endY: number, color: string) {
        this.speedFeedback = {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color: color,
        };

        if (this.speedGroup !== null) {
            this.speedGroup.redraw();
        }
    }

    private clearSpeedFeedback() {
        this.speedFeedback = undefined;
        
        if (this.speedGroup !== null) {
            this.speedGroup.redraw();
        }
    }

    private drawSpeedFeedback(ctx: CanvasRenderingContext2D) {
        if (this.speedFeedback !== undefined) {
            this.drawFeedback(ctx, this.speedFeedback);
        }
    }

    private drawFeedback(ctx: CanvasRenderingContext2D, feedback: TouchFeedback) {
        ctx.strokeStyle = feedback.color;
        ctx.lineWidth = 5;
        ctx.globalAlpha = 0.3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(feedback.startX, feedback.startY);
        ctx.lineTo(feedback.endX, feedback.endY);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;
        ctx.lineCap = 'butt';
        ctx.stroke();
    }
}