import * as React from 'react';
import './Targeting.scss';
import { TargetingElement, Status } from './TargetingElement';
import { ITargetingSymbol } from './store';

interface ITargetingElement {
    symbol: ITargetingSymbol;
    status: Status;
}

interface IProps {
    className?: string;
    symbols: ITargetingSymbol[];
    selectedSymbols: ITargetingSymbol[];
    symbolSelected: (symbol: ITargetingSymbol) => void;
}

interface IState {
    elements: ITargetingElement[];
}

export class Targeting extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            elements: props.symbols.map(s => this.createElement(s)),
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
        // if symbol list changes, recreate all elements
        if (this.props.symbols !== nextProps.symbols) {
            this.setState({
                elements: this.props.symbols.map(s => this.createElement(s)),
            });
        }
    }

    render() {
        const classes = this.props.className === undefined
            ? 'targeting'
            : this.props.className + ' targeting';

        const symbols = this.state.elements.map((e, i) => {
            const clicked = () => this.elementClicked(e);
            
            return <TargetingElement
                key={i}
                status={e.status}
                color={e.symbol.color}
                shape={e.symbol.shape}
                clicked={clicked}
            />
        })

        return <div className={classes}>
            {symbols}
        </div>;
    }

    private createElement(symbol: ITargetingSymbol) {
        return {
            symbol: symbol,
            status: Status.Clickable,
        };
    }

    private elementClicked(element: ITargetingElement) {
        element.status = Status.Selected;

        // re-set the elements, so that this status change is displayed
        this.setState({
            elements: this.state.elements,
        })

        this.props.symbolSelected(element.symbol);
    }
}