import * as React from 'react';
import * as Hammer from 'hammerjs';

interface TouchAreaProps {
    setupTouch: (area: TouchArea) => void;
}

interface TouchFeedback {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class TouchArea extends React.PureComponent<TouchAreaProps, {}> {
    public feedback?: TouchFeedback;

    private element: HTMLDivElement;
    private hammer: Hammer.Manager;

    componentDidMount() {
        this.hammer = new Hammer.Manager(this.element);

        this.props.setupTouch(this);
    }

    render() {
        return <div className="touchArea" ref={r => { if (r !== null) { this.element = r }}} />;
    }
    
    shouldComponentUpdate(nextProps: TouchAreaProps, nextState: {}) {
        return false;
    }

    public createPan(
        name: string,
        pointers: number,
        direction: number,
        eventScale: number,
        panned: (val: number) => void,
        feedback?: (startX: number, startY: number, endX: number, endY: number) => void,
        clearFeedback?: () => void,
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

            panAmount = panAmount * eventScale // scale, clamp & round
            panAmount = Math.max(Math.min(panAmount, 1), -1); // clamp
            panAmount = Math.round(panAmount * 100) / 100; // round

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

            if (clearFeedback !== undefined) {
                clearFeedback();
            }
        });

        this.hammer.on(name + 'cancel', (ev: Hammer.Input) => {
            panned(0);

            if (clearFeedback !== undefined) {
                clearFeedback();
            }
        });

        return pan;
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