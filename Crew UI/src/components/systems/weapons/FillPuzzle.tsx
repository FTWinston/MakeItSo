import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { FillPuzzleCell, FillPuzzleCellType } from './FillPuzzleCell';
import './FillPuzzle.scss';

interface IProps {
    text: TextLocalisation;
    width: number;
    height: number;
    startCell: number;
    cells: boolean[];
    onCompleted: (cellIndices: number[]) => void;
}

interface IState {
    filledCells: number[];
}

export class FillPuzzle extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            filledCells: [ props.startCell ],
        };
    }

    public componentWillUpdate(nextProps: IProps, nextState: IState) {
        if (this.props.startCell !== nextProps.startCell) {
            this.setState({
                filledCells: [ nextProps.startCell ],
            });
        }
        else if (this.state.filledCells.length !== nextState.filledCells.length && this.state.filledCells.length >= this.props.cells.filter(c => c).length) {
            this.props.onCompleted(this.state.filledCells);
        }
    }

    public render() {
        const cells = this.props.cells.map((exists, index) => {
            let cellType;
            let extendUp;
            let extendDown;
            let extendLeft;
            let extendRight;
            let onMouseOver;

            if (exists) {
                const fillIndex = this.state.filledCells.indexOf(index);
                if (fillIndex !== -1) {
                    cellType = this.props.startCell === index
                        ? FillPuzzleCellType.Start
                        : FillPuzzleCellType.Filled;
                    
                    const prevIndex = fillIndex > 0
                        ? this.state.filledCells[fillIndex - 1]
                        : -1;
                    const nextIndex = fillIndex < this.state.filledCells.length
                        ? this.state.filledCells[fillIndex + 1]
                        : -1;

                    extendUp = this.isUpIndex(index, prevIndex) || this.isUpIndex(index, nextIndex);
                    extendDown = this.isDownIndex(index, prevIndex) || this.isDownIndex(index, nextIndex);
                    extendLeft = this.isLeftIndex(index, prevIndex) || this.isLeftIndex(index, nextIndex);
                    extendRight = this.isRightIndex(index, prevIndex) || this.isRightIndex(index, nextIndex);

                    onMouseOver = () => this.unfillTo(index);
                }
                else {
                    cellType = FillPuzzleCellType.Unfilled;
                    extendUp = extendDown = extendLeft = extendRight = false;

                    onMouseOver = () => this.tryFillCell(index);
                }
            }
            else {
                cellType = FillPuzzleCellType.Empty;
                extendUp = extendDown = extendLeft = extendRight = false;
            }

            return <FillPuzzleCell
                type={cellType}
                key={index}
                mouseOver={onMouseOver}
                extendUp={extendUp}
                extendDown={extendDown}
                extendLeft={extendLeft}
                extendRight={extendRight}
            />
        });

        let classes = 'weapons__puzzle fillPuzzle';
        
        classes += ` fillPuzzle--width${this.props.width}`;
        classes += ` fillPuzzle--height${this.props.height}`;

        return <div className={classes}>
            {cells}
        </div>
    }
    
    private tryFillCell(tryIndex: number) {
        const lastFillIndex = this.state.filledCells[this.state.filledCells.length - 1];

        if (!this.isUpIndex(lastFillIndex, tryIndex)
        && !this.isDownIndex(lastFillIndex, tryIndex)
        && !this.isLeftIndex(lastFillIndex, tryIndex)
        && !this.isRightIndex(lastFillIndex, tryIndex)) {
            return;
        }

        this.setState(state => {
            const cells = state.filledCells.slice();
            cells.push(tryIndex);

            return {
                filledCells: cells,
            };
        });
    }

    private unfillTo(tryIndex: number) {
        this.setState(state => {
            const lastKeepFillIndex = state.filledCells.indexOf(tryIndex);
            const cells = state.filledCells.slice(0, lastKeepFillIndex + 1);

            return {
                filledCells: cells,
            }
        })
    }

    private isUpIndex(fromIndex: number, testIndex: number) {
        return testIndex === fromIndex - this.props.width
            && fromIndex >= this.props.width;
    }

    private isDownIndex(fromIndex: number, testIndex: number) {
        return testIndex === fromIndex + this.props.width
            && testIndex < this.props.width * this.props.width;
    }

    private isLeftIndex(fromIndex: number, testIndex: number) {
        return testIndex === fromIndex - 1
            && fromIndex % this.props.width !== 0
    }

    private isRightIndex(fromIndex: number, testIndex: number) {
        return testIndex === fromIndex + 1
            && testIndex % this.props.width !== 0
    }
}