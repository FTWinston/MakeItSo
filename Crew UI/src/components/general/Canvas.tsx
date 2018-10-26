import * as React from 'react';

export type drawFunc = (ctx: CanvasRenderingContext2D, width: number, height: number) => void;

interface CanvasProps {
    width: number;
    height: number;
    className?: string;
    draw: drawFunc;
}

export class Canvas extends React.PureComponent<CanvasProps, {}> {
    private ctx: CanvasRenderingContext2D;

    constructor(props: CanvasProps) {
        super(props);

        this.state = {
            width: props.width === undefined ? 0 : props.width,
            height: props.height === undefined ? 0 : props.height,
        };
    }
    
    componentDidMount() {
        this.redraw();
    }

    componentDidUpdate() {
        this.redraw();
    }
    
    redraw() {
        this.props.draw(this.ctx, this.props.width, this.props.height);
    }

    render() {
        return (
            <canvas
                width={this.props.width}
                height={this.props.height}
                className={this.props.className}
                ref={c => this.setupRef(c)}
            />
        );
    }

    private setupRef(c: HTMLCanvasElement | null) {
        if (c === null) {
            return;
        }

        let ctx = c.getContext('2d');
        if (ctx !== null) {
            this.ctx = ctx;
        }
    }
}