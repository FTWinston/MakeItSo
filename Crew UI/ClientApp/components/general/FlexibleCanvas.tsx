import * as React from 'react';
import { Canvas, drawFunc } from './Canvas';
import './FlexibleCanvas.scss';

interface FlexibleCanvasProps {
    className?: string;
    draw: drawFunc;
}

interface FlexibleCanvasState {
    width: number;
    height: number;
}

export class FlexibleCanvas extends React.PureComponent<FlexibleCanvasProps, FlexibleCanvasState> {
    private resizeListener?: () => void;
    private canvas: Canvas;
    private _wrapper: HTMLDivElement;
    get wrapper() { return this._wrapper; }

    constructor(props: FlexibleCanvasProps) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };
    }

    componentDidMount() {
        this.resizeListener = () => this.updateSize();
        window.addEventListener('resize', this.resizeListener);
    
        this.updateSize();
    }
    
    componentWillUnmount() {
        if (this.resizeListener !== undefined) {
            window.removeEventListener('resize', this.resizeListener);
        }
    }

    render() {
        let classes = 'canvasWrapper';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        return (
            <div className={classes} ref={w => { if (w !== null) { this._wrapper = w }}}>
                <Canvas
                    ref={c => { if (c !== null) { this.canvas = c }}}
                    width={this.state.width}
                    height={this.state.height}
                    draw={this.props.draw}
                />
            </div>
        );
    }

    redraw() {
        this.canvas.redraw();
    }
    
    private updateSize() {
        this.setState({
            width: this._wrapper.offsetWidth,
            height: this._wrapper.offsetHeight,
        });
    }
}