import * as React from 'react';
import { NumberClicker } from './NumberClicker';
import { Hotkeys, Hotkey } from '~/functionality';

interface IProps {
    max: number;
    selected: number;
    clicked: (value: number) => void;
}

export class Numbers extends React.PureComponent<IProps, {}> {
    componentDidMount() {
        for (let i=1; i <= this.props.max; i++) {
            Hotkeys.registerAction(i.toString() as Hotkey, () => this.props.clicked(i));
        }
        Hotkeys.registerAction('0', () => this.props.clicked(0));
        Hotkeys.registerAction('`', () => this.props.clicked(0));
    }

    componentWillUnmount() {
        for (let i=1; i <= this.props.max; i++) {
            Hotkeys.unregister(i.toString() as Hotkey);
        }
        
        Hotkeys.unregister('0');
        Hotkeys.unregister('`');
    }

    componentDidUpdate(prevProps: IProps, prevState: {}) {
        if (prevProps.max > this.props.max) {
            for (let i=this.props.max + 1; i <= prevProps.max; i++) {
                Hotkeys.unregister(i.toString() as Hotkey);
            }
        }
        else if (prevProps.max < this.props.max) {
            for (let i=prevProps.max + 1; i <= this.props.max; i++) {
                Hotkeys.registerAction(i.toString() as Hotkey, () => this.props.clicked(i));
            }
        }
    }

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