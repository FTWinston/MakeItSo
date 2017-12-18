import * as React from 'react';
import * as Hammer from 'hammerjs';
import { Helm, TypedHelmProps } from './Helm';
import { FieldGroup } from './FieldGroup';

export class TouchHelm extends React.Component<TypedHelmProps, {}> {
    private rot: HTMLDivElement | null;
    private speed: HTMLDivElement | null;
    private rotHammer: Hammer.Manager;
    private speedHammer: Hammer.Manager;

    componentDidMount() {
        if (this.rot === null || this.speed === null) {
            return;
        }
        this.rotHammer = new Hammer.Manager(this.rot);

        let yaw = this.createPan(this.rot, 'yaw', 1, Hammer.DIRECTION_HORIZONTAL, 2);
        let pitch = this.createPan(this.rot, 'pitch', 1, Hammer.DIRECTION_VERTICAL, 2);
        let roll = this.createPan(this.rot, 'roll', 2, Hammer.DIRECTION_HORIZONTAL, 2.25, 20 );
        let forward = this.createPan(this.rot, 'forward', 2, Hammer.DIRECTION_VERTICAL, -2.25, 20);
        let lateral = this.createPan(this.rot, 'lateral', 3, Hammer.DIRECTION_HORIZONTAL, 5.5);
        let vertical = this.createPan(this.rot, 'vertical', 3, Hammer.DIRECTION_VERTICAL, -3);
        
        yaw.recognizeWith(pitch);
        lateral.recognizeWith(vertical);

        let stop = new Hammer.Press({ event: 'allStop', time: 500 });
        this.rotHammer.add(stop);
        
        this.rotHammer.on('allStop', function () {
            //document.getElementById('forward').innerText = 'stop';
        });


        this.speedHammer = new Hammer.Manager(this.speed);
        forward = this.createPan(this.speed, 'forward', 1, Hammer.DIRECTION_VERTICAL, 2);
    }
    render() {
        let words = this.props.text.systems.helm;
        let iconSize = "1.5em";
        let overallSpeed = Helm.magnitude(this.props.translationRateX, this.props.translationRateY, this.props.translationRateForward);

        return <div className="system helm helm--touchInput">
            <FieldGroup>
                <div ref={r => this.rot = r} />
            </FieldGroup>
            <FieldGroup>
                <div ref={r => this.speed = r} />
            </FieldGroup>
        </div>;
    }
    
    private createPan(element: HTMLDivElement, name: string, pointers: number, direction: number, eventScale: number, threshold: number | undefined = undefined) {
        var params = {
            event: name,
            pointers: pointers,
            direction: direction,
            threshold: threshold,
        };

        let pan = new Hammer.Pan(params);
        this.rotHammer.add(pan);
        
        let panAmount = 0;
        this.rotHammer.on(name, direction == Hammer.DIRECTION_HORIZONTAL ?
            (ev: Hammer.Input) => {
                panAmount = Math.max(Math.min(ev.deltaX / element.offsetWidth * eventScale, 1), -1);
                console.log(name, panAmount);
                //document.getElementById(name).innerText = Math.round(panAmount * 100) / 100;
            } :
            (ev: Hammer.Input) => {
                panAmount = Math.max(Math.min(ev.deltaY / element.offsetHeight * eventScale, 1), -1);
                console.log(name, panAmount);
                //document.getElementById(name).innerText = Math.round(panAmount * 100) / 100;
            }
        );
      
        this.rotHammer.on(name + 'end', (ev: Hammer.Input) => {
            console.log(name + ' end');
            panAmount = 0;
            //document.getElementById(name).innerText = panAmount;
        });
        
        this.rotHammer.on(name + 'start', (ev: Hammer.Input) => {
            console.log(name + ' start');
            //numActivePans++;
        });
        
        return pan;
    }
}