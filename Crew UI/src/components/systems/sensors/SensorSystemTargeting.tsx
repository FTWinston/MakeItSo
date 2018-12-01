import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import './SensorSystemTargeting.scss';
import { SensorTargetCellType } from './store';
import { SensorSystemCell } from './SensorSystemCell';

interface IProps {
    text: TextLocalisation;
    cells: SensorTargetCellType[];
    revealCell: (cellIndex: number) => void;
}

export class SensorSystemTargeting extends React.PureComponent<IProps, {}> {
    public render() {
        const classes = this.determineClasses();

        const cells = this.props.cells.map((c, i) => {
            const clicked = c === SensorTargetCellType.Unknown
                ? () => this.props.revealCell(i)
                : undefined;

            return <SensorSystemCell key={i} type={c} clicked={clicked} />
        });

        return <div className={classes}>
            {cells}
        </div>
    }

    private determineClasses() {
        let classes = 'sensorSystemTargeting';

        const gridSize = Math.ceil(Math.sqrt(this.props.cells.length));
        classes += ' sensorSystemTargeting--size' + gridSize;
        
        return classes;
    }
}