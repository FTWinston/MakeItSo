import * as React from 'react';
import { TouchArea } from '../TouchArea';

export enum RotaryInputMode {
    FullCircle,
    RightSemi,
    TopSemi,
}

interface RotaryInputProps {
    label: string;
    mode: RotaryInputMode
    value: number;
    valueUnit?: string;
    valueChanged?: (val: number) => void;
}

export class RotaryInput extends React.PureComponent<RotaryInputProps, {}> {
    render() {
        let readonly = this.props.valueChanged === undefined;

        return <div className='direction__rotary'>
            <TouchArea draw={(ctx, w, h) => this.draw(ctx, w, h)} setupTouch={a => this.setupTouch(a)} />
        </div>;
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {

    }

    private setupTouch(area: TouchArea) {

    }
}