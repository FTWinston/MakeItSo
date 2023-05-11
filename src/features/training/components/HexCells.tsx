import produce from 'immer';
import { useReducer } from 'react';
import { Cells, hexCellReducer } from 'src/features/stations/features/sensors/features/hexcells';
import { generateInstance } from 'src/features/stations/features/sensors/features/hexcells/utils/createCellBoardInstance';
import { GenerationConfig } from 'src/features/stations/features/sensors/features/hexcells/utils/generateBoard';
import { useToggle } from 'src/hooks/useToggle';
import { Alert, Button, Snackbar } from 'src/lib/mui';

const config: GenerationConfig = {
    orientation: 'landscape',
    numCells: 50,
    gapFraction: 0.3,
    bombFraction: 0.45,
    unknownFraction: 0.05,
    rowClueChance: 5,
    radiusClueChance: 0.025,
    revealChance: 0.1,
    contiguousClueChance: 0.5,
    splitClueChance: 0.4,
    remainingBombCountFraction: 0.33,
};

export const Component: React.FC = () => {
    const [board, dispatch] = useReducer(produce(hexCellReducer), config, generateInstance);

    const [generatedToggle, onRegenerated] = useToggle();
    
    const regenerate = () => {
        dispatch({
            type: 'new',
            board: generateInstance(config),
        });
        onRegenerated();
    };

    return (
        <>
            <Cells
                key={generatedToggle}
                cells={board.cells}
                columns={board.columns}
                revealCell={index => dispatch({ type: 'reveal', index })}
                flagCell={index => dispatch({ type: 'flag', index })}
                getHint={() => dispatch({ type: 'hint' })}
                numBombs={board.numBombs}
                numErrors={board.numErrors}
                result={board.result}
                errorIndex={board.errorIndex}
            />
            <Snackbar open={board.result === 'failure'} transitionDuration={1000}>
                <Alert severity="error" sx={{ width: '100%' }} action={
                    <Button color="inherit" size="small" onClick={regenerate}>Regenerate</Button>
                }>
                    You lose!
                </Alert>
            </Snackbar>
            <Snackbar open={board.result === 'success'} transitionDuration={1000}>
                <Alert severity="success" sx={{ width: '100%' }} action={
                    <Button color="inherit" size="small" onClick={regenerate}>Regenerate</Button>
                }>
                    You win!
                </Alert>
            </Snackbar>
        </>
    )
}
