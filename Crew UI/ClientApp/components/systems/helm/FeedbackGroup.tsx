import * as React from 'react';
import { Canvas } from '../../general';

interface FeedbackGroupProps {
    label: string;
    x: number;
    y?: number;
    z?: number;
    xMin?: number;
    threeByThree?: boolean;
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
        let classes = 'feedbackGroup';
        if (this.props.threeByThree) {
            classes += ' feedbackGroup--threeByThree';
        }

        return (
        <div className={classes} ref={r => this.root = r}>
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
        ctx.clearRect(0, 0, this.state.width, this.state.height);

        this.drawFeedbackX(ctx);
        this.drawFeedbackY(ctx);
    }
    
        private drawFeedbackX(ctx: CanvasRenderingContext2D) {
            let width = this.state.width;
            let height = this.state.height;
            let maxVal = 1;
            let minVal = this.props.xMin === undefined ? -1 : this.props.xMin;
            let minPos = 0;
            let maxPos = width;
            let zeroPos = width * -minVal / (maxVal - minVal);
    
            let x;
            if (this.props.x >= 0) {
                x = zeroPos + (maxPos - zeroPos) * this.props.x / maxVal;
            } else {
                x = zeroPos - (zeroPos - minPos) * this.props.x / minVal;
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
            ctx.strokeStyle = ctx.fillStyle = this.props.x === 0 ? '#0c0' : '#cc0';
            
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

    private drawFeedbackY(ctx: CanvasRenderingContext2D) {
        if (this.props.y === undefined) {
            return;
        }

        let width = this.state.width;
        let height = this.state.height;
        let zeroPos = height / 2;

        let y = Math.min(height, Math.max(0, -this.props.y * zeroPos + zeroPos));

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
        ctx.strokeStyle = ctx.fillStyle = this.props.y === 0 ? '#0c0' : '#cc0';
        
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
}