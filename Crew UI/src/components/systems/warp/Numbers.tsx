import * as React from 'react';
import { NumberClicker } from './NumberClicker';

interface IProps {
    max: number;
    selected: number;
    clicked: (value: number) => void;
}

export class Numbers extends React.PureComponent<IProps, {}> {
    public render() {
        const numbers = [];

        for (let i=1; i <= this.props.max; i++) {    
            const clicked = () => this.props.clicked(i);
            numbers.push(<NumberClicker key={i} value={i} selected={this.props.selected === i} clicked={clicked} />);
        }

        return <div className="warp__numbers">
            {numbers}
        </div>
    }
}