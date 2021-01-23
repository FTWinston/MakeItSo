import React, { useMemo } from 'react';
import { Checkbox, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, useTheme } from '@material-ui/core';
import { Vector2D } from '../../../common/data/Vector2D';
import { ClientShipState } from '../../../common/data/client/ClientShipState';
import { getWorldCoordinates } from '../../../common/components/SpaceMap/drawMap';
import { getPositionValue } from '../../../common/data/Animation';

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
    selected: (target: number) => void;
    currentTarget?: number;
    ships: Partial<Record<number, ClientShipState>>;
    localShip: ClientShipState;
}

export const TargetSelection: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

    const ships = useMemo(
        () => Object.entries(props.ships)
            .filter(ship => ship[1] !== props.localShip),
        [props.ships]
    );

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
        { id: 'name', numeric: false, disablePadding: true, label: 'Vessel' },
        { id: 'range', numeric: true, disablePadding: false, label: 'Range' },
        { id: 'angle', numeric: true, disablePadding: false, label: 'Angle' },
    ];
      
    const orderBy = 'x';
    const order: 'asc' | 'desc' = 'asc';

    const rows = ships.map(ship => {
        const selected = ship[0] === props.currentTarget?.toString();
        const labelId = `target-${ship[0]}`;
        return (
            <TableRow
                hover
                onClick={() => props.selected(parseInt(ship[0]))}
                role="checkbox"
                aria-checked={selected}
                tabIndex={-1}
                selected={selected}
                key={ship[0]}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={selected}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </TableCell>
                <TableCell component="th" id={labelId} scope="row" padding="none">
                    Ship #{ship[0]}
                </TableCell>
                <TableCell align="right">52</TableCell>
                <TableCell align="right">25</TableCell>
            </TableRow>
        )
    });

    return (
        <div className={classes.root}>
            <Typography variant="h6" className={classes.prompt}>
                Select a target
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
