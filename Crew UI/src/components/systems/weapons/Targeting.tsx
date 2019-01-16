import * as React from 'react';
import './Targeting.scss';
import { Shape, Color, TargetingElement, Status } from './TargetingElement';

export interface ITarget {
    shape: Shape;
    color: Color;
    number: number;
}

interface ITargetNumber {
    target: ITarget;
    number: number;
}

interface ISymbol {
    shape: Shape;
    color: Color;
    status: Status;
    target: ITarget;
}

interface IProps {
    className?: string;
    targets: ITarget[];
    targetSelected: (target: ITarget) => void;
    misSelection: () => void;
}

interface IState {
    symbols: ISymbol[];
    targetNumbers: ITargetNumber[];
    selectingTarget?: ITarget;
    numSymbolsClicked: number;
}


export class Targeting extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const targetNumbers = [];
        const symbols = [];
        for (const target of props.targets) {
            for (let i = 0; i < target.number; i++) {
                symbols.push(this.createSymbol(target));
            }

            targetNumbers.push({
                target: target,
                number: target.number,
            });
        }

        this.state = {
            symbols: symbols,
            numSymbolsClicked: 0,
            targetNumbers: targetNumbers,
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
        // if target list changes, either something was added / removed, or a target's number has changed
        if (this.props.targets !== nextProps.targets) {
            const symbols = this.state.symbols.slice();
            
            // don't keep targetNumbers for removed targets
            const targetNumbers = this.state.targetNumbers
                .filter(t => nextProps.targets.indexOf(t.target) !== -1);

            for (let i = 0; i < symbols.length; i++) {
                const symbol = symbols[i];

                if (nextProps.targets.indexOf(symbol.target) === -1) {
                    // remove a symbol if its target was removed
                    symbols.splice(i, 1);
                    i--;
                }
                else {
                    // otherwise, update its shape and color, in case they changed
                    symbol.shape = symbol.target.shape;
                    symbol.color = symbol.target.color;
                }
            }

            for (const target of nextProps.targets) {
                if (this.props.targets.indexOf(target) === -1) {
                    // for all new targets, add symbols if the target wasn't in the list before
                    for (let i = 0; i < target.number; i++) {
                        symbols.push(this.createSymbol(target));
                    }
                    
                    targetNumbers.push({
                        target: target,
                        number: target.number,
                    });
                }
                else {
                    // for existing targets, add/remove targets if their number has changed
                    const existingTargetNumber = targetNumbers.filter(t => t.target === target);

                    if (existingTargetNumber.length === 0) {
                        console.error('no targetNumber for existing target');
                    }

                    const lastNumber = existingTargetNumber[0].number;
                    if (lastNumber < target.number) {
                        // add symbols to make up the difference
                        for (let i = target.number - lastNumber; i > 0; i--) {
                            symbols.push(this.createSymbol(target));
                        }
                    }
                    else if (lastNumber > target.number) {
                        // remove some existing symbols
                        const toRemove = symbols
                            .filter(s => s.target === target)
                            .slice(0, lastNumber - target.number);
                        
                        for (const symbol of toRemove) {
                            const index = symbols.indexOf(symbol);
                            symbols.splice(index, 1);
                        }
                    }
                }
            }

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
            const clicked = () => this.symbolClicked(s);
            
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
            status: Status.Clickable,
            target: target
        };
    }

    private symbolClicked(symbol: ISymbol) {
        symbol.status = Status.Selected;

        // if nothing already clicked, record the "target" being clicked
        // ... unless it only needs one click, in which case do its thing
        if (this.state.selectingTarget === undefined) {
            if (symbol.target.number <= 1) {
                symbol.status = Status.Removing;

                this.setState({
                    selectingTarget: undefined,
                    numSymbolsClicked: 0,
                });

                this.props.targetSelected(symbol.target);
            }
            else {
                this.setState({
                    selectingTarget: symbol.target,
                    numSymbolsClicked: 1,
                });
            }

            return;
        }

        // if something already clicked, call misSelection if it's a different "target"
        if (this.state.selectingTarget !== symbol.target) {
            this.setState({
                selectingTarget: undefined,
                numSymbolsClicked: 0,
            });

            this.props.misSelection();
        }

        // increment numSymbolsClicked ... if >= the target's number, call targetSelected
        const numClicked = this.state.numSymbolsClicked + 1;
        if (numClicked >= symbol.target.number) {
            for (const other of this.state.symbols.filter(s => s.target === symbol.target)) {
                other.status = Status.Removing;
            }

            this.setState({
                selectingTarget: undefined,
                numSymbolsClicked: 0,
            });

            this.props.targetSelected(symbol.target);
        }
        else {
            // otherwise, just save the new number
            this.setState({
                numSymbolsClicked: numClicked,
            });
        }
    }
}