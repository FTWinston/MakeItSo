import * as React from 'react';
import * as Hammer from 'hammerjs';

interface TouchAreaProps {
    setupTouch: (manager: Hammer.Manager, element: HTMLDivElement) => void;
}

export class TouchArea extends React.PureComponent<TouchAreaProps, {}> {
    private root: HTMLDivElement;
    private hammer: Hammer.Manager;

    componentDidMount() {
        this.hammer = new Hammer.Manager(this.root);

        this.props.setupTouch(this.hammer, this.root);
    }

    render() {
        return <div className="touchArea" ref={r => { if (r !== null) { this.root = r }}} />;
    }
    
    shouldComponentUpdate(nextProps: TouchAreaProps, nextState: {}) {
        return false;
    }

    public static createPan(hammer: Hammer.Manager, element: HTMLDivElement, name: string, pointers: number, direction: number, panned: (val: number) => void, eventScale: number, threshold: number = 10) {
        var params = {
            event: name,
            pointers: pointers,
            direction: direction,
            threshold: threshold,
        };

        let pan = new Hammer.Pan(params);
        hammer.add(pan);

        hammer.on(name, direction === Hammer.DIRECTION_HORIZONTAL ?
            (ev: Hammer.Input) => {
                let panAmount = ev.deltaX / element.offsetWidth * eventScale // scale
                panAmount = Math.max(Math.min(panAmount, 1), -1); // clamp
                panAmount = Math.round(panAmount * 100) / 100; // round
                panned(panAmount);
                //console.log(`${name} ${panAmount}`);
            } :
            (ev: Hammer.Input) => {
                let panAmount = ev.deltaY / element.offsetHeight * eventScale // scale
                panAmount = Math.max(Math.min(panAmount, 1), -1); // clamp
                panAmount = Math.round(panAmount * 100) / 100; // round
                panned(panAmount);
                //console.log(`${name} ${panAmount}`);
            }
        );
        
        hammer.on(name + 'end', (ev: Hammer.Input) => {
            console.log(name + ' end');
            panned(0);
        });

        hammer.on(name + 'cancel', (ev: Hammer.Input) => {
            console.log(name + ' cancel');
            panned(0);
        });
/*        
        hammer.on(name + 'start', (ev: Hammer.Input) => {
            console.log(name + ' start');
            //numActivePans++;
        });
*/
        return pan;
    }
}