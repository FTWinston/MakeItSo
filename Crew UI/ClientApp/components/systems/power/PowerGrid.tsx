import * as React from 'react';
import { PowerCell } from '~/store/power';
import { GridCell } from './GridCell';
import './PowerGrid.scss';

interface PowerGridProps {
    cells: PowerCell[];
    cellClicked: (cellIndex: number) => void;
}

export class PowerGrid extends React.PureComponent<PowerGridProps, {}> {
    render() {
        const cellsWide = 11;
        let cells = this.props.cells.map((cell, index) => (
            <GridCell
                cell={cell}
                key={index}
                row={index % cellsWide + 1}
                col={Math.floor(index / cellsWide) + 1}
                clicked={() => this.props.cellClicked(cell.index)}
            />
        ));

        return <div className='powerGrid'>{cells}</div>;
    }
}