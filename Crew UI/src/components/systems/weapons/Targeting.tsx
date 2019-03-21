import * as React from 'react';
import './Targeting.scss';
import { Polygon } from './Polygon';
import { FlexibleCanvas } from '~/components/general';

interface IProps {
    polygon?: Polygon;
    fire: (x1: number, y1: number, x2: number, y2: number) => void;
}

interface IState {
    prevPolygon?: Polygon;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;

    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export class Targeting extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const newState = this.determineBounds(props.polygon)
        newState.prevPolygon = props.polygon;

        this.state = newState;
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.polygon !== this.props.polygon) {
            const newState = this.determineBounds(this.props.polygon)
            newState.prevPolygon = this.props.polygon;

            this.setState(newState);
        }
    }

    private determineBounds(polygon: Polygon | undefined): IState {
        return {
            minX: 0,
            maxX: 12,
            minY: 0,
            maxY: 12,
        };
    }

    render() {
        let classes = 'targeting';

        /*
        if (this.state.flashing === true) {
            classes += ' targeting--success';
        }
        else if (this.state.flashing === false) {
            classes += ' targeting--failure';
        }
        */

        // TODO: handle mouse interaction, animating intersection as mouse moves, calling fire
        const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => this.draw(ctx, w, h);

        return <FlexibleCanvas
            className={classes}
            draw={draw}
        />;
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const unitSize = Math.min(width / (this.state.maxX - this.state.minX), height / (this.state.maxY - this.state.minY));

        this.drawBackground(ctx, unitSize, width, height);

        if (this.props.polygon === undefined) {
            // TODO: some sort of message about facing the wrong face
            return;
        }
        
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = unitSize * 0.1;

        if (this.state.x2 === undefined) {
            ctx.fillStyle = '#c00';
            this.fillPolygon(ctx, unitSize, width, height, this.props.polygon);

            if (this.state.x1 !== undefined) {
                // TODO: draw "start point" for what will become the clipping line
            }
            return;
        }
        
        // TODO: extend clipping line to reach edges of canvas

        // TODO: create clipping path on one side of line

        ctx.fillStyle = '#f90';
        this.fillPolygon(ctx, unitSize, width, height, this.props.polygon);

        // TODO: create clipping path on other side of line
        ctx.fillStyle = '#0cf';
        this.fillPolygon(ctx, unitSize, width, height, this.props.polygon);
        
        // TODO: draw "extended" clipping line thinly
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;

        // draw main clipping line thickly
        ctx.lineWidth = unitSize * 0.1;
        ctx.beginPath();
        ctx.moveTo(
            this.scaleCoord(this.state.x1!, unitSize, this.state.minX),
            this.scaleCoord(this.state.y1!, unitSize, this.state.minY)
        )
        ctx.lineTo(
            this.scaleCoord(this.state.x2!, unitSize, this.state.minX),
            this.scaleCoord(this.state.y2!, unitSize, this.state.minY)
        )
        ctx.stroke();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, unitSize: number, width: number, height: number) {
        // TODO: fill canvas and draw point grid
    }

    private fillPolygon(ctx: CanvasRenderingContext2D, unitSize: number, width: number, height: number, polygon: Polygon) {
        // TODO: assume color and clip already set, so fill then stroke the shape
    }

    private scaleCoord(val: number, unitSize: number, offset: number) {
        return (val - offset) * unitSize;
    }
}