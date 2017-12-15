import * as React from 'react';
import * as Hammer from 'hammerjs';
import { Helm, TypedHelmProps } from './Helm';

export class TouchHelm extends React.Component<TypedHelmProps, {}> {
    private root: HTMLDivElement | null;
    private hammer: Hammer.Manager;

    componentDidMount() {
        if (this.root === null) {
            return;
        }
        this.hammer = new Hammer.Manager(this.root);

        let yaw = this.createPan('yaw', 1, Hammer.DIRECTION_HORIZONTAL, 2);
        let pitch = this.createPan('pitch', 1, Hammer.DIRECTION_VERTICAL, 2);
        let roll = this.createPan('roll', 2, Hammer.DIRECTION_HORIZONTAL, 2.25, 20 );
        let forward = this.createPan('forward', 2, Hammer.DIRECTION_VERTICAL, -2.25, 20);
        let lateral = this.createPan('lateral', 3, Hammer.DIRECTION_HORIZONTAL, 5.5);
        let vertical = this.createPan('vertical', 3, Hammer.DIRECTION_VERTICAL, -3);
        
        yaw.recognizeWith(pitch);
        lateral.recognizeWith(vertical);

        let stop = new Hammer.Press({ event: 'allStop', time: 500 });
        this.hammer.add(stop);
        
        this.hammer.on('allStop', function () {
            //document.getElementById('forward').innerText = 'stop';
        })
    }
    render() {
        let words = this.props.text.systems.helm;
        let iconSize = "1.5em";
        let overallSpeed = Helm.magnitude(this.props.translationRateX, this.props.translationRateY, this.props.translationRateForward);

        return <div className="system helm helm--touchInput" ref={r => this.root = r}>

        </div>;
    }
    
    private createPan(name: string, pointers: number, direction: number, eventScale: number, threshold: number | undefined = undefined) {
        var params = {
            event: name,
            pointers: pointers,
            direction: direction,
            threshold: threshold,
        };

        let pan = new Hammer.Pan(params);
        this.hammer.add(pan);
        
        let panAmount = 0;
        this.hammer.on(name, direction == Hammer.DIRECTION_HORIZONTAL ?
          (ev: Hammer.Input) => {
            //panAmount = Math.max(Math.min(ev.deltaX / width * eventScale, 1), -1);
            //document.getElementById(name).innerText = Math.round(panAmount * 100) / 100;
          } :
          (ev: Hammer.Input) => {
            //panAmount = Math.max(Math.min(ev.deltaY / height * eventScale, 1), -1);
            //document.getElementById(name).innerText = Math.round(panAmount * 100) / 100;
          }
        );
      
        this.hammer.on(name + 'end', (ev: Hammer.Input) => {
          panAmount = 0;
          //document.getElementById(name).innerText = panAmount;
        });
        
        this.hammer.on(name + 'start', (ev: Hammer.Input) => {
            //console.log(name + ' start');
            //numActivePans++;
        });
        
        return pan;
    }
}