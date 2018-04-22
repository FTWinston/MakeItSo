import * as React from 'react';
import { PowerCellType } from '~/store/power';
import { TextLocalisation } from '~/functionality';
import { ListCell } from './ListCell';
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

            return (
                <ListCell
                    type={cellType}
                    key={index}
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