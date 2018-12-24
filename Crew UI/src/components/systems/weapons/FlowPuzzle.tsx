import * as React from 'react';
import { TextLocalisation } from '~/functionality';

interface IProps {
    text: TextLocalisation;
    width: number;
    startCell: number;
    cells: boolean[];
}

interface IState {
    filledCells: number[];
}

export class FlowPuzzle extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            filledCells: [],
        };
    }

    public render() {
        return <div className="weapons__puzzle flowPuzzle">
            TODO: show puzzle
        </div>
    }
}