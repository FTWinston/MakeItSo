import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';
import { SystemListItem } from './SystemListItem';
import { System, anyEngineeringSystem } from '../../../common/data/System';
import { EngineeringCardInfo } from '../data/EngineeringCard';
import { ClientSystemState } from '../../../common/data/client/ClientSystemState';

interface Props {
    systemOrder: System[];
    systemInfo: Record<System, ClientSystemState>;
    draggingCard?: EngineeringCardInfo;
}

const useStyles = makeStyles(theme => ({
    headerRow: {
        backgroundColor: theme.palette.background.paper,
    },
    iconHeader: {
        color: theme.palette.text.secondary,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        '&:last-child': {
            paddingRight: theme.spacing(1),
        }
    },
    textHeader: {
        color: theme.palette.text.secondary,
    }
}));

export const SystemList: React.FC<Props> = props => {
    const classes = useStyles();

    const allowedDropSystems = props.draggingCard
        ? props.draggingCard.allowedSystems === undefined
            ? anyEngineeringSystem
            : props.draggingCard.allowedSystems
        : undefined;

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow className={classes.headerRow}>
                        <TableCell className={classes.textHeader} colSpan={2}>System</TableCell>
                        <TableCell></TableCell>
                        <TableCell className={classes.iconHeader} align="right">Health</TableCell>
                        <TableCell className={classes.iconHeader} align="right">Power</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.systemOrder.map(system => (
                        <SystemListItem
                            system={system}
                            key={system}
                            {...props.systemInfo[system]}
                            validDropTarget={allowedDropSystems === undefined ? undefined : (allowedDropSystems & system) !== 0}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}