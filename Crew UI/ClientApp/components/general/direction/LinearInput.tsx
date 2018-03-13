import * as React from 'react';
import { TouchArea } from '~/components/general';

interface LinearInputProps {
    label: string;
    value: number;
    minValue: number;
    maxValue: number;
    valueUnit?: string;
    valueChanged?: (val: number) => void;
}

export class LinearInput extends React.PureComponent<LinearInputProps, {}> {
    render() {
        let readonly = this.props.valueChanged === undefined;

        return <div className='direction__linear'>
            <TouchArea draw={(ctx, w, h) => this.draw(ctx, w, h)} setupTouch={a => this.setupTouch(a)} />
        </div>;
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {

    }

    private setupTouch(area: TouchArea) {

    }
}