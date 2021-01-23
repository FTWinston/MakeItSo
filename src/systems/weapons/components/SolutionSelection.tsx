import React from 'react';
import { Checkbox, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, useTheme } from '@material-ui/core';
import { ClientShipState } from '../../../common/data/client/ClientShipState';
import { getWorldCoordinates } from '../../../common/components/SpaceMap/drawMap';
import { getPositionValue } from '../../../common/data/Animation';
import { TargetingSolution } from '../data/TargetingSolution';
import { getSystemName } from '../../../common/data/System';

const useStyles = makeStyles(theme => ({
    root: {

    },
    prompt: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: 0,
    }
}));

interface Props {
    selected: (solution: number) => void;
    localShip: ClientShipState;
    targetShip: ClientShipState;
    solutions: TargetingSolution[];
}

export const SolutionSelection: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

    const position = props.localShip.position;

    // Data table?
    // List?

    // Friendly / hostile / planet / etc filters.
    // View toggle on each ship in the list.

    interface HeadCell {
        disablePadding: boolean;
        id: string;//keyof Data;
        label: string;
        numeric: boolean;
    }
    
    const headCells: HeadCell[] = [
        { id: 'system', numeric: false, disablePadding: true, label: 'System' },
        { id: 'shapes', numeric: true, disablePadding: true, label: 'Shapes' },
        { id: 'time', numeric: true, disablePadding: true, label: 'Time' },
        { id: 'diff', numeric: true, disablePadding: true, label: 'Difficulty' },
    ];
      
    const orderBy = 'x';
    const order: 'asc' | 'desc' = 'asc';

    const rows = props.solutions.map((solution, index) => {
        const selected = false;
        const labelId = `sol-${index}`;

        return (
            <TableRow
                hover
                onClick={() => props.selected(index)}
                role="checkbox"
                aria-checked={selected}
                tabIndex={-1}
                selected={selected}
                key={index}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={selected}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </TableCell>
                <TableCell component="th" id={labelId} scope="row" padding="none">
                    {getSystemName(solution.system)}
                </TableCell>
                <TableCell align="right">{solution.shapes.length}</TableCell>
                <TableCell align="right">{solution.duration}s</TableCell>
                <TableCell align="right">{solution.complexity}</TableCell>
            </TableRow>
        )
    });

    return (
        <div className={classes.root}>
            <Typography variant="h6" className={classes.prompt}>
                Select firing solution
            </Typography>
            <Paper>
                <TableContainer>
                    <Table
                        //className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="enhanced table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" />
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'default'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            //onClick={createSortHandler(headCell.id)}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <span /*className={classes.visuallyHidden}*/>
                                                {order === 'asc' ? 'sorted ascending' : 'sorted descending'}
                                                </span>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
