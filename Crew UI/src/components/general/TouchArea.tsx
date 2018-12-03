import * as React from 'react';
import * as Hammer from 'hammerjs';
import { FlexibleCanvas } from './FlexibleCanvas';
import { drawFunc } from './Canvas';

interface TouchAreaProps {
    setupTouch: (area: TouchArea) => void;
    draw?: drawFunc;
    className?: string;
}

export class TouchArea extends React.Component<TouchAreaProps, {}> {
    private hammer: Hammer.Manager;
    private canvas?: FlexibleCanvas;
    private _element: HTMLDivElement;
    get element() { return this._element; }

    componentDidMount() {
        this.hammer = new Hammer.Manager(this._element);
        this.props.setupTouch(this);
    }

    render() {
        let classes = 'touchArea';
        if (this.props.className !== undefined) {
            classes += ' ' + this.props.className;
        }

        return this.props.draw === undefined ?
            <div className={classes} ref={e => { if (e !== null) { this._element = e }}} />
        :   <FlexibleCanvas className={classes} draw={this.props.draw} ref={c => { if (c !== null) { this.canvas = c; this._element = c.wrapper }}} />;
    }
    
    shouldComponentUpdate(nextProps: TouchAreaProps, nextState: {}) {
        return false;
    }

    addRecogniser(recogniser: Hammer.Recognizer) {
        this.hammer.add(recogniser);
    }

    removeRecogniser(recogniser: Hammer.Recognizer) {
        this.hammer.remove(recogniser);
    }

    redraw() {
        if (this.canvas !== undefined) {
            this.canvas.redraw();
        }
    }

    public createPan(
        name: string,
        pointers: number,
        direction: number,
        eventScale: number,
        clamp: boolean,
        panned: (val: number) => void,
        feedback?: (startX: number, startY: number, endX: number, endY: number) => void,
        start?: () => void,
        finish?: () => void,
    ) {
        let params = {
            event: name,
            pointers: pointers,
            direction: direction,
            // threshold: threshold,
        };

        let pan = new Hammer.Pan(params);
        let prevAmount = 0;
        this.hammer.add(pan);

        this.hammer.on(name,  (ev: Hammer.Input) => {
            if (clamp) {
                let panAmount = direction === Hammer.DIRECTION_HORIZONTAL
                    ? this.scaleClampRound(ev.deltaX * eventScale, this._element.offsetWidth)
                    : this.scaleClampRound(ev.deltaY * eventScale, this._element.offsetHeight);

                panned(panAmount);
            } else {
                let panAmount = direction === Hammer.DIRECTION_HORIZONTAL
                    ? ev.deltaX * eventScale
                    : ev.deltaY * eventScale;

                panned(panAmount - prevAmount);
                prevAmount = panAmount;
            }

            if (feedback !== undefined) {
                let parent = this._element.parentElement;
                let cx, cy;
                if (parent === null) {
                    cx = cy = 0;
                } else {
                    cx = parent.offsetWidth / 2;
                    cy = parent.offsetHeight / 2;
                }

                feedback(cx, cy, cx + ev.deltaX, cy + ev.deltaY);
            }
        });
        
        this.hammer.on(name + 'end', (ev: Hammer.Input) => {
            prevAmount = 0;
            panned(0);

            if (finish !== undefined) {
                finish();
            }
        });

        this.hammer.on(name + 'cancel', (ev: Hammer.Input) => {
            prevAmount = 0;
            panned(0);

            if (finish !== undefined) {
                finish();
            }
        });

        if (start !== undefined) {
            this.hammer.on(name + 'start', (ev: Hammer.Input) => start());
        }

        return pan;
    }

    public createPan2D(
        name: string,
        pointers: number,
        eventScale: number,
        clamp: boolean,
        panned: (dx: number, dy: number) => void,
        feedback?: (startX: number, startY: number, endX: number, endY: number) => void,
        start?: () => void,
        finish?: () => void,
    ) {
        let params = {
            event: name,
            pointers: pointers,
            direction: Hammer.DIRECTION_ALL,
            //threshold: threshold,
        };

        let pan = new Hammer.Pan(params);
        this.hammer.add(pan);

        let prevX = 0, prevY = 0;
        this.hammer.on(name,  (ev: Hammer.Input) => {
            let dx = ev.deltaX * eventScale;
            let dy = ev.deltaY * eventScale;
            
            if (clamp) {
                dx = this.scaleClampRound(dx, this._element.offsetWidth);
                dy = this.scaleClampRound(dy, this._element.offsetHeight);
                panned(dx, dy);
            } else {
                panned(dx - prevX, dy - prevY);
                prevX = dx;
                prevY = dy;
            }

            if (feedback !== undefined) {
                let parent = this._element.parentElement;
                let cx, cy;
                if (parent === null) {
                    cx = cy = 0;
                } else {
                    cx = parent.offsetWidth / 2;
                    cy = parent.offsetHeight / 2;
                }

                feedback(cx, cy, cx + ev.deltaX, cy + ev.deltaY);
            }
        });
        
        this.hammer.on(name + 'end', (ev: Hammer.Input) => {
            prevX = 0; prevY = 0;
            panned(0, 0);

            if (finish !== undefined) {
                finish();
            }
        });

        this.hammer.on(name + 'cancel', (ev: Hammer.Input) => {
            prevX = 0; prevY = 0;
            panned(0, 0);

            if (finish !== undefined) {
                finish();
            }
        });

        if (start !== undefined) {
            this.hammer.on(name + 'start', (ev: Hammer.Input) => start());
        }

        return pan;
    }

    public createRotate(
        name: string,
        eventScale: number,
        rotated: (val: number) => void,
    ) {
        let params = {
            event: name,
        };

        let rot = new Hammer.Rotate(params);
        this.hammer.add(rot);

        this.hammer.on(name,  (ev: Hammer.Input) => {
            let amount = this.scaleClampRound(ev.rotation * eventScale, 1);
            rotated(amount);
        });
        
        this.hammer.on(name + 'end', (ev: Hammer.Input) => {
            rotated(0);
        });

        this.hammer.on(name + 'cancel', (ev: Hammer.Input) => {
            rotated(0);
        });

        return rot;
    }

    public createPinch(
        name: string,
        threshold: number,
        zoom: (scale: number) => void,
        start?: () => void,
        end?: () => void,
    ) {
        let params = {
            event: name,
            threshold: threshold,
        };

        let pinch = new Hammer.Pinch(params);
        this.hammer.add(pinch);

        this.hammer.on(name, (ev: Hammer.Input) => zoom(ev.scale));

        if (start !== undefined) {
            this.hammer.on('zoomstart', (ev: Hammer.Input) => start());
        }
        if (end !== undefined) {
            this.hammer.on('zoomend', (ev: Hammer.Input) => end());
        }

        return pinch;
    }

    public createPress(name: string, duration: number, pressed: () => void, released?: () => void) {
        let press = new Hammer.Press({ event: name, time: duration });
        this.hammer.add(press);
        
        this.hammer.on(name, pressed);

        if (released !== undefined) {
            this.hammer.on(name + 'up', released);
        }

        return press;
    }

    private scaleClampRound(val: number, maxExtent: number) {
        val = val / maxExtent // scale
        val = Math.max(Math.min(val, 1), -1); // clamp
        val = Math.round(val * 100) / 100; // round
        return val;
    }
}