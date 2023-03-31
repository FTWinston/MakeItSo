import { styled } from 'src/lib/mui'
import { CellState } from '../types/CellState';
import { Cell } from './Cell';

interface Props {
    columns: number;
    cells: Array<CellState | null>;
    onClick: (index: number) => void;
}

const Root = styled('ul', { shouldForwardProp: (prop) => prop !== 'columns' })<{ columns: number }>(({ columns, theme }) => {
    return {
        display: 'grid',
        listStyleType: 'none',
        margin: 0,
        padding: '0.25em',
        gridGap: '0.125em 0.25em',
        gridTemplateColumns: `repeat(${columns}, 0.5em 1.25em ) 0.5em`,
        gridTemplateRows: '1.2em 1.2em 1.2em 1.2em 1.2em 1.2em'
    };
});

const CellWrapper = styled('li')({
    position: 'relative',
});

export const Cells: React.FC<Props> = props => {
    const { columns, cells } = props;

    let contents = cells.map((cell, index) => {
        if (cell === null) {
            return <div />;
        }

        let row = Math.floor(index / columns) * 2 + 1;
        let col = (index % columns);

        if (col % 2 === 0) {
            row += 1;
        }
        col = col * 2 + 1;
        
        return (
            <CellWrapper key={index} sx={{ gridColumn: `${col} / span 3`, gridRow: `${row} / span 2` }}>
                <Cell
                    cellType={cell.type}
                    countType={(cell as any).countType}
                    number={(cell as any).number}
                    onClick={() => props.onClick(index)}
                />
            </CellWrapper>
        )
    });

    return (
        <Root columns={props.columns}>
            {contents}
        </Root>
    );
}