import * as React from 'react';
import { Canvas } from '../../general';

interface FeedbackGroupProps {
    label: string;
    x: number;
    y: number;
    z?: number;
}

interface FeedbackGroupState {
    width: number;
    height: number;
}

export class FeedbackGroup extends React.Component<FeedbackGroupProps, FeedbackGroupState> {
    constructor(props: FeedbackGroupProps) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };
    }

    private root: HTMLDivElement | null;

    private resizeListener?: () => void;
    componentDidMount() {
        this.resizeListener = () => this.updateSize();
        window.addEventListener('resize', this.resizeListener);
    
        this.updateSize();
    }

    private updateSize() {
        if (this.root === null) {
            return;
        }

        this.setState({
            width: this.root.offsetWidth,
            height: this.root.offsetHeight,
        });
    }

    public render() {
        return (
        <div className="feedbackGroup" ref={r => this.root = r}>
            <div className="feedbackGroup__label">{this.props.label}</div>
            <Canvas 
                width={this.state.width}
                height={this.state.height}
                draw={ctx => this.drawFeedback(ctx)}
                className="feedbackGroup__background"
            />
            {this.props.children}
        </div>
        );
    }

    private drawFeedback(ctx: CanvasRenderingContext2D) {
        let width = this.state.width, halfWidth = width / 2;
        let height = this.state.height, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);

        let x = this.props.x * halfWidth + halfWidth;
        let y = this.props.y * halfHeight + halfHeight;

        // faint lines showing center
        ctx.strokeStyle= '#fff';
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(halfWidth, 0);
        ctx.lineTo(halfWidth, height);
        ctx.moveTo(0, halfHeight);
        ctx.lineTo(width, halfHeight);

        ctx.stroke();

        // faint lines showing current pos
        ctx.strokeStyle = '#0c0';
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);

        ctx.stroke();

        // arrows showing the current pos
        ctx.fillStyle = '#0c0';
        ctx.globalAlpha = 1;
        ctx.beginPath();

        let vmin = Math.min(width, height);
        let breadth = vmin * 0.025, depth = vmin * 0.025 * 1.412;
        ctx.moveTo(x - breadth, 0);
        ctx.lineTo(x + breadth, 0);
        ctx.lineTo(x, depth);
        
        ctx.moveTo(x - breadth, height);
        ctx.lineTo(x + breadth, height);
        ctx.lineTo(x, height - depth);

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

        ctx.moveTo(halfWidth, 0);
        ctx.lineTo(halfWidth, depth);
        ctx.moveTo(halfWidth, height);
        ctx.lineTo(halfWidth, height - depth);
        ctx.moveTo(0, halfHeight);
        ctx.lineTo(depth, halfHeight);
        ctx.moveTo(width, halfHeight);
        ctx.lineTo(width - depth, halfHeight);

        ctx.stroke();
    }
}