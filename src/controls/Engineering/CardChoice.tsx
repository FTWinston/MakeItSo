import React from 'react';
import { PowerCardInfo } from '../../data/PowerCard';
import { makeStyles, Typography } from '@material-ui/core';
import { PowerCard } from './PowerCard';

interface Props {
    cards: PowerCardInfo[];
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexGrow: 1,
    },
    cardWrapper: {
        display: 'inline-block',
        zoom: 0.8,
    },
}));

export const CardChoice: React.FC<Props> = props => {
    const classes = useStyles();

    const empty = props.cards.length === 0
        ? <Typography>No card choice available.<br/>Please wait...</Typography>
        : undefined;

    return (
        <div className={classes.root}>
            {props.cards.map((card, index) => (
                <div
                    className={classes.cardWrapper}
                    key={index}
                >
                    <PowerCard {...card} key={index} />
                </div>
            ))}
            {empty}
        </div>
    )
}