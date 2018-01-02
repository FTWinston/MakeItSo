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
    private wrapper: HTMLDivElement | null;

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

    private updateSize() {
        let width = this.wrapper === null ? 0 : this.wrapper.offsetWidth;
        let height = this.wrapper === null ? 0 : this.wrapper.offsetHeight;

        this.setState({
            width: width,
            height: height,
        });
    }

    render() {
        let classes = 'canvasWrapper';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        return (
            <div className={classes} ref={w => this.wrapper = w}>
                <Canvas
                    width={this.state.width}
                    height={this.state.height}
                    draw={this.props.draw}
                />
            </div>
        );
    }
}