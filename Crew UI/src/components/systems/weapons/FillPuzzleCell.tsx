import * as React from 'react';
import './FillPuzzleCell.scss';

export enum FillPuzzleCellType {
    Empty,
    Unfilled,
    Filled,
    Start,
}

interface IProps {
    type: FillPuzzleCellType;
    extendUp: boolean;
    extendDown: boolean;
    extendLeft: boolean;
    extendRight: boolean;
    mouseOver?: () => void;
}

export class FillPuzzleCell extends React.PureComponent<IProps, {}> {
    public render() {
        let cellClasses = 'fillPuzzleCell';

        switch (this.props.type) {
            case FillPuzzleCellType.Empty:
                cellClasses += ' fillPuzzleCell--empty'; break;
            case FillPuzzleCellType.Unfilled:
                cellClasses += ' fillPuzzleCell--unfilled'; break;
            case FillPuzzleCellType.Filled:
                cellClasses += ' fillPuzzleCell--filled'; break;
            case FillPuzzleCellType.Start:
                cellClasses += ' fillPuzzleCell--start'; break;
        }

        if (this.props.extendUp) {
            cellClasses += ' fillPuzzleCell--extendUp';
        }
        if (this.props.extendDown) {
            cellClasses += ' fillPuzzleCell--extendDown';
        }
        if (this.props.extendLeft) {
            cellClasses += ' fillPuzzleCell--extendLeft';
        }
        if (this.props.extendRight) {
            cellClasses += ' fillPuzzleCell--extendRight';
        }

        // TODO: ensure this works on touch!
        const mouseOver = this.props.mouseOver === undefined
            ? undefined
            : (e: React.MouseEvent<HTMLDivElement>) => { if (e.buttons === 1) { this.props.mouseOver!(); } };

        return <div className={cellClasses} onMouseOver={mouseOver} onMouseDown={mouseOver} />
    }
}