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
        height: '10em',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardWrapper: {
        overflow: 'hidden',
        '&:hover': {
            overflow: 'visible',
            zIndex: '3',
        }
    },
}));

export const CardHand: React.FC<Props> = props => {
    const classes = useStyles();

    const empty = props.cards.length === 0
        ? <Typography>You have no cards.</Typography>
        : undefined;

    return (
        <div className={classes.root}>
            {props.cards.map((card, index) => (
                <div className={classes.cardWrapper}>
                    <PowerCard {...card} key={index} />
                </div>
            ))}
            {empty}
        </div>
    )
}