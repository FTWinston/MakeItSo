import * as React from 'react';
import { TouchArea } from '~/components/general';

export enum RotaryInputMode {
    FullCircle,
    RightSemi,
    TopSemi,
}

interface RotaryInputProps {
    label: string;
    mode: RotaryInputMode
    value: number;
    valueUnit?: string;
    valueChanged?: (val: number) => void;
}

export class RotaryInput extends React.PureComponent<RotaryInputProps, {}> {
    render() {
        let readonly = this.props.valueChanged === undefined;

        return <div className='direction__rotary'>
            <TouchArea draw={(ctx, w, h) => this.draw(ctx, w, h)} setupTouch={a => this.setupTouch(a)} />
        </div>;
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);

        let cx = width / 2;
        let cy = height / 2;
        let r = Math.min(cx, cy);
        let tickLength = r * 0.2;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);

        ctx.moveTo(cx, cy - r);
        ctx.lineTo(cx, cy - r + tickLength);

        ctx.moveTo(cx, cy + r);
        ctx.lineTo(cx, cy + r - tickLength);

        ctx.moveTo(cx - r, cy);
        ctx.lineTo(cx - r + tickLength, cy);

        ctx.moveTo(cx + r, cy);
        ctx.lineTo(cx + r - tickLength, cy);

        ctx.stroke();

        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx, cy);

        let angle = this.props.value * Math.PI / 180;
        let dx = r * Math.cos(angle);
        let dy = r * Math.sin(angle);

        ctx.lineTo(cx + dx, cy + dy);
        ctx.stroke();
    }

    private setupTouch(area: TouchArea) {

    }
}