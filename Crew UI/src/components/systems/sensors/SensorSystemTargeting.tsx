import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import './SensorSystemTargeting.scss';
import { SensorTargetCellType } from './store';

interface IProps {
    text: TextLocalisation;
    cells: SensorTargetCellType[];
    revealCell: (cellIndex: number) => void;
}

export class SensorSystemTargeting extends React.PureComponent<IProps, {}> {
    public render() {
        const classes = this.determineClasses();
        return <div className={classes}>
            cell grid
        </div>

        // TODO: display grid
    }

    private determineClasses() {
        let classes = 'sensorSystemTargeting';

        // TODO: account for # of revealed cells, etc
        
        return classes;
    }
}