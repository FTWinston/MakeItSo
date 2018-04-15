import * as React from 'react';
import { PowerCell, PowerCellType } from '~/store/power';
import { TextLocalisation } from '~/functionality';
import { GridCell } from './GridCell';
import './CellList.scss';

interface CellListProps {
    text: TextLocalisation;
    cells: PowerCellType[];
    selectedIndex?: number;
    cellClicked: (cellIndex: number) => void;
}

export class CellList extends React.PureComponent<CellListProps, {}> {
    render() {
        const cellsWide = 15;
        let cells = this.props.cells.map((cellType, index) => {
            let cell = {
                index: index,
                type: cellType,
                power: 0,
            };

            return (
                <GridCell
                    cell={cell}
                    key={index}
                    inList={true}
                    selected={index === this.props.selectedIndex}
                    clicked={() => this.props.cellClicked(index)}
                />
            );
        });

        return (
        <div className='powerCellList'>
            <div className='powerCellList__headings'>{this.props.text.systems.power.spareCells}</div>
            {cells}
        </div>
        );
    }
}