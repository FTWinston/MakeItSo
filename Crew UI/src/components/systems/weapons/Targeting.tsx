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
}

export class Targeting extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            prevPolygon: props.polygon,
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.polygon !== this.props.polygon) {
            this.setState({ prevPolygon: this.props.polygon });
        }
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
        // TODO: decide how to size the shape, draw background and draw shape
    }
}