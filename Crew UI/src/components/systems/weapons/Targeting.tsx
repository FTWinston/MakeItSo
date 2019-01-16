import * as React from 'react';
import './Targeting.scss';
import { Shape, Color, TargetingElement, TargetingElementStatus } from './TargetElement';

export interface ITarget {
    shape: Shape;
    color: Color;
    number: number;
}

interface ISymbol {
    shape: Shape;
    color: Color;
    status: TargetingElementStatus;
    target: ITarget;
}

interface IProps {
    className?: string;
    targets: ITarget[];
    targetSelected: (index: number) => void;
    misSelection: () => void;
}

interface IState {
    symbols: ISymbol[];
    targetingIndex?: number;
    numSymbolsClicked: number;
}


export class Targeting extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        let symbols = [];
        for (const target of props.targets) {
            for (let i = 0; i < target.number; i++) {
                symbols.push(this.createSymbol(target));
            }
        }

        this.state = {
            symbols: symbols,
            numSymbolsClicked: 0,
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (this.props.targets !== nextProps.targets) {
            // target list has changed ... something probably added or removed

            const symbols = this.state.symbols.slice();

            // for all existing symbols, remove them if their target is no longer in the list
            for (let i = 0; i < symbols.length; i++) {
                const symbol = symbols[i];

                if (nextProps.targets.indexOf(symbol.target) === -1) {
                    symbols.splice(i, 1);
                    i--;
                }
            }

            // for all new targets, add symbols if the target wasn't in the list before
            for (const target of nextProps.targets) {
                if (this.props.targets.indexOf(target) === -1) {
                    for (let i = 0; i < target.number; i++) {
                        symbols.push(this.createSymbol(target));
                    }
                }
            }

            // TODO: need to account for targets' NUMBER changing ... but if we have the same objects before and after, how to handle that?

            this.setState({
                symbols: symbols
            });
        }
    }

    render() {
        const classes = this.props.className === undefined
            ? 'targeting'
            : this.props.className + ' targeting';

        const symbols = this.state.symbols.map((s, i) => {
            const clicked = () => this.symbolClicked(i);
            
            return <TargetingElement
                key={i}
                status={s.status}
                color={s.color}
                shape={s.shape}
                clicked={clicked}
            />
        })

        return <div className={classes}>
            {symbols}
        </div>;
    }

    private createSymbol(target: ITarget) {
        return {
            color: target.color,
            shape: target.shape,
            status: TargetingElementStatus.Clickable,
            target: target
        };
    }

    private symbolClicked(symbolIndex: number) {
        // TODO: if nothing already clicked, record the "target" being clicked
        // TODO: if something already clicked, call misSelection if it's a different "target", otherwise increment numSymbolsClicked
        // TODO: if numSymbolsClicked >= the target's number, call targetSelected
    }
}