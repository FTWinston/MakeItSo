import * as React from 'react';

interface CanvasProps {
    width: number;
    height: number;
    className?: string;
    draw: (ctx: CanvasRenderingContext2D) => void;
}

export class Canvas extends React.Component<CanvasProps, {}> {
    private ctx: CanvasRenderingContext2D;

    constructor(props: CanvasProps) {
        super(props);

        this.state = {
            width: props.width === undefined ? 0 : props.width,
            height: props.height === undefined ? 0 : props.height,
        };
    }
    
    componentDidMount() {
        this.props.draw(this.ctx);
    }

    componentDidUpdate() {
        this.props.draw(this.ctx);
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