import * as React from 'react';
import * as Hammer from 'hammerjs';
import { FlexibleCanvas } from './FlexibleCanvas';
import { drawFunc } from './Canvas';

interface TouchAreaProps {
    setupTouch: (area: TouchArea) => void;
    draw?: drawFunc;
}

export class TouchArea extends React.PureComponent<TouchAreaProps, {}> {
    protected element: HTMLDivElement;
    private hammer: Hammer.Manager;

    componentDidMount() {
        this.hammer = new Hammer.Manager(this.element);
        this.props.setupTouch(this);
    }

    render() {
        return this.props.draw === undefined ?
            <div className="touchArea" ref={r => { if (r !== null) { this.element = r }}} />
        :   <FlexibleCanvas className="touchArea" draw={this.props.draw} ref={r => { if (r !== null) { this.element = r.wrapper }}} />;
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

    private scaleClampRound(val: number, scale: number) {
        val = val * scale // scale
        val = Math.max(Math.min(val, 1), -1); // clamp
        val = Math.round(val * 100) / 100; // round
        return val;
    }

    public createPan(
        name: string,
        pointers: number,
        direction: number,
        eventScale: number,
        panned: (val: number) => void,
        feedback?: (startX: number, startY: number, endX: number, endY: number) => void,
        start?: () => void,
        finish?: () => void,
    ) {
        var params = {
            event: name,
            pointers: pointers,
            direction: direction,
            //threshold: threshold,
        };

        let pan = new Hammer.Pan(params);
        this.hammer.add(pan);

        this.hammer.on(name,  (ev: Hammer.Input) => {
            let panAmount = direction === Hammer.DIRECTION_HORIZONTAL
                ? ev.deltaX / this.element.offsetWidth
                : ev.deltaY / this.element.offsetHeight;

            panAmount = this.scaleClampRound(panAmount, eventScale);
            panned(panAmount);

            if (feedback !== undefined) {
                let parent = this.element.parentElement;
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
            panned(0);

            if (finish !== undefined) {
                finish();
            }
        });

        this.hammer.on(name + 'cancel', (ev: Hammer.Input) => {
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
        panned: (dx: number, dy: number) => void,
        feedback?: (startX: number, startY: number, endX: number, endY: number) => void,
        start?: () => void,
        finish?: () => void,
    ) {
        var params = {
            event: name,
            pointers: pointers,
            direction: Hammer.DIRECTION_ALL,
            //threshold: threshold,
        };

        let pan = new Hammer.Pan(params);
        this.hammer.add(pan);

        this.hammer.on(name,  (ev: Hammer.Input) => {
            let dx = this.scaleClampRound(ev.deltaX / this.element.offsetWidth, eventScale);
            let dy = this.scaleClampRound(ev.deltaY / this.element.offsetHeight, eventScale);
            panned(dx, dy);

            if (feedback !== undefined) {
                let parent = this.element.parentElement;
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
            panned(0, 0);

            if (finish !== undefined) {
                finish();
            }
        });

        this.hammer.on(name + 'cancel', (ev: Hammer.Input) => {
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
        var params = {
            event: name,
        };

        let rot = new Hammer.Rotate(params);
        this.hammer.add(rot);

        this.hammer.on(name,  (ev: Hammer.Input) => {
            let amount = this.scaleClampRound(ev.rotation, eventScale);
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

    public createPress(name: string, duration: number, pressed: () => void, released?: () => void) {
        let press = new Hammer.Press({ event: name, time: duration });
        this.hammer.add(press);
        
        this.hammer.on(name, pressed);

        if (released !== undefined) {
            this.hammer.on(name + 'up', released);
        }

        return press;
    }
}