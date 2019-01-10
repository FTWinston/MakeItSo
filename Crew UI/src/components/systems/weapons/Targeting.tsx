import * as React from 'react';
import { Vector2 } from '~/functionality';
import { TouchArea } from '~/components/general';

export enum Shape {
    Star,
    Triangle,
    Square,
    Pentagon,
    Hexagon,
    Octagon,
    Circle,
}

export enum Color {
    Red,
    Yellow,
    Green,
    Blue,
}

export interface ITarget {
    shape: Shape; // TODO: perhaps shape and color shouldn't be defined at this stage, but should be internal things?
    color: Color; //       hmm, no that doesn't let us display this info concisely in a separate key. Oh well!
    number: number;
}

interface ISymbol {
    shape: Shape;
    color: Color;
    scale: number;
    position: Vector2;
    rotation: number;
    targetIndex: number;
}

interface IProps {
    className?: string;
    targets: ITarget[];
    targetSelected: (index: number) => void;
}

interface IState {
    symbols: ISymbol[];
    targetingIndex?: number;
    numSymbolsClicked: number;
}


export class Targeting extends React.Component<IProps, IState> {
    private touch: TouchArea;
    private mounted: boolean = false;

    constructor(props: IProps) {
        super(props);

        this.state = {
            symbols: this.createSymbols(props.targets),
            numSymbolsClicked: 0,
        };
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        if (this.props.className !== nextProps.className) {
            return true;
        }

        if (this.props.targets.length !== nextProps.targets.length) {
            this.setState({
                symbols: this.createSymbols(nextProps.targets),
            })
        }
        else {
            let redraw = false;

            for (let i=0; i<nextProps.targets.length; i++) {
                const a = this.props.targets[i];
                const b = nextProps.targets[i];

                if (a !== b) {
                    redraw = true;
                    break;
                }

                if (a.number !== b.number) {
                    // TODO: need to handle the number changing ... that will always change the object, though!
                }
            }

            if (redraw) {    
                this.setState({
                    symbols: this.createSymbols(nextProps.targets),
                })
            }
        }

        setTimeout(() => { if (this.mounted) { this.touch.redraw() } }, 0); // wait til state/props actually change
        return false;
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        this.touch.redraw();
    }

    render() {
        return <TouchArea
            className={this.props.className}
            draw={(ctx, w, h) => this.drawSymbols(ctx, w, h)}
            setupTouch={a => this.setupTouch(a)}
            ref={t => { if (t !== null) { this.touch = t }}}
        />;
    }

    private createSymbols(targets: ITarget[]) {
        const symbols: ISymbol[] = [];

        // TODO: create and position the right number of ISymbols for each target!

        return symbols;
    }

    private drawSymbols(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1;

        for (const symbol of this.state.symbols) {
            this.drawSymbol(symbol, ctx, width, height);
        }
    }

    private drawSymbol(symbol: ISymbol, ctx: CanvasRenderingContext2D, width: number, height: number) {
        // TODO: actually draw the symbol in the right place
    }

    private setupTouch(area: TouchArea) {
        // TODO: determine clicked symbol, and remove it.
        
        // TODO: if this.state.targetingIndex is undefined, set it to clicked symbol's targetIndex
        // TODO: otherwise, if it doesn't match, call this.props.targetSelected(-1);
        // TODO: otherwise, check if numSymbolsClicked >= the selected target's number, call this.props.targetSelected(index)
        // TODO: otherwise, decrement numSymbolsClicked
    }
}