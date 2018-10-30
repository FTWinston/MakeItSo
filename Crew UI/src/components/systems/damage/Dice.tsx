import * as React from 'react';
import './Dice.scss';
import { FlexibleCanvas } from '~/components/general';

interface IProps {
    value: number;
    locked: boolean;
    toggle: () => void;
}

export class Dice extends React.PureComponent<IProps> {
    render() {
        return <FlexibleCanvas
            className="dice"
            draw={(ctx, w, h) => this.draw(ctx, w, h)}
            onClick={() => this.props.toggle()}
        />
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = this.props.locked ? '#d00' : '#000';
        let dotSize = Math.min(width, height) * 0.1;

        switch (this.props.value) {
            case 1:
                this.drawDot(ctx,0.50 * width, 0.50 * height, dotSize);
                break;
            case 2:
                this.drawDot(ctx,0.25 * width, 0.25 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.75 * height, dotSize);
                break;
            case 3:
                this.drawDot(ctx,0.25 * width, 0.75 * height, dotSize);
                this.drawDot(ctx,0.50 * width, 0.50 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.25 * height, dotSize);
                break;
            case 4:
                this.drawDot(ctx,0.25 * width, 0.25 * height, dotSize);
                this.drawDot(ctx,0.25 * width, 0.75 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.25 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.75 * height, dotSize);
                break;
            case 5:
                this.drawDot(ctx,0.25 * width, 0.25 * height, dotSize);
                this.drawDot(ctx,0.25 * width, 0.75 * height, dotSize);
                this.drawDot(ctx,0.50 * width, 0.50 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.25 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.75 * height, dotSize);
                break;
            case 6:
                this.drawDot(ctx,0.25 * width, 0.25 * height, dotSize);
                this.drawDot(ctx,0.25 * width, 0.75 * height, dotSize);
                this.drawDot(ctx,0.25 * width, 0.50 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.50 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.25 * height, dotSize);
                this.drawDot(ctx,0.75 * width, 0.75 * height, dotSize);
                break;
        }
    }

    private drawDot(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}