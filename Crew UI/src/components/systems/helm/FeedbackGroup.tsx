import * as React from 'react';
import { Canvas } from '~/components/general';
import { FieldGroup, FieldGroupProps } from './FieldGroup';

interface FeedbackGroupProps extends FieldGroupProps {
    x: number;
    y?: number;
    z?: number;
    x2?: number;
    y2?: number;
    xMin?: number;
    drawExtra?: (ctx: CanvasRenderingContext2D) => void;
}

interface FeedbackGroupState {
    width: number;
    height: number;
}

export class FeedbackGroup extends React.PureComponent<FeedbackGroupProps, FeedbackGroupState> {
    constructor(props: FeedbackGroupProps) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };
    }

    private group: FieldGroup | null;
    private canvas: Canvas | null;

    private resizeListener?: () => void;
    componentDidMount() {
        this.resizeListener = () => this.updateSize();
        window.addEventListener('resize', this.resizeListener);
    
        this.updateSize();
    }

    private updateSize() {
        if (this.group === null || this.group.root === null) {
            return;
        }

        let root = this.group.root;

        this.setState({
            width: root.offsetWidth,
            height: root.offsetHeight,
        });
    }

    overrideProps: FeedbackGroupProps | undefined;
    shouldComponentUpdate(nextProps: FeedbackGroupProps, nextState: FeedbackGroupState) {
        if (this.state.width !== nextState.width || this.state.height !== nextState.height) {
            return true;
        }

        // at this point, x, y, z or xMin must have changed, so rerender the canvas
        if (this.canvas !== null) {
            this.overrideProps = nextProps; // ensure nextProps are used rather than current ones, which are outdated
            this.canvas.redraw();
        }

        return false;
    }

    public render() {
        return (
        <FieldGroup ref={g => this.group = g} label={this.props.label} className={this.props.className}>
            <Canvas
                ref={c => this.canvas = c}
                width={this.state.width}
                height={this.state.height}
                draw={ctx => this.drawFeedback(ctx)}
                className="fieldGroup__background"
            />
            {this.props.children}
        </FieldGroup>
        );
    }

    public redraw() {
        if (this.canvas !== null) {
            this.canvas.redraw();
        }
    }

    private drawFeedback(ctx: CanvasRenderingContext2D) {
        let props = this.props;

        if (this.overrideProps !== undefined) {
            props = this.overrideProps;
            this.overrideProps = undefined; // only use the override props once, cos after that the real props will have updated (even though we don't rerender)
        }

        ctx.clearRect(0, 0, this.state.width, this.state.height);

        this.drawFeedbackX(ctx, props);
        this.drawFeedbackY(ctx, props);

        this.drawFeedbackX2(ctx, props);
        this.drawFeedbackY2(ctx, props);

        if (this.props.drawExtra !== undefined) {
            this.props.drawExtra(ctx);
        }
    }

    private drawFeedbackX(ctx: CanvasRenderingContext2D, props: FeedbackGroupProps) {
        let width = this.state.width;
        let height = this.state.height;
        let maxVal = 1;
        let minVal = props.xMin === undefined ? -1 : props.xMin;
        let minPos = 0;
        let maxPos = width;
        let zeroPos = width * -minVal / (maxVal - minVal);

        let x;
        if (props.x >= 0) {
            x = zeroPos + (maxPos - zeroPos) * props.x / maxVal;
        } else {
            x = zeroPos - (zeroPos - minPos) * props.x / minVal;
        }
        
        // faint lines showing center
        ctx.strokeStyle= '#fff';
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(zeroPos, 0);
        ctx.lineTo(zeroPos, height);

        ctx.stroke();


        ctx.lineWidth = 2;
        let vmin = Math.min(width, height);
        let breadth = vmin * 0.025, depth = vmin * 0.025 * 1.412;

        // axis line and arrow
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = ctx.fillStyle = props.x === 0 ? '#0c0' : '#cc0';
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(x - breadth, 0);
        ctx.lineTo(x + breadth, 0);
        ctx.lineTo(x, depth);
        
        ctx.moveTo(x - breadth, height);
        ctx.lineTo(x + breadth, height);
        ctx.lineTo(x, height - depth);

        ctx.fill();
    
        // tick marks showing the center
        ctx.strokeStyle= '#fff';
        ctx.beginPath();

        ctx.moveTo(zeroPos, 0);
        ctx.lineTo(zeroPos, depth);
        ctx.moveTo(zeroPos, height);
        ctx.lineTo(zeroPos, height - depth);

        ctx.stroke();
    }

    private drawFeedbackY(ctx: CanvasRenderingContext2D, props: FeedbackGroupProps) {
        if (props.y === undefined) {
            return;
        }

        let width = this.state.width;
        let height = this.state.height;
        let zeroPos = height / 2;

        let y = Math.min(height, Math.max(0, -props.y * zeroPos + zeroPos));

        // faint lines showing center
        ctx.strokeStyle= '#fff';
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(0, zeroPos);
        ctx.lineTo(width, zeroPos);

        ctx.stroke();


        ctx.lineWidth = 2;
        let vmin = Math.min(width, height);
        let breadth = vmin * 0.025, depth = vmin * 0.025 * 1.412;

        // axis line and arrow
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = ctx.fillStyle = props.y === 0 ? '#0c0' : '#cc0';
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        
        ctx.globalAlpha = 1;
        ctx.beginPath();

        ctx.moveTo(0, y - breadth);
        ctx.lineTo(0, y + breadth);
        ctx.lineTo(depth, y);

        ctx.moveTo(width, y - breadth);
        ctx.lineTo(width, y + breadth);
        ctx.lineTo(width - depth, y);

        ctx.fill();


        // tick marks showing the center
        ctx.strokeStyle= '#fff';
        ctx.beginPath();
 
        ctx.moveTo(0, zeroPos);
        ctx.lineTo(depth, zeroPos);
        ctx.moveTo(width, zeroPos);
        ctx.lineTo(width - depth, zeroPos);

        ctx.stroke();
    }

    private drawFeedbackX2(ctx: CanvasRenderingContext2D, props: FeedbackGroupProps) {
        if (props.x2 === undefined) {
            return;
        }

        let width = this.state.width;
        let height = this.state.height;
        let maxVal = 1;
        let minVal = props.xMin === undefined ? -1 : props.xMin;
        let minPos = 0;
        let maxPos = width;
        let zeroPos = width * -minVal / (maxVal - minVal);

        let x;
        if (props.x >= 0) {
            x = zeroPos + (maxPos - zeroPos) * props.x2 / maxVal;
        } else {
            x = zeroPos - (zeroPos - minPos) * props.x2 / minVal;
        }
        
        ctx.lineWidth = 4;
        ctx.setLineDash([6, 6]);

        // axis line
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = ctx.fillStyle = props.x2 === 0 ? '#0c0' : '#cc0';
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    private drawFeedbackY2(ctx: CanvasRenderingContext2D, props: FeedbackGroupProps) {
        if (props.y2 === undefined) {
            return;
        }

        let width = this.state.width;
        let height = this.state.height;
        let zeroPos = height / 2;

        let y = Math.min(height, Math.max(0, -props.y2 * zeroPos + zeroPos));

        ctx.lineWidth = 4;
        ctx.setLineDash([6, 6]);

        // axis line
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = ctx.fillStyle = props.y2 === 0 ? '#0c0' : '#cc0';
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}