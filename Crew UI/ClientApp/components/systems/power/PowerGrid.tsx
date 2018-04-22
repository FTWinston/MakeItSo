import * as React from 'react';
import { PowerCell, PowerCellType } from '~/store/power';
import { GridCell } from './GridCell';
import './PowerGrid.scss';
import { TextLocalisation } from "~/functionality";

interface PowerGridProps {
    cells: PowerCell[];
    cellClicked: (cellIndex: number) => void;
    text: TextLocalisation;
}

export class PowerGrid extends React.PureComponent<PowerGridProps, {}> {
    render() {
        let cells = this.props.cells
        .filter(cell => cell.type !== PowerCellType.System && cell.type !== PowerCellType.Reactor)
        .map((cell, index) => (
            <GridCell
                cell={cell}
                key={cell.index}
                clicked={() => this.props.cellClicked(cell.index)}
                text={this.props.text}
            />
        ));

        return <div className='powerGrid'>{cells}</div>;
    }
}