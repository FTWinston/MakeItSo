import * as React from 'react';
import './Dice.scss';
import { FlexibleCanvas } from '~/components/general';
import { Hotkey, Hotkeys } from '~/functionality';

interface IProps {
    value: number;
    canToggle: boolean;
    locked: boolean;
    toggle: () => void;
    hotkey?: Hotkey;
}

export class Dice extends React.PureComponent<IProps> {
    componentDidMount() {
        if (this.props.hotkey != null) {
            Hotkeys.registerAction(this.props.hotkey, () => { if (this.props.canToggle) this.props.toggle(); });
        }
    }

    componentWillUnmount() {
        if (this.props.hotkey != null) {
            Hotkeys.unregister(this.props.hotkey);
        }
    }


    render() {
        const classes = this.props.canToggle ? 'dice' : 'dice dice--notLockable';

        return <FlexibleCanvas
            className={classes}
            draw={(ctx, w, h) => this.draw(ctx, w, h)}
            onClick={this.props.canToggle ? () => this.props.toggle() : undefined}
        />
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = this.props.locked
            ? this.props.canToggle ? '#0a0' : '#d00'
            : '#000';
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