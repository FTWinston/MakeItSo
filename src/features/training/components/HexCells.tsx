import produce from 'immer';
import { useReducer } from 'react';
import { Cells, hexCellReducer } from 'src/features/stations/features/sensors/features/hexcells';
import { createCellBoardInstance } from 'src/features/stations/features/sensors/features/hexcells/utils/createCellBoardInstance';
import { GenerationConfig, generateBoard } from 'src/features/stations/features/sensors/features/hexcells/utils/generateBoard';
import { useToggle } from 'src/hooks/useToggle';
import { Alert, Button, Snackbar } from 'src/lib/mui';

const config: GenerationConfig = {
    orientation: 'portrait',
    numCells: 34,
    gapFraction: 0.3,
    bombFraction: 0.25,
    unknownFraction: 0.15,
    radiusClueFraction: 0.05,
    revealFraction: 0.1,
    contiguousClueFraction: 0.5,
    splitClueFraction: 0.4,
};

export const Component: React.FC = () => {
    const [board, dispatch] = useReducer(produce(hexCellReducer), undefined, () => createCellBoardInstance(generateBoard(config)));

    const [generatedToggle, onRegenerated] = useToggle();
    
    const regenerate = () => {
        dispatch({
            type: 'new',
            board: createCellBoardInstance(generateBoard(config)),
        });
        onRegenerated();
    }

    return (
        <>
            <Cells
                key={generatedToggle}
                cells={board.cells}
                columns={board.columns}
                revealCell={index => dispatch({ type: 'reveal', index })}
                flagCell={index => dispatch({ type: 'flag', index })}
                numBombs={board.numBombs}
                numErrors={board.numErrors}
                result={board.result}
                errorIndex={board.errorIndex}
            />
            <Snackbar open={board.result === 'failure'} transitionDuration={1000}>
                <Alert severity="error" sx={{ width: '100%' }} action={
                    <Button color="inherit" size="small" onClick={regenerate}>Regenerate</Button>
                }>
                    You failed!
                </Alert>
            </Snackbar>
            <Snackbar open={board.result === 'success'} transitionDuration={1000}>
                <Alert severity="success" sx={{ width: '100%' }} action={
                    <Button color="inherit" size="small" onClick={regenerate}>Regenerate</Button>
                }>
                    You succeeded!
                </Alert>
            </Snackbar>
        </>
    )
}
